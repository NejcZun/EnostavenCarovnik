import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Interface Izobrazba
 * naziv:                        string           (predstavlja kratek naziv)
 * dolgi_naziv:                  string           (predstavlja dolgi naziv)
 */
export interface Izobrazba {
  naziv: string,
  dolgi_naziv: string
}

/**
 * Interface User
 * ime:                          string             (ime uporabnika)
 * priimek:                      string             (priimek uporabnika)
 * telefon:                      number(regexed)    (telefonska številka uporabnika)
 * naslov:                       string             (naslov uporabnika)
 * izobrazba:                    Izobrazba          (Interface Izobrazba)
 */
export interface User{
  ime: string,
  priimek: string,
  telefon: number,
  naslov: string,
  izobrazba: Izobrazba
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  public stevilo_vseh_korakov = 3;
  public trenutni_korak = 1;

  public klik_za_naslednji_korak = false;

  public uporabnik: User;

  public uporabnikForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.uporabnik = {ime: "", priimek: "", naslov:"", telefon: 0, izobrazba: {naziv: "", dolgi_naziv: ""}};
  }

  /**
   * Funkcija: validate_osebni_podatki (prvi korak)
   * 
   * Validira polja ime, priimek, naslov, telefon in na to priredi vrednosti interfacu User v kolikor je validacija uspešna.
   */
  validate_osebni_podatki(): void{
    this.klik_za_naslednji_korak = true;
    if (this.uporabnikForm.invalid) {
      return;
    }

    /* priredimo vrednosti interfacu */
    this.uporabnik.ime = this.uporabnikForm.controls['ime'].value;
    this.uporabnik.priimek = this.uporabnikForm.controls['priimek'].value;
    this.uporabnik.naslov = this.uporabnikForm.controls['naslov'].value;
    this.uporabnik.telefon = this.uporabnikForm.controls['telefon'].value;
    
    this.trenutni_korak ++;
  }

  ngOnInit(){

    /* kreiramo form builder ki nam bo služil kot validator */
    this.uporabnikForm = this.formBuilder.group({
      ime: ['', [Validators.required, Validators.minLength(2)]],
      priimek: ['', [Validators.required, Validators.minLength(2)]],
      telefon: ['', [Validators.required, Validators.pattern("[0-9 ]{9}")]],
      naslov: ['', [Validators.required, Validators.minLength(5)]],
    });

  }
  
  /**
   * Simple getter za pridobivanje field vrednosti posameznih inputov forme
   */
  get field() { return this.uporabnikForm.controls; }

}
