import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WordService} from "./word.service";
import {Subscription} from "rxjs";
import {formatNumber} from "@angular/common";
import {GameStateService} from "./game-state.service";
import {ModalService} from "../_modal";
import {TimerService} from "./timer.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('current') current: ElementRef | undefined;


  words: string[] = [];
  currentTypedWord: string = '';
  currentWord: string = '';
  currentWordIndex = 0;
  points = 0;
  score: string = '0'
  lastScore: string = '0'

  timerStateSubscription: Subscription | undefined
  stateSubscription: Subscription | undefined

  constructor(
    public wordService: WordService,
    public gameStateService: GameStateService,
    public modalService: ModalService,
    public timerService: TimerService
  ) {
    this.current?.nativeElement.focus()
  }

  ngOnInit(): void {

    this.loadWords()


    this.stateSubscription = this.gameStateService.observable.subscribe(state => {
      if (state) {
        this.loadWords()

      }
    })
    this.timerStateSubscription = this.timerService.observable.subscribe(state => {
      if (state) {
        this.current?.nativeElement.blur()
        this.lastScore = this.score
        this.openModal('custom-modal-2')

        this.loadWords()
        this.points = 0
        this.score = '0'
      }
    })


  }


  loadWords() {
    this.words = this.wordService.getWords();
    Array.from(document.querySelectorAll('.green-text,.red-text,.current-word')).forEach((el) => el.classList.remove('green-text', 'red-text', 'current-word'));
    this.currentTypedWord = '';
    this.currentWordIndex = 0;
    this.currentWord = this.words[this.currentWordIndex];
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.current?.nativeElement.focus()
  }

  onKey(event: any = " ") {
    let typedWord = event.target.value

    if (!(typedWord[0] === undefined)) {

      if (!this.timerService.getTimerSet() && !typedWord[0].includes('\n')) {
        this.timerService.observableTimer()
      }

      let element = document.getElementById(this.currentWordIndex.toString())
      if (typedWord[typedWord.length - 1].includes(' ', '\t')) {
        if (typedWord.slice(0, -1).toString() == this.currentWord) {
          element!.className = "green-text"
          this.points++;
        } else {
          element!.className = "red-text"
        }

        this.score = this.calculateWordsPerMinute();
        this.currentTypedWord = ''

        if (this.words.length === this.currentWordIndex + 1) {
          this.gameStateService.setState(true)
        }else {
          this.currentWord = this.words[++this.currentWordIndex]

          element = document.getElementById(this.currentWordIndex.toString())
          if (!(element!.className === "current-word")) {
            element!.className = "current-word"
          }
        }


      }


    }


  }
  private calculateWordsPerMinute(){
    let wordsPerMinute = this.points / ((this.timerService.getTimeLeft() - this.timerService.getSubscribeTimer()) / 60)
    return formatNumber(wordsPerMinute, 'en-US', '1.0-1')
  }
}
