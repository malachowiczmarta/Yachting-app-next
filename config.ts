const envVariableValidator = (variable: string | undefined, expectedVariableName: string) => {
  if (typeof variable !== 'string') {
    throw Error(
      `You need to include all necessary variables inside .env file in the root of your project to run application. First missing variable: ${expectedVariableName}.`
    );
  }
  return variable;
};

export const config = {
  AIRTABLE_API_KEY: envVariableValidator(process.env.AIRTABLE_API_KEY, 'API_KEY'),
  AIRTABLE_BASE: envVariableValidator(process.env.AIRTABLE_BASE, 'AIRTABLE_BASE'),
  NODE_ENVIRONMENT: envVariableValidator(process.env.NODE_ENV, 'NODE_ENV'),
  NEXTAUTH_SECRET: envVariableValidator(process.env.NEXTAUTH_SECRET, 'NEXTAUTH_SECRET')
};
