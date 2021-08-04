<script>
    import { uid } from 'uid';

    export let value = '';
    export let label = 'Label';
    export let required = false;
    export let id = `outlined-text-area-${uid()}`;
</script>


<label class="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--no-label">
  <span class="mdc-notched-outline">
    <span class="mdc-notched-outline__leading"></span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  <span class="mdc-text-field__resizer">
    <textarea class="mdc-text-field__input" rows="8" cols="40" aria-label="{label}" bind:value {required}></textarea>
  </span>
</label>