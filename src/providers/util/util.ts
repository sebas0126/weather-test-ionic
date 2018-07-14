import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Buttons } from '../../classes/strings';


@Injectable()
export class UtilProvider {

  constructor(
    private allertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
  }

  toPercentage(value: number) {
    return "" + Math.trunc(value * 100);
  }

  convertTemperature(value: number) {
    return "" + Math.trunc((value - 32) / 1.8);
  }

  createLoading(message: string) {
    return this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });
  }

  createMessageAlert(title: string, message?: string, resolveName?: string) {
    return new Promise((resolve) => {
      return this.allertCtrl.create({
        title: title ? title : '',
        message: message ? message : '',
        buttons: [{
          text: resolveName || Buttons.ACCEPT,
          handler: resolve
        }]
      }).present();
    });
  }

  createAcceptCancelAlert(title: string, subtitle?: string, resolveName?: string, rejectName?: string) {
    return new Promise((resolve, reject) => {
      return this.allertCtrl.create({
        title: title,
        subTitle: subtitle ? subtitle : '',
        buttons: [{
          text: rejectName || Buttons.CANCEL,
          handler: reject
        }, {
          text: resolveName || Buttons.ACCEPT,
          handler: resolve
        }]
      }).present();
    });

  }

}
