import React from "react";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";

const NoteForm = () => {
  return (
    <form className="mt-4">
      <fieldset className="grid grid-cols-2 gap-2 mb-4">
        <label className="flex flex-col ">
          Title
          <input
            type="text"
            className="border border-[#d1cfcf] rounded-[4px] min-h-[38px]"
          />
        </label>
        <label>
          Tags
          <CreatableReactSelect isMulti />
        </label>
      </fieldset>
      <fieldset className="flex flex-col mb-4">
        <label>Body</label>
        <textarea rows={15} className="border border-[#d1cfcf] rounded-[4px]" />
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
