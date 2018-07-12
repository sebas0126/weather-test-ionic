import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherProvider {

  constructor(
    private http: HttpClient
  ) {
  }

  getWeather(latitude, longitude) {
    let url = `https://api.darksky.net/forecast/583bf0171d4b4de0d998060b4c8f9ee7/${latitude},${longitude}`
    return this.http.get(url).toPromise();
  }

  getWeatherAlt(latitude, longitude) {
    let url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`
    return this.http.get(url).toPromise();
  }

}
