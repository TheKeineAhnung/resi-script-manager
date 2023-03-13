<script lang="ts">
  import axios from 'axios';
  import Button, { Label } from '@smui/button';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Dialog, { Title, Actions } from '@smui/dialog';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import Textfield from '@smui/textfield';
  import type { UserBuildings } from '../../../types/api/UserBuildings';
  import { icon, library } from '@fortawesome/fontawesome-svg-core';
  import type { Buildings } from '../../../types/api/Buildings';
  import { apiGet } from '../../../ts/helper/api';

  library.add(faEdit);
  const editIcon = icon(faEdit).html;

  interface NominatimReverseResponse {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
      road?: string;
      village?: string;
      municipality?: string;
      town?: string;
      county?: string;
      state?: string;
      city?: string;
      city_district?: string;
      suburb?: string;
      'ISO3166-2-lvl4': string;
      postcode?: string;
      country?: string;
      country_code?: string;
    };
    boundingbox: string[];
  }

  let buildingTownIdentifier: Record<
    number,
    {
      id: number;
      buildingName: string;
      type: number;
      identifier: string | null;
    }
  > = {};
  let aUserBuildings: UserBuildings[];
  let aBuildings: Buildings[];

  let buildingTownIdentifierDialogOpen: boolean = false;
  let buildingTownIdentifierDialogBuildingName: string = '';
  let buildingTownIdentifierDialogBuildingId: number = 0;
  let buildingTownIdentifierDialogBuildingTownIdentifierInput: string | null =
    null;

  const editBuildingTownIdentifier = function (
    buildingId: number,
    buildingIdentifier: string | null
  ) {
    buildingTownIdentifierDialogBuildingId = buildingId;
    buildingTownIdentifierDialogBuildingTownIdentifierInput =
      buildingIdentifier === null ? 'Nicht festgelegt' : buildingIdentifier;
    buildingTownIdentifierDialogOpen = true;
  };

  let loading = true;

  const init = async function () {
    loading = true;
    aUserBuildings = (await apiGet(
      'userBuildings',
      localStorage
    )) as unknown as UserBuildings[];
    aBuildings = (await apiGet(
      'buildings',
      localStorage
    )) as unknown as Buildings[];

    if (localStorage.getItem('renameManagerBuildingTownIdentifier')) {
      buildingTownIdentifier = JSON.parse(
        localStorage.getItem('renameManagerBuildingTownIdentifier') ?? '{}'
      );
    }

    aUserBuildings.forEach((e, i) => {
      setTimeout(async () => {
        if (
          buildingTownIdentifier[e.userBuildingID] === undefined &&
          aBuildings.filter(j => j.buildingID == e.buildingType).at(0)
            ?.canGenerate
        ) {
          const buildingLocationData = (await (
            await fetch(
              `https://map.rettungssimulator.online/nominatim/reverse?format=json&lat=${e.location.lat}&lon=${e.location.lng}&zoom=18`
            )
          ).json()) as unknown as NominatimReverseResponse;

          buildingTownIdentifier[e.userBuildingID] = {
            id: e.userBuildingID,
            buildingName: e.userBuildingName,
            type: e.buildingType,
            identifier:
              buildingLocationData.address.municipality ??
              buildingLocationData.address.city ??
              buildingLocationData.address.town ??
              buildingLocationData.address.village ??
              null
          };
        }

        localStorage.setItem(
          'renameManagerBuildingTownIdentifier',
          JSON.stringify(buildingTownIdentifier)
        );
      }, 250 * i);
    });

    loading = false;
  };

  init();
</script>

{#if !loading}
  <h2>Bitte lege fest, welchen Stadtkenner welches Gebäude hat:</h2>
  <DataTable
    table$aria-label="Building town identifier list"
    style="width: 100%;"
  >
    <Head>
      <Row>
        <Cell numeric>Gebäude ID</Cell>
        <Cell>Gebäude Name</Cell>
        <Cell>Stadt</Cell>
        <Cell>Bearbeiten</Cell>
      </Row>
    </Head>
    <Body>
      {#each Object.entries(buildingTownIdentifier) as [key, value]}
        <Row>
          <Cell numeric>{value.id}</Cell>
          <Cell>{value.buildingName}</Cell>
          <Cell
            >{value.identifier === null
              ? 'Nicht festgelegt'
              : value.identifier}</Cell
          >
          <Cell
            style="cursor: pointer;"
            on:click={() => {
              editBuildingTownIdentifier(value.id, value.identifier);
            }}>{@html editIcon}</Cell
          >
        </Row>
      {/each}
    </Body>
  </DataTable>
{/if}

<Dialog
  bind:open={buildingTownIdentifierDialogOpen}
  aria-labelledby="Building identifier dialog title"
  aria-describedby="Building identifier dialog content"
>
  <Title id="identifier-dialog-title"
    >Kennung für {buildingTownIdentifierDialogBuildingName} eingeben</Title
  >
  <div class="flex justify-content-center align-items-center w-100">
    <Textfield
      type="text"
      bind:value={buildingTownIdentifierDialogBuildingTownIdentifierInput}
      label="Kennung"
      style="width: 90%;"
    />
  </div>
  <Actions>
    <Button on:click={() => (buildingTownIdentifierDialogOpen = false)}>
      <Label>Abbrechen</Label>
    </Button>
    <Button
      on:click={() => {
        buildingTownIdentifierDialogBuildingTownIdentifierInput =
          buildingTownIdentifierDialogBuildingTownIdentifierInput ===
          'Nicht festgelegt'
            ? null
            : buildingTownIdentifierDialogBuildingTownIdentifierInput;
        buildingTownIdentifier[
          buildingTownIdentifierDialogBuildingId
        ].identifier = buildingTownIdentifierDialogBuildingTownIdentifierInput;
        localStorage.setItem(
          'renameManagerBuildingTownIdentifier',
          JSON.stringify(buildingTownIdentifier)
        );
        buildingTownIdentifier = buildingTownIdentifier;
        buildingTownIdentifierDialogOpen = false;
      }}
    >
      <Label>Speichern</Label>
    </Button>
  </Actions>
</Dialog>

<style lang="scss">
  @import '../scss/components/buildingTownIdentifier.scss';
</style>
