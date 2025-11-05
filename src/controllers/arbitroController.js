const arbitroService = require('../services/arbitroService');
const os = require('os');

exports.list = async (req, res) => {
  try {
    const data = await arbitroService.listAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const a = await arbitroService.getById(id);
    if (!a) return res.status(404).json({ error: 'not found' });
    res.json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await arbitroService.getDashboard(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.partidos = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await arbitroService.getPartidos(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.asignaciones = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await arbitroService.getAsignaciones(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.liquidaciones = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await arbitroService.getLiquidaciones(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

// Endpoint que devuelve árbitros con URLs de imagen construidas desde los seeds y `awsS3` helper
const seed = require('../../seeds/arbitros.json');
const { publicUrlForKey } = require('../config/awsS3');

exports.listWithImages = async (req, res) => {
  try {
    // Mapear seed -> objeto público y construir imageUrl usando publicUrlForKey
    const arbitros = seed.map(s => ({
      id: s.id,
      username: s.username,
      name: s.name,
      email: s.email,
      phone: s.phone,
      imageKey: s.imageKey,
      imageUrl: publicUrlForKey(s.imageKey)
    }));

    const containerId = os.hostname();

    res.json({ containerId, timestamp: new Date().toISOString(), arbitros });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};
