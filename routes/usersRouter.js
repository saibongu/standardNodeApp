var express = require('express');
var router = express.Router();
// var service=require('../service/chartsService');
var service=require('../service/usersService');
var cors = require('cors');
const app = require('../app');
router.use(cors())

var corsOptions =
{
    origin: '*'
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

router.post('/postuserdata', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.postUsersData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

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
router.post('/login', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.loginResponseData(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

router.put('/updateTableData/:id', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.updateTabledata(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

// router.delete('/delete/:id',cors(corsOptions),service.deleteUser)
router.delete('/delete/:id', cors(corsOptions), async (req, res) => {
  try {
      const usersData = await service.deleteUser(); 
      res.status(200).json(usersData);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

module.exports = router;
