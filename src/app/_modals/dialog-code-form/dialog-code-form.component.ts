import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-code-form',
  templateUrl: './dialog-code-form.component.html',
  styleUrls: ['./dialog-code-form.component.css']
})
export class DialogCodeFormComponent implements OnInit {
codeForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: NbDialogRef<DialogCodeFormComponent>
  ) { 
    this.codeForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      daysValid: ['', [Validators.required, Validators.max(30)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.codeForm.invalid) {
      // Handle invalid form submission (e.g., show error messages).
      console.error('Invalid form');
      return;
    }
    // Form is valid, you can send the code data to the parent component.
    const codeData = this.codeForm.value;
    this.dialogRef.close(codeData); // Pass the code data to the parent component
  }

  onCancel() {
    this.dialogRef.close();
  }

}
