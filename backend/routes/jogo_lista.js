const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { fk_Jogo_id, fk_Lista_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO JOGO_LISTA (fk_Jogo_id, fk_Lista_id) VALUES ($1, $2) RETURNING *',
      [fk_Jogo_id, fk_Lista_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM JOGO_LISTA');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.delete('/', async (req, res) => {
  const { fk_Jogo_id, fk_Lista_id } = req.body;
  try {
    const result = await pool.query(
      'DELETE FROM JOGO_LISTA WHERE fk_Jogo_id=$1 AND fk_Lista_id=$2 RETURNING *',
      [fk_Jogo_id, fk_Lista_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Relação não encontrada' });
    res.json({ message: 'Relação deletada' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;