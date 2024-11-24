import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "./action-types";
import { IActionError, IKeyPhrase, ISearchResult } from "./search.models";

export const LoadAction = createAction(
    ActionTypes.LOAD
)
export const LoadActionSuccess = createAction(
    ActionTypes.LOAD_SUCCESS,
    props<ISearchResult>()
)
export const LoadActionFailure = createAction(
    ActionTypes.LOAD_FAILURE,
    props<IActionError>()
)

export const SearchAction = createAction(
    ActionTypes.SEARCH,
    props<IKeyPhrase>()
)
export const SearchActionSuccess = createAction(
    ActionTypes.SEARCH_SUCCESS,
    props<ISearchResult>()
)
export const SearchActionFailure = createAction(
    ActionTypes.SEARCH_FAILURE,
    props<IActionError>()
)
