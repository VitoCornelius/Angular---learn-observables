import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscrptoinBySubject : Subscription;
  userActivated : boolean = false;

  constructor(private userService : UserService){}

  ngOnInit(){
    this.subscrptoinBySubject = this.userService.activeatedEmitter.subscribe(
      (value : boolean) => {
        this.userActivated = value;
      }
    )
  }

  ngOnDestroy(){
    this.subscrptoinBySubject.unsubscribe();
  }

}
