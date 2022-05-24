import { getObjectByKey } from "../utils";

export const availableFormFields: any[] = [
    {
         key: 'h1',
        className: 'formlytemplate__h1',
        type: 'h1',
        templateOptions: {
            'templateTitle': 'Title',
            'iconUrl': 'assets/svg/lb_title.svg',
            'label': 'Title',
            'placeholder': 'Add a Title',
            'required': false,
            'editMode': true,
            'readonly': true
        }
    },

    {
        key: 'h2',
        className: 'formlytemplate__h2',
        type: 'h2',
        templateOptions: {
            'templateTitle': 'Text',
            'iconUrl': 'assets/svg/lb_subtitle.svg',
            'label': 'Text',
            'placeholder': 'Text',
            'required': false,
            'editMode': true,
            'readonly': true
        }
    },

{
        key: 'separator',
        className: 'formlytemplate_separator',
        type: 'separator',
        templateOptions: {
            'templateTitle': 'Horizontal Line',
            'iconUrl': 'assets/svg/lb_horizontal_line_24px.svg',
            'label': 'Line',
            'placeholder': 'Horizontal Line',
            'required': false,
            'editMode': true,
            'readonly': true
        }
      },
{
        key: 'newline',
        className: 'formlytemplate_newline',
        type: 'newline',
        templateOptions: {
            'templateTitle': 'New Line',
            'iconUrl': 'assets/svg/keyboard_return-24px.svg',
            'label': 'Line',
            'placeholder': 'New Line',
            'required': false,
            'editMode': true,
            'readonly': true
        }
      },
{
        key: 'input-quarter',
        className: 'formlytemplate_textQuarter',
        type: 'input',
        templateOptions: {
            'templateTitle': 'Small text box',
            'iconUrl': 'assets/svg/lb_textinput_small.svg',
            'label': 'Field',
            'placeholder': '',
            'required': false,
            'inputWidth': 'small',
            'editMode': true,
            'readonly': true
        }
    }
, {
        key: 'input-half',
        className: 'formlytemplate_textHalf',
        type: 'input',
        templateOptions: {
            'templateTitle': 'Medium text box',
            'iconUrl': 'assets/svg/lb_textinput.svg',
            'label': 'Field',
            'placeholder': '',
            'required': false,
            'inputWidth': 'medium',
            'editMode': true,
            'readonly': true
        }
      },
{
        key: 'input-full',
        className: 'formlytemplate_textFull',
        type: 'input',
        templateOptions: {
            'templateTitle': 'Large text box',
            'iconUrl': 'assets/svg/lb_textinput_large.svg',
            'label': 'Field',
            'placeholder': '',
            'required': false,
            'inputWidth': 'full',
            'editMode': true,
            'readonly': true
        }
    },
    {
        key: 'textarea',
        className: 'formlytemplate_textDescription',
        type: 'textarea',
        templateOptions: {
            'templateTitle': 'Text area',
            'iconUrl': 'assets/svg/ic_keyboard_48px.svg',
            'label': 'Description',
            'placeholder': '',
            'required': false,
            'editMode': true,
            'readonly': true
        }
      },

      {
        key: 'checkbox',
        className: 'formlytemplate_textDescription',
        type: 'checkbox',
        templateOptions: {
            'templateTitle': 'Check box',
            'iconUrl': 'assets/svg/ic_check_circle_black_48px.svg',
            'label': 'Description',
            'placeholder': '',
            'required': false,
            'editMode': true,
            'readonly': true
        }
      }
];


export function loadFormFields(key) {
    const field = getObjectByKey(availableFormFields, key);
    if (field) {return {...field};
    } else { return null; }
  }

  export class DTFormElement {
      key: string;
      className: string;
      type: string;
      templateOptions: any;

      constructor(elementType:string){
        const object = loadFormFields(elementType);
        this.key = object.key;
        this.className = object.className;
        this.type = object.type;
        this.templateOptions = object.templateOptions;
      }
  }