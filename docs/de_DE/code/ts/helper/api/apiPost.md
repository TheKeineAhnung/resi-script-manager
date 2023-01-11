## apiPost

### Generelle Informationen

- Funktion: Ausführen eines POST requests an eine API vom ReSi.
- Pfad: `./src/ts/helper/api.ts`.
- Asynchrone Funktion: `Ja`

### Funktionsparameter

- api

  - Typ: `string`
  - Funktion: Name der API, wie er in der URL steht, ohne `/` davor um eine Anfrage auszuführen
  - Optional: `Nein`
  - Standardwert:

- data

  - Typ: `object`
  - Funktion: Erwartet die Daten für die API Anfrage
  - Optional: `Nein`
  - Standardwert:

### Rückgabewert

- `Promise<unknown>`
