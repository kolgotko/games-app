import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { DeveloperComponent } from './developer/developer.component';
import { PublisherComponent } from './publisher/publisher.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DevelopersEditorComponent } from './developers-editor/developers-editor.component';
import { DeveloperEditorComponent } from './developer-editor/developer-editor.component';
import { PublisherEditorComponent } from './publisher-editor/publisher-editor.component';
import { PublishersEditorComponent } from './publishers-editor/publishers-editor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games/:id', component: GameComponent },
  { path: 'developers/:id', component: DeveloperComponent },
  { path: 'publishers/:id', component: PublisherComponent },
  { path: 'editor/developers', component: DevelopersEditorComponent },
  { path: 'editor/developers/:id', component: DeveloperEditorComponent },
  { path: 'editor/publishers', component: PublishersEditorComponent },
  { path: 'editor/publishers/:id', component: PublisherEditorComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
