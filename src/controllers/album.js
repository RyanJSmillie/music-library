const getDb = require('../services/db');

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre, year } = req.body;
    const artistId = req.params.artistId;
  
    try {
      await db.query(`INSERT INTO Album (name, genre, year, artistId) VALUES (?, ?, ?, ?)`, [
        name,
        genre,
        year,
        artistId,
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
      const [albums] = await db.query('SELECT * FROM Album')

      res.status(201).json(albums);
    } catch (e) {
      res.sendStatus(500).json(e);
    }
    
    db.close();
  };

  exports.readById = async (req, res) => {
    const db = await getDb();
    const { albumId } = req.params;

    try {
      const [[album]] = await db.query('SELECT * FROM Album WHERE id = ?', [
        albumId,
      ]);
    
      if (!album) {
        res.sendStatus(404);
      } else {
      res.status(201).json(album); 
      }

    } catch (e) {
      res.sendStatus(500).json(e);
    }
    
    db.close();
  };

  exports.updateById = async (req, res) => {
    const db = await getDb();
    const data = req.body;
    const { albumId } = req.params;
  
    try {
      const [
        { affectedRows },
      ] = await db.query('UPDATE Album SET ? WHERE id = ?', [data, albumId]);
  
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