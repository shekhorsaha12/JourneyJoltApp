from background_task import background
from . models import Place
from . weather_map_helper import WeatherMapHelper

@background(schedule=3)
def refreshPlacesTemperature():
  places = Place.objects.all()
  for place in places:
    place.temperature = WeatherMapHelper.getTemperature(place.lat, place.lon)
    print("Place name: ", place.name, "; New temperature: ", place.temperature)
    place.save()


print("Configure the background task: refreshPlacesTemperature ; Run every 30 minutes")
refreshPlacesTemperature(repeat=30*60)
