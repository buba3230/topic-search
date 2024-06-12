import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ITopic, topics } from './search.models';

@Injectable({ providedIn: 'root' })
export class SearchService {
    private topics$: Observable<ITopic[]> = of(topics);

    searchTopics(key: string): Observable<ITopic[]> {
        return this.topics$.pipe(
            map((allTopics: ITopic[]) => allTopics.filter(topic => topic.title.includes(key)))
        )
    }
}
