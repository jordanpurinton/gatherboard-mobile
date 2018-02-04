import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
	
	items: any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
		this.storage.get('myStore').then((data) => {
			console.log('my data'+data);
			this.items = data;
		});
	}

    ionViewDidLoad()
    {
    }
	 
	save(val) {
		this.storage.get('storedVar').then((data) => {
			if (data != null) {
				data.push (val);
				this.storage.set('myStore', data);
			}
			else {
				let array = [];
				array.push(val);
				this.storage.set('myStore', array);
			}
		});
	}

}
