/**
 This component display single product using the product ID
 To complete this component, you need to implement the following:
 - Dynamically render product attributes, size and color
 - Show all reviews on the product
 - Hide review submission form if user is not logged in
 - Hide review submission form if a user is logged in but haven't previously ordered for the product
 - Review submission form should be visible if a logged in user has once ordered for the item
 - Hide login message if user is logged in
 - If a user click the `Add to Cart` button, the user should see an animation of how the product
   fly into the cart bag with an auto close success message, and the quantity of the item in the
   cart bag in the NavBar should increase
 - Dynamically render product reviews from the backend
 - Add functionality to post review
 - Add functionality to select product size, color and item quantity
 - Take initiatives to customize this component and add live to the page

 NB: YOU CAN STYLE AND CUSTOMIZE THIS PAGE, BUT YOU HAVE TO USE OUR DEFAULT CLASSNAME, IDS AND HTML
  INPUT NAMES
*/
import React, { useState } from 'react';
import {
  withStyles,
  Radio,
  Checkbox,
  Fab, CircularProgress, Hidden, Link,
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import StarRatings from 'react-star-ratings';
import classNames from 'classnames';
import { Carousel } from 'react-responsive-carousel';
import { set, useOnGet } from 'onget';
import systemConfig from '../../config/system';
import styles from './styles';
import { Container, Section } from '../../components/Layout';
import Review from '../../components/Review';
import ReviewForm from './ReviewForm';

function Product({ classes, match: { params } }) {
  const product = useOnGet(`${systemConfig.serverBaseUrl}/products/${params.id}`, {
    first: {
      isLoading: true,
    },
  });
  const locations = useOnGet(`${systemConfig.serverBaseUrl}/products/${params.id}/locations`, {
    first: {
      isLoading: true,
    },
  });
  const attributes = useOnGet(`${systemConfig.serverBaseUrl}/attributes/inProduct/${params.id}`, {
    first: [],
  });
  const reviews = useOnGet(`${systemConfig.serverBaseUrl}/products/${params.id}/reviews`, {
    first: [{ rating: 0 }],
  });

  console.log(reviews);
  const user = useOnGet('localStorage://auth');
  const [quantity, setquantity] = useState(0);
  const [size, setsize] = useState('M');
  const [color, setcolor] = useState('M');

  const isLoading = product.isLoading || locations.isLoading;

  if (isLoading) {
    return (
      <div className={classes.root}>
        <Container className="product-details">
          <Section>
            <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
              <CircularProgress size={40} color="primary" />
            </div>
          </Section>
        </Container>
      </div>
    );
  }

  const rating = reviews.reduce((rate, review) => rate + review.rating, 0) / (reviews.length || 1);

  const isDiscounted = parseFloat(product.discounted_price) > 0;

  return (
    <div className={classes.root}>
      <Container className="product-details">
        <div>
          <Section>
            <div className="flex flex-wrap shadow bg-white">
              <div
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center align-middle pt-10"
              >
                <Carousel showArrows showIndicators={false} showStatus={false}>
                  <div className={classes.carouselImageContainer}>
                    <img src={`${systemConfig.imageBaseUrl}${product.image}`} alt="Product" />
                  </div>
                  <div className={classes.carouselImageContainer}>
                    <img src={`${systemConfig.imageBaseUrl}${product.image_2}`} alt="Product" />
                  </div>
                </Carousel>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-10">
                <div className={`w-full h-8 ${classes.breadcrumbsText}`}>
                  Home
                  <span className="ml-4" />
                  •
                  <span className="ml-4" />
                  {locations[0].department_name}
                  <span className="ml-4" />
                  •
                  <span className="ml-4" />
                  {locations[0].category_name}
                </div>
                <div className="w-full h-8 mt-2">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffc94f"
                    starEmptyColor="#eeeeee"
                    starHoverColor="#ffc94f"
                    starDimension="20px"
                    starSpacing="1px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <div className="w-full h-8">
                  <span className={`product-details-title ${classes.productTitleText}`}>
                    {product.name}
                  </span>
                </div>
                <div className="w-full mt-4">
                  <span className={classes.productPrice}>
                    <span
                      className={classNames({
                        [classes.strikeThrough]: isDiscounted,
                      })}
                    >
                      £
                      {product.price}
                    </span>
                    {isDiscounted && (
                      <span>
                        | £
                        {product.discounted_price}
                      </span>
                    )}
                  </span>
                </div>
                <div id="ReviewsScrollAnchor" className="w-full my-8">
                  <div className="w-full mb-2">
                    <span className={classes.lightTitle}> Colour </span>
                  </div>
                  <div>
                    {
                      attributes.filter((a) => a.attribute_name === 'Color').map((c) => (
                        <Radio
                          key={c.attribute_value_id}
                          style={{ padding: 2, color: c.attribute_value, filter: 'drop-shadow(0px 0px 4px #ccc)' }}
                          size="small"
                          icon={<FiberManualRecord />}
                          value={c.attribute_value}
                          checked={color === c.attribute_value}
                          onClick={() => setcolor(c.attribute_value)}
                          name="radio-button-demo"
                          aria-label={c.attribute_value}
                          className="product-details-color"
                        />
                      ))
                    }
                  </div>
                </div>
                <div className="w-full my-8">
                  <div className="w-full mb-2">
                    <span className={classes.lightTitle}> Size </span>
                  </div>
                  <div>
                    {
                      attributes.filter((a) => a.attribute_name === 'Size').map((s) => (
                        <Checkbox
                          key={s.attribute_value_id}
                          style={{ padding: 0 }}
                          checkedIcon={
                            <div className={classes.sizeCheckboxChecked}>{s.attribute_value}</div>
                          }
                          icon={
                            <div className={classes.sizeCheckboxUnchecked}>{s.attribute_value}</div>
                          }
                          className="product-details-size"
                          value={s.attribute_value}
                          checked={size === s.attribute_value}
                          onClick={() => setsize(s.attribute_value)}
                        />
                      ))
                    }
                  </div>
                </div>
                <div className="w-full my-8 flex flex-row">
                  <Fab
                    size="small"
                    aria-label="Subtract"
                    className={classes.addRemoveIcon}
                    onClick={() => { setquantity(Math.max(0, quantity - 1)); }}
                  >
                    <SubtractIcon />
                  </Fab>
                  <div
                    className="shadow appearance-none border rounded w-16 text-gray-700 rounded-full text-center mx-2"
                  >
                    <span className={classes.addRemoveText} name="product-details-quantity">{quantity}</span>
                  </div>

                  <Fab
                    size="small"
                    aria-label="Add"
                    className={`increase-quantity ${classes.addRemoveIcon}`}
                    onClick={() => { setquantity(quantity + 1); }}
                  >
                    <AddIcon />
                  </Fab>
                </div>
                <div className="w-full my-8 flex flex-row">
                  <div className="relative">
                    <Fab
                      color="primary"
                      size="large"
                      id="btnCart"
                      style={{ borderRadius: 60, height: 60, width: 220 }}
                    >
                      <span className={classes.submitButtonText}>Add to Cart</span>
                    </Fab>
                  </div>
                </div>
              </div>
            </div>
          </Section>
          <div>
            <Hidden mdDown>
              <Section>
                <div className="flex flex-wrap px-32">
                  <div className="w-full flex">
                    <span className={classes.reviewTitleText}>
                      Product Reviews
                    </span>
                  </div>
                  {reviews.map((review) => (
                    <Review key={JSON.stringify(review)} {...review} />
                  ))}
                </div>
              </Section>
            </Hidden>
            {
            user
              ? (
                <ReviewForm productId={params.id} />
              )
              : (
                <div className="w-full flex justify-center align-middle py-8">
                  <Link
                    onClick={() => {
                      set('fast://authVisible', true);
                      set('fast://authMode', false);
                    }}
                    color="primary"
                    style={{ cursor: 'pointer', color: 'red' }}
                  >
                    Log In
                  </Link>
                  <span className="ml-2">to Add a Review.</span>
                </div>
              )
            }
          </div>
        </div>
      </Container>
    </div>
  );
}

export default withWidth()(withStyles(styles, {
  withTheme: true,
})(withRouter(Product)));
