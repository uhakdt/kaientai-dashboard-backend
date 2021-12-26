import Shopify from "@shopify/shopify-api";

const getShopData = async (shop, accessToken)  => {
  const client = new Shopify.Clients.Rest(shop, accessToken);
  const data = await client.get({
    path: 'shop',
  });
  return data.body.shop
}

exports.getShopData = getShopData;