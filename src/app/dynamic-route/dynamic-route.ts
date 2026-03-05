import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dynamic-route',
  imports: [RouterLink],
  templateUrl: './dynamic-route.html',
  styleUrl: './dynamic-route.css',
})
export class DynamicRoute {
  employees =[
    {empId : 1, empName : 'Mani', empDept :'CSE'},
    {empId : 2, empName : 'Sundar', empDept :'PT'},
    {empId : 3, empName : 'Ram', empDept :'civil'},
    {empId : 4, empName : 'Bala', empDept :'Mech'},
    {empId : 5, empName : 'Venkat', empDept :'EEE'},
    {empId : 6, empName : 'Kumar', empDept :'ECE'},
  ]
}
