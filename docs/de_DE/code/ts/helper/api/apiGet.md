## apiGet

### Generelle Informationen

- Funktion: Ausführen eines GET requests an eine API vom ReSi und wenn nötig caching der API
- Pfad: `./src/ts/helper/api.ts`
- Asynchrone Funktion: `Ja`

### Funktionsparameter

- api

  - Typ: `string`
  - Funktion: Name der API, wie er in der URL steht, ohne `/` davor um eine Anfrage auszuführen
  - Optional: `Nein`
  - Standardwert:

- storage

  - Typ: `Storage`
  - Funktion: Festlegen, ob die API im localStorage oder im sessionStorage gecachet werden soll
  - Optional: `Nein`
  - Standardwert:

- cache

  - Typ: `boolean`
  - Funktion: Legt fest, ob die Daten aus dem cache genommen werden können, oder die API angefragt werdem muss
  - Optional: `Ja`
  - Standardwert: `true`

- params

  - Typ: `object`
  - Funktion: Erwartet die Parameter für die API Anfrage
  - Optional: `Ja`
  - Standardwert:

### Rückgabewert

- `Promise<unknown>`
