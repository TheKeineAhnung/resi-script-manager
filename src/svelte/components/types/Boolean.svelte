<script lang="ts">
  import { variableIsNull } from '../../../ts/errors/console';
  import Textfield from '@smui/textfield';
  import Switch from '@smui/switch';
  import FormField from '@smui/form-field';
  import Button, { Label } from '@smui/button';
  import Dialog, {
    Title,
    Content as DialogContent,
    Actions as DialogActions
  } from '@smui/dialog';
  import { library, icon } from '@fortawesome/fontawesome-svg-core';
  import {
    faTrash,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark,
    faSave
  } from '@fortawesome/free-solid-svg-icons';
  library.add(
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark,
    faSave
  );
  let exportIcon = icon(faCloudArrowDown).html;
  let importIcon = icon(faCloudArrowUp).html;
  let copyIcon = icon(faCopy).html;
  let closeIcon = icon(faXmark).html;
  let saveIcon = icon(faSave).html;
  export let inputBoolean: boolean | string = '';
  export let configName = '';
  export let configDescription: undefined | null | string;

  if (typeof inputBoolean !== 'boolean') {
    inputBoolean = inputBoolean == 'true';
  }

  let userInputValue: boolean = inputBoolean;
  let dialogOpen: boolean = false;
  let dialogTitle: string = '';
  let dialogContent: string = '';
  let snackbarContent: string = '';
  let snackbarOpen: boolean = false;
  let dialogCopy: boolean = false;
  let dialogInput: boolean = false;
  let dialogInputValue: string = '';
  let dialogInputDesc: string = '';

  function addToConfig(): void {
    localStorage.setItem(configName, userInputValue.toString());
    inputBoolean = userInputValue;
  }

  function exportConfig(): void {
    let config = localStorage.getItem(configName);
    dialogTitle = 'Deine Einstellungen für den Script-manager';

    if (config === null) {
      variableIsNull(Object.keys({ config })[0], 'Boolean.svelte');

      return;
    }

    dialogContent = config;
    dialogCopy = true;
    dialogOpen = true;
  }

  function importConfig(): void {
    dialogTitle = 'Importiere Einstellungen';
    dialogContent =
      'Importiere Einstellungen von Freunden oder aus einem anderen Browser';
    dialogInput = true;
    dialogInputDesc = 'Einstellungen';
    dialogOpen = true;
  }

  function resetDialog(): void {
    dialogTitle = '';
    dialogContent = '';
    dialogInputValue = '';
    dialogInputDesc = '';
    dialogInput = false;
    dialogCopy = false;
    dialogOpen = false;
  }

  function toggleSnackbar(newSnackbarContent: string, closeTimeout = 5000) {
    snackbarContent = newSnackbarContent;
    snackbarOpen = true;

    setTimeout(() => {
      snackbarOpen = false;
      snackbarContent = '';
    }, closeTimeout);
  }
</script>

<div class="boolean-container" style="min-height: 120px;">
  <div class="add flex justify-content-around align-items-start flex-column">
    <div class="w-100">
      <FormField align="start" style="width: 100%;">
        <div class="flex align-items-center justify-content-start w-100">
          {#if configDescription !== undefined && configDescription !== null}
            <span class="description">{@html configDescription}:</span>
          {/if}
          <Switch
            bind:checked={userInputValue}
            on:SMUISwitch:change={() => {
              addToConfig();
            }}
          />
        </div>
      </FormField>
    </div>
    <div class="w-100 flex justify-content-between">
      <Button
        style="width: 100%;"
        on:click={addToConfig}
        variant="raised"
        disabled>Deine Änderungen werden automatisch übernommen</Button
      >
    </div>
  </div>
  <div
    class="config-options mt-1 flex align-items-center justify-content-between w-100"
  >
    <Button
      on:click={() => exportConfig()}
      variant="raised"
      style="width: 48%;"
      class="button-shaped-round"
    >
      <Label>{@html exportIcon} Einstellungen exportieren</Label>
    </Button>
    <Button
      on:click={() => importConfig()}
      variant="raised"
      style="width: 48%;"
      class="button-shaped-round"
    >
      <Label>{@html importIcon} Einstellungen importieren</Label>
    </Button>
  </div>
</div>

<Dialog
  bind:open={dialogOpen}
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  scrimClickAction=""
  escapeKeyAction=""
>
  <Title id="simple-title">{dialogTitle}</Title>
  <DialogContent id="simple-content" style="word-wrap: break-word;"
    >{dialogContent}</DialogContent
  >
  {#if dialogInput}
    <div class="flex justify-content-center align-items-center py-2">
      <Textfield
        bind:value={dialogInputValue}
        label={dialogInputDesc}
        style="width: 100%"
      />
    </div>
  {/if}
  <DialogActions>
    {#if dialogCopy}
      <Button
        on:click={async () => {
          await navigator.clipboard.writeText(dialogContent),
            toggleSnackbar('Einstellungen in die Zwischenablage kopiert');
          resetDialog();
        }}
      >
        <Label>{@html copyIcon} Kopieren</Label>
      </Button>
    {/if}
    {#if dialogInput}
      <Button
        on:click={() =>
          setTimeout(() => {
            localStorage.setItem(
              configName,
              JSON.parse(JSON.stringify(dialogInputValue))
            ),
              (inputBoolean = dialogInputValue);
          }, 250)}
      >
        <Label>{@html saveIcon} Speichern</Label>
      </Button>
    {/if}
    <Button on:click={() => resetDialog()}>
      <Label>{@html closeIcon} Schließen</Label>
    </Button>
  </DialogActions>
</Dialog>

{#if snackbarOpen}
  <div class="snackbar">
    <div class="bg-success snackbar-child">
      <span>{snackbarContent}</span>
    </div>
  </div>
{/if}

<style lang="scss">
  @import '../../../scss/components/types/string.scss';
</style>
