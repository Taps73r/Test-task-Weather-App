interface IWeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

interface IWeatherDescription {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface IClouds {
    all: number;
}

interface IWind {
    speed: number;
    deg: number;
    gust: number;
}

interface IRain {
    "3h": number;
}

interface ISys {
    pod: string;
}

interface IListItem {
    dt: number;
    main: IWeatherMain;
    weather: IWeatherDescription[];
    clouds: IClouds;
    wind: IWind;
    visibility: number;
    pop: number;
    rain?: IRain;
    sys: ISys;
    dt_txt: string;
}

interface ICity {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface IHourlyWeatherResponse {
    cod: string;
    message: number;
    cnt: number;
    list: IListItem[];
    city: ICity;
}
