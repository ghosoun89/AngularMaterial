import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service:EmployeeService,
    public dialogRef:MatDialogRef<EmployeeComponent>) { }

  departments=[
    {id:3, value:'Dep 1 '},
    {id:2, value:'Dep 2 '},

    {id:3, value:'Dep 3 '},

  ]

  ngOnInit() {
    this.service.getEmployee();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();

  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
      this.service.insertEmployee(this.service.form.value);
    }else{
      this.service.updateEmployee(this.service.form.value)
    }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }
//to close the popup
    onClose() {
     this.service.form.reset();
     this.service.initializeFormGroup();
     this.dialogRef.close();
    }
  

}
