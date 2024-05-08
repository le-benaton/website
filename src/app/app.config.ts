import {ApplicationConfig, enableProdMode} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import * as useIcons from '../use-icons';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import {environment} from '../environments/environment';

if (environment.production) {
  enableProdMode();
}

addIcons(environment.production ? useIcons : allIcons);

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration()]
};
