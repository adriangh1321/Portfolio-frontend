import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { ContactInformationService } from 'src/app/services/contact-information.service';
import { urlOrWhitespace } from 'src/app/validators/UrlOrWhitespace';

@Component({
  selector: 'app-contact-info-edit',
  templateUrl: './contact-info-edit.component.html',
  styleUrls: ['./contact-info-edit.component.css']
})
export class ContactInfoEditComponent implements OnInit {
  @Input() contactInformation!: ContactInformation;
  @Output() onShowDetails = new EventEmitter()
  contactInformationForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private contactInformationService: ContactInformationService) {

  }

  ngOnInit(): void {
    this.contactInformationForm = this.formBuilder.group({
      phone: [this.contactInformation.phone, [Validators.required, Validators.pattern("^[(]{1}[0-9]+[)]{1}[0-9]+$")]],
      email: [this.contactInformation.email, [Validators.required, Validators.email]],
      linkedIn: [this.contactInformation.linkedIn == null ? "" : this.contactInformation.linkedIn, [urlOrWhitespace()]],
      remoteRepository: [this.contactInformation.remoteRepository == null ? "" : this.contactInformation.remoteRepository, [urlOrWhitespace()]]

    })
  }


  onSubmit() {
    if (this.contactInformationForm.invalid) {
      alert('Invalid input');
      return;
    }
    if ((this.contactInformationForm.get('linkedIn')?.value as string).trim().length == 0) {
      this.contactInformationForm.patchValue({
        linkedIn: null
      })
    }
    if ((this.contactInformationForm.get('remoteRepository')?.value as string).trim().length == 0) {
      this.contactInformationForm.patchValue({
        remoteRepository: null
      })
    }
    this.contactInformationService.updateContactInformation(this.contactInformation.id, this.contactInformationForm.getRawValue()).subscribe({
      next: data => { alert("The contact information was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
    this.onCloseEdit()
  }
  onCloseEdit() {
    this.onShowDetails.emit()
  }

  get m() {
    return this.contactInformationForm.controls;
  }

}