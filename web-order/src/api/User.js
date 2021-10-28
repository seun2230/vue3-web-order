import { user } from './index.js';

function signup(req) {
    return user.post('signup', req);
}

export {
    signup
};