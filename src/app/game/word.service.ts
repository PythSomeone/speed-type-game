import {Injectable} from '@angular/core';
import words from '../../assets/words.json';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  wordList = words;

  getWords() {
    let selectedWords: string[] = []
    for (let i = 0; i < 50; i++) {
      selectedWords.push(<string>this.wordList[Math.floor(Math.random() * this.wordList.length)])
    }
    return selectedWords
  }
}
