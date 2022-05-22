const authCookieHandler = () => {
    const UsernameCookieKey = "FelixSocialUserName";
    const AuthTokenCookieKey = "FelixSocialToken";

    const setUserDetails = (cookiesValue) => {
        const { token, username } = cookiesValue;

        let maxAge = `max-age=${30 * 30 * 24 * 2};`;

        document.cookie = `${UsernameCookieKey}=${encodeURIComponent(
            username
        )};${maxAge}secure`;

        document.cookie = `${AuthTokenCookieKey}=${encodeURIComponent(
            token
        )};${maxAge}secure`;
    }

    const getUserDetails = () => {
        const allCookies = {
            username: "",
            token: "",
        };

        document.cookie.split(";").forEach((cookie) => {
            let [key, value] = cookie.split("=");
            value = decodeURIComponent(value);

            switch (key.trim()) {
                case UsernameCookieKey:
                    allCookies.username = value;
                    break;

                case AuthTokenCookieKey:
                    allCookies.token = value;
                    break;

                default:
                    console.log("Not a valid cookie");
            }
        });

        return allCookies;
    }

    const clearUserDetails = () => {
        document.cookie = `${UsernameCookieKey}=;max-age=0;path="/"`;
        document.cookie = `${AuthTokenCookieKey}=;max-age=0;path="/"`;
    }

    return {
        setUserDetails,
        getUserDetails,
        clearUserDetails
    }
}
export default authCookieHandler