const Spinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center z-50 bg-[rgba(0,0,0,0.834)] fixed">
      <div className="w-10 h-10 border-4 border-t-indigo-400 border-r-transparent border-b-indigo-400 border-l-transparent rounded-3xl animate-spin"></div>
    </div>
  );
};

export default Spinner;
