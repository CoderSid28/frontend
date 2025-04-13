import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import {Link,useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // useSelector must be inside the component
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  console.log("User Logged In:", isLoggedIn);
  console.log("User Role:", role);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://booknest-eku3.onrender.com/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);
  const headers = { 
    id: localStorage.getItem("id"), 
    authorization: `Bearer ${localStorage.getItem("token")}`, 
    bookid: id, 
  }; 
  
  const handleFavourite = async () => { 
    const response = await axios.put(
      "https://booknest-eku3.onrender.com/api/v1/add-book-to-favourite", 
      {}, 
      { headers }
    ); 
    alert(response.data.message);
  };
  const handleCart = async () => {  
    const response = await axios.put( 
      "https://booknest-eku3.onrender.com/api/v1/add-to-cart", 
      {}, 
      { headers } 
    ); 
    alert(response.data.message); 
  };
  const deletebook = async () => {
    const response = await axios.delete(
        "https://booknest-eku3.onrender.com/api/v1/delete-book",
        { headers }
    );
    alert(response.data.message);
    navigate("/all-books")
};
    return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Book Cover Container */}
          <div className="relative bg-zinc-800 rounded p-4 flex items-center justify-center w-full lg:w-2/5">
            <img
              src={data.url}
              alt={data.title}
              className="h-[50vh] lg:h-[75vh] w-auto object-contain rounded"
            />

            {/* Floating Buttons (Wishlist & Cart) */}
{isLoggedIn === true && role === "user" && (
  <div className="absolute top-4 right-4 flex flex-col space-y-4">
    <button 
      className="bg-white rounded-full text-3xl p-2 shadow-lg" 
      aria-label="Add to Favourites"
      onClick={handleFavourite}
    >
      <FaHeart className="text-red-500" />
    </button>
    <button 
      className="bg-white rounded-full text-3xl p-2 shadow-lg" 
      aria-label="Add to Cart"
      onClick={handleCart}
    >
      <FaShoppingCart className="text-blue-500" />
    </button>
  </div>
)}
{isLoggedIn === true && role === "admin" && (
  <div className="absolute top-4 right-4 flex flex-col space-y-4">
    <Link to={`/updateBook/${id}`}
      className="bg-white rounded-full text-3xl p-2 shadow-lg" 
      aria-label="Edit"
    >
      <FaEdit />
    </Link>
    <button 
      className="bg-white rounded-full text-3xl p-2 shadow-lg" 
      aria-label="Delete"
      onClick={deletebook}
    >
      <MdDeleteOutline />
    </button>
  </div>
)}
         </div>

          {/* Book Details */}
          <div className="p-4 w-full lg:w-3/5 flex flex-col justify-center">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1 text-lg">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.description}</p>
            <p className="flex mt-4 items-center text-zinc-400 text-lg">
              <GrLanguage className="me-3" /> {data.language}
            </p>
            <p className="mt-6 text-zinc-100 text-3xl font-semibold">
              Price: ₹ {data.price}
            </p>
          </div>
        </div>
      )}

      {!data && loading && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
