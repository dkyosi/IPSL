import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  debtors: Array<any> = [];

  next: any;
  previous: any;
  count: any;

  isFecthingDebtors: boolean = false;
  fetchDebtorsError: string = "";

  searchTerm: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
