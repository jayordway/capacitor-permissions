import { WebPlugin } from '@capacitor/core';
import { AppPermissionsPluginPlugin } from './definitions';

export class AppPermissionsPluginWeb extends WebPlugin implements AppPermissionsPluginPlugin {
  constructor() {
    super({
      name: 'AppPermissionsPlugin',
      platforms: ['web']
    });
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return options;
  }
}

const AppPermissionsPlugin = new AppPermissionsPluginWeb();

export { AppPermissionsPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AppPermissionsPlugin);
