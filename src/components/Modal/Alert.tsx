import { NextPage } from "next";

type Props = {
  message: string;
  closeAlert: () => void;
};

const Alert: NextPage<Props> = ({ message, closeAlert }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-[3000]">
      <div className="fixed top-0 left-0 w-full h-screen bg-backdrop" />
      <div className="z-[4000] flex flex-col">
        <div
          className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mr-4"
          role="alert"
        >
          <strong className="font-bold">Alert!</strong>
          <span className="block sm:inline"> {message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>

        <button
          className="mt-6 self-center rounded bg-black px-4 p-2 bg-gradient-to-r from-primary to-secondary text-white"
          onClick={closeAlert}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;
