import { WebPlugin } from '@capacitor/core';
import { AppPermissionsPluginPlugin, PermissionsOptions, PermissionResult } from './definitions';
export declare class AppPermissionsPluginWeb extends WebPlugin implements AppPermissionsPluginPlugin {
    constructor();
    query(options: PermissionsOptions): Promise<PermissionResult>;
}
declare const AppPermissionsPlugin: AppPermissionsPluginWeb;
export { AppPermissionsPlugin };
