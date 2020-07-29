const APIV1 = "http://localhost:3000";
const APIV2 = "/api/v2";

module.exports = {
    name: "英皇",
    prefix: "英皇互学、沟通、交友平台",
    footerText: "英皇互学、沟通、交友平台",
    // logo: "/public/logo.svg",
    logo: "/public/img/ic_logo.png",
    iconFontCSS: "/public/iconfont.css",
    iconFontJS: "/public/iconfont.js",
    CORS: [],
    openPages: ["/login", "/resetpwd"],
    apiPrefix: "/api/v1",
    APIV1,
    APIV2,
    api: {
        homeVideo: `${APIV1}/getvideo`,
        users: `${APIV1}/users`,
        posts: `${APIV1}/posts`,
        dashboard: `${APIV1}/dashboard`,
    }
};
