import { ApplicationConfig, enableProdMode, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import * as useIcons from '../use-icons';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { environment } from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

addIcons(environment.production ? useIcons : allIcons);

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ),
  ],
};
