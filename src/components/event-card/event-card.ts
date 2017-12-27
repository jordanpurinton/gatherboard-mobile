import {Component, Input} from '@angular/core';
import moment from 'moment';
import {ModalController} from "ionic-angular";
import {EventModalPage} from "../../pages/event-modal/event-modal";

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent
{

  @Input() event: any;
  colorMap = {};
  category: string;
  iconName: string;
  categories = JSON.parse(localStorage.getItem('Categories'));

  // color strings
  backgroundColorMap = {
    'Education': '#FFF5E3', 'Food': '#F3E5E1', 'Art': '#E1ECF5', 'Music': '#E1F0EC',
    'Sports': '#ffe6d1', 'Business': '#708090', 'Government': '#EFD9FF'
  };
  iconColorMap = {
    'Education': '#FFB019', 'Food': '#9F2200', 'Art': '#0C5FAF', 'Music': '#00845E',
    'Sports': '#ff8514', 'Business': '#708090', 'Government': '#70005D'
  };
  constructor(public modalController: ModalController)
  {
  }

  ngOnInit()
  {

    this.category = this.event.ParentCatName;

    // sorry this is bad, couldn't get switch cases to work
    // so this will have to do
    if (this.category == 'Education') {
      this.iconName = 'school';
    }

    else if (this.category == 'Food') {
      this.iconName = 'restaurant';
    }

    else if (this.category == 'Art') {
      this.iconName = 'color-palette';
    }

    else if (this.category == 'Music') {
      this.iconName = 'musical-notes';
    }

    else if (this.category == 'Sports') {
      this.iconName = 'american-football';
    }

    else if (this.category == 'Business') {
      this.iconName = 'briefcase';
    }

    else if (this.category == 'Government') {
      this.iconName = 'megaphone';
    }

    else {
      this.backgroundColorMap[this.category] = '#cacfd4';
      this.iconName = 'star';
    }
  }


  openModal(event)
  {
    let modal = this.modalController.create(EventModalPage, {'event': event});
    modal.present();
  }


  /**
   * Hacky method for formatting plain time string sent back from API
   * @param startTime
   * @returns {string}
   */
  formatStartTime(startTime)
  {
    let firstIndex = parseInt(startTime[0]);
    let secondIndex = parseInt(startTime[1]);
    let combined = startTime[0] + startTime[1];
    let combinedInt = parseInt(combined);

    // remove trailing 0
    if(parseInt(startTime[0]) == 0){
      startTime = startTime.substring(1, startTime.length + 1);
    }

    // 13:00 - 23:59
    if (combinedInt > 12) {
      return (combinedInt - 12).toString() + ':' + startTime[3] + startTime[4] + 'p';
    }

    // 12:00p - 12:59p
    else if (firstIndex == 1 && secondIndex == 2) {
      return startTime.substring(0, startTime.length - 3) + 'p';
    }

    // 00:00 - 11:59
    else {
      return startTime.substring(0, startTime.length - 3) + 'a';
    }
  }

  formatDate(date)
  {
    return moment(date).format('M/D');
  }
}
