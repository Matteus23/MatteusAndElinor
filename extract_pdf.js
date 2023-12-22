import pdfParse from 'pdf-parse-fork';

import mysql from 'mysql2/promise';

import fs from 'fs';
 
let pdfs = fs.readdirSync('.\Client\pdfs');
 
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
 
const files = await fs.readdirSync('pdfs');
 
for (let pdf of pdfs) {
 
  // Ta metadatan från filen
  let metadata = await pdfParse(fs.readFileSync('./pdfs/' + pdf));
 
  // Sätt in i databasen med hjälp av query funktionen
  let result = await query(`
    INSERT INTO pdf (pdfName, pdfDescription)
    VALUES(?, ?)
  `, [pdf, metadata]);
 
  // Logga resultatet för att se att något händer.
  console.log(pdf, result);
 
}
 
// Automatisk stop när det är klart, annars tror VSC
// att något mer ska skickas in då vi är kopplade till databasen.
process.exit();