var express = require('express');
var router = express.Router();
var service = require('../service/usersService');
var cors = require('cors');
const multer = require('multer');
const app = require('../app');

const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files
router.use(cors())

var corsOptions =
{
    origin: '*'
}
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// get all users
router.get('/listofusers', cors(corsOptions), async (req, res) => {
    try {
        const usersData = await service.getUsersData();
        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user data.' });
    }
});

//posting user data
router.post('/postuserdata', cors(corsOptions), async (req, res) => {
    try {
        const usersData = await service.postUsersData(req, res);
        res.status(200).json(usersData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing user data.' });
    }
});

// table data
router.get('/usersData', cors(corsOptions), async (req, res) => {
    try {
        const usersData = await service.getUsersTableData(req, res);
        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user data.' });
    }
});

//user login
//user login
router.post('/login', cors(corsOptions), async (req, res) => {
    try {
        const usersData = await service.loginResponseData(req, res);
        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user data.' });
    }
});


//table update
router.put('/updateTableData/:id', cors(corsOptions), async (req, res) => {
    try {
        const usersData = await service.updateTabledata(req, res);
        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user data.' });
    }
});

//delete user
router.delete('/delete/:id', cors(corsOptions), async (req, res) => {
    try {
        const usersData = await service.deleteUser(req, res);
        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user data.' });
    }
});

module.exports = router;
