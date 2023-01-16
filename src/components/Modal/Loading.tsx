import { NextPage } from "next";

const Loading: NextPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-[2000]">
      <div className="fixed top-0 left-0 w-full h-screen bg-backdrop" />
      <div className="loading-modal-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
