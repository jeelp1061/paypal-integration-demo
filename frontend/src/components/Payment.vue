<template>
  <!-- Payment Component-->
  <div class="payment">
    <v-sheet height="100vh">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <div class="sheet-container">
              <v-card-text>
                <div class="paypal-title">{{ packageselect.title }}</div>
                <div class="paypal-text">
                  <span>Total Amount (USD) </span>
                  <span>${{ packageselect.amount }}</span>
                </div>
                <v-divider class="mt-4 mb-4"></v-divider>
                <div id="paypal-button-container"></div>
              </v-card-text>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import firebaseApp from "../../firebaseInit";
const db = firebaseApp.firestore();
export default {
  name: "Payment",
  data() {
    return {
      item: {},
      packageselect: ""
    };
  },
  async mounted() {
    const package_response = localStorage.getItem("@selectedpackage");
    const package_results = JSON.parse(package_response);
    if (package_results) {
      this.packageselect = package_results;
      await this.mountpaypalbutton();
    }
  },
  methods: {
    mountpaypalbutton() {
      // eslint-disable-next-line no-undef
      paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "blue",
            layout: "vertical",
            label: "paypal",
            size: "medium"
          },
          createSubscription: async function(data, actions) {
            const package_response = await localStorage.getItem(
              "@selectedpackage"
            );
            const package_results = JSON.parse(package_response);
            let plan_ID = package_results.plan_id; // user plan id
            return actions.subscription.create({
              plan_id: plan_ID
            });
          },
          // eslint-disable-next-line no-unused-vars
          onApprove: async function(data, actions) {
            localStorage.setItem("subscriptionId", data.subscriptionID);
            const {subscriptionID,paymentSource,orderID} = data
            const datares = await db.collection("paypaldoc").add({
              subscriptionId: subscriptionID,
              orderId: orderID,
              paymentSource: paymentSource,
              status:'active'
            });
            await db.collection("paypaldoc").doc(datares.id).update({
              id: datares.id
            });

            localStorage.removeItem("@selectedpackage");
            Swal.fire({
              icon: "success",
              title: "Congratulations",
              text: "Your payment has successfully been proccessed!",
              confirmButtonText: "Complete",
              showLoaderOnConfirm: true,
              preConfirm: () => {
                location.assign("http://localhost:8080/dashboard");
              },
              allowOutsideClick: false
            });
          }
        })
        .render("#paypal-button-container");
    }
  }
};
</script>

<style scooped lang="css">
@media only screen and (max-width: 600px) {
  .sheet-container {
    border: 1px solid #e0e0e0;
    width: 300px;
    border-radius: 5px;
  }
}
@media only screen and (min-width: 600px) and (max-width: 960px) {
  .sheet-container {
    border: 1px solid #e0e0e0;
    width: 350px;
    border-radius: 5px;
  }
}
@media only screen and (min-width: 960px) {
  .sheet-container {
    border: 1px solid #e0e0e0;
    width: 400px;
    border-radius: 5px;
  }
}
.paypal-title {
  -webkit-font-smoothing: antialiased;
  color: black;
  text-transform: uppercase;
  font-size: 1.1em;
  margin-bottom: 5px;
}
.paypal-text {
  -webkit-font-smoothing: antialiased;
  color: black;
  font-size: 1.2em;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
