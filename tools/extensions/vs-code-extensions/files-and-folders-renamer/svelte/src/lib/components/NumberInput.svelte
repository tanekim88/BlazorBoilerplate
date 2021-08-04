<script lang="typescript">
	import { uid } from 'uid';

	export let value: number = null;
	export let label = '';
	export let required = false;

	export let id = `filled-text-field-${uid()}`;
	import { onMount } from 'svelte';
	import { MDCTextField } from '@material/textfield';
	let el;
	onMount(() => {
		const textField = new MDCTextField(el);
		textField.initialize();
	});
</script>

<label class="mdc-text-field mdc-text-field--filled" bind:this={el}>
	<span class="mdc-text-field__ripple" />
	<span class="mdc-floating-label" {id}>{label}</span>
	<input class="mdc-text-field__input" type="number" aria-labelledby={id} bind:value required={required} />
	<span class="mdc-line-ripple" />
</label>
