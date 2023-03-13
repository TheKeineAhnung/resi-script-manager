<script lang="ts">
  import axios from 'axios';
  import Button, { Label } from '@smui/button';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Dialog, { Title, Actions } from '@smui/dialog';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import Textfield from '@smui/textfield';
  import type { UserBuildings } from '../../../types/api/UserBuildings';
  import { icon, library } from '@fortawesome/fontawesome-svg-core';
  import { apiGet } from '../../../ts/helper/api';

  library.add(faEdit);
  const editIcon = icon(faEdit).html;

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

  let buildingIdentifierDialogOpen: boolean = false;
  let buildingIdentifierDialogBuildingName: string = '';
  let buildingIdentifierDialogBuildingId: number = 0;
  let buildingIdentifierDialogBuildingIdentifierInput: string | null = null;

  const editBuildingIdentifier = function (
    buildingId: number,
    buildingIdentifier: string | null
  ) {
    buildingIdentifierDialogBuildingId = buildingId;
    buildingIdentifierDialogBuildingIdentifierInput =
      buildingIdentifier === null ? 'Nicht festgelegt' : buildingIdentifier;
    buildingIdentifierDialogOpen = true;
  };

  let loading = true;

  const init = async function () {
    loading = true;
    aUserBuildings = (await apiGet(
      'userBuildings',
      localStorage
    )) as unknown as UserBuildings[];

    if (localStorage.getItem('renameManagerBuildingIdentifier')) {
      buildingIdentifier = JSON.parse(
        localStorage.getItem('renameManagerBuildingIdentifier') ?? '{}'
      );
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

    loading = false;
  };

  init();
</script>

{#if !loading}
  <h2>Bitte lege fest, wie welches Gebäude identifiziert werden soll:</h2>
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
            style="cursor: pointer;"
            on:click={() => {
              editBuildingIdentifier(value.id, value.identifier);
            }}>{@html editIcon}</Cell
          >
        </Row>
      {/each}
    </Body>
  </DataTable>
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

<style lang="scss">
  @import '../scss/components/buildingIdentifier.scss';
</style>
