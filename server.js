require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS kv_store (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS temp_logs (
      id SERIAL PRIMARY KEY,
      fridge_temp NUMERIC,
      freezer_temp NUMERIC,
      notes TEXT,
      logged_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      day_key TEXT,
      text TEXT,
      done BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS stock_items (
      id SERIAL PRIMARY KEY,
      name TEXT,
      quantity TEXT,
      produced_at DATE,
      expires_at DATE,
      notes TEXT,
      active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      expense_date DATE NOT NULL,
      supplier TEXT NOT NULL,
      product TEXT NOT NULL,
      quantity NUMERIC,
      unit TEXT,
      total_price NUMERIC NOT NULL,
      category TEXT,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log('DB ready');
}

// KV store
app.get('/api/kv/:key', async (req, res) => {
  try { const r = await pool.query('SELECT value FROM kv_store WHERE key=$1', [req.params.key]); res.json({ value: r.rows[0]?.value || null }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/kv/:key', async (req, res) => {
  try { await pool.query('INSERT INTO kv_store(key,value,updated_at) VALUES($1,$2,NOW()) ON CONFLICT(key) DO UPDATE SET value=$2, updated_at=NOW()', [req.params.key, req.body.value]); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Temps
app.get('/api/temps', async (req, res) => {
  try { const r = await pool.query('SELECT * FROM temp_logs ORDER BY logged_at DESC LIMIT 30'); res.json(r.rows); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/temps', async (req, res) => {
  try { const { fridge_temp, freezer_temp, notes } = req.body; const r = await pool.query('INSERT INTO temp_logs(fridge_temp,freezer_temp,notes) VALUES($1,$2,$3) RETURNING *', [fridge_temp, freezer_temp, notes || '']); res.json(r.rows[0]); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Tasks
app.get('/api/tasks', async (req, res) => {
  try { const day = req.query.day; const q = day ? 'SELECT * FROM tasks WHERE day_key=$1 ORDER BY created_at' : 'SELECT * FROM tasks ORDER BY day_key, created_at'; const r = await pool.query(q, day ? [day] : []); res.json(r.rows); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/tasks', async (req, res) => {
  try { const { day_key, text } = req.body; const r = await pool.query('INSERT INTO tasks(day_key,text) VALUES($1,$2) RETURNING *', [day_key, text]); res.json(r.rows[0]); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.patch('/api/tasks/:id', async (req, res) => {
  try { const r = await pool.query('UPDATE tasks SET done=$1 WHERE id=$2 RETURNING *', [req.body.done, req.params.id]); res.json(r.rows[0]); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.delete('/api/tasks/:id', async (req, res) => {
  try { await pool.query('DELETE FROM tasks WHERE id=$1', [req.params.id]); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Stock
app.get('/api/stock', async (req, res) => {
  try { const r = await pool.query('SELECT * FROM stock_items ORDER BY expires_at'); res.json(r.rows); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/stock', async (req, res) => {
  try { const { name, quantity, produced_at, expires_at, notes } = req.body; const r = await pool.query('INSERT INTO stock_items(name,quantity,produced_at,expires_at,notes) VALUES($1,$2,$3,$4,$5) RETURNING *', [name, quantity, produced_at, expires_at, notes || '']); res.json(r.rows[0]); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
app.patch('/api/stock/:id', async (req, res) => {
  try { const r = await pool.query('UPDATE stock_items SET active=$1 WHERE id=$2 RETURNING *', [req.body.active, req.params.id]); res.json(r.rows[0]); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const { from, to, category } = req.query;
    let q = 'SELECT * FROM expenses WHERE 1=1';
    const params = [];
    if (from) { params.push(from); q += ` AND expense_date >= $${params.length}`; }
    if (to) { params.push(to); q += ` AND expense_date <= $${params.length}`; }
    if (category && category !== 'all') { params.push(category); q += ` AND category = $${params.length}`; }
    q += ' ORDER BY expense_date DESC, created_at DESC';
    const r = await pool.query(q, params);
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});
app.post('/api/expenses', async (req, res) => {
  try {
    const { expense_date, supplier, product, quantity, unit, total_price, category, notes } = req.body;
    const r = await pool.query(
      'INSERT INTO expenses(expense_date,supplier,product,quantity,unit,total_price,category,notes) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [expense_date, supplier, product, quantity || null, unit || null, total_price, category || 'Other', notes || '']
    );
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});
app.delete('/api/expenses/:id', async (req, res) => {
  try { await pool.query('DELETE FROM expenses WHERE id=$1', [req.params.id]); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

const PORT = process.env.PORT || 3000;
initDB().then(() => { app.listen(PORT, '0.0.0.0', () => console.log(`Mañana running on ${PORT}`)); });
