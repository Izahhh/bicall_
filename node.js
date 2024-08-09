const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Coloque sua senha do MySQL aqui
  database: 'tcc'
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota para obter dados de alunos
app.get('/dados', (req, res) => {
  db.query('SELECT * FROM tb_alunos', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados');
      return;
    }
    res.json(results);
  });
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor Node.js com Express funcionando!');
});

// Iniciar o servidorn
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});




//npm install
//node "nome".js 