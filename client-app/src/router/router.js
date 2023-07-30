import Router from "@/plugins/router";
import Movies from "@/pages/movies/Movies";
import SignIn from "@/pages/signIn/SignIn";
import NotFound from "@/pages/not-found/NotFound";
import SignUp from "@/pages/signup/SignUp";

const routes = [
  {
    path: "/",
    component: Movies,
  },
  {
    path: "/sign-up",
    component: SignUp,
  },
  {
    path: "/sign-in",
    component: SignIn,
    beforeEach() {},
  },
  {
    path: "*",
    component: NotFound,
  },
];

export const router = new Router(routes);

const isAuth = true;
router.beforeEach(function (from, to, next) {
  if (isAuth) {
    next();
    return;
  }

  next("/sign-in");
});
