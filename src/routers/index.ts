import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/main",
    component: () => import("@/app/layout/MainLayout.vue"),
    children: [
      {
        path: "/main",
        redirect: "/"
      },
      {
        path: "/",
        name: "Home",
        component: () => import("@/pages/Home.vue"),
        // children: [
          // ]
          },
            {
              path: "/app/:appId",
              name: "AppPage",
              component: () => import("@/pages/AppPage.vue")
            }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/404.vue")
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return { top: 0 };
  }
});
router.beforeEach(async (to, from, next) => {
  next();
});
