// ── utils ──────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2, 9); }
function ig(n, q, u, c, s) { return { id: uid(), name: n, qty: parseFloat(q) || 0, unit: u, cat: c || 'Other', sup: s || '' }; }
function pSup(s) { return s ? s.split(/[/,]/).map(x => x.trim()).filter(Boolean) : []; }
function todayISO() { return new Date().toISOString().slice(0, 10); }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'; }
function daysLeft(exp) { if (!exp) return 999; return Math.ceil((new Date(exp) - new Date()) / 86400000); }
function getWeekNum() {
  var n = new Date(), s = new Date(n.getFullYear(), 0, 1);
  return Math.ceil(((n - s) / 86400000 + s.getDay() + 1) / 7);
}

// ── constants ──────────────────────────────────────────────────────
var SBG = { 'Para Picar': '#FAEEDA', 'Tapas': '#FAECE7', 'Mains': '#E6F1FB', 'Dessert': '#EAF3DE', 'Sauces': '#E1F5EE' };
var STX = { 'Para Picar': '#633806', 'Tapas': '#993C1D', 'Mains': '#0C447C', 'Dessert': '#3B6D11', 'Sauces': '#0F6E56' };
var SECS = ['Para Picar', 'Tapas', 'Mains', 'Dessert', 'Sauces'];
var CATS = ['Bakery', 'Charcuterie', 'Dairy', 'Dry goods', 'Produce', 'Protein', 'Other'];
var EXP_CATS = ['Produce', 'Protein', 'Dairy', 'Dry goods', 'Packaging', 'Cleaning', 'Equipment', 'Other'];
var TASK_DAYS = [
  { key: 'today', label: 'Today' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
];
var ALLERGENS = ['Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Peanuts', 'Soya', 'Dairy', 'Tree nuts', 'Celery', 'Mustard', 'Sesame', 'Sulphites', 'Lupin', 'Molluscs'];
var DISH_ALLERGENS = {
  'Fully loaded Nachos': ['Gluten', 'Dairy'],
  'Charcuterie & cheese board': ['Gluten', 'Dairy', 'Sulphites'],
  'Spicy Corn': ['Dairy', 'Gluten'],
  'Pan con tomate': ['Gluten', 'Fish'],
  'Batatas bravas': ['Gluten'],
  'Gambas al ajillo': ['Crustaceans', 'Gluten', 'Dairy', 'Sulphites'],
  'Calamares': ['Gluten', 'Eggs', 'Molluscs'],
  'Chorizo al vino': ['Gluten', 'Sulphites'],
  'Quesadilla asada': ['Gluten', 'Dairy'],
  'Padrón peppers': ['Dairy'],
  'Salata russa': ['Eggs', 'Dairy', 'Mustard'],
  'Pork ribs — carnitas style': ['Dairy', 'Sulphites'],
  'Enchiladas (chicken or cheese)': ['Gluten', 'Dairy'],
  'Chicken mole with rice': ['Gluten', 'Dairy', 'Sesame', 'Tree nuts'],
  'Tacos x4 — Asada': ['Gluten', 'Soya'],
  'Tacos x4 — Birria': ['Gluten'],
  'Tacos x4 — Cochinita Pibil': ['Gluten'],
  'Carlota de limon': ['Gluten', 'Dairy']
};

// ── default dishes ─────────────────────────────────────────────────
var DEFAULT_DISHES = [
  { id: uid(), name: 'Fully loaded Nachos', sec: 'Para Picar', active: true, price: 12.5, url: '', notes: 'Cama de nachos. Cascaval gratinado. Pico de gallo, jalapeños, guacamole, crème fraîche, chipotle cream sauce. Extra carne asada +£3.', ings: [ig('Nachos (bag)', 80, 'g', 'Dry goods', 'Local'), ig('Cascaval cheese', 60, 'g', 'Dairy', 'Local'), ig('Black beans (tinned)', 40, 'g', 'Dry goods', 'Tesco'), ig('Jalapeño (pickled)', 10, 'g', 'Dry goods', 'MexGrocer'), ig('Crème fraîche', 20, 'g', 'Dairy', 'Tesco'), ig('Hass avocado', 0.5, 'pcs', 'Produce', 'Local'), ig('Chipotle cream sauce', 15, 'g', 'Dry goods', 'Local'), ig('Fresh tomato', 0.036, 'kg', 'Produce', 'Local'), ig('White onion', 0.015, 'kg', 'Produce', 'Local'), ig('Fresh coriander', 2, 'g', 'Produce', 'Local'), ig('Fresh lime', 0.17, 'pcs', 'Produce', 'Local')] },
  { id: uid(), name: 'Charcuterie & cheese board', sec: 'Para Picar', active: true, price: 24.5, url: '', notes: 'PENDING — define with Sylvi before serving. Assembly only.', ings: [ig('Serrano ham', 40, 'g', 'Charcuterie', 'Brindisa'), ig('Cecina', 40, 'g', 'Charcuterie', 'Brindisa'), ig('Chorizo', 40, 'g', 'Charcuterie', 'Brindisa'), ig('Onion chutney', 20, 'g', 'Dry goods', 'Tesco')] },
  { id: uid(), name: 'Spicy Corn', sec: 'Tapas', active: true, price: 7.5, url: '', notes: '1 corn cob cut x4 lengthways. Paprika + EVOO + chilli flakes + cascaval gratinate. Plate with creme fraiche drizzle + chilli oil.', ings: [ig('Corn cob (frozen, cooked)', 1, 'pcs', 'Produce', 'Local'), ig('Smoked paprika', 2, 'g', 'Dry goods', 'Brindisa'), ig('Extra virgin olive oil', 10, 'ml', 'Dry goods', 'Brindisa'), ig('Chilli flakes', 1, 'g', 'Dry goods', 'Tesco'), ig('Cascaval cheese', 10, 'g', 'Dairy', 'Local'), ig('Creme fraiche', 15, 'g', 'Dairy', 'Tesco'), ig('Chilli oil', 5, 'ml', 'Dry goods', 'House-made')] },
  { id: uid(), name: 'Pan con tomate', sec: 'Tapas', active: true, price: 7.5, url: '', notes: '4 slices M&S bread toasted with EVOO. Filtered tomato mix (cold line). Anchovies. Fresh basil + Maldon to finish. Wooden board.', ings: [ig('M&S bread', 4, 'slice', 'Bakery', 'M&S'), ig('Filtered tomato mix', 30, 'g', 'Produce', 'House-made'), ig('Extra virgin olive oil', 8, 'ml', 'Dry goods', 'Brindisa'), ig('Anchovies', 4, 'pcs', 'Charcuterie', 'Brindisa'), ig('Fresh basil', 2, 'g', 'Produce', 'Local'), ig('Maldon sea salt', 0.5, 'g', 'Dry goods', 'Tesco')] },
  { id: uid(), name: 'Batatas bravas', sec: 'Tapas', active: true, price: 7.5, url: '', notes: 'Peel, dice, wash. First fry 160C. Cool & store. TO ORDER: fry 190C, drain, salt + sumac in bowl with chives. Salsero: red pepper sauce + alioli on side.', ings: [ig('Potato', 200, 'g', 'Produce', 'Local'), ig('Sumac powder', 1, 'g', 'Dry goods', 'Local'), ig('Chives', 3, 'g', 'Produce', 'Local'), ig('Red pepper sauce', 30, 'g', 'Dry goods', 'House-made'), ig('Alioli', 20, 'g', 'Dairy', 'House-made')] },
  { id: uid(), name: 'Gambas al ajillo', sec: 'Tapas', active: true, price: 12.5, url: '', notes: 'MISE EN PLACE: diced garlic, grated ginger, spice mix (kucharek+paprika+chilli), butter portions, tequila measure, prawns 10pcs. TO ORDER: butter > garlic > ginger > spice > prawns > tequila. 3 bread slices.', ings: [ig('Tiger prawns (raw, peeled)', 10, 'pcs', 'Protein', 'Fishmonger'), ig('Butter', 15, 'g', 'Dairy', 'Tesco'), ig('Garlic', 5, 'g', 'Produce', 'Local'), ig('Fresh ginger', 2, 'g', 'Produce', 'Local'), ig('Kucharek seasoning', 0.5, 'g', 'Dry goods', 'Local'), ig('Smoked paprika', 0.5, 'g', 'Dry goods', 'Brindisa'), ig('Chilli flakes', 0.5, 'g', 'Dry goods', 'Tesco'), ig('Tequila', 10, 'ml', 'Dry goods', 'Local'), ig('Sourdough bread', 3, 'slice', 'Bakery', 'Local')] },
  { id: uid(), name: 'Calamares', sec: 'Tapas', active: true, price: 9.0, url: '', notes: 'Pre-battered frozen. Fry 190C until golden. 10 pcs in bowl on rocket. Sliced cornichons on top. Alioli salsero.', ings: [ig('Calamares (frozen, pre-battered)', 150, 'g', 'Protein', 'Local'), ig('Rocket salad', 20, 'g', 'Produce', 'Local'), ig('Cornichons (sliced)', 15, 'g', 'Dry goods', 'Tesco'), ig('Alioli', 20, 'g', 'Dairy', 'House-made')] },
  { id: uid(), name: 'Chorizo al vino', sec: 'Tapas', active: true, price: 12.5, url: '', notes: '10 slices 7mm. Fry both sides. Pomegranate sauce + splash Merlot. Small clay cazuela on rocket. Fresh pomegranate seeds + chives. 3 toasted bread slices.', ings: [ig('Spanish chorizo (cooking)', 120, 'g', 'Charcuterie', 'Brindisa'), ig('Pomegranate sauce', 15, 'ml', 'Dry goods', 'Local'), ig('Merlot red wine', 20, 'ml', 'Dry goods', 'Local'), ig('Rocket salad', 20, 'g', 'Produce', 'Local'), ig('Fresh pomegranate seeds', 15, 'g', 'Produce', 'Local'), ig('Chives', 3, 'g', 'Produce', 'Local'), ig('Sourdough bread', 3, 'slice', 'Bakery', 'Local')] },
  { id: uid(), name: 'Quesadilla asada', sec: 'Tapas', active: true, price: 12.5, url: '', notes: 'Large flour tortilla on griddle. Cascaval + carne asada. Fold, cut 3 triangles. Guacamole ball + chipotle cream zigzag + cilantro leaves.', ings: [ig('Flour tortilla (large)', 1, 'pcs', 'Dry goods', 'MexGrocer'), ig('Cascaval cheese', 60, 'g', 'Dairy', 'Local'), ig('Carne asada (batch)', 80, 'g', 'Protein', 'House-made'), ig('Hass avocado', 0.5, 'pcs', 'Produce', 'Local'), ig('Chipotle cream sauce', 10, 'g', 'Dry goods', 'Local'), ig('Fresh coriander', 2, 'g', 'Produce', 'Local')] },
  { id: uid(), name: 'Padron peppers', sec: 'Tapas', active: true, price: 8.5, url: '', notes: 'PRE-PREP: boil 10 peppers 3 min, drain, pat dry, store cold. Compound butter: butter+garlic+sage+ginger+paprika. TO ORDER: hot pan, compound butter, peppers 2-3 min to blister. Deep bowl. Freshly grated manchego on top.', ings: [ig('Padron peppers', 10, 'pcs', 'Produce', 'Local greengrocer'), ig('Compound butter', 20, 'g', 'Dairy', 'House-made'), ig('Manchego (freshly grated)', 10, 'g', 'Dairy', 'Brindisa')] },
  { id: uid(), name: 'Salata russa', sec: 'Tapas', active: true, price: 8.5, url: '', notes: "Sylvi's special. Serve cold in deep bowl. Recommend actively.", ings: [ig('Salata russa batch', 150, 'g', 'Other', 'House-made')] },
  { id: uid(), name: 'Pork ribs — carnitas style', sec: 'Tapas', active: true, price: 13.5, url: '', notes: 'BATCH: salt ribs, submerge in lard. +30min: orange zest. +30min: OJ+oregano+clove+milk. +30min: Coca-Cola. +40min: done. TO ORDER: pan lid 2-3min, raise heat, honey+chilli flakes. PLATING: rocket bed, 4 ribs in fan, pico de gallo corner, honey drizzle, Maldon.', ings: [ig('Pork ribs (individual)', 4, 'pcs', 'Protein', 'Local butcher'), ig('Pork lard', 50, 'g', 'Dry goods', 'Local'), ig('Fresh orange', 0.5, 'pcs', 'Produce', 'Local'), ig('Dried oregano', 0.5, 'g', 'Dry goods', 'Local'), ig('Clove', 1, 'pcs', 'Dry goods', 'Local'), ig('Whole milk', 20, 'ml', 'Dairy', 'Tesco'), ig('Coca-Cola', 55, 'ml', 'Dry goods', 'Local'), ig('Honey', 15, 'g', 'Dry goods', 'Tesco'), ig('Chilli flakes', 1, 'g', 'Dry goods', 'Tesco'), ig('Rocket salad', 25, 'g', 'Produce', 'Local'), ig('Fresh tomato', 0.036, 'kg', 'Produce', 'Local'), ig('Maldon sea salt', 0.5, 'g', 'Dry goods', 'Tesco')] },
  { id: uid(), name: 'Enchiladas (chicken or cheese)', sec: 'Mains', active: true, price: 16.5, url: '', notes: '5 per order. CHICKEN: pre-rolled with palillo, fry in oil until golden. CHEESE: make to order on griddle (NOT fryer). RED SAUCE: 14 guajillo+2 arbol+3 tomatoes+5 garlic+salt+consome+Abuelita. Plate: warm sauce over, creme fraiche lines, grated cascaval, pickled red onion centre, parsley.', ings: [ig('White corn tortilla (15cm)', 5, 'pcs', 'Dry goods', 'Mextrade'), ig('Cooked shredded chicken', 150, 'g', 'Protein', 'House-made'), ig('Cascaval cheese', 80, 'g', 'Dairy', 'Local'), ig('Enchilada red sauce', 80, 'g', 'Other', 'House-made'), ig('Creme fraiche', 15, 'g', 'Dairy', 'Tesco'), ig('Red onion (pickled)', 10, 'g', 'Produce', 'House-made'), ig('Fresh parsley', 1, 'g', 'Produce', 'Local')] },
  { id: uid(), name: 'Chicken mole with rice', sec: 'Mains', active: true, price: 28.5, url: '', notes: 'Leg+thigh in mole to stay warm. MOLE: 1 ancho+12 guajillo+3 tomato+1 pasilla+Dona Maria 1.5 cups+spices+Abuelita+4 cups stock. 30min low. RICE in oven 80C damp cloth. PLATING: moulded rice, corn slices, chicken, mole over, creme fraiche, sesame, cilantro.', ings: [ig('Chicken leg + thigh', 300, 'g', 'Protein', 'House-made'), ig('Mole sauce (batch)', 120, 'g', 'Other', 'House-made'), ig('Long grain rice', 80, 'g', 'Dry goods', 'Tesco'), ig('Corn (slices)', 2, 'pcs', 'Produce', 'Local'), ig('Creme fraiche', 15, 'g', 'Dairy', 'Tesco'), ig('Sesame seeds', 1, 'g', 'Dry goods', 'Tesco'), ig('Fresh coriander', 1, 'g', 'Produce', 'Local')] },
  { id: uid(), name: 'Tacos x4 — Asada', sec: 'Mains', active: true, price: 25.0, url: '', notes: '4 tacos, black corn tortilla 12cm. CARNE ASADA: sirloin strips + dry rub (paprika+salt+cumin+pepper) + white onion. PLATING: avocado base, carne asada, pico de gallo. Salsa roja.', ings: [ig('Carne asada (batch)', 180, 'g', 'Protein', 'House-made'), ig('Black corn tortilla (12cm)', 0.067, 'kg', 'Dry goods', 'Mextrade'), ig('Hass avocado', 0.5, 'pcs', 'Produce', 'Local'), ig('Pico de gallo', 30, 'g', 'Other', 'House-made'), ig('Salsa roja', 20, 'g', 'Other', 'House-made')] },
  { id: uid(), name: 'Tacos x4 — Birria', sec: 'Mains', active: true, price: 25.0, url: '', notes: '4 tacos, black corn tortilla 12cm. BATCH: 9.5kg beef, 3kg tomato, 20 garlic, 8 pasilla, 2 onion, 4 ancho, 3 guajillo. Tatemar+blend with spices. Boil with water+white vinegar 3hrs. PLATING: meat+white onion+cilantro. Consomme in cup on side. Salsa roja.', ings: [ig('Birria (batch)', 180, 'g', 'Protein', 'House-made'), ig('Black corn tortilla (12cm)', 0.067, 'kg', 'Dry goods', 'Mextrade'), ig('White onion', 0.015, 'kg', 'Produce', 'Local'), ig('Fresh coriander', 3, 'g', 'Produce', 'Local'), ig('Birria consomme', 80, 'ml', 'Other', 'House-made'), ig('Salsa roja', 20, 'g', 'Other', 'House-made')] },
  { id: uid(), name: 'Tacos x4 — Cochinita Pibil', sec: 'Mains', active: true, price: 25.0, url: '', notes: '4 tacos, black corn tortilla 12cm. Pork leg with achiote+citrus. PLATING: black bean base (tinned beans fried in lard+garlic, mashed, oven 80C), cochinita, pickled red onion. Salsa verde.', ings: [ig('Cochinita pibil (batch)', 180, 'g', 'Protein', 'House-made'), ig('Black corn tortilla (12cm)', 0.067, 'kg', 'Dry goods', 'Mextrade'), ig('Black bean base', 40, 'g', 'Other', 'House-made'), ig('Red onion (pickled)', 15, 'g', 'Produce', 'House-made'), ig('Salsa verde', 20, 'g', 'Other', 'House-made')] },
  { id: uid(), name: 'Carlota de limon', sec: 'Dessert', active: true, price: 12.0, url: '', notes: '1 condensed milk + 1 evaporated milk + 1 pack Maria biscuits + juice of 6 limes. Min 6hrs chill. Slice with thin lime round on top.', ings: [ig('Maria biscuits', 60, 'g', 'Dry goods', 'Tesco'), ig('Condensed milk', 50, 'g', 'Dry goods', 'Tesco'), ig('Evaporated milk', 50, 'ml', 'Dairy', 'Tesco'), ig('Fresh lime', 1, 'pcs', 'Produce', 'Local')] },
  { id: uid(), name: 'Salsa Roja Tatemada', sec: 'Sauces', active: true, price: 0, url: '', notes: '12 tomatoes+5 garlic+3 red onion+9 arbol+6 green chilli+1.5 green pepper+salt. Tatemar all under grill. Blend.', ings: [ig('Fresh tomato', 1.44, 'kg', 'Produce', 'Local'), ig('Garlic', 25, 'g', 'Produce', 'Local'), ig('Red onion', 0.45, 'kg', 'Produce', 'Local'), ig('Chile de arbol', 9, 'pcs', 'Dry goods', 'MexGrocer'), ig('Fresh green chilli', 6, 'pcs', 'Produce', 'Local'), ig('Green pepper', 1.5, 'pcs', 'Produce', 'Local')] },
  { id: uid(), name: 'Salsa Verde Taquera', sec: 'Sauces', active: true, price: 0, url: '', notes: 'Tomatillos (tinned)+green chillies+garlic+3 arbol+green pepper. Tatemar. Blend with burnt tortilla. Salt.', ings: [ig('Green tomatillos (tinned)', 500, 'g', 'Dry goods', 'MexGrocer'), ig('Fresh green chilli', 4, 'pcs', 'Produce', 'Local'), ig('Garlic', 15, 'g', 'Produce', 'Local'), ig('Chile de arbol', 3, 'pcs', 'Dry goods', 'MexGrocer'), ig('Green pepper', 1, 'pcs', 'Produce', 'Local')] },
  { id: uid(), name: 'Alioli', sec: 'Sauces', active: true, price: 0, url: '', notes: 'Garlic+lemon+salt+oil. Immersion blender. Fill squeeze bottles. 3 days refrigerated.', ings: [ig('Garlic', 20, 'g', 'Produce', 'Local'), ig('Lemon', 0.5, 'pcs', 'Produce', 'Local'), ig('Oil (neutral)', 300, 'ml', 'Dry goods', 'Local')] },
  { id: uid(), name: 'Pico de Gallo', sec: 'Sauces', active: true, price: 0, url: '', notes: 'Fresh tomato+white onion+jalapeno+coriander+lime+salt. Dice small. Batch every 2 days.', ings: [ig('Fresh tomato', 0.96, 'kg', 'Produce', 'Local'), ig('White onion', 0.3, 'kg', 'Produce', 'Local'), ig('Fresh jalapeno', 2, 'pcs', 'Produce', 'Local'), ig('Fresh coriander', 10, 'g', 'Produce', 'Local'), ig('Fresh lime', 1.5, 'pcs', 'Produce', 'Local')] },
  { id: uid(), name: 'Guacamole Base', sec: 'Sauces', active: true, price: 0, url: '', notes: 'Hass avocado+lime+white onion+coriander+salt. Max 2hrs ahead. Cling film touching surface.', ings: [ig('Hass avocado', 10, 'pcs', 'Produce', 'Local'), ig('Fresh lime', 1, 'pcs', 'Produce', 'Local'), ig('White onion', 0.3, 'kg', 'Produce', 'Local'), ig('Fresh coriander', 8, 'g', 'Produce', 'Local')] },
  { id: uid(), name: 'Pickled red onion', sec: 'Sauces', active: true, price: 0, url: '', notes: 'Red onion thinly sliced+white vinegar+lime+salt+oregano.', ings: [ig('Red onion', 0.3, 'kg', 'Produce', 'Local'), ig('White wine vinegar', 30, 'ml', 'Dry goods', 'Local'), ig('Fresh lime', 1, 'pcs', 'Produce', 'Local')] },
  { id: uid(), name: 'Carne asada batch', sec: 'Sauces', active: true, price: 0, url: '', notes: 'Slice sirloin into strips. Dry rub: paprika+salt+cumin+pepper. Fry in batches. Add diced white onion, mix, finish. Used in tacos asada and quesadilla.', ings: [ig('Beef sirloin', 500, 'g', 'Protein', 'Local'), ig('Smoked paprika', 3, 'g', 'Dry goods', 'Brindisa'), ig('Cumin', 1, 'g', 'Dry goods', 'Local'), ig('Salt', 2, 'g', 'Dry goods', 'Local'), ig('White onion', 0.15, 'kg', 'Produce', 'Local')] }
];

var DEFAULT_EVENTS = [
  { id: 'fri', name: 'Friday', covers: 35, tapaR: 0.4, mainR: 0.35, tacoR: 0.4, salsaB: 1 },
  { id: 'sat', name: 'Saturday', covers: 40, tapaR: 0.45, mainR: 0.35, tacoR: 0.45, salsaB: 1 },
  { id: 'sun', name: 'Sunday', covers: 30, tapaR: 0.4, mainR: 0.3, tacoR: 0.4, salsaB: 1 }
];

// ── state ──────────────────────────────────────────────────────────
var dishes = DEFAULT_DISHES.slice();
var events = DEFAULT_EVENTS.slice();
var tab = 'dishes';
var expId = null;
var editId = null;
var stockItems = [];
var taskItems = {};
var tempLogs = [];
var expenses = [];

// ── api ────────────────────────────────────────────────────────────
function apiFetch(url, opts) {
  return fetch(url, opts).then(function(r) { return r.json(); });
}
function kvGet(k) { return apiFetch('/api/kv/' + k).then(function(r) { return r.value ? JSON.parse(r.value) : null; }); }
function kvSet(k, v) { return apiFetch('/api/kv/' + k, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: JSON.stringify(v) }) }); }

