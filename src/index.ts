import * as express from 'express';
import * as ngrok from 'ngrok';
import * as db from './lib/store';
import { verifyRequestSignature } from './lib/verify';

if (!process.env.DUDA_SECRET_KEY) {
  console.warn('[warn] the DUDA_SECRET_KEY envar isn\'t set, so signature verification is not possible.');
}

const app = express();
app.use(express.json());
app.use(verifyRequestSignature);

/**
 * POST /install
 *
 * The installation endpoint where Duda will send install
 * lifecycle events.
 *
 * doc: https://developer.duda.co/docs/app-store-webhooks#install
 */
app.post('/install', async (req, res) => {
  const { body } = req;
  await db.handleInstallLifecycleEvent(body);
  res.send();
});

/**
 * POST /uninstall
 *
 * The uninstallation endpoint where Duda will send uninstall
 * lifecycle events.
 *
 * doc: https://developer.duda.co/docs/app-store-webhooks#uninstall
 */
app.post('/uninstall', async (req, res) => {
  const { body } = req;
  await db.handleUninstallLifecycleEvent(body);
  res.send();
});

/**
 * POST /updowngrade
 *
 * The upgrade/downgrade endpoint where Duda will send upgrade/downgrade
 * lifecycle events.
 *
 * doc: https://developer.duda.co/docs/app-store-webhooks#upgradedowngrade
 */
app.post('/updowngrade', async (req, res) => {
  const { body } = req;
  await db.handleUpdowngradeLifecycleEvent(body);
  res.send();
});

/**
 * POST /webhooks
 *
 * The webhook endpoint where Duda will send webhook lifecycle events.
 *
 * doc: https://developer.duda.co/docs/webhooks
 */
app.post('/webhooks', (req, res) => {
  const { body } = req;
  console.log(body);
  res.send();
});

app.listen(8000, async () => {
  const url = await ngrok.connect(8000);
  console.log('Update your manifest with the following details:');
  console.log(`[installation_endpoint] ${url}/install`);
  console.log(`[uninstallation_endpoint] ${url}/uninstall`);
  console.log(`[updowngrade_endpoint] ${url}/updowngrade`);
  console.log(`[webhooks_endpoint] ${url}/webhooks`);
});
