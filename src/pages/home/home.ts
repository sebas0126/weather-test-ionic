import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '../../../node_modules/@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { UtilProvider } from '../../providers/util/util';
import { Messages } from '../../classes/strings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  positionData: any;
  weatherData: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private weatherPrvd: WeatherProvider,
    private utilPrvd: UtilProvider
  ) {

  }

  ionViewDidLoad() {
    this.getCoordinates()
  }

  getCoordinates() {
    let loading = this.utilPrvd.createLoading(Messages.MSG_LOADING);
    loading.present();
    this.geolocation.getCurrentPosition().then(res => {
      loading.dismiss();
      this.positionData = res.coords;
      this.getWeather(res.coords.latitude, res.coords.longitude);
    }).catch(err => {
      loading.dismiss();
      this.utilPrvd.createMessageAlert(Messages.MSG_NO_POSITION);
    })
  }

  getWeather(latitude, longitude) {
    let loading = this.utilPrvd.createLoading(Messages.MSG_LOADING);
    loading.present();
    this.weatherPrvd.getWeather(latitude, longitude).then(res => {
      loading.dismiss();
      this.weatherData = res;
    }).catch(err => {
      loading.dismiss();
      switch (err.status) {
        case 0:
          this.utilPrvd.createMessageAlert(Messages.MSG_WEATHER_INTERNET);
          break;
        case 401:
          this.utilPrvd.createMessageAlert(Messages.MSG_NO_WEATHER);
          break;
        default:
          this.utilPrvd.createMessageAlert(Messages.MSG_WEATHER_UNKNOWN);
      }
    })
  }

}
