import Shopify from "@shopify/shopify-api";

const checkIfUninstalledWebhook = async (shop, accessToken, ACTIVE_SHOPIFY_SHOPS, ctx) => {
  // Check if app is uninstalled
  const checkIfUninstalled = await Shopify.Webhooks.Registry.register({
    shop,
    accessToken,
    path: "/webhooks",
    topic: "APP_UNINSTALLED",
    webhookHandler: async (topic, shop, body) => {
      console.log("Received App Uninstalled webhook: ");
      delete ACTIVE_SHOPIFY_SHOPS[shop];
      ctx.res.statusCode = 200;
    },
  });

  if (checkIfUninstalled.success) {
    console.log("Successfully registered App Uninstalled webhook!");
  } else {
    console.log(
      "Failed to register App Uninstalled webhook",
      checkIfUninstalled.result
    );
  }
};

exports.checkIfUninstalledWebhook = checkIfUninstalledWebhook;