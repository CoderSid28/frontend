import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });
    const navigate = useNavigate();
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await axios.get(
                    "https://booknest-eku3.onrender.com/api/v1/get-user-cart",
                    { headers }
                );
                setCart(data.data || []);
                calculateTotal(data.data || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
                alert("Failed to load cart. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const calculateTotal = (cartItems) => {
        const sum = cartItems.reduce((acc, item) => {
            const price = parseFloat(item.price) || 0;
            return acc + price;
        }, 0);
        setTotal(sum);
    };

    const deleteItem = async (bookid) => {
        if (processing) return;
        
        setProcessing(true);
        try {
            const { data } = await axios.put(
                `https://booknest-eku3.onrender.com/api/v1/remove-from-cart/${bookid}`,
                { userId: localStorage.getItem("id") },
                { headers }
            );
            
            const updatedCart = cart.filter(item => item._id !== bookid);
            setCart(updatedCart);
            calculateTotal(updatedCart);
            
            if (data?.message) {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert(error.response?.data?.message || "Failed to remove item from cart");
        } finally {
            setProcessing(false);
        }
    };

    const placeOrder = async () => {
        if (processing || cart.length === 0) return;
        
        setProcessing(true);
        try {
            const { data } = await axios.post(
                'https://booknest-eku3.onrender.com/api/v1/place-order',
                { 
                    order: cart,
                    totalAmount: total,
                    paymentMethod: 'COD'
                },
                { headers }
            );
            alert(data.message);
            setCart([]);
            navigate("/profile/orderHistory");
        } catch (error) {
            console.error("Error placing order:", error);
            alert(error.response?.data?.message || "Failed to place order");
        } finally {
            setProcessing(false);
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        
        if (processing || cart.length === 0) return;
        
        // Validate payment details
        if (cardDetails.cvv !== '123' || 
            cardDetails.expiryMonth !== '10' || 
            cardDetails.expiryYear !== '2025' || 
            cardDetails.number.replace(/\s/g, '') !== '4242424242424242') {
            alert("Invalid credentials.");
            return;
        }
        
        setProcessing(true);
        
        try {
            // Process payment (simulated)
            if (cardDetails.number.replace(/\s/g, '') === '4242424242424242') {
                // Don't save to database, just show receipt
                navigate("/payment/receipt", {
                    state: {
                        orderId: `TEMP-${Date.now()}`,
                        amount: total,
                        date: new Date().toLocaleString(),
                        paymentMethod: 'Visa',
                        last4: cardDetails.number.slice(-4),
                        items: cart
                    }
                });
                setCart([]); // Clear cart after payment
                
            } else if (cardDetails.number.replace(/\s/g, '') === '4000000000000002') {
                alert("Payment Failed: Card declined. Please try another payment method.");
            } else {
                alert("Invalid card details.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Payment processing failed");
        } finally {
            setProcessing(false);
            setShowPaymentForm(false);
        }
    };
    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-zinc-900">
                <Loader />
                <p className="mt-4 text-zinc-400">Loading your cart...</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 px-4 md:px-12 min-h-screen py-8">
            {cart.length === 0 ? (
                <div className="h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-400 mb-6">
                            Your Cart is Empty
                        </h1>
                        <img
                            src="/cart.jpg"
                            alt="empty cart"
                            className="mx-auto h-48 md:h-64 lg:h-[50vh] object-contain"
                        />
                        <button
                            onClick={() => navigate("/all-books")}
                            className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-6 md:mb-8">
                        Your Cart ({cart.length})
                    </h1>
                    
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="w-full rounded-lg flex flex-col md:flex-row p-4 md:p-6 bg-zinc-800 justify-between items-center gap-4 md:gap-6"
                            >
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="h-32 md:h-24 w-full md:w-auto object-cover rounded"
                                />
                                
                                <div className="flex-1 w-full md:w-auto">
                                    <h2 className="text-xl md:text-2xl text-zinc-100 font-semibold">
                                        {item.title}
                                    </h2>
                                    <p className="text-zinc-300 mt-1 md:mt-2 text-sm md:text-base">
                                        {item.description?.slice(0, 60)}...
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <span className="text-xl md:text-2xl font-bold text-green-400">
                                        ₹{item.price?.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => deleteItem(item._id)}
                                        disabled={processing}
                                        className="p-2 text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                                        aria-label="Delete item"
                                    >
                                        <AiFillDelete size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 p-4 md:p-6 bg-zinc-800 rounded-lg">
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-zinc-300">
                                Total Amount:
                            </h2>
                            <h2 className="text-2xl md:text-3xl font-bold text-green-400">
                                ₹{total.toFixed(2)}
                            </h2>
                        </div>
                    </div>

                    {/* Payment Options Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* COD Box */}
                        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 hover:border-orange-500 transition-colors">
                            <div className="flex items-center mb-4">
                                <div className="bg-orange-500 text-white p-2 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-zinc-300">Cash on Delivery</h3>
                            </div>
                            <p className="text-zinc-400 mb-6">
                                Pay cash when your order arrives at your doorstep. No need to pay now.
                            </p>
                            <button
                                onClick={placeOrder}
                                disabled={processing || cart.length === 0}
                                className={`w-full py-3 ${processing ? 'bg-orange-700' : 'bg-orange-600 hover:bg-orange-700'} text-white font-bold rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2`}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Place COD Order
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Online Payment Box */}
                        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 hover:border-blue-500 transition-colors">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-zinc-300">VISA Payment</h3>
                            </div>
                            
                            {!showPaymentForm ? (
                                <>
                                    <p className="text-zinc-400 mb-6">
                                        Pay securely with your test card 
                                    </p>
                                    <button
                                        onClick={() => setShowPaymentForm(true)}
                                        disabled={processing || cart.length === 0}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Pay Online Now
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <img src="data:image/png;base64,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" className="h-8" alt="Visa" />
                                    </div>
                                    
                                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-zinc-300 mb-2 text-sm font-medium">Card Number</label>
                                            <input
                                                type="text"
                                                name="number"
                                                value={cardDetails.number}
                                                onChange={handleCardChange}
                                                className="w-full p-3 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                                placeholder="NNNN NNNN NNNN NNNN"
                                                required
                                            />
                                            <p className="text-xs text-zinc-400 mt-1">
                                                
                                            </p>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-zinc-300 mb-2 text-sm font-medium">Expiry Date</label>
                                                <div className="flex space-x-2">
                                                    <input
                                                        type="text"
                                                        name="expiryMonth"
                                                        value={cardDetails.expiryMonth}
                                                        onChange={handleCardChange}
                                                        className="w-full p-3 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                                        placeholder="MM"
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        name="expiryYear"
                                                        value={cardDetails.expiryYear}
                                                        onChange={handleCardChange}
                                                        className="w-full p-3 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                                        placeholder="YYYY"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-zinc-300 mb-2 text-sm font-medium">CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={cardDetails.cvv}
                                                    onChange={handleCardChange}
                                                    className="w-full p-3 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                                    placeholder="cvv"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="pt-2 flex space-x-3">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className={`flex-1 py-3 ${processing ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2`}
                                            >
                                                {processing ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing Payment...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Pay ₹{total.toFixed(2)}
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowPaymentForm(false)}
                                                className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;