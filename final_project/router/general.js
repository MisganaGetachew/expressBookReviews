const express = require('express');
// const bodyParser = require('body-parser');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
let username = req.body.username
let password = req.body.password

if(username && password ){
  if(isValid(username)){
   return res.status(300).json({message: "user already exists!"});
  }
  else{
    users.push({"username": username, "password" : password})
   return res.status(300).json({message: "user succesfully registerd!"});


  }
}
  return res.status(300).json({message: "unable to register "});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(300).json({BooksList: JSON.stringify(books)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
let isbn = req.params.isbn

if(isbn){

  let book = books[isbn]
  if(book){
    return res.status(300).json({Book: JSON.stringify(book)});
  }
  else{
    return res.status(300).json({message: "Book not found"});
  }

}

  return res.status(300).json({message: "ISBN not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let found = false
  
  if(author){
    for(let bookId in books){

      let book = books[bookId]

      if(book.author == author){
        found = true

        return res.status(300).json({book: JSON.stringify(book)})
      }
      
    }
    
    if(found == false){

      
      return res.status(300).json({message: `books written by ${author} do not exist`});
  }
    
  }
else{
  return res.status(300).json({message: "please insert valid author name"});

}


});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title = req.params.title;
  let found = false
  
  if(title){
    for(let bookId in books){

      let book = books[bookId]

      if(book.title == title){
        found = true

        return res.status(300).json({book: JSON.stringify(book)})
      }
      
    }
    
    if(found == false){

      
      return res.status(300).json({message: `books with title:  ${title}  do not exist`});
  }
    
  }
else{
  return res.status(300).json({message: "please insert valid author name"});

}


});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let found = false;
  if(isbn){
    for(let bookId in books){
      if(bookId == isbn){
      let book = books[bookId];
        return res.status(300).json({bookReview: JSON.stringify(book.reviews)});
      }
     
    }
    if(found == false){
      
    return res.status(300).json({message: `book with isbn :  ${isbn}  do not exist`});
    }
  }
  return res.status(300).json({message: "please enter a valid isbn"});
});



module.exports.general = public_users;
