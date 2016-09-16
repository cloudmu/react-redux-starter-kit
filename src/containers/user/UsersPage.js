import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

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
    if (nextProps.page !== this.props.page) {
      const { dispatch, page } = nextProps;
      dispatch(fetchTopUsersIfNeeded(page));
    }
  }

  handleNextPageClick(e) {
     e.preventDefault();
    const { page, users } = this.props;
    if (users.length > 0) {
      // go to next page only if more users may be available
      this.props.dispatch(selectUsersPage(page + 1));
    }
  }

  handlePreviousPageClick(e) {
     e.preventDefault();
    const page = this.props.page;
    if (page > 1) {
      this.props.dispatch(selectUsersPage(page - 1));
    }
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, page } = this.props;
    dispatch(invalidateUsersPage(page));
    dispatch(fetchTopUsersIfNeeded(page));
  }

  render() {
    const { page, error, users, isFetching } = this.props;
    const prevStyles = classNames('page-item', { disabled: page <= 1 });
    const nextStyles = classNames('page-item', { disabled: users.length === 0 });

    return (
      <div className="container">

        <nav>
          <ul className="pagination pagination-sm">
            <li className={prevStyles}><a className="page-link" href="#" onClick={this.handlePreviousPageClick}><span>Previous</span></a></li>
            {!isFetching &&
              <li className="page-item" ><a className="page-link" href="#" onClick={this.handleRefreshClick}><span>Refresh page {page}</span></a></li>
            }
            {isFetching &&
              <li className="page-item"><span className="page-link"><i className="fa fa-refresh fa-spin"></i> Refreshing page {page}</span></li>
            }
            <li className={nextStyles}><a className="page-link" href="#" onClick={this.handleNextPageClick}><span>Next</span></a></li>
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
                <div key={user.login} className="col-md-4">
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
  error: PropTypes.object,
};

function mapStateToProps(state) {
  const { selectedUsersPage, usersByPage } = state;
  const page = selectedUsersPage || 1;

  if (!usersByPage || !usersByPage[page]) {
    return {
      page,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      users: [],
      error: null,
    };
  }

  return {
    page,
    error: usersByPage[page].error,
    isFetching: usersByPage[page].isFetching,
    didInvalidate: usersByPage[page].didInvalidate,
    totalCount: usersByPage[page].totalCount,
    users: usersByPage[page].users,
  };
}

export default connect(mapStateToProps)(UsersPage);
