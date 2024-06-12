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
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: TopicsComponent }];

@NgModule({
  declarations: [TopicsComponent],
  imports: [
    MatInputModule,
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
  providers: [SearchService]
})
export class TopicsModule {}
