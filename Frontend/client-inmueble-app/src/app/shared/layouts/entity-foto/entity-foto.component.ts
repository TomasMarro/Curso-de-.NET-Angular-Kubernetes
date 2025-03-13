import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-entity-foto',
  templateUrl: './entity-foto.component.html',
  styleUrls: ['./entity-foto.component.scss']
})
export class EntityFotoComponent implements OnInit {

  @Input() fotoUrl! : string;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }


  get safeFotoUrl(): SafeStyle| null {
    return this.fotoUrl ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.fotoUrl})`) as string : null;
  }

}
