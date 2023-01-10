import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Member} from "../../data/models/Member";
import {DataService} from "../../data/data.service";
import {dummyTeacher} from "../../data/models/dummyData";

@Component({
  selector: 'app-member-picker',
  templateUrl: './member-picker.component.html',
  styleUrls: ['./member-picker.component.css']
})
export class MemberPickerComponent {
  @Output() memberSelected = new EventEmitter<Member>();
  members: Member[] = [];

  displayingMembers: Member[] = [];

  displayTeachers: boolean = false;

  selectedMember: Member = dummyTeacher;

  constructor(public dataService: DataService) {
    this.dataService.getAllMembers().subscribe((data: Member[]) => {
      this.members = data;
      this.displayingMembers = data.filter(member => !member.isTeacher);
    })
  }


  toggleShowingTeachers() {
    this.displayTeachers = !this.displayTeachers;
    this.displayingMembers = this.displayTeachers ? this.members.filter(member => member.isTeacher) : this.members.filter(member => !member.isTeacher);
  }

  selectMember(member: Member) {
    this.selectedMember = member;
    this.memberSelected.emit(member);
  }

}
