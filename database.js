const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'gym.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

function initDB() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tabela de perfis
      db.run(`CREATE TABLE IF NOT EXISTS perfis (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL
      )`);

      // Tabela de treinos
      db.run(`CREATE TABLE IF NOT EXISTS treinos (
        id TEXT PRIMARY KEY,
        perfil_id INTEGER,
        title TEXT,
        sub TEXT,
        alert TEXT,
        FOREIGN KEY(perfil_id) REFERENCES perfis(id)
      )`);

      // Tabela de dias da semana (visão geral)
      db.run(`CREATE TABLE IF NOT EXISTS semana (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        perfil_id INTEGER,
        d TEXT,
        plan TEXT,
        sub TEXT,
        FOREIGN KEY(perfil_id) REFERENCES perfis(id)
      )`);

      // Tabela de exercícios
      // Como os exercícios têm séries complexas, vamos armazenar as séries como JSON stringificado
      db.run(`CREATE TABLE IF NOT EXISTS exercicios (
        id TEXT,
        treino_id TEXT,
        nome TEXT,
        tecnica TEXT,
        series_json TEXT,
        PRIMARY KEY (id, treino_id),
        FOREIGN KEY(treino_id) REFERENCES treinos(id)
      )`);

      // Tabela de progresso (qual série foi concluída)
      // perfil_id, treino_id, exercicio_id, serie_index, concluido
      db.run(`CREATE TABLE IF NOT EXISTS progresso (
        perfil_id INTEGER,
        treino_id TEXT,
        exercicio_id TEXT,
        serie_index INTEGER,
        concluido BOOLEAN DEFAULT 0,
        PRIMARY KEY (perfil_id, treino_id, exercicio_id, serie_index),
        FOREIGN KEY(perfil_id) REFERENCES perfis(id)
      )`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

module.exports = { db, initDB };
