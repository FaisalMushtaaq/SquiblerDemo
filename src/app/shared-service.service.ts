import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
    word: any;

    constructor(private _http: HttpClient) {
        this.formData = this.myMethodSubject.asObservable();
    }
    getDictonaryData(name?): any {

        if(name){
            this.word = name
            let myResponse = this._http.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + this.word);
            // console.log(myResponse)
            return myResponse;
         }
    }

    formData: Observable<any>;
    private myMethodSubject = new Subject<any>();
    sendFormData(data) {
        this.myMethodSubject.next(data);
    }
}
