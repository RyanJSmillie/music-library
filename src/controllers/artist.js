const getDb = require('/Volumes/WDPassport/ManchesterCodes/music-library/src/services/db.js');

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;
  
    try {
      await db.query(`INSERT INTO Artist (name, genre) VALUES ('${name}', '${genre}')`);
  
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500).json(err);
    }
  
    db.close();
  };