import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DraftSendComponent } from './draft-send/draft-send.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'sent', component: DraftSendComponent,
  
 }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, FlexLayoutModule,
    ReactiveFormsModule, QuillModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, HelloComponent, DraftSendComponent ],
  bootstrap:    [ AppComponent ],
  exports:[RouterModule]
})
export class AppModule { }
