import { WebPlugin } from '@capacitor/core';
import { AppPermissionsPluginPlugin, PermissionsOptions, PermissionResult } from './definitions';


export class AppPermissionsPluginWeb extends WebPlugin implements AppPermissionsPluginPlugin {
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
