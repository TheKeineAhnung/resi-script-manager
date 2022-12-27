<script lang="ts">
  import ActiveBuildings from './components/ActiveBuildings.svelte';
  import BuildingIdentifier from './components/BuildingIdentifier.svelte';
  import BuildingTownIdentifier from './components/BuildingTownIdentifier.svelte';
  import Button, { Label } from '@smui/button';
  import LinearProgress from '@smui/linear-progress';
  import OrganizationIdentifier from './components/OrganizationIdentifier.svelte';
  import Rename from './components/Rename.svelte';
  import VehicleIdentifier from './components/VehicleIdentifier.svelte';

  // ! Important: order in this array must be the same as in the `settingsPages` array
  const settingsComponents = [
    { component: OrganizationIdentifier },
    { component: BuildingIdentifier },
    { component: BuildingTownIdentifier },
    { component: VehicleIdentifier },
    { component: ActiveBuildings },
    { component: Rename }
  ];
  let selectedSettingsComponent = settingsComponents[0];

  type SettingsPage =
    | 'BuildingIdentifier'
    | 'BuildingTownIdentifier'
    | 'VehicleIdentifier'
    | 'ActiveBuildings'
    | 'Rename'
    | 'OrganizationIdentifier';

  let settingsPages: SettingsPage[] = [
    'OrganizationIdentifier',
    'BuildingIdentifier',
    'BuildingTownIdentifier',
    'VehicleIdentifier',
    'ActiveBuildings',
    'Rename'
  ];
  let activeSettingPage: SettingsPage = settingsPages[0];

  let progress = 0;
  let closed = false;

  let loading = true;

  const init = async function () {
    loading = true;
    loading = false;
  };

  init();
</script>

{#if !loading}
  <div class="progress flex align-items-center flex-row w-100 mb-1">
    <div class="before w-fit mr-0_5">
      <Button
        disabled={settingsPages.indexOf(activeSettingPage) <= 0}
        on:click={() => {
          (activeSettingPage =
            settingsPages[
              Math.round(settingsPages.indexOf(activeSettingPage) - 1)
            ]),
            (activeSettingPage = activeSettingPage),
            (progress -= 1 / (settingsPages.length - 1));
          selectedSettingsComponent =
            settingsComponents[
              Math.round(progress * (settingsPages.length - 1))
            ];
        }}
        variant="raised"
      >
        <Label>Vorheriger Schritt</Label>
      </Button>
    </div>
    <div class="progress w-stretch">
      <LinearProgress {progress} {closed} />
    </div>
    <div class="next w-fit ml-1">
      <Button
        disabled={settingsPages.indexOf(activeSettingPage) + 1 >
          settingsPages.length - 1}
        on:click={() => {
          (activeSettingPage =
            settingsPages[
              Math.round(settingsPages.indexOf(activeSettingPage) + 1)
            ]),
            (activeSettingPage = activeSettingPage);
          progress += 1 / (settingsPages.length - 1);
          selectedSettingsComponent =
            settingsComponents[
              Math.round(progress * (settingsPages.length - 1))
            ];
        }}
        variant="raised"
      >
        <Label>Nächster Schritt</Label>
      </Button>
    </div>
  </div>
  <div class="w-100 grid columns-1">
    <svelte:component this={selectedSettingsComponent.component} />
  </div>
{/if}

<style lang="scss">
  @import './scss/renameManager.scss';
</style>
