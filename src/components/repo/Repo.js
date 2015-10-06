import React, { Component, PropTypes } from 'react';

export default class Repo extends Component {

  render() {
    const { repo, owner } = this.props;

    return (

      <div>
        <div className='Repo'>
          <a href={repo.html_url} target="_blank">{repo.name}</a>

           Stars: {repo.stargazers_count}
        </div>

        <div className='User'>
          <a href={owner.html_url} target="_blank">{owner.login}
            <img src={owner.avatar_url} width='72' height='72' />
          </a>
        </div>
      </div>
    );
  }
}

Repo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number.isRequired
  }).isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired
  }).isRequired
};
