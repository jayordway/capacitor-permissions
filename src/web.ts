import { WebPlugin } from '@capacitor/core';
import { PermissionsPlugin, PermissionsOptions, PermissionResult, PermissionType } from './definitions';


export class AppPermissionsPluginWeb extends WebPlugin implements PermissionsPlugin {
   constructor(){
                    super({
                      name: "AppPermissions",
                      platforms: ["web"]
                    });
                  }

   async request(options: { permission: string }): Promise<{ status: string }>  {
       return {
              status: options.permission
           };
       };

   async query(options: PermissionsOptions): Promise<PermissionResult> {
       const navigator = window.navigator as any;

       if (!navigator.permissions) {
         return Promise.reject('This browser does not support the Permissions API');
       }

       const ret = await navigator.permissions.query({ options.name });

       return {
         state: ret.state
       };
     }
}

const AppPermissionsPlugin = new AppPermissionsPluginWeb();

export { AppPermissionsPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppPermissionsPlugin);
