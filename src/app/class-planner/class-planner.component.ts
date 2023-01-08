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

  cellHeight: number = 80;

  constructor(public planningService: PlanningServiceService) {
    this.displayElements = this.planningService.displayData;
  }

  onDrop(event: CdkDragDrop<DisplayElement[], any>) {
    this.planningService.isDraggingClass = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.planningService.changeClassPositionSameDay(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onDragStartedSameCol(event: CdkDragEnter<DisplayElement[]>) {
    this.setPreviousIndexIfDidnt(event.container.data[event.currentIndex])
    console.log(event.currentIndex)
    console.log(event.container.data)
  }

  onDragStartedCrossCol(event: CdkDragEnter<DisplayElement[]>) {
  }


  setPreviousIndexIfDidnt(c: DisplayElement) {
    if (!this.planningService.isDraggingClass) {
      this.planningService.savePreviousIndex(c)
      this.planningService.isDraggingClass = true;
    }
  }

}
