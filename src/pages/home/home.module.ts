import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {ComponentsModule} from "../../components/components.module";
import {EventModalPage} from "../event-modal/event-modal";

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule
  ],
  entryComponents: [
    EventModalPage
  ]
})
export class HomePageModule {}
