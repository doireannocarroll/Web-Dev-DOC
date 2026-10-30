import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testShops, goldenDiscs } from "./fixtures.js";

suite("Shop Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.shopStore.deleteAllShops();
    for (let i = 0; i < testShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testShops[i] = await db.shopStore.addShop(testShops[i]);
    }
  });

  test("create a shop", async () => {
    const shop = await db.shopStore.addShop(goldenDiscs);
    assert.equal(goldenDiscs, shop);
    assert.isDefined(shop._id);
  });

  test("delete all shops", async () => {
    let returnedShops = await db.shopStore.getAllShops();
    assert.equal(returnedShops.length, 3);
    await db.shopStore.deleteAllShops();
    returnedShops = await db.shopStore.getAllShops();
    assert.equal(returnedShops.length, 0);
  });

  test("get a shop - success", async () => {
    const shop = await db.shopStore.addShop(goldenDiscs);
    const returnedShop = await db.shopStore.getShopById(shop._id);
    assert.equal(goldenDiscs, returnedShop);
  });

  test("delete One Shop - success", async () => {
    const id = testShops[0]._id;
    await db.shopStore.deleteShopById(id);
    const returnedShops = await db.shopStore.getAllShops();
    assert.equal(returnedShops.length, testShops.length - 1);
    const deletedShop = await db.shopStore.getShopById(id);
    assert.isNull(deletedShop);
  });

  test("get a shop - bad params", async () => {
    assert.isNull(await db.shopStore.getShopById(""));
    assert.isNull(await db.shopStore.getShopById());
  });

  test("delete One Shop - fail", async () => {
    await db.shopStore.deleteShopById("bad-id");
    const allShops = await db.shopStore.getAllShops();
    assert.equal(testShops.length, allShops.length);
  });
});