// ── init ───────────────────────────────────────────────────────────
function init() {
  document.getElementById('wb').textContent = 'Week ' + getWeekNum();
  Promise.all([
    kvGet('manana-dishes'),
    kvGet('manana-events'),
    apiFetch('/api/stock'),
    apiFetch('/api/temps'),
    apiFetch('/api/expenses'),
    apiFetch('/api/tasks')
  ]).then(function(results) {
    if (results[0]) dishes = results[0];
    if (results[1]) events = results[1];
    stockItems = Array.isArray(results[2]) ? results[2] : [];
    tempLogs = Array.isArray(results[3]) ? results[3] : [];
    expenses = Array.isArray(results[4]) ? results[4] : [];
    var tasks = Array.isArray(results[5]) ? results[5] : [];
    taskItems = {};
    tasks.forEach(function(t) {
      if (!taskItems[t.day_key]) taskItems[t.day_key] = [];
      taskItems[t.day_key].push(t);
    });
    render();
  }).catch(function() { render(); });
}

function saveDishes() { kvSet('manana-dishes', dishes); }
function saveEvents() { kvSet('manana-events', events); }

// ── calculations ───────────────────────────────────────────────────
function cP(d) {
  if (!d.active) return 0;
  return Math.round(events.reduce(function(s, e) {
    var r = 0;
    if (d.sec === 'Sauces') r = e.salsaB || 0;
    else if (d.name.toLowerCase().indexOf('taco') !== -1 || d.name.toLowerCase().indexOf('ribs') !== -1) r = (e.tacoR || 0) * (e.covers || 0);
    else if (d.sec === 'Para Picar' || d.sec === 'Tapas') r = (e.tapaR || 0) * (e.covers || 0);
    else r = (e.mainR || 0) * (e.covers || 0);
    return s + r;
  }, 0));
}

