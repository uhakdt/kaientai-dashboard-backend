import axios from "axios";
import { orderEditTags } from "../shopifyAPI/orderRequests.js";
import { ApiUrl } from "../../../auxiliary/globalVariables.js"

const sendOrderToDB = async (obj, shop, accessToken, supplierInfo) => {
  obj.supplierContactEmail = supplierInfo.contactEmail;
  obj.supplierContactName = supplierInfo.contactName;

  const result = await axios.post(`${ApiUrl}/klf/shopify/${supplierInfo.id}`, { data: obj })
  .then((response) => {
    if (response.status === 200) {
      console.log("Add order to DB: Success");
      orderEditTags(
        shop,
        accessToken,
        obj.id,
        "Kaientai Local Fulfilment in progress"
      );
    }
  })
  .catch((error) => {
    console.log("Add order to DB: Failed");
    console.log(error);
  });
  return result;
};

exports.sendOrderToDB = sendOrderToDB;