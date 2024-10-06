import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-12 bg-indigo-950 flex justify-around items-center shadow-xl">
            <Link to="/" className=" hover:bg-indigo-500 rounded-full">
                <button>
                    <img
                        className="w-24 h-6 mt-2"
                        alt="Home"
                        src="/assets/icons/fluent-mdl2_game (1).svg"
                    />
                </button>
            </Link>
            <Link to="/Create" className=" hover:bg-indigo-500 rounded-3xl">
                <button>
                    <img
                        className="w-24 h-6 mt-2"
                        alt="create"
                        src="/assets/icons/icon.svg"
                    />
                </button>
            </Link>
            <Link to="/leaderboard" className=" hover:bg-indigo-500 rounded-full">
                <button>
                    <img
                        className="w-24 h-6 mt-2"
                        alt="Leaderboard"
                        src="/assets/icons/Leaderboard (1).svg"
                    />
                </button>
            </Link>

            <Link to="/History" className=" hover:bg-indigo-500 rounded-full">
                <button>
                    <img
                        className="w-24 h-6 mt-2"
                        alt="History"
                        src="/assets/icons/iconamoon_profile-circle-light.svg"
                    />
                </button>
            </Link>

        </nav>
    );
};

export default NavBar;

