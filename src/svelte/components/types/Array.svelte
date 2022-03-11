<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button";
  import { library, icon } from "@fortawesome/fontawesome-svg-core";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  library.add(faTrash);
  let trashIcon = icon(faTrash).html;
  export let inputArray = new Array();
  export let scriptName = "";
  export let configName = "";
  let userInputValue = null;

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
        label="Add item to config"
        style="width: 100%;"
      />
    </div>
    <div class="w-95 flex justify-content-between">
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
  </div>
</div>

<style lang="scss">
  @import "../../../scss/components/types/array.scss";
</style>
