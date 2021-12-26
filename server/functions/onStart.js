// Kaientai API
import { addProductsToDB } from '../requests/kaientaiAPI/productRequests.js';
import { checkIfSupplierInDB, addSupplierToDB } from '../requests/kaientaiAPI/supplierRequests.js';

// Shopify API
import { getExistingProducts } from '../requests/shopifyAPI/productRequests.js';
import { getShopData } from '../requests/shopifyAPI/shopRequests.js';

const uponInstallation = async (ctx, shop, accessToken) => {
  // Get Shop Data
  const shopData = await getShopData(shop, accessToken);

  // Check if supplier is already in DB
  const supplierCheckResults = await checkIfSupplierInDB(shopData.id);
  
  if(supplierCheckResults.status === 204){
    console.log("Adding New Supplier: ", shopData.name)
    shopData.platform = "shopify";
    
    // Add Supplier to DB
    const supplierID = await addSupplierToDB(shopData);

    // Add Products to DB
    const productsResults = await getExistingProducts(ctx.req, ctx.res);
    await addProductsToDB(productsResults, supplierID);
    
  } else if (supplierCheckResults.status === 200) {
    // Adding Existing Products to DB
    console.log("Successfully checked supplier information!")
  } else {
    console.log("Not sure what happened: ", supplierCheckResults)
  }
}

exports.uponInstallation = uponInstallation;