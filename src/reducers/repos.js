import { SELECT_REPOS_PAGE,
    INVALIDATE_REPOS_PAGE,
    REPOS_REQUEST,
    REPOS_SUCCESS,
    REPOS_FAILURE } from '../actions/repos';

export function selectedReposPage(state = 1, action) {
  switch (action.type) {
    case SELECT_REPOS_PAGE:
      return action.page;
    default:
      return state;
  }
}

function repos(state = {
  isFetching: false,
  didInvalidate: false,
  totalCount: 0,
  repos: [],
  error: null,
}, action) {
  switch (action.type) {
    case INVALIDATE_REPOS_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REPOS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case REPOS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        totalCount: action.total_count,
        repos: action.repos,
        error: null,
      });
    case REPOS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error,
      });
    default:
      return state;
  }
}

export function reposByPage(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_REPOS_PAGE:
    case REPOS_REQUEST:
    case REPOS_SUCCESS:
    case REPOS_FAILURE:
      return Object.assign({}, state, {
        [action.page]: repos(state[action.page], action),
      });
    default:
      return state;
  }
}
