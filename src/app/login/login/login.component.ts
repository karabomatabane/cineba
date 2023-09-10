import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: NbToastrService,
    private router: Router
    ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  //custom validator for password match
  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const verifyPassword = formGroup.get('verifyPassword')?.value;

    if (password !== verifyPassword) {
      formGroup.get('verifyPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('verifyPassword')?.setErrors(null);
    }
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      // Handle invalid form submission (e.g., show error messages).
      console.error('Invalid form');
      return;
    }
    // Proceed with sign-up logic if the form is valid.
    console.log('Signing up:', this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (user : any) => {
        // login successful, you can redirect to home
        this.toastr.success('Login successful');
        this.router.navigate(['/']);
        this.authService.setVotes();
        this.authService.setToken(user.accessToken);
        console.log('Login successful');
      },
      (error) => {
        // login failed, you can display a message to user
        this.toastr.danger(error.error.message);
        console.error(error);
      }
    );
  }

  getValidationStatus(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.touched && control.invalid ? 'danger' : 'basic';
  }

}