function cSL() {
  var a = {};
  dishes.forEach(function(d) {
    var p = cP(d);
    if (p <= 0) return;
    (d.ings || []).forEach(function(i) {
      var k = i.name.trim().toLowerCase() + '__' + i.unit.trim().toLowerCase();
      if (!a[k]) a[k] = { name: i.name.trim(), unit: i.unit.trim(), cat: i.cat || 'Other', sup: i.sup || '', total: 0, usedIn: [] };
      a[k].total += (parseFloat(i.qty) || 0) * p;
      if (a[k].usedIn.indexOf(d.name) === -1) a[k].usedIn.push(d.name);
    });
  });
  return Object.values(a).sort(function(a, b) { return a.cat.localeCompare(b.cat) || a.name.localeCompare(b.name); });
}

function rQ(t, u) {
  if (t <= 0) return '—';
  var un = u.toLowerCase();
  if (un === 'g') {
    if (t < 100) return Math.ceil(t / 10) * 10 + 'g';
    if (t < 500) return Math.ceil(t / 50) * 50 + 'g';
    if (t < 2000) return Math.ceil(t / 100) * 100 + 'g';
    return (Math.ceil(t / 500) * 0.5).toFixed(1) + 'kg';
  }
  if (un === 'ml') {
    if (t < 200) return Math.ceil(t / 10) * 10 + 'ml';
    if (t < 1000) return Math.ceil(t / 100) * 100 + 'ml';
    return (Math.ceil(t / 500) * 0.5).toFixed(1) + 'L';
  }
  if (un === 'pcs') return Math.ceil(t) + ' pcs';
  if (un === 'kg') return (Math.ceil(t * 10) / 10).toFixed(1) + 'kg';
  if (un === 'slice') return '~' + Math.ceil(t / 8) + ' loaves';
  return t.toFixed(1) + ' ' + u;
}

