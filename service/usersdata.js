var connection = require("../connections/dbconnection")
const bcrypt = require('bcrypt');



//get all users data 
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
                     let response = JSON.parse(JSON.stringify(results));
                     console.log("getUsersData function", response);
                    resolve(results);
                }
            });
        })
    } catch (err) {
        console.log("Error while calling function", err);
        // throw error;
    }

}


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
                    let response = JSON.parse(JSON.stringify(results));
                     console.log("getUsersTableData function", response);
                    resolve(results);
                }
            });
        })
    } catch (err) {
        console.log("Error while calling function", err);
         throw error;
    }

}
    
//update data

var updateTabledata = (req, res) => {
    var id = req.params.id
    var firstName = req.body.firstName
    var email = req.body.email
    var phoneNumber = req.body.phoneNumber
    var age = req.body.age
    


    let sql = "UPDATE usersdata set firstName=?, email=?, phoneNumber=?, age=? where id=?";

    connection.query(sql, [firstName, email, phoneNumber, age, id], function (err, data) {

        if (!err) {
            res.send(data)
        }
        else {
            res.send(err)
        }
    }
    )
}

//charts data
var chartData = function (req, res) {
    let query = "select *from charts"
    connection.query(query, function (err, data) {
        if (!err) {
            //    res.send(data)
            const resp = {
                'status': 'charts data get successfully',
                'responese': data
            }
            res.send(resp.responese)
        }
        else {
            res.status(400).send(err)
        }
    })
}


//delete data baed on id
var deleteUser = function (req, res) {
    console.log("delete", req.params.id)
    var delquery = "DELETE FROM usersdata WHERE id=" + req.params.id;
    connection.query(delquery, (err) => {

        if (!err) {
            res.send("Deleted sucessfully")
        }
        else {
            console.log(err);
        }
    });
}



module.exports = {deleteUser:deleteUser,chartData:chartData,updateTabledata:updateTabledata,getUsersData:getUsersData, getUsersTableData:getUsersTableData, postUsersData: postUsersData,loginResponseData:loginResponseData}