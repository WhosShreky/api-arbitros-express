const springClient = require('./springClient');
const seed = require('../../seeds/arbitros.json');

// This service tries to get data from Spring API; if the Spring API is unreachable,
// it falls back to the local seed data so the Node API can still run independently.

async function listAll() {
  try {
    const resp = await springClient.get('/arbitros');
    return resp.data;
  } catch (e) {
    console.warn('Spring /arbitros not available, using seed');
    return seed;
  }
}

async function getById(id) {
  try {
    const resp = await springClient.get(`/arbitros/${id}`);
    return resp.data;
  } catch (e) {
    return seed.find(s => String(s.id) === String(id));
  }
}

async function findByUsername(username) {
  const list = await listAll();
  return list.find(u => u.username === username);
}

async function getDashboard(id) {
  try {
    const resp = await springClient.get(`/arbitros/${id}/dashboard`);
    return resp.data;
  } catch (e) {
    // demo fallback
    const a = await getById(id);
    return { arbitro: a, totalPartidos: 12, pagado: 5, pendiente: 7 };
  }
}

async function getPartidos(id) {
  try {
    const resp = await springClient.get(`/arbitros/${id}/partidos`);
    return resp.data;
  } catch (e) {
    return [{ id: 1, rival: 'Equipo A vs B', fecha: '2025-11-01' }];
  }
}

async function getAsignaciones(id) {
  try {
    const resp = await springClient.get(`/arbitros/${id}/asignaciones`);
    return resp.data;
  } catch (e) {
    return [{ id: 1, partidoId: 1, fecha: '2025-11-01', tipo: 'Central' }];
  }
}

async function getLiquidaciones(id) {
  try {
    const resp = await springClient.get(`/arbitros/${id}/liquidaciones`);
    return resp.data;
  } catch (e) {
    return [{ id: 1, monto: 100.0, fecha: '2025-10-30', estado: 'PAGADA' }];
  }
}

module.exports = { listAll, getById, findByUsername, getDashboard, getPartidos, getAsignaciones, getLiquidaciones };
