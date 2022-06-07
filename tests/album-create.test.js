const { expect } = require('chai');
 const request = require('supertest');
 const getDb = require('../src/services/db');
 const app = require('../src/app');

 describe('create album', () => {
   let db;
   let artists; 
   
   beforeEach(async () => {
       db = await getDb();
       [artists] = await db.query('SELECT * FROM Artist');
   });

   afterEach(async () => {
     await db.query('DELETE FROM Album');
     await db.close();
   });

   describe('/album', () => {
     describe('POST', () => {
       it('creates a new album in the database', async () => {
        if(artists[0]) {
         const res = await request(app).post('/artist/:artistId/album').send({
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
        }
       });
     });
   });
 });