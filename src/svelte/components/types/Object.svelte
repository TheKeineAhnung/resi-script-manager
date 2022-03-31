<script>
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Dialog, {
    Title,
    Content as DialogContent,
    Actions as DialogActions,
  } from "@smui/dialog";
  import { library, icon } from "@fortawesome/fontawesome-svg-core";
  import {
    faTrash,
    faBan,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark,
    faSave,
  } from "@fortawesome/free-solid-svg-icons";
  library.add(
    faTrash,
    faBan,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark,
    faSave
  );
  let trashIcon = icon(faTrash).html;
  let banIcon = icon(faBan).html;
  let exportIcon = icon(faCloudArrowDown).html;
  let importIcon = icon(faCloudArrowUp).html;
  let copyIcon = icon(faCopy).html;
  let closeIcon = icon(faXmark).html;
  let saveIcon = icon(faSave).html;
  export let inputObject = new Object();
  export let scriptName = "";
  export let configName = "";
  let userInputKey = null;
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
    userInputKey = null;
    userInputValue = null;
  }

  function addToConfig() {
    if (
      userInputKey !== null &&
      userInputKey !== 0 &&
      userInputValue !== null &&
      userInputValue !== 0
    ) {
      inputObject[userInputKey] = userInputValue;
      userInputKey = null;
      userInputValue = null;
      inputObject = inputObject;
    }
    localStorage.setItem(configName, JSON.stringify(inputObject));
    inputObject = inputObject;
  }

  function removeFromConfig(key) {
    delete inputObject[key];
    localStorage.setItem(configName, JSON.stringify(inputObject));
    inputObject = inputObject;
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
</script>

<div class="array-container grid columns-2" style="min-height: 120px;">
  <div
    class="add flex justify-content-start align-items-start flex-column mt-2"
  >
    <div class="w-95">
      <Textfield
        variant="outlined"
        bind:value={userInputKey}
        label="Schlüssel für Konfiguration hinzufügen"
        style="width: 100%;"
      />
      <Textfield
        variant="outlined"
        bind:value={userInputValue}
        label="Wert für Konfiguration hinzufügen"
        style="width: 100%; margin-top: 1rem"
      />
    </div>
    <div class="w-95 flex justify-content-between mt-2">
      <Button style="width: 48%;" on:click={clearUserInput} variant="raised"
        >Zurücksetzen</Button
      >
      <Button style="width: 48%;" on:click={addToConfig} variant="raised"
        >Hinzufügen</Button
      >
    </div>
  </div>
  <div
    class="existing flex justify-content-center align-items-center flex-column"
  >
    Aktuelle Konfiguration für {scriptName}
    <DataTable
      table$aria-label="{scriptName} Konfiguration"
      style="max-width: 100%;"
    >
      <Head>
        <Row>
          <Cell>Schlüssel</Cell>
          <Cell>Wert</Cell>
          <Cell>Entfernen</Cell>
        </Row>
      </Head>
      <Body>
        {#each Object.entries(inputObject) as [key, value]}
          <Row>
            <Cell>{key}</Cell>
            <Cell>
              {#if value.startsWith("http")}
                <a href={value} target="_blank" rel="noopener noreferrer"
                  >{value}</a
                >
              {:else}
                {value}
              {/if}
            </Cell>
            <Cell style="text-align: center;">
              {#if value !== "null" && value !== null}
                <span
                  class="color-danger transition-duration-250 cursor-pointer"
                  on:click={() => removeFromConfig(key)}>{@html trashIcon}</span
                >
              {:else}
                <span class="color-danger transition-duration-250"
                  >{@html banIcon}</span
                >
              {/if}
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
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
              (inputObject = dialogInputValue)
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
  @import "../../../scss/components/types/object.scss";
</style>
