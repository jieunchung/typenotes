export const customStyles = {
  control: (provided: {}) => ({
    ...provided,
    background: "#fff",
    border: "1px solid #FDFDFE !important",
    minHeight: "30px",
    height: "30px",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "&:focus": {
      border: "0 !important",
      outline: "none",
    },
  }),
  option: (provided: {}) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  valueContainer: (provided: {}) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),
  multiValue: (provided: {}) => ({
    ...provided,
    backgroundColor: "#f2f2f2",
    margin: "0px",
    svg: {
      backgroundColor: "#f2f2f2",
    },
  }),
  multiValueRemove: (provided: {}) => ({
    ...provided,
    backgroundColor: "#f2f2f2",
    "&:hover": { backgroundColor: "#f2f2f2", color: "#272a2b" },
  }),

  input: (provided: {}) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (provided: {}) => ({
    ...provided,
    height: "20px",
    margin: "5px 0",
  }),
  indicatorsContainer: (provided: {}) => ({
    ...provided,
    height: "30px",
  }),
};

export const customStylesDark = {
  control: (provided: {}) => ({
    ...provided,
    background: "#222021",
    border: "1px solid black !important",
    minHeight: "30px",
    height: "30px",
    boxShadow: "none",
    "&:focus": {
      border: "0 !important",
      outline: "none",
    },
  }),
  option: (provided: {}) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
    backgroundColor: "#222021",
    "&:hover": {
      backgroundColor: "#1c1b1b",
      cursor: "pointer",
    },
  }),
  menuList: (provided: {}) => ({
    ...provided,
    backgroundColor: "#181818",
  }),
  valueContainer: (provided: {}) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),
  multiValueLabel: (provided: {}) => ({
    ...provided,
    backgroundColor: "none",
    color: "white",
  }),
  multiValue: (provided: {}) => ({
    ...provided,
    backgroundColor: "none",
    border: "1px solid black",
    svg: {
      fill: "white",
      backgroundColor: "none",
    },
  }),
  multiValueRemove: (provided: {}) => ({
    ...provided,
    backgroundColor: "none",
    "&:hover": { backgroundColor: "transparent" },
  }),
  input: (provided: {}) => ({
    ...provided,
    margin: "0px",
    color: "white",
  }),
  indicatorSeparator: (provided: {}) => ({
    display: "none",
  }),
  indicatorsContainer: (provided: {}) => ({
    ...provided,
    height: "30px",
  }),
};
