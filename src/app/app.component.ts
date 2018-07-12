import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Diagnostic } from '../../node_modules/@ionic-native/diagnostic';
import { UtilProvider } from '../providers/util/util';
import { Messages } from '../classes/strings';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private diagnostic: Diagnostic,
    private utilPrvd: UtilProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.verifyGPS();
    });

    platform.resume.subscribe(() => {
      this.verifyGPS();
    })
  }

  verifyGPS() {
    this.diagnostic.isLocationEnabled().then(res => {
      if (!res) this.utilPrvd.createMessageAlert(Messages.MSG_GPS).then(() => {
        this.diagnostic.switchToLocationSettings();
      })
    })
  }

}

