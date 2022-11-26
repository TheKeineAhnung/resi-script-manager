<script lang="ts">
  import axios from 'axios';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Textfield from '@smui/textfield';
  import type { UserBuildings } from '../../types/api/UserBuildings';
  import type { VehicleCategories } from '../../types/api/VehicleCategories';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import { icon, library } from '@fortawesome/fontawesome-svg-core';
  import Dialog, { Title, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';

  let buildingIdentifierDialogOpen: boolean = false;
  let buildingIdentifierDialogBuildingName: string = '';
  let buildingIdentifierDialogBuildingId: number = 0;
  let buildingIdentifierDialogBuildingIdentifierInput: string | null = null;

  let vehicleIdentifierDialogOpen: boolean = false;
  let vehicleIdentifierDialogVehicleTypeName: string = '';
  let vehicleIdentifierDialogVehicleId: number = 0;
  let vehicleIdentifierDialogVehicleIdentifierInput: string | null = '';

  library.add(faEdit);
  const editIcon = icon(faEdit).html;

  let loading = true;

  let buildingIdentifier: Record<
    number,
    {
      id: number;
      buildingName: string;
      type: number;
      identifier: string | null;
    }
  > = {};
  let aUserBuildings: UserBuildings[];

  let vehicleIdentifier: Record<
    number,
    {
      id: number;
      readbleShortName: string;
      identifier: string | null;
    }
  > = {};

  let aVehicleCategories:
    | Record<string, VehicleCategories>
    | Record<string, { id: number; name: string }>;

  const editBuildingIdentifier = function (
    buildingId: number,
    buildingIdentifier: string | null
  ) {
    buildingIdentifierDialogBuildingId = buildingId;
    buildingIdentifierDialogBuildingIdentifierInput =
      buildingIdentifier === null ? 'Nicht festgelegt' : buildingIdentifier;
    buildingIdentifierDialogOpen = true;
  };

  const editVehicleIdentifier = function (
    vehicleId: number,
    vehicleIdentifier: string | null
  ) {
    vehicleIdentifierDialogVehicleId = vehicleId;
    vehicleIdentifierDialogVehicleIdentifierInput =
      vehicleIdentifier === null ? 'Nicht festgelegt' : vehicleIdentifier;
    vehicleIdentifierDialogOpen = true;
  };

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

    if (localStorage.getItem('renameManagerBuildingIdentifier')) {
      buildingIdentifier = JSON.parse(
        localStorage.getItem('renameManagerBuildingIdentifier') ?? '{}'
      );
    } else {
      aUserBuildings.forEach(e => {
        buildingIdentifier[e.userBuildingID] = {
          id: e.userBuildingID,
          buildingName: e.userBuildingName,
          type: e.buildingType,
          identifier: null
        };
      });
    }

    aUserBuildings.forEach(e => {
      if (buildingIdentifier[e.userBuildingID] === undefined) {
        buildingIdentifier[e.userBuildingID] = {
          id: e.userBuildingID,
          buildingName: e.userBuildingName,
          type: e.buildingType,
          identifier: null
        };
      }
    });

    localStorage.setItem(
      'renameManagerBuildingIdentifier',
      JSON.stringify(buildingIdentifier)
    );

    // Switch to the right API when available

    // if (
    //   !localStorage.aVehicleCategories ||
    //   JSON.parse(localStorage.aVehicleCategories).lastUpdate <
    //     new Date().getTime() - 5 * 1000 * 60
    // ) {
    //   aVehicleCategories = (await (
    //     await axios({
    //       method: 'get',
    //       url: `api/vehicleCategories`
    //     })
    //   ).data) as unknown as Record<string, VehicleCategories>;
    //   localStorage.setItem(
    //     'aVehicleCategories',
    //     JSON.stringify({
    //       lastUpdate: new Date().getTime(),
    //       value: aVehicleCategories
    //     })
    //   );
    // } else {
    //   aVehicleCategories = JSON.parse(localStorage.aVehicleCategories).value;
    // }

    // temporary template data

    aVehicleCategories = {
      '0': {
        id: 7,
        name: 'HLF 10'
      },
      '1': {
        id: 8,
        name: 'HLF 20'
      }
    };

    if (localStorage.getItem('renameManagerVehicleIdentifier')) {
      vehicleIdentifier = JSON.parse(
        localStorage.getItem('renameManagerVehicleIdentifier') ?? '{}'
      );
    } else {
      for (let key in aVehicleCategories) {
        const e: { id: number; name: string } = aVehicleCategories[key];
        vehicleIdentifier[e.id] = {
          id: e.id,
          readbleShortName: e.name,
          identifier: null
        };
      }
    }

    localStorage.setItem(
      'renameManagerVehicleIdentifier',
      JSON.stringify(vehicleIdentifier)
    );

    loading = false;
  };

  init();
