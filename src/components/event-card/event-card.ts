import {Component, Input} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent
{

  @Input() event: any;

  constructor()
  {
  }

  matchesCategory(category)
  {
    switch (category) {

      case 'Education':
        return true;
        break;

      case 'Food':
        return true;
        break;

      case 'Art':
        return true;
        break;

      case 'Music':
        return true;
        break;

      case 'Sports':
        return true;
        break;

      case 'Business':
        return true;
        break;

      default:
        return false;
        break;
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
