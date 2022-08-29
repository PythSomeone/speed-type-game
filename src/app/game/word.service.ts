import {Injectable} from '@angular/core';
import words from '../../assets/words.json';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  wordList = words;
  wordsArray = Array.from(this.wordList)

  getWords() {
    console.log(this.wordList)
    let selectedWords: string[] = []
    for (let i = 0; i < 50; i++) {
      selectedWords.push(<string>this.wordsArray[Math.floor(Math.random() * this.wordsArray.length)])
    }
    return selectedWords
  }
}
