import React from "react";
import { supabase } from "../supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

const KEYS = ["breakfast", "lunch", "dinner", "kids", "dessert"];

export default function AdminMenu() {
  const [session, setSession] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [menuKey, setMenuKey] = React.useState("breakfast");
  const [jsonText, setJsonText] = React.useState("[]");  // editable textarea
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const cutleryIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16"><path d="M13 .5c0-.276-.226-.506-.498-.465-1.703.257-2.94 2.012-3 8.462a.5.5 0 0 0 .498.5c.56.01 1 .13 1 1.003v5.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5zM4.25 0a.25.25 0 0 1 .25.25v5.122a.128.128 0 0 0 .256.006l.233-5.14A.25.25 0 0 1 5.24 0h.522a.25.25 0 0 1 .25.238l.233 5.14a.128.128 0 0 0 .256-.006V.25A.25.25 0 0 1 6.75 0h.29a.5.5 0 0 1 .498.458l.423 5.07a1.69 1.69 0 0 1-1.059 1.711l-.053.022a.92.92 0 0 0-.58.884L6.47 15a.971.971 0 1 1-1.942 0l.202-6.855a.92.92 0 0 0-.58-.884l-.053-.022a1.69 1.69 0 0 1-1.059-1.712L3.462.458A.5.5 0 0 1 3.96 0z"/></svg>
  const signoutIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-5" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/></svg>
  const editIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>
  const undoIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/></svg>
  const redoIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/></svg>

// at the top of AdminMenu
const [authReady, setAuthReady] = React.useState(false);

React.useEffect(() => {
  (async () => {
    try {
      const url = new URL(window.location.href);

      // Case 1: links that use `?code=...` (GoTrue v2)
      const code = url.searchParams.get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }

      // Case 2: links that use `?token_hash=...&type=invite|signup|recovery`
      const tokenHash = url.searchParams.get("token_hash");
      const type = url.searchParams.get("type");
      if (tokenHash && type) {
        await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
      }

      // Get (or confirm) current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session ?? null);

      // (optional) clean the URL
      window.history.replaceState({}, document.title, url.origin + url.pathname);
    } finally {
      setAuthReady(true);
    }
  })();

  const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => setSession(s));
  return () => sub.subscription.unsubscribe();
}, []);

// --- History for jsonText ---
const MAX_HISTORY = 100;
const historyRef = React.useRef(["[]"]); // stores stringified JSONs
const [histIndex, setHistIndex] = React.useState(0);

function resetHistory(initial) {
  const str = typeof initial === "string" ? initial : JSON.stringify(initial ?? [], null, 2);
  historyRef.current = [str];
  setHistIndex(0);
  setJsonText(str);
}

function commitJson(next) {
  const current = historyRef.current[histIndex];
  if (next === current) { setJsonText(next); return; }

  setJsonText(next);
  setHistIndex(i => {
    let head = historyRef.current.slice(0, i + 1);
    head.push(next);
    if (head.length > MAX_HISTORY) head.shift();
    historyRef.current = head;
    return head.length - 1;
  });
}

const canUndo = histIndex > 0;
const canRedo = histIndex < historyRef.current.length - 1;

