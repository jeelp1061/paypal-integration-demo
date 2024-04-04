<template>
  <!-- Suspend Component-->
  <div class="suspend-subscription" v-if="statusVal !== 'suspend'">
    <v-btn
      :loading="saving"
      color="warning"
      dark
      tile
      block
      @click="suspendsubscription"
      class="pl-5 pr-5"
    >
      <span style="text-transform: capitalize">suspend</span>
    </v-btn>
  </div>
</template>

<script>
import { suspendusersubscription } from "./script";
import firebaseApp from "../../firebaseInit";
const db = firebaseApp.firestore();
export default {
  name: "Suspend",
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
    // suspend subscription
    async suspendsubscription() {
      this.saving = true;
      let subscription_id = this.$route.query.subid; //  user subscription id
      let docId = this.$route.query.doc;
      await suspendusersubscription(subscription_id);
      await db.collection('paypaldoc').doc(docId).update({
          status:'suspend'
      });
      this.$router.push({name:'Dashboard'});
      // end
    }
  }
};
</script>
