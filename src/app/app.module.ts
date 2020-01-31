import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HomeComponent } from './views/home/home.component';
import { GroundComponent } from './views/home/ground/ground.component';
import { GridComponent } from './views/home/ground/grid/grid.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,
  RouterModule.forRoot([
      // { path: 'login', component: LoginComponent },
      { path: 'app-home', component: HomeComponent },
      { path: '**', redirectTo: 'app-home' }
    ])
   ],
  declarations: [ AppComponent, HelloComponent, HomeComponent, GroundComponent, GridComponent ],
  bootstrap:    [ AppComponent ],
  exports: [
    RouterModule,
  ],
})
export class AppModule { }
