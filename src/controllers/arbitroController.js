const arbitroService = require('../services/arbitroService');

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
