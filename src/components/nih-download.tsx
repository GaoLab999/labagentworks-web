"use client";
import { useRef, useState, type FormEvent } from "react";

export function NIHDownload() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  async function authorize(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setError("");
    try {
      const password = String(new FormData(form).get("password") || "");
      form.reset();
      const response = await fetch("/api/nih/authorize", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "Unable to authorize the download.");
      } else {
        setReady(true);
      }
    } catch { setError("Unable to connect. Please try again."); }
    finally { setBusy(false); }
  }
  return <>
    <button className="button" onClick={() => { setReady(false); setError(""); dialog.current?.showModal(); }}>Download for Windows</button>
    <dialog ref={dialog} className="nih-dialog" aria-labelledby="nih-dialog-title" onClose={() => { dialog.current?.querySelector("form")?.reset(); }}>
      <h2 id="nih-dialog-title">Private beta access</h2>
      {ready ? <><p>Access granted for five minutes. If access expires, enter your password again.</p><a className="button" href="/api/nih/download">Download installer</a></> :
        <form onSubmit={authorize}>
          <p>Enter the shared access password provided by the beta owner.</p>
          <label htmlFor="nih-password">Access password</label>
          <input id="nih-password" name="password" type="password" autoComplete="current-password" required maxLength={256} autoFocus />
          <p role="alert">{error}</p>
          <button className="button" disabled={busy}>{busy ? "Checking…" : "Authorize download"}</button>
        </form>}
      <button className="button button-secondary nih-close" onClick={() => dialog.current?.close()}>Close</button>
    </dialog>
  </>;
}
