import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare'
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AutoSizer, Table, Column } from 'react-virtualized';

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

  handleNextPageClick(e) {
    e.preventDefault();
    const { page, repos } = this.props;
    if (repos.length > 0) {
      // go to next page only if more data may be available
      this.props.dispatch(selectReposPage(page + 1));
    }
  }

  handlePreviousPageClick(e) {
    e.preventDefault();
    const page = this.props.page;
    if (page > 1) {
      this.props.dispatch(selectReposPage(page - 1));
    }
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, page } = this.props;
    dispatch(invalidateReposPage(page));
  }

  ownerCellRenderer = ({ cellData, cellDataKey, columnData, rowData, rowIndex }) => (
    <a href={cellData.html_url} target="_blank">
      <img src={cellData.avatar_url} width="32" height="32" alt="owner" />
      <span style={{marginLeft: '0.5em'}}>{cellData.login}</span>
    </a>
  );

  linkCellRenderer = ({ cellData, cellDataKey, columnData, rowData, rowIndex }) => (
    <a href={cellData} target="_blank">{cellData}</a>
  );

  stargazerCellRenderer = ({ cellData, cellDataKey, columnData, rowData, rowIndex }) => (
    <span className="pull-right">{cellData.toLocaleString()} <i className="fa fa-star" style={{color: 'gold'}} /> </span>
  );

  render() {
    const { page, error, repos, isFetching } = this.props;
    const prevStyles = classNames('page-item', { disabled: page <= 1 });
    const nextStyles = classNames('page-item', { disabled: repos.length === 0 });

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

        {!isFetching && repos.length === 0 &&
          <div className="alert alert-warning">Oops, nothing to show.</div>
        }

        {repos &&
          <div className="container" ref="TABLE_DIV" style={ { opacity: isFetching ? 0.5 : 1, width: '100%', height: '80vh', position: 'absolute' }}>
            <AutoSizer>
              {({ width, height }) => (
                <Table
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

                  <Column
                    label='Repository'
                    dataKey='name'
                    width={200}
                  />

                  <Column
                    label='Owner'
                    dataKey='owner'
                    cellRenderer={this.ownerCellRenderer}
                    width={200}
                  />

                  <Column
                    label='Stargazers'
                    dataKey='stargazers_count'
                    cellRenderer={this.stargazerCellRenderer}
                    width={150}
                  />

                  <Column
                    label='Full Name'
                    dataKey='full_name'
                    width={400}
                  />

                  <Column
                    label='Repository URL'
                    dataKey='html_url'
                    cellRenderer={this.linkCellRenderer}
                    width={400}
                  />

                  <Column
                    label='Description'
                    dataKey='description'
                    width={500}
                    flexGrow={1}
                  />
                </Table>
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
