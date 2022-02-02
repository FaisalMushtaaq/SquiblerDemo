import { Component } from '@angular/core';
import 'quill-mention';
import 'quill-emoji';
import { SharedServiceService } from './shared-service.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  profileForm = this.fb.group({
    firstName: ['',Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    })
  });

  htmlText =""
  hasFocus = false;
  subject: string;
  dictData;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]

  quillConfig={
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean'],                                         // remove formatting button
        ['link'],
      ],
      
    },

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        let values;

        if (mentionChar === "@") {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }
        
        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
    keyboard: {
      bindings: {
        enter:{
          key:13,
          handler: (range, context)=>{
            console.log("enter");
            return true;
          }
        }
      }
    }
  }
  formValues: string;

  constructor(
    private service: SharedServiceService,
    private fb: FormBuilder,
    private router: Router
   ){

  }

  onSubmit() {
    let model = this.profileForm.value
    this.service.sendFormData(model); 
    this.router.navigate(['/sent']);
  }

  test=(event)=>{
    console.log(event.keyCode);
  }

  onSelectionChanged = (event) =>{
     if(event.range != null){
        let length =  parseInt(event.range.index) + parseInt(event.range.length)+ 3;
        var word = this.htmlText.substring(event.range.index + 3, length);
        this.getData(word);
    }
  }

  onContentChanged = (event) =>{
    //console.log(event.html);
  }

  onFocus = () =>{
    console.log("On Focus");
  }
  onBlur = () =>{
    console.log("Blurred");
  }

  getData(word){
    this.service.getDictonaryData(word).subscribe(
      data => {
          this.dictData = data;
          // console.log(this.dictData);
      } ,
      error => {
          console.log("some error occured");
          console.log(error.errorMessage);
      }
  );
  }
}
