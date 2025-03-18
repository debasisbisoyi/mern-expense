import React, { useState, useEffect, useRef } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";
import SearchModal from "../SearchModal";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const sampleData = ["Groceries", "Electricity Bill", "Movie Tickets", "Gym Membership", "Shopping"];
  const menuRef = useRef(null);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    if (!openSideMenu) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenSideMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSideMenu]);

  const openSearchModal = () => {};

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/60 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-100">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <Link to="/" className="text-lg font-medium text-black">
        Expense Tracker
      </Link>
      <button onClick={() => setIsSearchOpen(true)}>
        <FaSearch className="text-xl cursor-pointer" />
      </button>
      {openSideMenu && (
        <div ref={menuRef} className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={sampleData}
      />
    </div>
  );
};

export default Navbar;
