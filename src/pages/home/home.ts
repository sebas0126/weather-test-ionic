import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { UtilProvider } from '../../providers/util/util';
import { Messages, Constants } from '../../classes/strings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weatherData: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private weatherPrvd: WeatherProvider,
    private utilPrvd: UtilProvider,
    private platform: Platform
  ) {

  }

  ionViewDidLoad() {
    this.initProcess();
  }

  initProcess(){
    if (this.platform.is(Constants.PLATFORMS.cordova)) {
      this.getLocation();
    } else {
      this.getBrowserLocation();
    }
  }

  getBrowserLocation() {
    let loading = this.utilPrvd.createLoading(Messages.MSG_LOADING);
    loading.present();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        loading.dismiss();
        this.getWeather(res.coords.latitude, res.coords.longitude, true);
      });
    }
  }

  getLocation() {
    let loading = this.utilPrvd.createLoading(Messages.MSG_LOADING);
    loading.present();
    this.geolocation.getCurrentPosition().then(res => {
      loading.dismiss();
      this.getWeather(res.coords.latitude, res.coords.longitude, false);
    }).catch(err => {
      loading.dismiss();
      this.utilPrvd.createMessageAlert(Messages.MSG_NO_POSITION);
    })
  }

  getImage(type: string) {
    let name = type.split("-").join("");
    return Constants.WEATHER_IMG[name];
  }

  getWeather(latitude, longitude, isBrowser: boolean) {
    let loading = this.utilPrvd.createLoading(Messages.MSG_LOADING);
    loading.present();
    this.weatherPrvd[isBrowser ? Constants.WEATHER_SRVC.browser : Constants.WEATHER_SRVC.device](latitude, longitude)
      .then(res => {
        loading.dismiss();
        this.weatherData = {
          humidity: this.utilPrvd.toPercentage(res.currently.humidity),
          image: this.getImage(res.currently.icon),
          precipProbability: this.utilPrvd.toPercentage(res.currently.precipProbability),
          temperature: this.utilPrvd.convertTemperature(res.currently.temperature),
          weather: res.currently.summary,
          icon: res.currently.icon
        };
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