function tH(s) {
  return pSup(s).map(function(x) { return '<span class="tg">' + x + '</span>'; }).join('');
}

// ── tab switch ─────────────────────────────────────────────────────
function ST(t) {
  tab = t;
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(el) {
    var m = el.textContent.trim().toLowerCase();
    el.classList.toggle('active', m === t || (t === 'temps' && m === 'temp log'));
  });
  document.querySelectorAll('.panel').forEach(function(el) { el.classList.remove('active'); });
  document.getElementById('pd-' + t).classList.add('active');
  render();
}

function render() {
  var sl = cSL();
  document.getElementById('ml').textContent = 'Week ' + getWeekNum() + ' · ' + dishes.filter(function(d) { return d.active; }).length + ' dishes · ' + sl.length + ' shopping items';
  if (tab === 'dishes') rDishes();
  else if (tab === 'stock') rStock();
  else if (tab === 'tasks') rTasks();
  else if (tab === 'expenses') rExpenses();
  else if (tab === 'shopping') rShopping(sl);
  else if (tab === 'temps') rTemps();
  else if (tab === 'allergens') rAllergens();
  else if (tab === 'events') rEvents();
}

// ── dishes ─────────────────────────────────────────────────────────
function rDishes() {
  var el = document.getElementById('pd-dishes');
  var h = '';
  SECS.forEach(function(sec) {
    var sd = dishes.filter(function(d) { return d.sec === sec; });
    if (!sd.length) return;
    var ac = sd.filter(function(d) { return d.active; }).length;
    h += '<div style="margin-bottom:1.4rem"><div style="display:flex;align-items:center;gap:7px;margin-bottom:7px"><span style="font-size:11px;font-weight:700;color:' + STX[sec] + ';text-transform:uppercase;letter-spacing:.05em">' + sec + '</span><span style="font-size:11px;color:#aaa">' + ac + '/' + sd.length + ' active</span></div><div class="card" style="margin-bottom:0">';
    sd.forEach(function(d) {
      var p = cP(d);
      if (editId === d.id) {
        h += '<div class="ef">' + bEF(d) + '</div>';
      } else {
        var exp = expId === d.id;
        h += '<div class="dr"><div class="dh" onclick="tExp(\'' + d.id + '\')">';
        h += '<div class="tog ' + (d.active ? 'on' : 'off') + '" onclick="event.stopPropagation();tAct(\'' + d.id + '\')"><div class="tdot" style="left:' + (d.active ? '16px' : '2px') + '"></div></div>';
        h += '<span class="dn ' + (d.active ? '' : 'off') + '">' + d.name + '</span>';
        h += '<span class="sb" style="background:' + SBG[d.sec] + ';color:' + STX[d.sec] + '">' + d.sec + '</span>';
        if (d.price > 0) h += '<span style="font-size:12px;color:#6b6b6b">£' + d.price.toFixed(2) + '</span>';
        if (d.active) h += '<span style="font-size:12px;color:#6b6b6b;white-space:nowrap">' + p + ' portions</span>';
        else h += '<span style="font-size:11px;color:#aaa">inactive</span>';
        h += '<span style="font-size:11px;color:#aaa">' + (exp ? '▲' : '▼') + '</span>';
        h += '</div>';
        h += '<div class="dd ' + (exp ? 'open' : '') + '">';
        h += '<p class="nt">' + (d.notes || '').replace(/\n/g, '<br>') + '</p>';
        if (d.url) h += '<a href="' + d.url + '" target="_blank" style="font-size:12px;color:#185FA5;display:inline-block;margin-bottom:7px">Tutorial &#8594;</a>';
        h += '<table class="it"><thead><tr><th>Ingredient</th><th>Qty/portion</th><th>Category</th><th>Supplier</th></tr></thead><tbody>';
        (d.ings || []).forEach(function(i) {
          h += '<tr><td>' + i.name + '</td><td style="color:#6b6b6b">' + i.qty + ' ' + i.unit + '</td><td class="m">' + i.cat + '</td><td>' + tH(i.sup) + '</td></tr>';
        });
        h += '</tbody></table>';
        h += '<div class="ra"><button class="btn" onclick="sEdit(\'' + d.id + '\')">Edit</button><button class="btn d" onclick="dDish(\'' + d.id + '\')">Delete</button></div>';
        h += '</div></div>';
      }
    });
    h += '</div></div>';
  });
  h += '<button class="abtn" onclick="newDish()">+ Add new dish</button>';
  el.innerHTML = h;
}

