import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  return (
    <div className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-zinc-800 bg-opacity-80 z-50`}>
      <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button 
              onClick={() => setUserDiv("hidden")}
              className="text-zinc-600 hover:text-zinc-900"
            >
              <RxCross1 size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-zinc-600">Username:</span>
              <span className="font-semibold">{userDivData?.username}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-zinc-600">Email:</span>
              <span className="font-semibold">{userDivData?.email}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-zinc-600">Address:</span>
              <span className="font-semibold">{userDivData?.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeUserData;