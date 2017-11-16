import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Secret} from '../app/secret';
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class DataProvider
{
  constructor(public http: HttpClient)
  {
  }

  getEvents()
  {
    return this.http.get(Secret.uri + '/events', {
      headers: new HttpHeaders().set('Authorization',
      'bearer ' + Secret.token)
    })
      .subscribe(
        data =>
        {
          console.log(data);
        }
      )
  }

}
