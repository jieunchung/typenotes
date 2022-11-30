import React from "react";
import { Tag } from "../App";

type EditTagModalProps = {
  availableTags: Tag[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

const EditTagModal = ({
  availableTags,
  showModal,
  setShowModal,
  onUpdateTag,
  onDeleteTag,
}: EditTagModalProps) => {
  return (
    <section>
      {showModal ? (
        <>
          <article className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            {/* content */}
            <div className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none max-w-xs">
              {/* header & close button */}
              <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200">
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
              <form className="flex flex-col my-2">
                {availableTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex w-[100%] justify-between px-4"
                  >
                    <input
                      onChange={(event) =>
                        onUpdateTag(tag.id, event.target.value)
                      }
                      type="text"
                      value={tag.label}
                      className="my-2 p-1 text-slate-500"
                    />
                    <input
                      onClick={() => onDeleteTag(tag.id)}
                      type="button"
                      value="&times;"
                      className="my-2 text-slate-500 border rounded-md px-3 py-1"
                    />
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
