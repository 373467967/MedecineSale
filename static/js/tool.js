class Validate {
    constructor() {}
    static test(type, str) {
        let res = null;
        switch (type) {
            case "tel": {
                // 1. 手机 
                res = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(str);
            } break;
            case "password": {
                // 2. 密码正则，4到16位（字母，数字，下划线，减号）
                res = /^[A-Za-z0-9_-]{4,16}$/.test(str);
            } break;
        }
        return res;
    }
}