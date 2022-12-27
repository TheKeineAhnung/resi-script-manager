<script lang="ts">
  import axios from 'axios';
  import Checkbox from '@smui/checkbox';
  import FormField from '@smui/form-field';
  import type { UserBuildings } from '../../../types/api/UserBuildings';
  import type { Buildings } from '../../../types/api/Buildings';

  let aUserBuildings: UserBuildings[];
  let aBuildings: Buildings[];
  let loading = true;

  let renameBuildings: Record<number, { checked: boolean }>;

  const init = async function () {
    loading = true;
    if (
      !localStorage.aUserBuildings ||
      JSON.parse(localStorage.aUserBuildings).lastUpdate <
        new Date().getTime() - 5 * 1000 * 60
    ) {
      aUserBuildings = (await (
        await axios({
          method: 'get',
          url: `api/userBuildings`
        })
      ).data) as unknown as UserBuildings[];
      localStorage.setItem(
        'aUserBuildings',
        JSON.stringify({
          lastUpdate: new Date().getTime(),
          value: aUserBuildings
        })
      );
    } else {
      aUserBuildings = JSON.parse(localStorage.aUserBuildings).value;
    }

    if (
      !localStorage.aBuildings ||
      JSON.parse(localStorage.aBuildings).lastUpdate <
        new Date().getTime() - 5 * 1000 * 60
    ) {
      aBuildings = (await (
        await axios({
          method: 'get',
          url: `api/buildings`
        })
      ).data) as unknown as Buildings[];
      localStorage.setItem(
        'aBuildings',
        JSON.stringify({
          lastUpdate: new Date().getTime(),
          value: aBuildings
        })
      );
    } else {
      aBuildings = JSON.parse(localStorage.aBuildings).value;
    }

    if (localStorage.activeRenameBuildings) {
      renameBuildings = JSON.parse(localStorage.activeRenameBuildings);
    } else {
      renameBuildings = {};
    }

    aUserBuildings.forEach(userBuilding => {
      if (
        renameBuildings[userBuilding.userBuildingID] === undefined &&
        aBuildings.filter(e => e.buildingID == userBuilding.buildingType).at(0)
          ?.canGenerate
      ) {
        renameBuildings[userBuilding.userBuildingID] = {
          checked: false
        };
      }
    });

    localStorage.setItem(
      'activeRenameBuildings',
      JSON.stringify(renameBuildings)
    );

    loading = false;
  };

  init();
</script>

{#if !loading}
  <h2>Bitte lege fest, welche Gebäude umbenannt werden sollen:</h2>
  <div class="flex justify-content-start align-items-center flex-column">
    <div
      class="firefighter w-100 flex justify-content-start align-items-center flex-wrap"
    >
      <h3 class="w-100">Feuerwehr:</h3>
      {#each aUserBuildings as userBuilding}
        {#if renameBuildings[userBuilding.userBuildingID] !== undefined}
          {#if aBuildings
            .filter(e => e.buildingID == userBuilding.buildingType)
            .at(0)?.organisationName === 'Feuerwehr'}
            <FormField style="width: fit-content;">
              <Checkbox
                bind:checked={renameBuildings[userBuilding.userBuildingID]
                  .checked}
                on:change={() => {
                  setTimeout(() => {
                    localStorage.setItem(
                      'activeRenameBuildings',
                      JSON.stringify(renameBuildings)
                    );
                  }, 200);
                }}
              />
              <span slot="label">{userBuilding.userBuildingName}</span>
            </FormField>
          {/if}
        {/if}
      {/each}
    </div>
    <div
      class="medical w-100 flex justify-content-start align-items-center flex-wrap"
    >
      <h3 class="w-100">Rettungsdienst:</h3>
      {#each aUserBuildings as userBuilding}
        {#if renameBuildings[userBuilding.userBuildingID] !== undefined}
          {#if aBuildings
            .filter(e => e.buildingID == userBuilding.buildingType)
            .at(0)?.organisationName === 'Rettungsdienst'}
            <FormField style="width: fit-content;">
              <Checkbox
                bind:checked={renameBuildings[userBuilding.userBuildingID]
                  .checked}
                on:change={() => {
                  setTimeout(() => {
                    localStorage.setItem(
                      'activeRenameBuildings',
                      JSON.stringify(renameBuildings)
                    );
                  }, 200);
                }}
              />
              <span slot="label">{userBuilding.userBuildingName}</span>
            </FormField>
          {/if}
        {/if}
      {/each}
    </div>
    <div
      class="police w-100 flex justify-content-start align-items-center flex-wrap"
    >
      <h3 class="w-100">Polizei:</h3>
      {#each aUserBuildings as userBuilding}
        {#if renameBuildings[userBuilding.userBuildingID] !== undefined}
          {#if aBuildings
            .filter(e => e.buildingID == userBuilding.buildingType)
            .at(0)?.organisationName === 'Polizei'}
            <FormField style="width: fit-content;">
              <Checkbox
                bind:checked={renameBuildings[userBuilding.userBuildingID]
                  .checked}
                on:change={() => {
                  setTimeout(() => {
                    localStorage.setItem(
                      'activeRenameBuildings',
                      JSON.stringify(renameBuildings)
                    );
                  }, 200);
                }}
              />
              <span slot="label">{userBuilding.userBuildingName}</span>
            </FormField>
          {/if}
        {/if}
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  @import '../scss/components/activeBuildings.scss';
</style>
