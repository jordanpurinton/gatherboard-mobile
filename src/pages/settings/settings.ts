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
	subCats: any;
	
	ageRanges: any;
	selectedAgeRanges: any;
	knobValues: any = {
		upper: 50,
		lower: 0
	};
	
	searchTerms = '';
	searchedVenues: Array<string>;
	venues: Array<string>;
	selectedVenues: Array<string>;
	
	constructor(public dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
 		
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
		
		this.subCats = [];
		
 		this.dataProvider.getCategories()
                .subscribe(
                    data => {

                        for (let i = 0; i < data.length; i++) {
                           this.categories.push(data[i].CatName);
									//this.tags.push(data[i].CatName);
									this.subCats.push([]);
									this.dataProvider.getSubcategories(data[i].UID).subscribe(
										data1 => {
											for (let k = 0; k < data1.length; k++) {
												this.subCats[i].push(data1[k].CatName);
											}
										}
									);
									
                        }
										
								if (this.selectedCategories.length == 0) {
									this.selectedCategories = this.categories + this.subCats;
								}
								
								for (let k = 0; k < this.categories.length; k++) {
									if (this.selectedCategories.indexOf(this.categories[k]) >= 0) {
										this.catDisplayValues.push(true);
									} else {
										this.catDisplayValues.push(false);
									}
								}
								

                    },
                    err => console.log(err)
                );
		

		
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
		
		this.venues = new Array<string>();
		
		this.ageRanges = [];
		

		
		this.dataProvider.getEvents()
			 .subscribe(
				  data => {
						for (let i = 0; i < data.length; i++) {
							
							// get categories and subcategories
/* 							for (let j = 0; j < this.categories.length; j++) {
								if (data[i].ParentCatName == this.categories[j]) {
									if (data[i].SecCatName != null) {
										if (this.subCats[j] == null) {
											this.subCats[j] = []
										}
									
										this.subCats[j].push(data[i].SecCatName);
									}
								}
									
							} */
							
							
							// get age ranges
							
								
/* 							this.tags.push(data[i].UID);
							if (this.venues.indexOf(data[i].Venue) == -1) {
								this.venues.push(data[i].Venue);
							} */
							
							for (let k = 0; k < this.tags.length; k++) {
									if (this.selectedTags.indexOf(this.tags[k]) > -1) {
										this.tagDisplayValues.push(true);
									} else {
										this.tagDisplayValues.push(false);
									}
								}
						}
				  },
				  err => console.log(err)
			 );
			 
		this.searchedVenues = this.venues;
		
		this.storage.get('venues').then((data) => {
			if (data != null) {
				this.selectedVenues = data;
			} else {
				this.selectedVenues = [];
			}
		});


		
 		this.storage.get('ageUpper').then((data) => {
			if (data != null) {
				
				this.knobValues.upper = data;
			} else {
				this.knobValues.upper = 99;
			}
		});
		
		this.storage.get('ageLower').then((data) => {
			if (data != null) {
				this.knobValues.lower = data;
			} else {
				this.knobValues.lower = 0;
			}
		});
		
		
		
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
	
	onVenueSearchInput(event) {
		this.searchedVenues = this.venues.filter(sv => { return sv.toLowerCase().includes(this.searchTerms);});
				
		console.log(this.searchedVenues);
	}
	
	// when full search term string is cleared
    onVenueSearchClear() {
		this.searchTerms = "";
		this.searchedVenues = this.venues;
    }
	
	expandCat(categoryName) {
		
		document.getElementById(categoryName).style.display = "block";
		document.getElementById(categoryName + "-open").style.display = "none";
		
		
	}
	
	retractCat(categoryName) {
		
		document.getElementById(categoryName).style.display = "none";
		document.getElementById(categoryName + "-open").style.display = "block";
		
	}
	
	categoryChange(value) {
		let index = this.selectedCategories.indexOf(value)
		if (index > -1) {
			this.selectedCategories.splice(index, 1);
		} else {
			this.selectedCategories.push(value);
		}
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
		
	}
	
	saveTags() {
		this.storage.get('tags').then((data) => {
			this.storage.set('tags', this.selectedTags);
		});
	}
	
	saveVenue(value) {
		this.storage.get('venues').then((data) => {
			if (data != null && data.indexOf(value)  == -1) {
				data.push(value);
			} else {
				data = [value];
			}
		}	);	
	}
	
	clearMemory() {
		this.storage.set('categories', null);
	}
    saveAgeRange(valLower, valUpper) {
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