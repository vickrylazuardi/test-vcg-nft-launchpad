import axios from "axios";
import React from "react";
import { API } from "../utils/globalConstant";
import nookies from "nookies";
import cookeieParser from "cookieparser";

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
    console.log("CHEK", checkToken);
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
          nookies.set(ctx, "isLogedin", true, {
            path: "/",
          });
          nookies.set(ctx, "profile-data", JSON.stringify(res.data.data), {
            path: "/",
          });
          return true;
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          // console.log("??cat", error.response.data);
          nookies.set(ctx, "isLogedin", false, {
            path: "/",
          });
          nookies.set(ctx, "profile-data", null, {
            path: "/",
          });

          return true;
        }
      });

    if (res) {
      return {
        redirect: {
          destination: href,
        },
      };
    }
  }

  if (logout) {
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
          nookies.destroy(ctx, "isLogedin", {
            path: "/",
          });
          nookies.destroy(ctx, "profile-data", {
            path: "/",
          });
          nookies.destroy(ctx, "tokenVcg", {
            path: "/",
          });
          nookies.destroy(ctx, "VcgAuth", {
            path: "/",
          });
          return true;
        }
      });

    if (res) {
      return {
        redirect: {
          destination: "/",
        },
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
