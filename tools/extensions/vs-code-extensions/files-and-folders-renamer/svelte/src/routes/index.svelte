<script lang="typescript">
	import { onMount } from 'svelte';

	import { PreviewItem } from '../../../src/data-provider';
	import diff from 'fast-diff';
	onMount(async () => {
		window.addEventListener('message', async (event) => {
			const message = event.data;
			switch (message.type) {
				case 'source-fetched':
					source = message.value;
					break;
				case 'preview-fetched':
					previewItems = message.value;
					previewItems.forEach((previewItem) => {
						const to = previewItem.to;
						const from = previewItem.from;
						previewItem.diffs = diff(from, to);
						console.dir(previewItem.to);
						console.dir(previewItem.diffs);
					});
					break;
				case 'commit-done':
					previewItems = undefined;
					break;
			}
		});
		await sendFetchSourceCommand();
	});

	let source;
	let from;
	let to;
	let options = {
		includeFiles: true,
		includeFolders: true,
		isGlobal: true,
		isRegex: true,
		caseInsensitive: false
	};
	let previewItems: PreviewItem[];
	let isPreviewLoading = false;
	let isCommitLoading = false;

	async function sendFetchPreviewCommand() {
		isPreviewLoading = true;
		const result = await tsvscode.postMessage({
			type: 'fetch-preview',
			value: {
				from,
				to,
				source,
				options
			}
		});
		isPreviewLoading = false;
	}

	async function sendCommitCommand() {
		isCommitLoading = true;

		if (!previewItems) {
			await sendFetchPreviewCommand();
		}

		const result = await tsvscode.postMessage({
			type: 'commit',
			value: {
				from,
				to,
				source,
				options,
				previewItems
			}
		});
		isCommitLoading = false;
	}

	async function sendFetchSourceCommand() {
		isCommitLoading = true;

		const result = await tsvscode.postMessage({
			type: 'fetch-source',
			value: previewItems
		});
		isCommitLoading = false;
	}
</script>

<form on:submit|preventDefault={() => {}}>
	<h1>{source}</h1>
	<h3>From</h3>
	<h3>Regex</h3>
	<input type="checkbox" checked={options.isRegex} />
	<input bind:value={from} required />
	<h3>To</h3>
	<input bind:value={to} required />

	<button
		on:click|preventDefault={async () => {
			await sendFetchPreviewCommand();
		}}>Preview</button
	>
	<button
		on:click|preventDefault={async () => {
			await sendCommitCommand();
		}}>Commit</button
	>

	<h3>Case Insensitive</h3>
	<input type="checkbox" bind:checked={options.caseInsensitive} />
	<h3>Include files</h3>
	<input type="checkbox" bind:checked={options.includeFiles} />
	<h3>Include folders</h3>
	<input type="checkbox" bind:checked={options.includeFolders} />

	{#if isPreviewLoading}
		Loading...
	{:else if previewItems}
		<hr />
		<div>
			<h3>Preview</h3>
			{#each previewItems as previewItem}
				<div>
					{previewItem.from}
				</div>
				<div>
					{#each previewItem.diffs as diff}
						{#if diff[0] === -1}
							<del style="background-color: red; color:white">{diff[1]}</del>
						{:else if diff[0] === 1}
							<ins style="background-color: green; color:white">{diff[1]}</ins>
						{:else}
							<span>{diff[1]}</span>
						{/if}
					{/each}
				</div>
				<hr />
			{/each}
		</div>
	{/if}
</form>
