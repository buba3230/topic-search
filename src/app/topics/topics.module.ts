import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './topics.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/search.reducers';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from '../store/search.effects';
import { SearchService } from '../store/search.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TopicCardComponent } from './topic-card/topic-card.component';
import { MatButtonModule } from '@angular/material/button';
import { TruncatePipe } from './topic-card/trim-description.pipe';
import { CustomDatePipe } from './topic-card/customDate.pipe';
import { HighLightSearchTermTextPipe } from './topic-card/highlight.pipe';
import { TopicInfoComponent } from './topic-info/topic-info.component';
import { TopicInfoResolverService } from './topic-info/topic-info-resolver.service';

const routes: Routes = [
  { path: '', component: TopicsComponent, children: [
    {
      path: ':id',
      component: TopicInfoComponent,
      resolve: {
        topic: TopicInfoResolverService
      }
    }
  ] }];

@NgModule({
  declarations: [TopicsComponent, TopicCardComponent, TruncatePipe, CustomDatePipe, HighLightSearchTermTextPipe,
    TopicInfoComponent
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('SEARCH', reducer),
    EffectsModule.forFeature([SearchEffects]),
    ReactiveFormsModule
  ],
  exports: [
    TopicsComponent,
    HttpClientModule
  ],
  providers: [SearchService, TruncatePipe, CustomDatePipe, HighLightSearchTermTextPipe, TopicInfoResolverService]
})
export class TopicsModule {}
