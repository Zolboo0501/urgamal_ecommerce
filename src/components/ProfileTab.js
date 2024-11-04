/* eslint-disable react/prop-types */
import React from "react";

const ProfileTab = ({ icon, text, id, onClickTabs, first }) => {
    return (
      <div
        className="flex w-full items-center justify-center hover:bg-grey-back"
        key={id}
        onClick={() => onClickTabs(id)}
        style={
          first === true ? { backgroundColor: "#48BE5B", color: "white" } : {}
        }
      >
        <div className="flex w-4/6 flex-row items-center py-3">
          {icon}
          <p className="ml-4 text-base font-medium">{text}</p>
        </div>
      </div>
    );
  };
  
  export default ProfileTab;