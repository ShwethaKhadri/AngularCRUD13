import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import{MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
   freshnessList=["Brand New","Second Hand","Refurbished"];
   productForm!:FormGroup;
  constructor(private formbuilder:FormBuilder,private api:ApiService,private dialogRef:MatDialogRef<DialogComponent>)
   {

  }

  ngOnInit(): void {
    this.productForm=this.formbuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      date:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required]


    })
  }
  addProduct()
  {
    if(this.productForm.valid)
    {
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>
        {
           alert("Product Added sucessfully");
           this.productForm.reset();
           this.dialogRef.close('save');
        },
        error:()=>
        {
          alert("Error While Adding the products")
        }

      })
    }
  }

}
