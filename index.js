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
let tageDesMonats = new Date(heute.getFullYear(), heute.getMonth() + 1, 0).getDate();
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
    iteratorDay = new Date
    ( iteratorDay.getFullYear(),
      iteratorDay.getMonth(),
      iteratorDay.getDate() - 1);
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

//Ermittelt in welcher Monatwoche wir uns befinden.
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

//Holiday Abteilung:__________________________________________________
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
//Holiday Abteilung End__________________________________________________

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
document.getElementById("anzahlMonatTage").innerHTML = tageDesMonats;



// function getDateWeek(date) {
//     const januaryFirst = 
//         new Date(date.getFullYear(), 0, 1);
//     const daysToNextMonday = 
//         (januaryFirst.getDay() === 1) ? 0 : 
//         (7 - januaryFirst.getDay()) % 7;
//     const nextMonday = 
//         new Date(date.getFullYear(), 0, 
//         januaryFirst.getDate() + daysToNextMonday);

//     return (date < nextMonday) ? 52 : 
//     (date > nextMonday ? Math.ceil(
//     (date - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
// }

// const currentDate = new Date();
// const weekNumber = getDateWeek();

// console.log("Week number of " + currentDate + " is : " + weekNumber);

function getKalenderwoche(year) {
  const day = new Date(year, 0, 1).getDay();
  let kalenderwoche = day >= 4 ? 1 : 0;
}

// kalenderwoche(jahr);

function generiereKalenderblatt(year, month) {
  const kalenderContainer = document.getElementById("kalendertage");
  const tageDesVormonats = new Date(year,month,1).getDay()-1;
  const tageDesFolgemonats = new Date(year,month +2,0).getDay();
  const tageImMonat = new Date(year, month + 1, 0).getDate();
  const tageImVormonat = new Date(year, month, 0).getDate();
  const tageInsgesamt = tageImMonat + tageDesVormonats;
  const wochenZahl = Math.ceil(tageInsgesamt / 7);
  const tageVomFolgemonat = wochenZahl * 7 - tageInsgesamt;

  for (let wochenZaehler = 0; wochenZaehler < wochenZahl; wochenZaehler++) {
    const tableRow = document.createElement("tr");
    tableRow.classList.add("kalendertage");

    // //KW um erste spalte zu füllen (kw rechner funktion sollte codiert werden)
    const kalenderwocheTd = document.createElement("td");
    kalenderwocheTd.classList.add("kw");
    kalenderwocheTd.textContent= "test";
    tableRow.appendChild(kalenderwocheTd);
        
    for (let tageZaehler = 1;tageZaehler <=7; tageZaehler++) {
      const tableCell = document.createElement("td");
      if (tageZaehler==6) tableCell.className="sa";
      if (tageZaehler==7) tableCell.className="so";
      const currentDate = wochenZaehler * 7 + tageZaehler - tageDesVormonats;
      tableCell.innerText = currentDate;
      if (wochenZaehler==0 && tageZaehler <= tageDesVormonats) {
        tableCell.className="monatPassiv";
        tableCell.innerText = currentDate + tageImVormonat;
      }
      if (currentDate>tageImMonat) {
        tableCell.className="monatPassiv";
        tableCell.innerText=currentDate-tageImMonat;
      }
      tableRow.appendChild(tableCell);
    }
    kalenderContainer.appendChild(tableRow);
  }

}

generiereKalenderblatt(jahr, 11);

