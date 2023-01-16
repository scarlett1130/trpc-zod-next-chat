import { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import { trpc } from "../utils/trpc";
import Layout from "../components/Layout/Layout";
import Chatbox from "../components/Chatbox/Chatbox";
import InputBox from "../components/InputBox/InputBox";
import ChatContainer from "../components/ChatContainer/ChatContainer";
import Loading from "../components/Modal/Loading";
import Alert from "../components/Modal/Alert";
import { Message } from "../types/message";

const HomePage: NextPage = () => {
  const [userID, setUserID] = useState("");
  const [textMsg, setTextMsg] = useState("");
  const [alert, setAlert] = useState("");

  const allMessages = trpc.msg.list.useQuery();

  const utils = trpc.useContext();
  const addMsgMutation = trpc.msg.add.useMutation({
    onMutate: async () => {
      await utils.msg.list.cancel();
      const messages = allMessages.data ?? [];
      return { previousMessages: messages };
    },

    onError: (error, _, context) => {
      const previousMsgs = context?.previousMessages ?? [];
      utils.msg.list.setData([...previousMsgs]);
      setAlert(error.message);
    },

    onSettled: async () => {
      await utils.msg.list.invalidate();
      setTextMsg("");
    },
  });

  const onCreateChatHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textMsg.trim().length === 0) {
      setAlert("Empty messages cannot be send.");
      return;
    }
    addMsgMutation.mutate({
      text: textMsg,
      createdAt: new Date(),
      creator: userID,
    });
  };

  const onChangeInputMsgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMsg(e.target.value);
  };

  useEffect(() => {
    let uID: string = localStorage.getItem("user-id") ?? "";
    if (!uID) {
      uID = uuidv4();
      localStorage.setItem("user-id", uID);
    }
    setUserID(uID);
  }, []);

  return (
    <div className="overflow-hidden">
      {allMessages.isLoading && <Loading />}
      {alert && <Alert message={alert} closeAlert={() => setAlert("")} />}
      <Head>
        <title>Chat | Homepage</title>
      </Head>
      <div className="w-full h-screen relative overflow-hidden flex items-center z-10 justify-center">
        <Layout />
        <Chatbox>
          <ChatContainer
            msgs={
              allMessages.data ? (allMessages.data as any as Message[]) : []
            }
          />
          <InputBox
            value={textMsg}
            onChange={onChangeInputMsgHandler}
            onSendMsg={onCreateChatHandler}
            isSending={addMsgMutation.isLoading}
          />
        </Chatbox>
      </div>
    </div>
  );
};

export default HomePage;
