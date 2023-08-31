import Radio from "@/common/Radio";
import TextField from "@/common/textField";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import { HashLoader } from "react-spinners";

function CouponForm({
  onSubmit,
  formValue,
  changeHandler,
  type,
  setType,
  products,
  setProductId,
  expireDate,
  setExpireDate,
  isLoading,
  defaultValue = "",
}) {
  return (
    <div className="max-w-md">
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField
          label="code"
          value={formValue.code || ""}
          onChange={changeHandler}
          id="code"
          name="code"
          type="text"
        />
        <TextField
          label="amount"
          value={formValue.amount || ""}
          onChange={changeHandler}
          id="amount"
          name="amount"
          type="number"
        />
        <TextField
          label="usageLimit"
          value={formValue.usageLimit || ""}
          onChange={changeHandler}
          id="usageLimit"
          name="usageLimit"
          type="number"
        />
        <div className="flex items-center justify-around mb-3">
          <span>Type:</span>
          <Radio
            name="type"
            id="percent-type"
            label="percent"
            value="percent"
            onChange={(e) => setType(e.target.value)}
            checked={type === "percent"}
          />
          <Radio
            name="type"
            id="fixedProduct-type"
            label="fixedProduct"
            value="fixedProduct"
            onChange={(e) => setType(e.target.value)}
            checked={type === "fixedProduct"}
          />
        </div>
        <div>
          <span>products for:</span>

          <Select
            id="products"
            isMulti="true"
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            onChange={setProductId}
            options={products}
            defaultValue={defaultValue}
            className="w-full max-w-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>expire Date:</span>
          <DatePicker
            value={expireDate}
            onChange={setExpireDate}
            inputClass="w-full max-w-md"
          />
        </div>
        {/* button */}
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

export default CouponForm;
