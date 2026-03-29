import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  private employees = [
    {
      id: 1,
      name: "mani",
      age: '25',
      place: 'Hyderabad'
    },
    {
      id: 2,
      name: "chenna kesav rao",
      age: '52',
      place: 'delhi'
    },
    {
      id: 3,
      name: "mohan ranga",
      age: '28',
      place: 'Hyderpalce'
    },
    {
      id: 4,
      name: "sundar",
      age: '2',
      place: 'Chennai'
    }
  ]

  getEmployees(){
    return this.employees;
  }

  getEmployeesById(id : number) { return this.employees.find((emp)=>(emp.id === id));};

  
}
