import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import User from '../components/user';
import Flip from '../components/flip';

const GameDetails = () => {
    const { gameId } = useParams(); // Get the gameId from the URL
    const [userChoice, setUserChoice] = useState('heads'); // Example choice; this should come from user input
    const [resultMessage, setResultMessage] = useState('');

    const handleFlipResult = (hasWon) => {
        setResultMessage(hasWon ? 'You won!' : 'You lost.');
    };

    return (
        <div className="bg-white overflow-auto h-screen [background:linear-gradient(180deg,rgb(21.31,10.04,31.08)_0%,rgb(74,0,224)_100%)] flex justify-center items-center">
            <div className="w-full text-white h-full font-bold flex flex-col max-w-xs">

                <User />

                <div className="w-full max-w-md p-6  text-white rounded-lg border border-solid border-[#a55ae21a] backdrop-blur-[3.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.6px)_brightness(100%)]">
                    <h2 className="text-2xl font-semibold mb-4">Game Details</h2>
                    <p className="text-lg">Game ID: {gameId}</p>
                    {/* Display win/loss message dynamically */}
                    <p className="text-lg mt-4">{resultMessage}</p>
                </div>
                <div>
                    <Flip userChoice={userChoice} onFlipResult={handleFlipResult} />
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
