import TextField from "@/common/textField";
import Select from "react-select";
import { HashLoader } from "react-spinners";
import { TagsInput } from "react-tag-input-component";

const productsFormData = [
  {
    id: 1,
    label: "title",
    name: "title",
  },
  {
    id: 2,
    label: "description",
    name: "description",
  },
  {
    id: 3,
    label: "slug",
    name: "slug",
  },
  {
    id: 4,
    label: "brand",
    name: "brand",
  },
  {
    id: 5,
    label: "price",
    name: "price",
  },
  {
    id: 6,
    label: "discount",
    name: "discount",
  },
  {
    id: 7,
    label: "offPrice",
    name: "offPrice",
  },
  {
    id: 8,
    label: "countInStock",
    name: "countInStock",
  },
  {
    id: 9,
    label: "imageLink",
    name: "imageLink",
  },
];

function ProductForm({
  onSubmit,
  tags,
  setTags,
  categories,
  setSelectedCategory,
  selectedCategory = "",
  onChange,
  formValue,
  isLoading,
}) {
  return (
    <div className="max-w-5xl">
      <form className="md:w-1/2 w-full " onSubmit={onSubmit}>
        <div className="border border-gray-500 rounded-xl mb-5 bg-slate-50">
          {productsFormData.map((item) => {
            return (
              <TextField
                key={item.id}
                label={item.label}
                value={formValue[item.name] ?? 0}
                onChange={onChange}
                id={item.name}
                name={item.name}
                type="text"
              />
            );
          })}
          <div className="mx-4 my-2 flex justify-between flex-col md:flex-row  ">
            <label htmlFor="tags">Tags</label>
            <TagsInput
              id="tags"
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder="enter tags"
            />
          </div>
          <div className="mx-4 my-2  flex justify-between flex-col md:flex-row">
            <label htmlFor="category">Categories</label>
            <Select
              id="category"
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => option._id}
              onChange={setSelectedCategory}
              options={categories}
              defaultValue={selectedCategory}
              className="w-full max-w-sm"
            />
          </div>
        </div>
        {isLoading ? (
          <HashLoader />
        ) : (
          <button className="bg-blue-400 text-white  hover:text-blue-600 hover:bg-blue-200 rounded-lg outline-none px-4 w-full py-2">
            Done
          </button>
        )}
      </form>
    </div>
  );
}

export default ProductForm;
