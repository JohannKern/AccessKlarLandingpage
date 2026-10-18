# AccessAnalyzer – Landingpage

Statische Präsentations- und Vermarktungsseite für AccessAnalyzer. Sie ist
**vollständig unabhängig von der Django-Anwendung**: kein Framework, keine
Template-Tags, keine externen Schriften, keine Tracking-Skripte, keine Cookies.
Änderungen hier wirken sich nicht auf die Anwendung aus – und umgekehrt.

---

## Inhalt des Ordners

| Datei | Zweck |
|-------|-------|
| `index.html` | Die Landingpage inkl. Demo-Anfrage-Formular |
| `impressum.html` | Impressum (Betreiberdaten und Kontakt eingetragen) |
| `datenschutz.html` | Datenschutzhinweise zur Webseite (rechtlich prüfen lassen) |
| `style.css` | Gesamte Gestaltung (von allen drei Seiten genutzt) |
| `demo.js` | Logik des Demo-Formulars (erzeugt eine vorausgefüllte E-Mail) |
| `README.md` | Diese Anleitung |

Alle Verweise innerhalb der Seite sind **relativ** (`style.css`, `demo.js`,
`datenschutz.html`) oder Anker (`#demo`). Deshalb läuft die Seite lokal, im
Hauptverzeichnis einer Domain und in einem Unterpfad wie bei GitHub Pages
(`…github.io/<Repo-Name>/`) unverändert.

---

## Lokal starten und testen

Vorgehen im Überblick – wähle eine der drei Varianten.

### Variante 1: Doppelklick (am einfachsten)

`landingpage\index.html` im Explorer doppelklicken oder per Rechtsklick im
Browser öffnen. Es wird kein Server benötigt. Layout, Navigation, FAQ und
Formular funktionieren so.

### Variante 2: lokaler Server mit Node (empfohlen)

Voraussetzung: Node.js (auf dem Entwicklungsrechner vorhanden, getestet mit
v24.14.0).

```powershell
cd c:\Users\Administrator\source\DJANGO\AccessAnalyzer\landingpage
npx serve -l 8080 .
```

* Beim ersten Start fragt `npx` eventuell, ob das Paket `serve`
  installiert werden soll → mit `y` bestätigen.
* Danach im Browser **<http://localhost:8080/>** öffnen.
* Beenden mit `Strg+C`.
* Ist Port 8080 belegt, einfach eine andere Nummer verwenden, z. B. `-l 8090`.

### Variante 3: lokaler Server mit Python

Voraussetzung: eine funktionierende Python-Installation.

```powershell
cd c:\Users\Administrator\source\DJANGO\AccessAnalyzer\landingpage
python -m http.server 8080
```

Danach **<http://localhost:8080/>** öffnen, beenden mit `Strg+C`.

