import fs from 'fs';

import musicMetadata from 'music-metadata';

import mysql from 'mysql2/promise'

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

const files = await fs.readdirSync('music');

//Loop, reading metadata and getting it/extracting 
for (let file of files) {
    let metadata = await musicMetadata.parseFile('./music/' + file);


delete metadata.native;
delete metadata.quality;
delete metadata.common.disk;


let result = await query(`
  INSERT INTO music (name, description)
  VALUES(?, ?)
`, [file, metadata]);


console.log(file, result);

}

process.exit();