import axios from "axios";
import React, { useEffect } from "react";
import { API } from "../utils/globalConstant";
import nookies from "nookies";
import cookeieParser from "cookieparser";
import { useRouter } from "next/router";

export async function getServerSideProps({
  query: { token, checkToken, logout, href },
  ...ctx
}) {
  const tokenAuth = ctx.req.headers.cookie
    ? cookeieParser.parse(ctx.req.headers.cookie).VcgAuth
    : null;

  // console.log("CTX", tokenAuth);
  if (token) {
    console.log("Token", token);
    nookies.set(ctx, "tokenVcg", tokenAuth ? tokenAuth : token, {
      path: "/",
    });

    return {
      redirect: {
        destination: "/",
      },
    };
  }

  if (checkToken) {
    console.log("CHEK", checkToken, tokenAuth);
    let profileData = null;
    let isLogedin = false;

    const res = await axios
      .get(API.marketplaceV2 + "api/profile", {
        headers: {
          common: {
            Authorization: tokenAuth ? tokenAuth : checkToken,
          },
        },
      })
      .then((res) => {
        // console.log("??then", res.data);
        if (res.data.status) {
          // nookies.set(ctx, "isLogedin", true, {
          //   path: "/",
          // });
          // nookies.set(ctx, "profile-data", JSON.stringify(res.data.data), {
          //   path: "/",
          // });
          profileData = res.data.data;
          isLogedin = true;
          return true;
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          // console.log("??cat", error.response.data);
          // nookies.set(ctx, "isLogedin", false, {
          //   path: "/",
          // });
          // nookies.set(ctx, "profile-data", null, {
          //   path: "/",
          // });
          profileData = null;
          isLogedin = false;

          return true;
        }
      });

    if (res) {
      return {
        props: { profileData, isLogedin, href },
        // redirect: {
        //   destination: href,
        // },
      };
    }
  }

  if (logout) {
    let profileData = null;
    let isLogedin = false;

    const res = await axios
      .get(API.marketplaceV2 + "api/profiles/logout", {
        headers: {
          common: {
            Authorization: tokenAuth ? tokenAuth : logout,
          },
        },
      })
      .then((res) => {
        if (res.data.status) {
          // nookies.destroy(ctx, "isLogedin", {
          //   path: "/",
          // });
          // nookies.destroy(ctx, "profile-data", {
          //   path: "/",
          // });
          nookies.destroy(ctx, "tokenVcg", {
            path: "/",
          });
          nookies.destroy(ctx, "VcgAuth", {
            path: "/",
            domain: ".vcg.asia",
          });
          profileData = null;
          isLogedin = false;

          return true;
        }
      });

    if (res) {
      return {
        // redirect: {
        //   destination: "/",
        // },
        props: { profileData, isLogedin },
      };
    }
  }

  return {
    redirect: {
      destination: "/",
    },
  };
}

export default function Auth(props) {
  const router = useRouter();
  // console.log("PROPS", props);

  useEffect(() => {
    if (props.profileData) {
      localStorage.setItem("profile-data", JSON.stringify(props.profileData));
    } else {
      localStorage.setItem("profile-data", null);
    }

    if (props.isLogedin) {
      localStorage.setItem("isLogedin", true);
      router.push(props.href);
    } else {
      localStorage.setItem("isLogedin", false);
      router.push('/');
    }
  }, [props]);
  
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "100vh" }}
    >
      <img
        width={150}
        height={150}
        className="m-auto"
        src="/loaders/loaders.gif"
        alt=""
      />
    </div>
  );
}
