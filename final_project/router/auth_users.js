const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

let userExists = users.filter((users)=>{
return users.username === username
})

if(userExists.length >  0){
  return true
}
else{
  return false
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validUsers =  users.filter((user)=>{
  return (user.username == username && user.password == password)
})

if(validUsers.length > 0){
  return true;
}
else{
  return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  //Write your code here

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
}
  if(isValid(username)){

    if(authenticatedUser(username, password)){
        let accesToken = jwt.sign({
          data : password 
        },"accessKey")

        req.session.authorization = {accesToken, username}
     
  return res.status(200).send("User successfully logged in");
    }
    else{
      return res.status(208).json({message: "Invalid Login. Check username and password"});

    }
}
  else{
    return res.status(404).json({message : "User doesn't exist"});
  }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

