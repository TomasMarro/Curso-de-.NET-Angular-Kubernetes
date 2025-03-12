import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @Input() isAuthorized! : boolean | null;
  @Output() logOut = new EventEmitter<void>();
  @Output() menuToggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }


  closeMenu(): void
  {
    this.menuToggle.emit();
  }

  cerrarSession(): void{
    this.logOut.emit();
  }
}
