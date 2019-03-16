import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from 'src/app/shared/contract.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  public pdfFile: any;

  constructor(private service: ContractService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    
    if (id != null)
      this.service.getContractById(id);
    else
      this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();

    this.service.formData = {
      Id: 0,
      ClientName: null,
      Quantity: null,
      Amount: null,
      Month: null,
      Year: null,
      Type: '',
      DurationMonths: null,
      PdfFile: null
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.PdfFile != null)
    {
      let pdf = this.service.formData.PdfFile.replace('data:application/pdf;base64,', '');
      this.service.formData.PdfFile = pdf;
    }
      
    if (this.service.formData.Id == 0)
      this.post(form);
    else
      this.update(form);
  }

readUploadedFile = (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

  async saveFile(file) {
    const fileContent = await this.readUploadedFile(file[0]);
    if (fileContent != undefined)
      this.service.formData.PdfFile = fileContent;

      this.service.formData.PdfFile.replace('data:application/pdf;base64,', '');
  }
  
  post(form: NgForm) {
    this.service.postContract().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Contrato Salvo com sucesso', 'Registro Salvo');
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err);
      }
    )
  }
  
  update(form: NgForm) {
    this.service.putContract().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Registro editado com sucesso', 'Registro Atualizado');
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err);
      }
    )
  }

  returnToList() {
    this.router.navigateByUrl('');
  }

}