> **Achtung:** Auf dem Entwicklungsrechner zeigt die `.venv` des Projekts
> derzeit auf eine nicht mehr vorhandene Python-Installation. Dann
> scheitern `python` und `py` mit der Meldung
> `did not find executable at '…\pythoncore-3.14-64\python.exe'`.
> Siehe Abschnitt [Fehlerbehebung](#fehlerbehebung). Für die Landingpage
> ist das unkritisch – nutze Variante 1 oder 2.

### Was beim Testen zu prüfen ist

* Alle Navigationspunkte (So funktioniert's, Der Bericht, Für wen, FAQ) springen
  zum richtigen Abschnitt.
* Der Button „Demo anfordern" (Navigation, Hero, Seitenende) springt zum
  Formular.
* Formular: Ohne Name, E-Mail oder Häkchen bei der Einwilligung erscheint eine
  Fehlermeldung. Mit gültigen Angaben öffnet sich das E-Mail-Programm mit einer
  vorbereiteten Nachricht.
* Footer-Links auf Impressum und Datenschutz funktionieren; dort führt der Link
  „Startseite" bzw. das Logo zurück.
* Ansicht in schmaler Fenstergröße (Handy): Der Aufbau wird einspaltig.

---

## Demo-Anfrage

Das Formular „Demo anfordern" arbeitet **ohne Backend**:

1. Der Interessent füllt das Formular aus (Pflicht: Name, E-Mail, Einwilligung).
2. `demo.js` prüft die Eingaben und baut eine `mailto:`-Adresse mit
   Betreff „Demo-Anfrage AccessAnalyzer – <Firma>" und allen Angaben im Text.
3. Das E-Mail-Programm des Interessenten öffnet sich mit dieser Nachricht; er
   schickt sie ab.
4. Unter dem Formular erscheint eine Bestätigung mit Hinweis auf die
   Empfängeradresse, falls sich kein Programm öffnet.

Ohne JavaScript greift der `mailto:`-Fallback über das `action`-Attribut des
Formulars (die Angaben kommen dann als einfacher Text).

Ein verstecktes Feld („Webseite") dient als einfacher Spam-Schutz: Wird es
ausgefüllt, bricht das Skript ab.

**Grenzen dieser Lösung:**

* Ohne eingerichtetes E-Mail-Programm (z. B. nur Webmail) öffnet sich nichts.
  Der Hinweistext nennt dann die Adresse zum direkten Schreiben.
* Anfragen werden nicht zentral gespeichert; sie landen nur im Postfach.

---

## Anpassen

### Empfängeradresse der Demo-Anfragen

Aktuell ist `johann.kern1161@gmail.com` eingetragen. Soll eine andere Adresse
verwendet werden (z. B. eine eigene Domain-Adresse bei Hetzner), muss sie an
folgenden Stellen geändert werden:

| Datei | Stelle |
|-------|--------|
| `index.html` | `<form … data-empfaenger="…" action="mailto:…">` (zwei Stellen im selben Tag) |
| `index.html` | Footer-Link „Kontakt" |
| `impressum.html` | Kontakt-Abschnitt |

Suche mit `Strg+Umschalt+F` im Editor nach `johann.kern1161@gmail.com` und ersetze
alle Treffer. Das Skript `demo.js` liest die Adresse aus `data-empfaenger` und
braucht keine Änderung.

### Texte, Farben, Gestaltung

* **Texte:** direkt in `index.html` ändern. Abschnitte sind über `id`
  gekennzeichnet: `so-funktionierts`, `bericht`, `zielgruppe`, `sicherheit`,
  `faq`, `demo`.
* **Farben:** Variablen am Anfang von `style.css` (`:root`), z. B.
  `--brand` (Hauptfarbe), `--accent` (Akzent), `--ink` (dunkle Flächen).
* **Formularfelder:** in `index.html` im Block `id="demo-formular"`. Neue Felder
  müssen zusätzlich in `demo.js` in die Liste `zeilen` aufgenommen werden,
  sonst erscheinen sie nicht in der E-Mail.

### Rechtstexte

* `impressum.html`: Betreiberdaten und E-Mail-Adresse sind eingetragen. Die
  Abschnitte „Vertreten durch" und „Registereintrag und Umsatzsteuer-ID" sind
  vorerst als HTML-Kommentar ausgeblendet. Bei Bedarf den Kommentar entfernen
  und die `[Platzhalter]` ausfüllen.
* `datenschutz.html`: beschreibt die technische Funktionsweise der Seite.
  **Rechtlich prüfen lassen.**
* Beide Seiten tragen `noindex`. Nach der Freigabe die Zeile
  `<meta name="robots" content="noindex">` entfernen, wenn sie in Suchmaschinen
  erscheinen sollen.

---

## Veröffentlichen

Die Seite besteht nur aus statischen Dateien und kann bei jedem Webhoster
liegen. Es muss immer der **gesamte Ordnerinhalt** hochgeladen werden
(`index.html`, `impressum.html`, `datenschutz.html`, `style.css`, `demo.js`).

### GitHub Pages

Die Seite wird zusätzlich unter
<https://johannkern.github.io/AccessKlarLandingpage/> veröffentlicht. Sie liegt dort in einem
GitHub-Repository (`AccessKlarLandingpage`). Maßgebliche Quelle bleibt der Ordner `landingpage\` in diesem Projekt. Aktualisieren:

1. Repository `AccessKlarLandingpage` lokal klonen oder öffnen.
2. Den Inhalt von `landingpage\` dort hineinkopieren (bestehende Dateien
   überschreiben). Dateien, die es hier nicht mehr gibt – etwa alte Seiten aus
   der früheren Version –, im Ziel-Repository löschen.
3. Committen und pushen. GitHub Pages veröffentlicht automatisch; es kann
   ein bis zwei Minuten dauern.
4. Die Live-Seite im Browser mit `Strg+F5` neu laden, damit alte Dateien aus
   dem Zwischenspeicher verschwinden.

```powershell
cd <Pfad zum Repository AccessKlarLandingpage>
Copy-Item c:\Users\Administrator\source\DJANGO\AccessAnalyzer\landingpage\* . -Recurse -Force
git add -A
git commit -m "Landingpage auf AccessAnalyzer umgestellt"
git push
```

**Hinweis zum Namen:** Repository-Name und URL enthalten weiterhin
„AccessKlar". Im Seitencode selbst gibt es keinen Verweis darauf. Soll auch die
Adresse unabhängig sein, ein neues Repository anlegen (z. B.
`AccessAnalyzerLandingpage`) und dort GitHub Pages aktivieren
(*Settings → Pages → Branch `main`, Ordner `/ (root)`*). Die Seite funktioniert
dort ohne Anpassung, weil alle Pfade relativ sind.

### Eigener Webserver

Ordnerinhalt in das Verzeichnis des Webservers kopieren (nginx, Apache, Caddy
o. ä.). Es sind keine besonderen Einstellungen nötig.


---

## Vor der Veröffentlichung – Checkliste

- [ ] Echte Kontakt-E-Mail-Adresse eintragen (siehe oben).
- [ ] Impressum mit Betreiberdaten vervollständigen.
- [ ] Datenschutzhinweise rechtlich prüfen lassen.
- [ ] Gelbe Hinweiskästen in Impressum und Datenschutz entfernen.
- [ ] Demo-Formular einmal mit echter Adresse ausprobieren.
- [ ] Seite lokal in Desktop- und Handy-Breite ansehen.

---

## Fehlerbehebung

| Problem | Ursache / Lösung |
|---------|------------------|
| `py` oder `python` meldet `did not find executable at '…\pythoncore-3.14-64\python.exe'` | Die `.venv` im Projekt verweist auf eine nicht mehr vorhandene Python-Installation. Für die Landingpage `npx serve` oder Doppelklick verwenden. Reparatur siehe unten. |
| `npx` fragt nach Installation von `serve` | Normal beim ersten Start – mit `y` bestätigen. |
| Port 8080 ist belegt | Anderen Port wählen: `npx serve -l 8090 .` |
| Beim Absenden des Formulars passiert nichts | Auf dem Rechner ist kein Standard-E-Mail-Programm eingerichtet. Die Bestätigung unter dem Formular erscheint trotzdem. |
| Änderungen sind im Browser nicht sichtbar | Zwischenspeicher umgehen mit `Strg+F5`. |
| Formular zeigt keine Fehlermeldung bei leeren Feldern | `demo.js` wird nicht geladen: Datei muss im selben Ordner wie `index.html` liegen. |
| Seite ohne Gestaltung | `style.css` fehlt oder liegt nicht im selben Ordner. |

### Python-Umgebung des Projekts reparieren (optional, betrifft nur Django)

Die Landingpage braucht Python nicht. Die Anwendung dagegen schon:

```powershell
deactivate
Remove-Item -Recurse -Force .venv
# Python 3.14 neu installieren (python.org oder: winget install Python.Python.3.14)
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Die `.venv` muss gelöscht werden, weil sie fest auf den alten Python-Pfad
verweist. `requirements.txt` bleibt unverändert.

---

## Änderungshistorie (Umstellung von AccessKlar auf AccessAnalyzer)

* Alle Buttons und Links auf `accessklar.de` entfernt (Upload, AGB, Widerruf,
  Impressum, Datenschutz). Die Seite verlinkt nur noch auf eigene Dateien.
* Alte Hinweisdateien `accessklar_landingpage.md` und `README.txt` entfernt.
* Texte und Gestaltung eigenständig neu aufgebaut (Name AccessAnalyzer,
  Petrol/Bernstein, eigenes Logo als eingebettete SVG-Grafik, eigene
  Beispielgrafik der Tabellenbeziehungen).
* Neu: Demo-Anfrage per Formular mit E-Mail-Vorbereitung (`demo.js`).
* Neu: eigene Seiten `impressum.html` und `datenschutz.html`.
* Gestaltung in `style.css` ausgelagert.
* Zugänglichkeit: „Zum Inhalt springen"-Link, sichtbare Fokusrahmen,
  beschriftete Formularfelder, reduzierte Animation bei entsprechender
  Systemeinstellung.
* Lokaler Test: Auslieferung unter dem Unterpfad `/AccessKlarLandingpage/`
  (wie bei GitHub Pages) und per `npx serve` jeweils mit Status 200 für alle
  Dateien geprüft.

