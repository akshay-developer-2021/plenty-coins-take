import { useNavigation, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const ProductCreate = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const { options: categoryOptions } = useSelect({
    resource: "categories",
  });

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Create Product</h1>
        <div>
          <button
            onClick={() => {
              list("products");
            }}
          >
            List
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onFinish)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label>
            <span style={{ marginRight: "8px" }}>Name</span>
            <input
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.name?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Description</span>
            <textarea
              rows={5}
              cols={33}
              style={{ verticalAlign: "top" }}
              {...register("description", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.description?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Price</span>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("price", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Price must be greater than 0",
                },
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.price?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Category</span>
            <select
              {...register("category.id", {
                required: "This field is required",
              })}
            >
              <option value="">Select a category</option>
              {categoryOptions?.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>
              {(errors as any)?.category?.id?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Stock</span>
            <input
              type="number"
              min="0"
              {...register("stock", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Stock must be greater than or equal to 0",
                },
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.stock?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Status</span>
            <select
              defaultValue={"active"}
              {...register("status", {
                required: "This field is required",
              })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="discontinued">Discontinued</option>
            </select>
            <span style={{ color: "red" }}>
              {(errors as any)?.status?.message as string}
            </span>
          </label>
          <div>
            <input type="submit" value="Save" />
          </div>
        </div>
      </form>
    </div>
  );
};
