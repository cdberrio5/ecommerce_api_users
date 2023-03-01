function randomStr() {

    const len = 6;
    const arr = '0123456789abcdefghijklmnopqrstuvwxyz';

    var ans = '';

    for (var i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
    }

    return ans;
}

module.exports = {
    randomStr
}