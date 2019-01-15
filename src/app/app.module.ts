import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { DeveloperComponent } from './developer/developer.component';
import { PublisherComponent } from './publisher/publisher.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DeveloperEditorComponent } from './developer-editor/developer-editor.component';
import { DevelopersEditorComponent } from './developers-editor/developers-editor.component';
import { PublisherEditorComponent } from './publisher-editor/publisher-editor.component';
import { PublishersEditorComponent } from './publishers-editor/publishers-editor.component';
import { GenresEditorComponent } from './genres-editor/genres-editor.component';
import { GamesEditorComponent } from './games-editor/games-editor.component';
import { GameEditorComponent } from './game-editor/game-editor.component';
import { GenreEditorComponent } from './genre-editor/genre-editor.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    DeveloperComponent,
    PublisherComponent,
    PageNotFoundComponent,
    HomeComponent,
    DeveloperEditorComponent,
    DevelopersEditorComponent,
    PublisherEditorComponent,
    PublishersEditorComponent,
    GenresEditorComponent,
    GamesEditorComponent,
    GameEditorComponent,
    GenreEditorComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
