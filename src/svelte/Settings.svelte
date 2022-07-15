<script lang="ts">
  import { Config } from '../types/Config';
  import type { ScriptInfo, ScriptInfoConfig } from '../types/Scripts';
  import type { Credits } from '../types/Credits';
  import Card, { Content, Actions, Media } from '@smui/card';
  import Switch from '@smui/switch';
  import FormField from '@smui/form-field';
  import Button, { Label } from '@smui/button';
  import Tab from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import Accordion, {
    Panel,
    Header,
    Content as AccordionContent
  } from '@smui-extra/accordion';
  import Dialog, {
    Title,
    Content as DialogContent,
    Actions as DialogActions
  } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import InfoLabel from './components/Label.svelte';
  import ConfigArrayElement from './components/types/Array.svelte';
  import ConfigStringElement from './components/types/String.svelte';
  import ConfigObjectElement from './components/types/Object.svelte';
  import ConfigArrayObjectElement from './components/types/ArrayObject.svelte';
  import { getConfig, setConfig, updateConfig } from '../ts/config';
  import { getScriptInfo, getScriptNames } from '../ts/scripts';
  import { getCredits } from '../ts/credits';
  import { library, icon } from '@fortawesome/fontawesome-svg-core';
  import {
    faSave,
    faBan,
    faCodeBranch,
    faUser,
    faBorderAll,
    faSkull,
    faRotate,
    faBug,
    faCodePullRequest,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark
  } from '@fortawesome/free-solid-svg-icons';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  library.add(
    faSave,
    faBan,
    faCodeBranch,
    faUser,
    faBorderAll,
    faRotate,
    faGithub,
    faBug,
    faCodePullRequest,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark
  );
  type Tab = 'Scripts' | 'Config' | 'Credits';
  let saveIcon = icon(faSave).html;
  let cancelIcon = icon(faBan).html;
  let versionIcon = icon(faCodeBranch).html;
  let authorIcon = icon(faUser).html;
  let borderIcon = icon(faBorderAll).html;
  let outdatedIcon = icon(faSkull).html;
  let reloadIcon = icon(faRotate).html;
  let githubIcon = icon(faGithub).html;
  let bugIcon = icon(faBug).html;
  let featureIcon = icon(faCodePullRequest).html;
  let exportIcon = icon(faCloudArrowDown).html;
  let importIcon = icon(faCloudArrowUp).html;
  let copyIcon = icon(faCopy).html;
  let closeIcon = icon(faXmark).html;
  let scriptInfo: (ScriptInfo | ScriptInfoConfig)[];
  let creditsInfo: Credits[];
  let scriptNames: string[] = [];
  let config: Config = {};
  let loading: boolean = true;
  let tabs: Tab[] = ['Scripts', 'Config', 'Credits'];
  let active: Tab = 'Scripts';
  let openAccordion: Record<string, boolean> = {};
  let dialogOpen: boolean = false;
  let dialogTitle: string = '';
  let dialogContent: string = '';
  let snackbarContent: string = '';
  let snackbarOpen: boolean = false;
  let dialogCopy: boolean = false;
  let dialogInput: boolean = false;
  let dialogInputValue: string = '';
  let dialogInputDesc: string = '';
  function saveConfig(): void {
    updateConfig(config);
  }
  async function exportConfig(): Promise<void> {
    let config: string = JSON.stringify(await getConfig());
    dialogTitle = 'Deine Einstellungen für den Script-manager';
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
  function toggleSnackbar(
    newSnackbarContent: string,
    closeTimeout = 5000
  ): void {
    snackbarContent = newSnackbarContent;
    snackbarOpen = true;
    setTimeout(() => {
      snackbarOpen = false;
      snackbarContent = '';
    }, closeTimeout);
  }
  async function dialogInputFunc(): Promise<void> {
    updateConfig(JSON.parse(dialogInputValue));
    config = await getConfig();
    toggleSnackbar('Einstellungen gespeichert');
    resetDialog();
  }
  async function init() {
    loading = true;
    scriptInfo = await getScriptInfo();
    scriptNames = await getScriptNames();
    creditsInfo = await getCredits();
    for (let i = 0; i < scriptInfo.length; i++) {
      if (scriptInfo[i].requiresConfig) {
        openAccordion[scriptInfo[i].name] = false;
      }
    }
    if (!localStorage.getItem('resiScriptManagerConfig')) {
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
    ><Tab {tab}><Label>{tab}</Label></Tab></TabBar
  >
  <div class="mt-2 grid gap-1 columns-auto" id="scriptManagerSettings">
    {#if active === 'Scripts'}
      {#each scriptInfo as info}
        <div class="card-container">
          <Card style="border-radius: 0.75rem">
            <Content>
              <div class="flex justify-content-between align-items-center">
                <h2 class="m-0 h-fit">{info.displayName}</h2>
                <Actions style="padding: 0;">
                  <FormField>
                    <Switch
                      checked={config[info.name].active}
                      on:SMUISwitch:change={e =>
                        (config[info.name].active = !config[info.name].active)}
                    />
                  </FormField>
                </Actions>
              </div>
              <p>{info.description}</p>
              <div class="labels grid column-gap-0_5 row-gap-1 columns-3">
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
                    text={`${outdatedIcon} ${info.outdated ? 'True' : 'False'}`}
                  />
                </div>
              </div>
            </Content>
          </Card>
        </div>
      {/each}
    {:else if active === 'Config'}
      <div class="accordion-container w-100 area-1-1-1-6">
        <Accordion>
          {#each Object.entries(config) as [name, value]}
            {#each scriptInfo as scriptInfoElement}
              {#if name.toLowerCase() === scriptInfoElement.name.toLowerCase()}
                {#if scriptInfoElement.requiresConfig}
                  {#if value.active}
                    <Panel extend>
                      <Header>{scriptInfoElement.displayName}</Header>
                      <AccordionContent>
                        {#each Object.entries(scriptInfoElement.config) as [configElementName, configElementValue]}
                          <div
                            id={scriptInfoElement.name}
                            data-settingStorageName={configElementName}
                          >
                            <div>
                              {#if configElementValue.type === 'array'}
                                <ConfigArrayElement
                                  inputArray={localStorage.getItem(
                                    configElementName
                                  )
                                    ? JSON.parse(
                                        // @ts-ignore-error
                                        localStorage.getItem(configElementName)
                                      )
                                    : configElementValue.default}
                                  scriptName={scriptInfoElement.displayName}
                                  configName={configElementName}
                                  configDescription={configElementValue.description}
                                />
                              {:else if configElementValue.type === 'string'}
                                <ConfigStringElement
                                  inputString={localStorage.getItem(
                                    configElementName
                                  )
                                    ? localStorage.getItem(configElementName)
                                    : configElementValue.default}
                                  scriptName={scriptInfoElement.displayName}
                                  configName={configElementName}
                                  configDescription={configElementValue.description}
                                />
                              {:else if configElementValue.type === 'object'}
                                <ConfigObjectElement
                                  inputObject={localStorage.getItem(
                                    configElementName
                                  )
                                    ? JSON.parse(
                                        // @ts-ignore-error
                                        localStorage.getItem(configElementName)
                                      )
                                    : configElementValue.default}
                                  scriptName={scriptInfoElement.displayName}
                                  configName={configElementName}
                                  configDescription={configElementValue.description}
                                />
                              {:else if configElementValue.type === 'arrayobject'}
                                <ConfigArrayObjectElement
                                  inputArray={localStorage.getItem(
                                    configElementName
                                  )
                                    ? JSON.parse(
                                        // @ts-ignore-error
                                        localStorage.getItem(configElementName)
                                      )
                                    : configElementValue.default}
                                  defaultConfig={configElementValue.default}
                                  scriptName={scriptInfoElement.displayName}
                                  configName={configElementName}
                                  configDescription={configElementValue.description}
                                />
                              {/if}
                            </div>
                          </div>
                        {/each}
                      </AccordionContent>
                    </Panel>
                  {/if}
                {/if}
              {/if}
            {/each}
          {/each}
        </Accordion>
      </div>
    {:else}
      <div class="card-dislay w-100 area-1-1-1-6 grid gap-1 columns-auto">
        {#each creditsInfo as creditInfoObject}
          <Card style="height: fit-content;">
            <div class="p-1">
              <h3 class="mdc-typography--headline6 m-0">
                {creditInfoObject['name']}
              </h3>
              <h4 class="mdc-typography--subtitle1 m-0" style="color: #888">
                Licence: {creditInfoObject['licence']}
              </h4>
            </div>
            <Media
              class="card-media-16x9"
              aspectRatio="16x9"
              style="background-image: url('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{creditInfoObject[
                'icon'
              ]}'); background-size: auto; {creditInfoObject['icon'] ===
              'github/github-original.svg'
                ? 'filter: invert(1);'
                : ''}"
            />
            <Content class="mdc-typography--body2">
              {#if creditInfoObject['text'] !== null && creditInfoObject['text'] !== undefined}
                <p>{@html creditInfoObject['text']}</p>
              {/if}
            </Content>
          </Card>
        {/each}
      </div>
    {/if}
  </div>
  <div class="flex align-items-center justify-content-between flex-wrap">
    <div>
      <div class="mt-1 flex align-items-center justify-content-end">
        <Button
          style="margin-right: 1rem;"
          variant="raised"
          href="https://github.com/TheKeineAhnung/resi-script-manager/issues/new?assignees=&labels=bug&template=bug_report.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Label>{@html bugIcon} Fehlermeldung</Label>
        </Button>
        <Button
          style="margin-right: 1rem;"
          variant="raised"
          href="https://github.com/TheKeineAhnung/resi-script-manager/issues/new?assignees=&labels=enhancement&template=feature_request.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Label>{@html featureIcon} Feature anfrage</Label>
        </Button>
        <Button
          style="margin-right: 1rem;"
          variant="raised"
          color="secondary"
          href="https://github.com/TheKeineAhnung/resi-script-manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Label>{@html githubIcon} Repository</Label>
        </Button>
      </div>
    </div>
    <div>
      {#if active === 'Scripts'}
        <div class="save mt-1 flex align-items-center justify-content-end">
          <Button
            on:click={async () => await init()}
            variant="raised"
            style="margin-right: 1rem;"
            class="button-shaped-round"
            color="secondary"
          >
            <Label>{@html cancelIcon} Abbrechen</Label>
          </Button>
          <Button
            on:click={() => saveConfig()}
            variant="raised"
            style="margin-right: 1rem;"
            class="button-shaped-round"
          >
            <Label>{@html saveIcon} Speichern</Label>
          </Button>
          <Button
            on:click={() => saveConfig()}
            variant="raised"
            class="button-shaped-round"
            id="saveButtonReload"
          >
            <Label>{@html reloadIcon} Speichern & neuladen</Label>
          </Button>
        </div>
      {:else if active === 'Config'}
        <div
          class="config-options mt-1 flex align-items-center justify-content-end"
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
      {/if}
    </div>
  </div>
{/if}
<Dialog
  bind:open={dialogOpen}
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  scrimClickAction=""
  escapeKeyAction=""
>
  <Title id="simple-title">{dialogTitle}</Title>
  <DialogContent id="simple-content">{dialogContent}</DialogContent>
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
            toggleSnackbar('Einstellungen in die Zwischenablage kopiert');
          resetDialog();
        }}
      >
        <Label>{@html copyIcon} Kopieren</Label>
      </Button>
    {/if}
    {#if dialogInput}
      <Button on:click={() => dialogInputFunc()}>
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
    <div class="bg-success snackbar-child"><span>{snackbarContent}</span></div>
  </div>
{/if}

<style lang="scss">
  @import '../scss/settings.scss';
</style>
