import axios from "axios";
import React from "react";
import { API } from "../utils/globalConstant";
import nookies from "nookies";

export async function getServerSideProps({ query: { token }, ...ctx }) {
  if (token) {
    nookies.set(ctx, "tokenVcg", token, {
      path: "/",
    });

    const res = await axios
      .get(API.marketplaceV2 + "api/profile", {
        headers: {
          common: {
            Authorization: token,
          },
        },
      })
      .then((res) => {
        if (res.data.status) {
          nookies.set(ctx, "profile-data", JSON.stringify(res.data.data), {
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
