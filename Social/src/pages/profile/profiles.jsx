import React from "react";
import "./profiles.css";
import Top from "../../components/top/top";


function ProfilePage() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://previews.123rf.com/images/gmast3r/gmast3r1710/gmast3r171002510/88771731-usuario-sin-rostro-masculino-de-avatar-profile-icon-en-fondo-colorido-plano-ilustración-vectorial.jpg"
          alt="Profile picture"
        />
        <div className="profile-header-info">
          <h1>Fred Morrison</h1>
          <h2>Senior Designer</h2>
          <p>
            <strong>Email:</strong> designer@example.com
          </p>
          <p>
            <strong>Phone:</strong> +57 317 987 8989
          </p>
          <p>
            <strong>Website:</strong> www.somewebsite.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
