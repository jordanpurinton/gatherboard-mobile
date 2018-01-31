import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventModalPage} from './event-modal';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        EventModalPage
    ],
    imports: [
        IonicPageModule.forChild(EventModalPage),
        ComponentsModule
    ],
    exports: [EventModalPage],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class EventModalPageModule {
}
