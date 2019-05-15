import Cookie from 'universal-cookie';
import * as jwt from 'jsonwebtoken';

class MyCookie {
  constructor() {
    this.cookie = new Cookie();
  }

  set(name, value) {
    this.cookie.set(name, value);
  }

  get(name) {
    return this.cookie.get(name);
  }

  getAccessToken() {
    return this.cookie.get('access_token');
  }

  setAccessToken(token) {
    this.cookie.set('access_token', token, { path: '/', maxAge: 5184000 });
  }

  removeAccessToken() {
    this.cookie.remove('access_token');
    this.cookie.remove('access_token', { path: '/' });
  }

  getValidAccessToken(userId) {
    const jwtToken = this.getAccessToken();

    if (!jwtToken) {
      return null;
    }

    try {
      const decodeToken = jwt.decode(jwtToken);

      if (!decodeToken || !decodeToken.uid || !decodeToken.expired) {
        return null;
      }

      return decodeToken.uid === userId && decodeToken.expired >= Date.now() ? jwtToken : null;
    } catch (err) {
      return null;
    }
  }
}

const cookie = new MyCookie();
export default cookie;
