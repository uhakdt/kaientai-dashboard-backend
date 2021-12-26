import Shopify from "@shopify/shopify-api";

const getExistingProducts = async (req, res)  => {
  // Load the current session to get the `accessToken`.
  const session = await Shopify.Utils.loadCurrentSession(req, res);
  // Create a new client for the specified shop.
  const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
  // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
  const products = await client.get({
    path: 'products',
  });
  return products.body.products;
}

exports.getExistingProducts = getExistingProducts;