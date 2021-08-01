<script lang="typescript">
	import { Mapping } from '../../../src/data-provider';
	import { tsvscode } from 'src/global';

	window.addEventListener('message', async (event) => {
		const message = event.data;
		switch (message.type) {
			case 'source-fetched':
				break;
			case 'preview-fetched':
				previewItems = message.value;
				break;
			case 'commit-done':
				break;
		}
	});

	let source;
	let from;
	let to;
	let previewItems: Mapping[];
	let isPreviewLoading = false;
	let isCommitLoading = false;

	async function sendFetchPreviewCommand() {
		isPreviewLoading = true;
		const fromInput = new RegExp(from, 'gi');

		const result = await tsvscode.postMessage({
			type: 'fetch-preview',
			value: {
				from: fromInput,
				to,
				source
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
			value: previewItems
		});
		isCommitLoading = false;
	}
</script>

<form on:submit|preventDefault={() => {}}>
	<h1>{source}</h1>
	<h3>From</h3>
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

	{#if isPreviewLoading}
		Loading...
	{:else if previewItems}
		<div>
			{#each previewItems as previewItem}
				<div>
					{previewItem.from}
				</div>
				<div>
					{previewItem.to}
				</div>
				<hr />
			{/each}
		</div>
	{/if}
</form>
