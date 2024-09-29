import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Member } from 'src/app/_models/list.model';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {
  @Input() members: Member[] = [];
  editableMembers: Member[] = [];
  constructor(public dialogRef: NbDialogRef<ManageMembersComponent>) { }

  ngOnInit(): void {
    this.editableMembers = this.members.filter((member) => member.status !== 'owner');
  }

  updateMember(id: string, status: string) {
    this.members = this.members.map((member) => {
      if (member.user.id === id) {
        member.status = status;
      }
      return member;
    });
  }

  removeMember(id: string) {
    this.members = this.members.filter((member) => member.user.id !== id);
  }

  onSubmit() {
    this.dialogRef.close(this.members);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
