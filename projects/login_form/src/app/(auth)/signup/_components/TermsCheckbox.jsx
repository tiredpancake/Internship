import React from "react";

const TermsCheckbox = ({ agreed, setAgreed }) => (
  <div className="relative items-start gap-2.5 mt-4 px-0">
    <input
      type="checkbox"
      id="agree"
      checked={agreed}
      onChange={(e) => setAgreed(e.target.checked)}
      className="mt-1 accent-marker"
    />
    <label htmlFor="agree" className="text-sm text-t-gray ml-2">
      I agree with <span className="text-t-purple font-semibold">Terms</span>{" "}
      and <span className="text-t-purple font-semibold">Privacy Policy</span>.
    </label>
  </div>
);

export default TermsCheckbox;
