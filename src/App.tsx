import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect.ts";
import { useTonAddress } from "@tonconnect/ui-react";
import Home from './screens/home.tsx';
import NavBar from './components/Nav.tsx';
import Create from './screens/create.tsx';
import Leaderboard from './screens/Leaderboard.tsx';


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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/Create' element={<Create />} />
          <Route path='/Leaderboard' element={<Leaderboard />} />

        </Routes>
        <NavBar />
    </div>
    </Router>
  );
}

export default App;