<template>
  <div>
    <Header />
    <v-app-bar app color="grey lighten-5" flat>
      <v-card-title @click="homeGo">
        Subscription List
      </v-card-title>
    </v-app-bar>
    <v-divider></v-divider>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Index
            </th>
            <th class="text-left">
              Subscription
            </th>
            <th class="text-left">
              Payment
            </th>
            <th class="text-left">
              Order Id
            </th>
            <th class="text-left">
              Status
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in desserts"
            :key="index"
          >
            <td>{{ index+1 }}</td>
            <td>{{ item.subscriptionId }}</td>
            <td>{{ item.paymentSource }}</td>
            <td>{{ item.orderId}}</td>
            <td>{{ item.status }}</td>
            <td><v-btn elevation="2" v-if="item.status !== 'cancel'" @click="deleActionHandler(item.subscriptionId , item.id, item.status)">Action</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import Header from "../components/Header";
import firebaseApp from "../../firebaseInit";
const db = firebaseApp.firestore();
export default {
    name:'SubscriptionList',
    components:{
        Header
    },
    data () {
        return {
          desserts: [],
        }
      },
    async created(){
        await db.collection('paypaldoc').get().then((response)=>{
            response.forEach((doc)=>{
                this.desserts.push(doc.data())
            })
        });
    },
    methods:{
        async deleActionHandler(subid,docId,sta){
            this.$router.push({ path: 'Profile', query: { subid: subid,doc:docId,status:sta}})
        },
        homeGo(){
            this.$router.push({name:'Home'})
        }
    }
}
</script>