import { Action, createReducer, on } from '@ngrx/store';
import { ITopicState } from './search.models';
import {
  SearchAction,
  SearchActionFailure,
  SearchActionSuccess,
} from './search.actions';

const initialState: ITopicState = {
  keyPhrase: null,
  searchResult: null,
  error: null,
};

const searchReducer = createReducer(
  initialState,
  on(
    SearchAction,
    (state, action): ITopicState => ({
      ...state,
      keyPhrase: action.key,
    })
  ),
  on(
    SearchActionSuccess,
    (state, action): ITopicState => ({
      ...state,
      searchResult: action.result,
    })
  ),
  on(
    SearchActionFailure,
    (state, action): ITopicState => ({
      ...state,
      searchResult: [],
      error: action.error,
    })
  )
);

export function reducer(state: ITopicState, action: Action) {
  return searchReducer(state, action);
}
