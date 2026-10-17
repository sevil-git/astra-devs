"use client";

import { useEffect, useRef, useState } from "react";
import { useDialogMotion } from "./motion";

export default function Enquiry({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState({
    name: "",
    email: "",
    service: "A website",
    message: "",
    budget: "Let’s figure it out together",
  });
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useDialogMotion(ref, open);
  useEffect(() => {
    if (!open) return;
    const target = brief
      ? ref.current?.querySelector<HTMLElement>("h2")
      : ref.current?.querySelector<HTMLElement>("input");
    ref.current?.scrollTo({ top: 0, behavior: "instant" });
    target?.focus({ preventScroll: true });
  }, [brief, open]);
  return (
    <dialog
      className="enquiry-dialog"
      data-lenis-prevent
      ref={ref}
      aria-labelledby="enquiry-title"
      onClose={() => {
        setBrief("");
        setCopied(false);
        setCopyError(false);
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close enquiry"
      >
        CLOSE ×
      </button>
      <p className="section-label">LET’S MAKE SOMETHING MATTER.</p>
      <div className="enquiry-content" key={brief ? "brief" : "form"}>
        <h2 id="enquiry-title" tabIndex={-1}>
          {brief ? (
            <>
              <em>Your next</em>
              <br />
              chapter.
            </>
          ) : (
            <>
              <em>Big idea?</em>
              <br />
              <span>We’re listening.</span>
            </>
          )}
        </h2>
        {brief ? (
          <>
            <p className="enquiry-intro">
              Your brief is ready. Email it to us, or copy and save it for
              later.
            </p>
            <pre className="brief-preview">{brief}</pre>
            <div className="brief-actions">
              <a
                className="solid-button"
                href={`mailto:kalesahil565@gmail.com?subject=${encodeURIComponent("A new project for Astra devs")}&body=${encodeURIComponent(brief)}`}
              >
                EMAIL YOUR BRIEF ↗
              </a>
              <button
                className="line-button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(brief);
                    setCopied(true);
                    setCopyError(false);
                  } catch {
                    setCopyError(true);
                  }
                }}
              >
                {copied ? "COPIED ✓" : "COPY BRIEF"}
              </button>
              <button
                className="line-button"
                onClick={() => {
                  const url = URL.createObjectURL(
                    new Blob([brief], { type: "text/plain" }),
                  );
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "astra-devs-project-brief.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                SAVE BRIEF ↗
              </button>
            </div>
            <p className="form-note" role="status">
              {copyError
                ? "Copy wasn’t available. Save the brief instead."
                : copied
                  ? "Copied. Ready to share."
                  : "Email opens your mail app with the brief attached as text. You review and send it there."}
            </p>
            <button className="line-button" onClick={() => setBrief("")}>
              ← EDIT YOUR BRIEF
            </button>
          </>
        ) : (
          <>
            <p className="enquiry-intro">
              Napkin sketches welcome. A 40-page deck is strictly optional.
              We’ll help you prepare a brief to email to kalesahil565@gmail.com.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const values = {
                  name: String(data.get("name")),
                  email: String(data.get("email")),
                  service: String(data.get("service")),
                  message: String(data.get("message")),
                  budget: String(data.get("budget")),
                };
                setDraft(values);
                setBrief(
                  `ASTRA DEVS — PROJECT BRIEF\n\nName: ${values.name}\nEmail: ${values.email}\nInterested in: ${values.service}\n\nThe idea\n${values.message}\n\nBudget: ${values.budget}`,
                );
              }}
            >
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    defaultValue={draft.name}
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    required
                    maxLength={120}
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    defaultValue={draft.email}
                    placeholder="alex@company.com"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                  />
                </label>
              </div>
              <label>
                What are you thinking?
                <select name="service" defaultValue={draft.service}>
                  <option>A website</option>
                  <option>An app or platform</option>
                  <option>An automation</option>
                  <option>AI or internal tools</option>
                  <option>A bit of everything</option>
                </select>
              </label>
              <label>
                A little about your idea
                <textarea
                  name="message"
                  defaultValue={draft.message}
                  placeholder="The big picture, the small details, the what if…"
                  rows={3}
                  required
                  maxLength={5000}
                />
              </label>
              <label>
                Budget range
                <select name="budget" defaultValue={draft.budget}>
                  <option>Let’s figure it out together</option>
                  <option>Under $5,000</option>
                  <option>$5,000–$15,000</option>
                  <option>$15,000–$30,000</option>
                  <option>$30,000+</option>
                </select>
              </label>
              <button className="solid-button form-submit">
                PREPARE PROJECT BRIEF ↗
              </button>
              <p className="form-note">
                Review your brief, then send it through your email app. Prefer a
                quick hello?{" "}
                <a href="mailto:kalesahil565@gmail.com">Email us directly.</a>
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
