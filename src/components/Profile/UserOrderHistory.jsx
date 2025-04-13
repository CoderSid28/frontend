import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Blue-themed Loader Component
const Loader = ({ size = "medium", text = "" }) => {
  const sizes = {
    small: "h-8 w-8 border-4",
    medium: "h-12 w-12 border-6",
    large: "h-16 w-16 border-8"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${size === "large" ? "min-h-[300px]" : "min-h-[150px]"}`}>
      <div
        className={`animate-spin rounded-full border-solid border-t-blue-400 border-r-blue-400 border-b-transparent border-l-transparent ${
          sizes[size]
        }`}
      ></div>
      {text && <p className="mt-4 text-blue-400">{text}</p>}
    </div>
  );
};

const UserOrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const response = await axios.get(
                    "http://localhost:1000/api/v1/get-order-history",
                    { headers }
                );
                setOrderHistory(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case "order placed":
                return "text-yellow-500";
            case "out for delivery":
                return "text-blue-500";
            case "delivered":
                return "text-green-500";
            case "canceled":
                return "text-red-500";
            default:
                return "text-gray-400";
        }
    };

    const formatPrice = (price) => {
        if (price === undefined || price === null) return "₹--";
        const num = typeof price === "string" ? parseFloat(price) : price;
        return isNaN(num) ? "₹--" : `₹${num.toFixed(2)}`;
    };

    const getField = (item, paths) => {
        for (const path of paths) {
            const value = path.split('.').reduce((obj, key) => obj?.[key], item);
            if (value !== undefined && value !== null) return value;
        }
        return '--';
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
                <Loader size="large" text="Loading your order history..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col">
                <div className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center p-6 bg-gray-800 rounded-lg max-w-md">
                        <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Orders</h2>
                        <p className="text-blue-400 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!orderHistory || orderHistory.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col">
                <div className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-4xl font-bold text-blue-400 mb-6">No Order History</h1>
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/7465/7465679.png" 
                            alt="No orders"
                            className="h-40 mx-auto mb-6 opacity-80"
                        />
                        <p className="text-blue-300 mb-6">
                            You haven't placed any orders yet. Start shopping to see your order history here.
                        </p>
                        <Link
                            to="/all-books"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition inline-block"
                        >
                            Browse Books
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-blue-100 flex flex-col">
            <div className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8">
                    Your Order History
                </h1>
                
                <div className="overflow-x-auto w-full">
                    <div className="min-w-[800px] w-full">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 bg-gray-800 rounded-t-lg py-3 px-4 font-medium">
                            <div className="col-span-1 text-center">#</div>
                            <div className="col-span-2">Item</div>
                            <div className="col-span-4">Description</div>
                            <div className="col-span-1 text-right">Price</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Payment Mode</div>
                        </div>
                        
                        {/* Order Items */}
                        {orderHistory.map((item, i) => {
                            const title = getField(item, ['book.title', 'title', 'productName']);
                            const description = getField(item, ['book.desc', 'description', 'book.description']);
                            const price = getField(item, ['book.price', 'price']);
                            const id = getField(item, ['book._id', '_id', 'id']);
                            const status = item.status || '--';
                            const paymentMode = item.paymentMode || 'COD';

                            return (
                                <div 
                                    key={i}
                                    className="grid grid-cols-12 gap-4 bg-gray-800 border-t border-gray-700 py-3 px-4 hover:bg-gray-750 transition-colors duration-200"
                                >
                                    <div className="col-span-1 text-center text-blue-300/70">{i + 1}</div>
                                    <div className="col-span-2">
                                        <Link
                                            to={`/view-book-details/${id}`}
                                            className="text-blue-300 hover:text-blue-200 hover:underline transition-colors"
                                        >
                                            {title}
                                        </Link>
                                    </div>
                                    <div className="col-span-4">
                                        <p className="text-blue-300/90 line-clamp-2">
                                            {description}
                                        </p>
                                    </div>
                                    <div className="col-span-1 text-right font-mono text-green-400">
                                        {formatPrice(price)}
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`text-sm font-medium ${getStatusStyle(status)}`}>
                                            {status}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-sm font-medium text-purple-400">
                                            {paymentMode.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrderHistory;