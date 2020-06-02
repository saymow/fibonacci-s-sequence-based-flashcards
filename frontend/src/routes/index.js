import React from "react";

import { useAuth } from "../contexts/auth";
import AuthRouter from "./authRotes";
import AppRouter from "./routes";

export default function Routes() {
  const { signed } = useAuth();

  return signed ? <AppRouter /> : <AuthRouter />;
}
