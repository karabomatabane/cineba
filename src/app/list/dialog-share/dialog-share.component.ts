import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToast, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.css']
})
export class DialogShareComponent implements OnInit {
  url : string = '';
  message : string = '';
  @Input() title: string = '';
  constructor(public dialogRef: NbDialogRef<DialogShareComponent>,
    private toastr: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.url = window.location.href;
    this.message = `Check out this view list on cineba: ${this.title}`;
  }

  copyLink() {
    const el = document.createElement('textarea');
    el.value = this.url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.toastr.success('Link copied to clipboard', 'Success');
  }

  shareOnFacebook() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
    window.open(shareUrl, '_blank');
  }

  shareOnTwitter() {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.url)}&text=${encodeURIComponent(this.message)}`;
    window.open(shareUrl, '_blank');
  }

  shareOnWhatsApp() {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.message)} ${encodeURIComponent(this.url)}`;
    window.open(shareUrl, '_blank');
  }

  shareOnSignal() {
    this.copyLink();
    const shareUrl = `sgnl://send?text=${encodeURIComponent(this.message)} ${encodeURIComponent(this.url)}`;
    window.open(shareUrl, '_blank');
  }

  onCancel() {
    this.dialogRef.close();
  }

}
