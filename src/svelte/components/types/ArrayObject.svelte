<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button";
  import { library, icon } from "@fortawesome/fontawesome-svg-core";
  import { faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  library.add(faTrash, faBan);
  let trashIcon = icon(faTrash).html;
  let banIcon = icon(faBan).html;
  export let inputArray = new Array();
  export let defaultConfig = new Array();
  export let scriptName = "";
  export let configName = "";
  let userInputValue = new Object();
  let loading = true;

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
                label={`Add item '${key}' to config`}
                style="width: 100%;"
              />
            </div>
          {/each}
        {/each}
      {/if}
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
    class="existing flex justify-content-start align-items-start flex-column"
  >
    Current config for {scriptName}
    <div class="datatables flex flex-wrap">
      {#each inputArray as inputArrayItem}
        <div class="m-0_5 w-fit">
          <DataTable
            table$aria-label="{scriptName} config"
            style="max-width: 100%;"
          >
            <Head>
              <Row>
                <Cell>Key</Cell>
                <Cell>Value</Cell>
                <Cell>Remove</Cell>
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
  </div>
</div>

<style lang="scss">
  @import "../../../scss/components/types/array.scss";
</style>
