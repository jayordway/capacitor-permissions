import { WebPlugin } from '@capacitor/core';
import { AppPermissionsPluginPlugin } from './definitions';
export declare class AppPermissionsPluginWeb extends WebPlugin implements AppPermissionsPluginPlugin {
    constructor();
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
declare const AppPermissionsPlugin: AppPermissionsPluginWeb;
export { AppPermissionsPlugin };
