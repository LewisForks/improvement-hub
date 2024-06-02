import "./profile.css";

export const Profile = () => {
  return (
    <div className="top">
      <i className="bx bx-bell"></i>
      <div className="profile">
        <div className="left">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" />
          <div className="user">
            <h5>MobExe</h5>
            <a href="#">Basic Plan</a>
          </div>
        </div>
        <i className="bx bxs-chevron-right"></i>
      </div>
    </div>
  );
};
