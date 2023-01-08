import {Injectable} from '@angular/core';
import {Member} from "../data/models/Member";
import {dummyTeacher} from "../data/models/dummyData";
import {DataService} from "../data/data.service";
import {Relation} from "../data/models/Relation";
import {Class} from "../data/models/Class";
import {DisplayElement, getBlankDisplayElement} from "./DisplayElement";
import {toISOStr} from "../helpers/helperFunctions";

@Injectable({
  providedIn: 'root'
})
export class PlanningServiceService {
  member: Member = dummyTeacher;
  classes: Class[] = [];
  relations: Relation[] = [];
  relationsToFulfill: number[] = [];
  isDraggingClass: boolean = false;
  previousIndex: number = -1;
  openingTime = 11;
  closingTime = 20;
  weekOffset = 0;
  datesInWeek: Date[] = []

  displayData: DisplayElement[][] = [[], [], [], [], [], [], []];

  displayDataCopy: DisplayElement[][] = [[], [], [], [], [], [], []];

  constructor(private dataService: DataService) {
    this.initDisplayData();
    // dataService.getRelationsOfMember(this.member.nickname).subscribe(relations => {
    //   this.relations = relations;
    //   this.updateRelationsFulfillmentStatus()
    // });
  }

  initDisplayData() {
    // remove all classes from displayData
    for (let i = 0; i < 7; i++) {
      this.displayData[i] = [];
    }
    this.member = dummyTeacher;
    this.dataService.getClassInOnWeekForOneMember(this.weekOffset, this.member.nickname).subscribe(
      classes => {
        this.dataService.getDaysInOneWeek(this.weekOffset).subscribe(
          dates => {
            this.datesInWeek = []
            for (let d of dates) {
              this.datesInWeek.push(new Date(d));
            }
            this.classes = classes;
            for (let i = 0; i < 7; i++) {
              for (let j = 0; j < (this.closingTime - this.openingTime) / 0.5; j++) {
                let newDisplayElement = getBlankDisplayElement();
                this.displayData[i].push(newDisplayElement);
              }
            }
            this.addAllClassesToDisplayData();
          })
      });
  }


  addAllClassesToDisplayData() {
    let classSortedByStartTime = this.classes.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
    for (let newClass of classSortedByStartTime) {
      this.addClassToDisplayData(newClass);
    }
    this.updateDisplayDataCopy();
  }

  addClassToDisplayData(newClass: Class) {
    // first, find the index of the day of the week of the new class monday = 0, sunday = 6
    let dayOfWeek = new Date(newClass.startTime).getDay() - 1;
    if (dayOfWeek === -1) {
      dayOfWeek = 6;
    }

    let classStartHour = new Date(newClass.startTime).getHours() + new Date(newClass.startTime).getMinutes() / 60;
    // check if the class can be inserted
    if (classStartHour < this.openingTime || classStartHour > this.closingTime || this.getDayBlankTimeRemaining(this.displayData[dayOfWeek]) < newClass.duration) {
      console.log("class start time or duration is out of range, removed class: " + newClass.info.courseName + " " + newClass.startTime);
      this.dataService.deleteClass(newClass._id).subscribe();
    }

    let timeSupposedToPassBeforeClass = classStartHour - this.openingTime;
    let timePassedBeforeClass = 0;
    let cursorPosition = 0;
    while (timePassedBeforeClass < timeSupposedToPassBeforeClass && cursorPosition < this.displayData[dayOfWeek].length) {
      timePassedBeforeClass += this.displayData[dayOfWeek][cursorPosition].duration;
      cursorPosition++;
    }
    //insert into the displayData
    let newDisplayElement = this.classToDisplayElement(newClass);
    this.displayData[dayOfWeek].splice(cursorPosition, 0, newDisplayElement);
    this.removeBlankDisplayElementAfterClassMovedIn(this.displayData[dayOfWeek], cursorPosition);
    let timePassedBeforeClassAfterInsertion = 0;
    for (let i = 0; i < this.displayData[dayOfWeek].indexOf(newDisplayElement); i++) {
      timePassedBeforeClassAfterInsertion += this.displayData[dayOfWeek][i].duration;
    }
    let actualClassStartTime = this.openingTime + timePassedBeforeClassAfterInsertion;
    // update the start time of the class if it is not the same as the actual start time
    if (timePassedBeforeClassAfterInsertion != timeSupposedToPassBeforeClass) {
      let newTime = new Date(newClass.startTime)
      newTime.setHours(Math.floor(actualClassStartTime))
      newTime.setMinutes((actualClassStartTime - Math.floor(actualClassStartTime)) * 60)
      newClass.startTime = toISOStr(newTime);
      this.dataService.updateClass(newClass._id, newClass).subscribe();
    }
    // console.log("class added: " + newClass.info.courseName + " starts at: " + newClass.startTime + ' ends at: ' + new Date(new Date(newClass.startTime).getTime() + (newClass.duration - 8) * 60 * 60 * 1000).toISOString());
  }

  getDayBlankTimeRemaining(day: DisplayElement[]): number {
    let blankTime = 0;
    for (let d of day) {
      if (d.isBlank) {
        blankTime += d.duration;
      }
    }
    return blankTime;
  }

  classToDisplayElement(c: Class): DisplayElement {
    let displayDuration: number = Math.ceil(c.duration * 2) / 2;
    return {
      _id: c._id,
      isBlank: false,
      courseName: c.info.courseName,
      duration: displayDuration,
      student: c.info.student,
      teacher: c.info.teacher,
      isOnline: c.isOnline
    }
  }

