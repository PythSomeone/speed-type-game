import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private behaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  observable: Observable<boolean> = this.behaviourSubject.asObservable()

  setState(value:boolean) {
    this.behaviourSubject.next(value)
  }
}
