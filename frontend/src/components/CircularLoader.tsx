import React from "react";

const CircularLoader = () => {
    return (
        <div>
            <div className="flex items-center justify-center mr-2">
                <div className="w-4 h-4 border-b-2 border-gray-100 rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default CircularLoader;
