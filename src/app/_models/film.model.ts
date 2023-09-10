export interface Film {
    _id: string;
    name: string;
    imgUrl: string;
    voteCount: number;
    releaseDate: Date;
    screeningDate: Date;
    duration: number;
    language: string;
    filmDetail: string;
  }