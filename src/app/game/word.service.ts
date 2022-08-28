import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  wordList = require('word-list-json');
  wordsArray = Array.from(this.wordList)

  getWords(){
    let selectedWords:string[] = []
    for(let i = 0;i<50;i++){
      selectedWords.push(<string>this.wordsArray[Math.floor(Math.random() * this.wordsArray.length)])
    }
    return selectedWords
  }
}
