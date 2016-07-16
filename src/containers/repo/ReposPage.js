import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare'
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AutoSizer, FlexTable, FlexColumn } from 'react-virtualized';

import { invalidateReposPage, selectReposPage, fetchTopReposIfNeeded } from '../../actions/repos';

import 'react-virtualized/styles.css';
import './repo.css'

class ReposPage extends Component {
  constructor(props) {
    super(props);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.getNoRowsRenderer = this.getNoRowsRenderer.bind(this);
    this.getRowClassName = this.getRowClassName.bind(this);
  }

  componentDidMount() {
    const { dispatch, page } = this.props;
    dispatch(fetchTopReposIfNeeded(page));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, page } = nextProps;
    dispatch(fetchTopReposIfNeeded(page));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  getNoRowsRenderer() {
    return (
      <div className='noRows'>
        No rows
      </div>
    )
  }

  getRowClassName({ index }) {
    if (index < 0) {
      return 'headerRow';
    }
    return index % 2 === 0 ? 'evenRow' : 'oddRow';
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

  ownerCellRenderer = ({ cellData, cellDataKey, columnData, rowData, rowIndex }) => (
    <a href={cellData.html_url} target="_blank">
      <img src={cellData.avatar_url} width="32" height="32" />
      <span className="repo_owner">{cellData.login}</span>
    </a>
  )

  linkCellRenderer = ({ cellData, cellDataKey, columnData, rowData, rowIndex }) => (
    <a href={cellData} target="_blank">{cellData}</a>
  )

  stargazerCellRenderer = ({ cellData, cellDataKey, columnData, rowData, rowIndex }) => (
    <span className="pull-right">{cellData.toLocaleString()} <i className="fa fa-star repo_fa-star" /> </span>
  )

  render() {
    const { page, error, repos, isFetching } = this.props;
    const prevStyles = classNames('pager-prev', { disabled: page <= 1 });
    const nextStyles = classNames('pager-next', { disabled: repos.length === 0 });

    return (
      <div className="container-fluid">

        <nav>
          <ul className="pager">
            <li className={prevStyles}><a href="#" onClick={this.handlePreviousPageClick}>Previous</a></li>
            {!isFetching &&
              <li><a href="#" onClick={this.handleRefreshClick}>Refresh page {page}</a></li>
            }
            {isFetching &&
              <span><i className="fa fa-refresh fa-spin"></i> Refreshing page {page}</span>
            }
            <li className={nextStyles}><a href="#" onClick={this.handleNextPageClick}>Next</a></li>
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
          <div ref="TABLE_DIV" style={{ opacity: isFetching ? 0.5 : 1, height: '100%' }}>
            <AutoSizer>
              {({ width, height }) => (
                <FlexTable
                  headerClassName={'headerColumn'}
                  noRowsRenderer={this.getNoRowsRenderer}
                  rowClassName={this.getRowClassName}
                  width={width}
                  height={height}
                  headerHeight={50}
                  rowHeight={50}

                  rowCount={repos.length}
                  rowGetter={
                    ({ index }) => repos[index]
                  }
                >

                  <FlexColumn
                    label='Repository'
                    dataKey='name'
                    width={200}
                  />

                  <FlexColumn
                    label='Owner'
                    dataKey='owner'
                    cellRenderer={this.ownerCellRenderer}
                    width={200}
                  />

                  <FlexColumn
                    label='Stargazers'
                    dataKey='stargazers_count'
                    cellRenderer={this.stargazerCellRenderer}
                    width={120}
                  />

                  <FlexColumn
                    label='Full Name'
                    dataKey='full_name'
                    width={300}
                  />

                  <FlexColumn
                    label='Repository URL'
                    dataKey='html_url'
                    cellRenderer={this.linkCellRenderer}
                    width={400}
                  />

                  <FlexColumn
                    label='Description'
                    dataKey='description'
                    width={500}
                    flexGrow={1}
                  />
                </FlexTable>
              )}
            </AutoSizer>
          </div>
        }
      </div>
    );
  }
}

ReposPage.propTypes = {
  page: PropTypes.number.isRequired,
  repos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  left: PropTypes.number,
  top: PropTypes.number,
};

function mapStateToProps(state) {
  const { selectedReposPage, reposByPage } = state;
  const page = selectedReposPage || 1;
  if (!reposByPage[page]) {
    return {
      page,
      error: null,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      repos: [],
    };
  }

  return {
    page,
    error: reposByPage[page].error,
    isFetching: reposByPage[page].isFetching,
    didInvalidate: reposByPage[page].didInvalidate,
    totalCount: reposByPage[page].totalCount,
    repos: reposByPage[page].repos,
  };
}

export default connect(mapStateToProps)(ReposPage);
