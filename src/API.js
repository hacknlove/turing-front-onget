import {
  set,
  beforeSet,
  get,
  beforeRefresh,
} from 'onget';
import systemConfig from './config/system';

function addAuthorization(context) {
  const authorization = get('localStorage://auth');
  if (!authorization) {
    context.preventRefresh = true;
    return;
  }
  context.options = {
    headers: {
      authorization,
    },
  };
}

beforeRefresh(`${systemConfig.serverBaseUrl}/customers`, addAuthorization);


beforeSet('localStorage://auth', async (context) => {
  if (!context.value) {
    return;
  }
  context.preventSet = true;
  const url = `${systemConfig.serverBaseUrl}/customers${context.value.name ? '' : '/login'}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(context.value),
  });

  if (response.error) {
    set('fast://toast', {
      variant: 'error',
      message: 'Network error',
    });
    return;
  }

  const data = await response.json();
  if (data.error) {
    set('fast://toast', {
      variant: 'error',
      message: data.error.message,
    });
    return;
  }

  context.preventSet = false;
  context.value = data;
  set('localStorage://auth', data, { preventHooks: true });
  set('fast://authVisible', false);
});
