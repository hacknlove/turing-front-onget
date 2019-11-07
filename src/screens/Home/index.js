/**
 *
 * if a user select a department and category in the navigation menu
 * - Filter should display Department and category dynamically when a user select a department and
 * category on the navigation bar
 * - Filter should dynamically dislay attribute values like Size and Color from backend
 * - Price on the Price slider should change as the user slide through in the Filter
 * - Implement functionalities for search in the Nav bar and Filter bar
 * - Implement functionality for reset on Filter component
 * - Implement pagination for products
 *
 */
import React from 'react';
import {
  withStyles,
  Paper,
  Radio,
  Checkbox,
  Button,
  Fab,
  TextField,
  Slider
} from '@material-ui/core';
import ReactPaginate from 'react-paginate';
import { useOnGet, set, refresh } from 'onget';
import QueryString from 'query-string';
import withWidth from '@material-ui/core/withWidth';
import { useHistory, useParams } from 'react-router-dom';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Close from '@material-ui/icons/Close';
import styles from './styles';
import { Container, Section } from '../../components/Layout';
import ListProduct from '../../components/ListProduct';
import Banner from '../../components/Banner';
import SubscribeBar from '../../components/SubscribeBar';
import './styles.css';
import systemConfig from '../../config/system';

const defaultFilters = {
  size: '',
  color: '',
  range: [10, 25],
  keywords: '',
};

function Filter({ classes, url }) {
  const departments = useOnGet(`${systemConfig.serverBaseUrl}/departments`, { first: [] });
  const categories = useOnGet(`${systemConfig.serverBaseUrl}/categories`, { first: { rows: [] } });
  const sizes = useOnGet(`${systemConfig.serverBaseUrl}/attributes/values/1`, { first: [] });
  const colors = useOnGet(`${systemConfig.serverBaseUrl}/attributes/values/2`, { first: [] });
  const editFilter = useOnGet('dotted://editFilter', { first: defaultFilters });
  const { category_id, department_id } = useParams();

  const department = departments.find((d) => department_id * 1 === d.department_id) || {};
  const category = categories.rows.find((c) => category_id * 1 === c.category_id) || {};

  function reseteditFilters() {
    set('dotted://editFilter', defaultFilters);
  }

  return (
    <div className="w-1/4 filterSection">
      <Paper className={classes.controlContainer} elevation={1}>
        <div className={classes.filterBlock}>
          <div className={classes.titleContainer}>
            <span className={classes.controlsTopTitle}>
              Filter Items
            </span>
          </div>
          <div className={classes.filterItems}>
            {category.name && (
              <div className="py-1">
                <span className={classes.isGrey}>Category: </span>
                <span>{category.name}</span>
              </div>
            )}
            {department.name && (
              <div className="py-1 pb-2">
                <span className={classes.isGrey}>Department: </span>
                <span>{department.name}</span>
              </div>
            )}
          </div>
        </div>
        <div className={classes.filterBodyContainer}>
          <div className={classes.colorBlock}>
            <div className={classes.titleContainer}>
              <span className={classes.controlsTitle}>
                Color
              </span>
            </div>
            <div className={classes.colorRadiosContainer}>
              {
                colors.map((color) => (
                  <Radio
                    key={color.attribute_value_id}
                    style={{ padding: 0, color: color.value, filter: 'drop-shadow(0px 0px 4px #ccc)' }}
                    size="small"
                    icon={<FiberManualRecord />}
                    value={color.attribute_value_id}
                    checked={editFilter.color === color.attribute_value_id}
                    onClick={() => set('dotted://editFilter.color', color.attribute_value_id)}
                    name="radio-button-demo"
                    aria-label={color.value}
                    className="product-details-color"
                  />
                ))
              }
            </div>
          </div>
          <div className={classes.sizesBlock}>
            <div className={classes.titleContainer}>
              <span className={classes.controlsTitle}>
                Size
              </span>
            </div>
            <div className={classes.sizeCheckboxes}>
              {sizes.map((size) => (
                <Checkbox
                  key={size.attribute_value_id}
                  style={{ padding: 0 }}
                  checkedIcon={<div className={classes.sizeCheckboxChecked}>{size.value}</div>}
                  icon={<div className={classes.sizeCheckboxUnchecked}>{size.value}</div>}
                  value={size.attribute_value_id}
                  checked={editFilter.size === size.attribute_value_id}
                  onClick={() => set('dotted://editFilter.size', size.attribute_value_id)}
                />
              ))}
            </div>
          </div>
          <div className={classes.sliderBlock}>
            <div className={classes.titleContainer}>
              <span className={classes.controlsTitle}>
                Price Range
              </span>
            </div>
            <div className={classes.sliderContainer}>
              <Slider
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                valueLabelFormat={(v) => `£${v}`}
                color="primary"
                defaultValue={editFilter.range}
                value={editFilter.range}
                min={10}
                max={25}
                onChange={(event, newValue) => { set('dotted://editFilter.range', newValue); }}
              />
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                height: '24px',
              }}
            >
              <div className={classes.rangesText}>
                £
                {editFilter.range[0]}
              </div>
              <div style={{ flexGrow: 1 }} />
              <div className={classes.rangesText}>
                £
                {editFilter.range[1]}
              </div>
            </div>
          </div>
          <div className={classes.searchBlock}>
            <div className={classes.titleContainer}>
              <span className={classes.controlsTitle}>
                Search keyword
              </span>
            </div>
            <div className={classes.searchContainer}>
              <TextField
                inputProps={{
                  className: classes.filterSearchInput,
                }}
                onChange={(e) => set('dotted://editFilter.keywords', e.target.value)}
                placeholder="Enter a keyword to search..."
                margin="dense"
                variant="outlined"
                name="search"
              />
            </div>
          </div>
        </div>
        <div className={classes.footerBlock}>
          <Fab
            color="primary"
            size="small"
            className={classes.coloredButton}
            style={{ borderRadius: 24, height: 35, width: 90 }}
            onClick={() => {
              set('fast://filter', editFilter);
              refresh(url);
            }}
          >
            <span
              className={classes.submitButtonText}
            >
              Apply
            </span>
          </Fab>
          <Button
            className={classes.clearText}
            onClick={reseteditFilters}
          >
            <Close className={classes.boldIcon} />
            <span>Reset</span>
          </Button>
        </div>
      </Paper>
    </div>
  );
}

