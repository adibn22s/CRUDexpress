const express = require('express');
const app = express();
const port = 8000;
const BodyParser = require('body-parser');
const dbase = require('./connection');
const response = require('./response');

app.use(BodyParser.json());

// endpoint get(/)
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM plant_disease';
  dbase.query(sql, (err, result) => {
    response(200, result, 'get data from plant_disease', res);
  });
});

// endpoint tambah(/tambah)
app.post('/tambah', (req, res) => {
  const { nama, deskripsi, solusi } = req.body;
  const sql = `INSERT INTO plant_disease ( nama_PD, deskripsi, solusi ) VALUES 
  ('${nama}', '${deskripsi}', '${solusi}')`;

  dbase.query(sql, (err, result) => {
    if (err) response(500, 'invalid', 'error', res);
    if (result?.affectedRows) {
      const data = {
        Success: result.affectedRows,
        id: result.Insertid,
      };
    }
    response(200, result, 'Berhasil Tambah Data', res);
  });
});

// endpoint edit(/edit)
app.put('/edit', (req, res) => {
  const { id, nama, deskripsi, solusi } = req.body;
  const sql = `UPDATE plant_disease SET nama_PD = '${nama}', deskripsi = '${deskripsi}', solusi = '${solusi}' 
  WHERE id_PD = ${id}`;

  dbase.query(sql, (err, result) => {
    if (err) response(500, 'invalid', 'error', res);
    if (result?.affectedRows) {
      const data = {
        Success: result.affectedRows,
        message: result.message,
      };
      response(200, result, 'Data Berhasil Diubah', res);
    } else {
      response(404, 'Data tidak ditemukan', 'error', res);
    }
  });
});

// endpoint delete(/delete)
app.delete('/delete', (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM plant_disease WHERE id_PD = ${id}`;

  dbase.query(sql, (err, result) => {
    if (err) response(500, 'invalid', 'error', res);

    if (result?.affectedRows) {
      const data = {
        Success: result.affectedRows,
      };
      response(200, result, 'Data Berhasil Dihapus', res);
    } else {
      response(404, 'Data tidak ditemukan', 'error', res);
    }
  });
});

app.listen(port, () => {
  console.log(`Berjalan di port ${port}`);
});
