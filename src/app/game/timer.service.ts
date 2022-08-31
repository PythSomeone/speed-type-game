import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timerSet: boolean = false;
  timeLeft: number = 5;
  subscribeTimer: any;
  timerSubscription: Subscription | undefined

  private behaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  observable: Observable<boolean> = this.behaviourSubject.asObservable()

  timerEnd(value: boolean) {
    this.behaviourSubject.next(value)
  }

  resetTimer() {
    this.timerSubscription?.unsubscribe()
    this.timerSet = false
    this.subscribeTimer = null
  }

  observableTimer() {
    this.timerSet = true;
    const timerSubscription = timer(1000, 1000);
    this.timerSubscription = timerSubscription.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if (this.subscribeTimer <= 0) {
        this.resetTimer()
        this.timerEnd(true)
      }
    });
  }

}