function bEF(d) {
  var h = '<p style="font-size:13px;font-weight:600;margin-bottom:9px">Editing: ' + d.name + '</p>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:7px">';
  h += '<div class="fg"><label>Name</label><input value="' + d.name.replace(/"/g, '&quot;') + '" onchange="uDF(\'' + d.id + '\',\'name\',this.value)"></div>';
  h += '<div class="fg"><label>Section</label><select onchange="uDF(\'' + d.id + '\',\'sec\',this.value)">' + SECS.map(function(s) { return '<option value="' + s + '"' + (d.sec === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div>';
  h += '<div class="fg"><label>Price (£)</label><input type="number" value="' + d.price + '" onchange="uDF(\'' + d.id + '\',\'price\',parseFloat(this.value)||0)"></div>';
  h += '<div class="fg"><label>Tutorial URL</label><input value="' + (d.url || '').replace(/"/g, '&quot;') + '" placeholder="https://..." onchange="uDF(\'' + d.id + '\',\'url\',this.value)"></div>';
  h += '</div>';
  h += '<div class="fg"><label>Notes / plating</label><textarea rows="3" onchange="uDF(\'' + d.id + '\',\'notes\',this.value)">' + (d.notes || '').replace(/</g, '&lt;') + '</textarea></div>';
  h += '<p style="font-size:11px;font-weight:700;color:#6b6b6b;text-transform:uppercase;letter-spacing:.04em;margin:6px 0 3px">Ingredients per 1 portion</p>';
  h += '<table class="ie"><thead><tr><th style="width:26%">Name</th><th style="width:8%">Qty</th><th style="width:7%">Unit</th><th style="width:15%">Cat</th><th style="width:23%">Supplier</th><th></th></tr></thead><tbody id="itb-' + d.id + '">' + bIR(d) + '</tbody></table>';
  h += '<div style="display:flex;gap:7px;justify-content:space-between;margin-top:7px"><button class="btn" onclick="aIng(\'' + d.id + '\')">+ Add ingredient</button><button class="btn p" onclick="dEdit()">Done</button></div>';
  return h;
}

function bIR(d) {
  return (d.ings || []).map(function(i) {
    return '<tr id="ir-' + i.id + '"><td><input value="' + i.name.replace(/"/g, '&quot;') + '" onchange="uIng(\'' + d.id + '\',\'' + i.id + '\',\'name\',this.value)"></td><td><input type="number" value="' + i.qty + '" step="any" onchange="uIng(\'' + d.id + '\',\'' + i.id + '\',\'qty\',parseFloat(this.value)||0)"></td><td><input value="' + i.unit + '" onchange="uIng(\'' + d.id + '\',\'' + i.id + '\',\'unit\',this.value)"></td><td><select onchange="uIng(\'' + d.id + '\',\'' + i.id + '\',\'cat\',this.value)">' + CATS.map(function(c) { return '<option value="' + c + '"' + (i.cat === c ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select></td><td><input value="' + (i.sup || '').replace(/"/g, '&quot;') + '" onchange="uIng(\'' + d.id + '\',\'' + i.id + '\',\'sup\',this.value)"></td><td><button class="xb" onclick="dIng(\'' + d.id + '\',\'' + i.id + '\')">&#215;</button></td></tr>';
  }).join('');
}

// ── stock ──────────────────────────────────────────────────────────
function rStock() {
  var el = document.getElementById('pd-stock');
  var critical = stockItems.filter(function(s) { return s.active && daysLeft(s.expires_at) <= 1; });
  var warn = stockItems.filter(function(s) { return s.active && daysLeft(s.expires_at) > 1 && daysLeft(s.expires_at) <= 3; });
  var h = '<div class="ib">Track batch production. All batches must be labelled — UK Food Standards requirement.</div>';
  if (critical.length) h += '<div style="background:#F8D7DA;border:1px solid #f5c6cb;border-radius:10px;padding:10px 14px;margin-bottom:.9rem;font-size:13px;color:#A32D2D"><strong>Expires today or tomorrow:</strong> ' + critical.map(function(s) { return s.name; }).join(', ') + '</div>';
  if (warn.length) h += '<div style="background:#FFF3CD;border:1px solid #ffeeba;border-radius:10px;padding:10px 14px;margin-bottom:.9rem;font-size:13px;color:#854F0B"><strong>Use soon:</strong> ' + warn.map(function(s) { return s.name + ' (' + daysLeft(s.expires_at) + 'd)'; }).join(', ') + '</div>';
  h += '<div class="card"><div class="ch">Active batches <button class="btn sm" onclick="showAddStock()">+ Add batch</button></div>';
  var active = stockItems.filter(function(s) { return s.active; });
  if (!active.length) h += '<div style="padding:2rem;text-align:center;color:#aaa;font-size:13px">No active batches. Add one above.</div>';
  active.forEach(function(s) {
    var dl = daysLeft(s.expires_at);
    var cls = dl <= 1 ? 'exp-crit' : dl <= 3 ? 'exp-warn' : 'exp-ok';
    var lbl = dl <= 0 ? 'Expired' : dl === 1 ? 'Today' : dl + 'd left';
    h += '<div class="stk-row"><div style="flex:1"><div style="font-weight:500">' + s.name + '</div><div style="font-size:11px;color:#6b6b6b;margin-top:2px">' + s.quantity + ' · Made: ' + fmtDate(s.produced_at) + (s.notes ? ' · ' + s.notes : '') + '</div></div><span class="' + cls + '">' + lbl + '</span><button class="btn sm d" onclick="archiveStock(' + s.id + ')">Done</button></div>';
  });
  h += '</div>';
  var archived = stockItems.filter(function(s) { return !s.active; }).slice(0, 8);
  if (archived.length) {
    h += '<div class="card"><div class="ch">Recent history</div>';
    archived.forEach(function(s) { h += '<div class="stk-row" style="opacity:.6"><div style="flex:1"><div style="font-weight:500">' + s.name + '</div><div style="font-size:11px;color:#6b6b6b">Made: ' + fmtDate(s.produced_at) + ' · Expired: ' + fmtDate(s.expires_at) + '</div></div></div>'; });
    h += '</div>';
  }
  h += '<div id="add-stock-form" style="display:none"><div class="card"><div class="ch">New batch</div><div style="padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:8px"><div class="fg"><label>Product name</label><input id="sn" placeholder="e.g. Birria batch"></div><div class="fg"><label>Quantity</label><input id="sq" placeholder="e.g. 2 containers 4L"></div><div class="fg"><label>Production date</label><input type="date" id="sp" value="' + todayISO() + '"></div><div class="fg"><label>Expiry date</label><input type="date" id="se" value="' + new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10) + '"></div><div class="fg" style="grid-column:1/-1"><label>Notes</label><input id="sno"></div></div><div style="padding:0 14px 14px;display:flex;gap:8px"><button class="btn grn" onclick="addStock()">Save batch</button><button class="btn" onclick="document.getElementById(\'add-stock-form\').style.display=\'none\'">Cancel</button></div></div></div>';
  el.innerHTML = h;
}

function showAddStock() { document.getElementById('add-stock-form').style.display = 'block'; document.getElementById('add-stock-form').scrollIntoView({ behavior: 'smooth' }); }

function addStock() {
  var n = (document.getElementById('sn').value || '').trim();
  if (!n) return;
  apiFetch('/api/stock', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: n, quantity: document.getElementById('sq').value || '', produced_at: document.getElementById('sp').value, expires_at: document.getElementById('se').value, notes: document.getElementById('sno').value || '' }) }).then(function(s) { stockItems.unshift(s); rStock(); });
}

function archiveStock(id) { apiFetch('/api/stock/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: false }) }).then(function() { stockItems = stockItems.map(function(s) { return s.id === id ? Object.assign({}, s, { active: false }) : s; }); rStock(); }); }

// ── tasks ──────────────────────────────────────────────────────────
function rTasks() {
  var el = document.getElementById('pd-tasks');
  var h = '<div class="ib">Tasks saved to server — visible from any device. Today: <strong>' + new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) + '</strong></div>';
  TASK_DAYS.forEach(function(td) {
    var items = taskItems[td.key] || [];
    var done = items.filter(function(t) { return t.done; }).length;
    var isToday = td.key === 'today';
    h += '<div class="card" style="margin-bottom:.8rem"><div class="ch" style="' + (isToday ? 'background:#EAF3DE;color:#3B6D11' : '') + '">' + td.label + (isToday ? ' — today' : '') + ' <span style="font-weight:400;font-size:11px">' + done + '/' + items.length + ' done</span></div>';
    items.forEach(function(t) {
      h += '<div class="task-row"><input type="checkbox" id="t' + t.id + '" ' + (t.done ? 'checked' : '') + ' onchange="toggleTask(' + t.id + ',this.checked,\'' + td.key + '\')"><label for="t' + t.id + '" class="' + (t.done ? 'done' : '') + '">' + t.text + '</label><button style="background:transparent;border:none;cursor:pointer;color:#ccc;font-size:14px" onclick="deleteTask(' + t.id + ',\'' + td.key + '\')">&#215;</button></div>';
    });
    h += '<div class="add-task"><input type="text" placeholder="Add task..." id="ti-' + td.key + '" onkeydown="if(event.key===\'Enter\')addTask(\'' + td.key + '\')"><button class="btn sm" onclick="addTask(\'' + td.key + '\')">+ Add</button></div></div>';
  });
  el.innerHTML = h;
}

function addTask(key) {
  var inp = document.getElementById('ti-' + key);
  var text = (inp ? inp.value : '').trim();
  if (!text) return;
  apiFetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ day_key: key, text: text }) }).then(function(t) {
    if (!taskItems[key]) taskItems[key] = [];
    taskItems[key].push(t);
    if (inp) inp.value = '';
    rTasks();
  });
}

