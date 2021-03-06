import type { ScriptInfo, ScriptInfoConfig } from '../types/Script';

const info: (ScriptInfo | ScriptInfoConfig)[] = [
  {
    name: 'alarmfax',
    displayName: 'Alarmfax',
    description: 'Hinzufügen eines Alarmfax-Feldes auf der Missionsseite',
    author: 'KeineAhnung',
    version: '1.1.1',
    category: 'Einsätze',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'autoCollapseBuildings',
    displayName: 'Automatisches Gebäudekarten einklappen',
    description: 'Gebäudekarten in der Übersicht automatisch einklappen',
    author: 'KeineAhnung',
    version: '1.0.3',
    category: 'Design',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: true,
    requiresConfig: true,
    config: {
      autoCollapseBuildingsBuildingTypes: {
        type: 'array',
        default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        description: 'Gebäudetypen, die automatisch eingeklappt werden sollen.'
      }
    }
  },
  {
    name: 'countPatients',
    displayName: 'Patientenanzahl anzeigen',
    description:
      'Anzeige der Anzahl der Patienten im Krankenhaus und der Krankenhauskapazität',
    author: 'KeineAhnung',
    version: '1.0.4',
    category: 'Patienten',
    outdated: false,
    usable: true,
    match: ['^https://rettungssimulator.online/*$'],
    oneTime: true,
    requiresConfig: false
  },
  {
    name: 'countPossibleMissions',
    displayName: 'Mögliche Einsätze zählen',
    description:
      'Zählen der Anzahl der möglichen Einsätze auf der Einsatzübersichtsseite',
    author: 'KeineAhnung',
    version: '1.0.1',
    category: 'Einsätze',
    outdated: false,
    usable: true,
    match: ['^https://rettungssimulator.online/missionOverview$'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'customBuildingIcons',
    displayName: 'Benutzerdefinierte Gebäudesymbole',
    description: 'Anpassen der Gebäudesymbole',
    author: 'KeineAhnung',
    version: '2.1.1',
    category: 'Gebäude',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/*'],
    oneTime: false,
    requiresConfig: true,
    config: {
      customBuildingIconsConfig: {
        type: 'object',
        default: {
          Feuerwache: 'null',
          Feuerwehrschule: 'null',
          Rettungswache: 'null',
          Krankenhaus: 'null',
          Landespolizeiwache: 'null',
          Bundespoliizeiwache: 'null',
          Leitstelle: 'null',
          Rettungsdienstschule: 'null',
          Notarztstandort: 'null'
        },
        description:
          'Link zu Gebäudesymbolen, die benutzt werden sollen. Die Symbole müssen auf ein valides Format verweisen (png, jpg, ...)'
      }
    }
  },
  {
    name: 'customMissionIcons',
    displayName: 'Benutzerdefinierte Einsatzsymbole',
    description: 'Anpassen der Einsatzsymbole',
    author: 'KeineAhnung',
    version: '1.1.0',
    category: 'Einsätze',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/*'],
    oneTime: false,
    requiresConfig: true,
    config: {
      customMissionIconsConfig: {
        type: 'arrayobject',
        default: [
          {
            name: '',
            1: '',
            2: '',
            3: ''
          }
        ],
        description:
          'Link zu Einsatzsymbolen, die benutzt werden sollen. Die Symbole müssen auf ein valides Format verweisen (png, jpg, ...)'
      }
    }
  },
  {
    name: 'deleteNewestFmsAfterTime',
    displayName: 'Neueste FMS nach bestimmter Zeit löschen',
    description: 'Löscht die neueste FMS nach einer bestimmter Zeit',
    author: 'KeineAhnung',
    version: '1.0.1',
    category: 'Fahrzeuge',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: true,
    requiresConfig: true,
    config: {
      deleteNewestFmsAfterTime: {
        type: 'string',
        default: '2000',
        description:
          'Zeit in Millisekunden, nach der der neueste FMS gelöscht werden soll'
      }
    }
  },
  {
    name: 'expandAssociationCards',
    displayName: 'Verbandskarten erweitern',
    description:
      'Hinzufügen von Pfeilen zum Erweitern und Falten von Karten auf der Verbandsseite',
    author: 'KeineAhnung',
    version: '1.0.1',
    category: 'Verband',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/association/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'expandMapLegend',
    displayName: 'Kartenlegende erweitern',
    description:
      'Hinzufügen von Pfeilen zum Erweitern und Falten von Karten der Kartenlegende',
    author: 'KeineAhnung',
    version: '1.0.1',
    category: 'Karte',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/mapLegend'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'fastMissionSpeed',
    displayName: 'Geschwindigkeit schnell wechseln',
    description: 'Lässt einen die Einsatzgeschwindigkeit schneller wechseln',
    author: 'Ron31',
    version: '1.5.0',
    category: 'Einsätze',
    outdated: false,
    usable: true,
    match: ['^https://rettungssimulator.online/(#)?$'],
    oneTime: true,
    requiresConfig: false
  },
  {
    name: 'filterAaoEditVehicles',
    displayName: 'AAO Fahrzeuge filtern',
    description:
      'Filtere die Fahrzeuge die im AAO-Fahrzeug-Editor angezeigt werden',
    author: 'KeineAhnung',
    version: '1.0.0',
    category: 'AAO',
    outdated: false,
    usable: false,
    match: ['https://rettungssimulator.online/aaoStore'],
    oneTime: false,
    requiresConfig: true,
    config: {
      removeVehicleOptions: {
        type: 'array',
        default: [],
        description:
          'Fahrzeuge die im AAO-Fahrzeug-Editor versteckt werden sollen. Die zu verwendenen Namen sind <a target="_blank" rel="noopener noreferrer" href="https://rettungssimulator.online/api/vehicleCategories">hier</a> im abschnitt "shortName" zu entnehmen.'
      }
    }
  },
  {
    name: 'filterMemberList',
    displayName: 'Verbandsmitgliederliste filtern',
    description:
      'Filtere die Verbandsmitgliederliste nach online, offline und abwesenden Spielern',
    author: 'KeineAhnung',
    version: '1.0.0',
    category: 'Verband',
    outdated: false,
    usable: true,
    match: ['https:\\/\\/rettungssimulator.online\\/association\\/[0-9]*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'hideAchievementcard',
    displayName: 'Errungenschaftenkarte ausblenden',
    description: 'Errungenschaftenkarte auf der Profilseite ausblenden',
    author: 'KeineAhnung',
    version: '1.0.1',
    category: 'Design',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/profile'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'hideBuildingIcons',
    displayName: 'Gebäudesymbole ausblenden',
    description: 'Blendet die Gebäudesymbole auf der Karte aus',
    author: 'KeineAhnung',
    version: '1.1.2',
    category: 'Karte',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: true,
    requiresConfig: true,
    config: {
      hideBuildingIconsConfig: {
        type: 'array',
        default: [],
        description:
          'Blendet die Gebäudesymbole auf der Karte aus. Die zu verwendenen Links sind <a target="_blank" rel="noopener noreferrer" href="https://github.com/TheKeineAhnung/ReSi-Scripte/blob/main/information/buildingLinks.md">hier</a> zu entnehmen.'
      }
    }
  },
  {
    name: 'hideFreeText',
    displayName: 'Freitextfeld verbergen',
    description: 'Ausblenden der Freitexteingabe auf der Anrufannahme-Seite',
    author: 'KeineAhnung',
    version: '1.0.0',
    category: 'Einsätze',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/missionNew/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'missionCounter',
    displayName: 'Missionen zählen',
    description: 'Anzahl der Missionen bei der Einsatzliste',
    author: 'Ron31',
    version: '0.9.0',
    category: 'Einsätze',
    outdated: false,
    usable: true,
    match: ['^https://rettungssimulator.online/(#)?$'],
    oneTime: true,
    requiresConfig: false
  },
  {
    name: 'missionTime',
    displayName: 'Einsatzzeit anzeigen',
    description: 'Einsatzzeit in der Einsatzliste anzeigen',
    author: 'KeineAhnung',
    version: '1.0.6',
    category: 'Einsätze',
    outdated: false,
    usable: true,
    match: ['^https://rettungssimulator.online/*$'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'missionHelper',
    displayName: 'Einsatzhilfe anzeigen',
    description: 'Einsatzhilfe im Einsatzfenster',
    author: 'Ron31',
    version: '1.4.0',
    category: 'Einsätze',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/mission/[0-9]*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'showOnlyLatestRadioMessage',
    displayName: 'Nur neueste Radiomeldung anzeigen',
    description:
      'Nur die letzte Funkmeldung eines Fahrzeuges im Funkmeldungsfeld anzeigen',
    author: 'KeineAhnung',
    version: '1.0.0',
    category: 'Fahrzeuge',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'userBuildings',
    displayName: 'Gebäude zählen',
    description: 'Zählen der eigenen Gebäude auf der Profilseite',
    author: 'KeineAhnung',
    version: '2.0.3',
    category: 'Gebäude',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/profile/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'userVehicles',
    displayName: 'Fahrzeuge zählen',
    description: 'Zählen der eigenen Fahrzeuge auf der Profilseite',
    author: 'KeineAhnung',
    version: '2.0.1',
    category: 'Fahrzeuge',
    outdated: false,
    usable: true,
    match: ['https://rettungssimulator.online/profile/*'],
    oneTime: false,
    requiresConfig: false
  }
];

export { info };
