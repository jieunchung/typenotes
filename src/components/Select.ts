export const customStyles = {
  control: (provided: {}) => ({
    ...provided,
    border: "1px solid #272a2b !important",
    boxShadow: "none",
    "&:focus": {
      border: "0 !important",
    },
  }),
  clearIndicator: (provided: {}) => ({
    ...provided,
    svg: {
      fill: "#272a2b",
    },
  }),
  dropdownIndicator: (provided: {}) => ({
    ...provided,
    svg: {
      fill: "#272a2b",
    },
  }),
  indicatorSeparator: (provided: {}) => ({
    ...provided,
    backgroundColor: "#272a2b",
  }),
  option: (provided: {}) => ({
    ...provided,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
  }),
  multiValueLabel: (provided: {}) => ({
    ...provided,
    backgroundColor: "#7c72dc",
    color: "white",
  }),
  multiValue: (provided: {}) => ({
    ...provided,
    backgroundColor: "#7c72dc",
    svg: {
      fill: "white",
      backgroundColor: "#7c72dc",
    },
  }),
  multiValueRemove: (provided: {}) => ({
    ...provided,
    backgroundColor: "#7c72dc",
    "&:hover": { backgroundColor: "#7c72dc" },
  }),
};

export const customStylesDark = {
  control: (provided: {}) => ({
    ...provided,
    border: "1px solid white !important",
    backgroundColor: "#334155",
    boxShadow: "none",
    "&:focus": {
      border: "0 !important",
    },
  }),
  clearIndicator: (provided: {}) => ({
    ...provided,
    svg: {
      fill: "white",
    },
  }),
  dropdownIndicator: (provided: {}) => ({
    ...provided,
    svg: {
      fill: "white",
    },
  }),
  indicatorSeparator: (provided: {}) => ({
    ...provided,
    backgroundColor: "white",
  }),
  option: (provided: {}) => ({
    ...provided,
    backgroundColor: "#334155",
    "&:hover": {
      backgroundColor: "#334155",
    },
  }),
  menuList: (provided: {}) => ({
    ...provided,
    backgroundColor: "#334155",
  }),
  multiValueLabel: (provided: {}) => ({
    ...provided,
    backgroundColor: "#7c72dc",
    color: "white",
  }),
  multiValue: (provided: {}) => ({
    ...provided,
    backgroundColor: "#7c72dc",
    svg: {
      fill: "white",
      backgroundColor: "#7c72dc",
    },
  }),
  multiValueRemove: (provided: {}) => ({
    ...provided,
    backgroundColor: "#7c72dc",
    "&:hover": { backgroundColor: "#7c72dc" },
  }),
  placeholder: (provided: {}) => ({
    ...provided,
    color: "white",
  }),
};