  getClassByDisplayElement(d: DisplayElement): Class {
    let id = d._id;
    let c = this.classes.find(c => c._id === id);
    if (c) {
      return c;
    }
    throw new Error("class not found");
  }

  updateOneClassStartTime(changedDay: boolean, newDisplayElementsList: DisplayElement[], newIndex: number) {
    let newClass = this.getClassByDisplayElement(newDisplayElementsList[newIndex]);
    let timePassedBeforeClass = 0;
    for (let i = 0; i < newIndex; i++) {
      timePassedBeforeClass += newDisplayElementsList[i].duration;
    }
    let newStartTime = new Date(newClass.startTime);
    newStartTime = new Date(newStartTime.getTime());
    newStartTime.setHours(this.openingTime + Math.floor(timePassedBeforeClass) - 8);
    newStartTime.setMinutes((timePassedBeforeClass - Math.floor(timePassedBeforeClass)) * 60);
    if (changedDay) {
      // if the day of the week of the class is changed, we need to update the start time of the class
      let newWeekDayIndex = this.displayData.findIndex(d => d === newDisplayElementsList);
      newStartTime.setDate(this.datesInWeek[newWeekDayIndex].getDate());
      newStartTime.setMonth(this.datesInWeek[newWeekDayIndex].getMonth());
    }
    newClass.startTime = toISOStr(newStartTime)
    this.dataService.updateClass(newClass._id, newClass).subscribe();
  }

  insertBlankDisplayElementAfterClassMovedOut(displayElementsList: DisplayElement[], oldIndex: number, newIndex: number) {
    let c = displayElementsList[newIndex];
    let numberOfHalfHours = c.duration * 2;
    while (numberOfHalfHours > 0) {
      displayElementsList.splice(oldIndex, 0, getBlankDisplayElement());
      numberOfHalfHours--;
    }
  }

  removeBlankDisplayElementAfterClassMovedIn(displayElementsList: DisplayElement[], newIndex: number) {
    let c = displayElementsList[newIndex];
    let numberOfHalfHours = c.duration * 2;
    let cursor = newIndex + 1;
    while (numberOfHalfHours > 0 && cursor < displayElementsList.length) {
      if (displayElementsList[cursor].isBlank) {
        displayElementsList.splice(cursor, 1);
        numberOfHalfHours--;
      } else {
        cursor++;
      }
    }
    if (numberOfHalfHours > 0) {
      cursor = newIndex - 1;
      while (numberOfHalfHours > 0 && cursor >= 0) {
        if (displayElementsList[cursor].isBlank) {
          displayElementsList.splice(cursor, 1);
          numberOfHalfHours--;
          for (let i = cursor; i < this.displayData.length; i++) {
            if (!displayElementsList[i].isBlank) {
              this.updateOneClassStartTime(false, displayElementsList, i);
            }
          }
        } else {
          cursor--;
        }
      }
    }
  }

  changeClassPositionSameDay(displayElementsList: DisplayElement[], oldIndex: number, newIndex: number) {
    let c = displayElementsList[newIndex];
    this.insertBlankDisplayElementAfterClassMovedOut(displayElementsList, oldIndex, newIndex);
    newIndex = displayElementsList.indexOf(c);
    this.removeBlankDisplayElementAfterClassMovedIn(displayElementsList, newIndex);
    newIndex = displayElementsList.indexOf(c);
    this.updateOneClassStartTime(false, displayElementsList, newIndex);
  }

  //
  // createClassFromRelation(relation: Relation) {
  //   this.focusedClass = {
  //     _id: Math.random().toString(36).substr(2, 9),
  //     startTime: "",
  //     duration: relation.duration,
  //     finished: false,
  //     rating: 0,
  //     comment: "",
  //     isOnline: false,
  //     info: relation
  //   };
  // }

  // updateRelationsFulfillmentStatus() {
  //   // for each relation, there's an attribute called "classPerWeek" which means how many classes should be planned for this relation
  //   // based on how many classes are planned for this relation, we can calculate how many classes are still needed to be planned
  //   // store the result in integer array "relationsToFulfill" which has the same length as "relations"
  //   for (let i = 0; i < this.relations.length; i++) {
  //     let relation = this.relations[i];
  //     let plannedClasses = this.classes.filter(c => c.info.courseName === relation.courseName && c.info.teacher === relation.teacher && c.info.student === relation.student);
  //     this.relationsToFulfill[i] = relation.classPerWeek - plannedClasses.length;
  //   }
  // }

  updateDisplayDataCopy() {
    this.displayDataCopy = JSON.parse(JSON.stringify(this.displayData));
    console.log(this.displayDataCopy);
  }

  savePreviousIndex(c: DisplayElement) {
    console.log(c)
    let dayIndex = 0;
    for (let classOfaDay of this.displayDataCopy) {
      let index = classOfaDay.findIndex(d => d._id === c._id);
      if (index >= 0) {
        this.previousIndex = index;
        break;
      }
      dayIndex++;
    }
    console.log(dayIndex, this.previousIndex);
  }

  backwardOneWeek() {
    this.weekOffset--;
    this.initDisplayData();
  }

  forwardOneWeek() {
    this.weekOffset++;
    this.initDisplayData();
  }
}
