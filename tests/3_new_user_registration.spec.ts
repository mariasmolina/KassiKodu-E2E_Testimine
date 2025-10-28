/**
 * Algseis: kasutaja on avalehel ja pole veel sisse logitud.
 * Tegevus: kasutaja avab registreerimislehe, täidab vormi ja loob uue konto.
 * Ootus: kuvatakse teade „Konto loodud edukalt!“, kasutaja saab uue kontoga sisse logida ja tema nimi kuvatakse päises.
 */

import { test, expect } from '@playwright/test';

test('Uue kasutaja registreerimine', async ({ page }) => {
    await page.goto('index.php');
    await page.getByText('Logi sisse').click();
    await expect(page).toHaveURL('login.php');
    let registerButton = page.getByText('Registreeru');
    await registerButton.click();
    await expect(page).toHaveURL('signup.php');

    // Genereerime unikaalse kasutajanime
    const login = `test${Date.now()}`;
    
    // Täidame registreerimisvormi
    await page.locator('id=signup_name').fill('Maria Test');
    await page.locator('id=signup_login').fill(login);
    await page.locator('id=signup_parool').fill('Test1234!');
    await page.locator('id=signup_parool2').fill('Test1234!');

    let submitButton = page.getByText('Registreeru');
    await submitButton.click();
    
    await expect(page).toHaveURL('login.php?signup=success');
    await expect(page.locator('.sonum.edu')).toHaveText('Konto loodud edukalt!');
    await page.getByPlaceholder('Kasutajanimi').fill(login);
    await page.getByPlaceholder('Parool').fill('Test1234!');
    await page.getByText('Logi sisse').click();

    await expect(page).toHaveURL('index.php');
    await expect(page.getByText('Logi välja')).toBeVisible();
    await expect(page.locator('.tootaja-badge')).not.toBeVisible();
    await expect(page.locator('.admin-badge')).not.toBeVisible();

    // Kontrollime, et kasutajanimi on nähtav
    await expect(page.locator('.nav-user span')).toHaveText('Tere, Maria Test!');
});