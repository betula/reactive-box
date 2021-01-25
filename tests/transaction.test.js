const { mut, run, comp, transaction } = require("./lib");

describe("Transaction", () => {
  test("should work transaction", () => {
    const spy = jest.fn();
    const a = mut(0);
    const b = mut(0);
    const c = comp(() => a.val * 10 + b.val);
    run(() => spy(c.val));

    expect(spy).toHaveBeenNthCalledWith(1, 0);
    expect(spy).toHaveBeenCalledTimes(1);

    a.val = 1;
    expect(spy).toHaveBeenNthCalledWith(2, 10);
    expect(spy).toHaveBeenCalledTimes(2);

    b.val = 1;
    expect(spy).toHaveBeenNthCalledWith(3, 11);
    expect(spy).toHaveBeenCalledTimes(3);

    const commit = transaction();
    a.val = 2;
    b.val = 2;
    expect(spy).toHaveBeenCalledTimes(3);
    commit();
    expect(spy).toHaveBeenCalledTimes(4);
    expect(spy).toHaveBeenNthCalledWith(4, 22);
  });
});
