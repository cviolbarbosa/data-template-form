import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { FormlyFormOptions, FormlyField, FormlyConfig, FormlyFieldConfig as FG } from '@ngx-formly/core';
import * as loadash from 'lodash';
import { Subscription } from 'rxjs';
import { fieldEmitterService } from './custom-formly-components/custom-formly.component';
import { deleteObjectByIdAndMutateArray, getIndexById, getObjectById, slugify } from './utils';
import Swal, { SweetAlertResult } from 'sweetalert2';


export class ClassFormlyFormOptions implements FormlyFormOptions {}
export class ClassFormlyConfig implements FG {}

export class SDKFormlyFormOptions extends ClassFormlyFormOptions {
  selected?: boolean = false;
  formState?: any;
}
export class SDKFormlyFieldConfig extends ClassFormlyConfig {
 selected?: boolean = false;
}

export const FormlyFieldConfig = SDKFormlyFieldConfig;


@Component({
  selector: 'dt-form',
  templateUrl: './dtform.component.html',
  styleUrls: [ './dtform.component.scss']
})
export class dtformComponent implements OnInit , OnChanges, OnDestroy {
  @Input() fields: FormlyField[];
  @Input() form: FormGroup;
  @Input() readonly: boolean;
  @Input() layoutReadonly: boolean;
  @Input() model: any;
  @Input() keyNames: string[];
  @Input() options: SDKFormlyFormOptions = {};
  @Input() formWidth: string = '500px';
  @Output() submit = new EventEmitter <any> ();
  @Output() fieldsUpdate = new EventEmitter <any> ();
  @Output() modelChange = new EventEmitter <any> ();

  public templateFields: any;
  public subscription: Subscription;
  private keyNamesHTML: string;


