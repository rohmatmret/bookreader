import React, { useState} from "react";

const UserDropdown = () => {
    const [menu, setMenu] = useState(false)

    return(
        <>
            <nav>
                <div className="ml-3">
                <div>
                    <button type="button" className="float-right max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={(e) => {setMenu(!menu)}}>
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                    </button>
                </div>
                {menu && 
                    <div className="origin-top-right absolute right-0 mt-10 transition duration-150 ease-out w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-700">Your Profile</a>

                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>

                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                    </div>
                }      
                </div>
            </nav>
        </>
    )
  };
  
  export default UserDropdown;  