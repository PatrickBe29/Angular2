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
  
// Die entwurfForm Variable wird befüllt und dann in data geschoben 
entwurfForm: FormGroup
data = [{titel: 'Testtitel', planung: "Testplanung"}]

// MatDialog ist der Dialog der aufgeht wenn man den plus-button klickt
// ServerService ist die Verbindung zur Datenbank (Datei hierfür ist server.service.ts)
constructor(public dialog: MatDialog, private serverService: ServerService) { }

// Hier wird die entwurfForm deklariert, also quasi welche Inhalte werden erwartet und welchen
// Typ haben sie. In unserem Fall brauchen wir FormControl für die Titel der Schritte und 
// FormArray für die konkreten Ausführungsschritte
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


// entwurfForm wird in das data-Array Objekt geschoben
onSubmit(){
    console.log(this.entwurfForm.value)
    this.data.push(this.entwurfForm.value)
  }

// Das aktuelle, also das letzte element in dem data-Array wird gelöscht und das aktuelle Element wird eingefügt
onUpdate(){
  this.data.splice(-1, 1);
  this.data.push(this.entwurfForm.value)
  console.log(this.entwurfForm.value)
}

// Das data-Array wird in der Datenbank gespeichert. Mit storeData() wird aktuelle eine PUT methode ausgeführt, 
// also die aktuellen Daten werden überschrieben. Die POST Methode ist aber auch vorhanden und kann nach belieben
// einbebunden werden
onSave(){
  this.serverService.storeData(this.data).subscribe((response) => console.log(response),(error) => console.log(error));
  }

// Die aktuell gespeicherten Daten werden aus der Datenbank geholt. 
// Es wäre vermutlich eine überlegung das direkt bei starten der Servers zu machen und dem data-Array zuzuordnen, 
// aber das überlasse ich mal dir wie du das handhaben möchtest ;) 
onGet(){
  this.serverService.getData().subscribe(
    (data: any[]) => console.log(data),
    (error) => console.log(error)
    );
  }
 
 
// Hier werden die konkreten Ausführungsschritte hinzugefügt und gelöscht
// Variablen die in den funktionen gebraucht werden 
ka_text: string;
akteur: string;
arrayToPush: string; 
titel: string
description: string;

// KA wird in ka.model.ts definiert ->  ka: KA = new KA('Akteur', 'Text');
ka: KA;

// ADD Konkreten Ausführungsschritt
onAddKA(stepNumber: number){
    
      // Die stepNumber wird vom Button übergeben und legt die Daten fest die an den Dialog weitergegeben werden,
      // bzw. in welches Array das neue KA Objekt gespeichert wird.
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
    
    // Hier findet der eigentliche Aufruf des Dialogs statt un die daten werden weitergegeben
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { ka_text: this.ka_text, akteur: this.akteur, titel: this.titel, description: this.description }
    });
    
    // Sobald das Dialogfeld geschlossen wird bekommt man ein Object "result" zurück
    dialogRef.afterClosed().subscribe(result => {
      
      // Falls etwas in result gespeichert ist (immer der Fall da Akteur vorausgewählt ist, deswegen zweite if schleife)
      if(result){
        // Fall der Text für das KA ausgefüllt wurde: Zurückkommender akteuer + ka_text werden in einem KA Objekt gespeichert
        // und dann in das entsprechende Array in der entwurfForm gespeichert
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
      
      // Switch wie bei onAddKA um das richtige Array auszuwählen aus dem herausgelöscht werden soll
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
      
    // über den übergebenen index wird das entsprechende element aus dem Array gelöscht
    // über das übergebene event: man benötigt 2x parentElement um die Span zu entfernen in der der Button ist und nicht nur den Button selber 
    (<FormArray>this.entwurfForm.get(this.arrayToPush)).value.splice(index, 1);
    event.target.parentElement.parentElement.remove()
    console.log(this.entwurfForm.value)
  }
  
}
  





