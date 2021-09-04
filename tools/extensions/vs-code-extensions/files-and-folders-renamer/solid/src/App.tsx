import { Component, onMount, onCleanup, createEffect, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import logo from "./logo.svg";

import FilledTextField from './components/FilledTextField';
import OutlinedTextField from './components/OutlinedTextField';
import NumberInput from './components/NumberInput';
import TextButton from './components/TextButton';
import Checkbox from './components/Checkbox';
import { render } from "solid-js/web";
import { useForm } from "./validation";
import { defaultRenameFilesAndFoldersState } from "../../src/routes/rename-files-and-folders/models/rename-files-and-folders-state";
import { webviewService } from "../../src/services/webview-service";

import { Show, For, Match } from 'solid-js';
let state = defaultRenameFilesAndFoldersState;



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



const App: Component = () => {
  createEffect(() => {
    webview.setState(state);
  });
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
  })
  onCleanup(async () => {
    webview.setState(state);
  });


  const { validate, formSubmit, errors } = useForm({
    errorClass: "error-input"
  });
  const [fields, setFields] = createStore(undefined);
  const fn = (form) => {
    // form.submit()
    console.log("Done");
  };
  const userNameExists = async ({ value }) => {

    return 'hi';
  };
  const matchesPassword = ({ value }) =>
    value === fields.password ? false : "Passwords must Match";

  return (
    <div class={styles.App}>

      <form use:formSubmit={fn}
        class="h-full w-full px-10 flex flex-col items-start gap-3 pt-3"
      >
        <h1 class="theme-on-primary">{state.sourcePath}</h1>
        <div class="w-full">
          <div class="mdc-form-field flex w-full">
            <OutlinedTextField
              label={'From'}
              value={state.fromInput}
              setValue={() => { }}
              required
              class="flex-1 bg-white"
              validate={[userNameExists]}
            />
            <Checkbox label={'Regex'} checked={state.options.isRegex} />
          </div>
        </div>
        <div class="w-full">
          <div class="mdc-form-field w-full">
            <OutlinedTextField
              label={'To'} value={state.toInput}
              setValue={() => { }}
              class="w-full bg-white" />
          </div>
        </div>

        <div class="flex gap-3">
          <TextButton
            onClick={async () => {
              await sendGetPreviewCommand();
            }}>Preview</TextButton
          >

          <TextButton
            onClick={async () => {
              await sendCommitCommand();
            }}>Commit</TextButton
          >
        </div>

        <div>
          <div class="mdc-form-field">
            <Checkbox label={'Case Insensitive'} checked={state.options.caseInsensitive} />
          </div>
          <div class="mdc-form-field">
            <Checkbox label={'Include files'} checked={state.options.includeFiles} />
          </div>
        </div>
        <div>
          <div class="mdc-form-field">
            <Checkbox label={'Include folders'} checked={state.options.includeFolders} />
          </div>
          <div class="mdc-form-field">
            <Checkbox label={'Include contents'} checked={state.options.includeContents} />
          </div>
        </div>
        <Show
          when={state.options.includeContents}
        >
          <div>
            <div class="mdc-form-field">
              <Checkbox label={'Show line numbers'} checked={state.options.showLineNumbers} />
            </div>
            <div class="mdc-form-field">
              <NumberInput label={'Context lines depth'} value={state.options.contextLinesDepth} />
            </div>
          </div>
        </Show>
        <Switch fallback={<>Loading...</>}>
          <Match when={state.isPreviewLoading}>
            <>Loading...</>
          </Match>
          <Match when={state.previewItems}>
            <hr />
            <div>
              <h3>Preview</h3>
              <For each={state.previewItems}>{(previewItem) =>
                <>
                  <div>
                    {previewItem.pathFrom}
                  </div>
                  <div>
                    <For each={previewItem.pathDiffs || []}>{(diff) =>
                      <Switch fallback={() => <span>{diff[1]}</span>}>
                        <Match when={diff[0] === -1}>
                          <del style="background-color: red; color:white">{diff[1]}</del>
                        </Match>
                        <Match when={diff[0] === 1}>
                          <ins style="background-color: green; color:white">{diff[1]}</ins>
                        </Match>
                      </Switch>
                    }</For>
                  </div>
                  <div>
                    <For each={previewItem?.lineNumbersWithChange || []}>{(lineNumberWithChange) => {
                      const lineNumbers = Array.from(new Array(state.options.contextLinesDepth * 2 + 1), (x, i) => lineNumberWithChange - state.options.contextLinesDepth + i);
                      return <For each={lineNumbers}>{(lineNumber) =>
                        <Show when={previewItem.contentDiffsLookup[lineNumber]}>
                          <Show when={state.options.showLineNumbers}>
                            <span>{lineNumber}:&nbsp;</span>
                          </Show>
                          <For each={previewItem.contentDiffsLookup[lineNumber]?.diffs || []}>{(diff) =>
                            <Switch fallback={() => <span>{diff[1]}</span>}>
                              <Match when={diff[0] === - 1}>
                                <del style="background-color: red; color:white">{diff[1]}</del>

                              </Match>
                              <Match when={diff[0] === 1}>
                                <ins style="background-color: green; color:white">{diff[1]}</ins>

                              </Match>
                            </Switch>
                          }</For>

                        </Show>}
                      </For>
                    }}</For>
                  </div>
                </>
              }
              </For>
            </div>
            <hr />
          </Match>
        </Switch>
      </form >
    </div>);
};

export default App;
