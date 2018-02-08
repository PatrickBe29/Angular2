import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class ServerService {
    constructor(private http: Http){
        
    }
    
    // POST
    // storeData(data: any[]){
    //     return this.http.post("https://didesigner-ee0ca.firebaseio.com/data.json", data);
    // }
    
    // PUT
    storeData(data: any[]){
        return this.http.put("https://didesigner-ee0ca.firebaseio.com/data.json", data);
    }
    
    // GET
    getData(){
        return this.http.get("https://didesigner-ee0ca.firebaseio.com/data.json").map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            );
    }
}