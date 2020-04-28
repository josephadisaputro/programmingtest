Firstly this test was done by Yusuf Adisaputro for PT. Teravin Technovations

1. cmd > cd desktop > mkdir teravin 
2. download all from git hub

The answer was built using Node.js + express + ejs + MySQL

DO NOT FORGET TO IMPORT DATABASE (teravintestdb.sql) to your MYSQL
Please search how to import Database

To alter (probably needed) changes:
1. use your personal IDE (notepad++, VisualStudio, etc)
2. open index.js 
3.  you can alter these variables if wanted:
var port = process.env.PORT || 3000;

AND 

var pooltest = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "edihub4265",
    database: "teravintestdb"
})

To run:
1. on cmd > go to the directory path. Example cd desktop/teravin
2. on cmd > npm install express
3. on cmd > npm install ejs
4. on cmd > npm install mysql
5. on cmd > node index.js 
5. on browser > localhost:3000 (if port number not altered)
