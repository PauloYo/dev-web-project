const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { nota, fk_Jogo_id, fk_Usuario_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO AVALIACAO (nota, fk_Jogo_id, fk_Usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [nota, fk_Jogo_id, fk_Usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM AVALIACAO');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM AVALIACAO WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Avaliação não encontrada' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  const { nota, fk_Jogo_id, fk_Usuario_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE AVALIACAO SET nota=$1, fk_Jogo_id=$2, fk_Usuario_id=$3 WHERE id=$4 RETURNING *',
      [nota, fk_Jogo_id, fk_Usuario_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Avaliação não encontrada' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id/nota', async (req, res) => {
  const { nota } = req.body;
  try {
    const result = await pool.query(
      'UPDATE AVALIACAO SET nota=$1 WHERE id=$2 RETURNING *',
      [nota, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Avaliação não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM AVALIACAO WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Avaliação não encontrada' });
    res.json({ message: 'Avaliação deletada' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;