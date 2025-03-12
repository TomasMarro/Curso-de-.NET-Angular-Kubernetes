// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  firebase : {
    config : {
      apiKey: "AIzaSyCgbTSM6uV5av3DrLYelCN_RhSyycI4MzU",
      authDomain: "edificacion-app-94e87.firebaseapp.com",
      projectId: "edificacion-app-94e87",
      storageBucket: "edificacion-app-94e87.firebasestorage.app",
      messagingSenderId: "1098650370307",
      appId: "1:1098650370307:web:9c4bf79081ac6e6c952936"
    }
  },
  url: 'http://localhost:5000/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
