## Einen Code Teil dokumentieren

### Struktur

Innerhalb des Ordners einer Sprache gibt es verschiedene Ordner für verschiedene Teile der Dokumentation. Im `code` Ordner liegt jegliche Dokumentation zum Code aus dem `src` Ordner. Die Ordnerstruktur sieht einen Aufbau wie im `src` Ordner vor. Jede Datei kriegt ebenfalls einen eigenen Ordner, in welchem dann jede Funktion in einer eigenen Markdown Datei dokumentiert werden sollte. Der `docs` Ordner innerhalb einer Sprache gibt Informationen zur Dokumentation und der `template` Ordner enthält die zu nutzenden Vorlagen für die Dokumentation. Der `scripts` Ordner enthält Dokumentationen für Skripte, die nicht den Code betreffen, wie zum Beispiel das ergänzen von neuen Skripten.

### Vorlage

Bitte benutze für die Dokumentation die entsprechende Vorlage im `templates` Ordner deiner Sprache. Dein neuer Code Teil sollte mindestens auf Englisch dokumentiert werden, weitere Sprachen sind gerne gesehen.

### Was soll dokumentiert werden

Dokumentiert werden sollten vor allem Teile des Codes, welche öfters wiederverwendet werden. Dazu zählen zum Beispiel Funktionen aus dem `helper` oder `errors` Ordner. Sonst sollten vor allem Teile dokumentiert werden, bei denen empfunden wird, dass sie nicht selbsterklärend sind. Wenn du selber merkt, dass eine Dokumentation notwendig ist, ergänze sie gerne. Desweiteren solltest du auf bitte eines Collaborators im Pull request eine Dokumentation ergänzen.
