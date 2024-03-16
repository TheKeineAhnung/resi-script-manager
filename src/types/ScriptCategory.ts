type ScriptCategory =
  | 'Eins&auml;tze'
  | 'Design'
  | 'Chat'
  | 'Patienten'
  | 'Geb&auml;ude'
  | 'Fahrzeuge'
  | 'Verband'
  | 'Karte'
  | 'AAO';

function isScriptCategory(string: string): string is ScriptCategory {
  const scriptCategories: string[] = [
    'AAO',
    'Chat',
    'Design',
    'Eins&auml;tze',
    'Fahrzeuge',
    'Geb&auml;ude',
    'Karte',
    'Patienten',
    'Verband'
  ];
  return scriptCategories.indexOf(string) !== -1;
}

export type { ScriptCategory };
export { isScriptCategory };
