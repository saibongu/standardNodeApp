var express = require('express');
var router = express.Router();
var service = require('../service/chartsService');
var cors = require('cors');
const app = require('../app');


router.use(cors())
var corsOptions =
{
  origin: '*'
}

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/postImagePath', cors(corsOptions), service.upload.single('image'), async (req, res) => {
  try {
    const usersData = await service.postImage(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});
//post-barChart
router.post('/postBarChartData', cors(corsOptions), async (req, res) => {
  try {
    const usersData = await service.postBarChartData(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

//get-barChart
router.get('/getBarChartData', cors(corsOptions), async (req, res) => {
  try {
    const usersData = await service.getBarChartData(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

//post-pieChart 
router.post('/postPieChartData', cors(corsOptions), async (req, res) => {
  try {
    const usersData = await service.postPieChartData(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

//get-pieChart 
router.get('/getPieChartData', cors(corsOptions), async (req, res) => {
  try {
    const usersData = await service.getPieChartData(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

//post-tabs
router.post('/postTabsData', cors(corsOptions), async (req, res) => {
  try {
    const usersData = await service.postTabsData(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

//get-tabs
router.get('/getTabsData', cors(corsOptions), async (req, res) => {
  try {
    const usersData = await service.getTabsData(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

//post-card
router.post('/postCardData', cors(corsOptions), async (req, res) => {
  try {
    const usersData = await service.postCardData(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

//get-card
router.get('/getCardData', cors(corsOptions), async (req, res) => {
  try {
    const usersData = await service.getCardData(req, res);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});


//image base64
router.post('/upload', async (req, res) => {
  try {
    const base64Image = req.body.base64Image;
    const response = await service.uploadImage(base64Image);
    res.status(200).json(response);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});


router.get('/getImages', async (req, res) => {
  try {
    const images = await service.getAllImages();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});





module.exports = router;
