import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/shared/contract.service';
import { ToastrService } from 'ngx-toastr';
import { Contract } from 'src/app/shared/contract.model';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  constructor(private service: ContractService,
    private toastr: ToastrService,
    private router: Router) { }

    public searchTerm: string;

  ngOnInit() {
    this.service.getContracts();
  }

  addContract() {
    this.router.navigateByUrl('/contract');
  }

  deleteContract(Id) {
    if (confirm('Você realmente deseja remover este contrato?')) {
      this.service.deleteContract(Id)
        .subscribe(res => {
          this.service.getContracts();
          this.toastr.warning('O contrato foi deletado', 'Registro excluído');
        },
          err => {
            console.log(err);
          })
    }
  }

  editContract(Id){
    if (Id != null && Id != "")
      this.router.navigateByUrl('/contract/' + Id);
  }

  base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }

 saveByteArray(reportName, byte) {
    var blob = new Blob([byte], {type: "application/pdf"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  };

  downloadPdf(pdfFile) {
    if (pdfFile != null) {
      var pdf = this.base64ToArrayBuffer(pdfFile);
      this.saveByteArray("Contrato.pdf", pdf);
    } else {
      this.toastr.warning('Não há um contrato anexado a reste registro', 'Atenção');
    }
  }

  search() {
    this.service.search(this.searchTerm.toLowerCase());
  }
}