function toggleTask(id, done, key) {
  apiFetch('/api/tasks/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ done: done }) }).then(function() {
    taskItems[key] = taskItems[key].map(function(t) { return t.id === id ? Object.assign({}, t, { done: done }) : t; });
    rTasks();
  });
}

function deleteTask(id, key) {
  apiFetch('/api/tasks/' + id, { method: 'DELETE' }).then(function() {
    taskItems[key] = taskItems[key].filter(function(t) { return t.id !== id; });
    rTasks();
  });
}

// ── expenses ───────────────────────────────────────────────────────
function rExpenses() {
  var el = document.getElementById('pd-expenses');
  var total = expenses.reduce(function(s, e) { return s + parseFloat(e.total_price || 0); }, 0);
  var weekStart = new Date(); weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  var weekTotal = expenses.filter(function(e) { return new Date(e.expense_date) >= weekStart; }).reduce(function(s, e) { return s + parseFloat(e.total_price || 0); }, 0);
  var byCat = {}; expenses.forEach(function(e) { var c = e.category || 'Other'; byCat[c] = (byCat[c] || 0) + parseFloat(e.total_price || 0); });
  var topCat = Object.entries(byCat).sort(function(a, b) { return b[1] - a[1]; })[0];

  var h = '<div class="sm-grid"><div class="sm-card"><div class="sm-lbl">This week</div><div class="sm-val">£' + weekTotal.toFixed(2) + '</div><div class="sm-sub">Mon-Sun</div></div>';
  h += '<div class="sm-card"><div class="sm-lbl">All time</div><div class="sm-val">£' + total.toFixed(2) + '</div><div class="sm-sub">' + expenses.length + ' entries</div></div>';
  if (topCat) h += '<div class="sm-card"><div class="sm-lbl">Top category</div><div class="sm-val" style="font-size:15px">' + topCat[0] + '</div><div class="sm-sub">£' + topCat[1].toFixed(2) + '</div></div>';
  h += '</div>';

  h += '<div class="card" style="margin-bottom:.9rem"><div class="ch">Add expense</div><div style="padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  h += '<div class="fg"><label>Date</label><input type="date" id="ed" value="' + todayISO() + '"></div>';
  h += '<div class="fg"><label>Supplier / Store</label><input id="es" placeholder="Tesco, MexGrocer..."></div>';
  h += '<div class="fg" style="grid-column:1/-1"><label>Product</label><input id="ep" placeholder="e.g. Tiger prawns 1kg"></div>';
  h += '<div class="fg"><label>Category</label><select id="ec">' + EXP_CATS.map(function(c) { return '<option>' + c + '</option>'; }).join('') + '</select></div>';
  h += '<div class="fg"><label>Total price (£)</label><input type="number" id="epr" step="0.01" placeholder="0.00"></div>';
  h += '<div class="fg"><label>Qty</label><input id="eq" type="number" step="any" placeholder="2"></div>';
  h += '<div class="fg"><label>Unit</label><input id="eu" placeholder="kg, pcs..."></div>';
  h += '</div><div style="padding:0 14px 14px"><button class="btn grn" onclick="addExpense()">Save expense</button></div></div>';

  h += '<div class="fbar"><label style="font-size:12px;color:#6b6b6b">Filter:</label><input type="date" id="ef-from" onchange="filterExp()"><input type="date" id="ef-to" onchange="filterExp()"><select id="ef-cat" onchange="filterExp()"><option value="all">All categories</option>' + EXP_CATS.map(function(c) { return '<option>' + c + '</option>'; }).join('') + '</select><button class="btn sm" onclick="clearExp()">Clear</button><button class="btn sm p" onclick="copyExp()">Copy list</button></div>';

  var filtered = getFilteredExp();
  var grouped = {};
  filtered.forEach(function(e) { var c = e.category || 'Other'; if (!grouped[c]) grouped[c] = []; grouped[c].push(e); });

  if (!filtered.length) { h += '<div style="padding:3rem;text-align:center;color:#aaa;font-size:13px">No expenses yet.</div>'; }
  else {
    Object.entries(grouped).sort(function(a, b) { return a[0].localeCompare(b[0]); }).forEach(function(entry) {
      var cat = entry[0], items = entry[1];
      var ct = items.reduce(function(s, e) { return s + parseFloat(e.total_price || 0); }, 0);
      h += '<div class="card"><div class="ch">' + cat + ' <span style="font-weight:400">· £' + ct.toFixed(2) + '</span></div>';
      items.forEach(function(e) {
        var unitStr = e.quantity && e.unit ? ' · ' + e.quantity + ' ' + e.unit : '';
        h += '<div class="xrow"><div style="flex:1"><div style="font-weight:500">' + e.product + unitStr + '</div><div style="font-size:11px;color:#6b6b6b">' + e.supplier + ' · ' + fmtDate(e.expense_date) + '</div></div><span style="font-size:15px;font-weight:700;min-width:55px;text-align:right">£' + parseFloat(e.total_price).toFixed(2) + '</span><button class="xb" onclick="delExp(' + e.id + ')">&#215;</button></div>';
      });
      h += '</div>';
    });
  }
  el.innerHTML = h;
}

