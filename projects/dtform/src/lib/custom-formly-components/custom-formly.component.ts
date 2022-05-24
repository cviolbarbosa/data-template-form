import { Component, OnInit, OnChanges, Directive } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FieldType, FormlyFieldConfig  as FG} from '@ngx-formly/core';
import { FormlyFormOptions, FormlyLifeCycleOptions, FormlyTemplateOptions } from '@ngx-formly/core/lib/components/formly.field.config';
import {Subject, Subscription} from 'rxjs';

class EmitterService {
  public events = new Subject();
  subscribe (next, error, complete): Subscription {
    return this.events.subscribe(next, error, complete);
  }
  next (event) {
    this.events.next(event);
  }
}


export class ClassFormlyConfig implements FG {
  key?: string;
  id?: string;
  name?: string;
  templateOptions?: FormlyTemplateOptions;
  optionsTypes?: string[];
  validation;
  validators;
  asyncValidators;
  template;
  wrappers?: string[];
  hide?: boolean;
  hideExpression?: boolean | string | ((model: any, formState: any) => boolean);
  expressionProperties?: {
      [property: string]: string | ((model: any, formState: any) => boolean);
  } | any;
  formControl?: AbstractControl;
  className?: string;
  fieldGroupClassName?: string;
  fieldGroup?: FG[];
  fieldArray?: FG;
  type?: string;
  component?: any;
  focus?: boolean;

  modelOptions?: {
      debounce?: {
          default: number;
      };

      updateOn?: 'change' | 'blur' | 'submit';
  };
  lifecycle?: FormlyLifeCycleOptions;
  defaultValue?: any;
  parsers?: ((value: any) => {})[];

}

export class SDKFormlyFieldConfig extends ClassFormlyConfig {
selected?: boolean = false;
}

export const fieldEmitterService = new EmitterService();

export class ClassFormlyFormOptions implements FormlyFormOptions {}
export class SDKFormlyFormOptions extends ClassFormlyFormOptions {
    selected?: boolean = false;
    formState?: any;
}
@Directive()
export class IFieldType extends FieldType implements OnInit {
    public settingOptions: any;
    public selected: boolean;
    public field: SDKFormlyFieldConfig;
    public options: SDKFormlyFormOptions;
    

    constructor() {
        super();
    }



    ngOnInit() {
    }


    dblclickFunc(ev, options) {
        const change = {
            action: 'select',
            id: this.field.id
        };

        fieldEmitterService.next(change);
    }




    deleteFunc() {
        this.field.hideExpression = true;
        const change = {
            action: 'delete',
            id: this.field.id
        };

        fieldEmitterService.next(change);
    }

    onMoveUp(ev) {
        const change = {
            action: 'moveUp',
            id: this.field.id
        };

        fieldEmitterService.next(change);
    }

    onMoveDown(ev) {
        const change = {
            action: 'moveDown',
            id: this.field.id
        };

        fieldEmitterService.next(change);
    }

    onFormat(ev, options) {
        const change = {
            action: 'format',
            id: this.field.id,
            templateOptions: this.to,
            type: this.field.type
        };

        fieldEmitterService.next(change);

    }

    onAdvanced(ev, options) {
        const change = {
            action: 'advanced',
            id: this.field.id,
            templateOptions: this.to,
            type: this.field.type
        };

        fieldEmitterService.next(change);
    }


}



@Component({
    selector: 'lib-formly-h1',
    templateUrl: './material/formly-headline-template.html',
    styleUrls: ['dtform-templates.scss'] 
})
export class FormlyH1Component extends IFieldType implements OnInit {

    ngOnInit() {
            this.field.className = 'formlytemplate__h1';
    }
}


@Component({
  selector: 'lib-formly-subsection-component',
  templateUrl: './material/formly-subsection-component.component.html',
})
export class FormlySubsectionComponent extends IFieldType implements OnInit {

  ngOnInit(): void {
    this.field.className = 'formlytemplate__h2';
  }

}

@Component({
    selector: 'app-formly-newline',
    templateUrl: './material/formly-newline-template.html',
    styleUrls: ['./dtform-templates.scss']

   })
   export class FormlyNewLineComponent extends  IFieldType {
     borderStyle = {border: 'none'};
}





 
@Component({
    selector: 'lib-formly-input',
    templateUrl: './material/formly-input-template.html',
    styleUrls: ['dtform-templates.scss']
})
export class FormlyInputComponent extends IFieldType implements OnInit, OnChanges {
    public className: string;


    ngOnInit() {
            this.settingOptions = {
                small : 'formlytemplate_textQuarter',
                medium : 'formlytemplate_textHalf',
                full : 'formlytemplate_textFull',
            };

            this.field.className = this.settingOptions[this.to.inputWidth];
    }

    ngOnChanges(obj) {
        // this.field.className = this.settingOptions[this.to.inputWidth];
    }
}


@Component({
    selector: 'lib-formly-textarea',
    templateUrl: './material/formly-textarea-template.html',
    styleUrls: ['dtform-templates.scss']
})
export class FormlyTextareaComponent extends IFieldType implements OnInit {
    public className: string;

    ngOnInit() {
        this.field.className = 'formlytemplate_textDescription';
    }

}


@Component({
    selector: 'lib-formly-checkbox',
    templateUrl: './material/formly-checkbox-template.html',
    styleUrls: ['dtform-templates.scss']
   })
   export class FormlyCheckboxComponent extends IFieldType implements OnInit {

    ngOnInit() {
        this.field.className = 'formlytemplate__checkbox';
    }

}