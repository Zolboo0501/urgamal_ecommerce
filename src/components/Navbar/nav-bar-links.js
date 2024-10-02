const NavBarLinks = ({ name }) => {
  return (
    <div
      className="hover:text-button-yellow px-3 font-normal text-black hover:text-[#F9BC60]"
      style={{
        borderRight: "0.846197px solid rgba(0, 30, 29, 0.19)",
      }}
    >
      {name}
    </div>
  );
};

export default NavBarLinks;
