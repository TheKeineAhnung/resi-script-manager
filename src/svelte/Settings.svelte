<script lang="ts">
  import type { Config } from '../types/Config';
  import type { ScriptInfo, ScriptInfoConfig } from '../types/ScriptInfo';
  import type { Credit } from '../types/Credit';
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
  import HelperText from '@smui/textfield/helper-text';
  import Icon from '@smui/textfield/icon';
  import InfoLabel from './components/Label.svelte';
  import ConfigArrayElement from './components/types/Array.svelte';
  import ConfigStringElement from './components/types/String.svelte';
  import ConfigObjectElement from './components/types/Object.svelte';
  import ConfigArrayObjectElement from './components/types/ArrayObject.svelte';
  import { getConfig, setConfig, updateConfig } from '../ts/config';
  import { getScriptInfo, getScriptNames, filterScripts } from '../ts/scripts';
  import { getCredits } from '../ts/credits';
  import { library, icon } from '@fortawesome/fontawesome-svg-core';
  import {
    faSave,
    faBan,
    faUser,
    faBorderAll,
    faRotate,
    faBug,
    faCodePullRequest,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faXmark
  } from '@fortawesome/free-solid-svg-icons';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import { event } from 'jquery';
  library.add(
    faSave,
    faBan,
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
  let authorIcon = icon(faUser).html;
  let borderIcon = icon(faBorderAll).html;
  let reloadIcon = icon(faRotate).html;
  let githubIcon = icon(faGithub).html;
  let bugIcon = icon(faBug).html;
  let featureIcon = icon(faCodePullRequest).html;
  let exportIcon = icon(faCloudArrowDown).html;
  let importIcon = icon(faCloudArrowUp).html;
  let copyIcon = icon(faCopy).html;
  let closeIcon = icon(faXmark).html;
  let scriptInfo: (ScriptInfo | ScriptInfoConfig)[];
  let creditsInfo: Credit[];
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
  let filterTextInput = '';
  let categoryTextInput: string = '';
  let activeFilterCategories: string[] = [];
  let categoryTextInputFocused: boolean = false;
  let keyName: string;

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
  async function handleWindowKeydown(event: KeyboardEvent) {
    keyName = event.key;

    switch (keyName) {
      case 'Enter':
        if (categoryTextInputFocused) {
          await categoryFilterInputHandling('add', categoryTextInput);
        }
        break;

      default:
        break;
    }
  }
  async function categoryFilterInputHandling(
    action: 'add' | 'remove',
    category: string
  ) {
    switch (action) {
      case 'remove':
        if (activeFilterCategories.indexOf(category) !== -1) {
          activeFilterCategories.splice(
            activeFilterCategories.indexOf(category),
            1
          );
          break;
        }
      default:
        if (!activeFilterCategories.includes(category)) {
          activeFilterCategories.push(category);
        }
        break;
    }
    activeFilterCategories = activeFilterCategories;
    scriptInfo = await filterScripts(activeFilterCategories, filterTextInput);
    categoryTextInput = '';
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

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
</svelte:head>

<svelte:window on:keydown={async event => await handleWindowKeydown(event)} />

{#if !loading}
  <TabBar {tabs} let:tab bind:active
    ><Tab {tab}><Label>{tab}</Label></Tab></TabBar
  >
  <div id="scriptManagerSettings">
    {#if active === 'Scripts'}
      <div
        class="mt-1 w-100 filter flex justify-content-start align-items-start text-filter"
        id="filter"
      >
        <div class="text-filter mr-2" style="width: 15%;">
          <Textfield
            style="width: 100%;"
            variant="outlined"
            bind:value={filterTextInput}
            label="Suchbegriff"
            on:input={async () => {
              scriptInfo = await filterScripts(
                activeFilterCategories,
                filterTextInput
              );
            }}
          >
            <HelperText slot="helper">Suche Skripte mit ihrem Namen.</HelperText
            ></Textfield
          >
        </div>
        <div class="category-filter" style="width: 15%;">
          <div>
            <Textfield
              style="width: 100%;"
              variant="outlined"
              bind:value={categoryTextInput}
              label="Kategorie"
              on:focus={() => (categoryTextInputFocused = true)}
              on:blur={() => (categoryTextInputFocused = false)}
            >
              <span
                slot="trailingIcon"
                class="h-100 flex"
                on:click={async () => {
                  await categoryFilterInputHandling('add', categoryTextInput);
                }}
              >
                <Icon class="material-icons">add</Icon>
              </span>
              <HelperText slot="helper"
                >Suche Skripte mit Hilfe ihrer Kategorien.</HelperText
              >
            </Textfield>
          </div>
        </div>
        <div class="active-categories w-stretch flex">
          {#each activeFilterCategories as activeFilterCategory}
            <div
              style="height: 56px;"
              class="flex justify-content-start align-items-center ml-1 w-fit"
              on:click={async () => {
                await categoryFilterInputHandling(
                  'remove',
                  activeFilterCategory
                );
              }}
            >
              <InfoLabel
                dismissable={true}
                rounded={true}
                text={activeFilterCategory}
                type="info"
              />
            </div>
          {/each}
        </div>
      </div>
      <div class="grid gap-1 columns-auto mt-1" id="scriptManagerSettings">
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
                          (config[info.name].active =
                            !config[info.name].active)}
                      />
                    </FormField>
                  </Actions>
                </div>
                <p>{info.description}</p>
                <div class="labels grid column-gap-0_5 row-gap-1 columns-2">
                  <div class="flex justify-content-center align-items-center">
                    <InfoLabel
                      rounded={true}
                      text={`${authorIcon} ${info.author}`}
                    />
                  </div>
                  <div class="flex justify-content-center align-items-center">
                    <InfoLabel
                      rounded={true}
                      text={`${borderIcon} ${info.category}`}
                    />
                  </div>
                </div>
              </Content>
            </Card>
          </div>
        {/each}
      </div>
    {:else if active === 'Config'}
      <div class="accordion-container w-100 mt-2">
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
      <div class="card-dislay w-100 grid gap-1 columns-auto mt-2">
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
