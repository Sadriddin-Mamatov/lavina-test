import CryptoJS from 'crypto-js';

export const authHeader = (method: string, url: string, body: string) => {
    const key = localStorage.getItem('userKey');
    const secret = localStorage.getItem('userSecret');

    const signStr = `${method}${url}${body}${secret}`;
    const sign = CryptoJS.MD5(signStr).toString();

    return {
        'Key': key || '',
        'Sign': sign,
        'Content-Type': 'application/json',
    };
};
