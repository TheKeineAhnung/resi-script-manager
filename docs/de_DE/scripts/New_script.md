## Ein Skript hinzufügen

### Das Skript

Jedes Skript liegt in einem eigenen Ordner im `scripts` Ordner. Eine Vorlage für ein neues Skript ist dort im `template` Ordner zu finden. In die Vorgegebene Funktion wird das Skript geschrieben. Die Funktion muss den selben Namen wie der Ordner haben, damit die Skripte gut zu identifizieren sind!

### Das Skript verfügbar machen

#### Typmodifikationen

Zuerst muss der Skriptname im `ScriptName` Typ verfügbar gemacht werden. Dafür befolge die folgenden Schritte:

1. Öffne den Ordner `types` im `src` Ordner
1. Öffne dort die Datei `ScriptName.d.ts`
1. Ergänze dort beim Typen `ScriptName` den Namen des Ordners deines Skriptes. **Bitte halte die alphabetische Sortierung ein**

#### Informationen hinterlegen

Nun müssen die Informationen für das Skript hinterlegt werden. Dafür befolge die folgenden Schritte:

1. Öffne den Ordner `data` im `src` Ordner
1. Öffne dort die Datei `scriptInfo.ts`
1. Ergänze dort im `info` array dein Skript. **Bitte halte die alphabetische Sortierung ein**. Die Parameter werden [hier](#die-parameter) erklärt

Desweiteren muss das Skript noch in einer Datei ergänzt werden, damit es geladen werden kann. Dafür muss die `scripts.ts` Datei im `scripts` Ordner geöffnet werden. Hier müssen folgende Schritte befolgt werden:

1. Importiere das Skript aus dem Ordner, in welchem du es angelegt hast **Bitte halte die alphabetische Sortierung ein**
1. Ergänze das importierte Skript im export objekt **Bitte halte die alphabetische Sortierung ein**

##### Die Parameter

1. name: Gibt den Namen des Ordners an, in welchem das Skript liegt
1. displayName: Gibt den Namen an, welcher dem Nutzer angezeigt wird
1. description: Gibt eine Beschreibung an, welche den Nutzer angezeigt wird
1. author: Ergänze hier den Namen des Skripterstellers, damit wir ihm Anerkennung zeigen können
1. category: Gibt eine der Vorgegeben Kategorien an, in der das Skript eingeordnet wird. Die Entwicklungsumgebung sollte die verschiedene Kategorien vorschlagen, welche genutzt werden können. Alternativ sind die Skriptkategorien in der `SkriptCategory.ts` Datei, im `types` Ordner, wo bereits der Skriptname hinterlegt wurde, zu finden.
1. usable: Gibt an, ob das Skript genutzt werden kann
1. match: Gibt an, auf welchen Seiten des Spiels das Skript genutzt werden kann
1. oneTime: Gibt an, ob das Skript bei jedem Laden einer Seite ausgeführt wird, oder nur einmalig beim ersten Laden.
1. requiresConfig: Gibt an, ob das Skript eine Konfiguration benötigt
1. config: **Nur nutzbar, wenn der Parameter `requiresConfig` auf `true` gesetzt ist**. Der Parameter nimmt ein Objekt entgegen, welches selbst wieder jedem key ein Objekt zuweist. Als key wird verwendet, mit welchem key die Daten im localStorage gespeichert werden sollen. Die Daten können dann im Skript genutzt werden. Der Inhalt des Objektes gibt es drei Parameter:
   1. type: Nimmt den Typ der Konfiguration entgegen. Die verfügbaren Typen werden entweder durch die Entwicklungsumgebung vorgeschlagen, oder können alternativ in der `SettingTypes.d.ts` Datei im `types` Ordner eingesehen werden
   1. default: Gibt den Standardwert der Konfiguration an. Der angegebene Wert sollte den selben Typen wie der `type` Parameter haben
   1. description: Gibt eine Beschreibung für die Konfiguration an, welche dem Nutzer angezeigt wird
