import React from "react";
import FamilyWallet from "../common/ConnectKit";

const Header = () => {
  return (
    <header className="bg-gho-dark-primary text-white p-4">
      <div className="mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-lg font-uni-neue-light">loGHO</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>Home</li>
            <li>About</li>
            <li>
              <FamilyWallet />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
