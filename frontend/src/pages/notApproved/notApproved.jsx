import { Alert } from "@mui/material";

const notApproved = () => {
  return (
    <>
      <Alert severity="error">you do not have permission to access</Alert>
    </>
  );
};

export default notApproved;
