/**
 * Algseis: kasutaja on avalehel ja pole veel sisse logitud.
 * Tegevus: kasutaja sisestab vale parooli ja proovib sisse logida.
 * Ootus: kuvatakse veateade "Kasutaja või parool on vale" ning väljad tühjenevad.
 */

import { test, expect } from '@playwright/test';

test('Vale parool', async ({ page }) => {
    await page.goto('index.php');
    await page.getByText('Logi sisse').click();
    await page.waitForURL('login.php');
    await page.getByPlaceholder('Kasutajanimi').fill(process.env.USER!);
    await page.getByPlaceholder('Parool').fill('password123');
    let loginButton = page.getByText('Logi sisse');
    await loginButton.click();

    // Kontrollime, et oleme ikka sisselogimise lehel ja veateade on nähtav
    await expect(page).toHaveURL('login.php');
    await expect(page.locator('.sonum.viga')).toHaveText('Kasutaja või parool on vale');
    await expect(page.getByPlaceholder('Kasutajanimi')).toHaveText('');
    await expect(page.getByPlaceholder('Parool')).toHaveText('');
});