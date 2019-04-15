import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Observable} from 'rxjs';


@Injectable()

export class FileService {
  

    constructor(private _http:HttpClient){}

    downloadFile(file:String, tipo: String){
        var url='http://ec2-3-16-225-181.us-east-2.compute.amazonaws.com:3004';
        var urlLocal='http://localhost:3004';
        var body = {filename:file, tipopdf: tipo };
        console.log({"body":body})
        return this._http.post(urlLocal + '/file/download',body,{
            responseType : 'json',
            headers:new HttpHeaders().append('Content-Type','application/json')
            
        });
    }
}