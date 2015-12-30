'use strict';
import 'isomorphic-fetch';
import { checkStatus, parseJSON } from './utils';

export const SELECT_REPOS_PAGE = 'SELECT_REPOS_PAGE';
export const INVALIDATE_REPOS_PAGE = 'INVALIDATE_REPOS_PAGE';

export const REPOS_REQUEST = 'REPOS_REQUEST';
export const REPOS_SUCCESS = 'REPOS_SUCCESS';
export const REPOS_FAILURE = 'REPOS_FAILURE';

export const RESIZE_REPO_TABLE = 'RESIZE_REPO_TABLE';

export function resizeRepoTable(width, height) {
  return {
    type: RESIZE_REPO_TABLE,
    width,
    height
  };
}

export function selectReposPage(page) {
  return {
    type: SELECT_REPOS_PAGE,
    page
  };
}

export function invalidateReposPage(page) {
  return {
    type: INVALIDATE_REPOS_PAGE,
    page
  };
}

function reposRequest(page) {
  return {
    type: REPOS_REQUEST,
    page
  };
}

function reposSuccess(page, payload) {
  return {
    type: REPOS_SUCCESS,
    page,
    repos: payload.items,
    totalCount: payload.total_count
  };
}

function reposFailure(page, error) {
  return {
    type: REPOS_FAILURE,
    page,
    error
  };
}

const API_ROOT = 'https://api.github.com/';

function fetchTopRepos(page) {
  return dispatch => {
    dispatch(reposRequest(page));

    return fetch(API_ROOT + 'search/repositories?q=stars:>10000&order=desc&page=' + page)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(reposSuccess(page, json)))
      .catch(error => {
        const response = error.response;
        if (response === undefined) {
          dispatch(reposFailure(page, error));
        } else {
          parseJSON(response)
            .then(json => {
              error.status = response.status;
              error.statusText = response.statusText;
              error.message = json.message;
              dispatch(reposFailure(page, error));
            });
        }
      });
  };
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
