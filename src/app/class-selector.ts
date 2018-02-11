import {Platform} from 'ionic-angular';

export class ClassSelector {

    getProvider(actualClass, mockClass) {
        let platform = new Platform();

        if (!platform.is('cordova')) {
            return ({provide: actualClass, useClass: mockClass});
        }

        return actualClass;
    }

}
