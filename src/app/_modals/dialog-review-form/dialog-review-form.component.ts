import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-dialog-review-form',
  templateUrl: './dialog-review-form.component.html',
  styleUrls: ['./dialog-review-form.component.css']
})
export class DialogReviewFormComponent implements OnInit {
  ratings = [1, 2, 3, 4, 5];
  reviewForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: NbDialogRef<DialogReviewFormComponent>,
  ) {
    this.reviewForm = this.formBuilder.group({
      rating: [null, [Validators.required, Validators.max(5)]],
      comment: ['', [Validators.maxLength(32)]],
    });
  }

  ngOnInit(): void {
  }

  updateRating(rating: number) {
    this.reviewForm.get('rating')?.setValue(rating);
  }

  onSubmit() {
    if (this.reviewForm.invalid) {
      // Handle invalid form submission (e.g., show error messages).
      console.error('Invalid form');
      return;
    }
    // Form is valid, you can send the review data to the parent component.
    const reviewData = this.reviewForm.value;
    this.dialogRef.close(reviewData); // Pass the review data to the parent component
  }

  onCancel() {
    this.dialogRef.close();
  }

}
