import pdfParse from 'pdf-parse-fork';

import mysql from 'mysql2/promise';

import fs from 'fs';
 
const db = await mysql.createConnection({
    host: '161.97.144.27',
    port: "8094",
    user: 'root',
    password: 'guessagain94',
    database: 'matteus_elinors'
  });

async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}
 
const pdfs = fs.readdirSync('./Client/pdfs');
 
for (let pdf of pdfs) {
  
  let data = await pdfParse(fs.readFileSync('./Client/pdfs/' + pdf))
   
  let metadata = {
    numpages: data.numpages,
    info: data.info
  };
 
  let fullText = data.text;

  let result = await query(`
    INSERT INTO pdfs (name, description)
    VALUES(?, ?)
  `, [pdf, metadata]);
 
  console.log(pdf, result);
 
}

process.exit();