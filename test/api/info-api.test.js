import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { shopService } from "./shop-service.js";
import { maggie, maggieCredentials, goldenDiscs, testShop, testInfo, goldenDiscsInfo } from "../fixtures.js";

suite("info API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    recordpinService.clearAuth();
    user = await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
    await recordpinService.deleteAllShops();
    await recordpinService.deleteAllUsers();
    user = await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
    goldenDiscs.userid = user._id;
    beethovenSonatas = await shopService.createShop(goldenDiscs);
  });

  teardown(async () => {});

  test("create info", async () => {
    const returnedinfo = await shopService.createinfo(beethovenSonatas._id, goldenDiscsInfo);
    assertSubset(goldenDiscsInfo, returnedinfo);
  });

  test("create Multiple infos", async () => {
    for (let i = 0; i < testInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await shopService.createinfo(beethovenSonatas._id, testInfo[i]);
    }
    const returnedinfos = await shopService.getAllinfos();
    assert.equal(returnedinfos.length, testInfo.length);
    for (let i = 0; i < returnedinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const info = await shopService.getinfo(returnedinfos[i]._id);
      assertSubset(info, returnedinfos[i]);
    }
  });

  test("Delete infoApi", async () => {
    for (let i = 0; i < testInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await shopService.createinfo(beethovenSonatas._id, testInfo[i]);
    }
    let returnedinfos = await shopService.getAllinfos();
    assert.equal(returnedinfos.length, testInfo.length);
    for (let i = 0; i < returnedinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const info = await shopService.deleteinfo(returnedinfos[i]._id);
    }
    returnedinfos = await shopService.getAllinfos();
    assert.equal(returnedinfos.length, 0);
  });

  test("denormalised shop", async () => {
    for (let i = 0; i < testInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await shopService.createinfo(beethovenSonatas._id, testInfo[i]);
    }
    const returnedShop = await shopService.getShop(beethovenSonatas._id);
    assert.equal(returnedShop.infos.length, testInfo.length);
    for (let i = 0; i < testInfo.length; i += 1) {
      assertSubset(testInfo[i], returnedShop.infos[i]);
    }
  });
});
