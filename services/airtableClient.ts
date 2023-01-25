import Airtable from 'airtable';
import { config } from '../config';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: config.AIRTABLE_API_KEY,
  apiVersion: null,
  noRetryIfRateLimited: null
});

export default Airtable.base(config.AIRTABLE_BASE);
