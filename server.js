import express from 'express';

import mysql from 'mysql2/promise';

const app = express();

app.use(express.static('client'));

app.listen(3000, () =>
  console.log('Listening on http://localhost:3000'));

const db = await mysql.createConnection({
  host: '161.97.144.27',
  port: '8094',
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
   WHERE LOWER(description -> '$.common.${searchType}') LIKE LOWER (?)
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

app.get('/api/images/:searchTerm/:searchType', async (request, response) => {
  let searchTerm = request.params.searchTerm;
  let searchimages = request.params.searchType;
  
  let sql = `
   SELECT * 
   FROM images
   WHERE LOWER(description.${searchimages}') LIKE LOWER (?)
  `;
  
  if (searchimages == 'all') {
    sql = `
      SELECT *
      FROM images
      WHERE LOWER(description) LIKE LOWER (?)
    `;
  }

  let result = await query(sql, ['%' + searchTerm + '%']);

  response.json(result);
});

app.get('/api/pdfs/:searchTerm/:searchType', async (request, response) => {
  let searchTerm = request.params.searchTerm;
  let searchpdfs = request.params.searchType;
  
  let sql = `
   SELECT * 
   FROM pdfs
   WHERE LOWER(description -> '$.info.${searchpdfs}') LIKE LOWER (?)
  `;
  
  if (searchpdfs == 'all') {
    sql = `
      SELECT *
      FROM pdfs
      WHERE LOWER(description) LIKE LOWER (?)
    `;
  }

  let result = await query(sql, ['%' + searchTerm + '%']);

  response.json(result);
});

app.get('/api/ppts/:searchTerm/:searchType', async (request, response) => {
  let searchTerm = request.params.searchTerm;
  let searchppts = request.params.searchType;
  
  let sql = `
   SELECT * 
   FROM ppts
   WHERE LOWER(description.${searchppts}') LIKE LOWER (?)
  `;
  
  if (searchppts == 'all') {
    sql = `
      SELECT *
      FROM ppts
      WHERE LOWER(description) LIKE LOWER (?)
    `;
  }

  let result = await query(sql, ['%' + searchTerm + '%']);

  response.json(result);
});