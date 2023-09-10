import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private toastr: NbToastrService,
    private router: Router
    ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  //custom validator for password match
  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }


  onSubmit() {
    if (this.signupForm.invalid) {
      // Handle invalid form submission (e.g., show error messages).
      console.error('Invalid form');
      return;
    }
    // Proceed with sign-up logic if the form is valid.
    console.log('Signing up:', this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe(
      () => {
        // Registration successful, you can redirect to login or do something else
        this.toastr.success('Registration successful');
        this.router.navigate(['/login']);
        console.log('Registration successful');
      },
      (error) => {
        // Handle registration error (e.g., duplicate username)
        this.toastr.danger(error.error.message);
        console.error('Registration error', error);
      }
    );
  }

  getValidationStatus(controlName: string) {
    const control = this.signupForm.get(controlName);
    return control?.touched && control.invalid ? 'danger' : 'basic';
  }
}
