import { useOne, useNavigation } from "@refinedev/core";
import { useParams } from "react-router";

export const OrderShow = () => {
  const { id } = useParams();
  const { list, edit } = useNavigation();

  const { data, isLoading } = useOne({
    resource: "orders",
    id,
  });

  const record = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Order Details</h1>
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
              edit("orders", id!);
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <div>
          <strong>ID:</strong> {record?.id}
        </div>
        <div>
          <strong>Order Number:</strong> {record?.orderNumber}
        </div>
        <div>
          <strong>Customer:</strong> {record?.customer}
        </div>
        <div>
          <strong>Total:</strong> ${record?.total?.toFixed(2)}
        </div>
        <div>
          <strong>Category:</strong> {record?.category?.title}
        </div>
        <div>
          <strong>Quantity:</strong> {record?.quantity}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor:
                record?.status === "completed" ? "#52c41a" : record?.status === "pending" ? "#faad14" : "#ff4d4f",
              color: "white",
              fontSize: "12px",
            }}
          >
            {record?.status}
          </span>
        </div>
        <div>
          <strong>Created At:</strong>{" "}
          {new Date(record?.createdAt).toLocaleString(undefined, {
            timeZone: "UTC",
          })}
        </div>
        {record?.updatedAt && (
          <div>
            <strong>Updated At:</strong>{" "}
            {new Date(record?.updatedAt).toLocaleString(undefined, {
              timeZone: "UTC",
            })}
          </div>
        )}
      </div>
    </div>
  );
};
