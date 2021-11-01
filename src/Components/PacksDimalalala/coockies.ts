export const setCookie = (name: string, token: string, tokenDeathTime: number) => {
    document.cookie = `${name}=${token};max-age=${tokenDeathTime};path=/`;
};

export const setTokenInCookie = (token: string, tokenDeathTime: number) => {
    setCookie('token', token, Math.floor(tokenDeathTime / 1000) - 180);
}

export const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()\]\\^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
};