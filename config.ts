const envVariableValidator = (variable: string | undefined, expectedVariableName: string) => {
  if (typeof variable !== 'string') {
    throw Error(
      `You need to include all necessary variables inside .env file in the root of your project to run application. First missing variable: ${expectedVariableName}.`
    );
  }

  return variable;
};
// export const config = {
//   AIRTABLE_API_KEY: envVariableValidator(process.env.AIRTABLE_API_KEY, 'AIRTABLE_API_KEY'),
//   AIRTABLE_BASE: envVariableValidator(process.env.AIRTABLE_BASE, 'AIRTABLE_BASE'),
//   NODE_ENVIRONMENT: envVariableValidator(process.env.NODE_ENV, 'NODE_ENV'),
//   NEXTAUTH_SECRET: envVariableValidator(process.env.NEXTAUTH_SECRET, 'NEXTAUTH_SECRET'),
//   STRIPE_SECRET_KEY:
//     'sk_test_51MblosAOnxreBxImJ7YDa8sOe1rhgOpjgjqaVuzAdRsOMMO8Yh3INnTe771gsBGXXMipEVfgn3cEL563EWtYAOLd00L2YWmezv',
//   NEXT_PUBLIC_STRIPE: envVariableValidator(process.env.NEXT_PUBLIC_STRIPE, 'NEXT_PUBLIC_STRIPE')
// };

export const config = {
  AIRTABLE_API_KEY: 'keycs3LTs6kuGGVTk',
  AIRTABLE_BASE: 'appPz2XnrmbfCVEGD',
  // NODE_ENVIRONMENT: envVariableValidator(process.env.NODE_ENV, 'NODE_ENV'),
  NEXTAUTH_SECRET: 'yachting_app_marta_secret',
  STRIPE_SECRET_KEY:
    'sk_test_51MblosAOnxreBxImJ7YDa8sOe1rhgOpjgjqaVuzAdRsOMMO8Yh3INnTe771gsBGXXMipEVfgn3cEL563EWtYAOLd00L2YWmezv',
  NEXT_PUBLIC_STRIPE:
    'pk_test_51MblosAOnxreBxImiQXRxEfQE7mBOw8ooNmxvWTAEX1nmMUW5SBKvgYwpDsz1YDKWOhwvzUH6eIuvkusySkhn84N006U2aU8dd'
};
