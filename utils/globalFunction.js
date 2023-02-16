import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = async (key, value, expires) => {
  console.log(">>",value);
  try {
    const d = new Date();
    d.setDate(d.getDate() + expires);
    cookies.set(key, value, { path: "/", expires: d });
  } catch (error) {
    console.log(error);
  }
};
