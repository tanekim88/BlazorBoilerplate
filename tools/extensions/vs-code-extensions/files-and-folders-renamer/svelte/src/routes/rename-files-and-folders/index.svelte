<script lang="typescript">
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { defaultRenameFilesAndFoldersState } from '../../../../src/routes/rename-files-and-folders/models/rename-files-and-folders-state';
	import { webviewService } from '../../../../src/services/webview-service';
	import FilledTextField from '$lib/components/FilledTextField.svelte';
	import OutlinedTextField from '$lib/components/OutlinedTextField.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import TextButton from '$lib/components/TextButton.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	onDestroy(() => {
		webview.setState(state);
	});

	let state = defaultRenameFilesAndFoldersState;

	onMount(async () => {
		window.addEventListener('message', async (event) => {
			const message = event.data;
			switch (message.type) {
				case 'state-received':
					const options = state.options;
					state = message.value;
					if (!state.options) {
						state.options = options;
					}

					break;
				case 'preview-received':
					state.previewItems = message.value;
					break;
				case 'commit-done':
					state.previewItems = undefined;
					break;
			}
		});

		const stateFetched = webview.getState();
		if (stateFetched) {
			state = stateFetched;
		} else {
			await sendGetStateCommand();
		}
	});
	afterUpdate(() => {
		webview.setState(state);
	});
	async function sendGetPreviewCommand() {
		state.isPreviewLoading = true;
		await webviewService.postMessage(webview, 'get-preview', state);
		state.isPreviewLoading = false;
	}

	async function sendCommitCommand() {
		state.isCommitLoading = true;
		if (!state.previewItems) {
			await sendGetPreviewCommand();
		}
		await webviewService.postMessage(webview, 'commit', state);
		state.isCommitLoading = false;
	}

	async function sendGetStateCommand() {
		state.isCommitLoading = true;
		await webviewService.postMessage(webview, 'get-state', undefined);
		state.isCommitLoading = false;
	}
</script>

<form
	on:submit|preventDefault={() => {}}
	class="h-full w-full px-10 flex flex-col items-start gap-3 pt-3"
>
	<h1 class="theme-on-primary">{state.sourcePath}</h1>
	<div class="w-full">
		<div class="mdc-form-field flex w-full">
			<OutlinedTextField
				label={'From'}
				bind:value={state.fromInput}
				required
				class="flex-1 bg-white"
			/>
			<Checkbox label={'Regex'} bind:checked={state.options.isRegex} />
		</div>
	</div>
	<div class="w-full">
		<div class="mdc-form-field w-full">
			<OutlinedTextField label={'To'} bind:value={state.toInput} class="w-full bg-white" />
		</div>
	</div>

	<div class="flex gap-3">
		<TextButton
			on:click={async () => {
				await sendGetPreviewCommand();
			}}>Preview</TextButton
		>

		<TextButton
			on:click={async () => {
				await sendCommitCommand();
			}}>Commit</TextButton
		>
	</div>

	<div>
		<div class="mdc-form-field">
			<Checkbox label={'Case Insensitive'} bind:checked={state.options.caseInsensitive} />
		</div>
		<div class="mdc-form-field">
			<Checkbox label={'Include files'} bind:checked={state.options.includeFiles} />
		</div>
	</div>
	<div>
		<div class="mdc-form-field">
			<Checkbox label={'Include folders'} bind:checked={state.options.includeFolders} />
		</div>
		<div class="mdc-form-field">
			<Checkbox label={'Include contents'} bind:checked={state.options.includeContents} />
		</div>
	</div>
	{#if state.options.includeContents}
		<div>
			<div class="mdc-form-field">
				<Checkbox label={'Show line numbers'} bind:checked={state.options.showLineNumbers} />
			</div>
			<div class="mdc-form-field">
				<NumberInput label={'Context lines depth'} bind:value={state.options.contextLinesDepth} />
			</div>
		</div>
	{/if}

	{#if state.isPreviewLoading}
		Loading...
	{:else if state.previewItems}
		<hr />
		<div>
			<h3>Preview</h3>
			{#each state.previewItems as previewItem}
				<div>
					{previewItem.pathFrom}
				</div>
				<div>
					{#each previewItem.pathDiffs || [] as diff}
						{#if diff[0] === -1}
							<del style="background-color: red; color:white">{diff[1]}</del>
						{:else if diff[0] === 1}
							<ins style="background-color: green; color:white">{diff[1]}</ins>
						{:else}
							<span>{diff[1]}</span>
						{/if}
					{/each}
				</div>
				<div>
					{#each previewItem?.lineNumbersWithChange || [] as lineNumberWithChange}
						{#each Array.from(new Array(state.options.contextLinesDepth * 2 + 1), (x, i) => lineNumberWithChange - state.options.contextLinesDepth + i) as lineNumber}
							{#if previewItem.contentDiffsLookup[lineNumber]}
								{#if state.options.showLineNumbers}
									<span>{lineNumber}:&nbsp;</span>
								{/if}

								{#each previewItem.contentDiffsLookup[lineNumber]?.diffs || [] as diff}
									{#if diff[0] === -1}
										<del style="background-color: red; color:white">{diff[1]}</del>
									{:else if diff[0] === 1}
										<ins style="background-color: green; color:white">{diff[1]}</ins>
									{:else}
										<span>{diff[1]}</span>
									{/if}
								{/each}
							{/if}
						{/each}
					{/each}
				</div>

				<hr />
			{/each}
		</div>
	{/if}
</form>

<style lang="scss">
	@use './_index.scss';
</style>
