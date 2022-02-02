import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-draft-send',
  templateUrl: './draft-send.component.html',
  styleUrls: ['./draft-send.component.css']
})
export class DraftSendComponent implements OnInit {
  formValues: any;

  constructor(private service: SharedServiceService) { }

  ngOnInit(): void {
    this.service.formData.subscribe((data) => {
      this.formValues = data; // And he have data here too!
      // console.log(this.formValues)
    });
  }

}
