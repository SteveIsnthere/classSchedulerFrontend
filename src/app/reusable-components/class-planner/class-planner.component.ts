import {Component} from '@angular/core';

import {CdkDragDrop, CdkDragEnter, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {PlanningServiceService} from "./planning-service.service";
import {DisplayElement} from "./DisplayElement";

@Component({
  selector: 'app-class-planner',
  templateUrl: './class-planner.component.html',
  styleUrls: ['./class-planner.component.css']
})
export class ClassPlannerComponent {
  displayElements: DisplayElement[][]
  hours: number[] = []
  cellHeight: number = 80;
  draggingFromRelation: boolean = false;

  constructor(public planningService: PlanningServiceService) {
    this.displayElements = this.planningService.displayData;
    for (let h = this.planningService.openingTime; h < this.planningService.closingTime; h++) {
      this.hours.push(h);
    }
  }

  onDrop(event: CdkDragDrop<DisplayElement[], any>) {
    // this.planningService.isDraggingClass = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.planningService.changeClassPositionSameDay(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //check if the new day have enough time for the class
      if (this.planningService.getDayBlankTimeRemaining(event.container.data) < event.previousContainer.data[event.previousIndex].duration) {
        return;
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        if (this.draggingFromRelation) {
          this.planningService.addClassFromRelation(event.container.data, event.currentIndex);
          this.draggingFromRelation = false;
          return;
        } else {
          this.planningService.changeClassPositionDifferentDay(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
      }
    }
  }

  onDragStartedSameCol(event: CdkDragEnter<DisplayElement[]>) {
    // this.updateDraggingStatus(event.container.data[event.currentIndex])
    // list index
    // console.log(event.currentIndex)
    // day index
    // console.log(event.container.id)

    // print out the element that is being dragged
    // this.updateDraggingStatus()
    // this.planningService.updatePreviewClassPositionSameDay(event.container.data, event.currentIndex);
  }

  onDragStartedCrossCol(event: CdkDragEnter<DisplayElement[]>) {
    // this.updateDraggingStatus(c: DisplayElement)
  }


  // updateDraggingStatus() {
  //   if (!this.planningService.isDraggingClass) {
  //     this.planningService.isDraggingClass = true;
  //   }
  // }

  dateHeader(index: number) {
    let date = this.planningService.datesInWeek[index];
    let weekDay = '';
    switch (date.getDay()) {
      case 0:
        weekDay = 'Sun';
        break;
      case 1:
        weekDay = 'Mon';
        break;
      case 2:
        weekDay = 'Tue';
        break;
      case 3:
        weekDay = 'Wed';
        break;
      case 4:
        weekDay = 'Thu';
        break;
      case 5:
        weekDay = 'Fri';
        break;
      case 6:
        weekDay = 'Sat';
        break;
    }
    let day = date.getDate();

    return weekDay + ' ' + day;
  }

  getMonthAndYear() {
    let monthIndex = this.planningService.datesInWeek[0].getMonth()
    let year = this.planningService.datesInWeek[0].getFullYear()
    let month = ''
    switch (monthIndex) {
      case 0:
        month = 'Jan';
        break;
      case 1:
        month = 'Feb';
        break;
      case 2:
        month = 'Mar';
        break;
      case 3:
        month = 'Apr';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'Jun';
        break;
      case 6:
        month = 'Jul';
        break;
      case 7:
        month = 'Aug';
        break;
      case 8:
        month = 'Sep';
        break;
      case 9:
        month = 'Oct';
        break;
      case 10:
        month = 'Nov';
        break;
      case 11:
        month = 'Dec';
        break;
    }

    return month + ' ' + year;
  }

  getTotalHeight() {
    return ((this.planningService.closingTime - this.planningService.openingTime) * this.cellHeight) + 'px';
  }

}
