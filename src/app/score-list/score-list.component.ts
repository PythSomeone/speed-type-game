
import { Component, OnInit } from '@angular/core';
import {ScoreService} from "../services/score.service";
import {Score} from "../_models/Score";
import {ScoreList} from "../_models/ScoreList";

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  constructor(
    private scoreService:ScoreService
  ) { }

  scoreList: ScoreList = new ScoreList([new Score('test',10,'time')]);

  ngOnInit(): void {
    this.scoreService.getScore().subscribe(next => {
      this.scoreList = next
    });
  }

}
