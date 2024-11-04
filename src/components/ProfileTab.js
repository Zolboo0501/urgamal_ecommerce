const ProfileTabs = ({ icon, text, id, onClickTabs, first }) => {
  return (
    <div
      className="flex w-full items-center justify-center hover:bg-grey-back"
      key={id}
      onClick={(values) => onClickTabs(id)}
      style={
        first === true ? { backgroundColor: "#48BE5B", color: "white" } : {}
      }
    >
      <div className="flex w-4/6 flex-row items-center py-3">
        {icon}
        <p class="ml-4 text-base font-medium">{text}</p>
      </div>
    </div>
  );
};

export default ProfileTabs;
