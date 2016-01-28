import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class RestrictPage extends Component {
  componentWillMount() {
    const { history, user } = this.props;
    // const isAuthenticated = localStorage.getItem('id_token');
    if (!user) {
      history.pushState(null, '/login');
    }
  }

  render() {
    const { user } = this.props;
    // const isAuthenticated = localStorage.getItem('id_token');
    if (user) {
      return this.props.children;
    }

    return null;
  }
}

RestrictPage.propTypes = {
  user: PropTypes.string,
  history: PropTypes.object.isRequired,
  children: PropTypes.object
};

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps)(RestrictPage);
