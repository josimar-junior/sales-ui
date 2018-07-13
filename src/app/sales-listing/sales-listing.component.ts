import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales/sales.service';

@Component({
  selector: 'app-sales-listing',
  templateUrl: './sales-listing.component.html',
  styleUrls: ['./sales-listing.component.css']
})
export class SalesListingComponent implements OnInit {

  sales: Array<any>;

  constructor(private salesService: SalesService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.salesService.listSales().subscribe(response => this.sales = response);
  }
}
