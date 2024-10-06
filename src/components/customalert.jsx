import React from 'react';

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg text-slate-950">
                <p>{message}</p>
                <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;