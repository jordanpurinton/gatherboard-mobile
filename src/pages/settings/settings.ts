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
	
	selectedTab = "Categories"
	
	tags: Array<string>;
	selectedTags: Array<string>;
	tagDisplayValues: Array<boolean>;
	
	categories: Array<string>;
	selectedCategories: Array<string>;
	catDisplayValues: Array<boolean>;
	categorySelect: any;
	knobValues: any = {
		upper: 50,
		lower: 0
	};
	constructor(public dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
 		
		this.selectedTags = new Array<string>();
		this.storage.get('tags').then((data) => {
			if (data != null) {
				this.selectedTags = data;
			} else {
				this.selectedTags = [];
			}
		}); 
		
		this.tags = new Array<string>();
		this.tagDisplayValues = new Array<boolean>();
		this.dataProvider.getTags()
			 .subscribe(
				  data => {
						for (let i = 0; i < data.length; i++) {
								
							this.tags.push(data[i].TagName);
							
							for (let k = 0; k < this.tags.length; k++) {
									if (this.selectedTags.includes(this.tags[k])) {
										this.tagDisplayValues.push(true);
									} else {
										this.tagDisplayValues.push(false);
									}
								}
						}
				  },
				  err => console.log(err)
			 );
			 
			 
		this.selectedCategories = [];
		
		this.storage.get('categories').then((data)  => {
			if (data != null) {
				this.selectedCategories = data;
			} else {
				this.selectedCategories = [];
			}			
		});
		this.categories = new Array<string>();
		this.catDisplayValues = new Array<boolean>();        
		
 		this.dataProvider.getCategories()
                .subscribe(
                    data => {

                        for (let i = 0; i < data.length; i++) {
									console.log(data[i]);
                           this.categories.push(data[i].CatName);
									//this.tags.push(data[i].CatName);
                        }
								
								for (let k = 0; k < this.categories.length; k++) {
									if (this.selectedCategories.includes(this.categories[k])) {
										this.catDisplayValues.push(true);
									} else {
										this.catDisplayValues.push(false);
									}
								}
								

                    },
                    err => console.log(err)
                );
		
		
	}
	
	ionViewDidLoad()
	{


	}
	
	getCategoriesTab() {
		this.selectedTab = "Categories";
		
	}
	
	getTagsTab() {
		this.selectedTab = "Tags";
	}
	
	getVenuesTab() {
		this.selectedTab = "Venues";
	}
	
	getAgeRangeTab() {
		this.selectedTab = "Age Range";
	}
	
	categoryChange(value) {
		let index = this.selectedCategories.indexOf(value)
		if (index > -1) {
			this.selectedCategories.splice(index, 1);
		} else {
			this.selectedCategories.push(value);
		}
		
		console.log(this.selectedCategories);
	}
	
	saveCategories() {
		this.storage.get('categories').then((data) => {
			this.storage.set('categories', this.selectedCategories);
		});
	}
	
	tagChange(value) {
		let index = this.selectedTags.indexOf(value)
		if (index > -1) {
			this.selectedTags.splice(index, 1);
		} else {
			this.selectedTags.push(value);
		}
		
		console.log(this.selectedTags);
	}
	
	saveTags() {
		this.storage.get('tags').then((data) => {
			this.storage.set('tags', this.selectedTags);
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
}