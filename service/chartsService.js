const connection = require("../connections/db")
const config = require('../tables.json');

//post query for bar charts
const postBarChartData = (req, res) => {
    const jsonData = JSON.stringify(req.body);
    const query = `INSERT INTO ${config.tables.barcharts} (json_data) VALUES (?)`;
  
    connection.query(query, [jsonData], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: 'Error', message: 'Failed to insert JSON data.' });
      }
      const response = {
        status: 'JSON data inserted successfully',
        data,
      };
      res.status(200).json(response);
    });
  };
  
  //Get bar chart data 
  const getBarChartData = (req, res) => {
    const query = `SELECT * FROM ${config.tables.barcharts}`;
  
    connection.query(query, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: 'Error', message: 'Failed to retrieve data from MySQL.' });
      }
  
      // Assuming your MySQL table has a JSON column named 'json_data'
      // Modify this part to extract the specific data you want if needed
      const jsonData = rows.map((row) => JSON.parse(row.json_data));
  
      res.status(200).json(jsonData);
    });
  };
  
  //post data for pie charts
  const postPieChartData = (req, res) => {
      const jsonData = JSON.stringify(req.body);
      const query = `INSERT INTO ${config.tables.piecharts} (json_data) VALUES (?)`;
    
      connection.query(query, [jsonData], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: 'Error', message: 'Failed to insert JSON data.' });
        }
    
        const response = {
          status: 'JSON data inserted successfully',
          data,
        };
        res.status(200).json(response);
      });
    };
  
  //get pie chart data
  
  const getPieChartData = (req, res) => {
      const query = `SELECT * FROM ${config.tables.piecharts}`;
    
      connection.query(query, (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: 'Error', message: 'Failed to retrieve data from MySQL.' });
        }
    
        // Assuming your MySQL table has a JSON column named 'json_data'
        // Modify this part to extract the specific data you want if needed
        const jsonData = rows.map((row) => JSON.parse(row.json_data));
    
        res.status(200).json(jsonData);
      });
    };
  
  
  //tabs
    const postTabsData = (req, res) => {
      const jsonData = JSON.stringify(req.body);
      const query = `INSERT INTO ${config.tables.tabs} (json_data) VALUES (?)`;
    
      connection.query(query, [jsonData], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: 'Error', message: 'Failed to insert JSON data.' });
        }
    
        const response = {
          status: 'JSON data inserted successfully',
          data,
        };
        res.status(200).json(response);
      });
    };
  
  
    //get tabs
    const getTabsData = (req, res) => {
      const query = 'SELECT * FROM ${config.tables.tabs}';
    
      connection.query(query, (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: 'Error', message: 'Failed to retrieve data from MySQL.' });
        }
    
        // Modify this part to extract the specific data you want if needed
        const jsonData = rows.map((row) => JSON.parse(row.json_data));
    
        res.status(200).json(jsonData);
      });
    };
  
  //cards
  const postCardData = (req, res) => {
      const jsonData = JSON.stringify(req.body);
      const query = `INSERT INTO ${config.tables.card} (json_data) VALUES (?)`;
    
      connection.query(query, [jsonData], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: 'Error', message: 'Failed to insert JSON data.' });
        }
    
        const response = {
          status: 'JSON data inserted successfully',
          data,
        };
        res.status(200).json(response);
      });
    };
  
  
    //get card 
    const getCardData = (req, res) => {
      const query = 'SELECT * FROM ${config.tables.card}';
    
      connection.query(query, (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: 'Error', message: 'Failed to retrieve data from MySQL.' });
        }
    
        // Assuming your MySQL table has a JSON column named 'json_data'
        // Modify this part to extract the specific data you want if needed
        const jsonData = rows.map((row) => JSON.parse(row.json_data));
    
        res.status(200).json(jsonData);
      });
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