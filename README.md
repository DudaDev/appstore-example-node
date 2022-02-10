# App Store Integration Example

A simple service to illustrate the handling of lifecycle and webooks events from Duda's App Store.

## Requirements

- Node

## How to use

### 1. Install dependencies

```bash
npm install
# or
yarn add
```

### 2. Set your secret key as an envar

The service will attempt to verify signature are from Duda when the DUDA_SECRET_KEY environment variable is set.

```bash
# make sure you're in the appstore-example directory 
'DUDA_SECRET_KEY=secret' > .env
```

### 3. Start the server

```bash
npm run serve
# or
yarn serve

# Update your manifest with the following details:
# [installation_endpoint] https://2dbb-68-250-227-145.ngrok.io/install
# [uninstallation_endpoint] https://2dbb-68-250-227-145.ngrok.io/uninstall
# [updowngrade_endpoint] https://2dbb-68-250-227-145.ngrok.io/updowngrade
# [webhooks_endpoint] https://2dbb-68-250-227-145.ngrok.io/webhooks
```

### 4. Update your manifest

```json
{
  ...
  "webhooks": {
    "endpoint": "https://2dbb-68-250-227-145.ngrok.io/webhooks"
  },
  "installation_endpoint": "https://2dbb-68-250-227-145.ngrok.io/install",
  "uninstallation_endpoint": "https://2dbb-68-250-227-145.ngrok.io/uninstall",
  "updowngrade_installation_endpoint": "https://2dbb-68-250-227-145.ngrok.io/updowngrade",
  "base_sso_url": "https://example.org",
  ...
}
```

### 5. Check it out

Log into Duda, install your app and monitor the logs!

### More Information

- [Dev Docs](https://developer.duda.co/docs/app-development)
