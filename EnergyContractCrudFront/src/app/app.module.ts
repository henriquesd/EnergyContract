import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
 
import { AppComponent } from './app.component';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { ContractComponent } from './contract/contract.component';
import { ContractService } from './shared/contract.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ContractComponent,
    ContractListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ContractListComponent },
      { path: 'contract', component: ContractComponent },
      { path: 'contract/:id', component: ContractComponent },
    ])
  ],
  providers: [ContractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
