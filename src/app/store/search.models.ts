import { HttpErrorResponse } from '@angular/common/http';

export interface IKeyPhrase {
  key: string;
}

export interface ISearchResult {
  result: ITopic[];
}

export interface IActionError {
  error: HttpErrorResponse;
}

export interface ITopic {
  id: number;
  picture: string;
  postingDate: Date;
  title: string;
  description: string;
}

export interface ITopicState {
  keyPhrase: string | null;
  searchResult: ITopic[] | null;
  error: HttpErrorResponse | null;
}
