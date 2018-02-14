import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Response } from '@angular/http';

import { ServerService } from '../server.service';
import {DialogComponent} from '../dialog/dialog.component'
import { KA } from './ka.model'

@Component({
  selector: 'app-entwurf',
  templateUrl: './entwurf.component.html',
  styleUrls: ['./entwurf.component.css'],
})
export class EntwurfComponent implements OnInit {
  
entwurfForm: FormGroup
data = [{titel: 'Testtitel', planung: "Testplanung"}]
  
constructor(public dialog: MatDialog, private serverService: ServerService) { }

ngOnInit() {
    this.entwurfForm = new FormGroup({
      'titel': new FormControl(null),
      'planung': new FormControl(null),
      'planung_ka': new FormArray([]),
      'beschaffung': new FormControl(null),
      'beschaffung_ka': new FormArray([]),
      'vor_aufbereitung': new FormControl(null),
      'vor_aufbereitung_ka': new FormArray([]),
      'letzter_check': new FormControl(null),
      'letzter_check_ka': new FormArray([]),
      'ausfuehrung': new FormControl(null),
      'ausfuehrung_ka': new FormArray([]),
      'ausfuehrungsuerberwachung': new FormControl(null),
      'ausfuehrungsuerberwachung_ka': new FormArray([]),
      'noetige_anpassung': new FormControl(null),
      'noetige_anpassung_ka': new FormArray([]),
      'abschluss': new FormControl(null),
      'abschluss_ka': new FormArray([])
    });
  }
  
onSubmit(){
    console.log(this.entwurfForm.value)
    this.data.push(this.entwurfForm.value)
  }
  
onUpdate(){
  // replace last item in array with the updated one
  this.data.splice(-1, 1);
  this.data.push(this.entwurfForm.value)
  console.log(this.entwurfForm.value)
}
  
onSave(){
  this.serverService.storeData(this.data).subscribe((response) => console.log(response),(error) => console.log(error));
  }
  
onGet(){
  this.serverService.getData().subscribe(
    (data: any[]) => console.log(data),
    (error) => console.log(error)
    );
  }
 
 
// ADD KA
//Variablen  
ka_text: string;
akteur: string;
arrayToPush: string; 
titel: string
description: string;


// ka: KA = new KA('Akteur', 'Text');
ka: KA;

// ADD Konkreten Ausführungsschritt
onAddKA(stepNumber: number){
      
      switch(stepNumber) { 
        case 1: { 
        this.arrayToPush = "planung_ka"; 
        this.titel = 'Planung';
        this.description = 'Was soll erreicht und welche Ressourcen werden benötigt?';
        break; 
        } 
        case 2: { 
        this.arrayToPush = "beschaffung_ka"; 
        this.titel = 'Beschaffung';
        this.description = 'Welche Inputs werden benötigt?';
        break; 
        }
        case 3: { 
        this.arrayToPush = "vor_aufbereitung_ka"; 
        this.titel = 'Vor- / Aufbereitung';
        this.description = 'Wie muss das Arbeitsumfeld oder die Inputs vor- oder aufbereitet werden?';
        break; 
        }
        case 4: { 
        this.arrayToPush = "letzter_check_ka"; 
        this.titel = 'Letzter Check';
        this.description = 'Wie wird sichergestellt, dass der Job erfolgreich ausgeführt wurde und das Inputs und Arbeitsumfeld in Ordnung sind?';
        break; 
        }
        case 5: { 
        this.arrayToPush = "ausfuehrung_ka"; 
        this.titel = 'Ausführung';
        this.description = 'Was muss getan werden, damit der Job erfolgreich durchgeführt werden kann?';
        break; 
        }
        case 6: { 
        this.arrayToPush = "ausfuehrungsuerberwachung_ka"; 
        this.titel = 'Ausführungsüberwachung';
        this.description = 'Was muss während der Ausführung kontrolliert werden, um sicherzustellen, dass der Job erfolgreich durchgeführt wird?';
        break; 
        }
        case 7: { 
        this.arrayToPush = "noetige_anpassung_ka"; 
        this.titel = 'Nötige Anpassung';
        this.description = 'Was muss angepasst werden, damit der Job erfolgreich durchgeführt werden kann? Wann, wie, wo sollten Änderungen gemacht werden?';
        break; 
        }
        case 8: { 
        this.arrayToPush = "abschluss_ka"; 
        this.titel = 'Abschluss';
        this.description = 'Welche Inputs werden benötigt?';
        break; 
        }
      }
      
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { ka_text: this.ka_text, akteur: this.akteur, titel: this.titel, description: this.description }
    });
    
    dialogRef.afterClosed().subscribe(result => {

      if(result){
        if(result.ka_text){
          this.ka = new KA(result.akteur, result.ka_text)
          const control = new FormControl(this.ka);
          (<FormArray>this.entwurfForm.get(this.arrayToPush)).value.push(control.value)
          console.log(this.entwurfForm.value)
        } else {
          alert("Bitte Text ausfüllen")
        }

      }
    });
    

    
}

// DELETE Konkreten Ausführungsschritt 
onDeleteKA(index, event, stepNumber){
    
      switch(stepNumber) { 
        case 1: { 
        this.arrayToPush = "planung_ka";
        break; 
        } 
        case 2: { 
        this.arrayToPush = "beschaffung_ka";
        break; 
        }
        case 3: { 
        this.arrayToPush = "vor_aufbereitung_ka";
        break; 
        }
        case 4: { 
        this.arrayToPush = "letzter_check_ka";
        break; 
        }
        case 5: { 
        this.arrayToPush = "ausfuehrung_ka";
        break; 
        }
        case 6: { 
        this.arrayToPush = "ausfuehrungsuerberwachung_ka";
        break; 
        }
        case 7: { 
        this.arrayToPush = "noetige_anpassung_ka";
        break; 
        }
        case 8: { 
        this.arrayToPush = "abschluss_ka";
        break; 
        }
      }
      
      
    (<FormArray>this.entwurfForm.get(this.arrayToPush)).value.splice(index, 1);
    event.target.parentElement.parentElement.remove()
    console.log(this.entwurfForm.value)
  }
  
}
  





