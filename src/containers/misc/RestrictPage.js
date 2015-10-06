import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class RestrictPage extends Component {
 
  componentWillMount() {
    const {history, user} = this.props;
    if (!user) {
      history.replaceState(null, '/login');
    }
  }

  render() {
    return this.props.children;
  }
}

RestrictPage.propTypes = {
  user: PropTypes.string,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {user: state.auth.user};
}

export default connect(mapStateToProps)(RestrictPage);