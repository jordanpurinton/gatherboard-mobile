import {Injectable} from '@angular/core';
import {Secret} from '../app/secret';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class DataProvider
{
  constructor(public http: HttpClient)
  {
  }

  /**
   * Returns events based on params.
   * No params will return a listing of blended events.
   * 100 events will be returned.
   * @param category
   * @returns {Observable<any>}
   */
  getEvents(category?): Observable<any>
  {
    console.log(Secret.token);
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    if (category) { // category specified
      return this.http.get(Secret.uri + '/events/' + category, {headers})
        .map(
          res => res,
          err => console.log(err))
    }
    else { // no category
      return this.http.get(Secret.uri + '/events', {headers})
        .map(
          res => res,
          err => console.log(err))
    }
  }

  /**
   * Returns events related to a single venue.
   * @param uid
   * @returns {Observable<any>}
   */
  getEventsByVenue(uid): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    return this.http.get(Secret.uri + '/venue/' + uid, {headers})
      .map(
        res => res,
        err => console.log(err)
      )
  }

  /**
   * Returns events related to a single tag.
   * @param uid
   * @returns {Observable<any>}
   */
  getEventsByTag(uid): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    return this.http.get(Secret.uri + '/tag/' + uid, {headers})
      .map(
        res => res,
        err => console.log(err)
      )
  }

  /**
   * Returns event detail of a single event.
   * @param uid
   * @returns {Observable<any>}
   */
  getEventDetail(uid): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    return this.http.get(Secret.uri + '/event/' + uid, {headers})
      .map(
        res => res,
        err => console.log(err))
  }

  /**
   * Returns listing of current active categories.
   * @returns {Observable<any>}
   */
  getCategories(): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    return this.http.get(Secret.uri + '/categories', {headers})
      .map(
        res => res,
        err => console.log(err)
      )

  }

  /**
  * Returns listing of subcategories for given category
  * @param uid
  * @returns {Observable<any>}
  */
  getSubcategories(uid): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    return this.http.get(Secret.uri + '/subcategories/' + uid, {headers})
      .map(
        res => res,
        err => console.log(err)
      )
  }

  /**
   * Returns all active venues related to this account. Includes venue description and image URIs.
   * NOTE: This is the ONLY way (to my knowledge), that we can receive a venue UID.
   * /events/{uid} doesn't return a venue id.
   * @returns {Observable<any>}
   */
  getVenues(): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    return this.http.get(Secret.uri + '/venues', {headers})
      .map(
        res => res,
        err => console.log(err)
      )
  }

  /**
   Returns listing of feature pages.
   This is a combination of venues and tags as seen on the Feature page.
   Includes feature description and image URIs.
   * @returns {Observable<any>}
   */
  getFeatures(): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    return this.http.get(Secret.uri + '/features', {headers})
      .map(
        res => res,
        err => console.log(err)
      );
  }

  /**
   * Returns all active tags related to this account.
   * Includes tag description and image URIs.
   * @returns {Observable<any>}
   */
  getTags(): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'bearer ' + Secret.token);
    return this.http.get(Secret.uri + '/tags', {headers})
      .map(
        res => res,
        err => console.log(err)
      )
  }
}
