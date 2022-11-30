import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TaskBarComponent} from "./task-bar/task-bar.component";
import {DesktopComponent} from "./desktop/desktop.component";
import {DesktopIconComponent} from "./desktop-icon/desktop-icon.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {WindowComponent} from "./window/window.component";
import {ContentAboutComponent} from "./window-content/content-about/content-about.component";

@NgModule({
  declarations: [
    AppComponent,
    TaskBarComponent,
    DesktopComponent,
    DesktopIconComponent,
    WindowComponent,
    ContentAboutComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
