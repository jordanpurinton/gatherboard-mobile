import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Secret} from '../app/secret';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  headers = new Headers({'Authorization': 'bearer ' + Secret.token});
  reqOpts = new RequestOptions({headers: this.headers});
  constructor(public http: Http) {
  }

  /**
   * Returns events based on params.
   * No params will return a listing of blended events.
   * 100 events will be returned.
   * @param category
   * @returns {Subscription}
   */
  getEvents(category?) {
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
   * Returns event detail of a single event based on uid.
   * @param uid
   */
  getEventDetail(uid) {
    return this.http.get(Secret.uri + '/event/' + uid, this.reqOpts)
      .map(
        res => res.json(),
        err => console.log(err))
  }

}
