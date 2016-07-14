import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1 className="display-3">About Us</h1>

      <p>
        Thanks for checking this out. This project was created by
        <a href="https://twitter.com/_cloudmu" target="_blank"> @_cloudmu</a>,
        as a playground to learn and experiment some of the exciting technologies such as
        <a href="https://github.com/facebook/react" target="_blank"> React</a> and
        <a href="https://github.com/rackt/redux" target="_blank"> Redux</a>.
      </p>

      <p>
        I believe these two libraries can serve as cornerstones to build a modern web application on, each
        addressing an important aspect of web development: <a href="https://github.com/facebook/react" target="_blank">React </a>
        as the V (view), and <a href="https://github.com/rackt/redux" target="_blank"> Redux </a> as the
        predictable state container.
      </p>

      <p>
        Along with other great libraries, such as <a href="https://github.com/rackt/react-router" target="_blank"> React-Router</a> for routing,
        <a href="http://babeljs.io" target="_blank"> Babel </a> for next-gen Javascript, and
        <a href="http://webpack.github.io" target="_blank"> Webpack</a> for bundling and devtools,  web development has never been more fun
        and productive.
      </p>
    </div>
  );
};

export default About;
