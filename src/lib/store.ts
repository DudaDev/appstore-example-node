import * as NeDB from 'nedb';
import * as path from 'path';

import {
  InstallLifecycleEvent,
  UpdowngradeLifecycleEvent,
  UninstallLifecycleEvent,
} from '../types';

export const authDB = new NeDB({
  filename: path.resolve(process.cwd(), 'auth.db.json'),
  autoload: true,
});

export const installDB = new NeDB({
  filename: path.resolve(process.cwd(), 'installs.db.json'),
  autoload: true,
});

/**
 * handles the installation lifecycle event by creating a record in
 * the installations and auth data stores.
 *
 * @param event installation lifecycle event
 */
export async function handleInstallLifecycleEvent(event: InstallLifecycleEvent) {
  const {
    auth,
    ...rest
  } = event;

  const doc = { site_name: rest.site_name, ...auth };

  const handleError = function (err: any) {
    if (err) {
      console.error(`[error] unable to install ${event.site_name}: error=${err}`);
    }
  };

  // create install record in db
  installDB.insert(rest, handleError);

  // create auth record in db
  authDB.insert(doc, handleError);
}

/**
 * handles the uninstallation lifecycle event by removing records
 * by site name.
 *
 * @param event uninstallation lifecycle event
 */
export async function handleUninstallLifecycleEvent(event: UninstallLifecycleEvent) {
  const query = { site_name: event.site_name };

  const handleError = function (err: any) {
    if (err) {
      console.error(`[error] unable to uninstall ${event.site_name}: error=${err}`);
    }
  };

  // remove installation details from the db
  installDB.remove(query, handleError);

  // remove auth details from the db
  authDB.remove(query, handleError);
}

/**
 * handles the updowngrade lifecycle event by updating records
 * by site name.
 *
 * @param event updowngrade lifecycle event
 */
export async function handleUpdowngradeLifecycleEvent(event: UpdowngradeLifecycleEvent) {
  const query = { site_name: event.site_name };
  const updateQuery = { event };
  const updateOpts = { upsert: true };

  const handleError = function (err: any) {
    if (err) {
      console.error(`[error] unable to updowngrade ${event.site_name}: error=${err}`);
    }
  };

  // updated the plan_uuid in the db
  installDB.update(query, updateQuery, updateOpts, handleError);
}
