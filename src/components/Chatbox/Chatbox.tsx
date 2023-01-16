import { NextPage } from "next";

type Props = {
  children: React.ReactNode;
};

const Chatbox: NextPage<Props> = ({ children }) => {
  return (
    <div className="h-70 shadow-xl rounded-lg overflow-hidden bg-white w-10/12 sm:w-4/6 md:w-4/6 lg:w-1/2 xl:w-1/3 -z-50 border-2 flex flex-col">
      {children}
    </div>
  );
};

export default Chatbox;
