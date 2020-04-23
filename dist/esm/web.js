import { WebPlugin } from '@capacitor/core';
export class AppPermissionsPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: "Permissions",
            platforms: ["web"]
        });
    }
}
const AppPermissionsPlugin = new AppPermissionsPluginWeb();
export { AppPermissionsPlugin };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppPermissionsPlugin);
//# sourceMappingURL=web.js.map