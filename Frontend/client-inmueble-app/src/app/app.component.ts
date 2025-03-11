import { Component, OnInit } from '@angular/core';
import { environment } from '@src/environments/environment';
import { test } from '@app/test';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from '@app/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client-inmueble-app';
  showSpinner = false;




  /**
   *
   */
  constructor( private fs: AngularFirestore,
    private ns: NotificationService
  ) {
  }


  ngOnInit
  () {
    // this.fs.collection('test').stateChanges().subscribe(personas => {
    //   console.log(personas.map(p => p.payload.doc.data()));
    // });
  }


  onToggleSpinner() : void {
    this.showSpinner = !this.showSpinner
  }

  onFilesChanged(urls : string | string[]): void {
    console.log(urls);
  }

  onSuccess() : void {
    this.ns.success('Operación exitosa');
  }

  onError() : void {
    this.ns.error('Operación fallida');
  }

}
