import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn : 'root'}) // a shorter and easier way, do not have to provide this in the app module
export class UserService {
    activeatedEmitter = new Subject<boolean>(); //which data , similar to the EventEmitter 
}