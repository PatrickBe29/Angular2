import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

// data.akteur wird schon vorausgewählt damit es auch in dem Dialogfeld ausgewählt ist
// im constructor werden auch die daten von der entwurf.ts aufgenommen
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
          data.akteur = "Wir";
    }

  ngOnInit() {

  }

  
  
  onCloseCancel():void{
    this.dialogRef.close();
  }
}
