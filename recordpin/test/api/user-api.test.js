import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { recordpinService } from "./recordpin-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    recordpinService.clearAuth();
    await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
    await recordpinService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await recordpinService.createUser(testUsers[i]);
    }
    await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await recordpinService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await recordpinService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await recordpinService.deleteAllUsers();
    await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
    returnedUsers = await recordpinService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await recordpinService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await recordpinService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await recordpinService.deleteAllUsers();
    await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
    try {
      const returnedUser = await recordpinService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
  

});



