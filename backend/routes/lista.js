const express = require('express');
const router = express.Router();
const pool = require('../db');

// Criar nova lista
router.post('/', async (req, res) => {
  const { nome, ehPublico, fk_Usuario_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO LISTA (nome, ehPublico, fk_Usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [nome, ehPublico, fk_Usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar listas (por usuário ou todas)
router.get('/', async (req, res) => {
  try {
    const { fk_Usuario_id } = req.query;
    let result;
    if (fk_Usuario_id) {
      result = await pool.query('SELECT * FROM LISTA WHERE fk_Usuario_id = $1', [fk_Usuario_id]);
    } else {
      result = await pool.query('SELECT * FROM LISTA');
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar uma lista específica
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM LISTA WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lista não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualização completa de lista
router.put('/:id', async (req, res) => {
  const { nome, ehPublico, fk_Usuario_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE LISTA SET nome=$1, ehPublico=$2, fk_Usuario_id=$3 WHERE id=$4 RETURNING *',
      [nome, ehPublico, fk_Usuario_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lista não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar apenas o nome da lista
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

// Atualizar apenas o status (ehPublico) da lista
router.patch('/:id/status', async (req, res) => {
  const { ehPublico } = req.body;
  try {
    const result = await pool.query(
      'UPDATE LISTA SET ehPublico=$1 WHERE id=$2 RETURNING *',
      [ehPublico, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lista não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar lista
// DELETE /listas/:id
router.delete('/:id', async (req, res) => {
  const listaId = req.params.id;

  try {
    // 1. Remove os jogos associados da tabela intermediária
    await pool.query('DELETE FROM JOGO_LISTA WHERE fk_lista_id = $1', [listaId]);

    // 2. Agora pode remover a lista com segurança
    await pool.query('DELETE FROM LISTA WHERE id = $1', [listaId]);

    res.status(204).send(); // Sucesso, sem conteúdo
  } catch (error) {
    console.error('Erro ao deletar lista:', error);
    res.status(500).json({ erro: 'Erro ao deletar lista' });
  }
});
module.exports = router;
