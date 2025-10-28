/**
 * Algseis: administraator on sisse logitud ja asub loomade halduse lehel.
 * Tegevus: administraator lisab uue kassi nimega „Persik“, muudab selle andmeid ja seejärel kustutab kassi.
 * Ootus: kass „Persik“ kuvatakse pärast lisamist nimekirjas ja galeriis, andmete muutmine salvestub ning pärast kustutamist kirje ja kaart kaovad.
 */

import { test, expect } from '@playwright/test';
import { login_as_admin } from '../helpers/auth';

test.beforeEach(
    async ({ page }) => {
        await login_as_admin(page);
        await expect(page.getByText('Logi välja')).toBeVisible();
        await expect(page.locator('.admin-badge')).toBeVisible();

        // Avame loomade nimekirja lehe
        await page.locator('a[href="loomadAdmin.php"]').click();
        await expect(page).toHaveURL('loomadAdmin.php');
    }
);

test('Admin - uue kassi lisamine', async ({ page }) => {
    // Lisame uue kassi
    const pilt = 'https://static.demilked.com/wp-content/uploads/2016/08/biggest-maine-coon-cat-photography-robert-sijka-12.jpg';
    await expect(page.locator('id=lisamisvorm')).toBeVisible();
    await page.locator('id=looma_nimi').fill('Persik');
    await page.getByPlaceholder('kilogrammid').fill('4.5');
    await page.locator('id=synniaeg').fill('2022-05-10');
    await page.locator('input[name="sugu"][value="Isane"]').check();
    await page.locator('id=toug_id').selectOption('2');
    await page.locator('id=pilt').fill(pilt);
    await expect(page.locator('id=preview')).toBeVisible();
    await page.getByText('Lisa loom').click();
    page.once('dialog', dialog => dialog.accept());

    // Kontrollime, et kass on lisatud
    const row = page.locator('table tbody tr', { hasText: 'Persik' });
    await expect(row).toHaveCount(1);      
    await expect(row).toBeVisible();

    await expect(row).toContainText('Persik');      // Looma nimi
    await expect(row).toContainText('Isane');       // Sugu
    await expect(row).toContainText('2022-05-10');  // Sünniaeg
    await expect(row).toContainText('4.5');         // Kaal
    await expect(row).toContainText('Maine Coon');  // Tõug

    await page.locator('a[href="loomadKasutaja.php"]').click();
    await expect(page).toHaveURL('loomadKasutaja.php');
    const card = page.locator('.galerii_kaart', { hasText: 'Persik' });
    await expect(card).toBeVisible();
});

test('Admin - kassi info muutmine', async ({ page }) => {
    // Otsime kassi rida
    const row = page.locator('table tbody tr', { hasText: 'Persik' });
    await expect(row).toBeVisible();

    // Kontrollime, et esimene rida sisaldab oodatud andmeid
    await expect(row.locator('td').nth(0)).toHaveText('Persik');
    await expect(row.locator('td').nth(1)).toHaveText('Isane');
    await expect(row.locator('td').nth(2)).toHaveText('2022-05-10');
    await expect(row.locator('td').nth(3)).toHaveText('4.50');
    await expect(row.locator('td').nth(4)).toHaveText('Maine Coon');

    // Avame redigeerimisvormi
    let editButton = row.locator('td').nth(5).locator('a', { hasText: 'Muuda' });
    await editButton.click();
    const editRow = page.locator('table tbody tr').filter({
        has: page.locator('input[name="synniaeg"]')
    });
    await expect(editRow).toBeVisible();
    await editRow.locator('input[name="synniaeg"]').fill('2020-10-10');
    await editRow.locator('input[name="kaal"]').fill('6.20');
    let saveButton = page.locator('input[name="muutmine"]'); 
    await saveButton.click();
    page.once('dialog', dialog => dialog.accept());

    // Kontrollime, et andmed on muudetud    
    await expect(row).toBeVisible();
    await expect(row.locator('td').nth(2)).toHaveText('2020-10-10');  // uus sünniaeg
    await expect(row.locator('td').nth(3)).toHaveText('6.20');        // uus kaal
});

test('Admin - kassi kustutamine', async ({ page }) => {
    // Otsime kassi rida
    const row = page.locator('table tbody tr', { hasText: 'Persik' });
    await expect(row).toBeVisible();

    // Kustutame kassi
    const deleteButton = row.locator('td').nth(5).locator('a', { hasText: 'Kustuta' });
    await Promise.all([
        page.waitForEvent('dialog').then(d => d.accept()),
        deleteButton.click({ noWaitAfter: true }),
    ]);
    
    // Kontrollime, et kass on nimekirjast eemaldatud
    await expect(page.locator('table tbody tr', { hasText: 'Persik' }))
    .toHaveCount(0, { timeout: 15000 });

    // Kontrollime, et kass on galeriist eemaldatud
    await page.locator('a[href="loomadKasutaja.php"]').click();
    await expect(page).toHaveURL('loomadKasutaja.php');
    const card = page.locator('.galerii_kaart', { hasText: 'Persik' });
    await expect(card).toHaveCount(0);
});
