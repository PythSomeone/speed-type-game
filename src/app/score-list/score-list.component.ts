
import { Component, OnInit } from '@angular/core';
import {ScoreService} from "../services/score.service";
import {Score} from "../_models/Score";
import {ScoreList} from "../_models/ScoreList";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  constructor(
    private scoreService:ScoreService
  ) { }

  loading: boolean = false;
  scoreList: ScoreList = new ScoreList([]);

  ngOnInit(): void {
    this.loading = true;
    this.scoreService.getScore().subscribe(next => {
      this.scoreList = next;
      this.loading = false;
    });
  }

}
