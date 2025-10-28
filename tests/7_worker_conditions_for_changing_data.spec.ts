/**
 * Algseis: töötaja on süsteemi sisse logitud ja asub toitmise ajaloo lehel.
 * Tegevus: töötaja kontrollib tabelit, kus kuvatakse erinevate töötajate sisestatud andmeid.
 * Ootus: töötaja näeb nuppe „Muuda” ja „Kustuta” ainult nende ridade juures, 
 *        mille sisestajaks on tema ise; teiste töötajate andmete puhul nupud puuduvad.
 */

import { test, expect } from '@playwright/test';
import { login_as_worker } from '../helpers/auth';

test('Töötaja õigused andmete muutmiseks', async ({ page }) => {
    await login_as_worker(page);
    await expect(page).toHaveURL('index.php');

    // Avame toitmisajaloo lehe
    await page.locator('a[href="toitmisAjalugu.php"]').click();
    await expect(page).toHaveURL('toitmisAjalugu.php');

    let greeting = await page.locator('.nav-user span').innerText();  
    let workerName = greeting.replace('Tere, ', '').replace('!', '').trim();

    const rows = page.locator('table tbody tr');
    const count = await rows.count();
    for (let i = 1; i < count; i++) {
        const row = rows.nth(i);

        let worker = (await row.locator('td').nth(4).innerText()).trim();

        const muuda = row.locator('td').nth(5).locator('a', { hasText: 'Muuda' });
        const kustuta = row.locator('td').nth(5).locator('a', { hasText: 'Kustuta' });

        if (worker === workerName) {
            await expect(muuda).toBeVisible();
            await expect(kustuta).toBeVisible();
        } else {
            await expect(muuda).toHaveCount(0);
            await expect(kustuta).toHaveCount(0);
        }   
    }
});