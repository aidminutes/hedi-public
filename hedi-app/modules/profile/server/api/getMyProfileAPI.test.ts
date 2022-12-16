import { getMyProfileAPI } from "@/modules/profile/server";
import {
  createNextRequestMock,
  createNextResponseMock,
} from "../../../../testing/mockFactories";
import * as authFunctions from "@/modules/auth/server/functions";
import * as gQuery from "@/modules/graphql/server/gQuery";

describe("getMyProfileAPI", () => {
  let gqlMock: jest.SpyInstance;
  const testProfile = { route: "profileRoute", label: "testLabel" };

  beforeAll(() => {
    gqlMock = jest.spyOn(gQuery, "userGQuery");
    gqlMock.mockResolvedValue({ success: true, profile: testProfile });
  });

  describe("with authorized user", () => {
    beforeAll(() => {
      const getAuthHeaderMock = jest.spyOn(authFunctions, "getUserAuthHeader");
      getAuthHeaderMock.mockResolvedValue({
        Authorization: "auth-string",
        "X-CSRF-Token": "x-csrf-token",
      });
    });
    it("will send exactly 1 JSON-response containing the user profile", async () => {
      const req = createNextRequestMock();
      const res = createNextResponseMock();
      await getMyProfileAPI(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: testProfile,
      });
    });
    it("will fail gracefully if GQL has an error", async () => {
      gqlMock.mockResolvedValueOnce({ status: 500, message: "Server Error" });
      const req = createNextRequestMock();
      const res = createNextResponseMock();
      await getMyProfileAPI(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true, // TODO: should "success" really be true in this case?
        data: null,
      });
    });
  });

  describe("with unauthorized user", () => {
    beforeAll(() => {
      const getAuthHeaderMock = jest.spyOn(authFunctions, "getUserAuthHeader");
      getAuthHeaderMock.mockResolvedValue(null);
    });
    it("will only send 1 JSON response containing the unauthorized error", async () => {
      const req = createNextRequestMock();
      const res = createNextResponseMock();
      await getMyProfileAPI(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        errors: { generic: "Unauthorized" },
        success: false,
      });
    });
  });
});
