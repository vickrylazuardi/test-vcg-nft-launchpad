import axios from "axios";
import React from "react";
import { API } from "../utils/globalConstant";
import nookies from "nookies";

export async function getServerSideProps({
  query: { token, checkToken, logout },
  ...ctx
}) {
  if (token) {
    nookies.set(ctx, "tokenVcg", token, {
      path: "/",
    });

    return {
      redirect: {
        destination: "/",
      },
    };
  }

  if (checkToken) {
    const res = await axios
      .get(API.marketplaceV2 + "api/profile", {
        headers: {
          common: {
            Authorization: checkToken,
          },
        },
      })
      .then((res) => {
        console.log("??then", res.data);
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
        if (error.response.status) {
          console.log("??cat", error.response.data);
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
          destination: "/",
        },
      };
    }
  }

  if (logout) {
    const res = await axios
      .get(API.marketplaceV2 + "api/profiles/logout", {
        headers: {
          common: {
            Authorization: logout,
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
    props: {},
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
