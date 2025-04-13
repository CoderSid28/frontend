import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id,
    };

    const handleRemoveBook = async () => {
        const response = await axios.put(
            "https://booknest-eku3.onrender.com/api/v1/remove-book-from-favourite",
            {},
            { headers }
        );
        alert(response.data.message);
    };

    return (
        <div className="flex flex-col">
            <div className="bg-zinc-800 rounded p-4 flex flex-col h-full">
                <Link to={`/view-book-details/${data._id}`} className="flex-1">
                    <div className="bg-zinc-900 rounded flex items-center justify-center">
                        <img src={data.url} alt={data.title} className="h-[25vh] object-contain" />
                    </div>
                    <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
                    <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
                    <p className="mt-2 text-zinc-200 font-semibold text-xl">
                        ₹ {data.price}
                    </p>
                </Link>
                
                {favourite && (
                    <button
                        className="w-full bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 hover:bg-yellow-100 transition-colors"
                        onClick={handleRemoveBook}
                    >
                        Remove from favourite
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookCard;