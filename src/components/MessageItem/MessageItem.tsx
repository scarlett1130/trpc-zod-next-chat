import { NextPage } from "next";
import { getTimeAgo } from "./../../utils/timeago";

type Props = {
  text: string;
  date: string;
  creator: string;
};

const MessageItem: NextPage<Props> = ({ date, text, creator }) => {
  const userID = localStorage.getItem("user-id");

  const timeAgo = getTimeAgo();

  return (
    <div
      className={`flex flex-col ${userID === creator && "items-end text-end"}`}
    >
      <h1 className="w-45 break-words mb-3 p-2 bg-gradient-to-r from-primary to-secondary text-white rounded">
        {text}
      </h1>
      <p className="text-xs text-[#777] w-45 break-words">
        {timeAgo.format(new Date(date))}
      </p>
    </div>
  );
};

export default MessageItem;