function undo() {
  setHistIndex(i => {
    if (i === 0) return i;
    const ni = i - 1;
    setJsonText(historyRef.current[ni]);
    return ni;
  });
}
function redo() {
  setHistIndex(i => {
    if (i >= historyRef.current.length - 1) return i;
    const ni = i + 1;
    setJsonText(historyRef.current[ni]);
    return ni;
  });
}
React.useEffect(() => {
  function onKey(e) {
    const tag = (e.target.tagName || "").toLowerCase();
    const typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
    if (typing) return; // don't steal from fields

    const z = e.key.toLowerCase() === "z";
    const y = e.key.toLowerCase() === "y";
    const mod = e.metaKey || e.ctrlKey;

    if (mod && z && !e.shiftKey) { e.preventDefault(); undo(); }
    else if ((mod && z && e.shiftKey) || (mod && y)) { e.preventDefault(); redo(); }
  }
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [undo, redo]);


  // ---- AUTH ----
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signIn(e) {
    e.preventDefault();
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else setSession(data.session);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  // ---- LOAD ----
  async function loadMenu(k = menuKey) {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("menus")
      .select("data")
      .eq("key", k)
      .single();
    if (error && error.code !== "PGRST116") { // not found is fine
      setError(error.message);
    } else {
      resetHistory(data?.data ? JSON.stringify(data.data, null, 2) : "[]");
    }
    setLoading(false);
  }

  // Load whenever key changes
  React.useEffect(() => { loadMenu(menuKey); }, [menuKey]);

  // ---- REALTIME: auto-refresh when this key changes elsewhere ----
  React.useEffect(() => {
    const channel = supabase
      .channel("realtime:menus-admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menus", filter: `key=eq.${menuKey}` },
        (payload) => {
          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
            resetHistory(JSON.stringify(payload.new.data, null, 2));
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [menuKey]);

  // ---- SAVE ----
  async function save() {
    setSaving(true);
    setError("");
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) throw new Error("Top level must be an array of sections.");
    } catch (e) {
      setSaving(false);
      setError("Invalid JSON: " + e.message);
      return;
    }

    const { error } = await supabase
      .from("menus")
      .upsert({ key: menuKey, data: parsed, updated_at: new Date().toISOString() });

    if (error) setError(error.message);
    setSaving(false);
  }

  if (!authReady) {
  return (
    <div className="min-h-screen grid place-items-center bg-neutral-50 p-6">
      <p className="text-sm text-neutral-600">Checking your link…</p>
    </div>
  );
}

  if (!session) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-50 p-6">
        <form onSubmit={signIn} className="w-full max-w-sm bg-white rounded-xl shadow p-6 space-y-4">
          <h1 className="text-xl font-semibold">Admin Sign In</h1>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="owner@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-red-900 text-white rounded px-3 py-2 hover:bg-red-800">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden gap-6 p-6 bg-cover bg-center" style={{ backgroundImage: "url('/images/misc/dinerstool.jpg')" }}>
      <div className="md:w-60 shrink-0 space-y-4 flex flex-col justify-center">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-start gap-1">
              <h2 className="font-semibold unbounded-font text-lg">Menu</h2>
              <span>{cutleryIcon}</span>
            </div>
            
            <motion.button 
              onClick={signOut} 
              className="text-sm text-red-700 cursor-pointer"
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}                
            >
              {signoutIcon}
            </motion.button>
          </div>
          <InlineExpandSelect
            options={KEYS}
            value={menuKey}
            onChange={setMenuKey}
            className="mt-3"
          />
        </div>

          <motion.button
            onClick={save}
            disabled={saving}
            className="mt-2 w-full bg-red-900 text-white rounded-full px-2 py-2 disabled:opacity-60 cursor-pointer"
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}              
          >
            {saving ? "Saving…" : "Save"}
          </motion.button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

      <div className="flex-1 min-h-0">
        <div className="bg-white w-full rounded-xl shadow p-4 max-h-[95vh] overflow-y-auto menu-scrollbar">
          <div className="flex flex-row gap-2 justify-between">
            <div className="flex flex-row items-center gap-2">
              <h2 className="font-semibold unbounded-font text-lg mb-2">Live Preview Editing</h2>
              <span className="mb-2">{editIcon}</span>
            </div>
            <div className="flex gap-2 mb-2 ">
              <motion.button
                onClick={undo}
                disabled={!canUndo}
                className="disabled:opacity-50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {undoIcon}
              </motion.button>
              <motion.button
                onClick={redo}
                disabled={!canRedo}
                className="disabled:opacity-50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {redoIcon}
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={menuKey + (loading ? "-loading" : "-ready")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } }}
            >
              {loading ? <PreviewSkeleton /> : (
                <EditablePreview jsonText={jsonText} onChangeJsonText={commitJson} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


function PreviewSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse space-y-2">
          <div className="h-4 w-40 bg-neutral-200 rounded" />
          <div className="h-3 w-full bg-neutral-200 rounded" />
          <div className="h-3 w-5/6 bg-neutral-200 rounded" />
          <div className="h-3 w-2/3 bg-neutral-200 rounded" />
        </div>
      ))}
    </div>
  );
}

