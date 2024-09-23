const ProfileTabs = ({ icon, text, id, onClickTabs, first }) => {
  return (
    <div
      className="flex justify-center items-center w-full hover:bg-grey-back "
      key={id}
      onClick={(values) => onClickTabs(id)}
      style={
        first === true ? { backgroundColor: "#F9BC60", color: "white" } : {}
      }
    >
      <div className="flex w-4/6 flex-row items-center py-3 ">
        {icon}
        <p class="ml-4 text-base">{text}</p>
      </div>
    </div>
  );
};

export default ProfileTabs;
