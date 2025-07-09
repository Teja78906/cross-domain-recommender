import React, { useState,useEffect } from "react";
import Musiccard from './Musiccard';
import axios from 'axios';
const Music=({item})=>{
  const [mu, setResults] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.post('http://localhost:5000/get-results', { book_title: item });
        setResults(response.data);
      } catch (error) {
        // console.error('Error fetching results:', error);
        console.error('Error fetching results:', error);
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Error response data:', error.response.data);
    console.error('Error response status:', error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('Request setup error:', error.message);
  }
      }
    };
  
    fetchResults();
  }, [item]); // Empty dependency array to run only once when component mounts
  
    return(
        <>
      <div className="mheader">
        <div className="mrow1">
          <h1>
            A better music option for
            <br /> a book makes the book more better
          </h1>
        </div>
        <div className="mrow2">
          <h2>Music recommendations for {item}</h2>
        </div>
      </div>
      <div className="mcontainer">
        {mu.map((mp,index)=> (
          <Musiccard mtitle={mp.name} />
        ))}
      </div>
    </>
    )
}
export default Music;