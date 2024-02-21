const NavBarLinks = ({ name }) => {
  return (
    <div
      className="px-3 text-black hover:text-button-yellow font-normal hover:text-[#F9BC60]"
      style={{
        borderRight: "0.846197px solid rgba(0, 30, 29, 0.19)",
      }}
    >
      {name}
    </div>
  );
};

export default NavBarLinks;
