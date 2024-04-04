import axios from "axios";
const client_id = process.env.VUE_APP_PAYPAL_CLIENT_ID;
const client_secret = process.env.VUE_APP_PAYPAL_CLIENT_SECRET_ID;
// retirive user Plan details
export async function retriveUserInformationFrom() {
  //FIRST AUTHENTICATION TO GET ACCESS TOKEN
  try {
    const auth = await axios({
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      method: "post",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "content-type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: client_id,
        password: client_secret
      },
      params: {
        grant_type: "client_credentials"
      }
    });
    //GET PLAN DETAILS
    const user_subscription_details = await axios({
      url: `https://api-m.sandbox.paypal.com/v1/billing/plans`,
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.data.access_token}`
      }
    });
    return user_subscription_details;
  } catch (error) {
    throw new Error("Some thing went wronge in PLAN GET API CALL");
  }
  // end
}

// IF WE WANT TO GET SINGLE SUBSCRIPTION DETAIL WITH SUB
export async function retriveuserinformation(subscriptionID) {
  try {
    const auth = await axios({
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      method: "post",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "content-type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: client_id,
        password: client_secret
      },
      params: {
        grant_type: "client_credentials"
      }
    });
    const user_subscription_details = await axios({
      url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}`,
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.data.access_token}`
      }
    });
    return console.log(user_subscription_details);
  } catch (error) {
    throw new Error("Some thing went wronge in SUBSCRIPTION ID WISE DATA GET");
  }
  // end
}

// suspend user subscription
export async function suspendusersubscription(subscriptionID) {
  try {
    const auth = await axios({
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      method: "post",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "content-type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: client_id,
        password: client_secret
      },
      params: {
        grant_type: "client_credentials"
      }
    });
    const user_subscription_details = await axios({
      url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}/suspend`,
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.data.access_token}`
      },
      data: {
        reason: "Customer-requested pause" // reason
      }
    });
    return user_subscription_details;
  } catch (error) {
    throw new Error("Some thing went wronge in SUSPEND USER SUBSCRIPTION API CALL");
  }
  // end
}

// cancel user subscription
export async function cancelusersubscription(subscriptionID) {
  try {
    const auth = await axios({
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      method: "post",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "content-type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: client_id,
        password: client_secret
      },
      params: {
        grant_type: "client_credentials"
      }
    });
    const user_subscription_details = await axios({
      url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}/cancel`,
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.data.access_token}`
      },
      data: {
        reason: "Customer-requested pause" // reason
      }
    });
    return user_subscription_details;
  } catch (error) {
    return new Error("Some thing went wronge CANCEL SUBSCRIPTION ISSUE");
  }
  // end
}

// activate user subscription
export async function activateusersubscription(subscriptionID) {
  // 1. Call PayPal to get a token
  const auth = await axios({
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    method: "post",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
      "content-type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: client_id,
      password: client_secret
    },
    params: {
      grant_type: "client_credentials"
    }
  });
  // 2. Call PayPal to get the subscription details
  const user_subscription_details = await axios({
    url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}/activate`,
    method: "post",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.data.access_token}`
    },
    data: {
      reason: "Reactivating on customer request"
    }
  });
  return user_subscription_details;
  // end
}

// // Webhook Integration
// export async function webhookInit() {
//   // 1. Call PayPal to get a token
//   const auth = await axios({
//     url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//     method: "post",
//     headers: {
//       Accept: "application/json",
//       "Accept-Language": "en_US",
//       "content-type": "application/x-www-form-urlencoded"
//     },
//     auth: {
//       username: client_id,
//       password: client_secret
//     },
//     params: {
//       grant_type: "client_credentials"
//     }
//   });
//   // 2. Call PayPal to get the subscription details
//   const user_subscription_details = await axios({
//     url: `https://api-m.sandbox.paypal.com//v1/notifications/webhooks`,
//     method: "get",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${auth.data.access_token}`
//     },
//     data: {
//       reason: "webhook creation"
//     }
//   });
//   return console.log(user_subscription_details);
//   // end
// }