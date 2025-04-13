import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id, 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            if (
                data.url === "" ||
                data.title === "" ||
                data.author === "" ||
                data.price === "" ||
                data.description === "" ||
                data.language === ""
            ) {
                alert("All fields are required");
                return;
            }

            const response = await axios.put(
                "https://booknest-eku3.onrender.com/api/v1/update-book",
                data,
                { headers }
            );

            setData({
                url: "",
                title: "",
                author: "",
                price: "",
                description: "",
                language: ""
            });

            alert(response.data.message);
            navigate(`/view-book-details/${id}`);
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `https://booknest-eku3.onrender.com/api/v1/get-book-by-id/${id}`,
                { headers }
            );
            setData(response.data.data);
        };
        fetchData();
    }, [id]);

    return (
        <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                Update Book
            </h1>
            
            <div className="p-4 bg-zinc-800 rounded">
                <div>
                    <label htmlFor="url" className="text-zinc-400">
                        Image URL
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="URL of image"
                        name="url"
                        required
                        value={data.url}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="title" className="text-zinc-400">
                        Title of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Title of book"
                        name="title"
                        required
                        value={data.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="author" className="text-zinc-400">
                        Author of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Author of book"
                        name="author"
                        required
                        value={data.author}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4 flex gap-4">
                    <div className="w-3/6">
                        <label htmlFor="language" className="text-zinc-400">
                            Language
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Language of book"
                            name="language"
                            required
                            value={data.language}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-3/6">
                        <label htmlFor="price" className="text-zinc-400">
                            Price
                        </label>
                        <input
                            type="number"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Price of book"
                            name="price"
                            required
                            value={data.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label htmlFor="description" className="text-zinc-400">
                        Description of book
                    </label>
                    <textarea
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        rows="5"
                        placeholder="Description of book"
                        name="description"
                        required
                        value={data.description}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
                    onClick={handleSubmit}
                >
                    Update Book
                </button>
            </div>
        </div>
    );
};

export default UpdateBook;