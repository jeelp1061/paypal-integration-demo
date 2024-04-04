import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/upgrade-subscription",
    name: "Upgrade",
    component: () => import("../views/Upgrade.vue")
  },
  {
    path: "/subscription-payment",
    name: "Payment",
    component: () => import("../components/Payment.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
