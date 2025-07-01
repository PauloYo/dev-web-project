const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { nome, ehPublico, fk_Usuario_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO LISTA (nome, ehPublico, fk_Usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [nome, ehPublico, fk_Usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM LISTA');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM LISTA WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lista não encontrada' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.put('/:id', async (req, res) => {
  const { nome, ehPublico, fk_Usuario_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE LISTA SET nome=$1, ehPublico=$2, fk_Usuario_id=$3 WHERE id=$4 RETURNING *',
      [nome, ehPublico, fk_Usuario_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lista não encontrada' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.patch('/:id/nome', async (req, res) => {
  const { nome } = req.body;
  try {
    const result = await pool.query(
      'UPDATE LISTA SET nome=$1 WHERE id=$2 RETURNING *',
      [nome, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lista não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM LISTA WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lista não encontrada' });
    res.json({ message: 'Lista deletada' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;