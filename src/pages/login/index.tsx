import { AuthPage } from "@refinedev/core";

export const Login = () => {
  console.log("login page");
  return (
    <AuthPage
      type="login"
      renderContent={(content) => (
        <div>
          <p
            style={{
              padding: 10,
              color: "#004085",
              backgroundColor: "#cce5ff",
              borderColor: "#b8daff",
              textAlign: "center",
            }}
          >
            email: demo@refine.dev
            <br /> password: demodemo
          </p>
          {content}
        </div>
      )}
    />
  );
};
