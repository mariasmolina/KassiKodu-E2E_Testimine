import { Page, expect } from '@playwright/test';

export async function login_as_user(page: Page) {
  await page.goto('index.php');
  await page.getByText('Logi sisse').click();
  await expect(page).toHaveURL('login.php');
  await page.getByPlaceholder('Kasutajanimi').fill(process.env.USER!);
  await page.getByPlaceholder('Parool').fill(process.env.USER_PASS!);
  await page.getByText('Logi sisse').click();
}

export async function login_as_worker(page: Page) {
  await page.goto('index.php');
  await page.getByText('Logi sisse').click();
  await expect(page).toHaveURL('login.php');
  await page.getByPlaceholder('Kasutajanimi').fill(process.env.TOOTAJA!);
  await page.getByPlaceholder('Parool').fill(process.env.TOOTAJA_PASS!);
  await page.getByText('Logi sisse').click();
  await expect(page.getByText('Logi välja')).toBeVisible();
  await expect(page.locator('.tootaja-badge')).toBeVisible();
}

export async function login_as_admin(page: Page) {
  await page.goto('index.php');
  await page.getByText('Logi sisse').click();
  await expect(page).toHaveURL('login.php');
  await page.getByPlaceholder('Kasutajanimi').fill(process.env.ADMIN!);
  await page.getByPlaceholder('Parool').fill(process.env.ADMIN_PASS!);
  await page.getByText('Logi sisse').click();
}

export async function logout(page: Page) {
  await page.getByText('Logi välja').click();
  await expect(page.getByText('Logi sisse')).toBeVisible();
}