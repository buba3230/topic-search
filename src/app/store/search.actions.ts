import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "./action-types";
import { IActionError, IKeyPhrase, ISearchResult } from "./search.models";
import { HttpErrorResponse } from "@angular/common/http";

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
