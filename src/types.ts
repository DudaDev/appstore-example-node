export interface InstallAuthDetails {
  /**
   * the type of authorization token returned
   */
  type: 'bearer';

  /**
   * the bearer token used when calling APIs on behalf
   * of a site
   */
  authorization_code: string;

  /**
   * the date (in milliseconds) when the authorization_code
   * will expire
   */
  expiration_date: number;

  /**
   * the token used to refresh the authorization_code
   * for a specific site
   */
  refresh_token: string;
}

export interface InstallLifecycleEvent {
  auth: InstallAuthDetails;

  /**
   * the specific API endpoint to access the APIs of a site
   */
  api_endpoint: string;

  /**
   * the unique identifier of the user who initially installed the app
   */
  installer_account_uuid: string;

  /**
   * the unique identifier of the account owner of the site that installed the app
   */
  account_owner_uuid: string;

  /**
   * the preferred language of the installer_account_uuid
   */
  user_lang: string;

  /**
   * the desired plan to install
   */
  app_plan_uuid: string;

  /**
   * denotes whether an install in monthly or annual
   */
  recurrency: 'MONTHLY' | 'YEARLY';

  /**
   * the unique identifier of the site install
   */
  site_name: string;

  /**
   * denotes whether the install is a test from Duda
   */
  free: boolean;

  /**
   * custom configuration objects sometimes passed in API calls
   */
  configuration_data: string;
}

export interface UninstallLifecycleEvent {
  /**
   * the unique identifier of the site install
   */
  site_name: string;
  /**
   * denotes whether the install is a test from Duda
   */
  free: boolean;
}

export interface UpdowngradeLifecycleEvent {
  /**
   * the desired plan to updowngrade
   */
  app_plan_uuid: string;

  /**
   * denotes whether an install in monthly or annual
   */
  recurrency: 'MONTHLY' | 'YEARLY';

  /**
   * the unique identifier of the site install
   */
  site_name: string;
}
