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
  markedMembersNames: string[] = [];
  displayingMembers: Member[] = [];
  displayTeachers: boolean = false;
  selectedMember: Member = dummyTeacher;

  constructor(public dataService: DataService) {
    this.dataService.getAllMembers().subscribe((data: Member[]) => {
      this.members = data;
      dataService.getMarkedMembers().subscribe(
        (markedMembers: string[]) => {
          this.markedMembersNames = markedMembers;
        }
      )
      this.displayingMembers = data.filter(member => !member.isTeacher);
    })
  }


  toggleShowingTeachers() {
    this.displayTeachers = !this.displayTeachers;
    this.displayingMembers = this.displayTeachers ? this.members.filter(member => member.isTeacher) : this.members.filter(member => !member.isTeacher);
  }

  isMemberSelected() {
    return this.selectedMember !== dummyTeacher;
  }

  selectMember(member: Member) {
    if (!this.isMemberSelected()) {
      //put member at the top of the list
      this.displayingMembers = this.displayingMembers.filter(m => m !== member);
      this.displayingMembers.unshift(member);
    }
    this.selectedMember = member;
    this.memberSelected.emit(member);
  }

  isMemberMarked(member: Member) {
    return this.markedMembersNames.includes(member.nickname);
  }

  markMember(member: Member) {
    this.dataService.markMember(member.nickname).subscribe(
      () => {
        this.markedMembersNames.push(member.nickname);
      }
    )
  }

  unmarkMember(member: Member) {
    this.dataService.unMarkMember(member.nickname).subscribe(
      () => {
        this.markedMembersNames = this.markedMembersNames.filter(name => name !== member.nickname);
      }
    );
  }

  markAllMembers() {
    for (let member of this.displayingMembers.filter(member => !this.isMemberMarked(member))) {
      this.dataService.markMember(member.nickname).subscribe();
    }
    this.markedMembersNames = this.displayingMembers.map(member => member.nickname);
  }

  unmarkAllMembers() {
    for (let member of this.markedMembersNames) {
      this.dataService.unMarkMember(member).subscribe();
    }
    this.markedMembersNames = [];
  }

}
