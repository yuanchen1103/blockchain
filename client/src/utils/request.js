import cookie from './cookie';
import { API_ROOT } from '../constants';

export default (endpoint, method, headers, body) => {
  let newHeaders = headers;
  if (!newHeaders) {
    newHeaders = {};
  }
  const formatBody =
    !newHeaders || newHeaders['Content-Type'] !== 'application/json' ? body : JSON.stringify(body);

  const params = {
    method: !method ? 'GET' : method,
    timeout: 120000
  };

  if (!newHeaders.Authorization) {
    newHeaders.Authorization = `Bearer ${cookie.getAccessToken()}`;
  }

  if (newHeaders) {
    params.headers = newHeaders;
  }
  if (formatBody) {
    params.body = formatBody;
  }

  const fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  return fetch(fullUrl, params).then(response =>
    response.json().then(json => {
      const resp = { status: response.status, message: json };
      return response.ok ? Promise.resolve(resp) : Promise.reject(resp);
    })
  );
};
