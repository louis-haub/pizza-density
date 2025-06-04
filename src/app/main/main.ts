import { Component, signal, WritableSignal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OverpassService } from '../overpass-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-main',
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    MatButtonToggle, 
    MatButtonToggleGroup,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatToolbar
    
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  city: string = "Frankfurt am Main";
  district: string = "Innenstadt";
  layout: WritableSignal<"list"|"grid"> = signal("list");

  constructor(
    protected overpass: OverpassService
  ){}

  submit(){
    this.overpass.updateCityAndDistrict(this.city, this.district)
  }

  changeLayout(change: MatButtonToggleChange){
    console.log(change)
  }
}
