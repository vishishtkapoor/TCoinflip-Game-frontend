import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initUtils } from '@telegram-apps/sdk';
import CustomAlert from './customalert';

const ReferralSystem = () => {
    const [referrals, setReferrals] = useState([]);
    const [referrer, setReferrer] = useState('');
    const [userId, setUserId] = useState('12345'); // Placeholder for userId
    const [startParam, setStartParam] = useState('referrerId'); // Placeholder for referrerId
    const [lastReferralDate, setLastReferralDate] = useState(null); // Store the date of the last referral
    const [canRefer, setCanRefer] = useState(true); // Flag to check if the user can refer
    const [alertMessage, setAlertMessage] = useState(''); // State for custom alert message
    const [showAlert, setShowAlert] = useState(false); // State for alert visibility
    const inviteCode = "qwer";
    const referralLink = `https://tcoin-flip-frontend.vercel.app/?code=${inviteCode}`;
    const shareLink = `https://t.me/share/url?url=${referralLink}`;

    useEffect(() => {
        const checkReferral = async () => {
            if (startParam && userId) {
                try {
                    // Simulate an API call to save the referral
                    console.log('Saving referral for:', { userId, referrerId: startParam });
                } catch (error) {
                    console.error('Error saving referral:', error);
                }
            }
        };

        const fetchReferrals = async () => {
            if (userId) {
                try {
                    // Simulate fetching referral data
                    const mockReferrals = ['User 1', 'User 2', 'User 3'];
                    const mockReferrer = 'Referrer 123';
                    setReferrals(mockReferrals);
                    setReferrer(mockReferrer);
                } catch (error) {
                    console.error('Error fetching referrals:', error);
                }
            }
        };

        const checkReferralLimit = () => {
            const storedDate = localStorage.getItem('lastReferralDate');
            if (storedDate) {
                const lastDate = new Date(storedDate);
                const today = new Date();
                if (lastDate.toDateString() === today.toDateString()) {
                    setCanRefer(false); // Cannot refer if they have already referred today
                } else {
                    setCanRefer(true); // Can refer if it's a new day
                }
            }
        };

        checkReferralLimit(); // Check referral limit on load
        checkReferral(); // Check referral status
        fetchReferrals(); // Fetch referral data
    }, [userId, startParam]);

    const handleInviteFriend = () => {
        // const inviteCode = "qwer";
        // const referralLink = `https://tcoin-flip-frontend.vercel.app/?code=${inviteCode}`;
        // window.location.href = `https://t.me/share/url?url=${referralLink}`; // Change to your desired URL


        // if (!canRefer) {
        //     setAlertMessage('You can only refer one user per day.');
        //     setShowAlert(true);
        //     return;
        // }

        // const utils = initUtils();
        // const inviteLink = `https://yourapp.com/invite?startapp=${userId}`;
        // const shareText = `Join me on this awesome Telegram mini app!`;
        // const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
        // utils.openTelegramLink(fullUrl);

        // // Update last referral date in localStorage
        // localStorage.setItem('lastReferralDate', new Date().toISOString());
        // setCanRefer(false); // Update state to prevent further referrals today

        // // Show custom alert
        // setAlertMessage('Invite link copied to clipboard!');
        // setShowAlert(true);
    };

    const handleCopyLink = () => {
        const inviteLink = `https://yourapp.com/invite?startapp=${userId}`;
        navigator.clipboard.writeText(inviteLink);

        // Show custom alert
        setAlertMessage('Invite link copied to clipboard!');
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false); // Close the custom alert
    };

    return (
        <div className="w-full max-w-md">
            {referrer && (
                <p className="text-green-500 mb-4">You were referred by user {referrer}</p>
            )}
            <div className="flex flex-col space-y-4">
                {/* <button
                    onClick={handleInviteFriend}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={!canRefer} // Disable the button if the user cannot refer
                >
                    Invite Friend
                </button> */}
                <Link 
                    href={shareLink}
                >
                    InviteFriends
                </Link>
                <button
                    onClick={handleCopyLink}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Copy Invite Link
                </button>
            </div>
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    onClose={handleCloseAlert}
                />
            )}
        </div>
    );
};

export default ReferralSystem;
