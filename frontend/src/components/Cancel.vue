<template>
  <div class="cancel-subscription" v-if="statusVal !== 'cancel'">
    <v-btn
      :loading="saving"
      color="red darken-1"
      dark
      tile
      block
      @click="cancelsubscription"
      class="pl-5 pr-5"
    >
      <span style="text-transform: capitalize">Cancel</span>
    </v-btn>
  </div>
</template>

<script>
import { cancelusersubscription } from "./script";
import firebaseApp from "../../firebaseInit";
const db = firebaseApp.firestore();
export default {
  name: "Cancel",
  data() {
    return {
      saving: false,
      statusVal: ''
    };
  },
  created(){
    this.statusVal = this.$route.query.status
  },
  methods: {
    // cancel subscription
    async cancelsubscription() {
      this.saving = true;
      let subscription_id = this.$route.query.subid; //  user subscription id
      let docId = this.$route.query.doc;
      await cancelusersubscription(subscription_id);
      await db.collection('paypaldoc').doc(docId).update({
        status:'cancel'
      });
      this.$router.push({name:'Dashboard'});
      // end
    }
  }
};
</script>
