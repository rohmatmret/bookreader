import React from "react";
import UserDropdown from './UserDropdown';

const Header = () => {
    return (
        <>
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent hidden md:block md:flex-row md:flex-nowrap md:justify-start items-center p-4 bg-blue-500">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                {/* User */}
                <ul className="border-0 px-3 relative bg-transparent rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10">
                    <UserDropdown />
                </ul>
                </div>
            </nav>
        </>
    )
}

export default Header