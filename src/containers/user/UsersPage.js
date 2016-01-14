import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import User from '../../components/user/User';

import { invalidateUsersPage, selectUsersPage, fetchTopUsersIfNeeded } from '../../actions/users';

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, page } = this.props;
    dispatch(fetchTopUsersIfNeeded(page));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, page } = nextProps;
    dispatch(fetchTopUsersIfNeeded(page));
  }

  handleNextPageClick() {
    const { page, users } = this.props;
    if (users.length > 0) {
      // go to next page only if more users may be available
      this.props.dispatch(selectUsersPage(page + 1));
    }
  }

  handlePreviousPageClick() {
    const page = this.props.page;
    if (page > 1) {
      this.props.dispatch(selectUsersPage(page - 1));
    }
  }

  handleRefreshClick(event) {
    event.preventDefault();

    const { dispatch, page } = this.props;
    dispatch(invalidateUsersPage(page));
  }

  render() {
    const { page, error, users, isFetching } = this.props;
    return (
      <div className="container-fluid">
        <nav>
          <ul className="pager">
            <li className={'pager-prev' + (page > 1 ? '' : ' disabled')}><a href="#" onClick={this.handlePreviousPageClick}>Previous</a></li>
            {!isFetching &&
              <li><a href="#" onClick={this.handleRefreshClick}>Refresh page {page}</a></li>
            }
            {isFetching &&
              <span><i className="fa fa-refresh fa-spin"></i> Refreshing page {page}</span>
            }
            <li className={'pager-next' + (users.length > 0 ? '' : ' disabled')}><a href="#" onClick={this.handleNextPageClick}>Next</a></li>
          </ul>
        </nav>

        {
          error &&
          <div className="alert alert-danger">
            {error.message || 'Unknown errors.'}
          </div>
        }

        {!isFetching && users.length === 0 &&
          <div className="alert alert-warning">Oops, nothing to show.</div>
        }

        {users.length > 0 &&
          <div className="row" style={{ opacity: isFetching ? 0.5 : 1 }}>
              {users.map(user =>
                <div key={user.login} className="col-lg-2 col-md-4 col-sm-6 col-sm-xs-12">
                  <User key={user.login} user={user} />
                </div>
              )}
          </div>
        }
      </div>
    );
  }
}

UsersPage.propTypes = {
  page: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object
};

function mapStateToProps(state) {
  const { selectedUsersPage, usersByPage } = state;
  const page = selectedUsersPage ? selectedUsersPage : 1;

  if (!usersByPage || !usersByPage[page]) {
    return {
      page: page,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      users: [],
      error: null
    };
  }

  return {
    page: page,
    error: usersByPage[page].error,
    isFetching: usersByPage[page].isFetching,
    didInvalidate: usersByPage[page].didInvalidate,
    totalCount: usersByPage[page].totalCount,
    users: usersByPage[page].users
  };
}

export default connect(mapStateToProps)(UsersPage);
