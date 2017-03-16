/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    "defaultJSExtensions": true,
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'angular2-jwt': 'npm:angular2-jwt/angular2-jwt.js',
      "materialize-css": "npm:materialize-css",
      "angular2-materialize": "npm:angular2-materialize",
      "angular2-google-map-auto-complete": "npm:angular2-google-map-auto-complete",
      "angular2-image-upload":"npm:angular2-image-upload",
      "file-droppa":"npm:file-droppa",
      'ng2-imageupload': 'npm:ng2-imageupload',
      'ng2-auto-complete':'npm:ng2-auto-complete',
      "angular2-masonry": "node_modules/angular2-masonry",
      "ng2-owl-carousel":"node_modules/ng2-owl-carousel",
      "masonry-layout": "node_modules/angular2-masonry/node_modules/masonry-layout/dist/masonry.pkgd.js",
      // other libraries
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js'
      },
       "angular2-masonry": { "defaultExtension": "js", "main": "index" },
       'materialize-css': { 
        "format": "global",
        "main": "dist/js/materialize",
        "defaultExtension": "js"
      },
       'angular2-image-upload': {
        "main": "index",
        "defaultExtension": "js"
      },
    'ng2-imageupload': {
              main: 'index.js',
              defaultExtension: 'js'
          },
           'ng2-owl-carousel': {
              main: 'index',
              defaultExtension: 'js'
          },
      'angular2-materialize': {
        "main": "dist/index",
        "defaultExtension": "js"
      },
        'ng2-auto-complete':{
      main: 'dist/ng2-auto-complete.umd.js', 
      defaultExtension: 'js'
      },
       'file-droppa': {
        "main": "index",
        "defaultExtension": "js"
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
