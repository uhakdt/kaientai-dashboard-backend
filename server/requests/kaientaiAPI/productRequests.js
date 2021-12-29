import axios from "axios";
import { ApiUrl } from "../../../auxiliary/globalVariables.js";

const addProductsToDB = async (listOfProducts, supplierID) => {
  const result = await axios.post(`${ApiUrl}/products/${supplierID}/shopify`, { listOfProducts })
  .catch((error) => {
    console.log(error);
  });
  return result;
};

exports.addProductsToDB = addProductsToDB;