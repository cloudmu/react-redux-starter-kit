import React from 'react';

import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
       <p className="small text-center text-muted">
        Have questions or suggestions? Please file them on the
        <a href="https://github.com/cloudmu/react-redux-starter-kit/issues" target="_blank"> Github </a>
        or tweet
        <a href="http://www.twitter.com/yunjun_mu" target="_blank"> me</a>.
      </p>
    </footer>
  );
};

export default Footer;

