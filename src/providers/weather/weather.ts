import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as ENV } from '../../environments/environment';

@Injectable()
export class WeatherProvider {

  constructor(
    private http: HttpClient
  ) {
  }

  getWeather(latitude, longitude): Promise<any> {
    let url = `${ENV.DARKSKY_API}/${ENV.DARKSKY_TOKEN}/${latitude},${longitude}`
    return this.http.get(url).toPromise();
  }

  getWeatherBrowser(latitude, longitude): Promise<any> {
    let url = `${ENV.DARKSKY_PROXY}/${ENV.DARKSKY_TOKEN}/${latitude},${longitude}`
    return this.http.get(url).toPromise();
  }

}
