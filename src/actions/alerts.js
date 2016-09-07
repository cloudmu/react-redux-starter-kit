export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_ERROR = 'CONNECT_ERROR';
export const ALERT = 'ALERT';
export const DISMISS = 'DISMISS';

export function connectSuccess() {
  return {
    type: CONNECT_SUCCESS,
  };
}

export function connectError() {
  return {
    type: CONNECT_ERROR,
  };
}

export function alert(payload) {
  return {
    type: ALERT, 
    payload,
  }
}

export function dismiss() {
  return {
    type: DISMISS,
  };
}
