const options = {
  //foramtiert mit korrekter 0 falls 1 digit zahl.
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};
//Variablendeklaration (dates)
let heute = new Date(); //gibt mir exakt das Aktuelle Datum mit Zeit und Zeitzone
let tag = heute.getDate(); //Tag
let monat = heute.getMonth(); //Monat
let jahr = heute.getFullYear(); //Jahr
let tageDesMonats = new Date(heute.getFullYear(), heute.getMonth() + 1, 0);
let heutigesDatumDeutsch = heute.toLocaleDateString("de-DE", options); //formatiert es korrekt ins Deutsche
document.title = "Kalenderblatt " + heutigesDatumDeutsch;

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
let monatNum = heute.getMonth();
let monatName = monatArray[monatNum];

const wochentagArray = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch", //get Wochentag Name
  "Donnerstag",
  "Freitag",
  "Samstag",
];
let wochentagNum = heute.getDay();
let wochentag = wochentagArray[wochentagNum];

console.log(
  "ist ein schaltjahr mathe: " + (jahr % 4 == 0 && !jahr % 100 == 0) ||
    jahr % 400 == 0
);
console.log(
  "ist ein schaltjahr datum: " + (new Date(jahr, 1, 29).getMonth() == 1)
);

let previousMonthEnd = new Date(heute.getFullYear(), heute.getMonth(), 0);
let firstOfTheMonth = new Date(heute.getFullYear(), heute.getMonth(), 1);
let dayofPreviousMonthList = [];
let iteratorDay = previousMonthEnd;
let whileBreak = 0;
if (firstOfTheMonth.getDay() != 1) {
  //wenn der erste des Monats es kein Montag ist
  while (iteratorDay.getDay() != 0) {
    //bleibt aufm montag stehen
    whileBreak++;
    dayofPreviousMonthList.push(
      iteratorDay.toLocaleDateString("de-DE", options)
    );
    iteratorDay = new Date(
      iteratorDay.getFullYear(),
      iteratorDay.getMonth(),
      iteratorDay.getDate() - 1
    );
    if (whileBreak > 7) break;
  }
}
console.log(dayofPreviousMonthList);
console.log(dayofPreviousMonthList.length);

function calcTageVormonat(wochentagNum) {
  //Rechnet den aktuellen Tag -1 bis Montag
  let tageBisMontag = 0;
  while (wochentagNum !== 1) {
    tageBisMontag++;
    wochentagNum--;
    if (wochentagNum < 0) {
      wochentagNum = 6;
    }
  }
  return tageBisMontag;
}
let tageBisMontag = calcTageVormonat(wochentagNum);
calcTageVormonat(tageBisMontag);
console.log("minus", tageBisMontag, "Tage sind inside Month");

if (monat < 10) {
  monat = "0" + (monat + 1); //Monat Januar wäre 0, will ich nicht also +1
}

