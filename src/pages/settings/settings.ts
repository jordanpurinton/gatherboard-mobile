import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {DataProvider} from "../../providers/data-provider";


@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
        this.storage.get('tags').then((data) => {
            this.tags = data;
        });
        this.categories = new Array<string>();
        this.categories.push('Sports');
        this.categories.push('Business');
        this.categories.push('Education');
        this.categories.push('Music');
    }

    ionViewDidLoad() {
        let slider = document.getElementById("age-range-slider");
        console.log(slider);
        console.log(this.knobValues);
    }

				let array = [];
				array.push(valLower);
				this.storage.set('ageLower', array);
			
		});
	}
	 
	saveTag(val) {
		let newTags = val.split(",");
		this.storage.get('tags').then((data) => {
			if (data != null) {
				for(let k = 0; k < newTags.length; k++) {
					data.push (newTags[k]);
				}
				this.storage.set('tags', data);
			}
			else {
				let array = [];
				for(let k = 0; k < newTags.length; k++) {
					array.push (newTags[k]);
				}
				this.storage.set('tags', array);
			}
		});
		
		for(let k = 0; k < newTags.length; k++){
			this.tags.push(newTags[k]);
		}
	}
	
	saveCategories(vals) {
			
			this.storage.get('categories').then((data) => {

				let array = [];
				for(let k = 0; k < vals.length; k++) {
					array.push (vals[k]);
				}
				this.selectedCategories = array;
				this.storage.set('categories', array);
			
		});
	}
	
	clearMemory() {
		this.storage.set('categories', null);
	}
    saveAgeRange(valLower, valUpper) {
        console.log(valLower, valUpper);
        this.storage.get('ageUpper').then((data) => {

            let array = [];
            array.push(valUpper);
            this.storage.set('ageUpper', array);

        });
        this.storage.get('ageLower').then((data) => {

            let array = [];
            array.push(valLower);
            this.storage.set('ageLower', array);

        });
    }

    saveTag(val) {
        let tags = val.split(",");
        this.storage.get('tags').then((data) => {
            if (data != null) {
                for (let k = 0; k < tags.length; k++) {
                    console.log(tags[k]);
                    data.push(tags[k]);
                }
                this.storage.set('tags', data);
            }
            else {
                let array = [];
                for (let k = 0; k < tags.length; k++) {
                    array.push(tags[k]);
                }
                this.storage.set('tags', array);
            }
        });

        for (let k = 0; k < tags.length; k++) {
            this.tags.push(tags[k]);
        }
    }

    saveCategories(vals) {

        this.storage.get('Categories').then((data) => {
            if (data != null) {
                for (let k = 0; k < vals.length; k++) {
                    data.push(vals[k]);
                }
                this.storage.set('Categories', data);
            }
            else {
                let array = [];
                for (let k = 0; k < vals.length; k++) {
                    array.push(vals[k]);
                }
                this.storage.set('Categories', array);
            }
        });
    }

}