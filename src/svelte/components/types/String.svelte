<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button";
  import { library, icon } from "@fortawesome/fontawesome-svg-core";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  library.add(faTrash);
  let trashIcon = icon(faTrash).html;
  export let inputString = "";
  export let scriptName = "";
  export let configName = "";
  let userInputValue = "";

  function clearUserInput() {
    userInputValue = "";
  }

  function addToConfig() {
    localStorage.setItem(configName, userInputValue);
    inputString = userInputValue;
  }

  function removeFromConfig() {
    localStorage.removeItem(configName);
    userInputValue = "";
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
    Aktuelle Konfiguration für {scriptName}
    <div>
      <div class="w-fit bg-success rounded px-1 py-0_5 mt-1">
        {#if inputString !== ""}
          {#if inputString.startsWith("http")}
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
  </div>
</div>

<style lang="scss">
  @import "../../../scss/components/types/string.scss";
</style>
