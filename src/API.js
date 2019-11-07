import {
  set,
  beforeSet,
  get,
  beforeRefresh,
} from 'onget';
import Promise from 'bluebird';
import QueryString from 'query-string';
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


function filterPrice(products, range) {
  return products.filter((p) => 1 * p.price < range[1] && 1 * p.price > range[0]);
}
function filterKeywords(products, keywords) {
  keywords = keywords.split(/[ ,.;:"'?]/)
    .filter((k) => k)
    .map((k) => {
      try {
        return new RegExp(k, 'i');
      } catch {
        return false;
      }
    })
    .filter((k) => k);

  if (keywords.length) {
    return products.filter((p) => keywords.some((k) => k.test(p.name + p.description)));
  }
  return products;
}

async function filterAttributes(products, ...attributes) {
  attributes = attributes.filter((a) => a);
  if (!attributes.length) {
    return products;
  }

  return Promise.filter(products, async (p) => {
    const response = await fetch(`${systemConfig.serverBaseUrl}/attributes/inProduct/${p.product_id}`);
    const json = await response.json();
    return attributes.every((a1) => json.some((a2) => a1 === a2.attribute_value_id));
  });
}

async function getAllProductsInUrl({
  filter, url, path, search,
}) {
  search = QueryString.stringify({
    ...QueryString.parse(search),
    page: 1,
    limit: 1000,
  });
  const response = await fetch(`${path}?${search}`);
  const json = await response.json();
  json.count = 0;

  json.rows = filterPrice(json.rows, filter.range);

  json.rows = filterKeywords(json.rows, filter.keywords);

  console.log(1)
  json.rows = await filterAttributes(json.rows, filter.color, filter.size);
  console.log(3)


  set(url, json);
}

function filterListener(context) {
  console.log(context.url)
  const filter = get('fast://filter');
  if (filter) {
    context.preventRefresh = true;
    getAllProductsInUrl({
      filter,
      url: context.url,
      path: context.path,
      search: context.search,
    });
  }
}

beforeRefresh(`${systemConfig.serverBaseUrl}/products`, filterListener);
beforeRefresh(`${systemConfig.serverBaseUrl}/products/search`, filterListener);
beforeRefresh(`${systemConfig.serverBaseUrl}/products/inCategory/:category_id`, filterListener);
beforeRefresh(`${systemConfig.serverBaseUrl}/products/inDepartment/:department_id`, filterListener);

set('fast://pagination', {
  limit: 10,
  description_length: 120,
});

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
