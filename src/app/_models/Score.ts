export class Score {
  user: string
  score: number
  createdAt: string
  constructor(
    user: string,
    score: number,
    createdAt: string
  ) {
    this.user = user;
    this.score = score;
    this.createdAt = createdAt;


  }
}
