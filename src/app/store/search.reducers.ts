import { Action, createReducer, on } from '@ngrx/store';
import { ITopicState } from './search.models';
import {
  LoadAction,
  LoadActionFailure,
  LoadActionSuccess,
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
    LoadAction,
    (state): ITopicState => ({
      ...state
    })
  ),
  on(
    SearchAction,
    (state, action): ITopicState => ({
      ...state,
      keyPhrase: action.key,
    })
  ),
  on(
    LoadActionSuccess,
    SearchActionSuccess,
    (state, action): ITopicState => ({
      ...state,
      searchResult: action.result,
    })
  ),
  on(
    LoadActionFailure,
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
