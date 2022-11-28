import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";

type Props = {
  onSubmit: (data: NoteData) => void;
};

const NoteForm = ({ onSubmit }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value, //cannot be the value of null since they're required
      markdown: markdownRef.current!.value, //cannot be the value of null since they're required
      tags: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <fieldset className="grid grid-cols-2 gap-2 mb-4">
        <label className="flex flex-col ">
          Title
          <input
            required
            ref={titleRef}
            type="text"
            className="border border-[#d1cfcf] rounded-[4px] min-h-[38px]"
          />
        </label>
        <label>
          Tags
          <CreatableReactSelect
            isMulti
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(newTags) =>
              setSelectedTags(
                newTags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              )
            }
          />
        </label>
      </fieldset>
      <fieldset className="flex flex-col mb-4">
        <label>Body</label>
        <textarea
          required
          ref={markdownRef}
          rows={15}
          className="border border-[#d1cfcf] rounded-[4px]"
        />
      </fieldset>
      <fieldset className="flex justify-end gap-2">
        <input
          type="submit"
          value="Save"
          className="border border-[#d1cfcf] py-2 px-4 rounded-[4px]"
        />

        <Link to="..">
          <input
            type="button"
            value="Cancel"
            className="border border-[#d1cfcf] py-2 px-4 rounded-[4px]"
          />
        </Link>
      </fieldset>
    </form>
  );
};

export default NoteForm;