</script>

{#if !loading}
  <div class="w-100 grid gap-1 columns-2">
    <DataTable table$aria-label="Building identifier list" style="width: 100%;">
      <Head>
        <Row>
          <Cell numeric>Gebäude ID</Cell>
          <Cell>Gebäude Name</Cell>
          <Cell>Kennung</Cell>
          <Cell>Bearbeiten</Cell>
        </Row>
      </Head>
      <Body>
        {#each Object.entries(buildingIdentifier) as [key, value]}
          <Row>
            <Cell numeric>{value.id}</Cell>
            <Cell>{value.buildingName}</Cell>
            <Cell
              >{value.identifier === null
                ? 'Nicht festgelegt'
                : value.identifier}</Cell
            >
            <Cell
              on:click={() => {
                editBuildingIdentifier(value.id, value.identifier);
              }}>{@html editIcon}</Cell
            >
          </Row>
        {/each}
      </Body>
    </DataTable>
    <DataTable table$aria-label="Vehicle identifier list" style="width: 100%;">
      <Head>
        <Row>
          <Cell numeric>Fahrzeug ID</Cell>
          <Cell>Fahrzeug Name Name</Cell>
          <Cell>Kennung</Cell>
          <Cell>Bearbeiten</Cell>
        </Row>
      </Head>
      <Body>
        {#each Object.entries(vehicleIdentifier) as [key, value]}
          <Row>
            <Cell numeric>{value.id}</Cell>
            <Cell>{value.readbleShortName}</Cell>
            <Cell
              >{value.identifier === null
                ? 'Nicht festgelegt'
                : value.identifier}</Cell
            >
            <Cell
              on:click={() => {
                editVehicleIdentifier(value.id, value.identifier);
              }}>{@html editIcon}</Cell
            >
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
{/if}

<Dialog
  bind:open={buildingIdentifierDialogOpen}
  aria-labelledby="Building identifier dialog title"
  aria-describedby="Building identifier dialog content"
>
  <Title id="identifier-dialog-title"
    >Kennung für {buildingIdentifierDialogBuildingName} eingeben</Title
  >
  <div class="flex justify-content-center align-items-center w-100">
    <Textfield
      type="text"
      bind:value={buildingIdentifierDialogBuildingIdentifierInput}
      label="Kennung"
      style="width: 90%;"
    />
  </div>
  <Actions>
    <Button on:click={() => (buildingIdentifierDialogOpen = false)}>
      <Label>Abbrechen</Label>
    </Button>
    <Button
      on:click={() => {
        buildingIdentifierDialogBuildingIdentifierInput =
          buildingIdentifierDialogBuildingIdentifierInput === 'Nicht festgelegt'
            ? null
            : buildingIdentifierDialogBuildingIdentifierInput;
        buildingIdentifier[buildingIdentifierDialogBuildingId].identifier =
          buildingIdentifierDialogBuildingIdentifierInput;
        localStorage.setItem(
          'renameManagerBuildingIdentifier',
          JSON.stringify(buildingIdentifier)
        );
        buildingIdentifier = buildingIdentifier;
        buildingIdentifierDialogOpen = false;
      }}
    >
      <Label>Speichern</Label>
    </Button>
  </Actions>
</Dialog>

<Dialog
  bind:open={vehicleIdentifierDialogOpen}
  aria-labelledby="Vehicle identifier dialog title"
  aria-describedby="Vehicle identifier dialog content"
>
  <Title id="identifier-dialog-title"
    >Kennung für {vehicleIdentifierDialogVehicleTypeName} eingeben</Title
  >
  <div class="flex justify-content-center align-items-center w-100">
    <Textfield
      type="text"
      bind:value={vehicleIdentifierDialogVehicleIdentifierInput}
      label="Kennung"
      style="width: 90%;"
    />
  </div>
  <Actions>
    <Button on:click={() => (vehicleIdentifierDialogOpen = false)}>
      <Label>Abbrechen</Label>
    </Button>
    <Button
      on:click={() => {
        vehicleIdentifierDialogVehicleIdentifierInput =
          vehicleIdentifierDialogVehicleIdentifierInput === 'Nicht festgelegt'
            ? null
            : vehicleIdentifierDialogVehicleIdentifierInput;
        vehicleIdentifier[vehicleIdentifierDialogVehicleId].identifier =
          vehicleIdentifierDialogVehicleIdentifierInput;
        localStorage.setItem(
          'renameManagerVehicleIdentifier',
          JSON.stringify(vehicleIdentifier)
        );
        vehicleIdentifier = vehicleIdentifier;
        vehicleIdentifierDialogOpen = false;
      }}
    >
      <Label>Speichern</Label>
    </Button>
  </Actions>
</Dialog>

<style lang="scss">
  @import './renameManager.scss';
</style>
