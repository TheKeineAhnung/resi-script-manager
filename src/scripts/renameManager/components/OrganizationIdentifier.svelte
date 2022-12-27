<script lang="ts">
  import axios from 'axios';
  import Button, { Label } from '@smui/button';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Dialog, { Title, Actions } from '@smui/dialog';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import Textfield from '@smui/textfield';
  import { icon, library } from '@fortawesome/fontawesome-svg-core';

  library.add(faEdit);
  const editIcon = icon(faEdit).html;

  let organizationIdentifierDialogOpen: boolean = false;
  let organizationIdentifierDialogOrganizationTypeName: string = '';
  let organizationIdentifierDialogOrganizationId: number = 0;
  let organizationIdentifierDialogOrganizationIdentifierInput: string | null =
    '';

  let loading = true;

  let organisationIdentifier: Record<
    number,
    {
      id: number;
      name: string;
      identifier: string | null;
    }
  > = {};

  // TODO: Implement correct type after API change
  let aOrganizationCategories: Record<string, { id: number; name: string }>;

  const editOrganizationIdentifier = function (
    organizationId: number,
    organizationIdentifier: string | null
  ) {
    organizationIdentifierDialogOrganizationId = organizationId;
    organizationIdentifierDialogOrganizationIdentifierInput =
      organizationIdentifier === null
        ? 'Nicht festgelegt'
        : organizationIdentifier;
    organizationIdentifierDialogOpen = true;
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

    // temporary template data

    aOrganizationCategories = {
      '0': {
        id: 0,
        name: 'Feuerwehr'
      },
      '1': {
        id: 1,
        name: 'Rettungsdienst'
      }
    };

    if (localStorage.getItem('renameManagerOrganizationIdentifier')) {
      organisationIdentifier = JSON.parse(
        localStorage.getItem('renameManagerOrganizationIdentifier') ?? '{}'
      );
    } else {
      for (let key in aOrganizationCategories) {
        const e: { id: number; name: string } = aOrganizationCategories[key];
        organisationIdentifier[e.id] = {
          id: e.id,
          name: e.name,
          identifier: null
        };
      }
    }

    for (let key in aOrganizationCategories) {
      const e: { id: number; name: string } = aOrganizationCategories[key];
      if (organisationIdentifier[e.id] === undefined) {
        organisationIdentifier[e.id] = {
          id: e.id,
          name: e.name,
          identifier: null
        };
      }
    }

    localStorage.setItem(
      'renameManagerOrganizationIdentifier',
      JSON.stringify(organisationIdentifier)
    );

    loading = false;
  };

  init();
</script>

{#if !loading}
  <h2>Bitte lege fest, welche Organisation welches Kennwort hat:</h2>
  <DataTable
    table$aria-label="Organization identifier list"
    style="width: 100%;"
  >
    <Head>
      <Row>
        <Cell numeric>Organisations ID</Cell>
        <Cell>Organisations Name</Cell>
        <Cell>Kennung</Cell>
        <Cell>Bearbeiten</Cell>
      </Row>
    </Head>
    <Body>
      {#each Object.entries(organisationIdentifier) as [key, value]}
        <Row>
          <Cell numeric>{value.id}</Cell>
          <Cell>{value.name}</Cell>
          <Cell
            >{value.identifier === null
              ? 'Nicht festgelegt'
              : value.identifier}</Cell
          >
          <Cell
            style="cursor: pointer;"
            on:click={() => {
              editOrganizationIdentifier(value.id, value.identifier);
            }}>{@html editIcon}</Cell
          >
        </Row>
      {/each}
    </Body>
  </DataTable>
{/if}

<Dialog
  bind:open={organizationIdentifierDialogOpen}
  aria-labelledby="Organization identifier dialog title"
  aria-describedby="Organization identifier dialog content"
>
  <Title id="identifier-dialog-title"
    >Kennung für {organizationIdentifierDialogOrganizationTypeName} eingeben</Title
  >
  <div class="flex justify-content-center align-items-center w-100">
    <Textfield
      type="text"
      bind:value={organizationIdentifierDialogOrganizationIdentifierInput}
      label="Kennung"
      style="width: 90%;"
    />
  </div>
  <Actions>
    <Button on:click={() => (organizationIdentifierDialogOpen = false)}>
      <Label>Abbrechen</Label>
    </Button>
    <Button
      on:click={() => {
        organizationIdentifierDialogOrganizationIdentifierInput =
          organizationIdentifierDialogOrganizationIdentifierInput ===
          'Nicht festgelegt'
            ? null
            : organizationIdentifierDialogOrganizationIdentifierInput;
        organisationIdentifier[
          organizationIdentifierDialogOrganizationId
        ].identifier = organizationIdentifierDialogOrganizationIdentifierInput;
        localStorage.setItem(
          'renameManagerOrganizationIdentifier',
          JSON.stringify(organisationIdentifier)
        );
        organisationIdentifier = organisationIdentifier;
        organizationIdentifierDialogOpen = false;
      }}
    >
      <Label>Speichern</Label>
    </Button>
  </Actions>
</Dialog>

<style lang="scss">
  @import '../scss/components/organizationIdentifier.scss';
</style>
