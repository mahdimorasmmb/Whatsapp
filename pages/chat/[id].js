import Head from "next/head";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState("");
  const [chat, setChats] = useState("");
  const [loding, setLoding] = useState(true);
  const router = useRouter();

  async function getData() {
    setLoding(true);
    const ref = db.collection("chats").doc(router.query.id);

    const messagesRef = await ref
      .collection("messages")
      .orderBy("timestamp", "asc")
      .get();

    const messages = await messagesRef.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .map((message) => ({
        ...message,
        timestamp: message.timestamp.toDate().getTime(),
      }));
    const chatRef = await ref.get();
    const chat = await {
      id: chatRef.id,
      ...chatRef.data(),
    };
    setChats(chat);
    setMessages(messages);
    setLoding(false);
  }

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <ContainerSide>
        <Sidebar />
      </ContainerSide>
      <ChatContainer>
        {!loding ? (
          <ChatScreen chat={chat} messages={messages} />
        ) : (
          <p>Loddin</p>
        )}
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const messagesRef = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = await messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));
  const chatRef = await ref.get();
  const chat = await {
    id: chatRef.id,
    ...chatRef.data(),
  };
  console.log(messages, "-----------------------------------");
  console.log(chat, "************************************");

  return {
    props: {
      messages: await JSON.stringify(messages),
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ContainerSide = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
