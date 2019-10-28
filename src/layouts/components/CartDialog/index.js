import React, { useState } from 'react';
import {
  Paper,
  Dialog,
  DialogContent,
  withStyles,
  Fab,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { set, useOnGet } from 'onget';
import Cart from './Cart';
import OrderForm from './Forms/OrderForm';
import styles from './styles';

function PaperComponent(props) {
  return (
    <Paper {...props} style={{ width: '820px' }} />
  );
}

function handleClose() {
  set('fast://cartVisible', false);
}


function CartDialog({ classes }) {
  const open = useOnGet('fast://cartVisible', { first: false });
  const [activeStep, setactiveStep] = useState(0);

  function handleNext() {
    setactiveStep(activeStep + 1);
  }

  function handlePrevious() {
    setactiveStep((activeStep || 1) - 1);
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        scroll="paper"
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent style={{ overflow: 'hidden' }}>
          <div className="flex">
            <div className="w-3/5 sm-12">
              <span className={classes.titleText}>1 items in Your Cart</span>
            </div>
            <div className="w-1/5 sm-12 flex justify-end">
              <span className={classes.totalText} onClick={handleClose}>Total: £ <span id="cartTotalPriceValue">0</span></span>
            </div>
            <div className="w-1/5 sm-12 flex justify-end">
              <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div className="w-full flex flex-grow flex-col" style={{ height: "450px" }}>
            { activeStep === 0 ? <Cart/> : <OrderForm />}
          </div>
          <div className="flex mb-4">
            <div className="w-1/2">
              <Fab
                color="primary"
                onClick={activeStep === 0 ? handleClose : handlePrevious}
                style={{ borderRadius: 48, height: 48, width: 160 }}
                className={classes.cartButton}
              >
                <span
                  className={classes.submitButtonText}>{activeStep === 0 ? 'Back to Shop' : 'Back'}
                </span>
              </Fab>
            </div>
            <div className="w-1/2 flex justify-end">
              <Fab
                color="primary"
                onClick={handleNext}
                style={{ borderRadius: 48, height: 48, width: 160 }}
                className={classes.cartButton}
              >
                { activeStep === 0
                  ? <span className={classes.submitButtonText} id="btnCheckout">Checkout</span>
                  : <span className={classes.submitButtonText} id="btnNext">Next</span>}
              </Fab>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(CartDialog);
