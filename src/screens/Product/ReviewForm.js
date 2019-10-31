import React, { useState } from 'react';
import { Button, withStyles } from '@material-ui/core';
import StarRatings from 'react-star-ratings';
import Formsy from 'formsy-react';
import { get, set, refresh } from 'onget';
import { TextFieldFormsy } from '../../components/Formsy';
import styles from './styles';
import systemConfig from '../../config/system';

function RegisterForm({ productId }) {
  const [disabled, setdisabled] = useState(true);
  const [rate, setrate] = useState(0);

  async function submit(data) {
    const user = get('localStorage://auth');
    const response = await fetch(`${systemConfig.serverBaseUrl}/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'USER-KEY': user.accessToken,
      },
      body: JSON.stringify({
        product_id: productId,
        review: data.review,
        rating: rate,
      }),
    }).catch((error) => ({ error }));

    if (response.error) {
      set('fast://toast', {
        variant: 'error',
        message: 'Network error',
      });
      return;
    }
    const json = await response.json().catch(() => {}) || {};

    if (json.error) {
      set('fast://toast', {
        variant: 'error',
        message: json.error.message,
      });
      return;
    }

    refresh(`${systemConfig.serverBaseUrl}/products/${productId}/reviews`);
    document.getElementById('ReviewsScrollAnchor').scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <div className="w-full flex flex-row justify-center">
      <Formsy
        onValidSubmit={submit}
        onValid={() => setdisabled(false)}
        onInvalid={() => setdisabled(true)}
        className="px-8 pt-6 mt-6 pb-8 mb-4"
      >
        <div className="w-full py-4 mb-4">
          <StarRatings
            rating={rate}
            changeRating={setrate}
            starRatedColor="#ffc94f"
            starEmptyColor="#797979"
            starHoverColor="#ffc94f"
            starDimension="20px"
            starSpacing="1px"
            numberOfStars={5}
            name="rating"
            className="review-star"
          />
        </div>

        <TextFieldFormsy
          className="w-full mb-4"
          type="text"
          name="review"
          label="Your Review"
          variant="outlined"
          id="review"
          required
        />

        <Button
          disabled={disabled}
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="LOG IN"
          id="addReview"
          value="legacy"
        >
          Add Review
        </Button>

      </Formsy>
    </div>
  );
}

export default withStyles(styles)(RegisterForm);
