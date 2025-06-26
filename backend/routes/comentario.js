const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { descricao, fk_Avaliacao_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO COMENTARIO (descricao, fk_Avaliacao_id) VALUES ($1, $2) RETURNING *',
      [descricao, fk_Avaliacao_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM COMENTARIO');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM COMENTARIO WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.put('/:id', async (req, res) => {
  const { descricao, fk_Avaliacao_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE COMENTARIO SET descricao=$1, fk_Avaliacao_id=$2 WHERE id=$3 RETURNING *',
      [descricao, fk_Avaliacao_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM COMENTARIO WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json({ message: 'Comentário deletado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;