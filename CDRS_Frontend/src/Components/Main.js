import React, { useState, useEffect } from "react";
import Card from "./Card";
import bkdetails from "./bkdetails"
// import "./style.css";
const Main = ({setIsCardClicked,setbktitle}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const books=bkdetails.book;
  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, books]);
  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>
            A room without books is like
            <br /> a body without a soul.
          </h1>
        </div>
        <div className="row2">
          <h2>Find Your Book For Recommendation</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <img
            src="./images/bg4.png"
            alt="bg4"
          />
        </div>
      </div>
      <div className="container">
        {filteredBooks.map((book) => (
          <Card title={book.title} setIsCardClicked={setIsCardClicked} setbktitle={setbktitle}/>
        ))}
      </div>
    </>
  );
};
export default Main;
