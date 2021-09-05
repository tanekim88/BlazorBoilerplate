import { uid } from 'uid';

import { MDCTextField } from '@material/textfield';

import { Component, onMount } from "solid-js";
import { useForm } from '../validation';

interface Props {
  value;
  setValue?;
  name?;
  label?;
  required?;
  class?
  validate?;
  onInput?;
}

const OutlinedTextField: Component<Props> = (props: Props) => {
  const { validate, formSubmit, errors } = useForm({
    errorClass: "error-input"
  });
  let id = `text-button-${uid()}`;
  let el;
  onMount(() => {
    const textField = new MDCTextField(el);

  })
  return (
    <label class={"mdc-text-field mdc-text-field--outlined " + props.class} ref={el}>
      <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <span class="mdc-floating-label" id={id}>{props.label}</span>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>
      <input
        name={props.name}
        type="text"
        class="mdc-text-field__input"
        aria-labelledby={id}
        value={props.value}
        required={props.required}
        use:validate={props.validate}
        onInput={props.onInput ?? ((e) => { })}
      />
    </label>
  );
};

export default OutlinedTextField;
