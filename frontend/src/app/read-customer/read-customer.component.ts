import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerApiService } from '../customer-api.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-customer',
  templateUrl: './read-customer.component.html',
  styleUrls: ['./read-customer.component.css']
})
export class ReadCustomerComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private service: CustomerApiService, private router: Router) { }
  errormsg:any;
  successmsg:any;
  readData: any;
  ngOnInit(): void {
    this.getAllData();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteCustomer(id:any){
    this.errormsg = null;
    this.successmsg = null;
    console.log('deleteID==>',id)
    this.service.deleteData(id).subscribe((res)=>{
    this.successmsg = res.message;
     setTimeout(() => {
      this.redirectTo('/read-customer');
    }, 850);   },

    (error: HttpErrorResponse)=>{
      this.errormsg = error;
    });
}
redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}
getAllData(){
  this.service.getAllData().subscribe((res) => {
    console.log(res, "res==>");
    this.readData = res;
    this.dtTrigger.next(this.readData);
    console.log(this.readData)
});
}
}

