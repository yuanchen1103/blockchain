import request from '../utils/request';
// eslint-disable-next-line import/no-cycle
import { USER_PERMISSION_DENY } from '../actions';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default () => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, method, headers, body } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = (data) => {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return request(endpoint, method, headers, body).then(
    (response) =>
      next(
        actionWith({
          response: response.message,
          status: response.status,
          type: successType
        })
      ),
    (error) =>
      next(
        actionWith({
          type:
            error.status === 401 || error.status === 403
              ? USER_PERMISSION_DENY
              : failureType,
          status: error.status,
          error: error.message || 'Something bad happened'
        })
      )
  );
};
