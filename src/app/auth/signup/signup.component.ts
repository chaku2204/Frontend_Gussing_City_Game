import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  signup_error = null;

  constructor(private fb: FormBuilder,private signupservice: CommonService,private router: Router,private snackBar: MatSnackBar ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      username:['']
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let body =  this.signupForm.value;
      this.signupservice.signup(body).subscribe((data)=>{
        console.log(data);
        if(data?.message){
          this.snackBar.open(data?.message, 'Close', {
            duration: 10000, // Closes after 3 seconds
            verticalPosition: 'top',
            horizontalPosition: 'center', panelClass: ['custom-snackbar']});
        }
        
        this.router.navigate(['/auth/login']); 
      },(err)=>{
        this.signup_error = err.error? err?.error:"";
        
      })
    
  }
}
}
