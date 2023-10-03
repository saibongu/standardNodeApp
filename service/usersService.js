const connection = require("../connections/db")
const bcrypt = require('bcrypt');
const config = require('../tables.json');


//get all users data 
 const getUsersData = async () => {
    try {
        let sqlQuery = `SELECT * FROM ${config.tables.usersData}`;
        return new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, results) => {
                if (err) {
                    console.error(`Failed to get usersdata : ${err}`);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    } catch (err) {
        console.log("Error while calling function", err);
        throw err;
    }
};

//posting users

 const postUsersData = async (req, res) => {
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const query = `INSERT INTO ${config.tables.usersData} 
        (firstName, lastName, email, phoneNumber, alternativeNumber, age, userName, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.phoneNumber,
            req.body.alternativeNumber,
            req.body.age,
            req.body.userName,
            hashedPassword
        ];

        const insertId = await new Promise((resolve, reject) => {
            connection.query(query, values, (err, data) => {
                if (err) {
                    console.error(err);
                    reject('Error inserting record');
                } else {
                    resolve(data.insertId);
                }
            });
        });

        const resp = {
            'status': 'success',
            'response': 'Successfully inserted the Record',
            'recordId': insertId
        };
        res.send(resp);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error inserting record");
    }
};


//user login 
const loginResponseData = async (req, res) => {
    const { userName, password } = req.body;

    const query = `SELECT * FROM ${config.tables.usersData} WHERE userName = ?`;

    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(query, [userName], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

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
                return res.send(data); // Send the response and return from the function
            } else {
                return res.status(401).send({ msg: 'Please enter valid username and password' });
            }
        } catch (compareErr) {
            console.error(compareErr);
            return res.status(500).send({ msg: 'Error comparing passwords' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).send({ msg: err });
    }
};


// get table data 
 const getUsersTableData = async () => {
    try {
        console.log("getUsersTableData was called")

        let sqlQuery = `SELECT id, firstName, email,phoneNumber,age FROM ${config.tables.usersData}`;
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
 const updateTabledata = async (req, res) => {
    try {
        let id = req.params.id;
        let firstName = req.body.firstName;
        let email = req.body.email;
        let phoneNumber = req.body.phoneNumber;
        let alternativeNumber = req.body.alternativeNumber;
        let age = req.body.age;
        let lastName = req.body.lastName;
        let userName = req.body.userName;

        let sql = `UPDATE ${config.tables.usersData}
                   SET firstName=?, lastName=?, email=?, phoneNumber=?, alternativeNumber=?, age=?, userName=?
                   WHERE id=?`;

        await new Promise((resolve, reject) => {
            connection.query(sql, [firstName, lastName, email, phoneNumber, alternativeNumber, age, userName, id], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        return 'Record updated successfully';
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


//delete data based on id
 const deleteUser = async (req, res) => {
    try {
        console.log("delete", req.params.id);
        let delquery = `DELETE FROM ${config.tables.usersData} WHERE id = ?`;

        await new Promise((resolve, reject) => {
            connection.query(delquery, [req.params.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        res.send("Deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports = {
   
    deleteUser,
    updateTabledata,
    postUsersData,
    loginResponseData,
    getUsersData,
    getUsersTableData
    
}