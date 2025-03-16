import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import CharAvatar from "../cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
    } else {
      navigate(route);
    }
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/60 p-5 sticky top-[61px] z-30">
      {/* User Profile Section */}
      <div className="flex flex-col items-center justify-center gap-3 mb-7 mt-3">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="profile img"
            className="h-20 w-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || "User"}
        </h5>
      </div>

      {/* Sidebar Menu Items */}
      {SIDE_MENU_DATA.map((item) => (
        <button
          key={item.id}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all 
            ${
              activeMenu === item.label
                ? "text-white bg-primary"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
