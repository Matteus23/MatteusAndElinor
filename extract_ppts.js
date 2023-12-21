import fs from 'fs';

import mysql from 'mysql2/promise';

const db = await mysql.createConnection ({
    host: '161.97.144.27',
    port: 8094,
    user: 'root',
    password: 'guessagain94',
    database: 'matteus_elinors'
});

let json = fs.readFileSync(csvjson.json, 'utf-8');

let data = JSON.parse(json);

for (let pptMetadata of data) {

  let fileName = pptMetadata.digest + '.ppt';

  delete pptMetadata.digest;
  delete pptMetadata.sha256;
  delete pptMetadata.sha512;

  console.log('');
  console.log(fileName);
  console.log(pptMetadata);

}