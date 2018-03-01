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
	catDisplayValues: any;
	categorySelect: any;
	subCats: any;
	
	ageRanges: Array<string>;
	selectedAgeRanges: Array<string>;
	ageRangeDisplayValues: Array<boolean>;

	searchTerms:string = '';
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
										this.catDisplayValues.push([true]);
									} else {
										this.catDisplayValues.push([false]);
									}
									for (let j = 0; j < this.subCats[k].length; j++) {
										if (this.selectedCategories.indexOf(this.subCats[k][j]) >= 0) {
											this.catDisplayValues[k].push(true);
										} else {
											this.catDisplayValues[k].push(false);
										}
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
			 
		// setup venues list
		this.venues = new Array<string>();
		this.dataProvider.getVenues()
			 .subscribe(
				  data => {
						for (let i = 0; i < data.length; i++) {
							this.venues.push(data[i].VenueName);
						}
						this.searchedVenues = this.venues;
				  }
			 );
			 
		
		
		this.storage.get('venues').then((data) => {
			if (data != null) {
				this.selectedVenues = data;
			} else {
				this.selectedVenues = [];
			}
		});

		// setup age ranges, I can't find these in the events so I'm just using a preset list of the ones molly told us
		this.ageRanges = ["Kids", "Teen", "Family", "Adult"];
		this.selectedAgeRanges = [];
		this.ageRangeDisplayValues = [];
		
 		this.storage.get('ageRanges').then((data) => {
			if (data != null) {
				this.selectedAgeRanges = data;
			} else {
				this.ageRanges.map (x => {this.selectedAgeRanges.push(x)});
			}
			
			for (let k = 0; k < this.ageRanges.length; k++) {
				if(this.selectedAgeRanges.indexOf(this.ageRanges[k]) >= 0) {
					this.ageRangeDisplayValues.push(true);
				} else {
					this.ageRangeDisplayValues.push(false);
				}
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
	
	onVenueSearchInput() {
		console.log(this.searchTerms);
		this.dataProvider.getVenues()
		.subscribe(
			 data => {
				  this.venues = this.filterVenues(data);
			 },
			 err => {
				  console.log(err);
			 }
		)
		
	}
	
	// when full search term string is cleared
    onVenueSearchClear() {
		this.searchTerms = "";
		this.searchedVenues = this.venues;
    }
	 
	filterVenues(data) {
	  let newVenues = [];
	  let st = this.searchTerms.toLowerCase();
	  for (let e of data) {
			let venue = e.VenueName.toLowerCase().includes(st);

			if (venue) {
				 newVenues.push(e.VenueName);
			}
	  }
	  return newVenues;
	}
	
	expandCat = function(categoryName) {
		let exp = document.getElementById(categoryName + "-open").dataset.expanded;
		if(exp == "false") {
			document.getElementById(categoryName).style.display = "block";
			document.getElementById(categoryName + "-open").dataset.expanded = "true";
		} else {
			document.getElementById(categoryName).style.display = "none";
			document.getElementById(categoryName + "-open").dataset.expanded = "false";
		}

		
	}
	
	mainCatChange(value) {
		let sIndex = this.selectedCategories.indexOf(value);
		let aIndex = this.categories.indexOf(value);
		if (sIndex >= 0) {
			this.selectedCategories.splice(sIndex, 1);
 			for (let i = 0; i <= this.subCats[aIndex].length; i++) {
				let subIndex = this.selectedCategories.indexOf(this.subCats[aIndex][i]);
				console.log("unchecked: " + this.subCats[aIndex][i] + subIndex);
				console.log(this.selectedCategories);
				if (subIndex >= 0) {
					this.selectedCategories.splice(subIndex, 1);
					this.catDisplayValues[aIndex][i] = false;
				}
		 	} 
			
		} else {
			this.selectedCategories.push(value);
 			for (let i = 0; i <= this.subCats[aIndex].length; i++) {
				let subIndex = this.selectedCategories.indexOf(this.subCats[aIndex][i]);
				console.log("checked: " + this.subCats[aIndex][i] + subIndex);
				console.log(this.selectedCategories);
				if (subIndex < 0) {
					this.selectedCategories.push(this.subCats[aIndex][i]);
					this.catDisplayValues[aIndex][i] = true;
				}
		 	} 	
		}
	}
	
	subCatChange(value) {
  		let index = this.selectedCategories.indexOf(value);
		if (index < 0) {
			this.selectedCategories.push(value);
		} else {
			this.selectedCategories.splice(index, 1);
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
	
	ageRangeChange(value) {
		let index = this.selectedAgeRanges.indexOf(value)
		if (index > -1) {
			this.selectedAgeRanges.splice(index, 1);
		} else {
			this.selectedAgeRanges.push(value);
		}
	}
	
   saveAgeRange() {
        this.storage.get('ageRanges').then((data) => {

            let array = [];
				this.selectedAgeRanges.map( a => { array.push(a); });
            this.storage.set('ageRanges', array);

        });
    }
}