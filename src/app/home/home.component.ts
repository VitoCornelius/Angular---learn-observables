import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs'; //if we want to create a new observable 

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
        count++;
      }, 1000)
    });

    this.firstObsSubscription = customObservable.subscribe(data => {
      console.log(data);
    })

  }

  ngOnDestroy(){
    this.firstObsSubscription.unsubscribe(); //if we go away from the component, the observable is gone 
  }

}
