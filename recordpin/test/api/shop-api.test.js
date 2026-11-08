import { EventEmitter } from "events";
import { assert } from "chai";
import { shopService } from "./shop-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, goldenDiscs, testShop } from "../fixtures.js"

EventEmitter.setMaxViewers(25);

suite("Shop API tests", () => {

  setup(async () => {
    recordpinService.clearAuth();
    user = await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
    await recordpinService.deleteAllShops();
    await recordpinService.deleteAllUsers();
    user = await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
    goldenDiscs.userid = user._id;
  });

  teardown(async () => {});

    test("create shop", async () => {
    const returnedShop = await shopService.createShop(goldenDiscs);
    assert.isNotNull(returnedShop);
    assertSubset(goldenDiscs, returnedShop);
  });


  test("delete a shop", async () => {
    const shop = await shopService.createShop(goldenDiscs);
    const response = await shopService.deleteshop(shop._id);
    assert.equal(response.status, 204);
    try {
      const returnedShop = await shopService.getShop(shop.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Shop with this id", "Incorrect Response Message");
    }
  });

    test("create multiple shops", async () => {
    for (let i = 0; i < testShop.length; i += 1) {
      testShop[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await shopService.createShop(testShop[i]);
    }
    let returnedLists = await shopService.getAllShops();
    assert.equal(returnedLists.length, testShop.length);
    await shopService.deleteAllShops();
    returnedLists = await shopService.getAllShops();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existent shop", async () => {
    try {
      const response = await shopService.deleteshop("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Shop with this id", "Incorrect Response Message");
    }
  });

});
