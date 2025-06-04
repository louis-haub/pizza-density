import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { OverpassApiService, PizzaPlace } from './overpass-api-service';

@Injectable({
  providedIn: 'root'
})
export class OverpassService {

  private _numberOfInhabitants: WritableSignal<number|undefined> = signal(NaN)
  numberOfInhabitants = this._numberOfInhabitants.asReadonly()
  

  private _numberOfInhabitantsLoaded: WritableSignal<boolean> = signal(true)
  numberOfInhabitantsLoaded = this._numberOfInhabitantsLoaded.asReadonly()


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
    this.updateNumberOfInhabitants(city, district)
  }

  private updatePizzaPlaces(city: string, district: string){
    this._pizzaPlacesLoaded.set(false)
    this.overpassApi.getPizzaPlaces(city, district).subscribe((pizzaPlaces)=> {
      this._pizzaPlaces.set(pizzaPlaces)
      this._pizzaPlacesLoaded.set(true)
    })
  }
    private updateNumberOfInhabitants(city: string, district: string){
    this._numberOfInhabitantsLoaded.set(false)
    this.overpassApi.getNumberOfInhabitants(city, district).subscribe((numberOfInhabitants)=> {
      this._numberOfInhabitants.set(numberOfInhabitants)
    this._numberOfInhabitantsLoaded.set(true)
    })
  }
}
