import { WebPlugin } from '@capacitor/core';
import { PermissionsPlugin } from './definitions';
export declare class AppPermissionsPluginWeb extends WebPlugin implements PermissionsPlugin {
    constructor();
}
declare const AppPermissionsPlugin: AppPermissionsPluginWeb;
export { AppPermissionsPlugin };
