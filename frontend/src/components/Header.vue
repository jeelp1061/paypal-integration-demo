<template>
  <div class="header">
    <v-app-bar app color="grey lighten-5" flat>
      <v-card-title @click="homeGo">
        PAYPAL APP
      </v-card-title>
    </v-app-bar>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  methods:{
    homeGo(){
      this.$router.push({name:'Home'});
    }
  }
}
</script>
