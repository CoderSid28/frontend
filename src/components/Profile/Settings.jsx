import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
    const [formData, setFormData] = useState({
        address: ""
    });
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState({
        fetching: true,
        updating: false
    });
    const [notification, setNotification] = useState({
        show: false,
        type: "",
        message: ""
    });

    // Memoized auth headers function
    const getAuthHeaders = useCallback(() => ({
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }), []);

    // Memoized notification handler
    const showNotification = useCallback((type, message) => {
        setNotification({
            show: true,
            type,
            message
        });
        const timer = setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Memoized data fetcher
    const fetchUserData = useCallback(async () => {
        try {
            setIsLoading(prev => ({ ...prev, fetching: true }));
            const response = await axios.get(
                "https://booknest-eku3.onrender.com/api/v1/get-user-information",
                { headers: getAuthHeaders() }
            );
            setUserData(response.data);
            setFormData({ address: response.data.address || "" });
        } catch (error) {
            showNotification(
                "error",
                error.response?.data?.message || "Failed to fetch user data"
            );
        } finally {
            setIsLoading(prev => ({ ...prev, fetching: false }));
        }
    }, [getAuthHeaders, showNotification]);

    // Initialize component
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle address update
    const handleAddressUpdate = async () => {
        try {
            setIsLoading(prev => ({ ...prev, updating: true }));
            await axios.put(
                "https://booknest-eku3.onrender.com/api/v1/update-address",
                { address: formData.address },
                { headers: getAuthHeaders() }
            );
            showNotification("success", "Address updated successfully");
            fetchUserData();
        } catch (error) {
            showNotification(
                "error",
                error.response?.data?.message || "Failed to update address"
            );
        } finally {
            setIsLoading(prev => ({ ...prev, updating: false }));
        }
    };

    if (isLoading.fetching && !userData) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Settings</h1>
            
            {notification.show && (
                <div className={`mb-6 p-4 rounded border ${
                    notification.type === "success" 
                        ? "bg-green-800/50 border-green-600 text-green-100" 
                        : "bg-red-800/50 border-red-600 text-red-100"
                }`}>
                    {notification.message}
                </div>
            )}

            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-100">
                        {userData?.username || "User"}
                    </h2>
                    <p className="text-gray-400">
                        {userData?.email || "No email provided"}
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full bg-gray-700 text-gray-100 p-3 rounded cursor-not-allowed"
                            value={userData?.username || ""}
                            readOnly
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full bg-gray-700 text-gray-100 p-3 rounded cursor-not-allowed"
                            value={userData?.email || ""}
                            readOnly
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-gray-400 text-sm font-medium mb-1">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            rows="4"
                            className="w-full bg-gray-700 text-gray-100 p-3 rounded border border-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleAddressUpdate}
                            disabled={isLoading.updating}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-6 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading.updating ? "Updating..." : "Update Address"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;