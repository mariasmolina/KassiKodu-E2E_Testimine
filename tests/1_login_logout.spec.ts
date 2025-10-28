/**
 * Algseis: külaline on sisselogimise lehel.
 * Tegevus: sisestan kehtivad andmed iga rolli jaoks (kasutaja, töötaja, admin) ja logeen sisse ning välja.
 * Ootus: igal rollil kuvatakse vastav vaade ja märgis; pärast väljalogimist on nähtav sisselogimisvorm.
 */

import { test, expect } from '@playwright/test';
import { login_as_admin, login_as_user, login_as_worker, logout } from '../helpers/auth';

test('Login_Logout (kasutaja)', async ({ page }) => {
    await login_as_user(page);
    await expect(page.getByText('Logi välja')).toBeVisible();
    await expect(page.locator('.tootaja-badge')).not.toBeVisible();
    await expect(page.locator('.admin-badge')).not.toBeVisible();
    await logout(page);
});

test('Login_Logout (töötaja)', async ({ page }) => {
    await login_as_worker(page);
    await expect(page.getByText('Logi välja')).toBeVisible();
    await expect(page.locator('.tootaja-badge')).toBeVisible();
    await logout(page);
});

test('Login_Logout (admin)', async ({ page }) => {
    await login_as_admin(page);
    await expect(page.getByText('Logi välja')).toBeVisible();
    await expect(page.locator('.admin-badge')).toBeVisible();
    await logout(page);
});