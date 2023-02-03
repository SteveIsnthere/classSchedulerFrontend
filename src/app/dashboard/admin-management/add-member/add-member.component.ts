import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Member} from "../../../data/models/Member";
import {DataService} from "../../../data/data.service";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {

  name:string = '';
  nickname:string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  isTeacher: boolean = false;
  isEditable = false;
  submitted = false;

  constructor(private _formBuilder: FormBuilder, private dataService: DataService) {}
  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    nicknameCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  });
  secondFormGroup = this._formBuilder.group({
    emailCtrl: ['', [Validators.required, Validators.email]],
    phoneCtrl: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  });

  isNickNameTaken() {
    return false;
  }

  submit() {
    if (this.isNickNameTaken()){
      alert('Nickname is taken');
      return;
    }
    let member = {
      _id: '',
      name: this.name,
      nickname: this.nickname,
      email: this.email,
      phone: this.phone,
      password: this.password,
      isTeacher: this.isTeacher,
      about: '',
      noteToAdmin: '',
      courses: [],
      unableTimes: [],
      preferredTimes: []
    }
    this.dataService.createMember(member).subscribe(
      (data) => {
        this.submitted = true;
      }
    );
  }


  closeDialog() {
  }
}
