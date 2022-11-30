import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineSave, HiOutlineArrowLeft } from "react-icons/hi";
import { customStyles, customStylesDark } from "./Select";

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
            className={`border border-[#272a2b] rounded-[4px] min-h-[38px] px-2 outline-0 ${
              isDarkMode && "bg-[#334155] border-white"
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
          className={`border border-[#272a2b] rounded-[4px] min-h-[38px] px-2 outline-0 ${
            isDarkMode && "bg-[#334155] border-white"
          }`}
        />
      </fieldset>
      <fieldset className="flex justify-end items-baseline gap-2">
        <button type="submit" className="text-2xl">
          <HiOutlineSave />
        </button>
        <Link to="..">
          <button type="button" className="text-2xl">
            <HiOutlineArrowLeft />
          </button>
        </Link>
      </fieldset>
    </form>
  );
};

export default NoteForm;
