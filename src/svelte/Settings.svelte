<script>
  import Card, { Content, Actions } from "@smui/card";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";
  import Button, { Label } from "@smui/button";
  import Tab from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Accordion, {
    Panel,
    Header,
    Content as AccordionContent,
  } from "@smui-extra/accordion";
  import InfoLabel from "./components/Label.svelte";
  import ConfigArrayElement from "./components/types/Array.svelte";
  import ConfigStringElement from "./components/types/String.svelte";
  import ConfigObjectElement from "./components/types/Object.svelte";
  import ConfigArrayObjectElement from "./components/types/ArrayObject.svelte";
  import { getConfig, setConfig, updateConfig } from "../js/config";
  import { getScripts, getScriptNames } from "../js/scripts";
  import { library, icon } from "@fortawesome/fontawesome-svg-core";
  import {
    faSave,
    faBan,
    faCodeBranch,
    faUser,
    faBorderAll,
    faSkull,
  } from "@fortawesome/free-solid-svg-icons";
  library.add(faSave, faBan, faCodeBranch, faUser, faBorderAll);
  let saveIcon = icon(faSave).html;
  let cancelIcon = icon(faBan).html;
  let versionIcon = icon(faCodeBranch).html;
  let authorIcon = icon(faUser).html;
  let borderIcon = icon(faBorderAll).html;
  let outdatedIcon = icon(faSkull).html;
  let scriptInfo;
  let scriptNames = new Array();
  let config = new Object();
  let loading = true;
  let tabs = ["Scripts", "Config"];
  let active = "Scripts";
  let openAccordion = new Object();

  function saveConfig() {
    updateConfig(config);
  }

  async function init() {
    loading = true;
    scriptInfo = await getScripts();
    scriptNames = await getScriptNames();

    for (let i = 0; i < scriptInfo.length; i++) {
      if (scriptInfo[i].requiresConfig) {
        openAccordion[scriptInfo[i].name] = false;
      }
    }

    if (!localStorage.getItem("resiScriptManagerConfig")) {
      config = await setConfig(scriptNames);
    } else {
      config = await getConfig();
    }

    loading = false;
  }

  init();
</script>

{#if !loading}
  <TabBar {tabs} let:tab bind:active
    ><Tab {tab}>
      <Label>{tab}</Label></Tab
    ></TabBar
  >
  <div class="mt-2 grid gap-1 columns-auto" id="scriptManagerSettings">
    {#if active === "Scripts"}
      {#each scriptInfo as info}
        <div class="card-container">
          <Card style="border-radius: 0.75rem">
            <Content>
              <h2 class="m-0">{info.displayName}</h2>
              <p>{info.description}</p>
              <div class="labels grid column-gap-1 row-gap-1 columns-3">
                <div>
                  <InfoLabel
                    rounded={true}
                    text={`${authorIcon} ${info.author}`}
                  />
                </div>
                <div>
                  <InfoLabel
                    rounded={true}
                    type="warning"
                    text={`${versionIcon} ${info.version}`}
                  />
                </div>
                <div>
                  <InfoLabel
                    rounded={true}
                    text={`${borderIcon} ${info.category}`}
                  />
                </div>
                <div>
                  <InfoLabel
                    rounded={true}
                    type="warning"
                    text={`${outdatedIcon} ${info.outdated ? "True" : "False"}`}
                  />
                </div>
              </div>
            </Content>
            <Actions>
              <div>
                <FormField>
                  <Switch
                    checked={config[info.name].active}
                    on:SMUISwitch:change={(e) =>
                      (config[info.name].active = !config[info.name].active)}
                  />
                </FormField>
              </div>
            </Actions>
          </Card>
        </div>
      {/each}
    {:else}
      <div class="accordion-container w-100 area-1-1-1-6">
        <Accordion>
          {#each Object.entries(config) as [name, value]}
            {#each scriptInfo as scriptInfoElement}
              {#if name === scriptInfoElement.name}
                {#if scriptInfoElement.requiresConfig}
                  <Panel extend>
                    <Header>
                      {scriptInfoElement.displayName}
                    </Header>
                    <AccordionContent>
                      {#each Object.entries(scriptInfoElement.config) as [configElementName, configElementValue]}
                        <div
                          id={scriptInfoElement.name}
                          data-settingStorageName={configElementName}
                        >
                          <div>
                            {#if configElementValue.type === "array"}
                              <ConfigArrayElement
                                inputArray={localStorage.getItem(
                                  configElementName
                                )
                                  ? JSON.parse(
                                      localStorage.getItem(configElementName)
                                    )
                                  : configElementValue.default}
                                scriptName={scriptInfoElement.displayName}
                                configName={configElementName}
                              />
                            {:else if configElementValue.type === "string"}
                              <ConfigStringElement
                                inputString={localStorage.getItem(
                                  configElementName
                                )
                                  ? localStorage.getItem(configElementName)
                                  : configElementValue.default}
                                scriptName={scriptInfoElement.displayName}
                                configName={configElementName}
                              />
                            {:else if configElementValue.type === "object"}
                              <ConfigObjectElement
                                inputObject={localStorage.getItem(
                                  configElementName
                                )
                                  ? JSON.parse(
                                      localStorage.getItem(configElementName)
                                    )
                                  : configElementValue.default}
                                scriptName={scriptInfoElement.displayName}
                                configName={configElementName}
                              />
                            {:else if configElementValue.type === "array-object"}
                              <ConfigArrayObjectElement
                                inputArray={localStorage.getItem(
                                  configElementName
                                )
                                  ? JSON.parse(
                                      localStorage.getItem(configElementName)
                                    )
                                  : configElementValue.default}
                                defaultConfig={configElementValue.default}
                                scriptName={scriptInfoElement.displayName}
                                configName={configElementName}
                              />
                            {/if}
                          </div>
                        </div>
                      {/each}
                    </AccordionContent>
                  </Panel>
                {/if}
              {/if}
            {/each}
          {/each}
        </Accordion>
      </div>
    {/if}
  </div>
  <div class="save mt-1 flex align-items-center justify-content-end">
    <Button
      on:click={() => window.location.reload()}
      variant="raised"
      style="margin-right: 1rem;"
      class="button-shaped-round"
    >
      <Label>
        {@html cancelIcon}
        Abbrechen
      </Label>
    </Button>
    <Button
      on:click={() => saveConfig()}
      variant="raised"
      class="button-shaped-round"
      id="saveButton"
    >
      <Label>{@html saveIcon} Speichern & neuladen</Label>
    </Button>
  </div>
{/if}

<style lang="scss">
  @import "../scss/settings.scss";
</style>
