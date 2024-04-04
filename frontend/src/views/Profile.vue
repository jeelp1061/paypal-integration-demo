<template>
  <div class="profile">
    <Header />
    <div class="content">
      <v-navigation-drawer app v-model="drawer">
        <v-card-text class="text-center">
          <v-avatar color="indigo" size="100" class="mb-3"> </v-avatar>
          <Cancel class="mb-2" />
          <Suspend class="mb-2" />
          <Activate class="mb-2" />
          <v-btn
            color="secondary"
            dark
            block
            tile
            @click="upgradesubscription"
            class="pl-5 pr-5"
          >
            <span style="text-transform: capitalize">Upgrade</span>
          </v-btn>
        </v-card-text>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Cancel from "../components/Cancel";
import Suspend from "../components/Suspend";
import Activate from "../components/Activate";
export default {
  name: "Profile",
  components: { Header, Suspend, Cancel, Activate },
  data() {
    return {
      drawer: true,
      saving: false
    };
  },
  methods: {
    // upgrade subscrption
    upgradesubscription() {
      let subscription_id = this.$route.query.subid;
      localStorage.setItem("@upgradesubscrption", true);
      localStorage.setItem("@subscriptionid", JSON.stringify(subscription_id));
      this.$router.push("/");
    }
  }
};
</script>
