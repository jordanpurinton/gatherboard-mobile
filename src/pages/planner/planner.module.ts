import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlannerPage } from './planner';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PlannerPage,
  ],
  imports: [
    IonicPageModule.forChild(PlannerPage),
      ComponentsModule
  ],
})
export class PlannerPageModule {}
