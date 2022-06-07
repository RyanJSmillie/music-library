const getDb = require('/Volumes/WDPassport/ManchesterCodes/music-library/src/services/db.js');

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre, year } = req.body;
    // const { artistId } = req.parmas;
  
    try {
      await db.query(`INSERT INTO Album (name, genre, year) VALUES (?, ?, ?)`, [
        name,
        genre,
        year,
      ]);
  
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500).json(err);
    }
  
    db.close();
  };