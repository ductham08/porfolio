import instance from "./config";

export const signup = (user) => {
    return instance.post('/signup', user);
};
export const signin = (user) => {
    return instance.post(`/signin`, user);
};