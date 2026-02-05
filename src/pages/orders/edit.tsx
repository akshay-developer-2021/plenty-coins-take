import { useNavigation, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useParams } from "react-router";

export const OrderEdit = () => {
  const { id } = useParams();
  const { list, show } = useNavigation();

  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      id,
    },
  });

  const { options: categoryOptions } = useSelect({
    resource: "categories",
  });

  const record = queryResult?.data?.data;

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Edit Order</h1>
        <div>
          <button
            onClick={() => {
              list("orders");
            }}
          >
            List
          </button>
          <button
            onClick={() => {
              show("orders", id!);
            }}
          >
            Show
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
            <span style={{ marginRight: "8px" }}>Order Number</span>
            <input
              type="text"
              defaultValue={record?.orderNumber}
              {...register("orderNumber", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.orderNumber?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Customer</span>
            <input
              type="text"
              defaultValue={record?.customer}
              {...register("customer", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.customer?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Total</span>
            <input
              type="number"
              step="0.01"
              min="0"
              defaultValue={record?.total}
              {...register("total", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Total must be greater than 0",
                },
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.total?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Category</span>
            <select
              defaultValue={record?.category?.id}
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
            <span style={{ marginRight: "8px" }}>Quantity</span>
            <input
              type="number"
              min="1"
              defaultValue={record?.quantity}
              {...register("quantity", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.quantity?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Status</span>
            <select
              defaultValue={record?.status}
              {...register("status", {
                required: "This field is required",
              })}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
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
