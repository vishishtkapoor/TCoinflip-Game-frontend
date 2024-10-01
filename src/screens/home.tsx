import '../App.css';
import User from '../components/user';
import { Link } from 'react-router-dom';
import { Box } from '../components/GameCard';
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import 'dotenv/config'

type SocketState = Socket | null;

function Home() {
    const [gameData, setGameData] = useState<any[]>([]);
    const [, setSocket] = useState<SocketState>(null); // Explicitly type the socket state

    // Establish WebSocket connection
    useEffect(() => {
        const newSocket: Socket = io(import.meta.env.VITE_BackendURI, {
            transports: ['websocket'],
        });

        // Set the socket state
        setSocket(newSocket);
        console.log("New socket set in Home");

        // Function to handle receiving active games
        const handleActiveGames = (games: any) => {
            const gameArray = Object.keys(games).map((gameId) => ({
                ...games[gameId],
                gameId,
            }));
            setGameData(gameArray);
            console.log("Received active games in Home");
        };

        // Listen for active games
        newSocket.on('activeGames', handleActiveGames);

        // Cleanup on unmount
        return () => {
            newSocket.off('activeGames', handleActiveGames);
            console.log("Removed active games listener in Home");
            newSocket.close();
            console.log("Socket closed in Home");
        };
    }, []);

    return (
        <div className="bg-white overflow-auto h-screen [background:linear-gradient(180deg,rgb(21.31,10.04,31.08)_0%,rgb(74,0,224)_100%)] flex flex-col items-center">
            <div className="w-full text-white h-full font-bold flex flex-col max-w-xs">
                <div className="flex flex-col items-center pt-4">
                    <User />
                    <Link to="/Leaderboard">
                        <button>
                            <img className="w-28 h-6 mt-2" alt="Leaderboard" src="/assets/icons/group-27@2x.png" />
                        </button>
                    </Link>
                    <Link to="/Create">
                        <button className="relative inline-block text-lg group pt-4">
                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                <span className="relative">Create a Game</span>
                            </span>
                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" />
                        </button>
                    </Link>
                    <div className="game-cards mt-6 pt-4 pb-20 w-auto">
                        {gameData.length === 0 ? (
                            <p>No active games available.</p>
                        ) : (
                            gameData.map((game) => (
                                <Box
                                    key={game.gameId}
                                    player1={game.player1}
                                    player2={game.player2 || 'Waiting for Player 2'}
                                    status={game.status}
                                    wager={game.wager}
                                    gameId={game.gameId}
                                />
                            ))
                        )}
                    </div>
                    </div>
                    </div>
                    </div>
    );
}
export default Home;