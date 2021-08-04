<script>
    import { uid } from 'uid';

    export let value = '';

    let className= '';
    export {className as class};
    export let id = `text-button-${uid()}`;
</script>


<button class="mdc-button {className}" on:click>
  <span class="mdc-button__ripple"></span>
  <slot name="icon"/>
  <span class="mdc-button__label"><slot/></span>
</button>