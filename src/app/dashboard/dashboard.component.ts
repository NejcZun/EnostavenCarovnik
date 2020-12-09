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


  public stevilo_vseh_korakov = 3;                                                                                     //max stevilo korakov
  public trenutni_korak = 1;                                                                                           //trenutni korak kjer se uporabnik nahaja

  public klik_za_naslednji_korak = false;                                                                              //vsakic ko uporabnik klikne na gumb naprej trigger                         

  public uporabnik: User;                                                                                              //spremenjivka user ki vsebuje interface uporabnika

  public uporabnikForm: FormGroup;                                                                                     //objekt za validacijo forme vnosa uporabnika
  public izobrazbaForm: FormGroup;                                                                                     //objekt za validacijo forme vnosa izobrazbe

  public izobrazbe: Izobrazba[];

  constructor(private formBuilder: FormBuilder) { 


    this.uporabnik = {ime: "", priimek: "", naslov:"", telefon: 0, izobrazba: {naziv: "", dolgi_naziv: ""}};           //prazn objekt v konstruktorji, da nam ni potrebno povsod previrjati ali je ze napolnjen

    this.izobrazbe = [
                   {naziv: "dipl. inž. gozd.", dolgi_naziv: "diplomirani inženir gozdarstva"},                         //strokovni nazivi iz http://pisrs.si/Pis.web/pregledPredpisa?id=DRUG171
                   {naziv: "dipl. trž. kom. ", dolgi_naziv: "diplomirani komunikolog"},
                   {naziv: "dipl. družb. inf.", dolgi_naziv: "diplomirani sociolog"}, 
                   {naziv: "dipl. inž. mm. kom.", dolgi_naziv: "diplomirani inženir multimedijskih komunikacij"}, 
                   {naziv: "dipl. fin. mat. ", dolgi_naziv: "diplomirani finančni matematik"}, 
                   {naziv: "dipl. inž. geotehnol. in rud.", dolgi_naziv: "diplomirani inženir geotehnologije in rudarstva"}, 
                   {naziv: "dipl. graf. med. teh.", dolgi_naziv: "diplomant grafične in medijske tehnike"}, 
                   {naziv: "dipl. dram. in scen. um.", dolgi_naziv: "diplomant dramaturgije in scenske umetnosti"}, 
                   {naziv: "dipl. film. in telev. mont.", dolgi_naziv: "diplomirani filmski in televizijski montažer"}]
  }

  /**
   * Funkcija: validate_osebni_podatki (prvi korak)
   * 
   * Validira polja ime, priimek, naslov, telefon in na to priredi vrednosti interfacu User v kolikor je validacija uspešna. 
   * Sproži se ob kliku na kumb Naprej
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
    this.klik_za_naslednji_korak = false;
  }

  /**
   * Funkcija: validate_izobrazba (drugi korak)
   * 
   * Validira ali je uporabnik izbral izobrazbo v select inputu
   * Sproži se ob kliku na kump Naprej
   */
  validate_izobrazba(): void{
    this.klik_za_naslednji_korak = true;
    if (this.izobrazbaForm.invalid) {
      return;
    }
    this.trenutni_korak++;
    this.klik_za_naslednji_korak = false;
  }


  /**
   * Funkcija prikazi_izobrazbo (drugi korak)
   * 
   * Prikaže vrednost objekta izbranega v select stavku drugega koraka.
   * Sproži se ob spremembi select stavka
   */

  prikazi_izobrazbo(): void{

    /* nastavimo izbrano izobrazbo uporabniku */
    this.uporabnik.izobrazba = this.izobrazbaForm.controls['izobrazba'].value;


    
  }

  /**
   * Funkcija korak_nazaj (drugi in tretji korak)
   * 
   * Vrne se za en korak nazaj tako da odsteje trenutni korak - 1.
   */

  korak_nazaj(): void{
    this.trenutni_korak--;
  }

  /**
   * OnInit kreiramo validatorje za naše forme in jim damo omejitve glede na želje.
   * 
   * Za namen enostavnosti smo omejili telefonsko številko na 9 števil brez presledka. 
   * Lahko bi pa dodali še validacijo za +386 51 111 111 in 051 111 111 tako da dodamo v array dva nova Validators.pattern()-a.
   */

  ngOnInit(){

    /* kreiramo form builder ki nam bo služil kot validator za prvi korak */
    this.uporabnikForm = this.formBuilder.group({
      ime: ['', [Validators.required, Validators.minLength(2)]],
      priimek: ['', [Validators.required, Validators.minLength(2)]],
      telefon: ['', [Validators.required, Validators.pattern("[0-9 ]{9}")]],
      naslov: ['', [Validators.required, Validators.minLength(5)]],
    });


    /* kreiramo form builder ki nam bo služil kot validator za prvi korak */
    this.izobrazbaForm = this.formBuilder.group({
      izobrazba: ['', Validators.required]
    });

  }
  
  /**
   * Simple getter za pridobivanje field vrednosti posameznih inputov forme
   */
  get field() { return this.uporabnikForm.controls; }

  /**
   * Simple getter za pridobivanje selected vrednosti izbora izobrazbe
   */
  get selected() { return this.izobrazbaForm.controls; }

}
