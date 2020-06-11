import * as CacheUtils from "~utils/cache";

describe("cache", () => {
  it("Should write and read application version", () => {
    CacheUtils.setAppVersion("version");
    expect(CacheUtils.getAppVersion()).toEqual("version");
  });

  it("Should write and read item", () => {
    CacheUtils.setItem("key", "value");
    expect(CacheUtils.getItem("key")).toEqual("value");
  });

  it("Should update item value", () => {
    CacheUtils.setItem("key", "fee");
    CacheUtils.setItem("key", "foo");
    expect(CacheUtils.getItem("key")).toEqual("foo");
  });

  it("Should remove item", () => {
    CacheUtils.setItem("key", "value");
    CacheUtils.removeItem("key");
    expect(CacheUtils.getItem("key")).toBeNull();
  });
});
