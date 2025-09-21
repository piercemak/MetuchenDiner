import React from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";

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
      setJsonText(
        data?.data ? JSON.stringify(data.data, null, 2) : "[]"
      );
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
            setJsonText(JSON.stringify(payload.new.data, null, 2));
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
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-6 bg-neutral-50">
      <div className="md:w-72 shrink-0 space-y-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Menu Key</h2>
            <button onClick={signOut} className="text-sm text-red-700 hover:underline">Sign out</button>
          </div>
          <select
            value={menuKey}
            onChange={(e) => setMenuKey(e.target.value)}
            className="mt-3 w-full border rounded px-2 py-2"
          >
            {KEYS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <button
            onClick={() => loadMenu(menuKey)}
            className="mt-3 w-full border rounded px-2 py-2 hover:bg-neutral-100"
          >
            Reload
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Actions</h2>
          <button
            onClick={() => setJsonText(p => {
              try { return JSON.stringify(JSON.parse(p), null, 2); } catch { return p; }
            })}
            className="w-full border rounded px-2 py-2 hover:bg-neutral-100"
          >
            Pretty-print JSON
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="mt-2 w-full bg-red-900 text-white rounded px-2 py-2 hover:bg-red-800 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save to Supabase"}
          </button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Edit JSON</h2>
            {loading && <span className="text-sm text-neutral-500">Loading…</span>}
          </div>
          <textarea
            spellCheck={false}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="flex-1 w-full border rounded p-3 font-mono text-xs"
          />
        </div>

        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <h2 className="font-semibold mb-2">Live Preview (first 6 items)</h2>
          <Preview jsonText={jsonText} />
        </div>
      </div>
    </div>
  );
}

function Preview({ jsonText }) {
  let data = [];
  try { data = JSON.parse(jsonText); } catch {}
  return (
    <div className="space-y-6">
      {data.slice(0, 6).map((section, i) => (
        <div key={i}>
          {section.category && (
            <div className="text-red-900 text-xl font-light">{section.category}</div>
          )}
          <div className="mt-2 space-y-1">
            {(section.items || []).slice(0, 4).map((it, j) => (
              <div key={j} className="flex gap-2 text-sm">
                <span className="font-medium">{it.name}</span>
                {it.description && <span className="italic text-neutral-600">{it.description}</span>}
                {it.price && <span className="ml-auto text-neutral-600">{it.price}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
