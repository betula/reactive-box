const { box, sel, expr } = require("..");
const { mut, runer } = require("./lib");

describe("Expr", () => {
  test("(sync on each box change with one box) and (expr return value)", () => {
    const spy = jest.fn();
    const a = mut(1);
    const e = runer(() => a.val, spy);

    expect(e()).toBe(1);
    expect(spy).toBeCalledTimes(0);

    a.val = 2;
    expect(spy).toBeCalledTimes(1);
    expect(e()).toBe(2);
  });

  test("(rerun on each box change with two boxes) and (non reaction before first run)", () => {
    const spy = jest.fn();
    const a = mut(1);
    const b = mut(2);
    const e = runer(() => {
      spy(a.val, b.val);
    });
    a.val = 10;
    b.val = 20;
    expect(spy).toBeCalledTimes(0);
    e();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenNthCalledWith(1, 10, 20);
    a.val = 11;
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(2, 11, 20);
    b.val = 21;
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(3, 11, 21);
  });
});