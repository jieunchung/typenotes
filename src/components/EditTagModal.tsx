import React from "react";
import { Tag } from "../App";

type EditTagModalProps = {
  availableTags: Tag[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
  isDarkMode: boolean;
};

const EditTagModal = ({
  availableTags,
  showModal,
  setShowModal,
  onUpdateTag,
  onDeleteTag,
  isDarkMode,
}: EditTagModalProps) => {
  return (
    <section>
      {showModal ? (
        <>
          <article className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            {/* content */}
            <div
              className={`border-0 rounded-lg shadow-lg flex flex-col w-full outline-none focus:outline-none max-w-xs ${
                isDarkMode ? "bg-[#181818]" : "bg-white"
              }`}
            >
              {/* header & close button */}
              <div className="flex items-center justify-between p-5 border-b border-solid border-[#CCCCCC]">
                <h3 className="text-3xl font-semibold">Edit Tags</h3>
                <button
                  className="text-3xl background-transparent font-bold outline-none focus:outline-none "
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              {/* tags */}
              <form className="flex flex-col my-10">
                {availableTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex w-[100%] justify-between m-1"
                  >
                    <div
                      className={`border rounded-[4px] mx-auto px-2 outline-0 shadow hover:shadow-lg transition duration-300 ${
                        isDarkMode
                          ? "bg-[#262626] border-[#1e1e1e] shadow-[0_1px_3px_0_rgb(10,10,10)] hover:shadow-[0_10px_15px_-3px_rgb(10,10,10)]"
                          : "border-[#FDFDFE] shadow hover:shadow-lg"
                      }`}
                    >
                      <input
                        onChange={(event) =>
                          onUpdateTag(tag.id, event.target.value)
                        }
                        type="text"
                        value={tag.label}
                        className={`min-h-[38px] px-2 outline-0 ${
                          isDarkMode && "bg-[#262626]"
                        }`}
                      />
                      <input
                        onClick={() => onDeleteTag(tag.id)}
                        type="button"
                        value="&times;"
                        className={`min-h-[38px] px-2 outline-0 hover:cursor-pointer ${
                          isDarkMode && "bg-[#262626]"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </article>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </section>
  );
};

export default EditTagModal;
