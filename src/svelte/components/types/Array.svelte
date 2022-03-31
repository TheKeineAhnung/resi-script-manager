<script>
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";
  import Dialog, {
    Title,
    Content as DialogContent,
    Actions as DialogActions,
  } from "@smui/dialog";
  import { library, icon } from "@fortawesome/fontawesome-svg-core";
  import {
    faTrash,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark,
    faSave,
  } from "@fortawesome/free-solid-svg-icons";
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
  export let inputArray = new Array();
  export let scriptName = "";
  export let configName = "";
  let userInputValue = null;
  let dialogOpen = false;
  let dialogTitle = "";
  let dialogContent = "";
  let snackbarContent = "";
  let snackbarOpen = false;
  let dialogCopy = false;
  let dialogInput = false;
  let dialogInputValue = "";
  let dialogInputDesc = "";

  function clearUserInput() {
    userInputValue = null;
  }

  function addToConfig() {
    if (!isNaN(Number(userInputValue))) {
      userInputValue = Number(userInputValue);
    }
    if (userInputValue !== null && userInputValue !== 0) {
      inputArray.push(userInputValue);
      inputArray.sort();
      userInputValue = null;
      inputArray = inputArray;
    }
    localStorage.setItem(configName, JSON.stringify(inputArray));
  }

  function exportConfig() {
    let config = localStorage.getItem(configName);
    dialogTitle = "Deine Einstellungen für den Script-manager";
    dialogContent = config;
    dialogCopy = true;
    dialogOpen = true;
  }

  function importConfig() {
    dialogTitle = "Importiere Einstellungen";
    dialogContent =
      "Importiere Einstellungen von Freunden oder aus einem anderen Browser";
    dialogInput = true;
    dialogInputDesc = "Einstellungen";
    dialogOpen = true;
  }

  function resetDialog() {
    dialogTitle = "";
    dialogContent = "";
    dialogInputValue = "";
    dialogInputDesc = "";
    dialogInput = false;
    dialogCopy = false;
    dialogOpen = false;
  }

  function toggleSnackbar(newSnackbarContent, closeTimeout = 5000) {
    snackbarContent = newSnackbarContent;
    snackbarOpen = true;

    setTimeout(() => {
      snackbarOpen = false;
      snackbarContent = "";
    }, closeTimeout);
  }

  function removeFromConfig(value) {
    inputArray = inputArray.filter(function (item) {
      return item !== value;
    });
    localStorage.setItem(configName, JSON.stringify(inputArray));
  }
</script>

<div class="array-container grid columns-2" style="min-height: 120px;">
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
    Aktuelle Konfiguration für {scriptName}
    <ul class="p-0 m-0">
      {#each inputArray as inputArrayElement}
        <li
          class="list-none w-fit float-left mr-1 bg-success rounded px-1 py-0_5 mt-1"
        >
          {inputArrayElement}
          <span
            class="color-danger transition-duration-250 cursor-pointer"
            on:click={() => removeFromConfig(inputArrayElement)}
            >{@html trashIcon}</span
          >
        </li>
      {/each}
    </ul>
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
    <div class="flex justify-content-center align-items-center px-2">
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
        on:click={(() => navigator.clipboard.writeText(dialogContent),
        console.log(navigator.clipboard.writeText(dialogContent)),
        toggleSnackbar("Einstellungen in die Zwischenablage kopiert"),
        resetDialog())}
      >
        <Label>{@html copyIcon} Kopieren</Label>
      </Button>
    {/if}
    {#if dialogInput}
      <Button
        on:click={() =>
          localStorage.setItem(
            configName,
            JSON.parse(
              JSON.stringify(dialogInputValue),
              (inputArray = dialogInputValue)
            )
          )}
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
  @import "../../../scss/components/types/array.scss";
</style>
