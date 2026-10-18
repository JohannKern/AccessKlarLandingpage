/*
 * AccessAnalyzer – Landingpage: Demo-Anfrage
 *
 * Die Landingpage ist statisch und hat kein Backend. Das Formular erzeugt
 * deshalb beim Absenden eine vorausgefüllte E-Mail (mailto:) an die Adresse
 * aus dem Attribut data-empfaenger am <form>-Element.
 *
 * Ohne JavaScript greift der mailto-Fallback über das action-Attribut.
 */
(function () {
  "use strict";

  var form = document.getElementById("demo-formular");
  if (!form) { return; }

  var status = document.getElementById("demo-status");
  var empfaenger = form.getAttribute("data-empfaenger");

  function zeigeStatus(text, istFehler) {
    status.textContent = text;
    status.className = "form-status show" + (istFehler ? " error" : "");
  }

  function wert(name) {
    var feld = form.elements[name];
    return feld ? String(feld.value).trim() : "";
  }

  form.addEventListener("submit", function (ereignis) {
    ereignis.preventDefault();

    // Honeypot: Menschen sehen das Feld nicht und lassen es leer.
    if (wert("webseite") !== "") { return; }

    if (!form.checkValidity()) {
      form.reportValidity();
      zeigeStatus("Bitte füllen Sie die markierten Pflichtfelder aus.", true);
      return;
    }

    var zeilen = [
      "Guten Tag,",
      "",
      "ich möchte eine Demo von AccessAnalyzer anfragen.",
      "",
      "Name: " + wert("name"),
      "Firma: " + (wert("firma") || "–"),
      "E-Mail: " + wert("email"),
      "Telefon: " + (wert("telefon") || "–"),
      "Access-Umfeld: " + (wert("umfang") || "–"),
      "Bevorzugter Zeitraum: " + (wert("zeitraum") || "–"),
      "",
      "Nachricht:",
      wert("nachricht") || "–",
      "",
      "Ich habe die Datenschutzhinweise gelesen und bin damit einverstanden,",
      "dass Sie mich zur Demo-Anfrage kontaktieren."
    ];

    var betreff = "Demo-Anfrage AccessAnalyzer" + (wert("firma") ? " – " + wert("firma") : "");
    var adresse = "mailto:" + empfaenger +
      "?subject=" + encodeURIComponent(betreff) +
      "&body=" + encodeURIComponent(zeilen.join("\r\n"));

    zeigeStatus(
      "Vielen Dank! Ihr E-Mail-Programm öffnet sich mit einer vorbereiteten Nachricht – " +
      "bitte senden Sie diese ab. Öffnet sich nichts, schreiben Sie uns direkt an " +
      empfaenger + ".",
      false
    );
    window.location.href = adresse;
  });
})();
