import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {WordForm} from "../types/Word";
import {WordService} from "./word.service";
import {NgForm} from "@angular/forms";
import {Subscription, timer} from "rxjs";
import {formatNumber} from "@angular/common";
import {GameStateService} from "./game-state.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GameComponent implements OnInit {
  form: WordForm = {
    word: '',
  }
  words: string[] = [];
  currentTypedWord: string = '';
  currentWord: string = '';
  currentWordIndex = 0;
  points = 0;
  wordsPerMinute = 0
  score: string = ''

  subscription: Subscription | undefined

  timerSet: boolean = false;
  timeLeft: number = 10;
  subscribeTimer: any;

  stateSubscription : Subscription | undefined



  constructor(
    private wordService: WordService,
    private gameStateService : GameStateService
  ) {
  }

  ngOnInit(): void {

    this.stateSubscription = this.gameStateService.observable.subscribe(state=> {
      if(state){
        this.words = this.wordService.getWords()
      }
    })

    this.words = this.wordService.getWords()

    this.currentWord = this.words[this.currentWordIndex];


  }

  stopTimer() {
    this.subscription?.unsubscribe()
    this.timerSet = false
    this.subscribeTimer = null
    this.points = 0
    this.wordsPerMinute = 0
    this.currentTypedWord = ''
    this.currentWordIndex = 0
    this.score = ''
  }

  observableTimer() {
    this.timerSet = true;
    const timerSubscription = timer(1000, 1000);
    this.subscription = timerSubscription.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if (this.subscribeTimer <= 0) {
        prompt("You have scored : " + this.wordsPerMinute.toString())
        this.stopTimer()
        this.gameStateService.setState(true)
      }
    });
  }

  onKey(event: any, myForm: NgForm) { // without type info
    if (!this.timerSet) {
      this.observableTimer()
    }
    let typedWord = event.target.value

    let element = document.getElementById(this.currentWordIndex.toString())





    if (typedWord[typedWord.length - 1].includes(' ', '\t', '\n')) {




      if (typedWord.slice(0, -1).toString() == this.currentWord) {
        element!.className = "green-text"
        this.points++;
      } else {
        element!.className = "red-text"
      }

      this.currentTypedWord = ''
      this.currentWord = this.words[++this.currentWordIndex]
      this.wordsPerMinute = this.points / ((this.timeLeft - this.subscribeTimer) / 60)
      this.score = formatNumber(this.wordsPerMinute, 'en-US','1.0-1' )

      element = document.getElementById(this.currentWordIndex.toString())
      if(!(element!.className === "current-word")){
        element!.className = "current-word"
      }
    }


  }


}
