import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'topics',
  pathMatch: 'full'
},
{
  path: 'topics',
  loadChildren: () => import('./topics/topics.module').then(m => m.TopicsModule), 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
