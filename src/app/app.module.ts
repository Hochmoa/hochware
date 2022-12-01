import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TaskBarComponent} from "./task-bar/task-bar.component";
import {DesktopComponent} from "./desktop/desktop.component";
import {DesktopIconComponent} from "./desktop-icon/desktop-icon.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {WindowComponent} from "./window/window.component";
import {ContentAboutComponent} from "./window-content/content-about/content-about.component";
import {ContentRacoonComponent} from "./window-content/content-racoon/content-racoon.component";
import {NotifyMessageComponent} from "./notify-message/notify-message.component";
import {ContentCvFolderComponent} from "./window-content/content-cv-folder/content-cv-folder.component";
import {ContentPdfComponent} from "./window-content/content-pdf/content-pdf.component";

import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    TaskBarComponent,
    DesktopComponent,
    DesktopIconComponent,
    WindowComponent,
    ContentAboutComponent,
    ContentRacoonComponent,
    NotifyMessageComponent,
    ContentCvFolderComponent,
    ContentPdfComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