function InlineExpandSelect({ options = [], value, onChange, className = "" }) {
  const [open, setOpen] = React.useState(false);
  const [highlight, setHighlight] = React.useState(
    Math.max(0, options.indexOf(value))
  );
  const wrapRef = React.useRef(null);

  // Close on outside click
  React.useEffect(() => {
    function onDocClick(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Keyboard support
  function onKeyDown(e) {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault(); setOpen(true); return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight(i => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight(i => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      onChange(options[highlight]);
      setOpen(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className={`w-full ${className}`}>
      {/* Header Button */}
      <button
        type="button"
        className="w-full outfit-font rounded px-3 py-2 bg-white 
                   hover:bg-red-50 flex items-center justify-between cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={onKeyDown}
      >
        <span className="truncate">{value}</span>
        <motion.svg
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15 }}
          className="size-4 text-black/70"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </motion.svg>
      </button>

      {/* Inline expanding panel (pushes content downward) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul
              role="listbox"
              className="mt-2 bg-white rounded-lg  p-1"
            >
              {options.map((opt, i) => {
                const selected = opt === value;
                const active = i === highlight;
                return (
                  <li
                    key={opt}
                    role="option"
                    aria-selected={selected}
                    tabIndex={0}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => e.preventDefault()} // keep focus on button
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={`px-3 py-2 rounded-md cursor-pointer flex items-center justify-between
                                ${active ? "bg-red-50" : ""}
                                ${selected ? "text-red-900 font-medium" : "text-black/80"}`}
                  >
                    <span className="truncate">{opt}</span>
                    {selected && (
                      <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.1 7.1a1 1 0 01-1.415 0l-3.3-3.3a1 1 0 111.414-1.414l2.593 2.593 6.393-6.393a1 1 0 011.415 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Small inline editor: click text to edit, Enter/Blur to save, Esc to cancel */
function InlineEdit({
  value,
  onChange,
  placeholder = "",
  as = "input",
  className = "",
  textClassName = "",
}) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value ?? "");

  React.useEffect(() => setDraft(value ?? ""), [value]);

  function commit() {
    if (draft !== value) onChange(draft);
    setEditing(false);
  }
  function cancel() {
    setDraft(value ?? "");
    setEditing(false);
  }

  if (!editing) {
    const display =
      (value ?? "").toString().trim() !== "" ? (
        <span className={textClassName}>{value}</span>
      ) : (
        <span className="text-neutral-400">{placeholder}</span>
      );
    return (
      <button
        type="button"
        className={`text-left hover:bg-neutral-50 rounded px-1 ${className}`}
        onClick={() => setEditing(true)}
      >
        {display}
      </button>
    );
  }

  const commonProps = {
    autoFocus: true,
    value: draft,
    onChange: (e) => setDraft(e.target.value),
    onBlur: commit,
    onKeyDown: (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        commit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      }
    },
    className:
      "w-full border rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-red-200",
  };

  return as === "textarea" ? (
    <textarea rows={2} {...commonProps} />
  ) : (
    <input type="text" {...commonProps} />
  );
}

/** Editable, user-friendly preview that writes back into jsonText */
function EditablePreview({ jsonText, onChangeJsonText }) {
  // Parse JSON safely
  let data = [];
  let parseError = "";
  try {
    const parsed = JSON.parse(jsonText || "[]");
    data = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    parseError = e.message;
  }

  // Helper to push edits back into the textarea (keeps your Save button flow)
  function update(updater) {
    const copy = structuredClone(data);
    updater(copy);
    onChangeJsonText(JSON.stringify(copy, null, 2));
  }

  function updateSection(idx, patch) {
    update((arr) => Object.assign(arr[idx] ?? (arr[idx] = {}), patch));
  }

  function updateItem(sectionIdx, itemIdx, patch) {
    update((arr) => {
      const sec = (arr[sectionIdx] ??= { items: [] });
      const item = (sec.items ?? (sec.items = []))[itemIdx] ?? (sec.items[itemIdx] = {});
      Object.assign(item, patch);
    });
  }

  function addItem(sectionIdx) {
    update((arr) => {
      const sec = (arr[sectionIdx] ??= {});
      (sec.items ??= []).push({ name: "", description: "", price: "", extra: "" });
    });
  }

  function removeItem(sectionIdx, itemIdx) {
    update((arr) => {
      const sec = arr[sectionIdx];
      if (!sec?.items) return;
      sec.items.splice(itemIdx, 1);
    });
  }

  function addSection() {
    update((arr) => arr.push({ category: "", categoryfootnote: "", categoryextra: "", items: [] }));
  }

  function removeSection(idx) {
    update((arr) => arr.splice(idx, 1));
  }

  if (parseError) {
    return (
      <div className="text-sm text-red-700">
        JSON is invalid: {parseError}
        <div className="mt-2 text-neutral-600">
          Fix the JSON in the left panel or click “Reload”.
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-sm text-neutral-600">
        This menu is empty.
        <button
          className="ml-2 text-red-800 underline"
          onClick={addSection}
          type="button"
        >
          + Add a section
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 ">
      {data.map((section, si) => (
        <div key={si} className="border rounded-lg p-4 hover:border-neutral-300">
          {/* Section header row */}
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <InlineEdit
                value={section.category || ""}
                placeholder="Category (e.g., OMELETTES)"
                onChange={(v) => updateSection(si, { category: v })}
                className="text-red-900"
                textClassName="text-red-900 text-xl font-light"
              />
              <div className="mt-1">
                <InlineEdit
                  value={section.categoryfootnote || ""}
                  placeholder="Category footnote"
                  onChange={(v) => updateSection(si, { categoryfootnote: v })}
                  className="w-full"
                />
              </div>
              <div className="mt-1">
                <InlineEdit
                  value={section.categoryextra || ""}
                  placeholder="Category extra (pill on the right)"
                  onChange={(v) => updateSection(si, { categoryextra: v })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="shrink-0 flex gap-2">
              <button
                type="button"
                onClick={() => addItem(si)}
                className="px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-sm"
              >
                + Item
              </button>
              <button
                type="button"
                onClick={() => removeSection(si)}
                className="px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-sm text-red-700"
              >
                Delete Section
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {(section.items ?? []).map((it, ii) => (
              <div
                key={ii}
                className="rounded-lg border p-3 bg-white/50 hover:border-neutral-300"
              >
                <div className="flex items-start gap-2">
                  <InlineEdit
                    value={it.name || ""}
                    placeholder="Item name"
                    onChange={(v) => updateItem(si, ii, { name: v })}
                    className="flex-1"
                    textClassName="font-medium"
                  />
                  <InlineEdit
                    value={it.price || ""}
                    placeholder="$0.00"
                    onChange={(v) => updateItem(si, ii, { price: v })}
                    className="w-24 text-right"
                  />
                </div>

                <div className="mt-1">
                  <InlineEdit
                    as="textarea"
                    value={it.description || ""}
                    placeholder="Short description"
                    onChange={(v) => updateItem(si, ii, { description: v })}
                  />
                </div>

                <div className="mt-1">
                  <InlineEdit
                    as="textarea"
                    value={it.extra || ""}
                    placeholder="Extra line (e.g., choices, notes)"
                    onChange={(v) => updateItem(si, ii, { extra: v })}
                  />
                </div>

                <div className="mt-1">
                  <InlineEdit
                    as="textarea"
                    value={it.extraoverflow || ""}
                    placeholder="Extra overflow line (optional)"
                    onChange={(v) => updateItem(si, ii, { extraoverflow: v })}
                  />
                </div>

                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => removeItem(si, ii)}
                    className="px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-sm text-red-700"
                  >
                    Delete Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={addSection}
          className="px-3 py-2 rounded bg-neutral-100 hover:bg-neutral-200 text-sm"
        >
          + Add another section
        </button>
      </div>
    </div>
  );
}

