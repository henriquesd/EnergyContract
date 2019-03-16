import { Injectable } from '@angular/core';
import { Contract } from './contract.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  formData: Contract
  readonly rootURL = 'http://localhost:22253/api';
  list: Contract[];
  listComplet: Contract[];

  constructor(private http: HttpClient) { }

  postContract() {
    return this.http.post(this.rootURL + '/Contracts', this.formData);
  }
  putContract() {
    return this.http.put(this.rootURL + '/Contracts/'+ this.formData.Id, this.formData);
  }
  deleteContract(id) {
    return this.http.delete(this.rootURL + '/Contracts/'+ id);
  }

  async getContracts(){
    await this.http.get(this.rootURL + '/Contracts')
    .toPromise()
    .then(res => this.list = res as Contract[]);
      this.list.forEach(element => {
        if (this.list.find(contract => contract.Id === element.Id).Type.toString() == "1")
          this.list.find(contract => contract.Id === element.Id).Type = "Compra";
        else
          this.list.find(contract => contract.Type.toString() === "2").Type = "Venda";  
      });
      this.listComplet = this.list;
  }

  search(value){
    debugger;
    this.list = this.listComplet.filter(
            contract => contract.ClientName.toLowerCase().startsWith(value, 0) ||
            contract.Type.toLowerCase().startsWith(value, 0) ||
            contract.Quantity.toString().startsWith(value, 0) ||
            contract.Amount.toString().startsWith(value, 0) ||
            contract.Month.toString().startsWith(value, 0) ||
            contract.Year.toString().startsWith(value, 0) ||
            contract.DurationMonths.toString().startsWith(value, 0));
  }

  getContractById(id){
    this.http.get(this.rootURL + '/Contracts/' + id)
    .toPromise()
    .then(res => this.formData = res as Contract);
  }
}
