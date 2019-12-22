import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService : UserService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; //angular provides us the unsubscribe functionality 
        }
      );
  }

  onActivate() {

    //DO NOT USE THE EVENT EMITTER -> USE THE SUBJECT -> OPERATORS, FASTER , CAN BE USED AS OBSERVABLES

    this.userService.activeatedEmitter.next(true); //next can be emitted from the code. In the observable it is called inside the observable 
    //if this needs to be actively triggered by us 
  }

}
