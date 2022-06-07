const { expect } = require('chai');
 const request = require('supertest');
 const getDb = require('../src/services/db');
 const app = require('../src/app');

 describe('create album', () => {
   let db;
   let artists; 

   beforeEach(async () => {
       db = await getDb();
       await Promise.all([
        db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
          'Loyle Carner',
          'Hip-Hop',
        ]),
        db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
          'Kylie Minogue',
          'pop',
        ]),
        db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
          'Dave Brubeck',
          'jazz',
        ]),
      ]);
  
      [artists] = await db.query('SELECT * from Artist');
   });

   afterEach(async () => {
     await db.query('DELETE FROM Album');
     await db.close();
   });

   describe('/album', () => {
     describe('POST', () => {
       it('creates a new album in the database', async () => {

        // const artistId = artists.Id;
        // console.log(artistId);

        if(artists[0]) {
         const res = await request(app).post('/artist/1/album').send({
           name: 'Not Waving But Drowning',
           genre: 'Hip-Hop',
           year: 2019,
         });

         expect(res.status).to.equal(201);

         const [[albumEntries]] = await db.query(
           `SELECT * FROM Album WHERE name = 'Not Waving But Drowning'`
         );

         expect(albumEntries.name).to.equal('Not Waving But Drowning');
         expect(albumEntries.genre).to.equal('Hip-Hop');
         expect(albumEntries.year).to.equal(2019);
         expect(albumEntries.artistId).to.equal(1);

        }
       });
     });
   });
 });