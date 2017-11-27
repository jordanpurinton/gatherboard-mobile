import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Secret} from '../app/secret';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider
{
  headers = new Headers({'Authorization': 'bearer ' + Secret.token});
  reqOpts = new RequestOptions({headers: this.headers});

  constructor(public http: Http)
  {
  }

  /**
   * Returns events based on params.
   * No params will return a listing of blended events.
   * 100 events will be returned.
   * @param category
   * @returns {Observable<any>}
   */
  getEvents(category?)
  {
    if (category) { // category specified
      return this.http.get(Secret.uri + '/events/' + category, this.reqOpts)
        .map(
          res => res.json(),
          err => console.log(err))
    }
    else { // no category
      return this.http.get(Secret.uri + '/events', this.reqOpts)
        .map(
          res => res.json(),
          err => console.log(err))
    }
  }

  /**
   * Returns event detail of a single event.
   * @param uid
   * @returns {Observable<any>}
   */
  getEventDetail(uid)
  {
    return this.http.get(Secret.uri + '/event/' + uid, this.reqOpts)
      .map(
        res => res.json(),
        err => console.log(err))
  }

  /**
   * Returns all active venues related to this account. Includes venue description and image URIs.
   * NOTE: This is the ONLY way (too my knowledge), that we can receive a venue UID.
   * /events/{uid} doesn't return a venue id.
   * @returns {Observable<any>}
   */
  getVenues()
  {
    return this.http.get(Secret.uri + '/venues', this.reqOpts)
      .map(
        res => res.json(),
        err => console.log(err)
      )
  }

  /**
   Returns listing of feature pages.
   This is a combination of venues and tags as seen on the Feature page.
   Includes feature description and image URIs.
   * @returns {Observable<any>}
   */
  getFeatures()
  {
    return this.http.get(Secret.uri + '/features', this.reqOpts)
      .map(
        res => res.json(),
        err => console.log(err)
      );
  }

  /**
   * FIXME: NOT WORKING
   * TODO: Let Molly know
   * Returns all active tags related to this account.
   * Includes tag description and image URIs.
   * @returns {Observable<any>}
   */
  getTags()
  {
    return this.http.get(Secret.uri + '/tags', this.reqOpts)
      .map(
        res => res.json(),
        err => console.log(err)
      )
  }
}
