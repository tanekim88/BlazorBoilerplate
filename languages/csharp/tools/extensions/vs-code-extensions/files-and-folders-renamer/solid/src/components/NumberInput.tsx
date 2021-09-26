import { uid } from 'uid';

import { MDCTextField } from '@material/textfield';

import { Component, onMount } from "solid-js";

interface Props {
  value?;
  setValue?;
  label?;
  required?;
  onChange?;
}


export const NumberInput: Component<Props> = (props: Props) => {

  let id = `text-button-${uid()}`;
  let el;


  onMount(() => {

    const textField = new MDCTextField(el);
  })
  return (
    <label class="mdc-text-field mdc-text-field--filled" ref={el}>
      <span class="mdc-text-field__ripple" />
      <span class="mdc-floating-label" id={id}>{props.label}</span>
      <input class="mdc-text-field__input" type="number" aria-labelledby={id}
        value={props.value}
        required={props.required}
        onChange={props.onChange} />
      <span class="mdc-line-ripple" />
    </label>
  );
};

