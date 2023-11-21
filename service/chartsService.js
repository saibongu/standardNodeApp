const { log } = require("console");
const connection = require("../connections/db")
const config = require('../tables.json');
const multer = require('multer');
const path = require('path');


//image upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for storing uploaded images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); // File name will be unique timestamp + original file extension
    }
});

const upload = multer({ storage: storage });

const postImage = async (req, res) => {
    try {
        const imageFile = req.file; // Assuming you are using 'image' field for file upload in your form
        console.log(imageFile);
        const imagePath = imageFile ? 'uploads/' + imageFile.filename : null; // Image path to be stored in the database
        const query = `INSERT INTO ${config.tables.images} (image_path) VALUES (?)`;

        const data = await new Promise((resolve, reject) => {
            connection.query(query, [imagePath], (err, data) => {
                if (err) {
                    console.error(err);
                    reject('Failed to insert data.');
                } else {
                    resolve(data);
                }
            });
        });

        const response = {
            status: 'Data inserted successfully',
            data,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to insert data.' });
    }
};

//get images 
const getImages = async (req, res) => {
    try {
        const query = `SELECT * FROM ${config.tables.images}`;
        
        const data = await new Promise((resolve, reject) => {
            connection.query(query, (err, data) => {
                if (err) {
                    console.error(err);
                    reject('Failed to fetch data.');
                } else {
                    resolve(data);
                }
            });
        });

        const response = {
            status: 'Data fetched successfully',
            data,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to fetch data.' });
    }
};
//post-bar charts
const postBarChartData = async (req, res) => {
    try {
        const jsonData = JSON.stringify(req.body);
        const query = `INSERT INTO ${config.tables.barcharts} (json_data) VALUES (?)`;

        await new Promise((resolve, reject) => {
            connection.query(query, [jsonData], (err, data) => {
                if (err) {
                    console.error(err);
                    reject('Failed to insert JSON data.');
                } else {
                    resolve(data);
                }
            });
        });

        const response = {
            status: 'JSON data inserted successfully',
            data: jsonData,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to insert JSON data.' });
    }
};

//Get bar chart data 
const getBarChartData = async (req, res) => {
    try {
        const query = `SELECT * FROM ${config.tables.barcharts}`;
        const rows = await new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    console.error(err);
                    reject('Failed to retrieve data from MySQL.');
                } else {
                    resolve(rows);
                }
            });
        });

        const jsonData = rows.map((row) => JSON.parse(row.json_data));

        res.status(200).json(jsonData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to retrieve data from MySQL.' });
    }
};

//post data for pie charts
const postPieChartData = async (req, res) => {
    try {
        const jsonData = JSON.stringify(req.body);
        const query = `INSERT INTO ${config.tables.piecharts} (json_data) VALUES (?)`;

        await new Promise((resolve, reject) => {
            connection.query(query, [jsonData], (err, data) => {
                if (err) {
                    console.error(err);
                    reject('Failed to insert JSON data.');
                } else {
                    resolve(data);
                }
            });
        });

        const response = {
            status: 'JSON data inserted successfully',
            data: jsonData,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to insert JSON data.' });
    }
};


//get pie chart data
const getPieChartData = async (req, res) => {
    try {
        const query=`SELECT * FROM ${config.tables.piecharts}`;
        const rows = await new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    console.error(err);
                    reject('Failed to retrieve data from MySQL.');
                } else {
                    resolve(rows);
                }
            });
        });

        const jsonData = rows.map((row) => JSON.parse(row.json_data));

        res.status(200).json(jsonData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to retrieve data from MySQL.' });
    }
};
//post-tabs
const postTabsData = async (req, res) => {
    try {
        const jsonData = JSON.stringify(req.body);
        const query = `INSERT INTO ${config.tables.tabs} (json_data) VALUES (?)`;

        const data = await new Promise((resolve, reject) => {
            connection.query(query, [jsonData], (err, data) => {
                if (err) {
                    console.error(err);
                    reject('Failed to insert JSON data.');
                } else {
                    resolve(data);
                }
            });
        });

        const response = {
            status: 'JSON data inserted successfully',
            data,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to insert JSON data.' });
    }
};
//get tabs
const getTabsData = async (req, res) => {
    try {
        const query = `SELECT * FROM ${config.tables.tabs}`;
        const rows = await new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    console.error(err);
                    reject('Failed to retrieve data from MySQL.');
                } else {
                    resolve(rows);
                }
            });
        });

        const jsonData = rows.map((row) => JSON.parse(row.json_data));

        res.status(200).json(jsonData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to retrieve data from MySQL.' });
    }
};
//post-card
const postCardData = async (req, res) => {
    try {
        const jsonData = JSON.stringify(req.body);
        const query = `INSERT INTO ${config.tables.card} (json_data) VALUES (?)`;

        const data = await new Promise((resolve, reject) => {
            connection.query(query, [jsonData], (err, data) => {
                if (err) {
                    console.error(err);
                    reject('Failed to insert JSON data.');
                } else {
                    resolve(data);
                }
            });
        });

        const response = {
            status: 'JSON data inserted successfully',
            data,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Failed to insert JSON data.' });
    }
};

//get-card 
// const getCardData = async (req, res) => {
//     try {
//         const query = `SELECT * FROM ${config.tables.card}`;
//         const rows = await new Promise((resolve, reject) => {
//             connection.query(query, (err, rows) => {
//                 if (err) {
//                     console.error(err);
//                     reject('Failed to retrieve data from MySQL.');
//                 } else {
//                     resolve(rows);
//                 }
//             });
//         });

//         const jsonData = rows.map((row) => JSON.parse(row.json_data));
//         res.status(200).json(jsonData);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ status: 'Error', message: 'Failed to retrieve data from MySQL.' });
//     }
// };

///base 64 image


// async function uploadImage(base64Image) {
//   try {
//     const binaryImage = Buffer.from(base64Image, 'base64');
//     // const connection = await pool.getConnection();
//     await connection.query('INSERT INTO imagees (data) VALUES (?)', [binaryImage]);
//     // connection.release();
//     return { message: 'Image uploaded successfully' };
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// }


// async function getAllImages() {
//   try {
//     // const connection = await pool.getConnection();
//     const [rows] = await connection.query('SELECT * FROM imagees');
  
//     return rows;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// }



async function uploadImage(base64Image) {
  try {

    const binaryImage = Buffer.from(base64Image, 'base64');
    await connection.query('INSERT INTO imagees (data) VALUES (?)', [binaryImage]);

    return { message: 'Image uploaded successfully' };
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
}
async function getAllImages() {
    try {
      const [rows] = await connection.query('SELECT * FROM imagees');
      if (!rows || rows.length === 0) {
        return []; // Or handle the empty result case based on your requirements
      }
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }
  
module.exports = {
    getPieChartData,
    postPieChartData,
    getBarChartData,
    postBarChartData,
    postTabsData,
    getTabsData,
    // getCardData,
    postCardData,
    postImage,
    upload,
    uploadImage,
    getAllImages,
    getImages
}