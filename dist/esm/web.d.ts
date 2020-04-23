import { WebPlugin } from '@capacitor/core';
import { AppPermissionsPlugin, PermissionsOptions, PermissionResult } from './definitions';
export declare class AppPermissionsPluginWeb extends WebPlugin implements AppPermissionsPlugin {
    constructor();
    query(options: PermissionsOptions): Promise<PermissionResult>;
}
declare const AppPermissionsPlugin: AppPermissionsPluginWeb;
export { AppPermissionsPlugin };
