<script lang="typescript">
	import { onDestroy, onMount } from 'svelte';
	import { MainState } from '../../../src/data-provider';
	import diff from 'fast-diff';

	onDestroy(() => {
		tsvscode['setState'](state);
	});

	let state: MainState = {
		source: '',
		from: undefined,
		to: undefined,
		options: {
			includeFiles: true,
			includeFolders: true,
			isGlobal: true,
			isRegex: true,
			caseInsensitive: false,
			includeContents: false,
			contextLinesDepth: 0,
			showLineNumbers: false
		},
		previewItems: [],
		isPreviewLoading: false,
		isCommitLoading: false
	};
	onMount(async () => {
		window.addEventListener('message', async (event) => {
			const message = event.data;
			switch (message.type) {
				case 'state-received':
					const options = state.options;
					state = message.value;
					if(!state.options){
						state.options = options;
					}
					break;
				case 'preview-received':
					state.previewItems = message.value;
					state.previewItems.forEach((previewItem) => {
						if (previewItem.to) {
							previewItem.diffs = diff(previewItem.from, previewItem.to);
						}

						previewItem.contents?.forEach((content) => {
							content.contextDiffs = diff(content.fromContext, content.toContext);
						});
						console.dir(previewItem.contents);
					});
					break;
				case 'commit-done':
					state.previewItems = undefined;
					break;
			}
		});
		await sendGetStateCommand();
	});
	
	async function sendGetPreviewCommand() {
		state.isPreviewLoading = true;
		const result = await tsvscode.postMessage({
			type: 'get-preview',
			value: state
		});
		state.isPreviewLoading = false;
	}

	async function sendCommitCommand() {
		state.isCommitLoading = true;

		if (!state.previewItems) {
			await sendGetPreviewCommand();
		}

		const result = await tsvscode.postMessage({
			type: 'commit',
			value: state
		});
		state.isCommitLoading = false;
	}

	async function sendGetStateCommand() {
		state.isCommitLoading = true;

		const result = await tsvscode.postMessage({
			type: 'get-state',
			value: undefined
		});

		state.isCommitLoading = false;
	}
</script>

<form on:submit|preventDefault={() => {}}>
	<h1>{state.source}</h1>
	<h3>From</h3>
	<h3>Regex</h3>
	<input type="checkbox" checked={state.options.isRegex} />
	<input bind:value={state.from} required />
	<h3>To</h3>
	<input bind:value={state.to} required />

	<button
		on:click|preventDefault={async () => {
			await sendGetPreviewCommand();
		}}>Preview</button
	>
	<button
		on:click|preventDefault={async () => {
			await sendCommitCommand();
		}}>Commit</button
	>

	<h3>Case Insensitive</h3>
	<input type="checkbox" bind:checked={state.options.caseInsensitive} />
	<h3>Include files</h3>
	<input type="checkbox" bind:checked={state.options.includeFiles} />
	<h3>Include folders</h3>
	<input type="checkbox" bind:checked={state.options.includeFolders} />
	<h3>Include contents</h3>
	<input type="checkbox" bind:checked={state.options.includeContents} />
	{#if state.options.includeContents}
		<h3>Context lines depth</h3>
		<input type="number" bind:value={state.options.contextLinesDepth} />
		<h3>Show line numbers</h3>
		<input type="checkbox" bind:checked={state.options.showLineNumbers} />
	{/if}

	{#if state.isPreviewLoading}
		Loading...
	{:else if state.previewItems}
		<hr />
		<div>
			<h3>Preview</h3>
			{#each state.previewItems as previewItem}
				<div>
					{previewItem.from}
				</div>
				<div>
					{#if previewItem.diffs}
						{#each previewItem.diffs as diff}
							{#if diff[0] === -1}
								<del style="background-color: red; color:white">{diff[1]}</del>
							{:else if diff[0] === 1}
								<ins style="background-color: green; color:white">{diff[1]}</ins>
							{:else}
								<span>{diff[1]}</span>
							{/if}
						{/each}
					{/if}
					{#if previewItem.contents}
						<hr />
						{#each previewItem.contents as content}
							<div>
								<div>
									{content.fromContext}
								</div>
								<div>
									{#each content.contextDiffs as contextDiff}
										{#if contextDiff[0] === -1}
											<del style="background-color: red; color:white">{contextDiff[1]}</del>
										{:else if contextDiff[0] === 1}
											<ins style="background-color: green; color:white">{contextDiff[1]}</ins>
										{:else}
											<span>{contextDiff[1]}</span>
										{/if}
									{/each}
								</div>
							</div>
						{/each}
					{/if}
				</div>
				<hr />
			{/each}
		</div>
	{/if}
</form>
