import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Secret} from '../app/secret';
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class DataProvider {
  constructor(public http: HttpClient) {
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
      return this.http.get(Secret.uri + '/events/' + category,
        {
        headers: new HttpHeaders().set('Authorization',
          'bearer ' + Secret.token)
      })
        .map((res: Response) => res.json())
    }
    else { // no category
      return this.http.get(Secret.uri + '/events',
        {
        headers: new HttpHeaders().set('Authorization',
          'bearer ' + Secret.token)
      })
        .map((res: Response) => res.json())
    }
  }

  /**
   * Returns event detail of a single event based on uid.
   * @param uid
   */
  getEventDetail(uid) {
    return this.http.get(Secret.uri + '/events/' + uid,
      {
      headers: new HttpHeaders().set('Authorization',
        'bearer ' + Secret.token)
    })
      .map((res: Response) => res.json())
  }

}
