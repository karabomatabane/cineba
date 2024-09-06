import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-list-form',
  templateUrl: './dialog-list-form.component.html',
  styleUrls: ['./dialog-list-form.component.css']
})
export class DialogListFormComponent implements OnInit {
  viewListForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: NbDialogRef<DialogListFormComponent>,
  ) {
    this.viewListForm = this.formBuilder.group({
      private: [false, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.maxLength(120)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.viewListForm.invalid) {
      // Handle invalid form submission (e.g., show error messages).
      console.error('Invalid form');
      return;
    }
    // Form is valid, you can send the viewList data to the parent component.
    const viewListData = this.viewListForm.value;
    this.dialogRef.close(viewListData); // Pass the vieList data to the parent component
  }

  onCancel() {
    this.dialogRef.close();
  }

}
