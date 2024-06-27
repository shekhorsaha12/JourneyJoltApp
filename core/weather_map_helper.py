import requests


class WeatherMapHelper:
  api_key =  '390166034c235d4abc4887751c4ed670'

  @classmethod
  def getGeocoding(cls, city):
    geo_url =  f'http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={cls.api_key}'
    
    rsp = requests.get(geo_url)
    if rsp.status_code == 200:
      
      data = rsp.json()
      if not data:
        raise Exception("data is not there")
      lat = data[0]['lat']
      lon = data[0]['lon']
      return lat, lon
    else:
      raise Exception("Error getting the geo location data for the given location")
  
  
  @classmethod
  def getTemperature(cls, lat, lon):
    url = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={cls.api_key}&units=metric'

    rsp = requests.get(url)
    if rsp.status_code == 200:
      data = rsp.json()
      return data["main"]["temp"]
    else:
        raise Exception("Error getting the weather information for the given location")