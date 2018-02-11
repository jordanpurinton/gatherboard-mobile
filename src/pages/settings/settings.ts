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
	
	tags: Array<string>;
	categories: Array<string>;
	selectedCategories: Array<string>;
	categorySelect: any;
	knobValues: any = {
		upper: 50,
		lower: 0
	};
	constructor(public dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
/* 		this.storage.get('tags').then((data) => {
			this.tags = data;
		}); */
		
		this.tags = new Array<string>();
		/*this.dataProvider.getTags()
			 .subscribe(
				  data => {
						for (let i = 0; i < data.length; i++) {
								
							this.tags.push(data[i].TagName);
						}
				  },
				  err => console.log(err)
			 );
			 */
		this.categories = new Array<string>();        
		
 		this.dataProvider.getCategories()
                .subscribe(
                    data => {

                        for (let i = 0; i < data.length; i++) {
									console.log(data[i]);
                           this.categories.push(data[i].CatName);
									this.tags.push(data[i].CatName);
                        }

                    },
                    err => console.log(err)
                );
 
		this.selectedCategories = [];
		
		this.storage.get('categories').then((data)  => {
			this.selectedCategories = data;
			console.log(this.selectedCategories);
		});
		
	}
	
	ionViewDidLoad()
	{
		
	}
	
	saveAgeRange(valLower, valUpper) {
		console.log(valLower + " " + valUpper);
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

}