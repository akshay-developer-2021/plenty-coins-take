import { useOne, useNavigation } from "@refinedev/core";
import { useParams } from "react-router";

export const ProductShow = () => {
  const { id } = useParams();
  const { list, edit } = useNavigation();

  const { data, isLoading } = useOne({
    resource: "products",
    id,
  });

  const record = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Product Details</h1>
        <div>
          <button
            onClick={() => {
              list("products");
            }}
          >
            List
          </button>
          <button
            onClick={() => {
              edit("products", id!);
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
          <strong>Name:</strong> {record?.name}
        </div>
        <div>
          <strong>Description:</strong> {record?.description}
        </div>
        <div>
          <strong>Price:</strong> ${record?.price?.toFixed(2)}
        </div>
        <div>
          <strong>Category:</strong> {record?.category?.title}
        </div>
        <div>
          <strong>Stock:</strong> {record?.stock}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor:
                record?.status === "active" ? "#52c41a" : "#ff4d4f",
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
