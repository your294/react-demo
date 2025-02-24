import { Input, message } from "antd";
import { useState, useEffect, useRef, useReducer, useCallback } from "react";

function createConnection(options: any, countRef: any) {
  console.log("创建连接, options: ", options);
  return {
    roomId: options.roomId,
    connect: () => {
      console.log("连接聊天室: ", countRef.current);
    },
    disconnect: () => {
      console.log("离开聊天室: ", countRef.current++);
    },
  };
}

function msgListReducer(
  state: Array<string>,
  action: { type: "add" | "reset"; payload: any }
) {
  switch (action.type) {
    case "add": {
      return state.concat([action.payload]);
    }
    case "reset": {
      return [];
    }
  }
}

const Index = () => {
  const [roomId, setRoomId] = useState("chat room");
  const [inputRoomId, setInputRoomId] = useState("");
  const [inputInfo, setInputInfo] = useState("");
  const [msgList, dispatchMsgList] = useReducer(msgListReducer, []);
  const countRef = useRef(1);
  const createOptions = useCallback(() => {
    return {
      serverUrl: "https://localhost:1234",
      roomId: roomId,
    };
  }, [roomId]); // 只有当roomId变化时，createOptions才会重新生成

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options, countRef);
    connection.connect();
    return () => connection.disconnect(); // 清理旧连接
  }, [createOptions]); // 现在createOptions只有在roomId变化时才会改变

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>{roomId}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Input
          placeholder="change chat room"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputRoomId(e.target.value)
          }
          onPressEnter={() => {
            if (inputRoomId !== "") {
              setRoomId(inputRoomId);
            } else {
              message.error("roomId输入不能为空");
            }
          }}
        />
        <Input
          placeholder="input info"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputInfo(e.target.value)
          }
          onPressEnter={() => {
            dispatchMsgList({ type: "add", payload: inputInfo });
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {msgList.length === 0 ? (
          <div>空聊天记录</div>
        ) : (
          msgList.map((msg: string, i: number) => {
            return <p key={i}>{msg}</p>;
          })
        )}
      </div>
    </div>
  );
};

export default Index;
