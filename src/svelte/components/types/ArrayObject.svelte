<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button";
  import { library, icon } from "@fortawesome/fontawesome-svg-core";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  library.add(faTrash);
  let trashIcon = icon(faTrash).html;
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

  function removeFromConfig(value) {
    inputArray = inputArray.filter(function (item) {
      return item !== value;
    });
    localStorage.setItem(configName, JSON.stringify(inputArray));
  }
</script>

<div class="array-object-container grid columns-2" style="min-height: 120px;">
  <div class="add flex justify-content-around align-items-start flex-column">
    <div class="w-95">
      {#if !loading}
        {#each defaultConfig as defaultConfigItem}
          {#each Object.entries(defaultConfigItem) as [key, value]}
            <div class="textfield w-100 mt-1">
              <Textfield
                variant="outlined"
                bind:value={userInputValue[key]}
                label={`Add item '${key}' to Config`}
                style="width: 100%;"
              />
            </div>
          {/each}
        {/each}
      {/if}
    </div>
    <div class="w-95 flex justify-content-between mt-1">
      <Button style="width: 48%;" on:click={clearUserInput} variant="raised"
        >Reset</Button
      >
      <Button style="width: 48%;" on:click={addToConfig} variant="raised"
        >Submit</Button
      >
    </div>
  </div>
  <div class="existing">
    Current config for {scriptName}
    {#each inputArray as inputArrayItem}
      {#each Object.entries(inputArrayItem) as [key, value]}
        <div>{key} : {value}</div>
      {/each}
    {/each}
  </div>
</div>

<style lang="scss">
  @import "../../../scss/components/types/array.scss";
</style>
