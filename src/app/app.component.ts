import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnChanges, OnInit {
  title = 'hochware-dos';

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
    }, 100)
  }

}
