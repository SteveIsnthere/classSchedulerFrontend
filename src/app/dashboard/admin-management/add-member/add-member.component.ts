import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {
  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  name = this.firstFormGroup.get('nameCtrl');
  isEditable = false;

  constructor(private _formBuilder: FormBuilder) {}
}
