import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from "rxjs";
import {Timer} from "../_models/Timer";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  // timerSet: boolean = false;
  // timeLeft: number = 5;
  // subscribeTimer: any = this.timeLeft;

  timerInstance = new Timer()
  timerSubscription: Subscription | undefined

  private behaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  observable: Observable<boolean> = this.behaviourSubject.asObservable()

  timerEnd(value: boolean) {
    this.behaviourSubject.next(value)
  }

  resetTimer() {
    this.timerSubscription?.unsubscribe()
    this.timerInstance = new Timer()
  }

  getTimeLeft(){
    return this.timerInstance.timeLeft;
  }

  getSubscribeTimer(){
    return this.timerInstance.subscribeTimer;
  }

  getTimerSet(){
    return this.timerInstance.timerSet
  }

  observableTimer() {
    this.timerInstance.timerSet = true;
    const timerSubscription = timer(1000, 1000);
    this.timerSubscription = timerSubscription.subscribe(val => {
      this.timerInstance.subscribeTimer = this.timerInstance.timeLeft - val;
      if (this.timerInstance.subscribeTimer <= 0) {
        this.resetTimer()
        this.timerEnd(true)
      }
    });
  }

}
