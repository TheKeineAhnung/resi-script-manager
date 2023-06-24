<script lang="ts">
  import axios from 'axios';
  import Button, { Label } from '@smui/button';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Dialog, { Title, Actions } from '@smui/dialog';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import Textfield from '@smui/textfield';
  import type { VehicleCategories } from '../../../types/api/VehicleCategories';
  import { icon, library } from '@fortawesome/fontawesome-svg-core';
  import { vehicles } from '../../../data/game/vehicles';

  library.add(faEdit);
  const editIcon = icon(faEdit).html;

  let vehicleIdentifierDialogOpen: boolean = false;
  let vehicleIdentifierDialogVehicleTypeName: string = '';
  let vehicleIdentifierDialogVehicleId: number = 0;
  let vehicleIdentifierDialogVehicleIdentifierInput: string | null = '';

  let loading = true;

  let vehicleIdentifier: Record<
    number,
    {
      id: number;
      readbleShortName: string;
      identifier: string | null;
    }
  > = {};

  // TODO: Implement correct type after API change
  let aVehicleCategories:
    | Record<string, VehicleCategories>
    | Record<
        number,
        {
          name: string;
          id: number;
        }
      >;

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
    // TODO: Switch to the right API when available

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

    aVehicleCategories = vehicles;
    localStorage.setItem(
      'renameManagerVehicleIdentifier',
      JSON.stringify(aVehicleCategories)
    );
    let storedIdentifier = JSON.parse(
      localStorage.getItem('renameManagerVehicleIdentifier') ?? '[]'
    );

    if (
      localStorage.getItem('renameManagerVehicleIdentifier') &&
      storedIdentifier[
        Object.keys(storedIdentifier)[Object.keys(storedIdentifier).length - 1]
      ].id === aVehicleCategories[Object.keys(aVehicleCategories).length - 1].id
    ) {
      vehicleIdentifier = JSON.parse(
        localStorage.getItem('renameManagerVehicleIdentifier') ?? '{}'
      );
    } else if (
      localStorage.getItem('renameManagerVehicleIdentifier') &&
      storedIdentifier[
        Object.keys(storedIdentifier)[Object.keys(storedIdentifier).length - 1]
      ].id !== aVehicleCategories[Object.keys(aVehicleCategories).length - 1].id
    ) {
      for (let key in aVehicleCategories) {
        const e: { id: number; name: string } = aVehicleCategories[key];
        if (vehicleIdentifier[e.id] !== undefined) continue;
        vehicleIdentifier[e.id] = {
          id: e.id,
          readbleShortName: e.name,
          identifier: null
        };
      }
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
  <h2>Bitte lege fest, wie welcher Fahrzeugtyp identifiziert werden soll:</h2>
  <DataTable table$aria-label="Vehicle identifier list" style="width: 100%;">
    <Head>
      <Row>
        <Cell numeric>Fahrzeug ID</Cell>
        <Cell>Fahrzeug Name</Cell>
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
            style="cursor: pointer;"
            on:click={() => {
              editVehicleIdentifier(value.id, value.identifier);
            }}>{@html editIcon}</Cell
          >
        </Row>
      {/each}
    </Body>
  </DataTable>
{/if}

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
  @import '../scss/components/vehicleIdentifier.scss';
</style>
