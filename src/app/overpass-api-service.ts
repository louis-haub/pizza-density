import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverpassApiService {
  private http: HttpClient= inject(HttpClient)

  constructor(
    
  ) {}

  getPizzaPlaces(city: string, district: string): Observable<PizzaPlace[]|undefined>{
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    const data = `
    [out:json];
    area[name="${city}"]->.city;
    area[name="${district}"]->.district;

    node
      ["cuisine"~"pizza"]
      (area.district)
      (area.city);
      out center;
    `

    const url = "https://overpass-api.de/api/interpreter?data=[out:json]"
    const response = this.http.post<OverpassQueryResponse>(url, data, {headers: headers}).pipe(
      map((res) => res.elements),
      map((elements) => {
        return elements.map(element => {
          return {
            name: element.tags.name,
            cuisine: element.tags.cuisine?.split(";")
                .map((city) => {
                  return city.charAt(0).toUpperCase() + city.slice(1)
                })
                .join(", "),
            id: element.id,
            lat: element.lat,
            lon: element.lon,
            overpassElement: element
          } as PizzaPlace
        })
      }),
      catchError(error => {
        return of(undefined)
      })
    )
    response.subscribe(console.log)
    return response
  }
}

export type OverpassQueryResponse = {
  elements: OverpassElement[],
  version: number,
   generator: string
}
export type OverpassElement = {
  id: number,
  lat: number,
  lon: number,
  type: "node",
  tags: OverpassTags
}

export type OverpassTags = {
  amenity?: string,
cuisine?: string,
indoor_seating?: string,
name?: string,
note?: string,
opening_hours?: string,
outdoor_seating?: "yes"|"no",
wheelchair: string
}

export type PizzaPlace = {
  name?:string,
  cuisine?: string,
  id?: number,
  lat?: number,
  lon?: number,
  overpassElement: OverpassElement
}