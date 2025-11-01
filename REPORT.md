# KassiKodu E2E Testimise aruanne

Testid viidi läbi Playwrighti abil puhtas keskkonnas.  
Allpool on kokkuvõte toimivatest ja probleemsetest osadest.

---

## ✅ Mis töötab

1. Sisselogimine ja väljalogimine toimivad ootuspäraselt.
   
3. Uue kasutaja registreerimine õnnestub ja andmed salvestatakse.
4. Loomade lisamine, muutmine ja kustutamine töötab ilma tõrgeteta.  
5. Kasutaja õiguste süsteem piirab juurdepääsu korrektsetele lehtedele.  
6. Loomade peitmine/kuvamine muudab vaadet reaalajas.  
7. Toidu otsing ja sorteerimine annavad stabiilseid tulemusi.  
8. Testide käivitamine on korduv ja ei sõltu varasematest andmetest.

---

## ⚠️ Mis ei tööta
1. Sorteerimine töötab ainult ühes suunas – A-st Z-ni või väiksemast väärtusest suuremani.  
   Vastupidine järjestamine (Z-st A-ni või suuremast väiksemaks) ei ole praegu võimalik.
   
3. Kasutaja registreerimisel ei saa luua kontot, kui login sisaldab alakriipsu (`_`).  
   Süsteem ei kuva selgitavat teadet, miks registreerimine ebaõnnestus.
4. Kui registreerimisvormil jääb mõni väli tühjaks ja vajutada nuppu *„Registreeru“*, vorm lihtsalt tühjeneb ja leht värskendub, kuid kasutajale ei näidata, milline väli jäi täitmata.
5. Kui sisselogimisvormil jätta tühjaks kas login või parool ja vajutada *„Logi sisse“*, vorm puhastatakse, kuid puudub teavitus, et osa andmeid oli sisestamata.
6. Tavakasutajana (kasutaja) sisselogimisel ei kuvata kuskil märget või teavitust, mis kinnitaks, millise rolliga kasutaja süsteemis parasjagu sisse on logitud.


---

## 📸 Lisad

**Töötavate testide ekraanipilt:** 

<img width="581" height="922" alt="Playwright_tests_passed" src="https://github.com/user-attachments/assets/ed8f286f-f9ea-4b82-a370-5897a0e0afa2" />

---

## 📊 Kokkuvõte

Kõik põhilised kasutajategevused toimivad ootuspäraselt.  
Tuvastatud väiksemad vead ei takista rakenduse põhifunktsionaalsust, kuid vajavad tulevikus parandamist.  
Testide põhjal on süsteem **stabiilne ja kasutatav**, kuid mõningad täiustused parandaksid kasutajakogemust ja töökindlust pikaajaliselt.
