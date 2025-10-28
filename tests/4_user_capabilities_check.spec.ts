/**
 * Algseis: kasutaja on sisse logitud.
 * Tegevus: avan rakenduse menüü ja toitmise lehe.
 * Ootus: menüüs on ainult 4 linki; toitmise lehel on ainult otsingu väli, lisamisvorm puudub.
 */

import { test, expect } from '@playwright/test';
import { login_as_user } from '../helpers/auth';

test('Kasutaja piiratud menüü ja ainult otsing toitmisel', async ({ page }) => {
  await login_as_user(page);
  await expect(page.getByText('Logi välja')).toBeVisible();

  // Kontrollime, et menüüs on ainult 4 linki
  const menuLinks = page.locator('.nav-links a');
  await expect(menuLinks).toHaveCount(4);

  // Avame toitmise lehe
  await page.goto('toit.php');
  expect(page.url()).toContain('toit.php');

  // Kontrollime, et lehel on ainult kaks sisestusväli ja see on otsingu ja välja logimise jaoks
  const inputs = page.locator('input');
  await expect(inputs).toHaveCount(2); // Otsingu väli ja väljalogimise nupp

  const searchInput = page.getByText('Otsi');
  await expect(searchInput).toBeVisible();

  // Veendume, et lisamisvormi ei ole
  await expect(page.locator('id=lisamisvorm')).not.toBeVisible();
});
