import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToast, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-dialog-comment',
  templateUrl: './dialog-comment.component.html',
  styleUrls: ['./dialog-comment.component.css']
})
export class DialogCommentComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: NbDialogRef<DialogCommentComponent>,
    private toastr: NbToastrService
  ) {
    this.commentForm = this.formBuilder.group(
      { comment: ['', [Validators.maxLength(120)]], }
    );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      // Handle invalid form submission (e.g., show error messages).
      this.toastr.danger('Invalid form', 'Error');
      return;
    }
    // Form is valid, you can send the review data to the parent component.
    const comment = this.commentForm.value;
    this.dialogRef.close(comment); // Pass the review data to the parent component
  }

  onCancel() {
    this.dialogRef.close();
  }

}
