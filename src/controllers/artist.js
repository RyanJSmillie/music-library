const getDb = require('/Volumes/WDPassport/ManchesterCodes/music-library/src/services/db.js');

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;
  
    try {
      await db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
        name,
        genre,
      ]);
  
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500).json(err);
    }
  
    db.close();
  };

  exports.read = async (req, res) => {
    const db = await getDb();

    try {
      const [artists] = await db.query('SELECT * FROM Artist')

      res.status(201).json(artists);
    } catch (e) {
      res.sendStatus(500).json(e);
    }
    
    db.close();
  };

  exports.readById = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;

    try {
      const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
        artistId,
      ]);
    
      if (!artist) {
        res.sendStatus(404);
      } else {
      res.status(201).json(artist); 
      }

    } catch (e) {
      res.sendStatus(500).json(e);
    }
    
    db.close();
  };

  exports.updateById = async (req, res) => {
    const db = await getDb();
    const data = req.body;
    const { artistId } = req.params;
  
    try {
      const [
        { affectedRows },
      ] = await db.query('UPDATE Artist SET ? WHERE id = ?', [data, artistId]);
  
      if (!affectedRows) {
        res.sendStatus(404);
      } else {
        res.status(200).send();
      }
    } catch (err) {
      res.sendStatus(500);
    }
  
    db.close();
  };

  exports.deleteById = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;

    try {
      const [{ affectedRows }] = await db.query ('DELETE FROM Artist WHERE id = ?', [
        artistId,
      ])

      if(!affectedRows) {
        res.sendStatus(404);
      } else {
        res.status(200).send()
      }

    } catch(e) {
      res.status(500).json(e);
      console.log(e);
    }

    db.close();
  }