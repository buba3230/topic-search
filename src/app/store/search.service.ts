import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ITopic } from './search.models';
import { HttpClient } from '@angular/common/http';

interface ISearchedTopics extends ITopic {
    mainMathes: number;
}

interface IDummyBlog {
    id: number;
    title: string;
    image_url: string;
    summary: string;
    published_at: string;
}

interface IBlog {
    results: IDummyBlog[];
}

@Injectable({ providedIn: 'root' })
export class SearchService {

    private url = 'https://api.spaceflightnewsapi.net/v4/blogs/';
    private topics$: Observable<ITopic[]>;
    constructor(public http: HttpClient) { }

    getTopics$(): Observable<ITopic[]> {
        this.topics$ = this.http.get<any>(this.url)
          .pipe(
            map((data: IBlog) => data.results.map(d => ({
                id: d.id,
                picture: d.image_url,
                postingDate: new Date(d.published_at),
                title: d.title,
                description: d.summary
            }))),
          );
        return this.topics$;
      }

    private compare(words: string[], keyWords: string[]): number {
        return words.filter(word => keyWords.includes(word)).length
    }

    private getClearSortedTopics(dirtyArr: ISearchedTopics[]): ITopic[] {
        return dirtyArr.filter(d => d.mainMathes > 0).sort((a, b) => b.mainMathes - a.mainMathes).map(dt => ({
            id: dt.id,
            picture: dt.picture,
            postingDate: dt.postingDate,
            title: dt.title,
            description: dt.description
        }))
    }

    searchTopics(key: string): Observable<ITopic[]> {
        return this.topics$.pipe(
            map((allTopics: ITopic[]) => {
                if (key) {
                    const words = key.trim().split(/\s+/);
                    const mappedTopics = allTopics.map(topic => {
                        //breake title on words
                        const topicWords = topic.title.trim().split(/\s+/);
                        //breake description on words
                        const descriptionWords = topic.description.trim().split(/\s+/);
                        //calculate matches in title
                        const title_mathes = this.compare(topicWords, words);
                        //calculate matches in description
                        const description_mathes = this.compare(descriptionWords, words);
                        //chose where we got more mathces for further sorting
                        const mainMathes = title_mathes >= description_mathes ? title_mathes : description_mathes;
                        const rez: ISearchedTopics = {
                            ...topic,
                            mainMathes
                        };
                        return rez
                    });
                    return this.getClearSortedTopics(mappedTopics); 
                }
                return allTopics;
            }
            )
        )
    }
}
