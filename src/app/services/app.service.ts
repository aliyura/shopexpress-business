import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '../enum/store.enum';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  endPoint = environment.endPoint

  constructor(
    private store:StorageService
  ) {}

  get httpAutherizedHeader(){
     var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Authorization': "Bearer "+this.store.get(Store.TOKEN),
      })
    }
    return httpOptions;
  }
  get httpAutherizedMediaHeader(){
    var httpOptions = {
     headers: new HttpHeaders({
       'Authorization': "Bearer "+this.store.get(Store.TOKEN),
     })
   }
   return httpOptions;
 }

  get httpHeader(){
    var httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': "application/json",
     })
   }
   return httpOptions;
 }

}
