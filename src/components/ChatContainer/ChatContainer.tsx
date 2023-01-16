import { NextPage } from "next";
import MessageItem from "../MessageItem/MessageItem";
import { Message } from "../../types/message";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  msgs: Message[];
};

const ChatContainer: NextPage<Props> = ({ msgs }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const scroll = ref.current.scrollHeight - ref.current.clientHeight;
      ref.current.scrollTo(0, scroll);
    }
  }, [msgs]);

  return (
    <div
      className="overflow-y-auto overflow-x-hidden p-4 h-[63vh] chatbox-container flex flex-col"
      ref={ref}
    >
      <div className="ghost-element"></div>
      <AnimatePresence initial={false}>
        {msgs.map((msg) => (
          <motion.div
            key={msg._id}
            className="mb-5 last:mb-0"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <MessageItem
              key={msg._id}
              text={msg.text}
              date={msg.createdAt.toString()}
              creator={msg.creator}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatContainer;
