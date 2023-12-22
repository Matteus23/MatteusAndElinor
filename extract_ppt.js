import fs from 'fs';

import mysql from 'mysql2/promise';

let powerpointMetadata = fs.readFileSync('./csvjson.json', 'utf-8');

let data = JSON.parse(powerpointMetadata);

const db = await mysql.createConnection ({
    host: '161.97.144.27',
    port: 8094,
    user: 'root',
    password: 'guessagain94',
    database: 'matteus_elinors'
});

async function query(sql, listOfValues) {
    let result = await db.execute(sql, listOfValues);
    return result[0];
}

for (let powerpointMetadata of data) {

  let fileName = powerpointMetadata.digest + '.ppt';

  delete powerpointMetadata.digest;
  delete powerpointMetadata.sha256;
  delete powerpointMetadata.sha512;

  let result = await query(`
  INSERT INTO ppts (name, description)
  VALUES(?, ?)
`, [fileName, powerpointMetadata]);

  console.log(powerpointMetadata, result);

}

process.exit();