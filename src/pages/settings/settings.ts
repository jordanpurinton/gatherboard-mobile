import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {DataProvider} from "../../providers/data-provider";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
	
	@ViewChild(Slides) slides: Slides;
	
	selectedTab = "Categories"
	hasChanged = false;
	
	tags: Array<string>;
	selectedTags: Array<string>;
	tagDisplayValues: Array<boolean>;
	
	categories: Array<string>;
	selectedCategories: any;
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
	venueDisplayValues: Array<boolean>;
	
	constructor(public dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

	}
	
	ionViewDidLoad()
	{
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
		
		this.selectedTags = new Array<string>();
		this.storage.get('tags').then((data) => {
			if (data != null) {
				this.selectedTags = data;
			} else {
				this.selectedTags = [];
			}
		}); 
		
		this.selectedCategories = [];
		this.storage.get('categories').then((data) => {
			console.log(data);
			if (data != null) {
				
				this.selectedCategories = data;
			} else {
				this.selectedCategories = [];
			}
		
		this.categories = new Array<string>();
		this.catDisplayValues = new Array<boolean>();
		
		this.subCats = [];
		let selectAll = this.selectedCategories.length > 0 ? false : true;
		
		console.log(this.selectedCategories);
		//let selectAll = true;
 		this.dataProvider.getCategories()
			.subscribe(
				data => {
					for (let i = 0; i < data.length; i++) {
						this.categories.push(data[i].CatName);
						this.subCats.push([]);
						
						if (!selectAll) {
							if (this.selectedCategories.indexOf(this.categories[i]) > -1) {
								this.catDisplayValues.push([true]);
							} else {
								this.catDisplayValues.push([false]);
							}
						} else {
							this.selectedCategories.push(this.categories[i]);
							this.catDisplayValues.push([true]);
						}
						
						this.dataProvider.getSubcategories(data[i].UID).subscribe(
								data1 => {
								for (let k = 0; k < data1.length; k++) {
									//this.catDisplayValues[i].push(true);
									//this.selectedCategories[i].push(data1[k].CatName);
									this.subCats[i].push(data1[k].CatName);
									
									if (!selectAll) {
										console.log("selecting subCats");
										if (this.selectedCategories.indexOf(this.categories[i] + "_" + this.subCats[i][k]) > -1) {
											this.catDisplayValues[i].push(true);
										} else {
											this.catDisplayValues[i].push(false);
										}
									} else {
										this.selectedCategories.push(this.categories[i] + "_" + this.subCats[i][k]);
										this.catDisplayValues[i].push(true);
									}
								}
							}
						);
					}
				},
			err => console.log(err)
		);
		
		}); 
		
		
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
			 
		this.tags = new Array<string>();
		this.tagDisplayValues = new Array<boolean>();
		
		this.dataProvider.getTags()
			.subscribe(
				data => {
					
					data.map(x => this.tags.push(x.Tag));
					
					for (let k = 0; k < this.tags.length; k++) {
						if (this.selectedTags.indexOf(this.tags[k]) > -1) {
							this.tagDisplayValues.push(true);
						} else {
							this.tagDisplayValues.push(false);
						}
					}
					
				},
				err => console.log(err)
			);
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
		);
		
	}
	
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
		//
		this.hasChanged = true;
		let aIndex = this.categories.indexOf(value);
		
		console.log(this.catDisplayValues[aIndex][0]);
		// deselect all
		if (this.catDisplayValues[aIndex][0] == true) {
			this.catDisplayValues[aIndex][0] = false;
			let sIndex = this.selectedCategories.indexOf(value);
			if (sIndex > -1) {
				this.selectedCategories.splice(sIndex, 1);
			}
			for (let i = 0; i < this.subCats[aIndex].length; i++) {
				
				this.catDisplayValues[aIndex][i + 1] = false;
				

		 	}  
		
		// select all
		} else {
			this.catDisplayValues[aIndex][0] = true;
			this.selectedCategories.push(value);
			for (let i = 0; i < this.subCats[aIndex].length; i++) {
				if (this.catDisplayValues[aIndex][i + 1] == false) {
					//console.log(value + "_" + this.subCats[aIndex][i]);
					this.catDisplayValues[aIndex][i + 1] = true;
/* 					this.selectedCategories.push(value + "_" + this.subCats[aIndex][i + 1]);
					console.log(value + "_" + this.subCats[aIndex][i] + " added"); */
				}
		 	}  
		}
	}
	
	subCatChange(value) {
		this.hasChanged = true;
  		let index = this.selectedCategories.indexOf(value);
		
		if (index < 0) {
			this.selectedCategories.push(value);
		} else {
			this.selectedCategories.splice(index, 1);
		}
	}
	
	tagChange(value) {
		this.hasChanged = true;
		let index = this.selectedTags.indexOf(value)
		
		if (index > -1) {
			this.selectedTags.splice(index, 1);
		} else {
			this.selectedTags.push(value);
		}
	}
	
	saveAll() {
		
		console.log(this.selectedCategories);
		this.hasChanged = false;
		
		this.storage.set('tags', this.selectedTags);

		this.storage.set ('categories', this.selectedCategories);
		
		this.storage.set('ageRanges', this.selectedAgeRanges);
		
		this.storage.set('venues', this.selectedVenues);
		
		
		
	}
	
	venueChange(value) {
		this.hasChanged = true;
		let index = this.selectedVenues.indexOf(value);
		if (index > -1) {
			this.selectedVenues.splice(index, 1);
		} else {
			this.selectedVenues.push(value);			
		}
	}
	
	clearMemory() {
		this.storage.set('categories', []);
		this.storage.set('tags', []);
		this.storage.set('ageRanges', []);
		this.storage.set('venues', []);
		this.storage.get('categories').then((data) => {
				console.log(data);
		}); 
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
            this.selectedAgeRanges.map(a => {
                array.push(a);
            });
            this.storage.set('ageRanges', array);

        });
   }

	goToSlide(slideNum) {
		this.slides.slideTo(slideNum, 300);
		

	}
	
	slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    		switch (currentIndex) {
			case 0:
				this.selectedTab = "Categories";
				break;
			case 1:
				this.selectedTab = "Tags";
				break;
			case 2:
				this.selectedTab = "Age Range";
				break;
			case 3:
				this.selectedTab = "Venues";
				break;
		}
  }

}


	