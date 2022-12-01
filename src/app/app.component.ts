import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {IconType, NotifyMessageComponent} from "./notify-message/notify-message.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnChanges, OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    if (!localStorage["acceptedCookies"]) {
      this.cookieNotify.open("This website stores cookies on your browser. By pressing 'OK' you accept cookies.", IconType.Warning, true, () => {
        localStorage["acceptedCookies"] = true;
      });
    }
  }

  title = 'hochware-dos';


  @ViewChild('cookieNotify') cookieNotify!: NotifyMessageComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.removeDragListeners();
  }

  removeDragListeners(): void {
    let l = document.querySelectorAll("img");

    l.forEach(e => e.ondragstart = () => {
      return false
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.removeDragListeners();
    }, 100);

  }

}
