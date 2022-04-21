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
    faBan,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark,
    faSave,
  } from "@fortawesome/free-solid-svg-icons";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
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
  let exportIcon = icon(faCloudArrowDown).html;
  let importIcon = icon(faCloudArrowUp).html;
  let copyIcon = icon(faCopy).html;
  let closeIcon = icon(faXmark).html;
  let saveIcon = icon(faSave).html;
  export let inputArray = new Array();
  export let defaultConfig = new Array();
  export let scriptName = "";
  export let configName = "";
  export let configDescription;
  let userInputValue = new Object();
  let loading = true;
  let dialogOpen = false;
  let dialogTitle = "";
  let dialogContent = "";
  let snackbarContent = "";
  let snackbarOpen = false;
  let dialogCopy = false;
  let dialogInput = false;
  let dialogInputValue = "";
  let dialogInputDesc = "";

  for (const item of defaultConfig) {
    for (const key in item) {
      userInputValue[key] = null;
    }
    loading = false;
  }

  function clearUserInput() {
    userInputValue = new Object();
    for (const item of defaultConfig) {
      for (const key in item) {
        userInputValue[key] = null;
      }
    }
  }

  function addToConfig() {
    for (const key in userInputValue) {
      if (
        userInputValue[key] === null ||
        userInputValue[key] === "" ||
        userInputValue[key] === undefined ||
        userInputValue[key] === 0
      ) {
        return;
      }
      if (!isNaN(Number(userInputValue[key]))) {
        userInputValue[key] = Number(userInputValue[key]);
      }
    }
    if (inputArray.length > 0) {
      if (inputArray[0][Object.keys(inputArray[0])[0]] === "") {
        inputArray = new Array();
      }
    }
    if (userInputValue !== null && userInputValue !== 0) {
      inputArray.push(userInputValue);
      inputArray.sort();
      userInputValue = new Object();
      for (const item of defaultConfig) {
        for (const key in item) {
          userInputValue[key] = null;
        }
      }
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

  function removeFromConfig(item) {
    inputArray.pop(item);
    localStorage.setItem(configName, JSON.stringify(inputArray));
    inputArray = inputArray;
  }
</script>

<div class="array-object-container grid columns-2" style="min-height: 120px;">
  <div
    class="add flex justify-content-start align-items-start flex-column mt-2"
  >
    <div class="w-95">
      {#if !loading}
        {#each defaultConfig as defaultConfigItem}
          {#each Object.entries(defaultConfigItem) as [key, value]}
            <div class="textfield w-100 mt-1">
              <Textfield
                variant="outlined"
                bind:value={userInputValue[key]}
                label={`Wert '${key}' zur Konfiguration hinzufügen`}
                style="width: 100%;"
              />
            </div>
          {/each}
        {/each}
      {/if}
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
    class="existing flex justify-content-start align-items-start flex-column"
  >
    Aktuelle Konfiguration für {scriptName}.
    <br />
    {#if configDescription !== undefined && configDescription !== null}
      {@html configDescription}
    {/if}
    <div class="datatables flex flex-wrap">
      {#each inputArray as inputArrayItem}
        <div class="m-0_5 w-fit">
          <DataTable
            table$aria-label="{scriptName} config"
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
              {#each Object.entries(inputArrayItem) as [key, value]}
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
                    <span
                      class="color-danger transition-duration-250 cursor-pointer"
                      on:click={() => removeFromConfig(inputArrayItem)}
                      >{@html trashIcon}</span
                    >
                  </Cell>
                </Row>
              {/each}
            </Body>
          </DataTable>
        </div>
      {/each}
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
        on:click={async () => {
          await navigator.clipboard.writeText(dialogContent),
            toggleSnackbar("Einstellungen in die Zwischenablage kopiert");
          resetDialog();
        }}
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
