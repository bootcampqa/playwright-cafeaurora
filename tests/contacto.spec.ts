import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://cafeqaexperience.lovable.app/contacto');
});

test('Enviar el formulario de contacto con todos los campos válidos', async ({ page }) => {
  await page.getByLabel('Nombre').fill('Prueba Playwright');
  await page.getByLabel('Email').fill('playwright@example.com');
  await page.getByLabel('Asunto').selectOption({ label: 'Evento privado' });
  await page.getByLabel('Mensaje').fill('Mensaje de prueba automatizada.');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(page.getByRole('heading', { name: '¡Mensaje enviado!' })).toBeVisible();
});

test('No enviar el formulario si el nombre está vacío', async ({ page }) => {
  await page.getByLabel('Email').fill('playwright@example.com');
  await page.getByLabel('Mensaje').fill('Mensaje de prueba automatizada.');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(page.getByRole('heading', { name: '¡Mensaje enviado!' })).not.toBeVisible();
});

test('No enviar el formulario si el email está vacío', async ({ page }) => {
  await page.getByLabel('Nombre').fill('Prueba Playwright');
  await page.getByLabel('Mensaje').fill('Mensaje de prueba automatizada.');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(page.getByRole('heading', { name: '¡Mensaje enviado!' })).not.toBeVisible();
});

test('No enviar el formulario si el mensaje está vacío', async ({ page }) => {
  await page.getByLabel('Nombre').fill('Prueba Playwright');
  await page.getByLabel('Email').fill('playwright@example.com');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(page.getByRole('heading', { name: '¡Mensaje enviado!' })).not.toBeVisible();
});

test('No enviar el formulario si el email tiene un formato inválido', async ({ page }) => {
  await page.getByLabel('Nombre').fill('Prueba Playwright');
  await page.getByLabel('Email').fill('email-invalido');
  await page.getByLabel('Mensaje').fill('Mensaje de prueba automatizada.');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(page.getByRole('heading', { name: '¡Mensaje enviado!' })).not.toBeVisible();
});
