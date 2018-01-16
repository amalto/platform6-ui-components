"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUserJson(user) {
    var json = {};
    if (user && user.jsonContent) {
        try {
            json = JSON.parse(user.jsonContent);
        }
        catch (error) {
            console.log('JSON content parsing error: ', error);
        }
    }
    return json;
}
exports.getUserJson = getUserJson;
//# sourceMappingURL=UserModel.js.map