import React, { useState, useEffect, useCallback,  } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { toNano } from "@ton/core";

// Define the props interface
interface BoxProps {
    player1: string;
    player2: string;
    status: string;
    wager: number;
    gameId: string;
}

export const Box: React.FC<BoxProps> = ({ player1, player2, status, wager, gameId }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [tonConnectUI] = useTonConnectUI();
    const [, setErrorMessage] = useState("");



    const navigate = useNavigate();
    const userFriendlyAddress = useTonAddress();
    const to = "EQAp0UrZiz0KEEdHZ2EbXbAuaNX02IuLuNVH3tFq6YZ8ILVL";

    // Initialize socket connection
    const initializeSocket = useCallback(() => {
        if (socket) {
            return;
        }
        console.log("Initializing socket connection...join");
        const newSocket = io(import.meta.env.VITE_BackendURI, {
            transports: ["websocket"],
        });
        newSocket.on("connect", () => {
            console.log("Socket connected to join:", newSocket.id);
            setConnected(true);
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected in join");
            setConnected(false);
        });
        newSocket.on("connect_error", (error) => {
            console.error("Socket connection error in join:", error);
            setConnected(false);
        });
        setSocket(newSocket);

        // Cleanup on component unmount
        return () => {
            newSocket.close();
        };
    }, [socket]);

    // Establish socket connection on mount
    useEffect(() => {
        const cleanupSocket = initializeSocket();
        console.log("This is static socket", socket);
        return cleanupSocket;
    }, [initializeSocket, socket]);

    const handleJoinGame = async () => {
        if (!socket) {
            setErrorMessage("Socket is not initialized!");
            return;
        }

        if (!connected) {
            setErrorMessage("Socket connection not established!");
            return;
        }

        setLoading(true);

        const gameData = {
            player2: userFriendlyAddress,
            gameId: gameId,
        };

        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: to, // destination address
                    amount: toNano(wager).toString(), // Toncoin in nanotons
                },
            ],
        };
        try {
            await tonConnectUI.sendTransaction(transaction);

            console.log(gameData, "This is the game created");

            socket.emit("joinGame", gameData, (response: { success: boolean; gameId: string }) => {
                setLoading(false);
                if (response.success) {
                    player2 = userFriendlyAddress;

                    // Ensure socket stays connected when navigating
                    navigate(`/game/${response.gameId}`, { replace: true });
                } else {
                    setErrorMessage("Failed to create game!");
                }
            });
        } catch (error) {
            console.error("Transaction failed:", error);
        }
        console.log("Emitting joinGame event with data:", gameData);
    };

    return (
        <div className="relative w-[342px] h-[77px] bg-[#a55ae20a] rounded-lg border border-solid border-[#a55ae21a] backdrop-blur-[3.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.6px)_brightness(100%)]">
            <div className="absolute w-[126px] top-[9px] left-[15px] font-normal text-white text-base whitespace-nowrap">
                {player1}
            </div>
            <div className="absolute w-[126px] top-[42px] left-[15px] font-normal text-white text-base whitespace-nowrap">
                {player2}
            </div>
            <div className="absolute w-3 top-[30px] left-4 font-medium text-white text-[10px] whitespace-nowrap">
                vs
            </div>

            {/* Conditional rendering based on game status */}
            {status === "Waiting for Player 2" ? (
                <button
                    onClick={handleJoinGame}
                    className="absolute w-24 h-7 top-[41px] left-[237px] bg-[#d0bcff80] rounded"
                >
                    <div className="flex items-center justify-center gap-2 px-6 py-2.5 relative -top-1.5">
                        <div className="font-medium text-[#381e72] text-sm text-center">
                            Join Now
                        </div>
                    </div>
                </button>
            ) : (
                <button className="absolute w-24 h-7 top-[41px] left-[237px] bg-[#d0bcff80] rounded opacity-50 cursor-not-allowed">
                    <div className="flex items-center justify-center gap-2 px-6 py-2.5 relative -top-1.5">
                        <div className="font-medium text-[#381e72] text-sm text-center">
                            In Progress
                        </div>
                    </div>
                </button>
            )}

            <div className="absolute w-[76px] h-[18px] top-[9px] left-[238px] bg-[#ffffffb2] rounded-sm">
                <div className="font-normal text-[#065e24] text-[10px] text-center">
                    {status}
                </div>
            </div>
            <div className="absolute w-[34px] h-[45px] top-4 left-[164px]">
                <img
                    className="w-8 h-8"
                    alt="Fluent emoji coin"
                    src="/assets/icons/fluent-emoji_coin.svg"
                />
                <div className="font-medium text-white text-sm text-center">
                    {wager}$
                </div>
            </div>
        </div>
    );
};
