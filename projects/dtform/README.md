# Data Template Form
It is an angular component that allows the end-user to interactively create and modify forms, saving them as a template. 
This code is derived from the project [Data Template](https://www.data-templates.org/) and it is based on  [ngx-formly](https://github.com/ngx-formly/ngx-formly).

![-](../../example.gif)


# Get Started

## Installation

At the moment, dtform works only with the material style. 
### 1 - install material libraries
ng add @angular/material

### 2 - install ngx-formly
npm install @angular/forms @ngx-formly/core @ngx-formly/material --save

ng add @ngx-formly/schematics@next 

### 3 - install Data Template Form:
npm install dtform

### 4 - import the angular material, ngx-formly and dtform modules.

```
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormlyModule } from '@ngx-formly/core';
import { DTFormModule } from 'dtform';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,

    // Material Modules
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,

    // Formly Module
    FormlyModule.forRoot(),

    // Data Template Form Module
    DTFormModule,

  ],
  ...
})
export class AppModule { }
```

### 5 - Add the dtform-templates style file to angular.json.

```  
          ...
          "architect": {
            "build": {
              "builder": "@angular-devkit/build-angular:browser",
              "options": {
                ...
                "styles": [
                  "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
                  "./node_modules/dtform/assets/dtform-templates.scss",
                  "src/styles.scss"
                ],
                "scripts": []
              },
              ...

```


# How to use

```JavaScript
import { Component } from '@angular/core';
import { FormlyField } from '@ngx-formly/core';
import { DTFormElement } from 'dtform';

@Component({
  selector: 'app-root',
  template: `
                  <!--  [fields]          form template definition (JSON)-->
                  <!--  [model]           form data (JSON) -->
                  <!--  (fieldsUpdate)    Changes on the form template -->
                  <!--  [layoutReadonly]  Define if user can modify form template -->
                  <!--  [readonly]        Define if user can modify form data -->
                  <!--  [formWidth]       Required, form width must be defined -->

                  <p> Double click to modify form element. </p>
         
                  <dt-form    [model]="model" [fields]="fields"  
                              (modelChange)="onModelChange($event)" 
                              [fields]="fields"
                              (fieldsUpdate)="onFieldsUpdate($event)"   
                              [layoutReadonly]="false"                  
                              [readonly]="false"                         
                              [formWidth]="'600px'"                    
                              >
                  </dt-form>
  	     
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public data: string = '';
  public model = {};
  public fields: any[] = [];

  constructor() {
    this.onAddField('h1');
    this.onAddField('input-full');
    this.onAddField('input-half');
    this.onAddField('input-quarter');
    this.onAddField('input-quarter');
    this.onAddField('newline');
    this.onAddField('checkbox');
  }
  onFieldsUpdate(fields: FormlyField[]) {
    this.fields = fields;
  }

  onAddField(fieldType: string) {
    const dtField = new DTFormElement(fieldType);
    this.fields.push(dtField);
    this.fields = [...this.fields];
  }

  onModelChange(data: any) {}


}

```


**Which Version to use?**

| Angular version | Formly version         | DT Form     |
| --------------- | ---------------------- |-------------|
| Angular >= 13   | `@ngx-formly/core@6.x` | `dtform@1.x`|
| Angular >= 11   | `@ngx-formly/core@5.x` | `---`| 

### Contributing

Help to improve this package.

### Authors 

*   C. E. Viol Barbosa


### License

This project is licensed under the Apache License
