import { requestMyProfile } from "./requestMyProfile";
import fetchMock from "fetch-mock-jest";
import { myProfileAPIUrl } from "@/modules/profile/types";

describe("requestMyProfile", () => {
  const testProfile = { profile: "My Profile" };

  afterEach(() => {
    fetchMock.mockReset();
  });

  it("uses lang param in fetch body", async () => {
    fetchMock.post(myProfileAPIUrl, { success: true, data: testProfile });
    await requestMyProfile("fa");

    expect(fetchMock).toHaveLastFetched(myProfileAPIUrl, "post");
    expect(fetchMock).toHaveBeenCalledWith(myProfileAPIUrl, {
      body: JSON.stringify({ lang: "fa" }),
      method: "POST",
    });
  });

  it("returns profile data, if fetch is successful", async () => {
    fetchMock.post(myProfileAPIUrl, { success: true, data: testProfile });
    const result = await requestMyProfile("de");

    expect(fetchMock).toHaveLastFetched(myProfileAPIUrl, "post");
    expect(result).toStrictEqual(testProfile);
  });

  it("returns null, if fetch received unsuccessful response, e.g. server error", async () => {
    fetchMock.post(myProfileAPIUrl, {
      success: false,
      errors: { serverError: "bad request" },
    });
    const result = await requestMyProfile("de");

    expect(fetchMock).toHaveLastFetched(myProfileAPIUrl, "post");
    expect(result).toBe(null);
  });

  it("returns null, if fetch response is malformed", async () => {
    fetchMock.post(myProfileAPIUrl, { foo: "bar", thisIs: "notexpected" });
    const result = await requestMyProfile("de");

    expect(fetchMock).toHaveLastFetched(myProfileAPIUrl, "post");
    expect(result).toBe(null);
  });
});
