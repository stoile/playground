import fetch from 'node-fetch';

const timeout = 400 // ms
const FortuneCookie = {
    getOne() {
        return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie', { timeout })
            .then(res => res.json())
            .then(res => {
                return res[0].fortune.message;
            });
    }
};

export { FortuneCookie };
