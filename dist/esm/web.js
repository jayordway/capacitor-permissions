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
import { PermissionType } from './definitions';
export class AppPermissionsPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: "AppPermissions",
            platforms: ["web"]
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const navigator = window.navigator;
            if (!navigator.permissions) {
                return Promise.reject('This browser does not support the Permissions API');
            }
            // Photos isn't supported in the web but it's equivalent to the camera permission
            // since the prompt lets you pick from an album
            const name = options.name === PermissionType.Photos ? 'camera' : options.name;
            const ret = yield navigator.permissions.query({ name });
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