# KassiKodu E2E Testiplaan

Alljärgnevad testid kontrollivad peamisi kasutaja tegevusi rakenduses *KassiKodu*.  
Eesmärk on veenduda, et kasutaja saab sisse logida, registreeruda, hallata loomi ja otsida andmeid ootuspäraselt.  
Testiplaan katab olukorrad, kus sisestatakse nii õiged kui ka valed andmed, et kontrollida süsteemi vastuseid ja veateateid.  
Kontrollitakse, et erinevate rollide (`kasutaja`, `töötaja`, `admin`) õigused toimivad korrektselt ning piiravad ligipääsu vastavalt rollile.  
Loomade lisamise, muutmise ja kustutamise testid kinnitavad, et andmed salvestuvad ja uuenevad õigesti.  
Samuti jälgitakse, et loomade peitmine ja kuvamine töötaksid ootuspäraselt.  
Toiduotsingu ja sorteerimise testid aitavad veenduda, et filtreerimine annab õige tulemuse ja kasutajakogemus on sujuv.  
Kõik stsenaariumid on sõltumatud — vajalikud andmed luuakse enne iga testi ja eemaldatakse pärast selle lõppu.

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

