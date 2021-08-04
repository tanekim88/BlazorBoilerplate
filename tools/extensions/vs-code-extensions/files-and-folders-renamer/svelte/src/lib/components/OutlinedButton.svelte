<script>
    import { uid } from 'uid';

    export let id = `outlined-button-${uid()}`;
</script>

<button class="mdc-button mdc-button--outlined" on:click>
  <span class="mdc-button__ripple"></span>
  <slot name="icon"/>
  <span class="mdc-button__label"><slot/></span>
</button>