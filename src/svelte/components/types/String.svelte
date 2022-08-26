<script lang="ts">
  import { variableIsNull } from '../../../ts/errors/console';
  import Textfield from '@smui/textfield';
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
    faTrash,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark,
    faSave
  );
  let trashIcon = icon(faTrash).html;
  let exportIcon = icon(faCloudArrowDown).html;
  let importIcon = icon(faCloudArrowUp).html;
  let copyIcon = icon(faCopy).html;
  let closeIcon = icon(faXmark).html;
  let saveIcon = icon(faSave).html;
  export let inputString = '';
  export let scriptName = '';
  export let configName = '';
  export let configDescription: undefined | null | string;
  let userInputValue: string = '';
  let dialogOpen: boolean = false;
  let dialogTitle: string = '';
  let dialogContent: string = '';
  let snackbarContent: string = '';
  let snackbarOpen: boolean = false;
  let dialogCopy: boolean = false;
  let dialogInput: boolean = false;
  let dialogInputValue: string = '';
  let dialogInputDesc: string = '';

  function clearUserInput(): void {
    userInputValue = '';
  }

  function addToConfig(): void {
    localStorage.setItem(configName, userInputValue);
    inputString = userInputValue;
  }

  function exportConfig(): void {
    let config = localStorage.getItem(configName);
    dialogTitle = 'Deine Einstellungen für den Script-manager';

    if (config === null) {
      variableIsNull(Object.keys({ config })[0], __filename);

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

  function removeFromConfig() {
    localStorage.removeItem(configName);
    userInputValue = '';
    inputString = userInputValue;
  }
</script>

<div class="string-container grid columns-2" style="min-height: 120px;">
  <div class="add flex justify-content-around align-items-start flex-column">
    <div class="w-95">
      <Textfield
        variant="outlined"
        bind:value={userInputValue}
        label="Wert zur Konfiguration hinzufügen"
        style="width: 100%;"
      />
    </div>
    <div class="w-95 flex justify-content-between">
      <Button style="width: 48%;" on:click={clearUserInput} variant="raised"
        >Zurücksetzen</Button
      >
      <Button style="width: 48%;" on:click={addToConfig} variant="raised"
        >Hinzufügen</Button
      >
    </div>
  </div>
  <div class="existing">
    Aktuelle Konfiguration für {scriptName}.
    <br />
    {#if configDescription !== undefined && configDescription !== null}
      {@html configDescription}
    {/if}
    <div>
      <div class="w-fit bg-success rounded p-0_5 mt-1">
        {#if inputString !== ''}
          {#if inputString.startsWith('http')}
            <a
              class="color-white"
              href={inputString}
              target="_blank"
              rel="noopener noreferrer">{inputString}</a
            >
          {:else}
            {inputString}
          {/if}
          <span
            class="color-danger transition-duration-250 cursor-pointer"
            on:click={removeFromConfig}>{@html trashIcon}</span
          >
        {:else}
          Keine Konfiguration gefunden
        {/if}
      </div>
    </div>
    <div
      class="config-options mt-1 flex align-items-center justify-content-end float-left"
    >
      <Button
        on:click={() => exportConfig()}
        variant="raised"
        style="margin-right: 1rem;"
        class="button-shaped-round"
      >
        <Label>{@html exportIcon} Einstellungen exportieren</Label>
      </Button>
      <Button
        on:click={() => importConfig()}
        variant="raised"
        class="button-shaped-round"
      >
        <Label>{@html importIcon} Einstellungen importieren</Label>
      </Button>
    </div>
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
              (inputString = dialogInputValue);
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
