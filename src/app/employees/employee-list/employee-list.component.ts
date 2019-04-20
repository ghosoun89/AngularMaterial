import { Component, OnInit, ViewChild } from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {MatTableDataSource, MatSort,MatPaginator} from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service:EmployeeService) { }
  listData: MatTableDataSource<any>
  //use displayedcolumns for render info in the tab
  displayedColumns : string[] = ['fullName','email','mobile','city','actions']
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild (MatPaginator) paginator:MatPaginator;
  searchKey: string;

// to git all the employees we call function from employee service
// and save the employees inside the array 
//then bring all the value through payload.val
  ngOnInit() {
    this.service.getEmployee().subscribe(
      list =>{
        let array = list.map(item =>{
          return{
            $key:item.key,
            ...item.payload.val()
          };
        })
        this.listData= new MatTableDataSource(array);
        //to connect listdata with sort proporety
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

    })
  }

  onSearch(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter= this.searchKey.trim().toLowerCase();
  }
}
