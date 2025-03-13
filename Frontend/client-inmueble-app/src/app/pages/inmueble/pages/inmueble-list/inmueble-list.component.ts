import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import { InmuebleResponse } from '../../store/save';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-inmueble-list',
  templateUrl: './inmueble-list.component.html',
  styleUrls: ['./inmueble-list.component.scss']
})
export class InmuebleListComponent implements OnInit {

  inmuebles$!: Observable<InmuebleResponse[] | null>;
  loading$!: Observable<boolean | null>;

  fotoDefault: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYx-7yPPwblpi7Rwz-j9KowfAC0f-IX-NX5w&s";

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new fromList.Read());
    this.loading$ = this.store.pipe(select(fromList.getLoading));
    this.inmuebles$ = this.store.pipe(select(fromList.getInmuebles));
  }


}
