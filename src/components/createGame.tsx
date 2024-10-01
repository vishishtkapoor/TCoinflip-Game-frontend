import { useState, useEffect, useCallback } from "react";
import {io, Socket} from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { toNano } from "@ton/core";
import 'dotenv/config'

interface CreateGameProps {
    onGameCreated: (gameData: GameData) => void;
}

interface GameData {
    player1: string;
    wager: string;
    choice: string;
    gameId?: string;
}

const CreateGame: React.FC<CreateGameProps> = ({ onGameCreated }) => {
    const [wager, setWager] = useState<string>("");
    const [choice, setChoice] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameId, setGameId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [playerJoined, setPlayerJoined] = useState<boolean>(false);
    const [tonConnectUI] = useTonConnectUI();

    const navigate = useNavigate();
    const userFriendlyAddress = useTonAddress();
    const to = "EQAp0UrZiz0KEEdHZ2EbXbAuaNX02IuLuNVH3tFq6YZ8ILVL"; // Flip wallet address

    // Initialize socket connection
    const initializeSocket = useCallback(() => {
        console.log("Initializing socket connection...");
        const newSocket = io(import.meta.env.VITE_BackendURI, {
            transports: ["websocket"],
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
            setConnected(true);
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
            setConnected(false);
        });

        newSocket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
            setConnected(false);
        });

        newSocket.on("playerJoined", (data) => {
            console.log("Another player joined:", data);
            setPlayerJoined(true);
        });

        // Cleanup on component unmount
        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        const cleanupSocket = initializeSocket();
        return cleanupSocket;
    }, [initializeSocket]);

    const handleCreateGame = async () => {
        if (!wager || isNaN(Number(wager)) || Number(wager) <= 0) {
            setErrorMessage("Please enter a valid wager amount!");
            return;
        }

        if (!choice) {
            setErrorMessage("Please select Heads or Tails!");
            return;
        }

        if (!socket) {
            setErrorMessage("Socket is not initialized!");
            return;
        }

        if (!connected) {
            setErrorMessage("Socket connection not established!");
            return;
        }

        setLoading(true);

        const gameData: GameData = {
            player1: userFriendlyAddress,
            wager: wager,
            choice: choice,
        };

        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: to,
                    amount: toNano(wager).toString(),
                },
            ],
        };

        console.log("Creating game with data:", gameData);
        console.log("Transaction amount in nanotons:", toNano(wager).toString());

        try {
            await tonConnectUI.sendTransaction(transaction);
            alert("Transaction was sent successfully");

            socket.emit("createGame", gameData, (response: { success: boolean; gameId: string }) => {
                setLoading(false);
                if (response.success) {
                    setGameId(response.gameId);
                    onGameCreated({ ...gameData, gameId: response.gameId });
                    navigate(`/game/${response.gameId}`, { replace: true });
                } else {
                    setErrorMessage("Failed to create game!");
                }
            });
        } catch (error) {
            console.error("Transaction failed:", error);
            setErrorMessage("Transaction error. Please try again.");
            setLoading(false);
        }
    };

    const handleChoiceSelection = (selectedChoice: string) => {
        setChoice(selectedChoice);
        setErrorMessage("");
    };

    return (
        <div className="w-full max-w-md p-6 bg-[#a55ae20a] rounded-lg border border-solid border-[#a55ae21a] backdrop-blur-[3.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.6px)_brightness(100%)]">
            <h2 className="text-2xl font-semibold mb-4">Create a Game</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1 pb-2">
                    Wager Amount ($)
                </label>
                <input
                    type="number"
                    value={wager}
                    onChange={(e) => setWager(e.target.value)}
                    className="w-full px-3 py-2 bg-[#412b7e] rounded-md text-white focus:outline-none"
                    placeholder="Enter Wager Amount"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1 pb-2">
                    Choose Heads or Tails
                </label>
                <div className="flex space-x-4">
                    <button
                        className={`w-full py-2 ${choice === "heads" ? "bg-[#d0bcff]" : "bg-[#d0bcff80]"
                            } hover:bg-[#b09ad4] text-[#381e72] font-semibold rounded-md transition duration-200`}
                        onClick={() => handleChoiceSelection("heads")}
                    >
                        Heads
                    </button>
                    <button
                        className={`w-full py-2 ${choice === "tails" ? "bg-[#d0bcff]" : "bg-[#d0bcff80]"
                            } hover:bg-[#b09ad4] text-[#381e72] font-semibold rounded-md transition duration-200`}
                        onClick={() => handleChoiceSelection("tails")}
                    >
                        Tails
                    </button>
                </div>
            </div>

            <button
                onClick={handleCreateGame}
                className="w-full py-2 bg-[#d0bcff80] hover:bg-[#b09ad4] text-[#381e72] font-semibold rounded-md transition duration-200"
                disabled={loading}
            >
                {loading ? "Creating Game..." : "Create Game"}
            </button>

            {gameId && (
                <div className="mt-4">
                    <p>Game ID: {gameId}</p>
                </div>
            )}

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {playerJoined && (
                <div className="mt-4">
                    <p>A second player has joined the game!</p>
                </div>
            )}
        </div>
    );
};

export default CreateGame;
