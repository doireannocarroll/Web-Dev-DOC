import { assert } from "chai";
import { recordpinService } from "./recordpin-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    recordpinService.clearAuth();
    await recordpinService.createUser(maggie);
    await recordpinService.authenticate(maggieCredentials);
    await recordpinService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await recordpinService.createUser(maggie);
    const response = await recordpinService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await recordpinService.createUser(maggie);
    const response = await recordpinService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
