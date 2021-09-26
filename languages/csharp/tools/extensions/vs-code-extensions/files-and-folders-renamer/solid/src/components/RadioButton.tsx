


import { Component, onMount } from "solid-js";
import { uid } from "uid";

import { MDCFormField } from '@material/form-field';
import { MDCRadio } from '@material/radio';

interface Props {
    checked;
    label;
    onChange?;
    name?;
}

export const RadioButton: Component<Props> = (props: Props) => {
    let id = `radio-button-${uid()}`;

    let radio;
    let formField;

    onMount(() => {
        radio = new MDCRadio(radio);
        formField = new MDCFormField(formField);
        formField.input = radio;
    });

    return (
        <div class="mdc-form-field" ref={formField}>
            <div class="mdc-touch-target-wrapper">
                <div class="mdc-radio mdc-radio--touch" ref={radio}>
                    <input class="mdc-radio__native-control" type="radio" id={id} name={props.name}
                        checked={props.checked}
                        onChange={props.onChange}
                    />
                    <div class="mdc-radio__background">
                        <div class="mdc-radio__outer-circle"></div>
                        <div class="mdc-radio__inner-circle"></div>
                    </div>
                    <div class="mdc-radio__ripple"></div>
                </div>
            </div>
            <label for={id}>{props.label}</label>
        </div>
    );
};
