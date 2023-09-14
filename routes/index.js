var express = require('express');
var router = express.Router();
var service=require('../service/usersdata');
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


// users Registration API's
router.get('/listofusers', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.getUsersData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});



router.post('/postuserdata',cors(corsOptions),service.postUsersData) 


// selected fields of get api for tables (id, firstName, email,phoneNumber,age)
router.get('/usersData', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.getUsersTableData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});


//sending total data as a based on username and password
router.post('/login',cors(corsOptions),service.loginResponseData)

router.put('/updateTableData/:id',cors(corsOptions),service.updateTabledata)


router.put('/delete/:id',cors(corsOptions),service.deleteUser)

router.post('/postBarChartData',cors(corsOptions) ,service.postBarChartData);
router.get('/getBarChartData',cors(corsOptions), service.getBarChartData);

router.post('/postPieChartData',cors(corsOptions) ,service.postPieChartData);
router.get('/getPieChartData',cors(corsOptions), service.getPieChartData);

module.exports = router;
