import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITopicState } from './search.models';

export const searchFeatureSelector =
  createFeatureSelector<ITopicState>('SEARCH');
  
export const selectTopicsSelector = createSelector(
  searchFeatureSelector,
  (searchState: ITopicState) => searchState.searchResult
);

export const selectErrorSelector = createSelector(
  searchFeatureSelector,
  (searchState: ITopicState) => searchState.error
);
