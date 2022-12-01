import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidv4 } from "uuid";
import { customStyles, customStylesDark } from "./Select";
import { RiArrowGoBackFill, RiSaveFill } from "react-icons/ri";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  isDarkMode: boolean;
} & Partial<NoteData>; //make it optional since data doesn't exist on create

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
  isDarkMode,
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value, //cannot be the value of null since they're required
      markdown: markdownRef.current!.value, //cannot be the value of null since they're required
      tags: selectedTags,
    });
    //redirect to home on submit
    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <fieldset className="grid grid-cols-2 gap-2 mb-4">
        <label className="flex flex-col ">
          Title
          <input
            required
            defaultValue={title}
            ref={titleRef}
            type="text"
            className={`border shadow rounded-[4px] min-h-[30px] px-2 outline-0 ${
              isDarkMode ? "bg-[#222021] border-black" : "border-[#FDFDFE]"
            }`}
          />
        </label>
        <label>
          Tags
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
            styles={isDarkMode ? customStylesDark : customStyles}
            placeholder=""
          />
        </label>
      </fieldset>
      <fieldset className="flex flex-col mb-4">
        <label>Body</label>
        <textarea
          required
          defaultValue={markdown}
          ref={markdownRef}
          rows={15}
          className={`border shadow rounded-[4px] min-h-[38px] px-2 outline-0 scrollbar-hide ${
            isDarkMode ? "bg-[#222021] border-black" : "border-[#FDFDFE]"
          }`}
        />
      </fieldset>
      <fieldset className="flex justify-end items-baseline">
        <div
          className={`flex items-center text-xl leading-3 border rounded-lg px-1 shadow ${
            isDarkMode ? "bg-[#181818] border-black" : "border-[#FDFDFE]"
          }`}
        >
          <button
            type="submit"
            className="px-3 py-1 
                "
          >
            <RiSaveFill />
          </button>
          <Link to="..">
            <button
              type="button"
              className={`border-l px-3 py-1 ${
                isDarkMode ? "bg-[#181818] border-black" : "border-[#efeded]"
              }`}
            >
              <RiArrowGoBackFill />
            </button>
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export default NoteForm;
