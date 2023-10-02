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


router.post('/postBarChartData',cors(corsOptions) ,service.postBarChartData);
router.get('/getBarChartData',cors(corsOptions), service.getBarChartData);

router.post('/postPieChartData',cors(corsOptions) ,service.postPieChartData);
router.get('/getPieChartData',cors(corsOptions), service.getPieChartData);

//tabs
router.post('/postTabsData',cors(corsOptions) ,service.postTabsData);
router.get('/getTabsData',cors(corsOptions), service.getTabsData);

//cards
router.post('/postCardData',cors(corsOptions) ,service.postCardData);
router.get('/getCardData',cors(corsOptions), service.getCardData);



module.exports = router;
