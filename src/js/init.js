'use strict';

angular.element(document).ready(function() {

  // Run copayApp after device is ready.
  var startAngular = function() {
   angular.bootstrap(document, ['copayApp']);
  };
  /* Cordova specific Init */
  if (window.cordova !== undefined) {

    // Fastclick event
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }

    document.addEventListener('deviceready', function() {

      document.addEventListener('pause', function() {
        if (!window.ignoreMobilePause) {
          window.location = '#/';
        }
      }, false);

      document.addEventListener('resume', function() {
        window.location = '#/cordova/resume';
        setTimeout(function() {
          window.ignoreMobilePause = false;
        }, 100);
      }, false);

      // We are not emitting here, since when the BWS socket reconnects,
      // update will be triggered  
      document.addEventListener('offline', function() {
         window.location = '#/cordova/offline';
      }, false);
      //
      // document.addEventListener("online", function() {
      //    window.location = '#/cordoba/online';
      // }, false);

      document.addEventListener('backbutton', function() {
        window.location = '#/walletHome';
      }, false);

      document.addEventListener('menubutton', function() {
        window.location = '#/preferences';
      }, false);



      setTimeout(function() {
        navigator.splashscreen.hide();
      }, 2000);

      function handleBitcoinURI(url) {
        if (!url) return;
        window.location = '#/uri-payment/' + url;
      }

      window.plugins.webintent.getUri(handleBitcoinURI);
      window.plugins.webintent.onNewIntent(handleBitcoinURI);
      window.handleOpenURL = handleBitcoinURI;

      startAngular();
    }, false);
  } else {
    startAngular();
  }

});
