import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { createCheckout } from '../../../../services/AccountService';
import { FaArrowRight } from 'react-icons/fa';
import useAccount from '../../../../hooks/useAccount';
const stripePromise = loadStripe("pk_test_aKXAngMXOasC99dapoLzwS5500SAkrz1IT");

const CheckoutForm = () => {
  const { account } = useAccount()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      if (account) {
        const stripe = await stripePromise
        const session = await createCheckout({ priceId: 'price_1InjwgJROBZShgQBiZ7y5r04', clientid: account })
        const result = await stripe.redirectToCheckout({ sessionId: session.sessionId })

        if (result.error) {
          console.log(result.error)
        }
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <>
      {
        loading
          ? (<button type="button" className="glow__btn__blue mt-3 w-100">
            Loading...
          </button>)
          : (<button type="button" id="checkout-button" role="link" onClick={handleClick} className="glow__btn__blue mt-3 w-100">
            Become unlimited <FaArrowRight className="ms-2" style={{ marginTop: '-4px' }} />
          </button>)
      }
    </>
  )
}

export default CheckoutForm