function makeURL({
  category_id,
  department_id,
  page = 1,
  q,
}) {
  if (q) {
    return `${systemConfig.serverBaseUrl}/products/search?query_string=${q}&page=${page}`;
  }
  if (category_id) {
    return `${systemConfig.serverBaseUrl}/products/inCategory/${category_id}?page=${page}`;
  }
  if (department_id) {
    return `${systemConfig.serverBaseUrl}/products/inDepartment/${department_id}?page=${page}`;
  }
  return `${systemConfig.serverBaseUrl}/products?page=${page}`;
}

function useAPI() {
  const { category_id, department_id } = useParams();
  const history = useHistory();
  const { q, page } = QueryString.parse(history.location.search);

  const url = makeURL({
    category_id,
    department_id,
    page,
    q,
  });

  const response = useOnGet(url, {
    first: {
      count: 0,
      rows: [],
    },
  });

  return {
    url,
    total: response.count,
    products: response.rows,
  };
}

function Home({ classes }) {
  const history = useHistory();
  const { page = 1 } = QueryString.parse(history.location.search);
  const { limit } = useOnGet('fast://pagination');

  const { url, total, products } = useAPI();

  function pageChange({ selected }) {
    window.scrollTo(0, 0);
    const search = QueryString.parse(history.location.search);
    if (selected) {
      search.page = selected + 1;
    } else {
      delete search.page;
    }
    history.push({
      search: QueryString.stringify(search),
    });
  }

  return (
    <div className={classes.root}>
      <Container>
        <Section>
          <div className="flex mb-4 contentHolder">
            <Filter classes={classes} url={url} />
            <div className="w-3/4 flex flex-wrap ml-6 productsSection">
              {products.map((product) => (
                <div key={product.product_id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-4">
                  <ListProduct product={product} />
                </div>
              ))}
              {
                total / limit < 2 || (
                <div className="paginate">
                  <ReactPaginate
                    pageCount={total / limit}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    initialPage={page - 1}
                    onPageChange={pageChange}
                  />
                </div>
                )
              }
            </div>
          </div>
        </Section>
        <Section>
          <Banner />
        </Section>
        <Section>
          <SubscribeBar />
        </Section>
      </Container>
    </div>
  );
  /**/
}

export default withWidth()(
  withStyles(styles, {
    withTheme: true,
  })(Home),
);
