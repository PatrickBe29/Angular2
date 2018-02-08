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
      }
    
    console.log(this.ka)
      
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { ka_text: this.ka_text, akteur: this.akteur, titel: this.titel, description: this.description }
    });
    
    dialogRef.afterClosed().subscribe(result => {

      if(result.ka_text && result.akteur){
      this.ka = new KA(result.akteur, result.ka_text)
      const control = new FormControl(this.ka);
      (<FormArray>this.entwurfForm.get(this.arrayToPush)).value.push(control.value)
      console.log(this.entwurfForm.value)
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
      }
      
      
    (<FormArray>this.entwurfForm.get(this.arrayToPush)).value.splice(index, 1);
    event.target.parentElement.parentElement.remove()
    console.log(this.entwurfForm.value)
  }
  
  
}
  





