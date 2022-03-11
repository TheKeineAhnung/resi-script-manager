<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import { library, icon } from "@fortawesome/fontawesome-svg-core";
  import { faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
  library.add(faTrash, faBan);
  let trashIcon = icon(faTrash).html;
  let banIcon = icon(faBan).html;
  export let inputObject = new Object();
  export let scriptName = "";
  export let configName = "";
  let userInputKey = null;
  let userInputValue = null;

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
</script>

<div class="array-container grid columns-2" style="min-height: 120px;">
  <div
    class="add flex justify-content-start align-items-start flex-column mt-2"
  >
    <div class="w-95">
      <Textfield
        variant="outlined"
        bind:value={userInputKey}
        label="Set key for config"
        style="width: 100%;"
      />
      <Textfield
        variant="outlined"
        bind:value={userInputValue}
        label="Set value for config"
        style="width: 100%; margin-top: 1rem"
      />
    </div>
    <div class="w-95 flex justify-content-between mt-2">
      <Button style="width: 48%;" on:click={clearUserInput} variant="raised"
        >Reset</Button
      >
      <Button style="width: 48%;" on:click={addToConfig} variant="raised"
        >Submit</Button
      >
    </div>
  </div>
  <div
    class="existing flex justify-content-center align-items-center flex-column"
  >
    Current config for {scriptName}
    <DataTable table$aria-label="{scriptName} config" style="max-width: 100%;">
      <Head>
        <Row>
          <Cell>Key</Cell>
          <Cell>Value</Cell>
          <Cell>Remove</Cell>
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
  </div>
</div>

<style lang="scss">
  @import "../../../scss/components/types/object.scss";
</style>
