"use client";

import { AuthProvider } from "../authorised.provider";
import MyAccountComponent from "../../components/platform/my-account/my-account.component";

function MyAccountPage() {
  return (
    <AuthProvider>
      <MyAccountComponent />
    </AuthProvider>
  );
}

export default MyAccountPage;
