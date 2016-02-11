import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class RestrictPage extends Component {
  componentWillMount() {
    const { user } = this.props;
    const { router } = this.context;
    // const isAuthenticated = localStorage.getItem('id_token');
    if (!user) {
      router.push('/login');
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
  children: PropTypes.object
};

RestrictPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps)(RestrictPage);