//Berechnet in welcher Monatwoche wir uns befinden.
// Monatwoche != Kalenderwoche
function getMonatwoche(tag) {
  if (tag < 7) {
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

//Holiday Abteilung:
function getOsterSonntag() {
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

let osternDate = getOsterSonntag();
let ostern = osternDate.toLocaleDateString("de-DE", options);

//berechnet die vom Ostern abhängigen Feiertage- + / - addiert / subtrahiert Tage
let ostermontag = new Date(osternDate);
ostermontag.setDate(osternDate.getDate() + 1);
ostermontag = ostermontag.toLocaleDateString("de-DE", options);

let christiHimmelfahrt = new Date(osternDate);
christiHimmelfahrt.setDate(osternDate.getDate() + 39);
christiHimmelfahrt = christiHimmelfahrt.toLocaleDateString("de-DE", options);

let pfingsten = new Date(osternDate);
pfingsten.setDate(osternDate.getDate() + 49);
pfingsten = pfingsten.toLocaleDateString("de-DE", options);

let karfreitag = new Date(osternDate);
karfreitag.setDate(osternDate.getDate() - 2);
karfreitag = karfreitag.toLocaleDateString("de-DE", options);

//feste Feiertage
//toLocalDateString wandelt das Datum in einen deutschen String
let neujahr = new Date(jahr, 0, 1);
let formatNeujahr = neujahr.toLocaleDateString("de-DE", options);

let tagDerArbeit = new Date(jahr, 4, 1);
let formatTagDerArbeit = tagDerArbeit.toLocaleDateString("de-DE", options);

let TDDE = new Date(jahr, 9, 3);
let formatTDDE = TDDE.toLocaleDateString("de-DE", options);

let weihnachten1 = new Date(jahr, 11, 25);
let formatWeihnachten1 = weihnachten1.toLocaleDateString("de-DE", options);

let weihnachten2 = new Date(jahr, 11, 26);
let formatWeihnachten2 = weihnachten2.toLocaleDateString("de-DE", options);

const feiertagArray = [
  formatNeujahr,
  formatWeihnachten1,
  formatWeihnachten2,
  formatTDDE,
  formatTagDerArbeit,
  ostern,
  karfreitag,
  pfingsten,
  christiHimmelfahrt,
  ostermontag,
];

// const feiertagArrayName [{}];

//sagt dem HTML infotext ob es sich im "ein" oder "kein" Feiertag handelt.
if (feiertagArray.includes(heutigesDatumDeutsch)) {
  document.getElementById("obFeiertag").innerHTML = "ein ";
} else {
  document.getElementById("obFeiertag").innerHTML = "kein ";
}


//überschreibt ins HTML Dokument
//Kalenderblatt
document.getElementById("kalenderblattHeadJs").innerHTML =
  monatName + " " + jahr;
document.getElementById("kalenderblattH1").innerHTML = heutigesDatumDeutsch;
//Historie
document.getElementById("datumHistorie").innerHTML = monatName;
//Infotext
document.getElementById("datumInfo").innerHTML = heutigesDatumDeutsch;
document.getElementById("datumInfo1").innerHTML = heutigesDatumDeutsch;
document.getElementById("wochentagInfo1").innerHTML = wochentag;
document.getElementById("wochentagInfo2").innerHTML = wochentag + " ";
document.getElementById("zahlWochentag").innerHTML = getMonatwoche(heute.getDate()) + "te";
document.getElementById("monatNameJs").innerHTML = " " + monatName;
document.getElementById("anzahlMonatTage").innerHTML = tageDesMonats.getDate();


function generiereKalenderblatt() {
  const kalenderContainer = document.getElementById("kalendertage");
  // Anzahl der Tage im aktuellen Monat
  const tageImMonat = tageDesMonats.getDate();

  const tageDesVormonats = dayofPreviousMonthList.length;
  console.log('Tage des Vormonat:' + tageDesVormonats);
  const tageInsgesamt = tageImMonat + tageDesVormonats;
  console.log("Tage insgesamt " + tageInsgesamt)
  const wochenZahl = Math.ceil(tageInsgesamt / 7);
  console.log('Wochen Zahl: ' + wochenZahl);
  const tageVomFolgemonat = wochenZahl * 7 - tageInsgesamt;
  console.log(tageVomFolgemonat);
    // Vormonat-Tage rückwärts sortieren
  const tageVormonat = [...dayofPreviousMonthList].reverse();

  let tagZaehler = 1;
  let folgeTagZaehler = 1;

  for (let woche = 0; woche < wochenZahl; woche++) {
    const tr = document.createElement("tr");
    tr.classList.add("kalendertage");

    // KW-Spalte (optional)
    const kwTd = document.createElement("td");
    kwTd.classList.add("kw");
    kwTd.textContent = "KW"; // Hier kannst du später echte KW berechnen
    tr.appendChild(kwTd);

    for (let tagDerWoche = 1; tagDerWoche <= 7; tagDerWoche++) {
      const td = document.createElement("td");
      // Samstag/Sonntag Klassen
      if (tagDerWoche === 6) td.classList.add("sa");
      if (tagDerWoche === 7) td.classList.add("so");

      // Vormonat
      if (woche === 0 && tageVormonat.length > 0) {
        td.textContent = tageVormonat.shift();
        td.classList.add("kalendertage1");
      } else if (tagZaehler <= tageImMonat) {
        // Aktueller Monat
        td.textContent = tagZaehler;
        if (tagZaehler === heute.getDate()) {
          td.classList.add("heute"); // Heute hervorheben
        }
        tagZaehler++;
      } else {
        // Folgemonat
        td.textContent = folgeTagZaehler;
        td.classList.add("kalendertage5");
        folgeTagZaehler++;
      }
      tr.appendChild(td);
    }
    kalenderContainer.appendChild(tr);
  }
}

generiereKalenderblatt();

