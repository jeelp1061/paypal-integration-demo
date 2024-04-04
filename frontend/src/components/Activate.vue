<template>
  <div class="activate" v-if="statusVal !== 'active'">
    <v-btn
      :loading="saving"
      color="primary"
      dark
      block
      tile
      @click="activatesubscription"
      class="pl-5 pr-5 mb-2"
    >
      <span style="text-transform: capitalize">Activate</span>
    </v-btn>
  </div>
</template>

<script>
import { activateusersubscription } from "./script";
import firebaseApp from "../../firebaseInit";
const db = firebaseApp.firestore();
export default {
  name: "Activate",
  data() {
    return {
      saving: false,
      statusVal:''
    };
  },
  created(){
    this.statusVal = this.$route.query.status
  },
  methods: {
    // activate subscription
    async activatesubscription() {
      this.saving = true;
      let subscription_id = this.$route.query.subid; //  user subscription id
      let docId = this.$route.query.doc;
      if (subscription_id !== "") {
        await activateusersubscription(subscription_id);
        await db.collection('paypaldoc').doc(docId).update({
          status:'active'
        });
        this.$router.push({name:'Dashboard'});
      }
      // end
    }
  }
};
</script>
