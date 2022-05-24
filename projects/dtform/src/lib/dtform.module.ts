import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { dtformComponent } from './dtform.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlySubsectionComponent, FormlyInputComponent, FormlyH1Component, FormlyTextareaComponent, FormlyCheckboxComponent, FormlyNewLineComponent } from './custom-formly-components/custom-formly.component';



// modules necessary for the customization of material form components
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    dtformComponent,
    FormlySubsectionComponent,
    FormlyH1Component,
    FormlyInputComponent,
    FormlyTextareaComponent,
    FormlyCheckboxComponent,
    FormlyNewLineComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {name: 'input', component: FormlyInputComponent,  wrappers: []},
        {name: 'h1', component: FormlyH1Component},
        {name: 'h2', component: FormlySubsectionComponent},
        {name: 'textarea', component: FormlyTextareaComponent, wrappers: []},
        {name: 'checkbox', component: FormlyCheckboxComponent, wrappers: []},
        {name: 'newline', component: FormlyNewLineComponent},
     ]}),
    FormlyMaterialModule,
    FormlyMaterialModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [
    dtformComponent
  ]
})
export class DTFormModule { }
