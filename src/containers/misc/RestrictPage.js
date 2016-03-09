import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class RestrictPage extends Component {
  componentWillMount() {
    const { user } = this.props;
    const { router } = this.context;

    // If this page is restricted, go to loginPage first.
    // (But pass on this page's path in order to redirect back upon login)
    if (!user) {
      const path = this.props.location.pathname;
      router.push(`/login?redirect=${path}`);
    }
  }

  render() {
    const { user } = this.props;
    if (user) {
      return this.props.children;
    }

    return null;
  }
}

RestrictPage.propTypes = {
  user: PropTypes.string,
  children: PropTypes.object,
  location: PropTypes.object,
};

RestrictPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps)(RestrictPage);
