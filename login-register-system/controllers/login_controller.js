const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});




exports.login = (req, res) => {
    //console.log(req.body);
   
    const {email, password} = req.body;
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
       
        //const match = await bcrypt.compare(password, results[0].password);
        
        if(error) {
            console.log(error);
        }
        if(results.length === 0) {
            return res.render('index', {
                message: 'Wrong email or password'
            })
            
        }else if(password === ''){
            return res.render('index', {
                message: 'Please enter a password'
            })
        }else {
            const match = await bcrypt.compare(password, results[0].password);
            if(!match) {
                return res.render('index', {
                    message: 'Wrong email or password'
                })
            }
            return res.render('profile', {
                Name: results[0].name,
                Email: results[0].email
            })
        }

        

    

    })
        
 
}