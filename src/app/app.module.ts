import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { EntwurfComponent } from './entwurf/entwurf.component';
import { DialogComponent } from './dialog/dialog.component';
import { ServerService } from './server.service';


@NgModule({
  declarations: [
    AppComponent,
    EntwurfComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTabsModule,
    MatToolbarModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    HttpModule
  ],
  entryComponents:[
    DialogComponent
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
