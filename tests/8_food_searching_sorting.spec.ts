/**
 * Algseis: kasutaja on avalehel ja avab toitude nimekirja lehe.
 * Tegevus: testib toidu otsingut tüübi ja tootja järgi ning kontrollib sortimist säilivuspäeva järgi.
 * Ootus: pärast otsingut kuvatakse ainult vastavad kirjed; sortimise järel on read järjestatud kasvavalt säilivuspäeva järgi.
 */

import { test, expect } from '@playwright/test';

test.beforeEach(
    async ({ page }) => {
        await page.goto('index.php');
        await page.locator('.nav-links a[href="toit.php"]').click();
        await expect(page).toHaveURL('toit.php');
    }
);

test.afterEach(
    async ({ page }) => {
        let resetButton = page.locator('button[type="button"]', { hasText: 'Tühjenda' });
        await resetButton.click();
    }
);

test ('Toidu otsimine', async ({ page }) => {
    let toiduTuupSelector = page.locator('select[name="otsityyp"]');
    let tootjaSelector = page.locator('select[name="otsitootja"]');

    await toiduTuupSelector.selectOption('kuiv');
    await tootjaSelector.selectOption('Royal Canin');

    let button = page.locator('input[type="submit"][value="Otsi"]');
    await button.click();

    let rows = page.locator('table tbody tr');
    let count = await rows.count();
    let tootjaNimetus = (await rows.locator('td').nth(1).innerText()).trim();
    let tuupNimetus = (await rows.locator('td').nth(2).innerText()).trim();
    for (let i = 1; i < count; i++) {
        await expect(tootjaNimetus).toBe('Royal Canin');
        await expect(tuupNimetus).toBe('kuiv');
    }
});

test ('Toidu sortimine säilituspäeva järgi', async ({ page }) => {
    let rows = page.locator('table tbody tr');
    let sorting = page.locator('a[href="toit.php?sort=sailivus_paevad"]');
    let count = await rows.count();

    await sorting.click();
    await expect(page).toHaveURL('toit.php?sort=sailivus_paevad');

    const values = [];
    for (let i = 1; i < count; i++) {
        const cellText = await rows.nth(i).locator('td').nth(3).innerText();
        values.push(Number(cellText.trim()));
    }

    const sorted = [...values].sort((a, b) => a - b);
    expect(values).toEqual(sorted);
});