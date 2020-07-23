const APIV1 = "/api/v1";
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
        userInfo: `${APIV1}/userInfo`,
        users: `${APIV1}/users`,
        posts: `${APIV1}/posts`,
        dashboard: `${APIV1}/dashboard`,
        
        v1test: `${APIV1}/test`,
        v2test: `${APIV2}/test`,

        user: `${APIV1}/auth/user`,
        userResetPwd: `${APIV1}/ucenter/agentInfo/resetPwd`,
        //登录注册验证码
        codeImgUrl: `${APIV1}/auth/captcha`,
        codeMobile: `${APIV1}/common/code`, //获取短信验证码
        userLogin: `${APIV1}/auth/agentLogin`,
        userLogout: `${APIV1}/auth/logout`,
        baseInfo: `${APIV1}/ucenter/agentInfo/getAgentInfo`, //基本信息
        userBankCard: `${APIV1}/ucenter/userBankCard`, //银行卡
        appUserInfo: `${APIV1}/ucenter/appUserInfo`, //代理商用户管理
        businessCard: `${APIV1}/marketing/card/cardPaging`, //代理商名片管理
        vipOrder: `${APIV1}/account/vipOrder`, //会员升级订单
        agentAccountRecord:`${APIV1}/account/agentAccountRecord/agentPaging`,//分润订单
        agentAccountTotal:`${APIV1}/account/agentAccountRecord/dataCount`, // 首页--今日/累计分润
        agentAccount:`${APIV1}/account/agentAccount/data`,//账户余额
        dataCount:`${APIV1}/ucenter/appUserInfo/dataCount`,//首页---业务数据
        userData:`${APIV1}/ucenter/appUserInfo/data`,//用户数据
        tendencyChat:`${APIV1}/ucenter/agentInfo/tendencyChat`,//趋势图数据
        tendecyMonth:`${APIV1}/ucenter/agentInfo/tendencyChatMonth`, // 按月趋势图数据
        commonBank: `${APIV1}/common/bank`, //添加银行卡--获取银行名称
        ranking:`${APIV1}/account/agentAccountRecord/consumeSort`, //首页--消费排名
        AgentRecord:`${APIV1}/account/AgentAccountProfitOrder/agentPaging` , //  交易管理--分润订单
        userTopups:`${APIV1}/account/activityAccountRechargeOrder/agentPaging`,  //交易管理 -- 用户充值订单
        Withdrawals:`${APIV1}/account/agentAccountWithdrawOrder/agentPaging` ,  // 结算管理 -- 提现记录
        webCustomer:`${APIV1}/ucenter/company/agentPaging`,    // 客户管理 -- web端客户管理
        bankCard: `${APIV1}/ucenter/userBankCard/getBank`,   // 系统设置-- 银行卡管理
        userWeb:`${APIV1}/marketing/company/agentPaging`,     //客户管理 -- web端客户管理
        userWebCreate: `${APIV1}/ucenter/company/addCompany`,     //客户管理 -- web端客户管理 -- 提交添加客户
        webAdduserPersonal:`${APIV1}/ucenter/personalCertification/build`,  //客户管理 -- web端客户管理 -- 提交添加客户(个人)
        webAdduserCompay:`${APIV1}/ucenter/companyCertification/build`, //客户管理 -- web端客户管理 -- 提交添加客户(企业)
        userMobile: `${APIV1}/ucenter/appUserInfo`,  //客户管理 -- 移动端客户管理
        agentCash: `${APIV1}/account/agentAccountWithdrawOrder/bring`,  // 首页 -- 提现 -- 提交  
        addwebUser:`${APIV1}/marketing/company`,    // web用户管理  - - 新增web用户 
        agentInfoQuery:`${APIV1}/ucenter/companyCertification/info`,   // 添加的时候根据手机号码查询信息
        repeatPersonal:`${APIV1}/ucenter/personalCertification/info`,    // 添加的时候根据手机号码查询信息 （个人）
    }
};
