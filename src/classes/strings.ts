export class Messages {
  static MSG_LOADING = 'Cargando...';

  static MSG_GPS = 'Esta aplicación requiere el servicio de GPS, por favor activelo';

  static MSG_NO_POSITION = 'No se pudo obtener la ubicación porfavor verifique la configuración de su GPS';
  static MSG_NO_WEATHER = 'No se pudo obtener la información del clima, ocurrio un problema con el servicio'
  static MSG_WEATHER_INTERNET = 'No se pudo obtener la información del clima, verifica porfavor tu conexión a internet';
  static MSG_WEATHER_UNKNOWN = 'No se pudo obtener la información del clima, error desconocido';

}

export class Buttons {
  static ACCEPT = 'Aceptar';
  static CANCEL = 'Cancelar';
}

export class Constants {

  static PLATFORMS = {
    cordova: 'cordova'
  }

  static WEATHER_SRVC = {
    browser: 'getWeatherBrowser',
    device: 'getWeather'
  }

  static WEATHER_IMG = {
    clearday: 'assets/imgs/1-15.png',
    clearnight: 'assets/imgs/1-12.png',
    rain: 'assets/imgs/1-04.png',
    snow: 'assets/imgs/1-10.png',
    fog: 'assets/imgs/1-13.png',
    cloudy: 'assets/imgs/1-17.png',
    partlycloudyday: 'assets/imgs/1-07.png',
    partlycloudynight: 'assets/imgs/1-16.png'
  }

}