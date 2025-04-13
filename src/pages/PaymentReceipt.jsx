import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentReceipt = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        navigate("/");
        return null;
    }

    const { amount, date, paymentMethod, last4, items } = state;

    return (
        <div className="bg-zinc-900 min-h-screen py-12 px-4 md:px-8">
            <div className="max-w-2xl mx-auto bg-zinc-800 rounded-lg p-6 md:p-8 shadow-lg">
                <div className="text-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-2">Payment Successful!</h1>
                    <p className="text-zinc-400">Thank you for your purchase</p>
                </div>

                <div className="bg-zinc-700 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-zinc-300 mb-4">Order Summary</h2>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Date:</span>
                            <span className="text-zinc-200 font-medium">{date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Payment Method:</span>
                            <span className="text-zinc-200 font-medium">
                                {paymentMethod} ending in {last4}
                            </span>
                        </div>
                        <div className="flex justify-between text-lg mt-4 pt-4 border-t border-zinc-600">
                            <span className="text-zinc-300 font-semibold">Total Paid:</span>
                            <span className="text-green-400 font-bold">₹{amount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-zinc-300 mb-4">Items Purchased</h2>
                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between py-2 border-b border-zinc-700">
                                <div>
                                    <p className="text-zinc-200">{item.title}</p>
                                    <p className="text-zinc-400 text-sm">{item.description?.slice(0, 50)}...</p>
                                </div>
                                <p className="text-green-400">₹{item.price?.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate("/all-books")}
                        className="w-full max-w-xs py-3 bg-zinc-600 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentReceipt;