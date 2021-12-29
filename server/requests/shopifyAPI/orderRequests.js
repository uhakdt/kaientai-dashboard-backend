import Shopify, { DataType } from "@shopify/shopify-api";

const orderEditTags = async (shop, accessToken, orderID, TagText) => {
  const client = new Shopify.Clients.Rest(shop, accessToken);
  await client.put({
    path: `orders/${orderID}`,
    data: {
      "order": {
        "id": orderID, 
        "tags": TagText
      }
    },
    type: DataType.JSON,
  });
  console.log("Edit Order Tag: Success")
}

exports.orderEditTags = orderEditTags;