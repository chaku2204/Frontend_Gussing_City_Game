import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDialog } from 'src/app/quiz/game/game.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  invalid = false;

  constructor(private fb: FormBuilder,private signupservice: CommonService,public dialog: MatDialog,private router: Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['username'] && params['score']) {
         const username = params['username'];
        const score = (params['score']);
        this.dialog.open(ShareDialog, {
          data: { "username": username, "score": score},disableClose: true
        });
        return;
      }

    });
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onLogin() {
   
    if (this.loginForm.valid) {
      const { identifier, password } = this.loginForm.value;

      // 🔐 Simulating authentication (Replace with real API)  
      this.signupservice.login(identifier,password).subscribe((data)=>{
        
        this.signupservice.saveToken(data?.token);
        this.router.navigate(['/quiz']); 
      },(error) => {
         this.invalid = true;
      })

     
    }
  }
}
