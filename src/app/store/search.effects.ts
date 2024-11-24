import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchService } from './search.service';
import {
  LoadAction,
  LoadActionFailure,
  LoadActionSuccess,
  SearchAction,
  SearchActionFailure,
  SearchActionSuccess,
} from './search.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ITopic } from './search.models';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class SearchEffects {
  sload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAction),
      switchMap((action) => {
        return this.searchService.getTopics$().pipe(
          map((topics: ITopic[]) => {
            return LoadActionSuccess({ result: topics });
          })
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return of(LoadActionFailure({ error }));
      })
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchAction),
      switchMap((action) => {
        return this.searchService.searchTopics(action.key).pipe(
          map((topics: ITopic[]) => {
            return SearchActionSuccess({ result: topics });
          })
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return of(SearchActionFailure({ error }));
      })
    )
  );
  constructor(
    private searchService: SearchService,
    private actions$: Actions
  ) {}
}
