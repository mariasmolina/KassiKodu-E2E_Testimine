# KassiKodu E2E Testiplaan

Alljärgnevad testid kontrollivad peamisi kasutaja tegevusi rakenduses *KassiKodu*.  
Eesmärk on veenduda, et kasutaja saab sisse logida, registreeruda, hallata loomi ja otsida andmeid ootuspäraselt.  
Iga stsenaarium on sõltumatu ning loob ja kustutab oma andmed.

---

### 1. Sisselogimine ja väljalogimine
- **Algseis:** Kasutaja on sisselogimislehel.  
- **Tegevus:** Sisestab õiged andmed ja vajutab „Logi sisse“.  
- **Ootus:** Kasutaja pääseb avalehele ja näeb oma nime. Logides välja, jõuab ta sisselogimislehele tagasi.

---

### 2. Vale parool
- **Algseis:** Kasutaja on sisselogimislehel.  
- **Tegevus:** Sisestab vale parooli.  
- **Ootus:** Kuvatakse veateade ja sisselogimine ebaõnnestub.

---

### 3. Uue kasutaja registreerimine
- **Algseis:** Kasutaja avab registreerimisvormi.  
- **Tegevus:** Täidab väljad ja esitab vormi.  
- **Ootus:** Kasutaja konto luuakse ja kuvatakse teade „Registreerimine õnnestus“.

---

### 4. Kasutaja õiguste kontroll
- **Algseis:** Kasutaja on sisseloginud tavalise kasutajana.  
- **Tegevus:** Püüab avada administraatori lehe.  
- **Ootus:** Kuvatakse teade „Ligipääs keelatud“ või suunatakse tagasi avalehele.

---

### 5. Looma lisamine, muutmine ja kustutamine
- **Algseis:** Kasutaja on loomade nimekirja lehel.  
- **Tegevus:** Lisab uue looma, muudab andmeid ja kustutab kirje.  
- **Ootus:** Kõik muudatused kajastuvad nimekirjas ning kustutatud kirje kaob.

---

### 6. Loomade peitmine ja kuvamine
- **Algseis:** Kasutaja on loomade nimekirja lehel.  
- **Tegevus:** Märgib looma nähtamatuks ja seejärel nähtavaks.  
- **Ootus:** Peidetud loom ei kuvata ning taasnähtav loom ilmub loendisse tagasi.

---

### 7. Töötajate andmete muutmise tingimused
- **Algseis:** Administraator on sisseloginud.  
- **Tegevus:** Muudab töötaja andmeid vastavalt reeglitele.  
- **Ootus:** Muudatused salvestatakse vaid juhul, kui tingimused on täidetud.

---

### 8. Toidu otsimine ja sorteerimine
- **Algseis:** Kasutaja on toitude lehel.  
- **Tegevus:** Sisestab otsingusõna ja muudab sorteerimise järjekorda.  
- **Ootus:** Tulemused filtreeritakse ja sorteeritakse õigesti.
