// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/home';
import History from './screens/history';
import Leaderboard from './screens/leaderboard';
import Create from './screens/Create';
import GameDetails from './screens/GameDetails'; // Import GameDetails component
import NavBar from './components/Nav'; // Assuming NavBar is in components folder
import './App.css'; // Make sure styles are applied properly
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonAddress } from "@tonconnect/ui-react";
import { useTonConnect } from "./hook/useTonConnect";


function App() {

  const { connected } = useTonConnect();

  const userFriendlyAddress = useTonAddress();

  const rawAddress = useTonAddress(false);

  return (
    <Router>
      <div className="App">
        <TonConnectButton
          style={{ position: "fixed", top: "10px", right: "10px" }}
        />
        {connected && (
          <div>
            <div className='fixed top-2.5 hidden'>
                <span>User-friendly address: {userFriendlyAddress}</span>
                <span>Raw address: {rawAddress}</span>
              </div>
          </div>
        )}

        {/* Routes for different screens */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/create" element={<Create />} />
          <Route path="/game/:gameId" element={<GameDetails />} /> {/* Route for GameDetails */}
        </Routes>
        {/* Navigation Bar */}
        <NavBar />
      </div>
    </Router>
  );
}

export default App;



