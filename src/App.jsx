import React, { Suspense, lazy } from "react";
import "../src/styles/loader.css";
import "../src/styles/form.css";

const CertificateForm = lazy(() => import("./components/CertificateForm"));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="loader-overlay">
            <div className="loader"></div>
            <p>Loading Certificate Form...</p>
          </div>
        }
      >
        
        <CertificateForm />
      </Suspense>
    </div>
  );
}

export default App;
