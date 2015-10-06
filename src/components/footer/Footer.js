import React, { Component, PropTypes } from 'react';

import './footer.css';

export default class Footer extends Component {

  render() {
     return (
      <footer className='footer'>
           <p className='small text-center text-muted'>
	          Have questions or suggestions? Please file them on the 
            <a href="https://github.com/cloudmu/react-redux-example/issues" target="_blank"> Github </a>
            or tweet 
            <a href="http://www.twitter.com/yunjun_mu" target="_blank"> me</a>.
	        </p>
       </footer>
    );
  }
}



