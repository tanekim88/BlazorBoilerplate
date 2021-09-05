import { uid } from 'uid';

import { MDCTextField } from '@material/textfield';

import { Component, onMount } from "solid-js";

interface Props {
  value?;
  setValue?;
  label?;
  required?;
  class?;
  onClick?;
  icon?;
  children?;
}

const TextButton: Component<Props> = (props: Props) => {
  onMount(() => {

  })
  return (
    <button class="mdc-button" onClick={props.onClick}>
      <span class="mdc-button__ripple"></span>
      {props.icon}
      <span class="mdc-button__label">{props.children}</span>
    </button>
  );
};

export default TextButton;
