import axios from "axios";
import { ApiUrl } from '../../../auxiliary/globalVariables.js';

const checkIfSupplierInDB = async (extID) => {
  const result = await axios.get(`${ApiUrl}/supplier/checkExtExists/shopify/${extID}`)
  .catch((error) => {
    console.log(error);
  });
  return result;
};

const addSupplierToDB = async (shopData) => {
  const result = await axios.post(`${ApiUrl}/supplier`, {
    name: shopData.name,
    contactName: shopData.shop_owner,
    contactEmail: shopData.email,
    contactPhone: shopData.phone,
    registrationNumber: null,
    platform: "shopify",
    extID: shopData.id,
    active: false,
    domain: shopData.domain,
    address1: shopData.address1,
    address2: shopData.address2,
    country: shopData.country,
    postcode: shopData.zip,
    stripeID: null,
  })
  .catch((error) => {
    console.log(error);
  });
  return result.data.data.supplier.id;
};

const getSupplierInfo = async (shop) => {
  const res = await axios.get(`${ApiUrl}/supplier/domain/${shop}`)
  .catch(error => { console.log(error); });
  
  return res.data.data.supplier;
};

exports.checkIfSupplierInDB = checkIfSupplierInDB;
exports.addSupplierToDB = addSupplierToDB;
exports.getSupplierInfo = getSupplierInfo;