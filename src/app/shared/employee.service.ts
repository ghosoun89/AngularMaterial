import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private firebase:AngularFireDatabase) { }

  employeeList: AngularFireList<any>;
  // to use this form we should enject it inside app.module.ts
  //then to use it inside employee.html we should import employee servce
  // inside employee.component.ts
  form= new FormGroup({
    // this a unique key to identify each employee
    $key:new FormControl(null), 
    fullName:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    mobile:new FormControl('',[Validators.required, Validators.minLength(8)]),
    city:new FormControl(''),
    gender:new FormControl('1'),
    department:new FormControl(0),
    hireDate:new FormControl(''),
    isPermanent:new FormControl(false)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      fullName:"",
      email:"",
      mobile:"",
      city:"",
      gender:"1",
      department:0,
      hireDate:"",
      isPermanent:false


    })
  }

  // before doning any thing we should initialize get employee
  //before delete or iinsert...
  getEmployee(){
    //thie employees will be insid the database
    this.employeeList= this.firebase.list('employees');
    //make an observes
    return this.employeeList.snapshotChanges()
  }

  // insert function
  insertEmployee(employee){
    this.employeeList.push({
      fullName:employee.fullName,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hireDate:employee.hireDate,
      isPermanent:employee.isPermanent
    })
  }

  //update function
  updateEmployee(employee){
    this.employeeList.update(employee.$key,{
      fullName:employee.fullName,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hireDate:employee.hireDate,
      isPermanent:employee.isPermanent
    })
  }

  deleteEmployee($key: string){
    this.employeeList.remove($key)
  }

//function to edit info of employee
//call the form which has the values and set it to 
//  info of the same employee in the row
  popuLateForm(employee) {
    this.form.setValue(employee)
  }
}
