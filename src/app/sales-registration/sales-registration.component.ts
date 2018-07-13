import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { SalesService } from '../sales/sales.service';

@Component({
  selector: 'app-sales-registration',
  templateUrl: './sales-registration.component.html',
  styleUrls: ['./sales-registration.component.css']
})
export class SalesRegistrationComponent implements OnInit {

  sale: any;
  item: any;
  customers: Array<any>;
  products: Array<any>;
  @Output() saleSaved = new EventEmitter();

  constructor(private salesService: SalesService, private messageService: MessageService) { }

  ngOnInit() {
    this.salesService.listCustomers().subscribe(response => this.customers = response);

    this.salesService.listProducts().subscribe(response => this.products = response);

    this.newSale();
  }

  newSale() {
    this.sale = { items: [], freight: 0.0, total: 0.0 };
    this.item = {};
  }

  addItem() {

    this.item.total = (this.item.product.value * this.item.amount);

    this.sale.items.push(this.item);

    this.item = {};

    this.calculateTotal();
  }

  calculateTotal() {
    const totalItems = this.sale.items.map(i => (i.product.value * i.amount))
      .reduce((total, v) => total + v, 0);

    this.sale.total = totalItems + this.sale.freight;
  }

  saveSale(frm: FormGroup) {
    this.salesService.saveSale(this.sale).subscribe(response => {
      frm.reset();

      this.newSale();

      this.messageService.add({ severity: 'success', detail: 'Venda salva com sucesso.' });

      this.saleSaved.emit(response);
    });
  }
}
