import { Component, onMount, onCleanup, createEffect, Switch } from "solid-js";
import { $RAW, createStore, produce } from "solid-js/store";

import { OutlinedTextField } from './components/OutlinedTextField';

import { TextButton } from './components/TextButton';
import { Checkbox } from './components/Checkbox';
import { render } from "solid-js/web";
import { useForm } from "./validation";
import { RenameFilesAndFoldersState } from "../../src/routes/rename-files-and-folders/models/rename-files-and-folders-state";
import { webviewService } from "../../src/services/webview-service";

import { Show, For, Match } from 'solid-js';
import { OutlinedNumberInput } from "./components/OutlinedNumberInput";



const App: Component = () => {
  const stateFetched = webview.getState();
  console.log("222222222222222")
  console.dir(stateFetched);

  const [state, setState2] = createStore<RenameFilesAndFoldersState>(stateFetched);
  function setState(args) {
    setState2(args);
    webview.setState(state[$RAW]);
  }

  onMount(async () => {
    window.addEventListener('message', async (event) => {
      const message = event.data;
      switch (message.type) {
        case 'preview-received':
          setState(produce<RenameFilesAndFoldersState>(state => state.previewItems = message.value));
          setState(produce<RenameFilesAndFoldersState>(state => state.isPreviewLoading = false));
          break;
        case 'commit-done':
          setState(produce<RenameFilesAndFoldersState>(state => state.previewItems = message.value));
          setState(produce<RenameFilesAndFoldersState>(state => state.isPreviewLoading = false));
          break;
      }
    });
  });

  onCleanup(async () => {
    webview.setState(state[$RAW]);
  });

  const ErrorMessage = ({ error }) => <span class="error-message">{error}</span>;
  const { validate, formSubmit, errors } = useForm({
    errorClass: "error-input"
  });

  const onSubmit = (form) => {
    if (errors) {
      console.dir(errors);
    }
    console.dir(state);
    console.log("Done");
  };
  const required = async ({ value }) => {

    if (/^\s*$/.test(value ?? '')) {
      return 'This field is required';
    }

    return false;
  };


  async function sendGetPreviewCommand() {
    setState(produce<RenameFilesAndFoldersState>(state => state.isPreviewLoading = true));
    await webviewService.postMessage(webview, 'get-preview', state[$RAW]);
  }

  async function sendCommitCommand() {
    setState(produce<RenameFilesAndFoldersState>(state => state.isPreviewLoading = true));
    await webviewService.postMessage(webview, 'commit', state[$RAW]);
  }

  return (
    <div style="padding:0.5rem;">

      <form use:formSubmit={onSubmit}
        class=""
      >
        <h1 class="theme-on-primary">{state.sourcePath}</h1>
        <div class="mdc-form-field">
          <OutlinedTextField
            label={'From'}
            name={'from'}
            value={state.fromInput}
            setValue={() => { }}
            required
            class=""
            validate={[required]}
            onInput={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.fromInput = e.target.value))}
          />
        </div>
        <div class="mdc-form-field">
          <Checkbox label={'Regex'} checked={state.options.isRegex} />
        </div>
        <div>
          {errors.from && <ErrorMessage error={errors.from} />}
        </div>
        <div class="mdc-form-field">
          <OutlinedTextField
            label={'To'}
            name={'to'}
            value={state.toInput}
            setValue={() => { }}
            class=""
            onInput={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.toInput = e.target.value))}
          />
        </div>
        <div>
          {errors.to && <ErrorMessage error={errors.to} />}
        </div>

        <div class="mdc-form-field">
          <TextButton
            onClick={async () => {
              await sendGetPreviewCommand();
            }}>Preview</TextButton>
        </div>
        <div class="mdc-form-field">
          <TextButton
            onClick={async () => {
              await sendCommitCommand();
            }}>Commit</TextButton>
        </div>

        <div>
          <div class="mdc-form-field">
            <Checkbox label={'Include files'}
              checked={state.options.includeFiles}
              onChange={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.options.includeFiles = e.target.checked))}
            />
          </div>
          <div class="mdc-form-field">
            <Checkbox label={'Include folders'}
              checked={state.options.includeFolders}
              onChange={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.options.includeFolders = e.target.checked))}
            />
          </div>
        </div>
        <div>
          <div class="mdc-form-field">
            <Checkbox label={'Case Insensitive'}
              checked={state.options.caseInsensitive}
              onChange={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.options.caseInsensitive = e.target.checked))}
            />
          </div>
          <div class="mdc-form-field">
            <Checkbox label={'Delete if resulting name is blank.'}
              checked={state.options.includeContents}
              onChange={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.options.deleteIfResultingNameIsBlank = e.target.checked))}
            />
          </div>
        </div>
        <div>
          <div class="mdc-form-field">
            <Checkbox label={'Include contents'}
              checked={state.options.includeContents}
              onChange={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.options.includeContents = e.target.checked))}
            />
          </div>
        </div>
        <Show
          when={state.options.includeContents}
        >
          <>
            <div class="mdc-form-field">
              <OutlinedNumberInput label={'Context lines depth'}
                value={state.options.contextLinesDepth}
                onChange={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.options.contextLinesDepth = e.target.value))}
              />
            </div>
            <div class="mdc-form-field">
              <Checkbox label={'Show line numbers'}
                checked={state.options.showLineNumbers}
                onChange={(e) => setState(produce<RenameFilesAndFoldersState>(state => state.options.showLineNumbers = e.target.checked))}
              />
            </div>
          </>
        </Show>
        <Switch fallback={<>Loading...</>}>
          <Match when={state.isPreviewLoading}>
            <>Loading...</>
          </Match>
          <Match when={state.previewItems}>
            <hr />
            <div>
              <h3>Preview</h3>
              <For each={state.previewItems.filter(previewItem => previewItem.isForPreview)}>{(previewItem) =>
                <>
                  <div>
                    {previewItem.pathFromForPreview}
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
