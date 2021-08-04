<script>
    import { uid } from 'uid';

    export let value = '';
    export let label = '';
    export let required = false;
    let className= '';
    export {className as class};
    export let id = `outlined-text-field-${uid()}`;

    let el;
  import { MDCTextField } from '@material/textfield';
  import { onMount } from 'svelte';
  onMount(()=>{
    const textField = new MDCTextField(el);
    textField.initialize();
  })
</script>



<label class="mdc-text-field mdc-text-field--outlined {className}" bind:this={el}>
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__notch">
      <span class="mdc-floating-label" id="{id}">{label}</span>
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <input type="text" class="mdc-text-field__input" aria-labelledby="{id}" bind:value {required}>
</label>
