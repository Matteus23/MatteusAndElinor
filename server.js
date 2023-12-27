import express from 'express';

import mysql from 'mysql2/promise';

const app = express();

app.use(express.static('client'));

app.listen(3000, () =>
  console.log('Listening on http://localhost:3000'));

const db = await mysql.createConnection({
  host: '161.97.144.24',
  port: 8094,
  user: 'root',
  password: 'guessagain94',
  database: 'matteus_elinors'
});

async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}

app.get('/api/music/:searchTerm/:searchType', async (request, response) => {
  let searchTerm = request.params.searchTerm;
  let searchType = request.params.searchType;
  let sql = `
   SELECT * 
   FROM music
   WHERE LOWER(metadata -> '$.common.${searchType}') LIKE LOWER (?)
  `;
  
  if (searchType == 'all') {
    sql = `
      SELECT *
      FROM music
      WHERE LOWER(description) LIKE LOWER (?)
    `;
  }

  let result = await query(sql, ['%' + searchTerm + '%']);

  response.json(result);
});

app.get('/api/images/:searchTerm', async (request, response) => {
  let searchTerm = request.params.searchTerm;
  let result = await query(`
    SELECT *
    FROM images
    WHERE LOWER (description) LIKE LOWER(?)
  `, ['%' + searchTerm + '%']);
 
  response.json(result);
});

app.get('/api/pdfs/:searchTerm', async (request, response) => {
  let searchTerm = request.params.searchTerm;

  let result = await query(`
    SELECT *
    FROM pdf
    WHERE LOWER (description -> '$.info') LIKE LOWER(?)
  `, ['%' + searchTerm + '%']);

  response.json(result);
});

app.get('/api/ppts/:searchTerm', async (request, response) => {
  
  let searchTerm = request.params.searchTerm;

  let result = await query(`
    SELECT *
    FROM ppts
    WHERE LOWER(description)LIKE LOWER(?)
  `, ['%' + searchTerm + '%']);
  
  response.json(result);
});