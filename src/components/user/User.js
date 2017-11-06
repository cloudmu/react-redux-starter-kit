import React from "react";
import PropTypes from "prop-types";

const User = ({ user }) => {
  const { login, avatar_url, html_url } = user;
  const src = `https://ghbtns.com/github-btn.html?user=${login}&type=follow&count=true&size=large`;

  return (
    <div className="card">
      <div className="card-header">
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          <h4>{login}</h4>
        </a>
      </div>

      <div style={{textAlign:"center"}}>
        <img src={avatar_url} width="150" height="150" alt="avatar" />
      </div>
      <div className="card-footer">
        <iframe
          title={login}
          src={src}
          allowTransparency="true"
          scrolling="0"
          frameBorder="0"
          width="500"
          height="30"
        />
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired
  }).isRequired
};

export default User;
