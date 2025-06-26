const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { descricao } = req.body;
  try {
    const result = await pool.query('INSERT INTO PLATAFORMA (descricao) VALUES ($1) RETURNING *', [descricao]);
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM PLATAFORMA');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM PLATAFORMA WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Plataforma não encontrada' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.put('/:id', async (req, res) => {
  const { descricao } = req.body;
  try {
    const result = await pool.query('UPDATE PLATAFORMA SET descricao=$1 WHERE id=$2 RETURNING *', [descricao, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Plataforma não encontrada' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM PLATAFORMA WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Plataforma não encontrada' });
    res.json({ message: 'Plataforma deletada' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;