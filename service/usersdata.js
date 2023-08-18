var connection = require("../connections/dbconnection")
const bcrypt = require('bcrypt');



//get all users data 
// var getUsersData = function (req, res) {
//     let query = "select *from usersdata"
//     connection.query(query, function (err, data) {
//         if (!err) {
//             const resp =
//             {
//                 'status': 'All the users data get successfully',
//                 'respones': data
//             }

//             res.send(resp)
//             // res.send(data)
//         }
//         else {
//             const resp = {
//                 'status': 'failed',
//                 'respones': err
//             }
//             res.status(400).send(resp)
//         }
//     })
// }

const getUsersData = async () => {
    try {
        console.log("getUsersData was called")

        let sqlQuery = `select *from usersdata`;
        return new Promise(async (resolve, reject) => {
            connection.query(sqlQuery, (err, results) => {

                if (err) {
                    console.error(`Failed to retrieve product : ${err}`);
                    reject(err);
                } else {
                    // let response = JSON.parse(JSON.stringify(results));
                    // console.log("getUsersData function", response);
                    resolve(results);
                }
            });
        })
    } catch (err) {
        console.log("Error while calling function", err);
        // throw error;
    }

}



// var postUsersData = function (req, res) {

//     let query = "insert into usersdata (firstName, lastName, email, phoneNumber, alternativeNumber, age, userName, password) values ('" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.email + "','" + req.body.phoneNumber + "','" + req.body.alternativeNumber + "','" + req.body.age + "','" + req.body.userName + "','" + req.body.password + "')"

//     connection.query(query, function (err, data) {
//         if (!err) {
//             const resp =
//             {
//                 'status': 'sucesss',
//                 'respones': 'Successfully inserted the Record',
//                 'recordId': data.insertId
//             }

//             res.send(resp)
//         }
//         else {
//             console.log(err)
//         }
//     })
// }

//posting users
var postUsersData = function (req, res) {
    const saltRounds = 10; 

    bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
        if (err) {
            console.log(err);
            return res.status(500).send("Error encrypting password");
        }

        let query = "insert into usersdata (firstName, lastName, email, phoneNumber, alternativeNumber, age, userName, password) values ('" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.email + "','" + req.body.phoneNumber + "','" + req.body.alternativeNumber + "','" + req.body.age + "','" + req.body.userName + "','" + hashedPassword + "')"

        connection.query(query, function (err, data) {
            if (!err) {
                const resp = {
                    'status': 'success',
                    'response': 'Successfully inserted the Record',
                    'recordId': data.insertId
                }
                res.send(resp);
            } else {
                console.log(err);
                res.status(500).send("Error inserting record");
            }
        });
    });
}


// var loginResponseData = function (req, res) {

//     var resquery = "SELECT * FROM usersdata WHERE userName = '" + req.body.userName + "' && password = '" + req.body.password + "' " ;
//     connection.query(resquery, (err, result) => {
//         if (err) {
//             throw err;
//             return res.status(400).send({
//                 msg: err
//             });
//         }
//         if (!result.length) {
//             return res.status(401).send({

//                 msg: 'please enter valid username and password'
//             });
//         }
//         // res.send(result)
//         const data = {
//             status: 'success',
//             response: result
//         }
//        return res.send(data)
//         return res.status(401).send({
//             msg: 'Username or password is incorrect!'
//         });
//     }
//     );
// }




// var loginResponseData = function (req, res) {
//     const { userName, password } = req.body;
    
//     const query = "SELECT * FROM usersdata WHERE userName = ? AND password = ?";
//     connection.query(query, [userName, password], (err, result) => {
//         if (err) {
//             return res.status(400).send({ msg: err });
//         }
        
//         if (result.length === 0) {
//             return res.status(401).send({ msg: 'Please enter valid username and password' });
//         }

//         const data = {
//             status: 'success',
//             response: result
//         };
//         return res.send(data);
//     });
// };







//user login 
var loginResponseData = function (req, res) {
    const { userName, password } = req.body;
    
    const query = "SELECT * FROM usersdata WHERE userName = ?";
    connection.query(query, [userName], async (err, result) => {
        if (err) {
            return res.status(400).send({ msg: err });
        }
        
        if (result.length === 0) {
            return res.status(401).send({ msg: 'Please enter valid username and password' });
        }

        const hashedPasswordFromDb = result[0].password;
        
        try {
            const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDb);
            
            if (passwordMatch) {
                const data = {
                    status: 'success',
                    response: result
                };
                return res.send(data);
            } else {
                return res.status(401).send({ msg: 'Please enter valid username and password' });
            }
        } catch (compareErr) {
            console.log(compareErr);
            return res.status(500).send({ msg: 'Error comparing passwords' });
        }
    });
};



// var getUsersTableData = function (req, res) {
//     let query = "SELECT id, firstName, email,phoneNumber,age FROM usersdata"

    
//     connection.query(query, function (err, data) {
//         if (!err) {
//             const resp =
//             {
//                 'status': 'Users data get successfully',
//                 'respones': data
//             }

//             res.send(resp)
//             // res.send(data)
//         }
//         else {
//             const resp = {
//                 'status': 'failed',
//                 'respones': err
//             }
//             res.status(400).send(resp)
//         }
//     })
// }

const getUsersTableData = async () => {
    try {
        console.log("getUsersTableData was called")

        let sqlQuery = `SELECT id, firstName, email,phoneNumber,age FROM usersdata`;
        return new Promise(async (resolve, reject) => {
            connection.query(sqlQuery, (err, results) => {

                if (err) {
                    console.error(`Failed to retrieve product : ${err}`);
                    reject(err);
                } else {
                    // let response = JSON.parse(JSON.stringify(results));
                    // console.log("getUsersTableData function", response);
                    resolve(results);
                }
            });
        })
    } catch (err) {
        console.log("Error while calling function", err);
        // throw error;
    }

}
    



module.exports = {getUsersData:getUsersData, getUsersTableData:getUsersTableData, postUsersData: postUsersData,loginResponseData:loginResponseData}