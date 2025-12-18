import { chromium } from '@playwright/test';
import loadYamlData from '../../utils/yamlHelper';
import { loginAsUser } from '../../utils/authHelper';

const testData = loadYamlData('src/utils/testData.yaml');

const BASE_URL =
  'https://platformnex-v2-frontend-qa1-pyzx2jrmda-uc.a.run.app';

export default async function globalSetup() {
  const { email, password } = testData.login.valid;

  const browser = await chromium.launch({ headless: true });

  // ✅ IMPORTANT: baseURL is needed because your MainPage.goto('/') uses it
  const context = await browser.newContext({
    baseURL: BASE_URL,
  });

  const page = await context.newPage();

  await loginAsUser(page, email, password);

  // ✅ Save login state for all tests
  await page.context().storageState({ path: 'storage/storageState.json' });

  await browser.close();
}