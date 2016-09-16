
import { callApi } from '../utils/apiUtils';

export const SELECT_REPOS_PAGE = 'SELECT_REPOS_PAGE';
export const INVALIDATE_REPOS_PAGE = 'INVALIDATE_REPOS_PAGE';

export const REPOS_REQUEST = 'REPOS_REQUEST';
export const REPOS_SUCCESS = 'REPOS_SUCCESS';
export const REPOS_FAILURE = 'REPOS_FAILURE';

export function selectReposPage(page) {
  return {
    type: SELECT_REPOS_PAGE,
    page,
  };
}

export function invalidateReposPage(page) {
  return {
    type: INVALIDATE_REPOS_PAGE,
    page,
  };
}

function reposRequest(page) {
  return {
    type: REPOS_REQUEST,
    page,
  };
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function reposSuccess(page) {
  return function (payload) {
    return {
      type: REPOS_SUCCESS,
      page,
      repos: payload.items,
      totalCount: payload.total_count,
    };
  };
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
function reposFailure(page) {
  return function (error) {
    return {
      type: REPOS_FAILURE,
      page,
      error,
    };
  };
}

const API_ROOT = 'https://api.github.com';

function fetchTopRepos(page) {
  const url = `${API_ROOT}/search/repositories?q=stars:>10000&order=desc&page=${page}`;
  return callApi(url, null, reposRequest(page), reposSuccess(page), reposFailure(page));
}

function shouldFetchRepos(state, page) {
  // Check cache first
  const repos = state.reposByPage[page];
  if (!repos) {
    // Not cached, should fetch
    return true;
  }

  if (repos.isFetching) {
    // Shouldn't fetch since fetching is running
    return false;
  }

  // Should fetch if cache was invalidate
  return repos.didInvalidate;
}

export function fetchTopReposIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchRepos(getState(), page)) {
      return dispatch(fetchTopRepos(page));
    }
  };
}
