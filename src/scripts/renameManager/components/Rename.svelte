<script lang="ts">
  import axios from 'axios';
  import Button, { Label } from '@smui/button';
  import Dialog, { Title, Actions } from '@smui/dialog';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import { icon, library } from '@fortawesome/fontawesome-svg-core';
  import LinearProgress from '@smui/linear-progress';
  import type { Buildings } from '../../../types/api/Buildings';
  import type { UserBuildings } from '../../../types/api/UserBuildings';
  import type { UserVehicles } from '../../../types/api/UserVehicles';
  import { sleep } from '../../../ts/helper/general';

  library.add(faEdit);

  let loading: boolean = true;
  let confirmDialogOpen: boolean = false;
  let renameStatus: 'start' | 'running' | 'finished' = 'start';
  let renameProgress: number = 0;

  const rename = async function () {
    renameStatus = 'running';
    let aBuildings: Buildings[];
    let aUserBuildings: UserBuildings[];
    let aUserVehicles: UserVehicles[];

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
      !localStorage.aUserVehicles ||
      JSON.parse(localStorage.aUserVehicles).lastUpdate <
        new Date().getTime() - 5 * 1000 * 60
    ) {
      aUserVehicles = (await (
        await axios({
          method: 'get',
          url: `api/userVehicles`
        })
      ).data) as unknown as UserVehicles[];
      localStorage.setItem(
        'aUserVehicles',
        JSON.stringify({
          lastUpdate: new Date().getTime(),
          value: aUserVehicles
        })
      );
    } else {
      aUserVehicles = JSON.parse(localStorage.aUserVehicles).value;
    }

    let renameBuildings: Record<number, { checked: boolean }> = JSON.parse(
      localStorage.getItem('activeRenameBuildings') ?? '{}'
    );
    let vehicleIdentifier: Record<
      number,
      {
        id: number;
        readbleShortName: string;
        identifier: string | null;
      }
    > = JSON.parse(
      localStorage.getItem('renameManagerVehicleIdentifier') ?? '{}'
    );
    let buildingIdentifier: Record<
      number,
      {
        id: number;
        buildingName: string;
        type: number;
        identifier: string | null;
      }
    > = JSON.parse(
      localStorage.getItem('renameManagerBuildingIdentifier') ?? '{}'
    );
    let buildingTownIdentifier: Record<
      number,
      {
        id: number;
        buildingName: string;
        type: number;
        identifier: string | null;
      }
    > = JSON.parse(
      localStorage.getItem('renameManagerBuildingTownIdentifier') ?? '{}'
    );
    let organizationIdentifier: Record<
      number,
      {
        id: number;
        name: string;
        identifier: string | null;
      }
    > = JSON.parse(
      localStorage.getItem('renameManagerOrganizationIdentifier') ?? '{}'
    );

    Object.keys(renameBuildings).forEach(async key => {
      const renameBuildingConfig = renameBuildings[parseInt(key)];
      const renameBuildingId = parseInt(key);
      const userBuildingData = aUserBuildings
        .filter(e => e.userBuildingID == renameBuildingId)
        .at(0);
      const aRenameBuildingIds: number[] = [];
      Object.keys(renameBuildings).forEach(e =>
        renameBuildings[parseInt(e)].checked
          ? aRenameBuildingIds.push(parseInt(e))
          : null
      );
      const allRenameVehicleIds = aUserVehicles.filter(e =>
        aRenameBuildingIds.includes(e.userVehicleID)
      );

      if (renameBuildingConfig.checked && userBuildingData !== undefined) {
        const organizationRenameIdentifier =
          organizationIdentifier[userBuildingData.buildingType];
        const buildingRenameTown =
          buildingTownIdentifier[userBuildingData.userBuildingID].identifier;
        const buildingRenameIdentifier =
          buildingIdentifier[userBuildingData.userBuildingID].identifier;

        const buildingVehicles = aUserVehicles.filter(
          e => e.userBuildingID == userBuildingData.userBuildingID
        );

        let vehicleCount: Record<number, { count: number }> = {};

        buildingVehicles.forEach(async buildingVehicle => {
          const userVehicleId = buildingVehicle.userVehicleID;
          vehicleCount[userVehicleId].count =
            vehicleCount[userVehicleId].count === undefined
              ? 1
              : vehicleCount[userVehicleId].count++;

          const vehicleRenameIdentifier =
            vehicleIdentifier[userVehicleId].identifier;

          const finalVehicleName = `${organizationRenameIdentifier ?? ''} ${
            buildingRenameTown ?? ''
          } ${buildingRenameIdentifier ?? ''}/${
            vehicleRenameIdentifier ?? ''
          }-${vehicleCount[userVehicleId].count}`;

          let renameRequest: { status: string };

          do {
            renameRequest = (await (
              await axios({
                method: 'post',
                url: `api/editVehicle`,
                data: {
                  userVehicleID: userVehicleId,
                  userVehicleName: finalVehicleName
                }
              })
            ).data) as unknown as { status: string };
            await sleep(250);
          } while (renameRequest.status !== 'success');

          renameProgress += 1 / allRenameVehicleIds.length;
        });
      }
    });

    setTimeout(() => {
      renameStatus = 'finished';
    }, 2000);
  };

  const init = async function () {
    loading = true;
    loading = false;
  };

  init();
</script>

{#if !loading}
  <div class="font-weight-700">
    Bestätige, dass du nach deinen angegebenen Angaben umbennen willst.<br />
    <span class="color-danger"
      ><b>Warnung:</b> Nach einmaligem umbennen kann der vorherige Stand nur durch
      eigenarbeit wiederhergestellt werden!</span
    >
  </div>
  {#if renameStatus === 'start'}
    <Button
      variant="raised"
      on:click={async () => {
        confirmDialogOpen = true;
      }}>Umbennenen starten</Button
    >
  {:else if renameStatus === 'running'}
    <LinearProgress progress={renameProgress} />
  {:else}
    <div>Finished</div>
  {/if}
{/if}

<Dialog
  bind:open={confirmDialogOpen}
  aria-labelledby="Vehicle identifier dialog title"
  aria-describedby="Vehicle identifier dialog content"
>
  <Title id="identifier-dialog-title">Umbennenen bestätigen</Title>
  <div class=" w-100">
    <div style="padding: 0 1.5rem;">
      Bitte bestätige, dass du das umbennen starten willst.
    </div>
    <Actions style="padding: 0 1.5rem;">
      <Button on:click={() => (confirmDialogOpen = false)}>
        <Label>Abbrechen</Label>
      </Button>
      <Button
        defaultAction={true}
        on:click={async () => {
          confirmDialogOpen = false;
          await rename();
        }}
      >
        <Label>Starten</Label>
      </Button>
    </Actions>
  </div>
</Dialog>

<style lang="scss">
  @import '../scss/components/rename.scss';
</style>
