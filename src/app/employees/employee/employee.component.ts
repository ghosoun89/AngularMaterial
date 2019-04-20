import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service:EmployeeService,  notification:NotificationService) { }

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
    // this.notification.success(':: submitted succesfuly')

  }

  onSubmit(){
    if(this.service.form.valid){
      this.service.insertEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
    }
  }

}
