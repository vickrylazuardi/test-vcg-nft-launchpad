import Cookies from "universal-cookie";

const cookies = new Cookies();

var shajs = require('sha.js')

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

export const hashCode = (type, paymentMethodId, total)=>{
  const secret = '30727cb05c98d0aee762fa07954311362a7ef7d5ae482f262dea38c384f18e79'
  const token = `${type}-${secret}-${paymentMethodId}-${total}`;
  const hash256 = new shajs.sha256().update(token).digest("hex");
  return hash256
}
