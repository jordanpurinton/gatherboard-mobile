import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemindersPage } from './reminders';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    RemindersPage,
  ],
  imports: [
    IonicPageModule.forChild(RemindersPage),
      ComponentsModule
  ],
})
export class RemindersPageModule {}
