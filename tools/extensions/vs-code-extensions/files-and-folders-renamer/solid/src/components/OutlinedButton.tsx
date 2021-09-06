import { uid } from 'uid';

import { MDCTextField } from '@material/textfield';

import { Component, onMount } from "solid-js";

interface Props {
  value;
  setValue;
  label;
  required;
  onClick?;
}

export const OutlinedButton: Component<Props> = (props: Props) => {

  let id = `text-button-${uid()}`;

  onMount(() => {

  })
  return (
    <button class="mdc-button mdc-button--outlined" onClick={props.onClick}>
      <span class="mdc-button__ripple"></span>
      <slot name="icon" />
      <span class="mdc-button__label"><slot /></span>
    </button>
  );
};
