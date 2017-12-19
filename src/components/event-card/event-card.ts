import {Component, Input} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent
{

  @Input() event: any;
  category: string;
  iconName: string;

  constructor()
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

    else if (this.category == 'Sports'){
      this.iconName = 'american-football';
    }

    else if (this.category == 'Business') {
      this.iconName = 'briefcase';
    }

    else if (this.category == 'Government') {
      this.iconName = 'megaphone';
    }

    else {
      this.iconName = 'star';
    }
  }

  formatStartTime(startTime)
  {
    let firstIndex = parseInt(startTime[0]);
    let secondIndex = parseInt(startTime[1]);
    let combined = startTime[0] + startTime[1];
    let combinedInt = parseInt(combined);

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
