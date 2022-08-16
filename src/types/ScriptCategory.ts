type ScriptCategory =
  | 'Einsätze'
  | 'Design'
  | 'Chat'
  | 'Patienten'
  | 'Gebäude'
  | 'Fahrzeuge'
  | 'Verband'
  | 'Karte'
  | 'AAO';

function isScriptCategory(string: string): string is ScriptCategory {
  const scriptCategories: string[] = [
    'AAO',
    'Chat',
    'Design',
    'Einsätze',
    'Fahrzeuge',
    'Gebäude',
    'Karte',
    'Patienten',
    'Verband'
  ];
  return scriptCategories.indexOf(string) !== -1;
}

export type { ScriptCategory };
export { isScriptCategory };
