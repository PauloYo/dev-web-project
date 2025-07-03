const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { nome, descricao, imagem } = req.body;
  try {
    const result = await pool.query('INSERT INTO JOGO (nome, descricao, imagem) VALUES ($1, $2, $3) RETURNING *', [nome, descricao, imagem]);
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/', async (req, res) => {
  try {
    const { nome } = req.query;
    let result;
    if (nome) {
      result = await pool.query(
        'SELECT * FROM JOGO WHERE LTRIM(nome) ILIKE $1',
        [`${nome}%`]
      );
    } else {
      result = await pool.query('SELECT * FROM JOGO');
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM JOGO WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.put('/:id', async (req, res) => {
  const { nome, descricao, imagem } = req.body;
  try {
    const result = await pool.query('UPDATE JOGO SET nome=$1, descricao=$2, imagem=$3 WHERE id=$4 RETURNING *', [nome, descricao, imagem, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM JOGO WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json({ message: 'Jogo deletado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;