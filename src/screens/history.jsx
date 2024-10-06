import React, { useEffect, useState } from 'react';
import User from '../components/user';
import ReferralSystem from '../components/referal';

const History = ({ userId }) => {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                const response = await fetch(`import.meta.env.VITE_BackendURI/history/${userId}`);
                const data = await response.json();
                setHistoryData(data);
            } catch (error) {
                console.error('Error fetching history data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryData();
    }, [userId]);

    return (
        <div className="bg-white overflow-y-auto h-screen [background:linear-gradient(180deg,rgb(21.31,10.04,31.08)_0%,rgb(74,0,224)_100%)] flex flex-col items-center">
            <div className="w-full text-white h-full font-bold flex flex-col max-w-xs">
                <div className="flex flex-col items-center pt-4 pb-28">
                    <User />
                    <div>
                        <ReferralSystem />
                    </div>
                    <div className="pt-8 pb-20 w-auto">
                        <h1 className="text-2xl font-bold mb-4">History</h1>

                        {loading ? (
                            <p>Loading...</p>
                        ) : historyData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-lg text-center font-medium text-white">
                                    No game history available
                                </p>
                            </div>
                        ) : (
                            <ul className="history-list">
                                {historyData.map((item) => (
                                    <li key={item._id} className="relative w-[342px] mx-auto mb-4 p-4 bg-[#a55ae20a] rounded-lg border border-solid border-[#a55ae21a] backdrop-blur-[3.6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.6px)_brightness(100%)]">
                                        <div className="divide-y divide-[#a55ae21a] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
                                            <span className="font-semibold">{item.date}</span>
                                            <span>{item.event}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
