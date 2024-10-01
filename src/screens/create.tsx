import CreateGame from "../components/createGame";
import User from "../components/user";

const Create: React.FC = () => {
    const handleGameCreated = (gameData: { player1: string; wager: string; choice: string; gameId?: string }) => {
        console.log(gameData);
    };

    return (
        <div className="bg-white overflow-scroll h-screen [background:linear-gradient(180deg,rgb(21.31,10.04,31.08)_0%,rgb(74,0,224)_100%)] flex justify-center">
            <div className="w-full text-white h-full font-bold flex flex-col max-w-xs">
                <div className="flex flex-col pt-4">
                    <User />
                    {/* Include CreateGame Component */}
                    <div className="flex items-center justify-center">
                        <CreateGame onGameCreated={handleGameCreated} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
