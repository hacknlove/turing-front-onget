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
} from '@material-ui/core';
import { useOnGet, set } from 'onget';
import { Slider } from 'material-ui-slider';
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Close from '@material-ui/icons/Close';
import styles from './styles';
import { Container, Section } from '../../components/Layout';
import ListProduct from '../../components/ListProduct';
import Banner from '../../components/Banner';
import SubscribeBar from '../../components/SubscribeBar';
import './styles.css';
import systemConfig from '../../config/system';


function Filter({ classes }) {
  const editFilter = useOnGet('dotted://editFilter', {
    first: {
      size: '',
      color: '',
      range: [1, 500],
      keywords: '',
    },
  });
  const sizes = useOnGet(`${systemConfig.serverBaseUrl}/attributes/values/1`, {
    first: [],
  });
  const colors = useOnGet(`${systemConfig.serverBaseUrl}/attributes/values/2`, {
    first: [],
  });

  function reseteditFilters() {
    set('dotted://editFilter', {
      first: {
        size: '',
        color: '',
        range: [1, 500],
        keywords: '',
      },
    });
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
            <div className="py-1">
              <span className={classes.isGrey}>Category: </span>
              <span>Regional</span>
            </div>
            <div className="py-1 pb-2">
              <span className={classes.isGrey}>Department: </span>
              <span>French</span>
            </div>
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
                    value={color.value}
                    checked={editFilter.color === color.value}
                    onClick={() => set('dotted://editFilter.color', color.value)}
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
                  value={size.value}
                  checked={editFilter.size === size.value}
                  onClick={() => set('dotted://editFilter.size', size.value)}
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
                color="#f62f5e"
                defaultValue={editFilter.range}
                value={editFilter.range}
                min={1}
                max={500}
                range
                onChange={(e) => { set('dotted://editFilter.range', e); }}
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
                onChange={(e) => { set('dotted://editFilter.keywords', e.value); }}
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
            onClick={() => set('fast://applyFilter', editFilter)}
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

function Home({ classes }) {
  const { page, limit, description_length } = useOnGet('fast://pagination', {
    first: {
      page: 1,
      limit: 10,
      description_length: 120,
    },
  });

  const applyFilter = useOnGet('fast://applyFilter');

  const response = useOnGet(`${systemConfig.serverBaseUrl}/products?page=${page}&limit=${limit}&description_length=${description_length}`, {
    first: {
      rows: [],
    },
  });


  const currentProducts = response.rows;

  return (
    <div className={classes.root}>
      <Container>
        <Section>
          <div className="flex mb-4 contentHolder">
            <Filter classes={classes} />
            <div className="w-3/4 flex flex-wrap ml-6 productsSection">
              {currentProducts.map((product) => (
                <div key={product.product_id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-4">
                  <ListProduct product={product} />
                </div>
              ))}
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
}

export default withWidth()(
  withStyles(styles, {
    withTheme: true,
  })(withRouter(Home)),
);
