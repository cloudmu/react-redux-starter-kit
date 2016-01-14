import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {Table, Column, Cell} from 'fixed-data-table';


import { invalidateReposPage, selectReposPage, fetchTopReposIfNeeded, resizeRepoTable } from '../../actions/repos';

import './fixed-data-table.css';
import './repo.css';

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <a href={data[rowIndex][col]} target="_blank">{data[rowIndex][col]}</a>
  </Cell>
);

const OwnerCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <div>
      <a href={data[rowIndex][col].html_url} target="_blank">
        <img src={data[rowIndex][col].avatar_url} width="32" height="32"/>
        <span className="repo_owner">{data[rowIndex][col].login}</span>
      </a>
    </div>
  </Cell>
);

const StargazersCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <span className="pull-right">{data[rowIndex][col].toLocaleString()} <i className="fa fa-star repo_fa-star" /> </span>
  </Cell>
);

class ReposPage extends Component {
  constructor(props) {
    super(props);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    const win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', _.throttle(this.handleWindowResize, 250), false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', _.throttle(this.handleWindowResize, 250));
    } else {
      win.onresize = this.handleWindowResize;
    }

    const { dispatch, page } = this.props;

    dispatch(fetchTopReposIfNeeded(page));
    setTimeout(this.handleWindowResize, 3000); // HACK. delay needed. Otherwise getTableWith and getTableHeight may throw error.
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, page } = nextProps;
    dispatch(fetchTopReposIfNeeded(page));
  }

  componentWillUnmount() {
    const win = window;
    if (win.removeEventListener) {
      win.removeEventListener('resize', _.throttle(this.handleWindowResize, 250), false);
    } else if (win.removeEvent) {
      win.removeEvent('onresize', _.throttle(this.handleWindowResize, 250), false);
    } else {
      win.onresize = null;
    }
  }

  getTableWidth() {
    try {
      const node = this.refs.TABLE_DIV;
      return node.clientWidth;
    } catch (err) {
      return 2000;
    }
  }

  getTableHeight() {
    try {
      const node = this.refs.TABLE_DIV;
      return node.clientHeight;
    } catch (err) {
      return 1200;
    }
  }

  handleWindowResize() {
    const { dispatch } = this.props;
    dispatch(resizeRepoTable(this.getTableWidth(), this.getTableHeight()));
  }

  handleNextPageClick() {
    const { page, repos } = this.props;
    if (repos.length > 0) {
      // go to next page only if more data may be available
      this.props.dispatch(selectReposPage(page + 1));
    }
  }

  handlePreviousPageClick() {
    const page = this.props.page;
    if (page > 1) {
      this.props.dispatch(selectReposPage(page - 1));
    }
  }

  handleRefreshClick(event) {
    event.preventDefault();

    const { dispatch, page } = this.props;
    dispatch(invalidateReposPage(page));
  }

  render() {
    const controlledScrolling =
      this.props.left !== undefined || this.props.top !== undefined;

    const { page, error, repos, isFetching, repoTableSize } = this.props;
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
            <li className={'pager-next' + (repos.length > 0 ? '' : ' disabled')}><a href="#" onClick={this.handleNextPageClick}>Next</a></li>
          </ul>
        </nav>

        {
          error &&
            <div className="alert alert-danger">
              {error.message || 'Unknown errors.'}
            </div>
        }

        {!isFetching && repos.length === 0 &&
          <div className="alert alert-warning">Oops, nothing to show.</div>
        }

        {repos.length > 0 &&
          <div ref="TABLE_DIV" style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Table
              rowHeight={50}
              headerHeight={50}
              width = {repoTableSize.width}
              height = {repoTableSize.height}

              rowsCount={repos.length}
              overflowX={controlledScrolling ? 'hidden' : 'auto'}
              overflowY={controlledScrolling ? 'hidden' : 'auto'}
              
              {...this.props}>

              <Column
                header={<Cell>Repository</Cell>}
                cell={<TextCell data={repos} col="name"/>}
                fixed={true}
                width={200}
              />

              <Column
                header={<Cell>Owner</Cell>}
                cell={<OwnerCell data={repos} col="owner"/>}
                width={200}
              />

              <Column
                header={<Cell>Stargazers</Cell>}
                cell={<StargazersCell data={repos} col="stargazers_count"/>}
                width={150}
              />

              <Column
                header={<Cell>Full Name</Cell>}
                cell={<TextCell data={repos} col="full_name"/>}
                width={300}
              />

               <Column
                header={<Cell>Repository URL</Cell>}
                cell={<LinkCell data={repos} col="html_url"/>}
                width={400}
              />

              <Column
                header={<Cell>Description</Cell>}
                cell={<TextCell data={repos} col="description"/>}
                width={500}
              />

            </Table>
          </div>
        }
      </div>
    );
  }
}

ReposPage.propTypes = {
  page: PropTypes.number.isRequired,
  repoTableSize: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  left: PropTypes.number,
  top: PropTypes.number
};

function mapStateToProps(state) {
  const { selectedReposPage, repoTableSize, reposByPage} = state;
  const page = selectedReposPage ? selectedReposPage : 1;
  if (!reposByPage[page]) {
    return {
      page: page,
      error: null,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      repos: [],
      repoTableSize: repoTableSize
    };
  }

  return {
    page: page,
    error: reposByPage[page].error,
    isFetching: reposByPage[page].isFetching,
    didInvalidate: reposByPage[page].didInvalidate,
    totalCount: reposByPage[page].totalCount,
    repos: reposByPage[page].repos,
    repoTableSize: repoTableSize
  };
}

export default connect(mapStateToProps)(ReposPage);
