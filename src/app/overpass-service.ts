import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { OverpassApiService, PizzaPlace } from './overpass-api-service';

@Injectable({
  providedIn: 'root'
})
export class OverpassService {

  private _listOfCities: WritableSignal<string[]> = signal([...districtsByCity.keys()])
  listOfCities = this._listOfCities.asReadonly()

  private _districtsByCity: WritableSignal<Map<string, string[]>> = signal(districtsByCity)
  districtsByCity = this._districtsByCity.asReadonly()


  private _pizzaPlaces: WritableSignal<PizzaPlace[]|undefined> = signal([])
  pizzaPlaces = this._pizzaPlaces.asReadonly()
  numberOfPizzaPlaces: Signal<number|undefined> = computed(() => {
    
    const pizzaPlaces = this._pizzaPlaces()
    if(typeof pizzaPlaces == 'object'){
      return pizzaPlaces.length
    }else{
      return pizzaPlaces
    }
    
  })
  private _pizzaPlacesLoaded: WritableSignal<boolean> = signal(true)
  pizzaPlacesLoaded = this._pizzaPlacesLoaded.asReadonly()


  constructor(
    private overpassApi: OverpassApiService,
  ) { }

  updateCityAndDistrict(city: string, district: string){
    this.updatePizzaPlaces(city, district)
  }

  private updatePizzaPlaces(city: string, district: string){
    this._pizzaPlacesLoaded.set(false)
    this.overpassApi.getPizzaPlaces(city, district).subscribe((pizzaPlaces)=> {
      this._pizzaPlaces.set(pizzaPlaces)
      this._pizzaPlacesLoaded.set(true)
    })
  }
}


const districtsByCity = new Map([
  ["Mainz", ["Altstadt", "Neustadt", "Oberstadt", "Bretzenheim","Drais","Ebersheim","Finthen","Gonsenheim","Hartenberg-Münchfeld","Hechtsheim","Laubenheim","Lerchenberg","Marienborn","Mombach","Weisenau"]], 
  ["Frankfurt am Main", ["Innenstadt", "Sachsenhausen", "Bockenheim", "Bornheim", "Höchst", "Nordend", "Westend"]],
  ["Wiesbaden", ["Mitte", "Nordost", "Südost", "Biebrich", "Dotzheim", "Schierstein"]],
  ["Darmstadt", ["Mitte", "Bessungen", "Eberstadt", "Arheilgen", "Kranichstein"]],
  ["Offenbach am Main", ["Kaiserlei", "Lauterborn", "Bieber", "Tempelsee", "Bürgel"]],
  ["Hanau", ["Innenstadt", "Kesselstadt", "Großauheim", "Steinheim", "Lamboy"]],
  ["Rüsselsheim am Main", ["Innenstadt", "Bauschheim", "Königstädten", "Dicker Busch"]],
  ["Bad Homburg vor der Höhe", ["Gartenfeld", "Kirdorf", "Dornholzhausen", "Ober-Erlenbach"]],
  ["Oberursel (Taunus)", ["Altstadt", "Bommersheim", "Stierstadt", "Weißkirchen"]],
  ["Eschborn", ["Innenstadt", "Niederhöchstadt"]],
  ["Maintal", ["Bischofsheim", "Dörnigheim", "Hochstadt", "Wachenbuchen"]],
  ["Neu-Isenburg", ["Zentrum", "West", "Gravenbruch"]],
  ["Hattersheim am Main", ["Hattersheim", "Okriftel", "Eddersheim"]],
  ["Kelkheim (Taunus)", ["Mitte", "Horns", "Münster", "Fischbach", "Ruppertshain"]],
  ["Hofheim am Taunus", ["Marxheim", "Langenhain", "Lorsbach", "Wallau", "Wildsachsen"]],
  ["Rodgau", ["Jügesheim", "Weiskirchen", "Hainhausen", "Nieder-Roden", "Dudenhofen"]]
])