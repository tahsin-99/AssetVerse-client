import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId && mounted) {
      axiosSecure.post("/payment-success", { sessionId }).then(() => {
        navigate("/dashboard/manage-employees");
      });
    }
  }, [sessionId, axiosSecure, navigate, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <h1>Payment Successful</h1>
    </div>
  );
};

export default PaymentSuccess;
