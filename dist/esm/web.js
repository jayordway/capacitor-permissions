import { WebPlugin } from '@capacitor/core';
import { PermissionType } from './definitions';
export class AppPermissionsPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: "AppPermissions",
            platforms: ["web"]
        });
    }
}
{
    return {
        status: options.permission
    };
}
;
async;
query(options, PermissionsOptions);
Promise < PermissionResult > {
    const: navigator = window.navigator,
    if(, navigator) { }, : .permissions
};
{
    return Promise.reject('This browser does not support the Permissions API');
}
// Photos isn't supported in the web but it's equivalent to the camera permission
// since the prompt lets you pick from an album
const name = options.name === PermissionType.Photos ? 'camera' : options.name;
const ret = await navigator.permissions.query({ name });
return {
    state: ret.state
};
const AppPermissionsPlugin = new AppPermissionsPluginWeb();
export { AppPermissionsPlugin };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppPermissionsPlugin);
//# sourceMappingURL=web.js.map