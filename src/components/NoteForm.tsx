import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidv4 } from "uuid";
import { customStyles, customStylesDark } from "./Select";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ThemeContext from "../context/ThemeContext";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>; //make it optional since data doesn't exist on create

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  const { currentTheme } = useContext(ThemeContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      /* current! = forcing it to be not be null */
      title: titleRef.current!.value, //cannot be the value of null since they're required
      markdown: markdownRef.current!.value, //cannot be the value of null since they're required
      tags: selectedTags,
    });
    //redirect to home on submit
    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col md:grid grid-cols-2 gap-2 mb-4 md:mb-6">
        <label className="flex flex-col">
          <span className="text-indigo-400 font-semibold main-text text-xs md:text-sm mb-1">
            Title
          </span>
          <input
            required
            defaultValue={title}
            ref={titleRef}
            type="text"
            className="border shadow rounded-[4px] min-h-[35px] px-2 outline-0 appearance-none focus:outline-none
              dark:bg-[#262626] dark:border-[#1e1e1e] border-[#FDFDFE]"
          />
        </label>
        <label>
          <span className="text-indigo-400 font-semibold main-text text-xs md:text-sm mb-1">
            Tags
          </span>
          <CreatableReactSelect
            onCreateOption={(label) => {
              const newTag = { id: uuidv4(), label };
              // to add on localStorage
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            isMulti
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(newTags) =>
              setSelectedTags(
                newTags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              )
            }
            styles={currentTheme === "dark" ? customStylesDark : customStyles}
            placeholder=""
          />
        </label>
      </fieldset>
      <fieldset className="flex flex-col mb-2 md:mb-4">
        <label className="text-indigo-400 font-semibold main-text text-xs md:text-sm mb-1">
          Body
        </label>
        <textarea
          required
          defaultValue={markdown}
          ref={markdownRef}
          rows={15}
          className="border shadow rounded-[4px] min-h-[38px] px-2 outline-0 scrollbar-hide appearance-none focus:outline-none
            dark:bg-[#262626] dark:border-[#1e1e1e] border-[#FDFDFE]"
        />
      </fieldset>
      <fieldset className="flex justify-between items-center main-text font-semibold">
        <Link to="..">
          <button
            type="button"
            className={`flex justify-center items-center px-2 py-2 text-sm text-gray-400 hover:text-inherit`}
          >
            <RiArrowLeftSLine /> Go back
          </button>
        </Link>
        <button
          type="submit"
          className={`flex justify-center items-center px-2 py-2 text-sm text-gray-400 hover:text-inherit`}
        >
          Save <RiArrowRightSLine />
        </button>
      </fieldset>
    </form>
  );
};

export default NoteForm;
