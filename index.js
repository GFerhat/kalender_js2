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





// console.log(
//   "ist ein schaltjahr mathe: " + (jahr % 4 == 0 && !jahr % 100 == 0) ||
//     jahr % 400 == 0
// );
// console.log(
//   "ist ein schaltjahr datum: " + (new Date(jahr, 1, 29).getMonth() == 1)
// );

function 
(date) { //Berechnet in welcher Kalenderwoche wir uns befinden.
    const target = new Date(date.valueOf());
    console.log("target: "+ target);
    // ISO-Woche beginnt am Montag, also auf den nächsten Donnerstag springen
    target.setDate(target.getDate() + 3 - (target.getDay() + 6) % 7);
    console.log("target: "+ target);
    // 1. Januar des Jahres
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    console.log("firstThursday: "+ firstThursday);
    // Auf den Donnerstag der ersten ISO-Woche springen
    firstThursday.setDate(firstThursday.getDate() + 3 - (firstThursday.getDay() + 6) % 7);
    console.log("firstThursday: "+ firstThursday);
    // Differenz in Tagen berechnen und durch 7 teilen
    const weekNumber = 1 + Math.round((target - firstThursday) / (7 * 24 * 60 * 60 * 1000));
    return weekNumber;
}

function generiereKalenderblatt(jahr, monat, tag) {
  const kalenderContainer = document.getElementById("kalendertage");
  kalenderContainer.innerHTML="";
  const tageDesVormonats = new Date(jahr,monat,1).getDay()-1;
  const tageDesFolgemonats = new Date(jahr,monat +2,0).getDay();
  const tageImMonat = new Date(jahr, monat + 1, 0).getDate();
  const tageImVormonat = new Date(jahr, monat, 0).getDate();
  const tageInsgesamt = tageImMonat + tageDesVormonats;
  const wochenZahl = Math.ceil(tageInsgesamt / 7);
  const tageVomFolgemonat = wochenZahl * 7 - tageInsgesamt;
  let weekNumber = getISOWeek(tag);
  const tagImMonat = tag.getDate();

  for (let wochenZaehler = 0; wochenZaehler < wochenZahl; wochenZaehler++) {
    const tableRow = document.createElement("tr");
    tableRow.classList.add("kalendertage");
    // //KW um erste spalte zu füllen (kw rechner funktion sollte codiert werden)
    const kalenderwocheTd = document.createElement("td");
    kalenderwocheTd.classList.add("kw");
    kalenderwocheTd.textContent= weekNumber;
    weekNumber++;
    tableRow.appendChild(kalenderwocheTd);
    
    for (let tageZaehler = 1;tageZaehler <=7; tageZaehler++) {//fügt immer 7 Zellen in die Zeile hinzu
      const tableCell = document.createElement("td");
      if (tageZaehler==6) tableCell.className="sa";//markiert Wochendende mit Farbe.
      if (tageZaehler==7) tableCell.className="so";
      const heute = wochenZaehler * 7 + tageZaehler - tageDesVormonats;//Berechnet das Datum korrrekt.
      if (heute == tagImMonat) tableCell.className="heute";//markiert den heutigen Tag.
      tableCell.innerText = heute;
      if (wochenZaehler==0 && tageZaehler <= tageDesVormonats) {//fügt Tage im Vormonat hinzu.
        tableCell.className="monatPassiv";//graut den Tag aus
        //addiert die Tage des Vormonats auf die negativen Zahlen vor unserem 1. des altuellen Monats.
        //bsp. vor dem ersten des Monats steht eine 0. 0+31(TageDesVormonats). Erste Zelle vor der 1 wird mit 31 gefüllt.
        tableCell.innerText = heute + tageImVormonat; 
      }
      if (heute>tageImMonat) { //Füllt Tage des folgemonats auf wenn vorhanden.
        tableCell.className="monatPassiv";//graut den Tag aus
        tableCell.innerText=heute-tageImMonat;//resetted die Variable heute 
      }
      tableRow.appendChild(tableCell);
    }
    kalenderContainer.appendChild(tableRow);
  }

}

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
// const feiertagArrayName [{}];

function changeMonth(direction) {
  direction == '-' ? monat-- : monat++;
  if (monat == -1) {
    jahr--;
    monat = 11;
  }
  if (monat == 12) {
    jahr++;
    monat=0;
  }
  // monatName = monatArray[monat];
  
  kalenderInitialisieren()
}
function kalenderInitialisieren() {
  //Variablendeklaration (dates)
  let ausgewaehlterTag = new Date(); //gibt mir exakt das Aktuelle Datum mit Zeit und Zeitzone
  let tag = ausgewaehlterTag.getDate(); //Tag
  let monat = ausgewaehlterTag.getMonth(); //Monat
  let jahr = ausgewaehlterTag.getFullYear(); //Jahr
  let monatName = monatArray[monat];
  let tageDesMonats = new Date(ausgewaehlterTag.getFullYear(), ausgewaehlterTag.getMonth() + 1, 0).getDate();
  let wochentagNum = ausgewaehlterTag.getDay();
  let wochentag = wochentagArray[wochentagNum];
  let heutigesDatumDeutsch = ausgewaehlterTag.toLocaleDateString("de-DE", options); //formatiert es korrekt ins Deutsche
  document.title = "Kalenderblatt " + heutigesDatumDeutsch;

  let osternDate = getOsterSonntag(jahr);
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
  document.getElementById("zahlWochentag").innerHTML = getMonatwoche(ausgewaehlterTag.getDate()) + "te";
  document.getElementById("monatNameJs").innerHTML = " " + monatName;
  document.getElementById("anzahlMonatTage").innerHTML = tageDesMonats;

  generiereKalenderblatt(jahr, monat);
}

kalenderInitialisieren()