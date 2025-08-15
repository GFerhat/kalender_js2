const wochentagArray = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch", //get Wochentag Name
  "Donnerstag",
  "Freitag",
  "Samstag",
];
//gibt der Variable monatName immer den Aktuellen monat als String.
const monatArray = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const options = {
  //foramtiert mit korrekter 0 falls 1 digit zahl.
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

let tag;
let monat;
let jahr;
let monatName;
let tageDesMonats;
let wochentagNum;
let wochentag;
let ausgewaehltesDatumDeutsch;
let weekNumber;

const kalenderContainer = document.getElementById("kalendertage");

document.getElementsByClassName("nav-arrowback")[0].addEventListener("click", () => {
  changeMonth('-', jahr, monat)
})

document.getElementsByClassName("nav-arrowf")[0].addEventListener("click", () => {
  changeMonth('+', jahr, monat)
})

// function myFunction() {}
// const myFunction2 = () => {}

function initialize(ausgewaehltesDatum) {
  mainVariables(ausgewaehltesDatum);
  const feiertagArray = feiertagFestlegung(ausgewaehltesDatum, ausgewaehltesDatumDeutsch, jahr);
  generiereKalenderblatt(jahr, monat, kalenderContainer, weekNumber, ausgewaehltesDatum, feiertagArray);
  implementHtmlText(
    monatName,
    wochentag,
    jahr,
    tageDesMonats,
    ausgewaehltesDatumDeutsch,
    ausgewaehltesDatum
  );
  f1HistorieAusDemWeb(ausgewaehltesDatumDeutsch);
}

function getISOWeek(date) {
  //Berechnet in welcher Kalenderwoche wir uns befinden.
  const dateInMilliseconds = new Date(date.valueOf());
  console.log("target: " + dateInMilliseconds);
  // ISO-Woche beginnt am Montag, also auf den nächsten Donnerstag springen
  dateInMilliseconds.setDate(dateInMilliseconds.getDate() + 3 - ((dateInMilliseconds.getDay() + 6) % 7));
  console.log("target: " + dateInMilliseconds);
  // 1. Januar des Jahres
  const ersterDonnerstag = new Date(dateInMilliseconds.getFullYear(), 0, 4);
  console.log("erster: " + ersterDonnerstag);
  // Auf den Donnerstag der ersten ISO-Woche springen
  ersterDonnerstag.setDate(ersterDonnerstag.getDate() + 3 - ((ersterDonnerstag.getDay() + 6) % 7));
  console.log("erster Donnerstag: " + ersterDonnerstag);
  // Differenz in Tagen berechnen und durch 7 teilen
  const weekNumber = 1 + Math.round((dateInMilliseconds - ersterDonnerstag) / (7 * 24 * 60 * 60 * 1000));
  return weekNumber;
}

function mainVariables(ausgewaehltesDatum) {
  tag = ausgewaehltesDatum.getDate(); //Tag
  monat = ausgewaehltesDatum.getMonth(); //Monat
  jahr = ausgewaehltesDatum.getFullYear(); //Jahr
  monatName = monatArray[monat];
  tageDesMonats = new Date(jahr, monat + 1, 0).getDate();
  wochentagNum = ausgewaehltesDatum.getDay();
  wochentag = wochentagArray[wochentagNum];
  ausgewaehltesDatumDeutsch = ausgewaehltesDatum.toLocaleDateString("de-DE", options); //formatiert es korrekt ins Deutsche
  weekNumber = getISOWeek(new Date(jahr, monat, 1));
  document.title = "Kalenderblatt " + ausgewaehltesDatumDeutsch;
}

function getOsterSonntag(jahr) {
  //Spencer algorythm um osternDate zu ermitteln, egal in welchem Jahr
  let a = jahr % 19;
  let b = Math.floor(jahr / 100);
  let c = jahr % 100;
  let d = Math.floor(b / 4);
  let e = b % 4;
  let f = Math.floor((b + 8) / 25);
  let g = Math.floor((b - f + 1) / 3);
  let h = (19 * a + b - d - g + 15) % 30;
  let i = Math.floor(c / 4);
  let k = c % 4;
  let l = (32 + 2 * e + 2 * i - h - k) % 7;
  let m = Math.floor((a + 11 * h + 22 * l) / 451);
  let n = Math.floor((h + l - 7 * m + 114) / 31);
  let o = (h + l - 7 * m + 114) % 31;
  return new Date(jahr, n - 1, o + 1); //n ist der Monat o ist der Tag
}

function feiertagFestlegung(ausgewaehltesDatum, ausgewaehltesDatumDeutsch, jahr) {
  let osternDate = getOsterSonntag(jahr);
  let formatOstern = osternDate.toLocaleDateString("de-DE", options);

  //berechnet die vom Ostern abhängigen Feiertage- + / - addiert / subtrahiert Tage
  let ostermontag = new Date(osternDate);
  ostermontag.setDate(osternDate.getDate() + 1);
  let formatOstermontag = ostermontag.toLocaleDateString("de-DE", options);

  let christiHimmelfahrt = new Date(osternDate);
  christiHimmelfahrt.setDate(osternDate.getDate() + 39);
  let formatChristiHimmelfahrt = christiHimmelfahrt.toLocaleDateString("de-DE", options);

  let pfingsten = new Date(osternDate);
  pfingsten.setDate(osternDate.getDate() + 49);
  let formatPfingsten = pfingsten.toLocaleDateString("de-DE", options);

  let karfreitag = new Date(osternDate);
  karfreitag.setDate(osternDate.getDate() - 2);
  let formatKarfreitag = karfreitag.toLocaleDateString("de-DE", options);

  let fronleichnam = new Date(osternDate);
  fronleichnam.setDate(osternDate.getDate() + 60);
  let formatFronleichnam = fronleichnam.toLocaleDateString("de-DE", options);

  //feste Feiertage
  //toLocalDateString wandelt das Datum in einen deutschen String
  let neujahr = new Date(jahr, 0, 1);
  let formatNeujahr = neujahr.toLocaleDateString("de-DE", options);

  let neujahrNaechstesJahr = new Date(jahr + 1, 0, 1);
  let formatNeujahrNaechstesJahr = neujahrNaechstesJahr.toLocaleDateString("de-DE", options);

  let tagDerArbeit = new Date(jahr, 4, 1);
  let formatTagDerArbeit = tagDerArbeit.toLocaleDateString("de-DE", options);

  let TDDE = new Date(jahr, 9, 3);
  let formatTDDE = TDDE.toLocaleDateString("de-DE", options);

  let weihnachten1 = new Date(jahr, 11, 25);
  let formatWeihnachten1 = weihnachten1.toLocaleDateString("de-DE", options);

  let weihnachten2 = new Date(jahr, 11, 26);
  let formatWeihnachten2 = weihnachten2.toLocaleDateString("de-DE", options);

  const feiertagArray = [
    { feiertagName: "Neujahr", datum: neujahr, datumDeutsch: formatNeujahr },
    { feiertagName: "Karfreitag", datum: karfreitag, datumDeutsch: formatKarfreitag },
    { feiertagName: "Ostern", datum: osternDate, datumDeutsch: formatOstern },
    { feiertagName: "Ostermontag", datum: ostermontag, datumDeutsch: formatOstermontag },
    { feiertagName: "Tag der Arbeit", datum: tagDerArbeit, datumDeutsch: formatTagDerArbeit },
    { feiertagName: "Himmelfahrt", datum: christiHimmelfahrt, datumDeutsch: formatChristiHimmelfahrt },
    { feiertagName: "Pfingsten", datum: pfingsten, datumDeutsch: formatPfingsten },
    { feiertagName: "Fronleichnam", datum: fronleichnam, datumDeutsch: formatFronleichnam },
    { feiertagName: "Tag der Deutschen Einheit", datum: TDDE, datumDeutsch: formatTDDE },
    { feiertagName: "Weihnachten", datum: weihnachten1, datumDeutsch: formatWeihnachten1 },
    { feiertagName: "Weihnachten", datum: weihnachten2, datumDeutsch: formatWeihnachten2 },
    { feiertagName: "Neujahr", datum: neujahrNaechstesJahr, datumDeutsch: formatNeujahrNaechstesJahr },
  ];

  let i = 0;
  while (ausgewaehltesDatum >= feiertagArray[i].datum) {
    i++;
  }
  let kommenderFeiertag = feiertagArray[i].datum;
  kommenderFeiertag = kommenderFeiertag.toLocaleDateString("de-DE", options);
  document.getElementById("nextGesetzlicherFeiertag").innerHTML =
    "Der nächste gesetzliche Feiertag ist der " + kommenderFeiertag + " und zwar " + feiertagArray[i].feiertagName;

  const gefundenerFeiertag = feiertagArray.find(feiertach => feiertach.datum.getTime() === ausgewaehltesDatum.getTime());
  if (gefundenerFeiertag) {
    document.getElementById("obFeiertag").innerHTML = `ein gesetzlicher Feiertag in Hessen. (${gefundenerFeiertag.feiertagName})`;
  } else {
    document.getElementById("obFeiertag").innerHTML = "kein gesetzlicher Feiertag in Hessen.";
  }
  return feiertagArray;
}

function generiereKalenderblatt(year, month, kalenderContainer, weekNumber, ausgewaehltesDatum, feiertagArray) {
  kalenderContainer.innerHTML = "";
  const heute = new Date();
  const anzahlTageDesVormonats = new Date(year, month, 1).getDay() == 0 ? 6 : new Date(year, month, 1).getDay() - 1;
  const anzahlTageDesFolgemonats = new Date(year, month + 1, 0).getDay() == 0 ? 0 : 7 - new Date(year, month + 1, 0).getDay();
  const tageImMonat = new Date(year, month + 1, 0).getDate();
  const tageImVormonat = new Date(year, month, 0).getDate();
  const tageInsgesamt = tageImMonat + anzahlTageDesVormonats + anzahlTageDesFolgemonats;
  const wochenZahl = Math.ceil(tageInsgesamt / 7);
  for (let wochenZaehler = 0; wochenZaehler < wochenZahl; wochenZaehler++) {
    const tableRow = document.createElement("tr");
    tableRow.classList.add("kalendertage");
    // //KW um erste spalte zu füllen (kw rechner funktion sollte codiert werden)
    const kalenderwocheTd = document.createElement("td");
    kalenderwocheTd.classList.add("kw");
    kalenderwocheTd.textContent = weekNumber;
    weekNumber++;
    tableRow.appendChild(kalenderwocheTd);
    for (let tageZaehler = 1; tageZaehler <= 7; tageZaehler++) {
      //fügt immer 7 Zellen in die Zeile hinzu
      const tableCell = document.createElement("td");
      const datumDerZelle = wochenZaehler * 7 + tageZaehler - anzahlTageDesVormonats; //Berechnet das Datum korrrekt.
      tableCell.addEventListener("click", () => {
        initialize(new Date(year, month, datumDerZelle))
      })
      // //markiert Feiertage visuell im Kalender
      const vollesZellenDatum = new Date(year, month, datumDerZelle).toLocaleDateString("de-DE", options);

      if (tageZaehler == 6) tableCell.className = "sa"; //markiert Wochendende mit Farbe.
      if (tageZaehler == 7) tableCell.className = "so";
      if (feiertagArray.some(f => f.datumDeutsch === vollesZellenDatum)) {
        tableCell.classList.add("feiertag");
      }
      if (datumDerZelle == heute.getDate() && monat == heute.getMonth()) tableCell.className = "heute"; //markiert den heutigen Tag.
      tableCell.innerText = datumDerZelle;
      if (datumDerZelle == ausgewaehltesDatum.getDate()) tableCell.className = "ausgewaehltesDatum";
      if (wochenZaehler == 0 && tageZaehler <= anzahlTageDesVormonats) {
        //fügt Tage im Vormonat hinzu.
        tableCell.className = "monatPassiv"; //graut den Tag aus
        //addiert die Tage des Vormonats auf die negativen Zahlen vor unserem 1. des altuellen Monats.
        //bsp. vor dem ersten des Monats steht eine 0. 0+31(TageDesVormonats). Erste Zelle vor der 1 wird mit 31 gefüllt.
        tableCell.innerText = datumDerZelle + tageImVormonat;
      }
      if (datumDerZelle > tageImMonat) {
        //Füllt Tage des folgemonats auf wenn vorhanden.
        tableCell.className = "monatPassiv"; //graut den Tag aus
        tableCell.innerText = datumDerZelle - tageImMonat; //resetted die Variable heute
      }
      tableRow.appendChild(tableCell);
    }
    kalenderContainer.appendChild(tableRow);
  }
}

function changeMonth(direction) {
  direction == "-" ? monat-- : monat++;
  if (monat == -1) {
    jahr--;
    monat = 11;
  }
  if (monat == 12) {
    jahr++;
    monat = 0;
  }
  initialize(new Date(jahr, monat, 1));
}

//Ermittelt in welcher Monatwoche wir uns befinden.
// Monatwoche != Kalenderwoche
function getMonatwoche(tag) {
  if (tag <= 7) {
    return 1;
  } else if (tag < 14) {
    return 2;
  } else if (tag < 21) {
    return 3;
  } else if (tag < 28) {
    return 4;
  }
  return 5;
}

function implementHtmlText(
  monatName,
  wochentag,
  jahr,
  tageDesMonats,
  ausgewaehltesDatumDeutsch,
  ausgewaehltesDatum
) {
  //überschreibt ins HTML Dokument
  //Kalenderblatt
  document.getElementById("kalenderblattHeadJs").innerHTML =
    monatName + " " + jahr;
  document.getElementById("kalenderblattH1").innerHTML = ausgewaehltesDatumDeutsch;
  //Historie
  document.getElementById("datumHistorie").innerHTML = " " + ausgewaehltesDatumDeutsch;

  //Infotext
  document.getElementById("datumInfo").innerHTML = ausgewaehltesDatumDeutsch;
  document.getElementById("datumInfo1").innerHTML = ausgewaehltesDatumDeutsch;
  document.getElementById("wochentagInfo1").innerHTML = wochentag;
  document.getElementById("wochentagInfo2").innerHTML = wochentag + " ";
  document.getElementById("zahlWochentag").innerHTML = getMonatwoche(ausgewaehltesDatum.getDate()) + "te";
  document.getElementById("monatNameJs").innerHTML = " " + monatName;
  document.getElementById("anzahlMonatTage").innerHTML = tageDesMonats;
  document.getElementById("jahrInfotext").innerHTML = jahr;
}
initialize(new Date());

async function f1HistorieAusDemWeb(ausgewaehltesDatumDeutsch) {
  const list = document.getElementById("historieListe");
  list.innerHTML = "<li>Lade Ereignisse...</li>";
  try {
    const [dd, mm] = ausgewaehltesDatumDeutsch.split(".");
    const urlDE = `https://de.wikipedia.org/api/rest_v1/feed/onthisday/events/${mm}/${dd}`;
    const abrufAusWeb = await fetch(urlDE);
    if (!abrufAusWeb.ok) throw new Error("Fehler HTTP " + abrufAusWeb.status);

    const datenAusWeb = await abrufAusWeb.json();
    const events = Array.isArray(datenAusWeb.events) ? datenAusWeb.events : [];

    if (events.length === 0) {
      list.innerHTML = "<li>Keine Ereignisse.</li>";
      return;
    }
    let uniqueEintrag = new Set();
    const max = Math.min(3, events.length);
    let htmlInhalt = "";
    while (uniqueEintrag.size < max) {
      let randomEintrag = Math.floor(Math.random() * events.length);
      uniqueEintrag.add(randomEintrag);
    }
    let finalEventsArray = [];
    const uniqueEintragArray = Array.from(uniqueEintrag);
    uniqueEintragArray.forEach(element => {
      finalEventsArray.push(events[element]);
    });
    //switch a,b for inverted results
    finalEventsArray.sort((a, b) => a.year - b.year)
    list.innerHTML = htmlInhalt;
    let listenPunkte;
    const historieContainer = document.getElementById("historieListe");
    for (let i = 0; i < finalEventsArray.length; i++) {
      listenPunkte = document.createElement("li");
      listenPunkte.textContent = finalEventsArray[i].year + " " + finalEventsArray[i].text;
      listenPunkte.classList.add("historieListenPunkte");
      historieContainer.appendChild(listenPunkte);
    }
  }
  catch (err) {
      list.innerHTML = `<li>Fehler beim Laden: ${String(err).replace(/</g, "&lt;")}</li>`;
    }
}