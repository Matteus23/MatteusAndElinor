import exifr from 'exifr';

import fs from 'fs';

import mysql from 'mysql2/promise';

const db = await mysql.createConnection ({
    host: '161.97.144.27',
    port: 8094,
    user: 'root',
    password: 'guessagain94',
    database: 'matteus_elinors'
});

let images = fs.readdirSync('./Client/images/');

async function query(sql, listOfValues) {
    let result = await db.execute(sql, listOfValues);
    return result[0];
}

const files = fs.readdirSync('./Client/images');


for (let image of images) {
    let metadata = await exifr.parse('./Client/images/' + image);


let result = await query(`
  INSERT INTO music (name, description)
  VALUES(?, ?)
`, [image, metadata]);


console.log(image, result);

}

process.exit();