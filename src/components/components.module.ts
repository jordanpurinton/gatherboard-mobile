import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {EventCardComponent} from './event-card/event-card';
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [EventCardComponent],
    imports: [CommonModule, IonicModule],
    exports: [EventCardComponent],
    providers: [EventCardComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
}
