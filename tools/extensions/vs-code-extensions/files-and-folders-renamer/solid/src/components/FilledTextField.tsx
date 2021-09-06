import { uid } from 'uid';




let className = '';
export { className as class };
let el;
import { MDCTextField } from '@material/textfield';

import { Component, onMount } from "solid-js";

interface Props {
  value;
  setValue;
  label;
  required;
}

export const FilledTextField: Component<Props> = (props: Props) => {
  let id = `filled-text-field-${uid()}`;

  onMount(() => {
    const textField = new MDCTextField(el);
    textField.initialize();
  });

  return (
    <label class="mdc-text-field mdc-text-field--filled " ref={el}>
      <span class="mdc-text-field__ripple" />
      <span class="mdc-floating-label">{props.label}</span>
      <input class="mdc-text-field__input" type="text" value={props.value()} onChange={(e) => props.setValue(e.currentTarget.value)}
        aria-labelledby={id} required={props.required} />
      <span class="mdc-line-ripple" />
    </label>
  );
};
