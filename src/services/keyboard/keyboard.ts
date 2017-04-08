import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import '../../app/rxjs'

@Injectable()
export class KeyboardService {
    constructor (private http:Http) {};

    getKeys () {
        return this.http.get('data/keys.json').map(this.extractData);
    }

    extractData (res:Response) {
        let body = res.json();
        return body || {};
    }
}
