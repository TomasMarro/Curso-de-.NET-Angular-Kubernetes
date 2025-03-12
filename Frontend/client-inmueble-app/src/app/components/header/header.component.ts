import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserResponse } from '@app/store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menuToggle = new EventEmitter<void>();
  @Input() user ! : UserResponse | null;
  @Input() isAuthorized! : boolean | null;
  @Output() logOut = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onMenuToggleDispatch(): void {
    // Dispatch an action to toggle
    // the menu in the store
    this.menuToggle.emit();
  }

  cerrarSession(): void {
    this.logOut.emit();
  }

}
