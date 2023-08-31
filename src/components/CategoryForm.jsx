import TextField from "@/common/textField";
import Select from "react-select";
import { HashLoader } from "react-spinners";
import { TagsInput } from "react-tag-input-component";

const CategoryFormData = [
  {
    id: 1,
    label: "title",
    name: "title",
  },
  {
    id: 2,
    label: "englishTitle",
    name: "englishTitle",
  },
  {
    id: 3,
    label: "type",
    name: "type",
  },
  {
    id: 4,
    label: "description",
    name: "description",
  },
];

function CategoryForm({ onSubmit, onChange, formValue, isLoading }) {
  return (
    <div className="max-w-5xl">
      <form className="md:w-1/2 w-full " onSubmit={onSubmit}>
        <div className="border border-gray-500 rounded-xl mb-5 bg-slate-50">
          {CategoryFormData.map((item) => {
            return (
              <TextField
                key={item.id}
                label={item.label}
                value={formValue[item.name] || ""}
                onChange={onChange}
                id={item.name}
                name={item.name}
                type="text"
              />
            );
          })}
        </div>
        {isLoading ? (
          <HashLoader className="text-sky-500" />
        ) : (
          <button className="bg-blue-400 text-white  hover:text-blue-600 hover:bg-blue-200 rounded-lg outline-none px-4 w-full py-2">
            Done
          </button>
        )}
      </form>
    </div>
  );
}

export default CategoryForm;