function getFilteredExp() {
  var from = (document.getElementById('ef-from') || {}).value;
  var to = (document.getElementById('ef-to') || {}).value;
  var cat = ((document.getElementById('ef-cat') || {}).value) || 'all';
  return expenses.filter(function(e) {
    if (from && e.expense_date < from) return false;
    if (to && e.expense_date > to) return false;
    if (cat && cat !== 'all' && e.category !== cat) return false;
    return true;
  });
}
function filterExp() { rExpenses(); }
function clearExp() { var f = document.getElementById('ef-from'); var t = document.getElementById('ef-to'); var c = document.getElementById('ef-cat'); if (f) f.value = ''; if (t) t.value = ''; if (c) c.value = 'all'; rExpenses(); }

function addExpense() {
  var price = (document.getElementById('epr') || {}).value;
  var supplier = ((document.getElementById('es') || {}).value || '').trim();
  var product = ((document.getElementById('ep') || {}).value || '').trim();
  if (!price || !supplier || !product) { alert('Date, supplier, product and price required'); return; }
  apiFetch('/api/expenses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ expense_date: (document.getElementById('ed') || {}).value || todayISO(), supplier: supplier, product: product, quantity: (document.getElementById('eq') || {}).value || null, unit: (document.getElementById('eu') || {}).value || null, total_price: parseFloat(price), category: (document.getElementById('ec') || {}).value || 'Other', notes: '' }) }).then(function(e) {
    expenses.unshift(e);
    ['es', 'ep', 'eq', 'eu', 'epr'].forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; });
    rExpenses();
  });
}

function delExp(id) { if (!confirm('Delete this expense?')) return; apiFetch('/api/expenses/' + id, { method: 'DELETE' }).then(function() { expenses = expenses.filter(function(e) { return e.id !== id; }); rExpenses(); }); }

function copyExp() {
  var filtered = getFilteredExp(); var grouped = {}; filtered.forEach(function(e) { var c = e.category || 'Other'; if (!grouped[c]) grouped[c] = []; grouped[c].push(e); });
  var total = filtered.reduce(function(s, e) { return s + parseFloat(e.total_price || 0); }, 0);
  var lines = ['MANANA — EXPENSE REPORT', 'Week ' + getWeekNum() + ' · ' + new Date().toLocaleDateString('en-GB'), '='.repeat(40), ''];
  Object.entries(grouped).forEach(function(entry) { var cat = entry[0], items = entry[1]; var ct = items.reduce(function(s, e) { return s + parseFloat(e.total_price || 0); }, 0); lines.push(cat.toUpperCase() + ' — £' + ct.toFixed(2)); items.forEach(function(e) { lines.push('  ' + fmtDate(e.expense_date) + ' · ' + e.supplier + ' · ' + e.product + ' · £' + parseFloat(e.total_price).toFixed(2)); }); lines.push(''); });
  lines.push('TOTAL: £' + total.toFixed(2));
  navigator.clipboard.writeText(lines.join('\n')).then(function() { alert('Copied!'); }).catch(function() { alert(lines.join('\n')); });
}

// ── shopping ───────────────────────────────────────────────────────
function rShopping(sl) {
  var el = document.getElementById('pd-shopping');
  if (!sl) sl = cSL();
  var gr = {};
  sl.forEach(function(i) { if (!gr[i.cat]) gr[i.cat] = []; gr[i.cat].push(i); });
  var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.9rem;flex-wrap:wrap;gap:8px"><p style="font-size:13px;color:#6b6b6b">' + sl.length + ' ingredients · hover to see which dishes</p><button class="btn p" onclick="cpSL()">Copy list</button></div>';
  Object.entries(gr).forEach(function(entry) {
    var cat = entry[0], items = entry[1];
    h += '<div class="sl-cat"><span class="sl-lbl">' + cat + '</span><div class="sl-rows">';
    items.forEach(function(item) {
      h += '<div class="sl-row"><span style="flex:1">' + item.name + '</span><span style="font-size:15px;font-weight:700;min-width:65px;text-align:right">' + rQ(item.total, item.unit) + '</span><div style="display:flex;flex-wrap:wrap;gap:2px;min-width:70px;justify-content:flex-end">' + tH(item.sup) + '</div>' + (item.usedIn.length ? '<div class="sl-tt">' + item.usedIn.join('<br>') + '</div>' : '') + '</div>';
    });
    h += '</div></div>';
  });
  if (!sl.length) h += '<div style="padding:3rem;text-align:center;color:#aaa;font-size:13px">No active dishes with covers > 0.</div>';
  el.innerHTML = h;
}

function cpSL() {
  var sl = cSL(); var gr = {}; sl.forEach(function(i) { if (!gr[i.cat]) gr[i.cat] = []; gr[i.cat].push(i); });
  var lines = ['MANANA — SHOPPING LIST', 'Week ' + getWeekNum() + ' · ' + new Date().toLocaleDateString('en-GB'), '='.repeat(40), ''];
  Object.entries(gr).forEach(function(entry) { lines.push(entry[0].toUpperCase()); entry[1].forEach(function(i) { lines.push('  ' + i.name + ': ' + rQ(i.total, i.unit) + (i.sup ? ' (' + i.sup + ')' : '')); }); lines.push(''); });
  navigator.clipboard.writeText(lines.join('\n')).then(function() { alert('Copied!'); }).catch(function() { alert(lines.join('\n')); });
}

// ── temps ──────────────────────────────────────────────────────────
function rTemps() {
  var el = document.getElementById('pd-temps');
  var h = '<div class="ib">UK Food Standards: fridge must be <strong>below 8°C</strong> (target 5°C). Freezer <strong>below -18°C</strong>. Log every day before service.</div>';
  h += '<div class="card"><div class="ch">Log today\'s temperatures</div><div class="tmp-form"><div><label>Fridge (°C)</label><input type="number" id="tf" placeholder="5" step="0.1"></div><div><label>Freezer (°C)</label><input type="number" id="tfc" placeholder="-20" step="0.1"></div><div><label>Notes</label><input id="tn" placeholder="Optional"></div><div><button class="btn grn" onclick="logTemp()" style="width:100%;margin-top:18px">Log</button></div></div></div>';
  h += '<div class="card"><div class="ch">History (last 30 days)</div>';
  if (!tempLogs.length) h += '<div style="padding:2rem;text-align:center;color:#aaa;font-size:13px">No logs yet.</div>';
  tempLogs.forEach(function(t) {
    var fd = parseFloat(t.fridge_temp); var fc = parseFloat(t.freezer_temp);
    var fcls = fd <= 8 ? 'color:#1D9E75;font-weight:700' : 'color:#E24B4A;font-weight:700';
    var fccls = fc <= -18 ? 'color:#1D9E75;font-weight:700' : 'color:#E24B4A;font-weight:700';
    var dt = new Date(t.logged_at).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    h += '<div class="tmp-row"><span style="color:#6b6b6b;font-size:12px;flex:1">' + dt + '</span><span>Fridge: <span style="' + fcls + '">' + fd + '°C</span></span><span>Freezer: <span style="' + fccls + '">' + fc + '°C</span></span>' + (t.notes ? '<span style="font-size:11px;color:#6b6b6b">' + t.notes + '</span>' : '') + '</div>';
  });
  h += '</div>';
  el.innerHTML = h;
}

