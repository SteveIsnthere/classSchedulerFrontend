import {Injectable} from '@angular/core';
import {Member} from "../../data/models/Member";
import {dummyTeacher} from "../../data/models/dummyData";
import {DataService} from "../../data/data.service";
import {Class} from "../../data/models/Class";
import {DisplayElement, getBlankDisplayElement} from "./DisplayElement";
import {toISOStr} from "../../helpers/helperFunctions";
import {Relation} from "../../data/models/Relation";

@Injectable({
  providedIn: 'root'
})
export class PlanningServiceService {
  member: Member = dummyTeacher;
  classes: Class[] = [];
  relations: Relation[] = [];
  relationsFulfillmentStatus: number[] = [];
  classesToAdd: DisplayElement[] = [];
  openingTime = 11;
  closingTime = 20;
  weekOffset = 0;
  datesInWeek: Date[] = []
  displayData: DisplayElement[][] = [[], [], [], [], [], [], []];

  readyToDisplay = false;


  constructor(private dataService: DataService) {
    // this.initDisplayData();
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
            this.initRelations();
            this.readyToDisplay = true;
          })
      });
  }

  initRelations() {
    this.dataService.getRelationsOfMember(this.member.nickname).subscribe(relations => {
      this.relations = relations;
      this.updateRelationsFulfillmentStatus()
    });
  }

  init(member: Member) {
    this.member = member;
    this.initDisplayData();
  }


  addAllClassesToDisplayData() {
    let classSortedByStartTime = this.classes.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
    for (let newClass of classSortedByStartTime) {
      this.addClassToDisplayData(newClass);
    }
  }

  addClassToDisplayData(newClass: Class) {
    // first, find the index of the day of the week of the new class monday = 0, sunday = 6
    let dayOfWeek = new Date(newClass.startTime).getDay() - 1;
    if (dayOfWeek === -1) {
      dayOfWeek = 6;
    }

    let classStartHour = new Date(newClass.startTime).getHours() + new Date(newClass.startTime).getMinutes() / 60;
    // check if the class can be inserted
    if (classStartHour < this.openingTime || classStartHour + newClass.duration > this.closingTime || this.getDayBlankTimeRemaining(this.displayData[dayOfWeek]) < newClass.duration) {
      console.error("class start time or duration is out of range, removed class: " + newClass.info.courseName + " " + newClass.startTime);
      this.dataService.deleteClass(newClass._id).subscribe();
      console.log(newClass.startTime);
      console.log(new Date(newClass.startTime));
      console.log(newClass);
    }

    let timeSupposedToPassBeforeClass = classStartHour - this.openingTime;
    let timePassedBeforeClass = 0;
    let cursorPosition = 0;
    while (timePassedBeforeClass < timeSupposedToPassBeforeClass && cursorPosition < this.displayData[dayOfWeek].length) {
      timePassedBeforeClass += this.displayData[dayOfWeek][cursorPosition].duration;
      cursorPosition++;
    }
    if (timePassedBeforeClass > this.closingTime - this.openingTime) {
      console.error("class start time is out of range after 1st check, removed class: " + newClass.info.courseName + " " + newClass.startTime);
      this.dataService.deleteClass(newClass._id).subscribe();
    }
    //insert into the displayData
    let newDisplayElement = this.classToDisplayElement(newClass);
    this.displayData[dayOfWeek].splice(cursorPosition, 0, newDisplayElement);
    this.removeBlankDisplayElementAfterClassMovedIn(this.displayData[dayOfWeek], cursorPosition);
    let timePassedBeforeClassAfterInsertion = 0;
    for (let i = 0; i < this.displayData[dayOfWeek].indexOf(newDisplayElement); i++) {
      timePassedBeforeClassAfterInsertion += this.displayData[dayOfWeek][i].duration;
    }
    let actualClassStartTime = this.openingTime + timePassedBeforeClassAfterInsertion - 8;
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

  updateClassesStartTimeInOneDay(newDisplayElementsList: DisplayElement[]) {
    let timePrecision_Day = this.datesInWeek[this.displayData.indexOf(newDisplayElementsList)];

    for (let i = 0; i < newDisplayElementsList.length; i++) {
      let newDisplayElement = newDisplayElementsList[i];
      if (newDisplayElement.isBlank) {
        continue;
      }
      let c = this.getClassByDisplayElement(newDisplayElement);
      let timePassedBeforeClass = 0;
      for (let n = 0; n < i; n++) {
        timePassedBeforeClass += newDisplayElementsList[n].duration;
      }
      // check if the time has changed
      let newStartTime = new Date(c.startTime);
      newStartTime = new Date(newStartTime.getTime());
      // set newStartTime's year, month, date to the timePrecision_Day
      newStartTime.setFullYear(timePrecision_Day.getFullYear());
      newStartTime.setMonth(timePrecision_Day.getMonth());
      newStartTime.setDate(timePrecision_Day.getDate());
      // set newStartTime's hour and minute
      newStartTime.setHours(this.openingTime + Math.floor(timePassedBeforeClass) - 8);
      newStartTime.setMinutes((timePassedBeforeClass - Math.floor(timePassedBeforeClass)) * 60);
      if (newStartTime.getTime() != new Date(c.startTime).getTime()) {
        c.startTime = toISOStr(newStartTime);
        this.dataService.updateClass(c._id, c).subscribe();
      }
    }
  }

  insertBlankDisplayElementAfterClassMovedOut(displayElementsList: DisplayElement[], oldIndex: number, c: DisplayElement) {
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
        } else {
          cursor--;
        }
      }
    }
  }

  changeClassPositionSameDay(displayElementsList: DisplayElement[], oldIndex: number, newIndex: number) {
    let c = displayElementsList[newIndex];
    let needToUpdateOtherClasses = false;
    if (newIndex < oldIndex) {
      for (let i = oldIndex - 1; i > newIndex; i--) {
        if (!displayElementsList[i].isBlank) {
          needToUpdateOtherClasses = true;
          break;
        }
      }
    } else {
      for (let i = oldIndex + 1; i < newIndex; i++) {
        if (!displayElementsList[i].isBlank) {
          needToUpdateOtherClasses = true;
          break;
        }
      }
    }
    if (needToUpdateOtherClasses) {
      this.insertBlankDisplayElementAfterClassMovedOut(displayElementsList, oldIndex, c);
      newIndex = displayElementsList.indexOf(c);
      this.removeBlankDisplayElementAfterClassMovedIn(displayElementsList, newIndex);
    }
    this.updateClassesStartTimeInOneDay(displayElementsList);
  }

  changeClassPositionDifferentDay(oldDisplayElementsList: DisplayElement[], newDisplayElementsList: DisplayElement[], oldIndex: number, newIndex: number) {
    let c = newDisplayElementsList[newIndex];
    //work on the old day
    this.insertBlankDisplayElementAfterClassMovedOut(oldDisplayElementsList, oldIndex, c);
    this.updateClassesStartTimeInOneDay(oldDisplayElementsList);
    //work on the new day
    this.removeBlankDisplayElementAfterClassMovedIn(newDisplayElementsList, newIndex);
    this.updateClassesStartTimeInOneDay(newDisplayElementsList);
  }

  // updatePreviewClassPositionSameDay(displayElementsList: DisplayElement[], newIndex: number) {
  //   let oldIndex = this.classLastPosition[1];
  //   let needToUpdateOtherClasses = false;
  //   console.log("oldIndex: " + oldIndex + " newIndex: " + newIndex);
  //   console.log(displayElementsList)
  //   if (oldIndex > newIndex) {
  //     for (let i = newIndex + 1; i <= oldIndex; i++) {
  //       console.log(displayElementsList[i]);
  //       if (!displayElementsList[i].isBlank) {
  //         needToUpdateOtherClasses = true;
  //         break;
  //       }
  //     }
  //   } else {
  //     for (let i = oldIndex; i <= newIndex - 1; i++) {
  //       console.log(displayElementsList[i]);
  //       if (!displayElementsList[i].isBlank) {
  //         needToUpdateOtherClasses = true;
  //         break;
  //       }
  //     }
  //   }
  //   if (needToUpdateOtherClasses && !this.addedBlankElements) {
  //     console.log("need to update other classes");
  //     this.insertBlankDisplayElementAfterClassMovedOut(displayElementsList, oldIndex, newIndex);
  //   }
  //
  // }

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

  updateRelationsFulfillmentStatus() {
    for (let i = 0; i < this.relations.length; i++) {
      let relation = this.relations[i];
      let supposedClassPerWeek = relation.classPerWeek;
      let plannedClasses = (this.classes.filter(c => c.info.courseName === relation.courseName));
      for (let c of plannedClasses) {
        // console.log(c);
      }
      this.relationsFulfillmentStatus[i] = supposedClassPerWeek - plannedClasses.length;
    }
    this.initClassesToAdd()
  }

  initClassesToAdd() {
    this.classesToAdd = [];
    for (let i = 0; i < this.relations.length; i++) {
      while (this.relationsFulfillmentStatus[i] > 0) {
        this.classesToAdd.push(this.relationToDisplayElement(this.relations[i]));
        this.relationsFulfillmentStatus[i]--;
      }
    }
  }

  addClassFromRelation(displayElementsList: DisplayElement[], newIndex: number) {
    this.removeBlankDisplayElementAfterClassMovedIn(displayElementsList, newIndex);
    if (newIndex > displayElementsList.length - 1) {
      newIndex = displayElementsList.length - 1;
    }
    let c = displayElementsList[newIndex];

    //get time past before the start of the class
    let timePrecision_Day = this.datesInWeek[this.displayData.indexOf(displayElementsList)];
    let hoursPast = 0;

    for (let i = 0; i < newIndex; i++) {
      hoursPast += displayElementsList[i].duration;
    }
    let timePrecision_Hour = Math.floor(hoursPast);
    let timePrecision_Minute = Math.floor((hoursPast - timePrecision_Hour) * 60);

    //get the time of the class
    let time = new Date(timePrecision_Day);
    time.setHours(timePrecision_Hour + this.openingTime - 8);
    time.setMinutes(timePrecision_Minute);

    let relation = this.relations.find(r => r.courseName === c.courseName);

    if (!relation) {
      console.error("relation not found");
      return
    }

    let newClass = {
      _id: Math.random().toString(36).substr(2, 9),
      startTime: toISOStr(time),
      duration: c.duration,
      finished: false,
      rating: 0,
      comment: "",
      isOnline: false,
      info: relation
    }

    this.dataService.createClass(newClass).subscribe(
      () => {
        this.classes.push(newClass);
      }
    )
  }

  relationToDisplayElement(relation: Relation): DisplayElement {
    let displayElement: DisplayElement = getBlankDisplayElement();
    displayElement.isBlank = false;
    displayElement._id = Math.random().toString(36).substr(2, 9);
    displayElement.duration = relation.duration;
    displayElement.teacher = relation.teacher;
    displayElement.courseName = relation.courseName;
    displayElement.student = relation.student;
    return displayElement;
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
