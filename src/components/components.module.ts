import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {EventCardComponent} from './event-card/event-card';

@NgModule({
    declarations: [EventCardComponent],
    imports: [],
    exports: [EventCardComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ComponentsModule {
}
