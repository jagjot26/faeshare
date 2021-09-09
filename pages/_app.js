import App from "next/app";
import "../styles/tailwind-index.css";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { parseCookies, destroyCookie } from "nookies";
//nookies is built for next js to retrieve cookies from server side
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";
import Layout from "../components/Layout";
import "react-toastify/dist/ReactToastify.css"; //import react toastify in _app.js
import "semantic-ui-css/semantic.min.css"; //semantic ui css package

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

      {/*here, we could've also done: <Component posts={pageProps.posts}></Component> */}
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  //ctx we used in index.js is a property inside of appContext
  //getInitialProps always resolves to an object
  //{Component,ctx} destructured from appContext

  const { token } = parseCookies(ctx); //parseCookies need context to parse cookies
  //we set cookie name to token in authUser utility;
  let pageProps = {};

  const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/[username]" ||
    ctx.pathname === "/user/[userId]/following" ||
    ctx.pathname === "/user/[userId]/followers" ||
    ctx.pathname === "/post/[postId]" ||
    ctx.pathname === "/notifications" ||
    ctx.pathname === "/chats" ||
    ctx.pathname === "/settings";
  // '/[username] leads to [username].js inside of pages folder

  //if there's no token in the cookie
  if (!token) {
    console.log(ctx.pathname);

    protectedRoutes && redirectUser(ctx, "/login");
    //this means if there are protected routes in pathname, then move user to /login page since no token
  } else {
    //if TOKEN EXISTS
    if (Component.getInitialProps) {
      //Component is the active page here
      //if an active page is requesting getInitialProps, then
      pageProps = await Component.getInitialProps(ctx);
      //since we're doing this when token is there, we'll only get the user and userFollowStats on protected routes since we're awaiting pageProps when token exists. pageProps.user = user (i.e. pageProps consists of user)
    }

    try {
      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: token },
      }); //this receives an object with user and userFollowStats
      const { user, userFollowStats } = res.data;

      if (user) !protectedRoutes && redirectUser(ctx, "/"); //this means that if the user is not in a protected route, say he's in /login or /signup, then we'll redirect him to home page since user is already logged in

      pageProps.user = user; //we'll automatically receive these props in the protected routes. look at like 41 for more info
      //If we WEREN't spreading them, we would have to pass them like <Component user = {pageProps.user}></Component>
      //it's basically like  a global state where we have the user and userFollowStats and we can use them in any protected <Component> inside of <Layout></Layout>
      pageProps.userFollowStats = userFollowStats;
    } catch (error) {
      destroyCookie(ctx, "token"); //destroy the cookie in case of error
      redirectUser(ctx, "/login");
    }
  }
  return { pageProps };
  //this pageProps will automatically get addded to the props of this class, i.e. MyApp
};

export default MyApp;
