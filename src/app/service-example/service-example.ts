import { Component } from '@angular/core';
import { Employee } from '../dependencies/employee';

@Component({
  selector: 'app-service-example',
  imports: [],
  templateUrl: './service-example.html',
  styleUrl: './service-example.css',
})
export class ServiceExample {

  employees : any[];
  empId : number =0;
  emp : any;

  constructor(private empService : Employee){
    this.employees = this.empService.getEmployees();
  }

  showDetails (employeeId : number){
    this.empId = employeeId;
    this.emp = this.empService.getEmployeesById(employeeId);
  }

}