  constructor() { 
    this.subscription = fieldEmitterService.subscribe(msg => this.onFieldUpdates(msg), () => {}, () => {});
  }

  
  ngOnInit(): void {
    if (this.layoutReadonly === undefined) { this.layoutReadonly = this.readonly; }
    this.loadFormly();
    if (this.keyNames && this.keyNames.length ) {
      this.keyNamesHTML =  this.keyNames.filter(key => !key.startsWith('_')).map(key => `<p>${key}</p> `).join('');
      this.keyNamesHTML =  '<div style="overflow-y:scroll; font-size:13px!important; max-height:150px">' + this.keyNamesHTML + '</div>';
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(obj) {
    if (obj.fields || obj.readonly) {
      this.loadFormly();
    }
  }

  loadFormly() {
    this.templateFields = this.fields;
    this.templateFields = this.setReadonly(this.templateFields, this.readonly, this.layoutReadonly);
  }

  setReadonly(templateFields, readonly: boolean, layoutReadonly: boolean | null = null) {
    type Writable<T> = { -readonly [k in keyof T]: T[k] };
    if (layoutReadonly === null) {layoutReadonly = readonly; }

    if (!templateFields) { return; }
    return templateFields.map(field => {
            if (!field) { return; }
            const f: Writable<any> =  JSON.parse(JSON.stringify(field));
            if (!f.templateOptions) {field.templateOptions = {}; }
            f.templateOptions['readonly'] = readonly;
            if (layoutReadonly) { f.selected = false; }
            return f;
          });
  }

  onModelChange(ev) {
    this.modelChange.emit(ev);
  }



  onFieldUpdates(change) {
    if (this.layoutReadonly === undefined) { this.layoutReadonly = this.readonly; }
    let field;
    let fieldIndex: number;
    let fieldDisplaced;
    const clonedFields = loadash.cloneDeep(this.templateFields);

    let swalLabel: string;
    let updateKey: boolean;
    let optionAvailable: boolean = false;
    const self = this;

    if (this.layoutReadonly) { return; }

    switch (change.action) {
      case 'select':
        this.templateFields.forEach( f => {
          if (f.id === change.id) {
            f.selected = !f.selected;
          } else {
            f.selected = false;
          }
        });
        return;
        break;

      case 'delete':
        deleteObjectByIdAndMutateArray(clonedFields, change.id);
        break;

      case 'moveUp':
        fieldIndex = getIndexById(clonedFields, change.id);
        if (fieldIndex === 0) { return; }
        fieldDisplaced = clonedFields[fieldIndex - 1];
        clonedFields[fieldIndex - 1] = clonedFields[fieldIndex];
        clonedFields[fieldIndex] = fieldDisplaced;
        break;

      case 'moveDown':
        fieldIndex = getIndexById(clonedFields, change.id);
        if (fieldIndex === clonedFields.length - 1) { return; }
        fieldDisplaced = loadash.cloneDeep(clonedFields[fieldIndex + 1]);
        clonedFields[fieldIndex + 1] = clonedFields[fieldIndex];
        clonedFields[fieldIndex] = fieldDisplaced;
        break;

      case 'format':
        if (['lbInput', 'input', 'lbTextarea', 'textarea', 'lbCheckbox'].indexOf(change.type) > -1) {
          swalLabel = 'Properties';
          updateKey = true;
          optionAvailable = ['lbInput', 'input'].indexOf(change.type)  > -1 ;
        } else {
          swalLabel = 'Enter text';
        }

        const label = change.templateOptions.label;
        const unit = change.templateOptions.unit ? change.templateOptions.unit : '' ;
        const options = change.templateOptions.options ? change.templateOptions.options.map(o => o.name).join('\n') : '';

        let swalPromise;
        if (optionAvailable) {
                swalPromise = (Swal as any).fire({
                  title: swalLabel,
                    html:
                  `<div style="text-align: start;">Label: <input  maxlength=255 value="${label}" id="swal-input1" class="swal2-input"></div>` +
                  `<div style="text-align: start;">Unit: <input  maxlength=255   value="${unit}" id="swal-input2" class="swal2-input"></div>` +
                  `<div style="text-align: start;">` +
                  `Allowed values: <textarea style="height:5em" id="swal-input3" class="swal2-input">${options}</textarea></div>`
                  ,
                  inputValue: change.templateOptions.label,
                  showCancelButton: true,
                  preConfirm:  () => {
                      return new Promise(function (resolve) {
                              resolve([
                                (document.getElementById("swal-input1") as HTMLInputElement).value,
                                (document.getElementById("swal-input2") as HTMLInputElement).value,
                                (document.getElementById("swal-input3") as HTMLInputElement).value,
                              ]);
                        });
                  },
                  inputValidator: (value) => {
                    return !value && 'This field cannot be empty!';
                  }
                });
        } else {
                swalPromise = (Swal as any).fire({
                    title: swalLabel,
                    input: 'text',
                    inputValue: change.templateOptions.label,
                    showCancelButton: true,
                    inputValidator: (value) => {
                      return !value && 'This field cannot be empty!';
                    }
                });
        }


        swalPromise.then((r: SweetAlertResult) => {
                if (r) {
                    let fieldLabel = change.type + Math.round(Math.random() * 100).toString();
                    field = getObjectById(this.templateFields, change.id);
                    if (!field) {
                      console.error( `field ${change.id} disappeared` );
                    } else {
                      if (r.value) {
                          if (typeof r.value === 'string' || r.value instanceof String) {
                            fieldLabel = r.value.toString();
                            field.templateOptions.label = fieldLabel;
                          } else {
                            fieldLabel = r.value[0].toString();
                            field.templateOptions.label = fieldLabel;
                            if (r.value[1]) {
                              field.templateOptions.unit = r.value[1];
                            }
                            if (r.value[2]) {
                                const optionNames = r.value[2].split('\n');
                                field.templateOptions.options = optionNames.map(o => ({name: o, value: o}));
                            } else {
                              field.templateOptions.options = null;
                            }
                          }
                      }
                      field['selected'] = false;
                      if (updateKey && !field.isCustomKey) {field.key = slugify(fieldLabel); }
                    }
                    self.fieldsUpdate.emit(this.templateFields);
                }
          });
          break;

      case 'advanced':
          if (['lbInput', 'input', 'lbTextarea', 'textarea', 'checkbox', 'lbCheckbox'].indexOf(change.type) > -1) {
            swalLabel = 'Label';
            updateKey = true;
          } else {
             swalLabel = 'Enter text';
          }

          field = getObjectById(this.templateFields, change.id);

          (Swal as any).fire({
            title: 'Set JSON key',
            footer: '<div>' +
                  '<p>Do not use spaces, separate words with underscores ( _ ).</p> <p>Use dots (.) to define nesting: e.g. parent.child</p>' +
                    '</div>',
            html: this.keyNamesHTML,
            input: 'text',
            inputValue: field.key,
            showCancelButton: true,
            inputValidator: (value) => {
              return !value && 'This field cannot be empty!';
            }
            }).then((r: SweetAlertResult) => {
                  if (r) {
                      field = getObjectById(this.templateFields, change.id);
                      if (r.value) {
                        field.key = r.value;
                        field.isCustomKey = true;
                      }
                      self.fieldsUpdate.emit(this.templateFields);
                  }
            });

            break;


      default:
        break;
    }

    this.fieldsUpdate.emit(clonedFields);
  }



}
