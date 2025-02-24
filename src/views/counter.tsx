import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { Button } from "antd";
import {
  add,
  reduce,
  addNumber,
  addByAsync,
} from "../features/counter/counterSlice";
import { memo, useCallback, useState } from "react";

const OperationBar = memo(({ num }: { num: number }) => {
  const status = useSelector((state: RootState) => state.myCount.status);
  const dispatch: AppDispatch = useDispatch();
  const dispatchAdd = useCallback(() => dispatch(add()), [dispatch]);
  const dispatchReduce = useCallback(() => dispatch(reduce()), [dispatch]);
  const dispatchAddNumber = useCallback(
    (n: number) => dispatch(addNumber(n)),
    [dispatch]
  );
  const dispatchAsyncAddNumber = useCallback(
    (n: number) => dispatch(addByAsync(n)),
    [dispatch]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Button type="primary" onClick={dispatchAdd}>
        +
      </Button>
      <Button type="primary" onClick={dispatchReduce}>
        -
      </Button>
      <Button type="primary" onClick={() => dispatchAddNumber(num)}>
        add Number
      </Button>
      <Button
        type="primary"
        onClick={() => dispatchAsyncAddNumber(num)}
        loading={status === "loading"}
      >
        add Number Async
      </Button>
    </div>
  );
});

export default function Counter() {
  const count = useSelector((state: RootState) => state.myCount.value);
  const [num, setNum] = useState(0);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Count: {count}</h1>
      <div>
        <label>input the number you want to add</label>
        <input
          type="number"
          placeholder={"" + num}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNum(+e.target.value)
          }
        ></input>
      </div>

      <OperationBar num={num} />
    </div>
  );
}
