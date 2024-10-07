import react, { useRef } from "react";

// Get user data

const User = () => {
    const userName = useRef(null);
    const userId = useRef(null);
    if (window.Telegram && window.Telegram.WebApp) {
        // Get user data from Telegram WebApp if available
        const initData = window.Telegram.WebApp.initData;
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
    
        if (initData) {
          // Assuming initData contains user data
          console.log("User data from Telegram:", initDataUnsafe.user);
          console.log("userName:", initDataUnsafe.user.username);
          userName.current = initDataUnsafe.user.username;
          console.log("userId:", initDataUnsafe.user.id);
          userId.current = initDataUnsafe.user.id;
        } else {
          console.log("Telegram WebApp not found");
        }
      }
    return (
        <div className='pt-10 pb-4'>
            {/* Title */}
            < div className="w-full h-auto text-center bg-[inherit] text-white font-bold text-3xl leading-tight [font-family:'Poppins',Helvetica] tracking-normal" >
                {userName.current}
            </div >

            {/* Profile Image and Name */}
            < div className="flex items-center justify-center mt-6 space-x-2" >
                <img
                    className="w-6 h-6"
                    alt="Profile"
                    src="https://c.animaapp.com/yhNCsQCB/img/group-16@2x.png"
                />
                <div className="ml-1 [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                {userName.current}
                </div>
            </div >
            </div>
            );
}
export default User;