var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
export class AppPermissionsPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: "AppPermissions",
            platforms: ["web"]
        });
    }
    request(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: options.permission
            };
        });
    }
    ;
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const navigator = window.navigator;
            if (!navigator.permissions) {
                return Promise.reject('This browser does not support the Permissions API');
            }
            const ret = yield navigator.permissions.query({ options, : .name });
            return {
                state: ret.state
            };
        });
    }
}
const AppPermissionsPlugin = new AppPermissionsPluginWeb();
export { AppPermissionsPlugin };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppPermissionsPlugin);
//# sourceMappingURL=web.js.map