function logTemp() {
  var f = (document.getElementById('tf') || {}).value; var fc = (document.getElementById('tfc') || {}).value;
  if (!f || !fc) { alert('Enter both temperatures'); return; }
  apiFetch('/api/temps', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fridge_temp: f, freezer_temp: fc, notes: (document.getElementById('tn') || {}).value || '' }) }).then(function(t) { tempLogs.unshift(t); rTemps(); });
}

// ── allergens ──────────────────────────────────────────────────────
function rAllergens() {
  var el = document.getElementById('pd-allergens');
  var ad = dishes.filter(function(d) { return d.active && d.price > 0; });
  var h = '<div class="ib">UK law requires allergen information for all dishes. 14 major allergens listed. Keep updated and available for staff and customers.</div><div style="overflow-x:auto"><table class="allg-tbl"><thead><tr><th>Dish</th>';
  ALLERGENS.forEach(function(a) { h += '<th style="writing-mode:vertical-rl;transform:rotate(180deg);padding:8px 4px;min-width:28px">' + a + '</th>'; });
  h += '</tr></thead><tbody>';
  ad.forEach(function(d, idx) {
    var da = DISH_ALLERGENS[d.name] || [];
    h += '<tr style="' + (idx % 2 === 0 ? 'background:#f6f6f4' : '') + '"><td style="padding:6px 8px;font-weight:500">' + d.name + '</td>';
    ALLERGENS.forEach(function(a) { h += '<td style="text-align:center;padding:4px">' + (da.indexOf(a) !== -1 ? '<span class="allg-dot"></span>' : '<span style="color:#aaa">·</span>') + '</td>'; });
    h += '</tr>';
  });
  h += '</tbody></table></div><div style="margin-top:1rem;font-size:12px;color:#6b6b6b;line-height:1.7"><strong>Note:</strong> Verify with recipes as ingredients may vary. Always inform customers before ordering.</div>';
  el.innerHTML = h;
}

// ── events ─────────────────────────────────────────────────────────
function rEvents() {
  var el = document.getElementById('pd-events');
  var h = '<div class="ib">Set expected covers per service to drive the shopping list and portion calculations.</div><div class="card"><div class="ch">Weekly service covers — Week ' + getWeekNum() + '</div>';
  events.forEach(function(ev, i) {
    h += '<div style="padding:12px 14px;' + (i ? 'border-top:1px solid rgba(0,0,0,.06)' : '') + '"><div style="font-size:14px;font-weight:500;margin-bottom:8px">' + ev.name + '</div><div class="evg">';
    h += '<div class="evf"><label>Covers</label><input type="number" value="' + ev.covers + '" min="0" max="300" onchange="uEv(\'' + ev.id + '\',\'covers\',this.value)"></div>';
    h += '<div class="evf"><label>Tapa ratio</label><input type="number" value="' + ev.tapaR + '" min="0" max="2" step="0.05" onchange="uEv(\'' + ev.id + '\',\'tapaR\',this.value)"></div>';
    h += '<div class="evf"><label>Main ratio</label><input type="number" value="' + ev.mainR + '" min="0" max="2" step="0.05" onchange="uEv(\'' + ev.id + '\',\'mainR\',this.value)"></div>';
    h += '<div class="evf"><label>Taco ratio</label><input type="number" value="' + ev.tacoR + '" min="0" max="2" step="0.05" onchange="uEv(\'' + ev.id + '\',\'tacoR\',this.value)"></div>';
    h += '<div class="evf"><label>Salsa batches</label><input type="number" value="' + ev.salsaB + '" min="0" max="10" onchange="uEv(\'' + ev.id + '\',\'salsaB\',this.value)"></div>';
    h += '</div></div>';
  });
  h += '</div><div class="card"><div class="ch">Portions — this week combined</div>';
  SECS.forEach(function(sec) {
    var sd = dishes.filter(function(d) { return d.sec === sec && d.active; });
    if (!sd.length) return;
    h += '<div style="padding:5px 14px;background:' + SBG[sec] + '60;border-top:1px solid rgba(0,0,0,.06)"><span style="font-size:11px;font-weight:700;color:' + STX[sec] + ';text-transform:uppercase;letter-spacing:.04em">' + sec + '</span></div>';
    sd.forEach(function(d) { h += '<div class="pr"><span>' + d.name + '</span><span style="font-weight:600;color:#6b6b6b">' + cP(d) + ' portions</span></div>'; });
  });
  h += '</div>';
  el.innerHTML = h;
}

// ── mutations ──────────────────────────────────────────────────────
function tExp(id) { expId = expId === id ? null : id; editId = null; rDishes(); }
function tAct(id) { dishes = dishes.map(function(d) { return d.id === id ? Object.assign({}, d, { active: !d.active }) : d; }); saveDishes(); render(); }
function sEdit(id) { editId = id; expId = null; rDishes(); }
function dEdit() { editId = null; saveDishes(); render(); }
function uDF(id, f, v) { dishes = dishes.map(function(d) { return d.id === id ? Object.assign({}, d, { [f]: v }) : d; }); }
function uIng(dId, iId, f, v) { dishes = dishes.map(function(d) { return d.id === dId ? Object.assign({}, d, { ings: d.ings.map(function(i) { return i.id === iId ? Object.assign({}, i, { [f]: v }) : i; }) }) : d; }); }
function dIng(dId, iId) { dishes = dishes.map(function(d) { return d.id === dId ? Object.assign({}, d, { ings: d.ings.filter(function(i) { return i.id !== iId; }) }) : d; }); var r = document.getElementById('ir-' + iId); if (r) r.remove(); }
function aIng(dId) {
  var ni = ig('', 0, 'g', 'Produce', '');
  dishes = dishes.map(function(d) { return d.id === dId ? Object.assign({}, d, { ings: d.ings.concat([ni]) }) : d; });
  var tb = document.getElementById('itb-' + dId);
  if (tb) { var d = dishes.find(function(x) { return x.id === dId; }); tb.innerHTML = bIR(d); }
}
function dDish(id) { if (!confirm('Delete this dish?')) return; dishes = dishes.filter(function(d) { return d.id !== id; }); if (expId === id) expId = null; saveDishes(); render(); }
function uEv(id, f, v) { events = events.map(function(e) { return e.id === id ? Object.assign({}, e, { [f]: parseFloat(v) || 0 }) : e; }); saveEvents(); render(); }
function newDish() {
  var name = prompt('New dish name:'); if (!name || !name.trim()) return;
  var si = parseInt(prompt('Section:\n' + SECS.map(function(s, i) { return (i + 1) + '. ' + s; }).join('\n'))) || 2;
  var sec = SECS[Math.max(0, Math.min(si - 1, SECS.length - 1))];
  var price = parseFloat(prompt('Price (£):') || '0') || 0;
  var nd = { id: uid(), name: name.trim(), sec: sec, active: true, price: price, url: '', notes: '', ings: [] };
  dishes.push(nd); editId = nd.id; expId = null; saveDishes(); render();
}

// ── start ──────────────────────────────────────────────────────────
init();
