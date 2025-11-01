# KassiKodu E2E Testimine

See repositoorium sisaldab **Playwrighti** abil loodud lõput-lõpuni (E2E) teste rakenduse [**KassiKODU**](https://mariasmolina24.thkit.ee/phpandmebaas/kasside_varjupaik/index.php) jaoks.  
Testide eesmärk on kontrollida, et rakenduse põhifunktsioonid (sisselogimine, registreerimine, loomade haldamine, õigused, jms) töötaksid ootuspäraselt.
- [TEST PLAN](https://github.com/mariasmolina/KassiKodu-E2E_Testimine/blob/main/TEST_PLAN.md)
- [REPORT](https://github.com/mariasmolina/KassiKodu-E2E_Testimine/blob/main/REPORT.md)
---

## Projekti seadistamine ja testide käivitamine

Alljärgnevad sammud võimaldavad testid käivitada täiesti puhtal arvutil.

#### 1. Laadi projekt alla
Klooni repositoorium GitHubist ja ava see terminalis:

```bash
git clone https://github.com/mariasmolina/KassiKodu-E2E_Testimine
cd KassiKodu-E2E_Testimine
```

#### 2. Paigalda sõltuvused
Paigalda vajalikud Node.js moodulid:

```bash
npm install
```

Seejärel paigalda Playwrighti brauserid:

```bash
npx playwright install
```


#### 3. Käivita E2E testid
Käivita kõik Playwrighti testid järgmiste käskudega:

```bash
npx.cmd playwright test --ui
```
või peaga (avatud brauseriaknaga):
```bash
npx.cmd playwright test --headed
```
või npm skripti kaudu:
```bash
npm.cmd run test
```

#### 4. Vaata testitulemusi
Playwright loob automaatselt aruande ja ekraanipildid kaustadesse:

```bash
/test-results
/playwright-report
```

Raporti saab avada käsuga:
```bash
npx playwright show-report
```

## Süsteeminõuded

| Komponent           | Nõue                          |
|---------------------|--------------------------------|
| Operatsioonisüsteem | Windows 10 / macOS / Linux     |
| Node.js versioon    | 18.x või uuem                 |
| NPM / Yarn          | uusim versioon                |
| Playwright          | 1.42 või uuem                 |
| Toetatud brauserid  | Chromium, Firefox, WebKit     |

## Keskkonnamuutujad (.env)

Testide käivitamiseks on vaja faili `.env`, kus on rakenduse URL ja testkasutajate sisselogimisandmed (nt tavakasutaja, töötaja, administraator).

Selle projektil on `.env` olemas lokaalselt ja seda faili kasutatakse automaattestides.  
See fail **ei ole avalikus repositooriumis**, sest see sisaldab päris paroole.

Avalikus repositooriumis on selle asemel fail `.env.example`, kus on ainult muutujate nimed ilma väärtusteta:

```bash
BASE_URL=https://mariasmolina24.thkit.ee/phpandmebaas/kasside_varjupaik/index.php
USER=
USER_PASS=
TOOTAJA=
TOOTAJA_PASS=
ADMIN=
ADMIN_PASS=
```
### Mida teine kasutaja saab teha ilma nende paroolideta

- Ta **saab** käivitada testid, mis kasutavad tavalist registreeritud kasutajat, kui ta ise **registreerib** sellise kasutaja rakenduses ja lisab tema andmed oma `.env` faili.  
- Ta **ei saa** käivitada teste, mis nõuavad `worker` või `admin` kasutajaid, kuni testide autor ei jaga vastavaid sisselogimisandmeid.

## Projekti struktuur  

```lua
KassiKodu-E2E_Testimine/
├─ tests/
│  ├─ 1_login_logout.spec.ts
│  ├─ 2_wrong_password.spec.ts
│  ├─ 3_new_user_registration.spec.ts
│  ├─ 4_user_capabilities_check.spec.ts
│  ├─ 5_animal_create_modify_delete.spec.ts
│  ├─ 6_animal_show_hide.spec.ts
│  ├─ 7_worker_conditions_for_changing_data.spec.ts
│  └─ 8_food_searching_sorting.spec.ts
│
├─ helpers/
├─ test-results/
├─ .env
├─ package.json
├─ playwright.config.ts
└─ README.md
```

## Lühikirjeldus  

Iga test kontrollib ühte kasutaja tegevust, näiteks:  

- sisselogimine ja väljalogimine,  
- vale parooli käsitlemine,  
- uue kasutaja registreerimine,  
- õiguste kontroll,  
- loomade lisamine, muutmine ja kustutamine,  
- toiduotsing ja sorteerimine.  

Kõik testid on **sõltumatud ja korduvkäivad** — vajalikud andmed luuakse enne iga testi ja eemaldatakse pärast seda.

