var express = require('express');
var router = express.Router();
var service=require('../service/chartsService');

var cors = require('cors');
const app = require('../app');
router.use(cors())

var corsOptions =
{
    origin: '*'
}
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//router.post('/postBarChartData',cors(corsOptions) ,service.postBarChartData);
router.post('/postBarChartData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.postBarChartData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



//router.get('/getBarChartData',cors(corsOptions), service.getBarChartData);
router.get('/getBarChartData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.getBarChartData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



//router.post('/postPieChartData',cors(corsOptions) ,service.postPieChartData);
router.get('/postPieChartData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.postPieChartData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



//router.get('/getPieChartData',cors(corsOptions), service.getPieChartData);
router.get('/getPieChartData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.getPieChartData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



//tabs
//router.post('/postTabsData',cors(corsOptions) ,service.postTabsData);
router.get('/postTabsData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.postTabsData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



router.get('/getTabsData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.getTabsData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



//cards

router.get('/postCardData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.postCardData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



router.get('/getCardData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.getCardData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



module.exports = router;
