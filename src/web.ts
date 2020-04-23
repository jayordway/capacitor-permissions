import { WebPlugin } from '@capacitor/core';
import { PermissionsPlugin, PermissionsOptions, PermissionResult } from './definitions';


export class AppPermissionsPluginWeb extends WebPlugin implements PermissionsPlugin {
   constructor(){
                    super({
                      name: "AppPermissions",
                      platforms: ["web"]
                    });
                  }
   query(options: PermissionsOptions): Promise<PermissionResult>;
}

const AppPermissionsPlugin = new AppPermissionsPluginWeb();

export { AppPermissionsPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppPermissionsPlugin);
