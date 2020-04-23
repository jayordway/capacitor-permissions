import { WebPlugin } from '@capacitor/core';
import { PermissionsPlugin, PermissionsOptions, PermissionResult } from './definitions';
export declare class AppPermissionsPluginWeb extends WebPlugin implements PermissionsPlugin {
    constructor();
    query(options: PermissionsOptions): Promise<PermissionResult>;
}
declare const AppPermissionsPlugin: AppPermissionsPluginWeb;
export { AppPermissionsPlugin };
