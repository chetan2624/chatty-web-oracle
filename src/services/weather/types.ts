
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  tips: string[];
}

export interface AccuWeatherLocation {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}

export interface AccuWeatherCondition {
  Temperature: {
    Metric: {
      Value: number;
    };
  };
  RelativeHumidity: number;
  Wind: {
    Speed: {
      Metric: {
        Value: number;
      };
    };
  };
  WeatherText: string;
  WeatherIcon: number;
}
