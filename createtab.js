const connection = require("./db");

// Create applicants table
const createApplicantsTable = `
CREATE TABLE IF NOT EXISTS applicants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);`;

// Create documents table
const createDocumentsTable = `
CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE
);`;

const createUser = `
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);`;



// Execute queries separately

connection.query(createUser, (err, results) =>{
    if(err) console.error("Error creting user table",err);
    else console.log("User created");

    connection.end();
})

// connection.query(createApplicantsTable, (err, results) => {
//   if (err) {
//     console.error("Error creating applicants table:", err);
//     return;
//   }
//   console.log("Applicants table created successfully!");

//   // Execute the second query after the first one completes
//   connection.query(createDocumentsTable, (err, results) => {
//     if (err) {
//       console.error("Error creating documents table:", err);
//     } else {
//       console.log("Documents table created successfully!");
//     }
//     connection.end(); // Close connection after execution
//   });
// });
