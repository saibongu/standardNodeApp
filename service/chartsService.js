const connection = require("../connections/db")
const config = require('../tables.json');

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
        const query = `SELECT * FROM ${config.tables.piecharts}`;
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
const getCardData = async (req, res) => {
    try {
        const query = `SELECT * FROM ${config.tables.card}`;
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

module.exports = {
    getPieChartData,
    postPieChartData,
    getBarChartData,
    postBarChartData,
    postTabsData,
    getTabsData,
    getCardData,
    postCardData,
}