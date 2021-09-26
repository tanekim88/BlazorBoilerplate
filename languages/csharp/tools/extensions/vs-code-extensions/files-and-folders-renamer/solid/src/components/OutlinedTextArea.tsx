import { uid } from 'uid';

import { MDCTextField } from '@material/textfield';

import { Component, onMount } from "solid-js";

interface Props {
  value;
  setValue;
  label;
  required;
}

export const OutlinedTextArea: Component<Props> = (props: Props) => {

  let id = `text-button-${uid()}`;

  onMount(() => {

  })
  return (


    <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--no-label">
      <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>
      <span class="mdc-text-field__resizer">
        <textarea class="mdc-text-field__input" rows="8" cols="40" aria-label="{label}" value={props.value} required={props.required}></textarea>
      </span>
    </label>
  );
};

