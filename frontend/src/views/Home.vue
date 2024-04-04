<template>
  <!-- Home Component-->
  <div class="home">
    <Header />
    <v-container>
      <!--Snackbar-->
      <v-snackbar color="info" text v-model="snackbar">
        You have selected <span>{{ selected.title }}</span>
      </v-snackbar>
      <v-row>
        <v-col cols="12" md="4" v-for="(item, index) in items" :key="index">
          <v-radio-group v-model="selected" row @change="selectedsubscription">
            <v-card elevation="5" tile>
              <v-card-text>
                <div class="mb-2 primary--text body-1">{{ item.title }}</div>
                <div class="title black--text">
                  <span>USD</span> {{ item.amount }}
                </div>
                <div>{{ item.text }}</div>
                <v-radio class="mt-4" :value="item" label="Select"></v-radio>
              </v-card-text>
            </v-card>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import { retriveUserInformationFrom } from "../components/script";
export default {
  name: "Home",
  components: { Header },
  data() {
    return {
      snackbar: false,
      selected: {},
      items: [
        // {
        //   title: "Basic",
        //   amount: "5",
        //   text:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nam quasi doloremque eos iure iste, quo nostrum ipsum, hic adipisci soluta cum voluptate perspiciatis accusamus quidem non error ratione temporibus.",
        //   plan_id: "P-8UH5152647911031KMONJIOQ" // plan id
        // },
      ]
    };
  },
  async created(){
    const datalist = await retriveUserInformationFrom()
    console.log('resss',datalist.data.plans)
    datalist.data.plans.forEach(element => {
      const {description,name,id} = element;
      this.items.push({text:description,title:name,plan_id:id})
    });
  },
  methods: {
    // selected subscription function
    selectedsubscription() {
      // check if we are creating a new subscrption or upgrading
      const response = localStorage.getItem("@upgradesubscrption");
      console.log(response,'response')
      localStorage.setItem("@selectedpackage", JSON.stringify(this.selected));
      // From here redirect for payment
      // set a timeout so user can see the package they hase selected
      // we can add a snackbar
      this.snackbar = true;
      // timeout
      // You can use one component and write the logic for both upgrade and payment.
      //In my case I have separated them to two components (Payment and Upgrade)
      // Both payment and upgrade requires the user consent
      setTimeout(() => {
        if (response) {
          // upgrade
          this.$router.push({name:'Upgrade'});
        } else {
          // new subscription
          this.$router.push("/subscription-payment");
        }
      }, 1000);
      // end
    }
  }
};
</script>
