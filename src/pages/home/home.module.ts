import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {EventCardComponent} from "../../components/event-card/event-card";

@NgModule({
  declarations: [
    HomePage, EventCardComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    EventCardComponent
  ],
})
export class HomePageModule {}
