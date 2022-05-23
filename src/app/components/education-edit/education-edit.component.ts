import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Education } from 'src/app/models/Education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {
  educationForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() education: Education;


  constructor(private educationService: EducationService, private formBuilder: FormBuilder, private parserFormatter: NgbDateParserFormatter) {
    this.education = new Education()
  }

  ngOnInit(): void {

    this.educationForm = this.formBuilder.group({
      title: [this.education.title, [Validators.required]],
      institute: [this.education.institute, [Validators.required]],
      startDate: [this.education.startDate !== null ? {
        year: this.education.startDate!.getFullYear(),
        month: this.education.startDate!.getMonth() + 1,
        day: this.education.startDate!.getDate(),
      } : null, [Validators.required]],
      endDate: [this.education.endDate !== null ? {
        year: this.education.endDate!.getFullYear(),
        month: this.education.endDate!.getMonth() + 1,
        day: this.education.endDate!.getDate(),
      } : null, []],
      image: [this.education.image, []]
    })
  }

  onSubmit() {

    if (this.educationForm.invalid) {
      alert('Invalid input');
      return;
    }
    if (this.educationForm.get("endDate")!.value !== null) {
      this.educationForm.patchValue({
        endDate: this.parserFormatter.format(this.educationForm.get("endDate")!.value)
      })
    }
    this.educationForm.patchValue({
      startDate: this.parserFormatter.format(this.educationForm.get("startDate")!.value),

    })

    this.educationService.updateEducation(this.education.id, this.educationForm.getRawValue()).subscribe({
      next: data => { alert("The experience was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })

    this.onCloseEdit()
  }
  onCloseEdit() {
    this.onShowDetails.emit()
  }



  onImageEducationUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.educationForm.controls['image'].setValue(reader.result as string)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  get m() {
    return this.educationForm!.controls;
  }

}
