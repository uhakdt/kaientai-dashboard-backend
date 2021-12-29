import Shopify from "@shopify/shopify-api";
import { sendOrderToDB } from '../requests/kaientaiAPI/klfRequests.js';

const orderPaidWebhook = async (shop, accessToken, supplierInfo, ctx) => {
  const orderPaid = await Shopify.Webhooks.Registry.register({
    shop,
    accessToken,
    path: "/webhooks",
    topic: "ORDERS_PAID",
    webhookHandler: (_topic, shop, body) => {
      console.log("Received order paid webhook: ");
      const obj = JSON.parse(body);
      sendOrderToDB(obj, shop, accessToken, supplierInfo);
      ctx.res.statusCode = 200;
    },
  });

  if (orderPaid.success) {
    console.log("Successfully registered Order Paid webhook!");
  } else {
    console.log("Failed to register Order Paid webhook", orderPaid.result);
  }
};

exports.orderPaidWebhook = orderPaidWebhook;