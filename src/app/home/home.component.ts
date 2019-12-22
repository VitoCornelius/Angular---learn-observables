import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs'; //if we want to create a new observable 
import { map, filter } from 'rxjs/operators'; //RX JS OPERATORS 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription : Subscription; //in order to stop the memory leaks 

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => { //interval gives us integers every time
    //   console.log(count);
    // })
    const customObservable = Observable.create((observer) => { 
      let count = 0;
      setInterval(()=> {
        observer.next(count); //we let our observer know about the data 

        if (count === 2) {
          observer.complete(); //ending the observable 
        }

        if (count > 3) { //if an observable throws an error, it is cancelled
          observer.error(new Error('Count is greater than 3!'))
        }
        
        count++;
      }, 1000)
    });

    customObservable.pipe(map((data: number) => {
      return 'Round ' + (data + 1);
    })); // OPERATOR

    this.firstObsSubscription = customObservable.pipe( filter((data : number) => {
      return data > 0; //if it will be dropped ? 
    }),
      map((data: number) => {
      return 'Round' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => { //we are handling the error 
      console.log(error);
      alert(error.message);
    }, () => {
      alert("Completed"); //this does not execute if there is an error 
    }
    )

  }

  ngOnDestroy(){
    this.firstObsSubscription.unsubscribe(); //if we go away from the component, the observable is gone 
  }

}
