const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const springClient = require('../services/springClient');
const arbitroService = require('../services/arbitroService');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

exports.register = async (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  try {
    // Try to register via Spring API if available
    if (process.env.SPRING_API_URL) {
      const payload = { username, password, name, role: 'ARBITRO' };
      try {
        const resp = await springClient.post('/auth/register', payload);
        return res.status(resp.status).json(resp.data);
      } catch (e) {
        // fallback to local seed behavior
        console.warn('Spring register failed, falling back to local seed');
      }
    }

    // Fallback: create a basic local object and return token (not persisted)
    const hashed = await bcrypt.hash(password, 8);
    const user = { id: `local-${Date.now()}`, username, name, password: hashed, role: 'ARBITRO' };
    const token = jwt.sign({ sub: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ user: { id: user.id, username: user.username, name: user.name }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  try {
    // Try authenticate via Spring if available
    if (process.env.SPRING_API_URL) {
      try {
        const resp = await springClient.post('/auth/login', { username, password });
        // assume Spring returns { token, user }
        return res.status(resp.status).json(resp.data);
      } catch (e) {
        console.warn('Spring login failed, will try local fallback');
      }
    }

    // Fallback: check against seeded arbitros (passwords are not hashed in seed)
    const user = await arbitroService.findByUsername(username);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash || user.password || '');
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = jwt.sign({ sub: user.id, username: user.username, role: 'ARBITRO' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ user: { id: user.id, username: user.username, name: user.name }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};
