/**
 * Algseis: administraator on sisse logitud ja asub loomade halduse lehel.
 * Tegevus: administraator peidab kass „Rizik” kasutajavaatest ja seejärel näitab teda uuesti.
 * Ootus: pärast peitmist kass ei ole nähtav kasutaja vaates; pärast uuesti näitamist kass ilmub tagasi galeriisse.
 */

import { test, expect } from '@playwright/test';
import { login_as_admin } from '../helpers/auth';

test('Kassi peitmine ja näitamine', async ({ page }) => {
    await login_as_admin(page);
    await expect(page.getByText('Logi välja')).toBeVisible();
    await expect(page.locator('.admin-badge')).toBeVisible();
    await expect(page).toHaveURL('index.php');

    // Avame loomade nimekirja lehe
    await page.locator('a[href="loomadAdmin.php"]').click();
    await expect(page).toHaveURL('loomadAdmin.php');

    const row = page.locator('table tbody tr', { hasText: 'Rizik' });
    let hideButton = row.locator('td').nth(6).locator('a', { hasText: 'Peida' });
    await expect(hideButton).toBeVisible();
    await hideButton.click();

    let showButton = row.locator('td').nth(6).locator('a', { hasText: 'Näita' });
    await expect(showButton).toBeVisible();
    await expect(hideButton).not.toBeVisible();

    // Kontrollime, et kass on peidetud kasutaja vaates
    await page.locator('a[href="loomadKasutaja.php"]').click();
    await expect(page).toHaveURL('loomadKasutaja.php');
    const card = page.locator('.galerii_kaart', { hasText: 'Rizik' });
    await expect(card).toHaveCount(0);

    // Nüüd näitame kassi uuesti
    await page.locator('a[href="loomadAdmin.php"]').click();
    await expect(page).toHaveURL('loomadAdmin.php');
    await showButton.click();
    await expect(hideButton).toBeVisible();
    await expect(showButton).not.toBeVisible();

    // Kontrollime, et kass on nähtav kasutaja vaates
    await page.locator('a[href="loomadKasutaja.php"]').click();
    await expect(page).toHaveURL('loomadKasutaja.php');
    await expect(card).toBeVisible();
});