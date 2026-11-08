import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testShop, testInfo, goldenDiscs, goldenDiscsInfo } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Info Model tests", () => {

  let infoList = null;

  setup(async () => {
    db.init("mongo");
    await db.shopStore.deleteAllShops();
    await db.infoStore.deleteAllInfo();
    infoList = await db.shopStore.addshop(info);
    for (let i = 0; i < testInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testInfo[i] = await db.infoStore.addInfo(infoList._id, testInfo[i]);
    }
  });

  test("add single info", async () => {
    const goldenDiscList = await db.shopStore.addshop(goldenDiscs);
    const info = await db.infoStore.addInfo(goldenDiscList._id, goldenDiscsInfo)
    assert.isNotNull(info._id);
    assertSubset (goldenDiscsInfo, info);
  });

  test("get multiple lines of info", async () => {
    const info = await db.infoStore.getInfoByShopId(shopList._id);
    assert.equal(info.length, testInfo.length)
  });

  test("delete all info", async () => {
    const info = await db.infoStore.getAllInfo();
    assert.equal(testInfo.length, info.length);
    await db.infoStore.deleteAllInfo();
    const newInfo = await db.infoStore.getAllInfo();
    assert.equal(0, newInfo.length);
  });

  test("get a info - success", async () => {
    const goldenDiscsList = await db.shopStore.addshop(goldenDisc);
    const info = await db.infoStore.addInfo(goldenDiscsList._id, goldenDiscsInfo)
    const newinfo = await db.infoStore.getinfoById(info._id);
    assertSubset (info, newinfo);
  });

  test("delete One info - success", async () => {
    await db.infoStore.deleteinfo(testinfos[0]._id);
    const infos = await db.infoStore.getAllinfos();
    assert.equal(infos.length, testShop.length - 1);
    const deletedInfo = await db.infoStore.getinfoById(testinfos[0]._id);
    assert.isNull(deletedInfo);
  });

  test("get a info - bad params", async () => {
    assert.isNull(await db.infoStore.getinfoById(""));
    assert.isNull(await db.infoStore.getinfoById());
  });

  test("delete one info - fail", async () => {
    await db.infoStore.deleteinfo("bad-id");
    const infos = await db.infoStore.getAllinfos();
    assert.equal(infos.length, testShop.length);
  });
});
