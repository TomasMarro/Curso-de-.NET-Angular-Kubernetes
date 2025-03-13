import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';

@Component({
  selector: 'app-inmueble-crear',
  templateUrl: './inmueble-crear.component.html',
  styleUrls: ['./inmueble-crear.component.scss']
})
export class InmuebleCrearComponent implements OnInit {

  loading$!: Observable<boolean | null>;
  fotoLoaded! : string;
  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
  }


  registrarInmueble(form : NgForm) : void{
    if (form.valid) {
      this.loading$ = this.store.pipe( select(fromList.getLoading));

      const InmuebleCreateRequest: fromList.InmuebleCreateRequest = {
        nombre: form.value.nombre,
        urlImagen: this.fotoLoaded,
        precio: form.value.precio,
        direccion: form.value.direccion,
      }

      this.store.dispatch(new fromList.Create(InmuebleCreateRequest));
    }

    console.log(form.value);
  }

  onFilesChanged(url : any) : void{
    this.fotoLoaded = url;
  }
}
