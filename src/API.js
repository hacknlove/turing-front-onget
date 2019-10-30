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


beforeSet('dotted://user', async (context) => {
  context.preventSet = true;
  if (!context.value) {
    return set('localStorage://auth', false);
  }
  const url = `${systemConfig.serverBaseUrl}/customers${context.value.name ? '' : '/login'}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(context.value),
  });

  if (response.error) {
    return set('fast://toast', {
      variant: 'error',
      message: 'Network error',
    });
  }

  const data = await response.json();
  if (data.error) {
    return set('fast://toast', {
      variant: 'error',
      message: data.error.message,
    });
  }

  context.preventSet = false;
  context.value = data;
  set('localStorage://auth', data.accessToken);
  set('fast://authVisible', false);
});
