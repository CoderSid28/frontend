import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard/BookCard"; 
import Loader from "./Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://booknest-eku3.onrender.com/api/v1/get-recent-books");
        console.log(response.data);
        setData(response.data.data); 
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="mt-8 px-4"> 
      <h4 className="text-3xl text-yellow-100">Recently added books</h4> 

      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8"> 
          {data.map((item, index) => ( 
            <div key={index}> 
              <BookCard data={item} /> 
            </div> 
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
