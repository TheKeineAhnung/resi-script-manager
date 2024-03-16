import type { ScriptInfo, ScriptInfoConfig } from '../types/ScriptInfo';

const info: (ScriptInfo | ScriptInfoConfig)[] = [
  {
    name: 'alarmfax',
    displayName: 'Alarmfax',
    description: 'Hinzuf&uuml;gen eines Alarmfax-Feldes auf der Missionsseite',
    author: 'KeineAhnung',
    category: 'Eins&auml;tze',
    usable: true,
    match: ['https://rettungssimulator.online/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'alertOnMissionShare',
    displayName: 'Benachrichtigung bei Einsatzfreigabe',
    description:
      'Zeige eine Benachrichtigung an, wenn ein Einsatz von einem Verbandsmitglied freigegeben wurde',
    author: 'KeineAhnung',
    category: 'Verband',
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: true,
    requiresConfig: false
  },
  {
    name: 'autoCollapseBuildings',
    displayName: 'Automatisches Geb&auml;udekarten einklappen',
    description:
      'Geb&auml;udekarten in der &uuml;bersicht automatisch einklappen',
    author: 'KeineAhnung',
    category: 'Design',
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: true,
    requiresConfig: true,
    config: {
      autoCollapseBuildingsBuildingTypes: {
        type: 'array',
        default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        description:
          'Geb&auml;udetypen, die automatisch eingeklappt werden sollen. Es werden die Geb&auml;ude IDs genutzt!'
      }
    }
  },
  {
    name: 'controlCenterRequirementCheck',
    displayName: 'Anforderungen pro Leitstelle &uuml;berpr&uuml;fen',
    description:
      '&uuml;berpr&uuml;ft ob die Anforderungen innerhalb der Wachen einer Leitstelle funktioniert',
    author: 'KeineAhnung',
    category: 'Eins&auml;tze',
    usable: true,
    match: ['https://rettungssimulator.online/department/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'countPatients',
    displayName: 'Patientenanzahl anzeigen',
    description:
      'Anzeige der Anzahl der Patienten im Krankenhaus und der Krankenhauskapazit&auml;t',
    author: 'KeineAhnung',
    category: 'Patienten',
    usable: true,
    match: [
      '^https:\\/\\/(www.)?rettungssimulator.online(\\/#?\\??(#[A-Za-z=]*)?)?$'
    ],
    oneTime: true,
    requiresConfig: true,
    config: {
      shortText: {
        type: 'boolean',
        default: 'false',
        description: 'Text als Icon anzeigen'
      }
    }
  },
  {
    name: 'countPossibleMissions',
    displayName: 'M&ouml;gliche Eins&auml;tze z&auml;hlen',
    description:
      'Z&auml;hlen der Anzahl der m&ouml;glichen Eins&auml;tze auf der Einsatz&uuml;bersichtsseite',
    author: 'KeineAhnung',
    category: 'Eins&auml;tze',
    usable: true,
    match: ['^https://rettungssimulator.online/missionOverview$'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'countVehicleStatus',
    displayName: 'Fahrzeugstatus z&auml;hlen',
    description: 'Z&auml;hlen der Fahrzeugstatus',
    author: 'KeineAhnung',
    category: 'Fahrzeuge',
    usable: true,
    match: ['^https://rettungssimulator.online/*$'],
    oneTime: true,
    requiresConfig: false
  },
  {
    name: 'customBuildingIcons',
    displayName: 'Benutzerdefinierte Geb&auml;udesymbole',
    description: 'Anpassen der Geb&auml;udesymbole',
    author: 'KeineAhnung',
    category: 'Geb&auml;ude',
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
          'Link zu Geb&auml;udesymbolen, die benutzt werden sollen. Die Symbole m&uuml;ssen auf ein valides Format verweisen (png, jpg, ...)'
      }
    }
  },
  {
    name: 'customMapZoom',
    displayName: 'Eigener Kartenzoom',
    description:
      'Eigenen Bereich der Karte zum Standard zoom festlegen. <b>Die Eckpunkte sind S&uuml;dwesten und Nordosten.</b>',
    author: 'KeineAhnung',
    category: 'Karte',
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: false,
    requiresConfig: true,
    config: {
      customMapZoomNorth: {
        type: 'string',
        default: '0',
        description:
          'Lege den n&ouml;rdlichsten (Latitude) Punkt per Koordinate fest. Du kannst die Koordinaten z.B <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer">hier</a> entnehmen.'
      },
      customMapZoomEast: {
        type: 'string',
        default: '0',
        description:
          'Lege den &ouml;stlichsten (Longitude) Punkt per Koordinate fest. Du kannst die Koordinaten z.B <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer">hier</a> entnehmen.'
      },
      customMapZoomSouth: {
        type: 'string',
        default: '0',
        description:
          'Lege den s&uuml;dlichsten (Latitude) Punkt per Koordinate fest. Du kannst die Koordinaten z.B <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer">hier</a> entnehmen.'
      },
      customMapZoomWest: {
        type: 'string',
        default: '0',
        description:
          'Lege den westlichsten (Longitude) Punkt per Koordinate fest. Du kannst die Koordinaten z.B <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer">hier</a> entnehmen.'
      }
    }
  },
  {
    name: 'customMissionIcons',
    displayName: 'Benutzerdefinierte Einsatzsymbole',
    description: 'Anpassen der Einsatzsymbole',
    author: 'KeineAhnung',
    category: 'Eins&auml;tze',
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: false,
    requiresConfig: true,
    config: {
      customMissionIconsConfig: {
        type: 'arrayobject',
        default: [{ name: '', 1: '', 2: '', 3: '' }],
        description:
          'Link zu Einsatzsymbolen, die benutzt werden sollen. Die Symbole m&uuml;ssen auf ein valides Format verweisen (png, jpg, ...)'
      }
    }
  },
  {
    name: 'deleteNewestFmsAfterTime',
    displayName: 'Neueste FMS nach bestimmter Zeit l&ouml;schen',
    description: 'L&ouml;scht die neueste FMS nach einer bestimmter Zeit',
    author: 'KeineAhnung',
    category: 'Fahrzeuge',
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: true,
    requiresConfig: true,
    config: {
      deleteNewestFmsAfterTime: {
        type: 'string',
        default: '2000',
        description:
          'Zeit in Millisekunden, nach der der neueste FMS gel&ouml;scht werden soll'
      }
    }
  },
  {
    name: 'expandAssociationCards',
    displayName: 'Verbandskarten erweitern',
    description:
      'Hinzuf&uuml;gen von Pfeilen zum Erweitern und Falten von Karten auf der Verbandsseite',
    author: 'KeineAhnung',
    category: 'Verband',
    usable: true,
    match: ['https://rettungssimulator.online/association/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'expandMapLegend',
    displayName: 'Kartenlegende erweitern',
    description:
      'Hinzuf&uuml;gen von Pfeilen zum Erweitern und Falten von Karten der Kartenlegende',
    author: 'KeineAhnung',
    category: 'Karte',
    usable: true,
    match: ['https://rettungssimulator.online/mapLegend'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'fastMissionSpeed',
    displayName: 'Geschwindigkeit schnell wechseln',
    description:
      'L&auml;sst einen die Einsatzgeschwindigkeit schneller wechseln',
    author: 'Ron31',
    category: 'Eins&auml;tze',
    usable: true,
    match: [
      '^https:\\/\\/(www.)?rettungssimulator.online(\\/#?\\??(#[A-Za-z=]*)?)?$'
    ],
    oneTime: true,
    requiresConfig: false
  },
  {
    name: 'filterAaoEditVehicles',
    displayName: 'AAO Fahrzeuge filtern',
    description:
      'Filtere die Fahrzeuge die im AAO-Fahrzeug-Editor angezeigt werden',
    author: 'KeineAhnung',
    category: 'AAO',
    usable: false,
    match: ['https://rettungssimulator.online/aaoEdit/[0-9]*'],
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
    category: 'Verband',
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
    category: 'Design',
    usable: true,
    match: ['https://rettungssimulator.online/profile'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'hideBuildingIcons',
    displayName: 'Geb&auml;udesymbole ausblenden',
    description: 'Blendet die Geb&auml;udesymbole auf der Karte aus',
    author: 'KeineAhnung',
    category: 'Karte',
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: true,
    requiresConfig: true,
    config: {
      hideBuildingIconsConfig: {
        type: 'array',
        default: [],
        description:
          'Blendet die Geb&auml;udesymbole auf der Karte aus. Die zu verwendenen Links sind <a target="_blank" rel="noopener noreferrer" href="https://github.com/TheKeineAhnung/ReSi-Scripte/blob/main/information/buildingLinks.md">hier</a> zu entnehmen.'
      }
    }
  },
  {
    name: 'hideFreeText',
    displayName: 'Freitextfeld verbergen',
    description: 'Ausblenden der Freitexteingabe auf der Anrufannahme-Seite',
    author: 'KeineAhnung',
    category: 'Eins&auml;tze',
    usable: true,
    match: ['https://rettungssimulator.online/missionNew/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'hireMultipleStaff',
    displayName: 'Mehr Personal kaufen',
    description: 'Kaufe mehr Personal mit Marken',
    author: 'KeineAhnung',
    category: 'Geb&auml;ude',
    usable: true,
    match: ['https://rettungssimulator.online/department/*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'missionCounter',
    displayName: 'Missionen z&auml;hlen',
    description: 'Anzahl der Missionen bei der Einsatzliste',
    author: 'Ron31',
    category: 'Eins&auml;tze',
    usable: true,
    match: [
      '^https:\\/\\/(www.)?rettungssimulator.online(\\/#?\\??(#[A-Za-z=]*)?)?$'
    ],
    oneTime: true,
    requiresConfig: true,
    config: {
      addOwnShared: {
        type: 'boolean',
        default: 'false',
        description: 'Zeige zus&auml;tzlich eigene Shared Missions an'
      }
    }
  },
  {
    name: 'missionTime',
    displayName: 'Einsatzzeit anzeigen',
    description: 'Einsatzzeit in der Einsatzliste anzeigen',
    author: 'KeineAhnung',
    category: 'Eins&auml;tze',
    usable: true,
    match: ['^https://rettungssimulator.online/*$'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'multipleStaffAssignment',
    displayName: 'Mehrere Personen zuweisen',
    description:
      'Zuweisen von mehreren Personen gleichzeitig auf Fahrzeuge, Lehrgangsplanungen, etc.',
    author: 'KeineAhnung',
    category: 'Geb&auml;ude',
    usable: true,
    match: ['https://rettungssimulator.online/department/[0-9]*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'missionHelper',
    displayName: 'Einsatzhilfe anzeigen',
    description: 'Einsatzhilfe im Einsatzfenster',
    author: 'Ron31',
    category: 'Eins&auml;tze',
    usable: true,
    match: ['https://rettungssimulator.online/mission/[0-9]*'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'selectedVehicles',
    displayName: 'Ausgew&auml;hlte Fahrzeuge anzeigen',
    description: 'Ausgew&auml;hlte Fahrzeuge in Tabelle anzeigen',
    author: 'Ron31',
    category: 'Eins&auml;tze',
    usable: true,
    match: ['https://rettungssimulator.online/mission/[0-9]*'],
    oneTime: false,
    requiresConfig: true,
    config: {
      showBelowAAO: {
        type: 'boolean',
        default: 'false',
        description: 'Zeige die ausgew&auml;hlten Fahrzeuge unterhalb der AAO'
      },
      showDistance: {
        type: 'boolean',
        default: 'false',
        description: 'Zeige die Entfernung der Fahrzeuge zum Einsatzort'
      }
    }
  },
  {
    name: 'showOnlyLatestRadioMessage',
    displayName: 'Nur neueste Radiomeldung anzeigen',
    description:
      'Nur die letzte Funkmeldung eines Fahrzeuges im Funkmeldungsfeld anzeigen',
    author: 'KeineAhnung',
    category: 'Fahrzeuge',
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'staffStatsInBuildingList',
    displayName: 'Personalstatistiken im Geb&auml;udenamen',
    description:
      'Zeigt Personalstatistiken eines Geb&auml;udes in der Geb&auml;udeliste an',
    author: 'KeineAhnung',
    category: 'Geb&auml;ude',
    usable: true,
    match: ['https://rettungssimulator.online/'],
    oneTime: true,
    requiresConfig: false
  },
  {
    name: 'userBuildings',
    displayName: 'Geb&auml;ude z&auml;hlen',
    description: 'Z&auml;hlen der eigenen Geb&auml;ude auf der Profilseite',
    author: 'KeineAhnung',
    category: 'Geb&auml;ude',
    usable: true,
    match: [/^https:\/\/(www.)?rettungssimulator.online\/profile$/],
    oneTime: false,
    requiresConfig: false
  },
  {
    name: 'userVehicles',
    displayName: 'Fahrzeuge z&auml;hlen',
    description: 'Z&auml;hlen der eigenen Fahrzeuge auf der Profilseite',
    author: 'KeineAhnung',
    category: 'Fahrzeuge',
    usable: true,
    match: [/^https:\/\/(www.)?rettungssimulator.online\/profile$/],
    oneTime: false,
    requiresConfig: false
  }
];
export { info };
