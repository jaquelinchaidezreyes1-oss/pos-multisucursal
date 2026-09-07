/* =========================================================
   LA FUENTE POS v3.2 — PALETERÍA & HELADERÍA DESDE 1962
   EDICIÓN MASTER: CONTABILIDAD, AUDITORÍA & ACCESO TOTAL DIRECTIVO
   ========================================================= */
(() => {
    "use strict";

    /* ── CONFIGURACIÓN SUPABASE ── */
    const SUPABASE_URL = "https://rxyfitblocfvaltuxvqp.supabase.co";
    const SUPABASE_KEY = "sb_publishable_YEnMCOAPzxEWJTbaZHzIGA_ahFaXg02";

    /* ── SUPERUSUARIOS EXCLUSIVOS ── */
    const SUPER = [
        "jaquelinchaidezreyes1@gmail.com",
        "ignaciogarcialafuente92@gmail.com"
    ];

    /* ── 12 ENCARGADAS OFICIALES ── */
    const STAFF = {
        "encargado1lafuente@gmail.com":  {b:"La Fuente Calzada", s:"Mañana", r:"Encargada Calzada (Matutino)"},
        "encargado2lafuente@gmail.com":  {b:"La Fuente Calzada", s:"Tarde",  r:"Encargada Calzada (Vespertino)"},
        "encargado3lafuente@gmail.com":  {b:"Rescate",          s:"Mañana", r:"Encargada Rescate (Matutino)"},
        "encargado4lafuente@gmail.com":  {b:"Rescate",          s:"Tarde",  r:"Encargada Rescate (Vespertino)"},
        "encargado5lafuente@gmail.com":  {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "encargado6lafuente@gmail.com":  {b:"Mollotes",         s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "encargado7lafuente@gmail.com":  {b:"Tagarete 1",       s:"Mañana", r:"Encargada Tagarete 1 (Matutino)"},
        "encargado8lafuente@gmail.com":  {b:"Tagarete 1",       s:"Tarde",  r:"Encargada Tagarete 1 (Vespertino)"},
        "encargado9lafuente@gmail.com":  {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "encargado10lafuente@gmail.com": {b:"Tagarete 2",       s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "encargado11lafuente@gmail.com": {b:"CNOP",             s:"Mañana", r:"Encargada CNOP (Matutino)"},
        "encargado12lafuente@gmail.com": {b:"CNOP",             s:"Tarde",  r:"Encargada CNOP (Vespertino)"}
    };

    const BRANCH_NAMES = ["La Fuente Calzada","Rescate","Mollotes","Tagarete 1","Tagarete 2","CNOP"];

    /* ── 9 CATEGORÍAS INDEPENDIENTES ── */
    const CATS = [
        {id:"all",        label:"Todos",        e:"🌈"},
        {id:"paletas",    label:"Paletas",      e:"🍭"},
        {id:"aguas",      label:"Aguas",        e:"💧"},
        {id:"helados",    label:"Helados",      e:"🍨"},
        {id:"preparados", label:"Preparados",   e:"🍧"},
        {id:"congelados", label:"Congelados",   e:"❄️"},
        {id:"desechables",label:"Desechables",  e:"🧤"},
        {id:"postres",    label:"Postres",      e:"🍊"},
        {id:"dulces",     label:"Dulces",       e:"🍬"}
    ];

    const STOCK_MAX = 500;
    const STOCK_LOW = 10;
    let db = null;

    /* ── ESTADO GLOBAL ── */
    const S = {
        user: null,
        profile: null,
        companyId: null,
        branchId: null,
        branchName: "La Fuente Calzada",
        shift: "Mañana",
        role: "Encargada de Sucursal",
        branches: [],
        isSU: false,
        products: [],
        cart: [],
        currentShift: null,
        view: "pos",
        cat: "all",
        q: "",
        inv: {},
        salesTab: "active",
        cutShiftTab: "todos",
        cutBranchFilter: "all",
        accHistoryFilterDate: ""
    };

    /* ── UTILIDADES & FORMATO ── */
    const $ = s => document.querySelector(s);
    const $a = s => Array.from(document.querySelectorAll(s));
    const esc = v => v == null ? "" : String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    const money = v => (Number(v)||0).toLocaleString("es-MX",{style:"currency",currency:"MXN"});
    const fdt = v => {
        if(!v) return "—";
        const d = new Date(v);
        return isNaN(d) ? String(v) : d.toLocaleString("es-MX",{dateStyle:"short",timeStyle:"short"});
    };
    const fd = v => {
        if(!v) return "—";
        if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v.trim())) {
            const parts = v.trim().split("-");
            const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
            const d = parseInt(parts[2], 10);
            const m = months[parseInt(parts[1], 10) - 1] || parts[1];
            const y = parts[0];
            return `${d} ${m} ${y}`;
        }
        const d = new Date(v);
        return isNaN(d) ? String(v) : d.toLocaleDateString("es-MX",{year:'numeric',month:'short',day:'numeric'});
    };
    const setT = (sel, v) => $a(sel).forEach(el => el.textContent = v);
    const uuid = s => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(s||""));
    const now = () => new Date().toISOString();
    const toDateKey = v => {
        if (!v) {
            const nowD = new Date();
            const y = nowD.getFullYear();
            const m = String(nowD.getMonth() + 1).padStart(2, "0");
            const d = String(nowD.getDate()).padStart(2, "0");
            return `${y}-${m}-${d}`;
        }
        const d = new Date(v);
        if (isNaN(d.getTime())) return String(v).slice(0,10);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    };

    /* ── CLASIFICADOR OFICIAL DE TURNOS (ENCARGADOS 1,3,5,7,9,11 = MATUTINO / 2,4,6,8,10,12 = VESPERTINO) ── */
    function getShiftCategory(s) {
        if (!s) return "matutino";
        const email = String(s.cashier_name || s.cashier_id || s.user_name || "").toLowerCase();
        
        // 1. Detección por número oficial de encargado (1, 3, 5, 7, 9, 11 = Matutino)
        const match = email.match(/encargado(\d+)lafuente/);
        if (match) {
            const num = parseInt(match[1], 10);
            if ([1, 3, 5, 7, 9, 11].includes(num)) return "matutino";
            if ([2, 4, 6, 8, 10, 12].includes(num)) return "vespertino";
        }

        // 2. Detección por nombre de turno explícito
        const sn = String(s.shift_name || s.shift || "").toLowerCase();
        if (sn.includes("mañana") || sn.includes("matutino")) return "matutino";
        if (sn.includes("tarde")  || sn.includes("vespertino")) return "vespertino";

        // 3. Detección por horario de creación del ticket
        if (s.created_at) {
            const dateObj = new Date(s.created_at);
            const hour = dateObj.getHours();
            const min = dateObj.getMinutes();
            const timeDec = hour + (min / 60);
            return (timeDec < 15.5) ? "matutino" : "vespertino";
        }
        return "matutino";
    }

    const lk = k => "lf_" + (S.branchId || "x") + "_" + k;
    const lw = (k, d) => { try { localStorage.setItem(lk(k), JSON.stringify(d)); } catch(e) {} };
    const lr = (k, d) => { try { const x = localStorage.getItem(lk(k)); return x ? JSON.parse(x) : d; } catch(e) { return d; } };

    const gw = (k, d) => { try { localStorage.setItem("lf_global_" + k, JSON.stringify(d)); } catch(e) {} };
    const gr = (k, d) => { try { const x = localStorage.getItem("lf_global_" + k); return x ? JSON.parse(x) : d; } catch(e) { return d; } };

    /* ── NORMALIZADOR Y COMPARADOR ROBUSTO DE SUCURSALES ── */
    function normalizeBranchName(str) {
        if (!str) return "";
        return String(str)
            .toLowerCase()
            .replace(/la fuente/g, "")
            .replace(/sucursal/g, "")
            .replace(/matutino|vespertino|mañana|tarde/g, "")
            .replace(/[()_-]/g, " ")
            .trim();
    }

    function matchesBranch(sale, branchRef) {
        if (!sale) return false;
        const ref = normalizeBranchName(typeof branchRef === "string" ? branchRef : (branchRef?.name || branchRef?.id || ""));
        const sBranch = normalizeBranchName(sale.branch_name || "");
        const sId = String(sale.branch_id || "").toLowerCase();
        const sCashier = String(sale.cashier_name || sale.user_name || "").toLowerCase();
        
        // Match by branch ID directly
        if (typeof branchRef === "object" && branchRef?.id && sId && String(branchRef.id).toLowerCase() === sId) {
            return true;
        }

        // Match by branch name / cashier assignment / ID patterns
        if (ref.includes("calzada")) {
            return sBranch.includes("calzada") || sId === "branch-1" || sId === "branch_la_fuente_calzada" || sId === "branch_calzada" || sCashier.includes("encargado1") || sCashier.includes("encargado2");
        }
        if (ref.includes("rescate")) {
            return sBranch.includes("rescate") || sId === "branch-2" || sId === "branch_rescate" || sCashier.includes("encargado3") || sCashier.includes("encargado4");
        }
        if (ref.includes("mollotes")) {
            return sBranch.includes("mollotes") || sId === "branch-3" || sId === "branch_mollotes" || sCashier.includes("encargado5") || sCashier.includes("encargado6");
        }
        if (ref.includes("tagarete 1") || (ref.includes("tagarete") && ref.includes("1"))) {
            return (sBranch.includes("tagarete") && (sBranch.includes("1") || !sBranch.includes("2"))) || sId === "branch-4" || sId.includes("tagarete_1") || sId.includes("tagarete1") || sCashier.includes("encargado7") || sCashier.includes("encargado8");
        }
        if (ref.includes("tagarete 2") || (ref.includes("tagarete") && ref.includes("2"))) {
            return (sBranch.includes("tagarete") && sBranch.includes("2")) || sId === "branch-5" || sId.includes("tagarete_2") || sId.includes("tagarete2") || sCashier.includes("encargado9") || sCashier.includes("encargado10");
        }
        if (ref.includes("cnop")) {
            return sBranch.includes("cnop") || sId === "branch-6" || sId === "branch_cnop" || sCashier.includes("encargado11") || sCashier.includes("encargado12");
        }

        if (ref && sBranch) {
            return sBranch.includes(ref) || ref.includes(sBranch);
        }
        return false;
    }

    /* ── COLA DE SINCRONIZACIÓN AUTOMÁTICA CON SUPABASE ── */
    let _isSyncingSales = false;
    async function syncPendingSalesToSupabase() {
        if (!db || _isSyncingSales) return;
        _isSyncingSales = true;
        try {
            const fallbackUUID = "51bc275d-4e19-4115-be3f-42c0ce3dae5a";
            const defaultBranchUUID = "c188dd82-7faf-41b8-948b-af8e789facba";
            const defaultUserUUID = "4710b330-566c-45c7-a92e-b7b6a62355af";
            const defaultShiftUUID = "1dabe6df-2ce6-4e3a-97df-b81e179898ab";

            const localSales = lr("sales", []).concat(gr("all_sales", []));
            
            // Recoger ventas de todas las llaves de sucursales locales
            try {
                if (typeof localStorage !== "undefined") {
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        if (key && (key.startsWith("lf_") || key.includes("sales"))) {
                            try {
                                const raw = localStorage.getItem(key);
                                if (raw && raw.startsWith("[")) {
                                    const parsed = JSON.parse(raw);
                                    if (Array.isArray(parsed)) {
                                        parsed.forEach(item => {
                                            if (item && (item.total != null || item.sale_number || item.items)) {
                                                localSales.push(item);
                                            }
                                        });
                                    }
                                }
                            } catch(e) {}
                        }
                    }
                }
            } catch(e) {}

            const syncedIds = new Set(gr("synced_sales_ids", []));
            const seenLocals = new Set();
            const unsynced = [];

            localSales.forEach(s => {
                if (s && s.id && !syncedIds.has(String(s.id)) && !uuid(s.id) && !seenLocals.has(String(s.id))) {
                    seenLocals.add(String(s.id));
                    unsynced.push(s);
                }
            });

            if (!unsynced.length) return;

            for (const s of unsynced) {
                const bId = uuid(s.branch_id) ? s.branch_id : defaultBranchUUID;
                const cId = uuid(S.companyId) ? S.companyId : fallbackUUID;
                const uId = uuid(s.cashier_id) ? s.cashier_id : (uuid(S.user?.id) ? S.user.id : defaultUserUUID);
                const sId = uuid(s.shift_id) ? s.shift_id : (uuid(S.currentShift?.id) ? S.currentShift.id : defaultShiftUUID);

                const observationsObj = {
                    branch_name: s.branch_name || S.branchName,
                    shift_name: s.shift_name || S.shift,
                    cashier_name: s.cashier_name || "Encargada",
                    payment_method: s.payment_method || "cash",
                    items: s.items || [],
                    local_id: s.id
                };

                const insertPayload = {
                    company_id: cId,
                    branch_id: bId,
                    shift_id: sId,
                    user_id: uId,
                    sale_number: s.sale_number,
                    subtotal: Number(s.total || 0),
                    discount: 0,
                    tax: 0,
                    total: Number(s.total || 0),
                    status: String(s.status || "").toUpperCase() === "CANCELLED" ? "CANCELLED" : "COMPLETED",
                    observations: JSON.stringify(observationsObj),
                    created_at: s.created_at || now()
                };

                const { data, error } = await db.from("sales").insert(insertPayload).select();
                if (!error && data && data.length) {
                    syncedIds.add(String(s.id));
                    if (data[0].id) syncedIds.add(String(data[0].id));
                }
            }
            gw("synced_sales_ids", Array.from(syncedIds));
        } catch(e) {
            console.warn("Error en cola de sincronización:", e);
        } finally {
            _isSyncingSales = false;
        }
    }

    /* ── NOTIFICACIONES TOAST & MODALES ELEGANTE ── */
    function toast(msg, type="success", dur=3500) {
        let wrap = document.getElementById("toast-wrapper");
        if (!wrap) {
            wrap = document.createElement("div");
            wrap.id = "toast-wrapper";
            wrap.style.cssText = "position:fixed;top:20px;right:20px;z-index:999999;display:flex;flex-direction:column;gap:8px;pointer-events:none;max-width:360px;";
            document.body.appendChild(wrap);
        }
        const colors = {
            success: { bg:"#dcfce7", border:"#86efac", color:"#15803d", icon:"✓" },
            error:   { bg:"#fee2e2", border:"#f87171", color:"#b91c1c", icon:"✕" },
            warn:    { bg:"#fef3c7", border:"#fcd34d", color:"#92400e", icon:"⚠" },
            info:    { bg:"#dbeafe", border:"#93c5fd", color:"#1d4ed8", icon:"ℹ" }
        };
        const c = colors[type] || colors.success;
        const t = document.createElement("div");
        t.style.cssText = `background:${c.bg};border:1.5px solid ${c.border};color:${c.color};
            padding:12px 16px;border-radius:12px;font-size:13px;font-weight:700;
            box-shadow:0 6px 22px rgba(0,0,0,.15);display:flex;align-items:flex-start;gap:10px;
            pointer-events:auto;animation:toastIn .25s ease;line-height:1.4;`;
        t.innerHTML = `<span style="font-size:16px;flex-shrink:0">${c.icon}</span><span>${esc(msg)}</span>`;
        wrap.appendChild(t);
        setTimeout(() => {
            t.style.opacity = "0";
            t.style.transform = "translateX(20px)";
            t.style.transition = ".3s";
            setTimeout(() => t.remove(), 300);
        }, dur);
    }

    function toastConfirm(msg) {
        return new Promise(resolve => {
            const overlay = document.createElement("div");
            overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999998;display:flex;align-items:center;justify-content:center;padding:16px;";
            overlay.innerHTML = `
                <div style="background:#fffef5;border:2px solid rgba(188,132,10,.4);border-radius:20px;padding:26px 22px;max-width:400px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3);">
                    <div style="font-size:36px;text-align:center;margin-bottom:10px">❓</div>
                    <p style="font-size:14px;color:#3b0a10;font-weight:700;text-align:center;margin:0 0 18px;white-space:pre-line;">${esc(msg)}</p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                        <button id="tc-no"  style="padding:11px;border-radius:10px;border:1.5px solid rgba(188,132,10,.5);background:#fff;font-weight:800;cursor:pointer;font-size:13px;color:#3b0a10">Cancelar</button>
                        <button id="tc-yes" style="padding:11px;border-radius:10px;border:none;background:linear-gradient(135deg,#541118,#701721);color:#fff;font-weight:800;cursor:pointer;font-size:13px">Confirmar</button>
                    </div>
                </div>`;
            document.body.appendChild(overlay);
            overlay.querySelector("#tc-yes").onclick = () => { overlay.remove(); resolve(true); };
            overlay.querySelector("#tc-no").onclick  = () => { overlay.remove(); resolve(false); };
        });
    }

    function toastPaymentMethod(total) {
        return new Promise(resolve => {
            const overlay = document.createElement("div");
            overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:999998;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(3px);";
            overlay.innerHTML = `
                <div style="background:#fffef9;border:2px solid var(--gold-500);border-radius:22px;padding:28px 24px;max-width:440px;width:100%;box-shadow:0 24px 70px rgba(0,0,0,.35);text-align:center;">
                    <div style="font-size:40px;margin-bottom:8px">💳 💵</div>
                    <h3 style="color:var(--wine-900);margin:0 0 6px;font-size:20px;font-weight:900">Método de Pago</h3>
                    <p style="font-size:13px;color:var(--text-muted);margin:0 0 16px;font-weight:700">Total a cobrar: <strong style="font-size:22px;color:var(--wine-800);display:block;margin-top:4px">${money(total)}</strong></p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
                        <button id="pay-cash-btn" type="button"
                            style="padding:16px 12px;border-radius:14px;border:2px solid #86efac;background:linear-gradient(145deg,#f0fdf4,#dcfce7);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;transition:transform .15s ease;">
                            <span style="font-size:32px">💵</span>
                            <strong style="color:#15803d;font-size:14px;font-weight:900">EFECTIVO</strong>
                            <small style="color:#166534;font-size:10.5px;font-weight:700">Dinero en caja física</small>
                        </button>
                        <button id="pay-card-btn" type="button"
                            style="padding:16px 12px;border-radius:14px;border:2px solid #93c5fd;background:linear-gradient(145deg,#eff6ff,#dbeafe);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;transition:transform .15s ease;">
                            <span style="font-size:32px">💳</span>
                            <strong style="color:#1d4ed8;font-size:14px;font-weight:900">TARJETA</strong>
                            <small style="color:#1e40af;font-size:10.5px;font-weight:700">Terminal / Bancario</small>
                        </button>
                    </div>
                    <button id="pay-cancel-btn" type="button"
                        style="width:100%;padding:10px;border-radius:10px;border:1.5px solid #d1d5db;background:#fff;font-weight:800;color:var(--text-muted);cursor:pointer;font-size:12px">
                        Cancelar Cobro</button>
                </div>`;
            document.body.appendChild(overlay);

            overlay.querySelector("#pay-cash-btn").onclick = () => { overlay.remove(); resolve("cash"); };
            overlay.querySelector("#pay-card-btn").onclick = () => { overlay.remove(); resolve("card"); };
            overlay.querySelector("#pay-cancel-btn").onclick = () => { overlay.remove(); resolve(null); };
        });
    }

    function toastPrompt(msg, placeholder="") {
        return new Promise(resolve => {
            const overlay = document.createElement("div");
            overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999998;display:flex;align-items:center;justify-content:center;padding:16px;";
            overlay.innerHTML = `
                <div style="background:#fffef5;border:2px solid rgba(188,132,10,.4);border-radius:20px;padding:26px 22px;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3);">
                    <p style="font-size:14px;color:#3b0a10;font-weight:700;margin:0 0 12px">${esc(msg)}</p>
                    <textarea id="tp-inp" rows="3" placeholder="${esc(placeholder)}"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:10px;font-size:13px;box-sizing:border-box;resize:vertical;font-family:inherit"></textarea>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
                        <button id="tp-no"  style="padding:11px;border-radius:10px;border:1.5px solid rgba(188,132,10,.5);background:#fff;font-weight:800;cursor:pointer;font-size:13px">Cancelar</button>
                        <button id="tp-yes" style="padding:11px;border-radius:10px;border:none;background:linear-gradient(135deg,#541118,#701721);color:#fff;font-weight:800;cursor:pointer;font-size:13px">Aceptar</button>
                    </div>
                </div>`;
            document.body.appendChild(overlay);
            const inp = overlay.querySelector("#tp-inp");
            inp.focus();
            overlay.querySelector("#tp-yes").onclick = () => { overlay.remove(); resolve(inp.value.trim() || null); };
            overlay.querySelector("#tp-no").onclick  = () => { overlay.remove(); resolve(null); };
        });
    }

    /* ── BASE DE DATOS ── */
    function initDB() {
        if (db) return true;
        if (!window.supabase) return false;
        try {
            db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
                auth: { persistSession: true, autoRefreshToken: true, storageKey: "lf-pos" }
            });
            window.supabaseClient = db;
            return true;
        } catch(e) {
            console.error("Supabase error:", e);
            return false;
        }
    }

    /* ── CANDADO SUPERUSUARIOS ── */
    function evalSU() {
        const e = String(S.user?.email || "").trim().toLowerCase();
        S.isSU = (e === SUPER[0] || e === SUPER[1]);
        return S.isSU;
    }

    /* ── SUCURSALES ── */
    function safeQuery(promise, fallback = null, timeoutMs = 1200) {
        if (!promise || typeof promise.then !== "function") return Promise.resolve({ data: fallback, error: null });
        return Promise.race([
            promise,
            new Promise(resolve => setTimeout(() => resolve({ data: fallback, error: new Error("DB Timeout") }), timeoutMs))
        ]);
    }

    async function loadBranches() {
        if (!db) initDB();
        if (db) {
            try {
                const {data} = await safeQuery(db.from("branches").select("id,name,code,is_active").eq("is_active", true).order("name"), null, 1000);
                S.branches = (data && data.length) ? data : BRANCH_NAMES.map((n,i) => ({id: "branch-"+(i+1), name: n, code: "SUC-"+(i+1)}));
            } catch {
                S.branches = BRANCH_NAMES.map((n,i) => ({id: "branch-"+(i+1), name: n, code: "SUC-"+(i+1)}));
            }
        } else {
            S.branches = BRANCH_NAMES.map((n,i) => ({id: "branch-"+(i+1), name: n, code: "SUC-"+(i+1)}));
        }
        syncBranch();
        renderSel();
        updateUI();
        return S.branches;
    }

    function syncBranch() {
        if (!S.user) return;
        const email = String(S.user.email || "").trim().toLowerCase();
        evalSU();
        if (S.isSU) {
            S.role = "Director General";
            S.shift = "Turno Completo";
            if (!S.branchId && S.branches.length) {
                const c = S.branches.find(b => b.name.toLowerCase().includes("calzada"));
                S.branchId = c ? c.id : S.branches[0].id;
                S.branchName = c ? c.name : S.branches[0].name;
            }
            return;
        }
        const cfg = STAFF[email];
        if (cfg) {
            S.branchName = cfg.b;
            S.shift = cfg.s;
            S.role = cfg.r;
            const m = S.branches.find(b => b.name.toLowerCase().trim() === cfg.b.toLowerCase().trim());
            if (m) S.branchId = m.id;
            else S.branchId = "branch_" + cfg.b.toLowerCase().replace(/\s+/g, "_");
        } else {
            const m = S.branches.find(b => email.includes(b.name.toLowerCase().replace(/\s+/g, "")));
            if (m) {
                S.branchId = m.id;
                S.branchName = m.name;
            }
            S.role = "Encargada de Sucursal";
            S.shift = "Turno Asignado";
        }
    }

    function renderSel() {
        const c = $("#branch-selector-container");
        if (!c) return;
        if (!S.isSU) {
            c.innerHTML = `<div class="branch-pill-active">
                <span style="font-size:8px;font-weight:900;color:var(--wine-700)">SUCURSAL:</span>
                <strong style="font-size:11px;color:var(--wine-900)">📍 ${esc(S.branchName)}</strong>
                <small style="font-size:9px;color:var(--emerald);font-weight:800">(${esc(S.shift)})</small>
            </div>`;
            return;
        }
        c.innerHTML = `<div class="branch-selector-box"><label>CAMBIAR SUCURSAL</label>
            <select id="branch-selector" class="branch-select-dropdown">
                ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(S.branchId)?" selected":""}>${esc(b.name)}</option>`).join("")}
            </select></div>`;
        $("#branch-selector")?.addEventListener("change", async e => await changeBranch(e.target.value));
    }

    async function changeBranch(id) {
        if (!S.isSU) return;
        const b = S.branches.find(x => String(x.id) === String(id) || String(x.name).toLowerCase().trim() === String(id).toLowerCase().trim());
        if (!b) return;

        // Guardar inventario anterior antes de conmutar
        if (S.branchId && S.inv && Object.keys(S.inv).length) {
            const oldBk = getBranchInventoryKey();
            lw("inv", S.inv);
            gw("inv_" + S.branchId, S.inv);
            gw("inv_" + oldBk.norm, S.inv);
        }

        S.branchId = b.id;
        S.branchName = b.name;
        S.currentShift = null;
        S.cart = [];
        
        // Recargar inventario específico e independiente de la sucursal seleccionada
        initInv();
        
        updateUI();
        renderSel();
        renderCart();
        alertInv();
        
        await loadCurrentShift();
        await loadProducts();
        
        if (S.view === "pos")            renderPOS(filtered());
        if (S.view === "products")       await loadProductsAdmin();
        if (S.view === "sales")          await loadSales();
        if (S.view === "cuts")           await loadCuts();
        if (S.view === "inventory")      await loadInventory();
        if (S.view === "shift")          await loadShiftView();
        if (S.view === "private-access") await loadPrivateAccess();
        if (S.view === "damage-reports") await loadDamageReports();
        if (S.view === "accounting")     await loadAccounting();
        
        toast("📍 Inventario de " + S.branchName + " cargado con éxito.", "success", 3000);
    }

    function updateUI() {
        evalSU();
        const email = String(S.user?.email || "").toLowerCase().trim();
        let name = S.profile?.full_name;
        if (!name || name === email || name === "Usuario") {
            if (email === SUPER[0]) name = "Jaquelin Chaidez Reyes";
            else if (email === SUPER[1]) name = "Ignacio García La Fuente";
            else if (STAFF[email]) name = STAFF[email].r;
            else name = S.role || "Encargada";
        }
        setT("#userName,#currentUser,[data-user-name]", name);
        setT("#branchName,#branch-name,[data-branch-name]", S.branchName + " (" + S.shift + ")");
        setT("#user-role,[data-user-role]", S.role);

        const pb = document.getElementById("menu-private-access");
        if (pb) pb.style.setProperty("display", S.isSU ? "flex" : "none", "important");

        const cb = document.getElementById("menu-accounting");
        if (cb) cb.style.setProperty("display", S.isSU ? "flex" : "none", "important");

        const av = $("#user-avatar");
        if (av) av.textContent = S.isSU ? "👑" : (name.trim().charAt(0).toUpperCase() || "E");
    }

    async function loadProfile() {
        if (!S.user) return false;
        syncBranch();
        const email = String(S.user.email || "").toLowerCase().trim();
        evalSU();
        let defaultName = S.role;
        if (email === SUPER[0]) defaultName = "Jaquelin Chaidez Reyes";
        else if (email === SUPER[1]) defaultName = "Ignacio García La Fuente";
        else if (STAFF[email]) defaultName = STAFF[email].r;

        if (db) {
            try {
                const {data} = await safeQuery(db.from("profiles").select("*").eq("id", S.user.id).maybeSingle(), null, 1000);
                S.profile = data || {id: S.user.id, full_name: defaultName, email: email};
            } catch {
                S.profile = {id: S.user.id, full_name: defaultName, email: email};
            }
        } else {
            S.profile = {id: S.user.id, full_name: defaultName, email: email};
        }
        updateUI();
        renderSel();
        return true;
    }

    /* ── LOGOUT ── */
    async function logout() {
        const ok = await toastConfirm("¿Cerrar sesión de " + (S.profile?.full_name || S.user?.email) + "?");
        if (!ok) return;
        await db?.auth.signOut();
        S.user = null; S.profile = null; S.branchId = null;
        S.cart = []; S.products = [];
        document.getElementById("login-screen").style.display = "flex";
        document.getElementById("app-shell").style.display = "none";
        document.body.classList.add("login-active");
        toast("Sesión cerrada correctamente", "info");
    }
    window.logoutUser = logout;
    document.addEventListener("click", e => {
        if (e.target.closest("#logout-btn,#btn-logout,[data-logout]")) logout();
    });

    /* ── INVENTARIO CON SOPORTE INDEPENDIENTE POR SUCURSAL EN TIEMPO REAL ── */
    function getBranchInventoryKey(bId = null, bName = null) {
        const b = bName || S.branchName || "La Fuente Calzada";
        const norm = normalizeBranchName(b).replace(/\s+/g, "_");
        const id = String(bId || S.branchId || "branch-1").toLowerCase();
        return { id, norm, key: "inv_" + norm };
    }

    function saveBranchInv(customInv = null) {
        const invToSave = customInv || S.inv;
        const bk = getBranchInventoryKey();
        lw("inv", invToSave);
        gw("inv_" + (S.branchId || "x"), invToSave);
        gw("inv_" + bk.norm, invToSave);
        gw("inv_" + bk.id, invToSave);
        
        // Difundir en tiempo real a todas las pantallas activas
        if (realtimeChannel) {
            try {
                realtimeChannel.send({
                    type: "broadcast",
                    event: "inventory_updated",
                    payload: {
                        branch_id: S.branchId,
                        branch_name: S.branchName,
                        inv: invToSave
                    }
                });
            } catch(e) {}
        }
    }

    function initInv() { 
        const bk = getBranchInventoryKey();
        
        // 1. Intentar cargar stock guardado o ajustado explícitamente para esta sucursal
        let stored = lr("inv", null);
        if (!stored || typeof stored !== "object" || !Object.keys(stored).length) {
            stored = gr("inv_" + bk.id, null);
        }
        if (!stored || typeof stored !== "object" || !Object.keys(stored).length) {
            stored = gr("inv_" + bk.norm, null);
        }

        if (stored && typeof stored === "object" && Object.keys(stored).length) {
            S.inv = { ...stored };
        } else {
            // 2. Construir inventario base independiente para esta sucursal
            S.inv = {};
            
            S.products.forEach(p => {
                const maxS = getMaxStock(p);
                let baseStk = (p.initial_stock !== undefined && p.initial_stock !== null) ? Number(p.initial_stock) : Math.min(500, maxS);
                
                // Variación inicial proporcional e independiente por sucursal
                if (bk.norm.includes("tagarete_2") || (bk.norm.includes("tagarete") && bk.norm.includes("2"))) {
                    baseStk = Math.max(0, Math.floor(baseStk * 0.85));
                } else if (bk.norm.includes("cnop")) {
                    baseStk = Math.max(0, Math.floor(baseStk * 0.75));
                } else if (bk.norm.includes("mollotes")) {
                    baseStk = Math.max(0, Math.floor(baseStk * 0.90));
                } else if (bk.norm.includes("tagarete_1") || (bk.norm.includes("tagarete") && !bk.norm.includes("2"))) {
                    baseStk = Math.max(0, Math.floor(baseStk * 0.80));
                } else if (bk.norm.includes("calzada")) {
                    baseStk = Math.max(0, Math.floor(baseStk * 1.0));
                }
                
                S.inv[p.product_id] = baseStk;
            });

            // 3. Descontar las ventas reales que hayan realizado los usuarios/cajeras de ESTA sucursal
            const allSales = gr("all_sales", []);
            const branchSales = allSales.filter(s => matchesBranch(s, { id: S.branchId, name: S.branchName }) && String(s.status || "").toUpperCase() !== "CANCELLED");
            
            branchSales.forEach(sale => {
                if (Array.isArray(sale.items)) {
                    sale.items.forEach(item => {
                        const pid = String(item.product_id || item.id);
                        const qty = Number(item.quantity || item.qty || 1);
                        if (S.inv[pid] !== undefined) {
                            S.inv[pid] = Math.max(0, S.inv[pid] - qty);
                        }
                        // Descontar componentes de compuestos
                        const prod = S.products.find(p => String(p.product_id) === pid);
                        if (prod && prod.is_composite && Array.isArray(prod.components)) {
                            prod.components.forEach(comp => {
                                if (comp.supply_id && S.inv[comp.supply_id] !== undefined) {
                                    const cQty = (Number(comp.qty) || 1) * qty;
                                    S.inv[comp.supply_id] = Math.max(0, S.inv[comp.supply_id] - cQty);
                                }
                            });
                        }
                    });
                }
            });

            // Guardar para esta sucursal
            lw("inv", S.inv);
            gw("inv_" + bk.id, S.inv);
            gw("inv_" + bk.norm, S.inv);
        }
    }

    function getMaxStock(prodOrId) {
        let p = (typeof prodOrId === "object" && prodOrId) ? prodOrId : S.products.find(x => String(x.product_id) === String(prodOrId));
        if (p && (p.category === "desechables" || p.is_supply)) return 10000;
        return 500;
    }

    function getStock(id) { 
        if (S.inv[id] === undefined) {
            const prod = S.products.find(p => String(p.product_id) === String(id));
            const maxS = getMaxStock(prod);
            S.inv[id] = (prod && prod.initial_stock !== undefined && prod.initial_stock !== null) ? Number(prod.initial_stock) : Math.min(500, maxS); 
        }
        return S.inv[id]; 
    }

    function deductStock(id, qty = 1, name = "") { 
        // 1. Descontar el producto base
        const cur = getStock(id);
        S.inv[id] = Math.max(0, cur - qty); 

        // 2. Si es un Producto Compuesto, descontar automáticamente todos sus insumos/desechables asociados
        const prod = S.products.find(p => String(p.product_id) === String(id));
        if (prod && prod.is_composite && Array.isArray(prod.components) && prod.components.length) {
            prod.components.forEach(comp => {
                if (comp.supply_id) {
                    const compReq = (Number(comp.qty) || 1) * qty;
                    const compCur = getStock(comp.supply_id);
                    S.inv[comp.supply_id] = Math.max(0, compCur - compReq);
                }
            });
        }

        saveBranchInv(); 
        alertInv(); 
    }

    function addStock(id, qty = 1) { 
        const maxS = getMaxStock(id);
        S.inv[id] = Math.min(maxS, getStock(id) + qty); 
        saveBranchInv(); 
        alertInv(); 
    }

    function alertInv() {
        const banner = document.getElementById("inventory-alert-banner");
        if (!banner) return;
        const out = S.products.filter(p => !p.is_supply && getStock(p.product_id) === 0);
        const low = S.products.filter(p => !p.is_supply && getStock(p.product_id) > 0 && getStock(p.product_id) <= STOCK_LOW);
        const txt = document.getElementById("inventory-alert-text");
        if (out.length) {
            banner.style.display = "flex";
            if (txt) txt.textContent = "⚠ SIN STOCK: " + out.map(p => p.product_name).join(", ") + " — No se puede vender hasta reponer inventario.";
        } else if (low.length) {
            banner.style.display = "flex";
            if (txt) txt.textContent = "📉 Stock bajo (menos de " + STOCK_LOW + "): " + low.map(p => p.product_name).join(", ");
        } else {
            banner.style.display = "none";
        }
    }

    function checkBlock() { return S.cart.some(i => i.quantity > getStock(i.product_id)); }

    /* ── CATÁLOGO OFICIAL LA FUENTE & INSUMOS/DESECHABLES DE BODEGA ── */
    const DEFAULT_PRODUCTS = [
        // Productos terminados de venta
        { product_id: "adbc5511-68a8-4525-97a3-ac7972856e89", product_code: "CS", product_name: "Cono Sencillo", category: "helados", price: 25, branch_name: "General", initial_stock: 99, is_composite: true, components: [{supply_id: "sup_cono_sencillo", supply_name: "Cono Sencillo (Galleta)", qty: 1}, {supply_id: "sup_servilletas", supply_name: "Servilletas", qty: 1}] },
        { product_id: "a5c3b67a-c276-42f2-863f-a01c6f9294ed", product_code: "CDV", product_name: "Cono Doble Vainilla", category: "helados", price: 45, branch_name: "General", initial_stock: 100, is_composite: true, components: [{supply_id: "sup_cono_dv", supply_name: "Cono Doble Vainilla (Galleta)", qty: 1}, {supply_id: "sup_servilletas", supply_name: "Servilletas", qty: 1}] },
        { product_id: "adef0123-f92d-46ed-8797-2dfb46fb5b6d", product_code: "CDCH", product_name: "Cono Doble Chocolate", category: "helados", price: 45, branch_name: "General", initial_stock: 100, is_composite: true, components: [{supply_id: "sup_cono_dch", supply_name: "Cono Doble Chocolate (Galleta)", qty: 1}, {supply_id: "sup_servilletas", supply_name: "Servilletas", qty: 1}] },

        // Insumos y Desechables de Bodega (Paquetes / Bolsas y Unidades de referencia)
        { product_id: "sup_vaso_1lt", product_code: "VASO-1L", product_name: "Vaso 1 Lt (Transparente)", category: "desechables", price: 0, is_supply: true, units_per_package: 25, initial_stock: 125, branch_name: "General" },
        { product_id: "sup_tapa_1lt", product_code: "TAPA-1L", product_name: "Tapas Vaso 1 Lt", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 550, branch_name: "General" },
        { product_id: "sup_vaso_20", product_code: "VASO-20", product_name: "Vasos #20", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 500, branch_name: "General" },
        { product_id: "sup_tapa_20", product_code: "TAPA-20", product_name: "Tapas Vaso #20", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 550, branch_name: "General" },
        { product_id: "sup_vaso_half", product_code: "VASO-1/2L", product_name: "Vaso 1/2 Lt", category: "desechables", price: 0, is_supply: true, units_per_package: 25, initial_stock: 100, branch_name: "General" },
        { product_id: "sup_tapa_fresas", product_code: "TAPA-FRESA", product_name: "Tapas para Fresas", category: "desechables", price: 0, is_supply: true, units_per_package: 100, initial_stock: 100, branch_name: "General" },
        { product_id: "sup_vaso_6oz", product_code: "VASO-6OZ", product_name: "Vaso #6 oz", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 50, branch_name: "General" },
        { product_id: "sup_vaso_1lt_unicel", product_code: "VASO-1L-UNI", product_name: "Vaso 1 Lt Unicel", category: "desechables", price: 0, is_supply: true, units_per_package: 25, initial_stock: 50, branch_name: "General" },
        { product_id: "sup_vaso_14", product_code: "VASO-14", product_name: "Vaso #14", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 100, branch_name: "General" },
        { product_id: "sup_vaso_12", product_code: "VASO-12", product_name: "Vaso #12", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 150, branch_name: "General" },
        { product_id: "sup_vaso_4", product_code: "VASO-4", product_name: "Vaso #4", category: "desechables", price: 0, is_supply: true, units_per_package: 25, initial_stock: 25, branch_name: "General" },
        { product_id: "sup_charola_banana", product_code: "CHAR-BANANA", product_name: "Charola para Banana Split", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 83, branch_name: "General" },
        { product_id: "sup_tapa_unicel", product_code: "TAPA-UNI", product_name: "Tapas Vaso Unicel", category: "desechables", price: 0, is_supply: true, units_per_package: 100, initial_stock: 700, branch_name: "General" },
        { product_id: "sup_cucharas", product_code: "CUCHARA", product_name: "Cucharas para Nieve", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 250, branch_name: "General" },
        { product_id: "sup_tenedores", product_code: "TENEDOR", product_name: "Tenedores Desechables", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 200, branch_name: "General" },
        { product_id: "sup_servilletas", product_code: "SERVILLETAS", product_name: "Servilletas", category: "desechables", price: 0, is_supply: true, units_per_package: 100, initial_stock: 500, branch_name: "General" },
        { product_id: "sup_sabritas", product_code: "BOT-SAB", product_name: "Sabritas / Barcel (Botana)", category: "desechables", price: 0, is_supply: true, units_per_package: 1, initial_stock: 159, branch_name: "General" },
        { product_id: "sup_tostitos", product_code: "TOST-VERDE", product_name: "Tostitos Verdes", category: "desechables", price: 0, is_supply: true, units_per_package: 1, initial_stock: 7, branch_name: "General" },
        { product_id: "sup_doritos", product_code: "BOT-DOR", product_name: "Doritos", category: "desechables", price: 0, is_supply: true, units_per_package: 1, initial_stock: 27, branch_name: "General" },
        { product_id: "sup_cheetos", product_code: "BOT-CHE", product_name: "Cheetos", category: "desechables", price: 0, is_supply: true, units_per_package: 1, initial_stock: 35, branch_name: "General" },
        { product_id: "sup_cono_sencillo", product_code: "CONO-SENC", product_name: "Cono Sencillo (Galleta)", category: "desechables", price: 0, is_supply: true, units_per_package: 1, initial_stock: 99, branch_name: "General" },
        { product_id: "sup_cono_dv", product_code: "CONO-DV", product_name: "Cono Doble Vainilla (Galleta)", category: "desechables", price: 0, is_supply: true, units_per_package: 1, initial_stock: 70, branch_name: "General" },
        { product_id: "sup_cono_dch", product_code: "CONO-DCH", product_name: "Cono Doble Chocolate (Galleta)", category: "desechables", price: 0, is_supply: true, units_per_package: 1, initial_stock: 23, branch_name: "General" },
        { product_id: "sup_cono_trip", product_code: "CONO-TRIP", product_name: "Cono Triple (Galleta)", category: "desechables", price: 0, is_supply: true, units_per_package: 1, initial_stock: 63, branch_name: "General" }
    ];

    /* ── PRODUCTOS (CARGA DESDE SUPABASE Y CATÁLOGO AUTÉNTICO) ── */
    async function loadProducts() {
        let remoteProducts = [];
        if (db) {
            try {
                const {data} = await safeQuery(db.from("pos_products_final_view").select("*").eq("is_active", true).order("product_name"), null, 1200);
                remoteProducts = data || [];
            } catch(e) {}
            if (!remoteProducts.length) {
                try {
                    const {data} = await safeQuery(db.from("products").select("*").eq("is_active", true).order("product_name"), null, 1000);
                    remoteProducts = data || [];
                } catch(e2) {}
            }
        }

        const customProds = gr("custom_products", []);
        const deletedIds  = gr("deleted_product_ids", []);
        const combinedMap = new Map();

        // 1. Iniciar con el catálogo base e insumos oficiales
        DEFAULT_PRODUCTS.forEach(p => {
            if (!deletedIds.includes(String(p.product_id))) {
                combinedMap.set(String(p.product_id), { ...p });
            }
        });

        // 2. Cargar productos remotos de Supabase si existen
        if (remoteProducts.length) {
            remoteProducts.forEach(p => {
                const pid = String(p.product_id || p.id);
                if (!deletedIds.includes(pid)) {
                    let cat = String(p.category || p.product_category || "helados").toLowerCase().trim();
                    const pName = String(p.product_name || "").toLowerCase();
                    if (cat.includes("preparad") || pName.includes("esquite") || pName.includes("nacho") || pName.includes("tosti") || pName.includes("fresas con crema")) cat = "preparados";
                    else if (cat.includes("helad") || pName.includes("cono") || pName.includes("nieve") || pName.includes("vaso")) cat = "helados";
                    else if (cat.includes("agua") || pName.includes("agua") || pName.includes("horchata") || pName.includes("jamaica")) cat = "aguas";
                    else if (cat.includes("postre") || pName.includes("flan") || pName.includes("pay") || pName.includes("pastel")) cat = "postres";
                    else if (cat.includes("dulce") || pName.includes("boli")) cat = "dulces";
                    else if (cat.includes("desechable")) cat = "desechables";
                    else if (cat.includes("congelado")) cat = "congelados";
                    else if (!cat || cat.length > 20) cat = "helados";

                    let existing = combinedMap.get(pid) || {};

                    combinedMap.set(pid, {
                        ...existing,
                        product_id: pid,
                        product_name: p.product_name,
                        product_code: p.product_code || p.code || existing.product_code || "",
                        category: cat,
                        price: Number(p.price || 0),
                        image_url: p.image_url || existing.image_url || null,
                        branch_id: p.branch_id || existing.branch_id || "all",
                        branch_name: p.branch_name || existing.branch_name || "General",
                        initial_stock: p.stock != null ? Number(p.stock) : existing.initial_stock,
                        is_composite: (p.is_composite !== undefined) ? p.is_composite : existing.is_composite,
                        components: p.components || existing.components || [],
                        is_supply: (p.is_supply !== undefined) ? p.is_supply : (cat === "desechables"),
                        units_per_package: p.units_per_package || existing.units_per_package || (cat === "desechables" ? 50 : 1)
                    });
                }
            });
        }

        // 3. Fusionar productos personalizados creados por los administradores
        customProds.forEach(p => {
            const pid = String(p.product_id);
            if (!deletedIds.includes(pid)) {
                let existing = combinedMap.get(pid) || {};
                combinedMap.set(pid, {
                    ...existing,
                    ...p,
                    product_id: pid,
                    product_name: p.product_name,
                    product_code: p.product_code || existing.product_code || "",
                    category: (p.category || existing.category || "helados").toLowerCase().trim(),
                    price: Number(p.price != null ? p.price : (existing.price || 0)),
                    image_url: p.image_url || existing.image_url || null,
                    branch_id: p.branch_id || existing.branch_id || "all",
                    branch_name: p.branch_name || existing.branch_name || "General",
                    initial_stock: p.stock != null ? Number(p.stock) : existing.initial_stock,
                    is_composite: !!p.is_composite,
                    components: Array.isArray(p.components) ? p.components : (existing.components || []),
                    is_supply: !!p.is_supply,
                    units_per_package: Number(p.units_per_package || existing.units_per_package || 1)
                });
            }
        });

        S.products = Array.from(combinedMap.values()).sort((a,b) => {
            if (a.is_supply !== b.is_supply) return a.is_supply ? 1 : -1;
            return a.product_name.localeCompare(b.product_name);
        });

        initInv();
        renderCatTabs();
        renderPOS(filtered());
        alertInv();
        return S.products;
    }

    function filtered() {
        let p = S.products;
        
        // En el POS no mostramos los insumos puros para venta directa a menos que estén en desechables
        if (S.cat !== "desechables") {
            p = p.filter(x => !x.is_supply || x.price > 0);
        }

        // Mostrar productos generales en todas las sucursales o productos exclusivos por sucursal
        if (S.branchId || S.branchName) {
            p = p.filter(x => {
                const isGen = !x.branch_name || x.branch_name === "General" || x.branch_id === "all" || !x.branch_id || x.branch_name === "La Fuente Calzada" || x.branch_name === "La Fuente";
                if (isGen) return true;
                return matchesBranch({ branch_id: x.branch_id, branch_name: x.branch_name }, { id: S.branchId, name: S.branchName });
            });
        }

        if (S.cat !== "all") {
            p = p.filter(x => String(x.category || "").toLowerCase() === S.cat);
        }
        if (S.q.trim()) {
            const q = S.q.toLowerCase();
            p = p.filter(x => String(x.product_name||"").toLowerCase().includes(q) || String(x.product_code||"").toLowerCase().includes(q));
        }
        return p;
    }

    function renderCatTabs() {
        const c = document.getElementById("category-tabs");
        if (!c) return;
        c.innerHTML = CATS.map(cat => {
            const a = S.cat === cat.id;
            return `<button type="button" class="cat-tab${a ? " cat-tab-active" : ""}" data-cat="${cat.id}">
                <span>${cat.e}</span> <span>${cat.label}</span>
            </button>`;
        }).join("");
        c.querySelectorAll(".cat-tab").forEach(btn => btn.addEventListener("click", () => {
            S.cat = btn.dataset.cat;
            renderCatTabs();
            renderPOS(filtered());
        }));
    }

    function renderPOS(products) {
        const c = $("#products-grid");
        if (!c) return;
        if (!products.length) {
            c.innerHTML = `<div class="empty-state" style="grid-column:1/-1;padding:34px;text-align:center">
                <div style="font-size:42px">🍦</div>
                <p style="color:var(--text-muted);font-size:14px;margin-top:6px">No hay productos en esta categoría.</p></div>`;
            return;
        }
        c.innerHTML = products.map(p => {
            const stock = getStock(p.product_id);
            const isOut = stock === 0;
            const isLow = stock > 0 && stock <= STOCK_LOW;
            return `<button type="button" class="product-card${isOut ? " product-out-of-stock" : ""}"
                data-pid="${esc(p.product_id)}"${isOut ? ' disabled title="Sin stock — Reponer en Inventario"' : ""}>
                <div class="product-image">${p.image_url
                    ? `<img src="${esc(p.image_url)}" alt="${esc(p.product_name)}">`
                    : '<div class="product-placeholder">🍦</div>'}</div>
                <div class="product-info">
                    <small>${esc(p.product_code || "")} • ${esc(p.category || "General")}</small>
                    <strong>${esc(p.product_name)}</strong>
                    <span>${money(p.price)}</span>
                    ${isOut ? '<span style="font-size:10px;color:#b91c1c;font-weight:900;display:block;margin-top:3px">SIN STOCK</span>' : ""}
                    ${isLow ? `<span style="font-size:10px;color:#b45309;font-weight:900;display:block;margin-top:3px">⚠ Quedan ${stock} uds.</span>` : ""}
                </div></button>`;
        }).join("");
        c.querySelectorAll(".product-card:not([disabled])").forEach(btn =>
            btn.addEventListener("click", () => addToCart(btn.dataset.pid))
        );
    }

    /* ── CARRITO & COBRO DE ÓRDENES ── */
    function addToCart(pid) {
        const p = S.products.find(x => String(x.product_id) === String(pid));
        if (!p) return;
        const stock = getStock(pid);
        if (stock <= 0) {
            toast("'" + p.product_name + "' no tiene stock disponible (0 unidades). Repón inventario para poder vender.", "error", 4000);
            return;
        }
        const ex = S.cart.find(i => String(i.product_id) === String(pid));
        const qty = ex ? ex.quantity : 0;
        if (qty >= stock) {
            toast("Solo hay " + stock + " unidades de '" + p.product_name + "' en inventario (Máx 500).", "warn", 3500);
            return;
        }
        if (ex) ex.quantity++;
        else S.cart.push({product_id: p.product_id, product_name: p.product_name, price: Number(p.price||0), quantity: 1});
        renderCart();
    }

    function renderCart() {
        const c = $("#order-items");
        if (!c) return;
        if (!S.cart.length) {
            c.innerHTML = '<div class="empty-cart" style="text-align:center;padding:30px;color:var(--text-muted)">🛒 Orden vacía</div>';
            setT("#subtotal,#total,#pay-total", money(0));
            const payBtn = $("#pay-button");
            if (payBtn) { payBtn.disabled = true; payBtn.style.opacity = "0.6"; }
            return;
        }

        const total = S.cart.reduce((s,i) => s + (i.price * i.quantity), 0);
        c.innerHTML = S.cart.map((item, idx) => {
            const stock = getStock(item.product_id);
            const over = item.quantity > stock;
            return `
            <div class="order-item${over ? " item-overstock" : ""}" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                <div style="flex:1;min-width:0;padding-right:10px;">
                    <div style="font-weight:800;font-size:13px;color:var(--wine-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(item.product_name)}</div>
                    <div style="font-size:11px;color:var(--gold-600);font-weight:700;">${money(item.price)} c/u ${over ? '<span style="color:#dc2626;">(Excede stock ' + stock + ')</span>' : ''}</div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;">
                    <button type="button" class="btn-qty-minus" data-idx="${idx}" style="width:26px;height:26px;border-radius:6px;border:1px solid #d1d5db;background:#fff;font-weight:900;cursor:pointer;">-</button>
                    <span style="font-weight:800;font-size:13px;min-width:18px;text-align:center;">${item.quantity}</span>
                    <button type="button" class="btn-qty-plus" data-idx="${idx}" style="width:26px;height:26px;border-radius:6px;border:1px solid #d1d5db;background:#fff;font-weight:900;cursor:pointer;">+</button>
                    <button type="button" class="btn-qty-del" data-idx="${idx}" style="width:26px;height:26px;border-radius:6px;border:none;background:#fee2e2;color:#dc2626;font-weight:900;cursor:pointer;margin-left:4px;">✕</button>
                </div>
            </div>`;
        }).join("");

        setT("#subtotal,#total,#pay-total", money(total));

        const payBtn = $("#pay-button");
        const blocked = checkBlock();
        if (payBtn) {
            payBtn.disabled = blocked;
            payBtn.style.opacity = blocked ? "0.6" : "1";
        }

        c.querySelectorAll(".btn-qty-minus").forEach(btn => btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.idx);
            if (S.cart[idx]) {
                S.cart[idx].quantity--;
                if (S.cart[idx].quantity <= 0) S.cart.splice(idx, 1);
                renderCart();
            }
        }));

        c.querySelectorAll(".btn-qty-plus").forEach(btn => btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.idx);
            if (S.cart[idx]) {
                const stock = getStock(S.cart[idx].product_id);
                if (S.cart[idx].quantity >= stock) {
                    return toast("Stock máximo alcanzado (" + stock + ").", "warn");
                }
                S.cart[idx].quantity++;
                renderCart();
            }
        }));

        c.querySelectorAll(".btn-qty-del").forEach(btn => btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.idx);
            if (S.cart[idx]) {
                S.cart.splice(idx, 1);
                renderCart();
            }
        }));
    }

    async function processSale() {
        if (!S.cart.length) return toast("No hay productos en la orden.", "warn");
        if (checkBlock())   return toast("Hay productos sin stock suficiente. Revisa el inventario antes de cobrar.", "error");
        const total = S.cart.reduce((s,i) => s + (i.price * i.quantity), 0);

        // Selección de método de pago interactiva (Efectivo vs Tarjeta)
        const payMethod = await toastPaymentMethod(total);
        if (!payMethod) return;

        const cashierEmail = S.user?.email || "";
        const cashierName = S.profile?.full_name || cashierEmail || "Encargada";

        const saleRecord = {
            id: "sale_" + Date.now() + "_" + Math.random().toString(36).substring(2,7),
            sale_number: "TICK-" + Math.floor(100000 + Math.random() * 900000),
            branch_id: S.branchId,
            branch_name: S.branchName,
            shift_name: S.shift,
            cashier_id: S.user?.id || "offline",
            cashier_name: cashierEmail ? (cashierName + " (" + cashierEmail + ")") : cashierName,
            total: total,
            payment_method: payMethod,
            status: "COMPLETADA",
            items: S.cart.map(i => ({product_id: i.product_id, product_name: i.product_name, quantity: i.quantity, price: i.price, subtotal: i.price*i.quantity})),
            created_at: now()
        };

        // 1. GUARDADO LOCAL INSTANTÁNEO
        const localSales = lr("sales", []);
        localSales.unshift(saleRecord);
        lw("sales", localSales);

        const allGlobalSales = gr("all_sales", []);
        allGlobalSales.unshift(saleRecord);
        gw("all_sales", allGlobalSales);

        // Guardar última venta registrada para impresión física directa
        lw("last_printed_sale", saleRecord);
        gw("last_printed_sale", saleRecord);

        // 2. ACTUALIZACIÓN INMEDIATA DE LA UI
        const cartItemsSnapshot = [...S.cart];
        cartItemsSnapshot.forEach(i => deductStock(i.product_id, i.quantity, i.product_name));
        S.cart = [];
        renderCart();
        renderPOS(filtered());
        alertInv();
        const payLabel = payMethod === "card" ? "💳 TARJETA" : "💵 EFECTIVO";
        toast("✓ Venta de " + money(total) + " cobrada en " + payLabel + ". Ticket #" + saleRecord.sale_number, "success", 3000);

        // 3. IMPRESIÓN OBLIGATORIA E INMEDIATA DEL TICKET (USB, BLUETOOTH O NAVEGADOR)
        try {
            printSaleReceipt(saleRecord);
        } catch(e) {
            console.warn("Auto-impresión de ticket:", e);
        }

        // 3. SINCRONIZACIÓN ASÍNCRONA EN SEGUNDO PLANO
        (async () => {
            if (db) {
                try {
                    const fallbackUUID = "51bc275d-4e19-4115-be3f-42c0ce3dae5a";
                    const defaultBranchUUID = "c188dd82-7faf-41b8-948b-af8e789facba";
                    const defaultUserUUID = "4710b330-566c-45c7-a92e-b7b6a62355af";

                    const bId = uuid(S.branchId) ? S.branchId : defaultBranchUUID;
                    const cId = uuid(S.companyId) ? S.companyId : fallbackUUID;
                    const uId = uuid(S.user?.id) ? S.user.id : defaultUserUUID;

                    const observationsObj = {
                        branch_name: S.branchName,
                        shift_name: S.shift,
                        cashier_name: saleRecord.cashier_name,
                        payment_method: payMethod,
                        items: saleRecord.items,
                        local_id: saleRecord.id
                    };

                    const insertPayload = {
                        company_id: cId,
                        branch_id: bId,
                        user_id: uId,
                        sale_number: saleRecord.sale_number,
                        subtotal: total,
                        discount: 0,
                        tax: 0,
                        total: total,
                        status: "COMPLETED",
                        observations: JSON.stringify(observationsObj),
                        created_at: saleRecord.created_at
                    };

                    if (uuid(S.currentShift?.id)) {
                        insertPayload.shift_id = S.currentShift.id;
                    }

                    const { data, error } = await db.from("sales").insert(insertPayload).select();

                    if (!error && data && data.length) {
                        const syncedIds = new Set(gr("synced_sales_ids", []));
                        syncedIds.add(String(saleRecord.id));
                        if (data[0]?.id) syncedIds.add(String(data[0].id));
                        gw("synced_sales_ids", Array.from(syncedIds));
                    } else if (error) {
                        console.warn("Venta pendiente de sincronizar en cola:", error);
                    }
                } catch(e) {
                    console.warn("Red lenta/offline, guardado en cola para reintentar:", e);
                }
            }
            syncPendingSalesToSupabase();
        })();
    }

    /* ── MOTOR UNIVERSAL DE IMPRESIÓN DIRECTA & FÍSICA (USB, SERIAL, BLUETOOTH & NAVEGADOR) ── */
    let directUsbDevice = null;
    let directUsbEndpoint = 1;
    let directSerialPort = null;
    let directSerialWriter = null;
    let directBtDevice = null;
    let directBtServer = null;
    let directBtChar = null;

    function getPrinterConfig() {
        try {
            const raw = localStorage.getItem("lf_printer_config");
            if (raw) return JSON.parse(raw);
        } catch(e) {}
        return {
            model: "POS-58 / EC Line (58mm)",
            paperWidth: "58mm",
            autoPrint: true,
            connectionType: "auto"
        };
    }

    function savePrinterConfig(cfg) {
        try {
            localStorage.setItem("lf_printer_config", JSON.stringify(cfg));
        } catch(e) {}
    }

    function getPrinterConnectionStatus() {
        if (directSerialPort && directSerialPort.writable) return { type: "serial", name: "Puerto Serie USB", label: "⚡ Conectado por Puerto USB / Serie" };
        if (directUsbDevice && directUsbDevice.opened) return { type: "usb", name: directUsbDevice.productName || "Impresora USB", label: "🟢 Conectado por Cable USB (WebUSB)" };
        if (directBtChar && directBtServer && directBtServer.connected) return { type: "bt", name: directBtDevice?.name || "Impresora Bluetooth", label: "🔵 Conectado por Bluetooth" };
        return { type: "browser", name: "Impresora del Sistema", label: "🖨️ Modo Impresión del Sistema (Windows / Android)" };
    }

    // Generador de comandos ESC/POS binarios para Ticket de Venta
    function buildEscPosTicket(s) {
        const encoder = new TextEncoder();
        const parts = [];
        const isCard = s.payment_method === "card";
        const width = 32;

        const initCmd = new Uint8Array([0x1B, 0x40]); // ESC @
        const centerCmd = new Uint8Array([0x1B, 0x61, 0x01]); // ESC a 1
        const leftCmd = new Uint8Array([0x1B, 0x61, 0x00]); // ESC a 0
        const boldOn = new Uint8Array([0x1B, 0x45, 0x01]); // ESC E 1
        const boldOff = new Uint8Array([0x1B, 0x45, 0x00]); // ESC E 0
        const cutCmd = new Uint8Array([0x1D, 0x56, 0x41, 0x10]); // GS V A 16
        const feedCmd = new Uint8Array([0x1B, 0x64, 0x04]); // ESC d 4

        parts.push(initCmd);
        parts.push(centerCmd, boldOn, encoder.encode("NEVERIA LA FUENTE\n"), boldOff);
        parts.push(encoder.encode("-- DESDE 1962 --\n"));
        parts.push(encoder.encode("PALETERIA Y NEVERIA ARTESANAL\n"));
        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(leftCmd);
        parts.push(encoder.encode("SUCURSAL: " + (s.branch_name || S.branchName) + "\n"));
        parts.push(encoder.encode("TURNO:    " + (s.shift_name || S.shift) + "\n"));
        parts.push(encoder.encode("FECHA:    " + fdt(s.created_at) + "\n"));
        parts.push(encoder.encode("ATENDIO:  " + (s.cashier_name || "Encargada") + "\n"));
        parts.push(encoder.encode("TICKET:   #" + (s.sale_number || "") + "\n"));
        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(boldOn, encoder.encode("CANT  DESCRIPCION         TOTAL\n"), boldOff);
        parts.push(encoder.encode("--------------------------------\n"));

        (s.items || []).forEach(i => {
            const qtyStr = (i.quantity + "x ").padEnd(4, " ");
            const subtotalStr = money(i.subtotal != null ? i.subtotal : (i.price * i.quantity)).padStart(9, " ");
            const maxDescLen = width - 4 - 9;
            const descStr = (i.product_name || "Producto").substring(0, maxDescLen).padEnd(maxDescLen, " ");
            parts.push(encoder.encode(qtyStr + descStr + subtotalStr + "\n"));
        });

        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(boldOn, encoder.encode("TOTAL: " + money(s.total).padStart(width - 7, " ") + "\n"), boldOff);
        parts.push(encoder.encode("PAGO:  " + (isCard ? "TARJETA" : "EFECTIVO").padStart(width - 7, " ") + "\n"));
        parts.push(encoder.encode("================================\n"));
        parts.push(centerCmd, boldOn, encoder.encode("¡GRACIAS POR SU COMPRA!\n"), boldOff);
        parts.push(encoder.encode("Conserve este ticket\n\n\n\n"));
        parts.push(cutCmd, feedCmd);

        const totalLen = parts.reduce((acc, p) => acc + p.length, 0);
        const combined = new Uint8Array(totalLen);
        let offset = 0;
        for (const p of parts) {
            combined.set(p, offset);
            offset += p.length;
        }
        return combined;
    }

    // Generador de comandos ESC/POS binarios para Ticket de Prueba
    function buildEscPosTestTicket() {
        const encoder = new TextEncoder();
        const parts = [];
        const initCmd = new Uint8Array([0x1B, 0x40]);
        const centerCmd = new Uint8Array([0x1B, 0x61, 0x01]);
        const leftCmd = new Uint8Array([0x1B, 0x61, 0x00]);
        const boldOn = new Uint8Array([0x1B, 0x45, 0x01]);
        const boldOff = new Uint8Array([0x1B, 0x45, 0x00]);
        const cutCmd = new Uint8Array([0x1D, 0x56, 0x41, 0x10]);
        const feedCmd = new Uint8Array([0x1B, 0x64, 0x04]);

        parts.push(initCmd);
        parts.push(centerCmd, boldOn, encoder.encode("NEVERIA LA FUENTE\n"), boldOff);
        parts.push(encoder.encode("PRUEBA DE IMPRESION FISICA\n"));
        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(leftCmd);
        parts.push(encoder.encode("SUCURSAL: " + S.branchName + "\n"));
        parts.push(encoder.encode("FECHA:    " + fdt(now()) + "\n"));
        parts.push(encoder.encode("USUARIO:  " + (S.profile?.full_name || S.user?.email || "Encargada") + "\n"));
        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(centerCmd, boldOn, encoder.encode("¡IMPRESORA CALIBRADA!\n"), boldOff);
        parts.push(encoder.encode("Conexion fisica exitosa\n"));
        parts.push(encoder.encode("1234567890 ABCDEFGHIJKLMNOP\n"));
        parts.push(encoder.encode("================================\n\n\n\n"));
        parts.push(cutCmd, feedCmd);

        const totalLen = parts.reduce((acc, p) => acc + p.length, 0);
        const combined = new Uint8Array(totalLen);
        let offset = 0;
        for (const p of parts) {
            combined.set(p, offset);
            offset += p.length;
        }
        return combined;
    }

    async function writeEscPosBytes(bytes) {
        // 1. Intentar por Puerto Serial / USB (WebSerial)
        if (directSerialPort && directSerialPort.writable) {
            try {
                if (!directSerialWriter) {
                    directSerialWriter = directSerialPort.writable.getWriter();
                }
                await directSerialWriter.write(bytes);
                directSerialWriter.releaseLock();
                directSerialWriter = null;
                console.log("✓ Impresión física completada por Puerto Serial/USB");
                return true;
            } catch(e) {
                console.warn("Error en Serial Writer:", e);
                try { if (directSerialWriter) directSerialWriter.releaseLock(); } catch(err) {}
                directSerialWriter = null;
            }
        }

        // 2. Intentar por WebUSB directo
        if (directUsbDevice && directUsbDevice.opened) {
            try {
                await directUsbDevice.transferOut(directUsbEndpoint || 1, bytes);
                console.log("✓ Impresión física completada por WebUSB");
                return true;
            } catch(e) {
                console.warn("Error en WebUSB transferOut:", e);
            }
        }

        // 3. Intentar por Bluetooth directo
        if (directBtChar && directBtServer && directBtServer.connected) {
            try {
                const chunkSize = 512;
                for (let i = 0; i < bytes.length; i += chunkSize) {
                    const chunk = bytes.slice(i, i + chunkSize);
                    if (directBtChar.writeValueWithoutResponse) {
                        await directBtChar.writeValueWithoutResponse(chunk);
                    } else {
                        await directBtChar.writeValue(chunk);
                    }
                }
                console.log("✓ Impresión física completada por Bluetooth");
                return true;
            } catch(e) {
                console.warn("Error en Bluetooth write:", e);
            }
        }

        return false;
    }

    function triggerUniversalPrint(htmlContent) {
        const printWin = window.open("", "_blank", "width=380,height=600");
        if (printWin) {
            printWin.document.open();
            printWin.document.write(htmlContent);
            printWin.document.close();
        }
    }

    // 1. Conectar por WebSerial (Puerto USB COM en Windows - 100% infalible)
    async function connectSerialDirect() {
        if (!navigator.serial) {
            toast("WebSerial no está soportado en este navegador. Usa Google Chrome o Microsoft Edge en Windows.", "warn", 5000);
            return false;
        }
        try {
            toast("⚡ Selecciona el puerto USB de tu impresora en la lista…", "info", 4000);
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            directSerialPort = port;
            const cfg = getPrinterConfig();
            cfg.connectionType = "serial";
            savePrinterConfig(cfg);
            toast("✓ Conectado exitosamente a la impresora por Puerto USB / Serie.", "success", 5000);
            return true;
        } catch(err) {
            console.warn("Serial connect error:", err);
            if (err.name !== "NotFoundError") toast("Error al conectar por puerto USB: " + err.message, "error", 4000);
            return false;
        }
    }

    // 2. Conectar por WebUSB directo
    async function connectUsbDirect() {
        if (!navigator.usb) {
            toast("WebUSB no disponible. Usa Chrome o Edge en Windows/Android.", "warn", 5000);
            return false;
        }
        try {
            toast("🔌 Selecciona tu impresora en la ventana emergente de USB…", "info", 4000);
            const device = await navigator.usb.requestDevice({ filters: [] });
            await device.open();
            if (device.configuration === null) await device.selectConfiguration(1);
            try { await device.claimInterface(0); } catch(e) {}
            let epNum = 1;
            if (device.configuration && device.configuration.interfaces) {
                for (const iface of device.configuration.interfaces) {
                    for (const alt of iface.alternates) {
                        for (const ep of alt.endpoints) {
                            if (ep.direction === "out") {
                                epNum = ep.endpointNumber;
                                break;
                            }
                        }
                    }
                }
            }
            directUsbDevice = device;
            directUsbEndpoint = epNum;
            const cfg = getPrinterConfig();
            cfg.connectionType = "usb";
            savePrinterConfig(cfg);
            toast("✓ Conectado por Cable USB a " + (device.productName || "Impresora Térmica"), "success", 5000);
            return true;
        } catch(err) {
            console.warn("USB connect error:", err);
            if (err.name !== "NotFoundError") toast("Error al vincular USB: " + err.message, "error", 4000);
            return false;
        }
    }

    // 3. Conectar por Web Bluetooth
    async function connectBtDirect() {
        if (!navigator.bluetooth) {
            toast("Bluetooth Web no disponible. Activa Bluetooth y usa Google Chrome.", "warn", 5000);
            return false;
        }
        try {
            toast("📶 Buscando impresoras Bluetooth térmicas cercanas…", "info", 4000);
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [
                    "000018f0-0000-1000-8000-00805f9b34fb",
                    "0000e0ff-0000-1000-8000-00805f9b34fb",
                    "49535343-fe7d-41aa-8d9b-06ec680ca597",
                    "e7810a71-73ae-499d-8c15-faa9aef0c3f2"
                ]
            });
            const server = await device.gatt.connect();
            directBtDevice = device;
            directBtServer = server;

            const services = await server.getPrimaryServices();
            for (const service of services) {
                const chars = await service.getCharacteristics();
                for (const char of chars) {
                    if (char.properties.write || char.properties.writeWithoutResponse) {
                        directBtChar = char;
                        break;
                    }
                }
                if (directBtChar) break;
            }

            const cfg = getPrinterConfig();
            cfg.connectionType = "bluetooth";
            savePrinterConfig(cfg);
            toast("✓ Conectado por Bluetooth a " + (device.name || "Impresora Térmica"), "success", 5000);
            return true;
        } catch(err) {
            console.warn("Bluetooth connect error:", err);
            if (err.name !== "NotFoundError") toast("Error al vincular Bluetooth: " + err.message, "error", 4000);
            return false;
        }
    }

    async function printSaleReceipt(s) {
        if (!s) return;
        
        // 1. Intentar envío físico directo ESC/POS (cero diálogos, impresión instantánea)
        if ((directSerialPort && directSerialPort.writable) || (directUsbDevice && directUsbDevice.opened) || (directBtChar && directBtServer && directBtServer.connected)) {
            const raw = buildEscPosTicket(s);
            const ok = await writeEscPosBytes(raw);
            if (ok) return;
        }

        // 2. Fallback por diálogo de impresión del sistema
        const cfg = getPrinterConfig();
        const pWidth = cfg.paperWidth || "58mm";
        const isCard = s.payment_method === "card";

        const ticketHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ticket #${esc(s.sale_number)}</title>
    <style>
        @page { margin: 0; size: auto; }
        body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 11px;
            color: #000;
            background: #fff;
            width: ${pWidth};
            max-width: ${pWidth};
            margin: 0 auto;
            padding: 6px 4px;
            box-sizing: border-box;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        .row { display: flex; justify-content: space-between; margin: 2px 0; }
        @media print {
            body { width: 100%; max-width: 100%; margin: 0; padding: 2mm; }
        }
    </style>
</head>
<body onload="window.print(); setTimeout(function(){ window.close(); }, 700);">
    <div class="center bold" style="font-size:14px;">NEVERIA LA FUENTE</div>
    <div class="center" style="font-size:9px;">-- DESDE 1962 --</div>
    <div class="center" style="font-size:10px;">PALETERIA Y NEVERIA ARTESANAL</div>
    <div class="divider"></div>
    <div><strong>SUCURSAL:</strong> ${esc(s.branch_name || S.branchName)}</div>
    <div><strong>TURNO:</strong> ${esc(s.shift_name || S.shift)}</div>
    <div><strong>FECHA:</strong> ${fdt(s.created_at)}</div>
    <div><strong>ATENDIÓ:</strong> ${esc(s.cashier_name || "Encargada")}</div>
    <div><strong>TICKET:</strong> #${esc(s.sale_number)}</div>
    <div class="divider"></div>
    <div class="row bold" style="font-size:10px;">
        <span>CANT / DESCRIPCION</span>
        <span>IMPORTE</span>
    </div>
    <div class="divider"></div>
    ${(s.items || []).map(i => `
        <div class="row">
            <span>${i.quantity}x ${esc(i.product_name)}</span>
            <span>${money(i.subtotal != null ? i.subtotal : (i.price * i.quantity))}</span>
        </div>
    `).join("")}
    <div class="divider"></div>
    <div class="row bold" style="font-size:13px;">
        <span>TOTAL:</span>
        <span>${money(s.total)}</span>
    </div>
    <div class="row">
        <span>FORMA DE PAGO:</span>
        <span>${isCard ? "TARJETA (DEB/CRE)" : "EFECTIVO"}</span>
    </div>
    <div class="double-divider"></div>
    <div class="center bold" style="margin-top:6px;font-size:10px;">
        ¡GRACIAS POR SU COMPRA!
    </div>
    <div class="center" style="font-size:9px;">
        Conserve este ticket para cualquier aclaración
    </div>
    <div style="height: 18mm;"></div>
</body>
</html>`;

        triggerUniversalPrint(ticketHtml);
    }

    // Generador de comandos ESC/POS binarios para Corte de Caja
    function buildEscPosCutTicket(ct) {
        const encoder = new TextEncoder();
        const parts = [];
        const width = 32;
        const diff = Number(ct.difference || 0);
        const diffLabel = diff > 0 ? ("+" + money(diff) + " Sobrante") : diff < 0 ? (money(diff) + " Faltante") : "$0.00 Exacto";
        const isMorning = String(ct.shift || ct.shift_name || "").toLowerCase().includes("mañ") || String(ct.shift || ct.shift_name || "").toLowerCase().includes("mat");
        const shiftLabel = isMorning ? "MATUTINO (MANANA)" : "VESPERTINO (TARDE)";

        const initCmd = new Uint8Array([0x1B, 0x40]);
        const centerCmd = new Uint8Array([0x1B, 0x61, 0x01]);
        const leftCmd = new Uint8Array([0x1B, 0x61, 0x00]);
        const boldOn = new Uint8Array([0x1B, 0x45, 0x01]);
        const boldOff = new Uint8Array([0x1B, 0x45, 0x00]);
        const cutCmd = new Uint8Array([0x1D, 0x56, 0x41, 0x10]);
        const feedCmd = new Uint8Array([0x1B, 0x64, 0x04]);

        parts.push(initCmd);
        parts.push(centerCmd, boldOn, encoder.encode("NEVERIA LA FUENTE\n"), boldOff);
        parts.push(encoder.encode("CORTE DE CAJA OFICIAL\n"));
        parts.push(encoder.encode("-- DESDE 1962 --\n"));
        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(leftCmd);
        parts.push(encoder.encode("SUCURSAL: " + (ct.branch_name || S.branchName) + "\n"));
        parts.push(encoder.encode("TURNO:    " + shiftLabel + "\n"));
        parts.push(encoder.encode("FECHA:    " + fdt(ct.created_at) + "\n"));
        parts.push(encoder.encode("ENCARGADA:" + (ct.performed_by_name || "Encargada") + "\n"));
        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(boldOn, encoder.encode("DESGLOSE FINANCIERO:\n"), boldOff);
        parts.push(encoder.encode("Fondo Inicial:  " + money(ct.opening_amount || 0).padStart(16, " ") + "\n"));
        parts.push(encoder.encode("Ventas Efectivo:" + money(ct.cash_sales || 0).padStart(16, " ") + "\n"));
        parts.push(encoder.encode("Ventas Tarjeta: " + money(ct.card_sales || 0).padStart(16, " ") + "\n"));
        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(boldOn, encoder.encode("TOTAL VENDIDO:  " + money(ct.total_sales || 0).padStart(16, " ") + "\n"), boldOff);
        parts.push(encoder.encode("--------------------------------\n"));
        parts.push(boldOn, encoder.encode("ARQUEO DE CAJA:\n"), boldOff);
        parts.push(encoder.encode("Esperado:       " + money(ct.expected_cash || 0).padStart(16, " ") + "\n"));
        parts.push(boldOn, encoder.encode("Contado Fisico: " + money(ct.counted_cash || 0).padStart(16, " ") + "\n"), boldOff);
        parts.push(boldOn, encoder.encode("CORTE NETO ENT: " + money(ct.net_sales_without_fund != null ? ct.net_sales_without_fund : (ct.counted_cash - ct.opening_amount)).padStart(16, " ") + "\n"), boldOff);
        parts.push(encoder.encode("Diferencia:     " + diffLabel.padStart(16, " ") + "\n"));
        parts.push(encoder.encode("================================\n\n"));
        parts.push(centerCmd);
        parts.push(encoder.encode("___________________________\n"));
        parts.push(encoder.encode("Firma Encargada\n\n"));
        parts.push(encoder.encode("___________________________\n"));
        parts.push(encoder.encode("Firma Direccion\n\n\n\n"));
        parts.push(cutCmd, feedCmd);

        const totalLen = parts.reduce((acc, p) => acc + p.length, 0);
        const combined = new Uint8Array(totalLen);
        let offset = 0;
        for (const p of parts) {
            combined.set(p, offset);
            offset += p.length;
        }
        return combined;
    }

    async function printCutReceipt(ct) {
        if (!ct) return;

        // 1. Intentar impresión física directa ESC/POS por USB, Serial o Bluetooth
        if ((directSerialPort && directSerialPort.writable) || (directUsbDevice && directUsbDevice.opened) || (directBtChar && directBtServer && directBtServer.connected)) {
            const raw = buildEscPosCutTicket(ct);
            const ok = await writeEscPosBytes(raw);
            if (ok) return;
        }

        // 2. Fallback de ventana de impresión del sistema
        const cfg = getPrinterConfig();
        const pWidth = cfg.paperWidth || "58mm";
        const diff = Number(ct.difference || 0);
        const diffLabel = diff > 0 ? ("+" + money(diff) + " (Sobrante)") : diff < 0 ? (money(diff) + " (Faltante)") : "$0.00 (Exacto)";
        const isMorning = String(ct.shift || "").toLowerCase().includes("mañ") || String(ct.shift || "").toLowerCase().includes("mat");
        const shiftLabel = isMorning ? "MATUTINO (MAÑANA)" : "VESPERTINO (TARDE)";

        const cutHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Recibo de Corte de Caja</title>
    <style>
        @page { margin: 0; size: auto; }
        body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 11px;
            color: #000;
            background: #fff;
            width: ${pWidth};
            max-width: ${pWidth};
            margin: 0 auto;
            padding: 6px 4px;
            box-sizing: border-box;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        .row { display: flex; justify-content: space-between; margin: 2px 0; }
        @media print {
            body { width: 100%; max-width: 100%; margin: 0; padding: 2mm; }
        }
    </style>
</head>
<body onload="window.print(); setTimeout(function(){ window.close(); }, 700);">
    <div class="center bold" style="font-size:14px;">NEVERIA LA FUENTE</div>
    <div class="center bold" style="font-size:12px;">CORTE DE CAJA OFICIAL</div>
    <div class="center" style="font-size:9px;">-- DESDE 1962 --</div>
    <div class="divider"></div>
    <div><strong>SUCURSAL:</strong> ${esc(ct.branch_name || S.branchName)}</div>
    <div><strong>TURNO:</strong> ${shiftLabel}</div>
    <div><strong>FECHA/HORA:</strong> ${fdt(ct.created_at)}</div>
    <div><strong>ENCARGADA:</strong> ${esc(ct.performed_by_name || "Encargada")}</div>
    <div class="divider"></div>
    <div class="bold" style="font-size:11px;margin-bottom:3px;">DESGLOSE FINANCIERO:</div>
    <div class="row">
        <span>Fondo Inicial:</span>
        <span>${money(ct.opening_amount || 0)}</span>
    </div>
    <div class="row">
        <span>Ventas Efectivo:</span>
        <span>${money(ct.cash_sales || (Number(ct.total_sales||0) - Number(ct.card_sales||0)))}</span>
    </div>
    <div class="row">
        <span>Ventas Tarjeta:</span>
        <span>${money(ct.card_sales || 0)}</span>
    </div>
    <div class="divider"></div>
    <div class="row bold" style="font-size:12px;">
        <span>TOTAL VENDIDO:</span>
        <span>${money(ct.total_sales || 0)}</span>
    </div>
    <div class="divider"></div>
    <div class="bold" style="font-size:11px;margin-bottom:3px;">ARQUEO DE CAJA FISICA:</div>
    <div class="row">
        <span>Efectivo Esperado:</span>
        <span>${money(ct.expected_cash || (Number(ct.opening_amount||0) + Number(ct.cash_sales||0)))}</span>
    </div>
    <div class="row bold">
        <span>Efectivo Contado:</span>
        <span>${money(ct.counted_cash || 0)}</span>
    </div>
    <div class="row bold" style="font-size:12px;margin-top:2px;">
        <span>CORTE NETO ENTREGAR:</span>
        <span>${money(ct.net_sales_without_fund != null ? ct.net_sales_without_fund : (Number(ct.counted_cash||0) - Number(ct.opening_amount||0)))}</span>
    </div>
    <div class="divider"></div>
    <div class="row bold" style="font-size:11px;">
        <span>DIFERENCIA:</span>
        <span>${diffLabel}</span>
    </div>
    <div class="double-divider"></div>
    <div style="margin-top:22px;text-align:center;">
        ___________________________<br>
        <span style="font-size:10px;">Firma de la Encargada</span>
    </div>
    <div style="margin-top:20px;text-align:center;">
        ___________________________<br>
        <span style="font-size:10px;">Firma Supervisión / Dirección</span>
    </div>
    <div style="height: 18mm;"></div>
</body>
</html>`;

        triggerUniversalPrint(cutHtml);
    }

    async function printTestReceipt(customCfg = null) {
        const cfg = customCfg || getPrinterConfig();
        const pWidth = cfg.paperWidth || "58mm";
        const conn = getPrinterConnectionStatus();

        // 1. Si está conectado por USB / Serial / Bluetooth, enviar comando directo a la máquina física
        if ((directSerialPort && directSerialPort.writable) || (directUsbDevice && directUsbDevice.opened) || (directBtChar && directBtServer && directBtServer.connected)) {
            const raw = buildEscPosTestTicket();
            const ok = await writeEscPosBytes(raw);
            if (ok) {
                toast("✓ Ticket de prueba impreso físicamente en la máquina.", "success", 4000);
                return;
            }
        }

        // 2. Si no está vinculado directamente, abrir el formato de impresión
        const testHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ticket de Prueba</title>
    <style>
        @page { margin: 0; size: auto; }
        body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 11px;
            color: #000;
            background: #fff;
            width: ${pWidth};
            max-width: ${pWidth};
            margin: 0 auto;
            padding: 6px 4px;
            box-sizing: border-box;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        @media print {
            body { width: 100%; max-width: 100%; margin: 0; padding: 2mm; }
        }
    </style>
</head>
<body onload="window.print(); setTimeout(function(){ window.close(); }, 700);">
    <div class="center bold" style="font-size:14px;">NEVERIA LA FUENTE</div>
    <div class="center" style="font-size:10px;">PRUEBA DE IMPRESORA TÉRMICA</div>
    <div class="divider"></div>
    <div><strong>MODELO:</strong> ${esc(cfg.model)}</div>
    <div><strong>CONEXIÓN:</strong> ${esc(conn.label)}</div>
    <div><strong>ANCHO DE ROLLO:</strong> ${esc(pWidth)}</div>
    <div><strong>FECHA Y HORA:</strong> ${fdt(now())}</div>
    <div><strong>SUCURSAL:</strong> ${esc(S.branchName)}</div>
    <div><strong>USUARIO:</strong> ${esc(S.profile?.full_name || S.user?.email || "Usuario")}</div>
    <div class="divider"></div>
    <div class="bold center" style="font-size:12px; margin:4px 0;">¡CALIBRACIÓN CORRECTA!</div>
    <div class="center" style="font-size:10px;">
        Esta impresora está lista para imprimir:<br>
        ✓ Tickets de Venta a Clientes (Obligatorio)<br>
        ✓ Cortes de Caja por Turno<br>
        ✓ Reportes Diarios Consolidados<br>
        ✓ Aperturas de Turno con Firma
    </div>
    <div class="double-divider"></div>
    <div class="center bold" style="font-size:11px; margin-top:6px;">
        [ CORTAR AQUI ]
    </div>
    <div style="height: 20mm;"></div>
</body>
</html>`;

        triggerUniversalPrint(testHtml);
    }

    function openPrinterSetupModal() {
        const curCfg = getPrinterConfig();
        const conn = getPrinterConnectionStatus();
        const overlay = document.createElement("div");
        overlay.id = "printer-modal-overlay";
        overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);";
        overlay.innerHTML = `
            <div style="background:#fffef8;border:2px solid var(--gold-500);border-radius:22px;padding:24px 22px;max-width:540px;width:100%;box-shadow:0 24px 70px rgba(0,0,0,.45);color:#1a0205;max-height:92vh;overflow-y:auto">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1.5px solid rgba(188,132,10,.3);padding-bottom:10px">
                    <div style="display:flex;align-items:center;gap:8px">
                        <span style="font-size:28px">🖨️</span>
                        <div>
                            <h3 style="margin:0;color:var(--wine-950);font-size:18px;font-weight:900">Vincular Impresora Térmica Física</h3>
                            <small style="color:var(--text-muted);font-weight:700">Imprime directo en tu máquina sin guardar en PDF</small>
                        </div>
                    </div>
                    <button id="p-close-btn" type="button" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--wine-900);font-weight:900">✕</button>
                </div>

                <!-- ESTADO ACTUAL DE CONEXIÓN -->
                <div style="background:#fef3c7;border:1.5px solid #fcd34d;padding:12px 14px;border-radius:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">
                    <div>
                        <div style="font-size:11px;color:#92400e;font-weight:900">ESTADO ACTUAL:</div>
                        <strong style="font-size:13.5px;color:#78350f" id="printer-status-text">${conn.label}</strong>
                    </div>
                    <span style="font-size:24px">${conn.type === 'serial' ? '⚡' : conn.type === 'usb' ? '🔌' : conn.type === 'bt' ? '📶' : '🖨️'}</span>
                </div>

                <!-- BOTONES DE VINCULACIÓN FÍSICA DIRECTA -->
                <div style="margin-bottom:16px">
                    <label style="font-size:11px;font-weight:900;color:var(--wine-800);display:block;margin-bottom:6px">VINCULAR DIRECTAMENTE TU IMPRESORA:</label>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
                        <button type="button" id="btn-pair-serial"
                            style="padding:12px 6px;background:linear-gradient(135deg,#fef08a,#fde047);color:#854d0e;border:1.5px solid #eab308;border-radius:10px;font-weight:900;font-size:11.5px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(0,0,0,0.1)">
                            <span style="font-size:18px">⚡</span>
                            <span>1. Puerto USB/Serie</span>
                        </button>
                        <button type="button" id="btn-pair-usb"
                            style="padding:12px 6px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);color:#1e40af;border:1.5px solid #93c5fd;border-radius:10px;font-weight:900;font-size:11.5px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(0,0,0,0.1)">
                            <span style="font-size:18px">🔌</span>
                            <span>2. Cable WebUSB</span>
                        </button>
                        <button type="button" id="btn-pair-bt"
                            style="padding:12px 6px;background:linear-gradient(135deg,#dcfce7,#bbf7d0);color:#15803d;border:1.5px solid #86efac;border-radius:10px;font-weight:900;font-size:11.5px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(0,0,0,0.1)">
                            <span style="font-size:18px">📶</span>
                            <span>3. Bluetooth</span>
                        </button>
                    </div>
                </div>

                <!-- GUÍA IMPORTANTE PARA WINDOWS: EVITAR GUARDAR EN PDF -->
                <div style="background:#fff;border:1.5px solid #f87171;padding:12px 14px;border-radius:12px;margin-bottom:16px;font-size:11.5px;color:#991b1b;line-height:1.45">
                    <strong>⚠️ ¿Te aparece "Guardar como PDF"?:</strong><br>
                    1. En la ventana de impresión de tu navegador (Chrome / Edge), donde dice <strong>"Destino"</strong>, haz clic y cambia <em>"Guardar como PDF"</em> por el nombre de tu <strong>impresora física</strong> (ej. <em>POS-58, EC Line, Ghia, XP-58</em>).<br>
                    2. En <strong>Márgenes</strong> selecciona <em>"Ninguno"</em>.<br>
                    3. ¡Listo! Tu navegador recordará tu impresora térmica y saldrá el papel directo siempre.
                </div>

                <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
                    <div>
                        <label style="font-size:11px;font-weight:900;color:var(--wine-800);display:block;margin-bottom:4px">MODELO O MARCA:</label>
                        <select id="p-model" style="width:100%;padding:10px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:13px;font-weight:700;background:#fff;outline:none">
                            <option value="POS-58 / EC Line (58mm)"${curCfg.model.includes("EC Line")||curCfg.model.includes("58")?' selected':''}>🖨️ POS-58 / EC Line / Ghia (Rollo 58mm)</option>
                            <option value="Xprinter / Caysn / Ofichido"${curCfg.model.includes("Xprinter")||curCfg.model.includes("Caysn")?' selected':''}>🖨️ Xprinter / Caysn / Ofichido</option>
                            <option value="Impresora POS-80 (80mm)"${curCfg.model.includes("80")?' selected':''}>🖨️ Impresora POS-80 (Rollo 80mm)</option>
                            <option value="Epson TM-T20 / TM-T88"${curCfg.model.includes("Epson")?' selected':''}>🖨️ Epson TM-T20 / TM-T88 (ESC/POS)</option>
                        </select>
                    </div>

                    <div>
                        <label style="font-size:11px;font-weight:900;color:var(--wine-800);display:block;margin-bottom:4px">ANCHO DE PAPEL:</label>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                            <label style="display:flex;align-items:center;gap:8px;background:#fff;padding:10px;border:1.5px solid #d1d5db;border-radius:10px;cursor:pointer;font-weight:800;font-size:12px">
                                <input type="radio" name="p-width" value="58mm"${curCfg.paperWidth==='58mm'?' checked':''}>
                                <span>58 mm (Estándar mini)</span>
                            </label>
                            <label style="display:flex;align-items:center;gap:8px;background:#fff;padding:10px;border:1.5px solid #d1d5db;border-radius:10px;cursor:pointer;font-weight:800;font-size:12px">
                                <input type="radio" name="p-width" value="80mm"${curCfg.paperWidth==='80mm'?' checked':''}>
                                <span>80 mm (Ancho grande)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                    <button id="p-test-btn" type="button"
                        style="padding:12px;background:linear-gradient(135deg,#f0fdf4,#dcfce7);color:#15803d;border:1.5px solid #86efac;border-radius:12px;font-weight:900;font-size:12.5px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
                        <span>🖨️</span>
                        <span>Imprimir Ticket de Prueba</span>
                    </button>
                    <button id="p-save-btn" type="button"
                        style="padding:12px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:none;border-radius:12px;font-weight:900;font-size:12.5px;cursor:pointer">
                        ✓ Guardar Ajustes
                    </button>
                </div>
            </div>`;
        document.body.appendChild(overlay);

        overlay.querySelector("#p-close-btn").onclick = () => overlay.remove();

        overlay.querySelector("#btn-pair-serial").onclick = async () => {
            const ok = await connectSerialDirect();
            if (ok) {
                const newConn = getPrinterConnectionStatus();
                overlay.querySelector("#printer-status-text").textContent = newConn.label;
            }
        };

        overlay.querySelector("#btn-pair-usb").onclick = async () => {
            const ok = await connectUsbDirect();
            if (ok) {
                const newConn = getPrinterConnectionStatus();
                overlay.querySelector("#printer-status-text").textContent = newConn.label;
            }
        };

        overlay.querySelector("#btn-pair-bt").onclick = async () => {
            const ok = await connectBtDirect();
            if (ok) {
                const newConn = getPrinterConnectionStatus();
                overlay.querySelector("#printer-status-text").textContent = newConn.label;
            }
        };

        overlay.querySelector("#p-test-btn").onclick = async () => {
            const selectedWidth = overlay.querySelector("input[name='p-width']:checked")?.value || "58mm";
            const selectedModel = overlay.querySelector("#p-model")?.value || "POS-58";
            await printTestReceipt({ model: selectedModel, paperWidth: selectedWidth });
        };

        overlay.querySelector("#p-save-btn").onclick = () => {
            const selectedWidth = overlay.querySelector("input[name='p-width']:checked")?.value || "58mm";
            const selectedModel = overlay.querySelector("#p-model")?.value || "POS-58";
            savePrinterConfig({ model: selectedModel, paperWidth: selectedWidth, autoPrint: true });
            overlay.remove();
            toast("✓ Ajustes de impresora guardados.", "success", 4000);
        };
    }

    async function directPrintTicketAction() {
        const lastSale = lr("last_printed_sale", null) || lr("sales", [])[0];
        if (lastSale) {
            toast("🖨️ Imprimiendo Ticket #" + (lastSale.sale_number || '') + " en físico…", "info", 3000);
            await printSaleReceipt(lastSale);
        } else {
            toast("🖨️ Imprimiendo ticket de prueba en físico…", "info", 3000);
            await printTestReceipt();
        }
    }

    async function autoReconnectUsbPrinter() {
        if (!navigator.usb) return;
        try {
            const devices = await navigator.usb.getDevices();
            if (devices.length > 0) {
                const device = devices[0];
                await device.open();
                if (device.configuration === null) await device.selectConfiguration(1);
                try { await device.claimInterface(0); } catch(e) {}
                let epNum = 1;
                if (device.configuration && device.configuration.interfaces) {
                    for (const iface of device.configuration.interfaces) {
                        for (const alt of iface.alternates) {
                            for (const ep of alt.endpoints) {
                                if (ep.direction === "out") {
                                    epNum = ep.endpointNumber;
                                    break;
                                }
                            }
                        }
                    }
                }
                directUsbDevice = device;
                directUsbEndpoint = epNum;
                console.log("✓ Impresora USB reconectada automáticamente:", device.productName);
            }
        } catch(err) {
            console.warn("Auto-reconnect USB:", err);
        }
    }

    document.addEventListener("click", e => {
        if (e.target.closest("#btn-open-printer-modal,.btn-open-printer-modal")) {
            openPrinterSetupModal();
        }
        if (e.target.closest("#btn-direct-print-ticket")) {
            directPrintTicketAction();
        }
    });

    /* ── ADMINISTRACIÓN DE CATÁLOGO, PRODUCTOS COMPUESTOS & GESTIÓN DE INSUMOS ── */
    let editingProductId = null;

    async function loadProductsAdmin() {
        const c = document.getElementById("products-admin-container");
        if (!c) return;
        const catOpts = CATS.filter(x => x.id !== "all").map(x => `<option value="${x.id}">${x.e} ${x.label}</option>`).join("");

        const branchSelectHtml = S.isSU ? `
            <div>
                <label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">📍 SUCURSAL DESTINO (👑 SUPERUSUARIO)</label>
                <select id="np-branch" style="width:100%;padding:10px;border:1.5px solid var(--gold-500);border-radius:8px;font-size:13px;box-sizing:border-box;font-weight:700;background:#fff;outline:none">
                    <option value="all">🏢 Todas las Sucursales (Catálogo General)</option>
                    ${BRANCH_NAMES.map(bn => `<option value="${esc(bn)}"${bn===S.branchName?' selected':''}>📍 Solo en: ${esc(bn)}</option>`).join("")}
                </select>
            </div>` : `
            <div>
                <label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">📍 SUCURSAL DESTINO</label>
                <input type="text" value="📍 ${esc(S.branchName)} (Exclusivo esta sucursal)" readonly
                    style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;background:#f8f8f8;box-sizing:border-box;font-weight:800;color:var(--wine-900)">
                <input type="hidden" id="np-branch" value="${esc(S.branchName)}">
            </div>`;

        const adminBranchSelectHtml = S.isSU ? `
            <div style="display:flex;align-items:center;gap:8px">
                <label style="font-size:12px;font-weight:900;color:#fcebd2">📍 SUCURSAL:</label>
                <select id="admin-branch-filter" style="padding:6px 12px;border-radius:10px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;outline:none;color:#1a0205">
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(S.branchId)?' selected':''}>${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        // Lista de insumos/desechables disponibles para ser componentes
        const availableSupplies = S.products.filter(p => p.is_supply || p.category === "desechables").sort((a,b) => (a.product_name || "").localeCompare(b.product_name || ""));

        c.innerHTML = `
        <!-- FORMULARIO: AGREGAR O EDITAR PRODUCTO / COMPUESTO -->
        <div class="dashboard-card" id="form-product-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card);border:2px solid var(--gold-400)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
                <h3 id="form-product-title" style="color:var(--wine-900);margin:0;font-weight:900;font-size:18px">➕ Agregar Nuevo Producto / Compuesto / Insumo</h3>
                <button type="button" id="btn-cancel-edit" style="display:none;padding:7px 14px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer">
                    ✕ Cancelar Edición
                </button>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:16px">
                <div>
                    <label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">NOMBRE DEL PRODUCTO *</label>
                    <input id="np-name" type="text" placeholder="Ej: Nieve en Vaso #12"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box;font-weight:700">
                </div>
                <div>
                    <label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">CÓDIGO / CLAVE</label>
                    <input id="np-code" type="text" placeholder="NV-12"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box">
                </div>
                <div>
                    <label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">CATEGORÍA EXACTA *</label>
                    <select id="np-cat" style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box;font-weight:700">${catOpts}</select>
                </div>
                <div>
                    <label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">PRECIO ($) *</label>
                    <input id="np-price" type="number" step="0.5" min="0" placeholder="Ej: 35.00"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box;font-weight:800">
                </div>
                <div>
                    <label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">📦 STOCK / UNIDADES (MÁX 500)</label>
                    <input id="np-stock" type="number" min="0" max="500" step="1" placeholder="Ej: 50" value="50"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box;font-weight:900;color:var(--wine-900)">
                </div>
                <div>
                    <label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">PIEZAS POR PAQUETE (Desechables)</label>
                    <input id="np-pack-units" type="number" step="1" min="1" placeholder="Ej: 50" value="50"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box">
                </div>
                ${branchSelectHtml}
            </div>

            <!-- SECCIÓN PRODUCTO COMPUESTO / RECETA -->
            <div style="background:#fffcf0;border:1.5px solid #f2e6b5;border-radius:14px;padding:16px;margin-bottom:16px">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:10px">
                    <div style="display:flex;align-items:center;gap:10px">
                        <input type="checkbox" id="np-is-composite" style="width:19px;height:19px;cursor:pointer">
                        <label for="np-is-composite" style="font-size:13.5px;font-weight:900;color:var(--wine-900);cursor:pointer">
                            📦 ¿Es Producto Compuesto? (Descontar automáticamente vasos, cucharas, charolas o insumos al cobrar en POS)
                        </label>
                    </div>
                    <button type="button" id="btn-quick-new-supply" style="padding:6px 12px;background:#fef3c7;color:#92400e;border:1.5px solid #fcd34d;border-radius:8px;font-size:11.5px;font-weight:900;cursor:pointer">
                        ➕ Crear Nuevo Insumo / Desechable
                    </button>
                </div>

                <div id="composite-builder" style="display:none;padding-top:12px;border-top:1.5px dashed #d1d5db">
                    <div style="font-size:11.5px;color:var(--wine-800);font-weight:800;margin-bottom:10px">
                        Selecciona los insumos/desechables que se consumen en cada venta de este producto:
                    </div>
                    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
                        <select id="comp-supply-select" style="padding:10px 12px;border:1.5px solid var(--gold-500);border-radius:8px;font-size:12.5px;font-weight:700;background:#fff;max-width:360px;flex:1">
                            ${availableSupplies.map(s => `<option value="${esc(s.product_id)}">${esc(s.product_name)} (${s.units_per_package || 50} pz/paq)</option>`).join("")}
                        </select>
                        <div style="display:flex;align-items:center;gap:6px">
                            <label style="font-size:11px;font-weight:800;color:var(--wine-800)">Cant:</label>
                            <input id="comp-supply-qty" type="number" min="1" step="1" value="1" placeholder="1" style="width:65px;padding:9px;border:1.5px solid var(--gold-500);border-radius:8px;font-size:13px;font-weight:900;text-align:center">
                        </div>
                        <button type="button" id="btn-add-comp-item" style="padding:10px 18px;background:linear-gradient(135deg,#dcfce7,#bbf7d0);color:#15803d;border:1.5px solid #86efac;border-radius:8px;font-weight:900;font-size:12.5px;cursor:pointer;box-shadow:0 2px 6px rgba(21,128,61,0.15)">
                            + Agregar a Receta
                        </button>
                    </div>
                    
                    <div style="font-size:11px;font-weight:800;color:var(--wine-900);margin-bottom:6px">INSUMOS EN LA RECETA ACTUAL:</div>
                    <div id="comp-items-list" style="display:flex;flex-wrap:wrap;gap:8px;min-height:36px;padding:8px;background:#fff;border-radius:10px;border:1px solid #e5e7eb"></div>
                </div>
            </div>

            <button type="button" id="btn-add-prod"
                style="padding:13px 32px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:900;font-size:14px;cursor:pointer;box-shadow:0 4px 14px rgba(112,23,33,0.3)">
                ✓ Guardar Producto / Compuesto en Catálogo</button>
        </div>

        <!-- SECCIÓN: ADMINISTRACIÓN & EDICIÓN RÁPIDA DE INSUMOS Y DESECHABLES -->
        <div class="dashboard-card" style="padding:18px 22px;border-radius:16px;margin-bottom:24px;background:linear-gradient(145deg,#2a060c,#1b0205);border:1.5px solid var(--gold-400);box-shadow:var(--shadow-card)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
                <div>
                    <h3 style="color:#ffffff;margin:0;font-weight:900;font-size:16px">🧤 Catálogo de Insumos, Desechables & Complementos (${availableSupplies.length})</h3>
                    <small style="color:#fcebd2;font-weight:600">Administra o elimina los desechables que aparecen en las recetas</small>
                </div>
                <button type="button" id="btn-open-new-supply-modal" style="padding:7px 14px;background:linear-gradient(135deg,#fef3c7,#fde68a);color:#92400e;border:1.5px solid #fcd34d;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer">
                    ➕ + Agregar Nuevo Insumo
                </button>
            </div>
            
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px">
                ${availableSupplies.map(sup => {
                    const st = getStock(sup.product_id);
                    return `
                    <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);padding:10px 12px;border-radius:10px;display:flex;justify-content:space-between;align-items:center">
                        <div>
                            <strong style="color:#ffffff;font-size:12.5px;display:block">${esc(sup.product_name)}</strong>
                            <small style="color:#fcebd2;font-size:10.5px">${sup.units_per_package || 50} pz/paq • Stock: ${st} pz</small>
                        </div>
                        <div style="display:flex;gap:4px">
                            <button type="button" class="btn-edit-sup" data-id="${esc(sup.product_id)}" title="Editar Insumo"
                                style="padding:5px 8px;background:#dbeafe;color:#1e40af;border:none;border-radius:6px;font-size:11px;font-weight:900;cursor:pointer">✎</button>
                            <button type="button" class="btn-del-sup" data-id="${esc(sup.product_id)}" data-name="${esc(sup.product_name)}" title="Eliminar Insumo"
                                style="padding:5px 8px;background:#fee2e2;color:#991b1b;border:none;border-radius:6px;font-size:11px;font-weight:900;cursor:pointer">✕</button>
                        </div>
                    </div>`;
                }).join("")}
            </div>
        </div>

        <!-- LISTA GENERAL DE PRODUCTOS EN CATÁLOGO -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
            <h3 style="color:#ffffff;margin:0;font-weight:900">Catálogo de Productos en ${esc(S.branchName)} (${S.products.length})</h3>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${adminBranchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-reload-admin-prods" style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:8px;cursor:pointer;font-weight:bold">🔄 Actualizar</button>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px">
            ${S.products.map(p => {
                const stock = getStock(p.product_id);
                const isGeneral = !p.branch_name || p.branch_name === "General" || p.branch_id === "all";
                const bTag = isGeneral ? "🏢 Catálogo General" : ("📍 Solo " + p.branch_name);
                const isComp = p.is_composite && Array.isArray(p.components) && p.components.length > 0;
                const isSupply = p.is_supply || p.category === "desechables";
                const unitsPack = p.units_per_package || (isSupply ? 50 : 1);
                const packs = Math.floor(stock / unitsPack);

                return `<article style="background:#fff;border:1.5px solid rgba(188,132,10,.35);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--shadow-sm)">
                    <div>
                        <div style="height:70px;display:flex;align-items:center;justify-content:center;background:#fffcf0;border-radius:10px;margin-bottom:10px">
                            ${p.image_url ? `<img src="${esc(p.image_url)}" style="max-height:100%;max-width:100%;object-fit:contain">` : (isSupply ? '<span style="font-size:32px">🧤</span>' : '<span style="font-size:32px">🍦</span>')}
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;margin-bottom:4px">
                            <small style="color:var(--text-muted);font-size:11px;font-weight:700">${esc(p.product_code||"S/C")} • <strong>${esc(p.category)}</strong></small>
                            <span style="font-size:9px;padding:2px 6px;border-radius:6px;background:${isGeneral?'#fef3c7':'#dbeafe'};color:${isGeneral?'#92400e':'#1e40af'};font-weight:800">${esc(bTag)}</span>
                        </div>
                        <h4 style="margin:4px 0;color:var(--wine-900);font-size:14.5px;font-weight:900">${esc(p.product_name)}</h4>
                        ${p.price > 0 ? `<strong style="color:var(--wine-700);font-size:15px;display:block">${money(p.price)}</strong>` : '<span style="color:#15803d;font-size:12px;font-weight:800">Insumo / Desechable</span>'}
                        
                        ${isComp ? `
                        <div style="margin-top:6px;padding:6px 8px;background:#fdf4ff;border:1px solid #f0abfc;border-radius:8px;font-size:11px;color:#86198f">
                            <strong>📦 Receta Compuesto (${p.components.length} insumos):</strong>
                            <div style="margin-top:2px">${p.components.map(c => `• ${c.qty}x ${esc(c.supply_name || c.supply_id)}`).join("<br>")}</div>
                        </div>` : ''}

                        ${isSupply ? `
                        <div style="margin-top:6px;font-size:11px;color:#1e40af;background:#eff6ff;padding:4px 8px;border-radius:6px;font-weight:700">
                            📦 Paquete: ${unitsPack} pzas c/u | Stock: ${stock} pzas (${packs} paq)
                        </div>` : `
                        <div style="font-size:11px;margin-top:6px;color:${stock<=STOCK_LOW?"#b45309":"#15803d"};font-weight:700">
                            Stock: ${stock} unidades ${stock<=STOCK_LOW?"⚠":'✓'}
                        </div>`}
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:12px">
                        <button type="button" class="btn-edit-prod" data-id="${esc(p.product_id)}"
                            style="padding:8px;background:#dbeafe;color:#1e40af;border:1px solid #93c5fd;border-radius:8px;font-size:11.5px;font-weight:900;cursor:pointer">
                            ✎ Editar / Receta</button>
                        <button type="button" class="btn-del-prod" data-id="${esc(p.product_id)}" data-name="${esc(p.product_name)}"
                            style="padding:8px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:8px;font-size:11.5px;font-weight:900;cursor:pointer">
                            🗑 Eliminar</button>
                    </div>
                </article>`;
            }).join("")}
        </div>`;

        // Lógica de componentes temporales
        let tempComponents = [];
        const chkComposite = document.getElementById("np-is-composite");
        const builderBox = document.getElementById("composite-builder");
        const itemsList = document.getElementById("comp-items-list");

        chkComposite?.addEventListener("change", () => {
            if (builderBox) builderBox.style.display = chkComposite.checked ? "block" : "none";
        });

        function renderTempComponents() {
            if (!itemsList) return;
            if (!tempComponents.length) {
                itemsList.innerHTML = '<span style="font-size:11.5px;color:var(--text-muted);font-style:italic">Ningún insumo agregado a la receta aún.</span>';
                return;
            }
            itemsList.innerHTML = tempComponents.map((item, idx) => `
                <span style="display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid var(--gold-500);padding:5px 10px;border-radius:20px;font-size:11.5px;font-weight:800;color:var(--wine-900)">
                    <span>${item.qty}x ${esc(item.supply_name)}</span>
                    <button type="button" class="btn-comp-minus" data-idx="${idx}" style="background:#f3f4f6;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;font-weight:900;width:18px;height:18px;line-height:14px;text-align:center">-</button>
                    <button type="button" class="btn-comp-plus" data-idx="${idx}" style="background:#f3f4f6;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;font-weight:900;width:18px;height:18px;line-height:14px;text-align:center">+</button>
                    <button type="button" class="btn-rm-comp" data-idx="${idx}" title="Quitar insumo" style="background:#fee2e2;border:none;border-radius:4px;color:#ef4444;cursor:pointer;font-weight:900;font-size:11px;padding:2px 5px">✕ Quitar</button>
                </span>
            `).join("");

            itemsList.querySelectorAll(".btn-comp-minus").forEach(b => b.addEventListener("click", () => {
                const idx = parseInt(b.dataset.idx, 10);
                if (tempComponents[idx]) {
                    tempComponents[idx].qty--;
                    if (tempComponents[idx].qty <= 0) tempComponents.splice(idx, 1);
                    renderTempComponents();
                }
            }));

            itemsList.querySelectorAll(".btn-comp-plus").forEach(b => b.addEventListener("click", () => {
                const idx = parseInt(b.dataset.idx, 10);
                if (tempComponents[idx]) {
                    tempComponents[idx].qty++;
                    renderTempComponents();
                }
            }));

            itemsList.querySelectorAll(".btn-rm-comp").forEach(b => b.addEventListener("click", () => {
                tempComponents.splice(parseInt(b.dataset.idx, 10), 1);
                renderTempComponents();
            }));
        }

        document.getElementById("btn-add-comp-item")?.addEventListener("click", () => {
            const selectEl = document.getElementById("comp-supply-select");
            const qtyEl = document.getElementById("comp-supply-qty");
            if (!selectEl || !qtyEl) return;
            const supplyId = selectEl.value;
            const supplyName = selectEl.options[selectEl.selectedIndex]?.text?.split(" (")[0] || "Insumo";
            const qty = Math.max(1, parseInt(qtyEl.value, 10) || 1);

            const existing = tempComponents.find(c => c.supply_id === supplyId);
            if (existing) {
                existing.qty += qty;
            } else {
                tempComponents.push({ supply_id: supplyId, supply_name: supplyName, qty: qty });
            }
            renderTempComponents();
        });

        // Crear nuevo insumo modal/prompt
        async function createNewSupplyPrompt() {
            const name = await toastPrompt("Nombre del nuevo Insumo / Desechable (ej: Vaso #10, Cuchara Pastelera, Bolsa 30x40):", "Nombre del insumo…");
            if (!name || !name.trim()) return;
            const unitsStr = await toastPrompt("¿Cuántas piezas vienen por paquete/bolsa de '" + name.trim() + "'?:", "50");
            const packUnits = parseInt(unitsStr, 10) || 50;

            const newSupplyObj = {
                product_id: "sup_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                product_name: name.trim(),
                product_code: "INS-" + Math.floor(Math.random()*900+100),
                category: "desechables",
                price: 0,
                is_supply: true,
                units_per_package: packUnits,
                initial_stock: packUnits * 2,
                branch_name: "General",
                is_active: true,
                created_at: now()
            };

            const customList = gr("custom_products", []);
            customList.push(newSupplyObj);
            gw("custom_products", customList);

            toast("✓ Insumo '" + name.trim() + "' registrado correctamente con " + packUnits + " pz/paq.", "success", 4000);
            await loadProducts();
            await loadProductsAdmin();
        }

        document.getElementById("btn-quick-new-supply")?.addEventListener("click", createNewSupplyPrompt);
        document.getElementById("btn-open-new-supply-modal")?.addEventListener("click", createNewSupplyPrompt);

        // Editar insumo
        c.querySelectorAll(".btn-edit-sup").forEach(btn => btn.addEventListener("click", async () => {
            const supId = btn.dataset.id;
            const sup = S.products.find(p => String(p.product_id) === String(supId));
            if (!sup) return;

            const newName = await toastPrompt("Editar nombre de '" + sup.product_name + "':", sup.product_name);
            if (!newName || !newName.trim()) return;

            const newUnitsStr = await toastPrompt("Piezas por paquete/bolsa de '" + newName.trim() + "':", String(sup.units_per_package || 50));
            const newUnits = parseInt(newUnitsStr, 10) || sup.units_per_package || 50;

            sup.product_name = newName.trim();
            sup.units_per_package = newUnits;

            const customList = gr("custom_products", []);
            const exIdx = customList.findIndex(p => String(p.product_id) === String(supId));
            if (exIdx >= 0) {
                customList[exIdx].product_name = newName.trim();
                customList[exIdx].units_per_package = newUnits;
            } else {
                customList.push(sup);
            }
            gw("custom_products", customList);

            toast("✓ Insumo actualizado.", "success");
            await loadProducts();
            await loadProductsAdmin();
        }));

        // Eliminar insumo
        c.querySelectorAll(".btn-del-sup").forEach(btn => btn.addEventListener("click", async () => {
            const supId = btn.dataset.id;
            const supName = btn.dataset.name;
            const ok = await toastConfirm("¿Eliminar el insumo '" + supName + "' del catálogo?");
            if (!ok) return;

            const deletedIds = gr("deleted_product_ids", []);
            deletedIds.push(String(supId));
            gw("deleted_product_ids", deletedIds);

            toast("✓ Insumo '" + supName + "' eliminado.", "info");
            await loadProducts();
            await loadProductsAdmin();
        }));

        // Editar producto existente
        c.querySelectorAll(".btn-edit-prod").forEach(btn => btn.addEventListener("click", () => {
            const p = S.products.find(x => String(x.product_id) === String(btn.dataset.id));
            if (!p) return;

            editingProductId = p.product_id;
            document.getElementById("np-name").value = p.product_name || "";
            document.getElementById("np-code").value = p.product_code || "";
            document.getElementById("np-cat").value = p.category || "helados";
            document.getElementById("np-price").value = p.price || 0;
            const curStk = getStock(p.product_id);
            const stkInput = document.getElementById("np-stock");
            if (stkInput) stkInput.value = curStk;
            document.getElementById("np-pack-units").value = p.units_per_package || 50;

            const isComp = !!p.is_composite;
            const chk = document.getElementById("np-is-composite");
            if (chk) {
                chk.checked = isComp;
                if (builderBox) builderBox.style.display = isComp ? "block" : "none";
            }

            tempComponents = isComp && Array.isArray(p.components) ? JSON.parse(JSON.stringify(p.components)) : [];
            renderTempComponents();

            document.getElementById("form-product-title").textContent = "✏️ Modificando Producto: " + p.product_name;
            document.getElementById("btn-add-prod").textContent = "💾 Guardar Cambios en Producto";
            document.getElementById("btn-cancel-edit").style.display = "inline-block";

            document.getElementById("form-product-card")?.scrollIntoView({ behavior: "smooth" });
        }));

        document.getElementById("btn-cancel-edit")?.addEventListener("click", () => {
            editingProductId = null;
            document.getElementById("np-name").value = "";
            document.getElementById("np-code").value = "";
            document.getElementById("np-price").value = "";
            document.getElementById("np-pack-units").value = "50";
            if (chkComposite) chkComposite.checked = false;
            if (builderBox) builderBox.style.display = "none";
            tempComponents = [];
            renderTempComponents();
            document.getElementById("form-product-title").textContent = "➕ Agregar Nuevo Producto / Compuesto / Insumo";
            document.getElementById("btn-add-prod").textContent = "✓ Guardar Producto / Compuesto en Catálogo";
            document.getElementById("btn-cancel-edit").style.display = "none";
        });

        document.getElementById("admin-branch-filter")?.addEventListener("change", async e => {
            await changeBranch(e.target.value);
            await loadProductsAdmin();
        });

        document.getElementById("btn-reload-admin-prods")?.addEventListener("click", async () => {
            await loadProducts();
            await loadProductsAdmin();
            toast("Catálogo actualizado al instante.", "info");
        });

        document.getElementById("btn-add-prod")?.addEventListener("click", async () => {
            const name  = document.getElementById("np-name")?.value.trim();
            const code  = document.getElementById("np-code")?.value.trim();
            const cat   = document.getElementById("np-cat")?.value;
            const price = Number(document.getElementById("np-price")?.value || 0);
            const stockInp = Math.min(500, Math.max(0, parseInt(document.getElementById("np-stock")?.value, 10) || 0));
            const packUnits = parseInt(document.getElementById("np-pack-units")?.value, 10) || 50;
            const targetBranch = document.getElementById("np-branch")?.value || S.branchName;
            const isComp = !!document.getElementById("np-is-composite")?.checked;

            if (!name) return toast("Escribe el nombre del producto.", "warn");

            const bId = (targetBranch === "all") ? "all" : (S.branches.find(b => b.name.toLowerCase().includes(targetBranch.toLowerCase()))?.id || S.branchId);

            if (editingProductId) {
                // MODIFICAR PRODUCTO EXISTENTE
                const customList = gr("custom_products", []);
                let prodToEdit = customList.find(p => String(p.product_id) === String(editingProductId));
                if (!prodToEdit) {
                    const existingInCatalog = S.products.find(p => String(p.product_id) === String(editingProductId));
                    prodToEdit = Object.assign({}, existingInCatalog || {});
                    customList.push(prodToEdit);
                }

                prodToEdit.product_name = name;
                prodToEdit.product_code = code || prodToEdit.product_code || ("LF-" + Math.floor(Math.random()*900+100));
                prodToEdit.category = cat;
                prodToEdit.price = price;
                prodToEdit.units_per_package = packUnits;
                prodToEdit.branch_id = bId;
                prodToEdit.branch_name = targetBranch === "all" ? "General" : targetBranch;
                prodToEdit.is_composite = isComp;
                prodToEdit.components = isComp ? [...tempComponents] : [];
                prodToEdit.is_supply = (cat === "desechables" || price === 0);

                // Actualizar stock directamente
                S.inv[editingProductId] = stockInp; saveBranchInv();
                alertInv();

                gw("custom_products", customList);
                editingProductId = null;
                toast("✓ Cambios guardados en '" + name + "' (Stock: " + stockInp + " uds).", "success", 4000);
            } else {
                // CREAR NUEVO PRODUCTO
                const newProdId = "prod_" + Date.now() + "_" + Math.random().toString(36).substring(2,6);
                const newProd = {
                    product_id: newProdId,
                    product_name: name,
                    product_code: code || ("LF-" + Math.floor(Math.random()*900+100)),
                    category: cat,
                    price: price,
                    branch_id: bId,
                    branch_name: targetBranch === "all" ? "General" : targetBranch,
                    is_active: true,
                    is_composite: isComp,
                    components: isComp ? [...tempComponents] : [],
                    is_supply: (cat === "desechables" || price === 0),
                    units_per_package: packUnits,
                    initial_stock: stockInp,
                    created_at: now()
                };

                S.inv[newProdId] = stockInp; saveBranchInv();
                alertInv();

                const customList = gr("custom_products", []);
                customList.push(newProd);
                gw("custom_products", customList);

                if (db) {
                    try {
                        await db.from("products").insert({
                            product_name: name,
                            product_code: newProd.product_code,
                            category: cat,
                            price: price,
                            is_active: true
                        });
                    } catch(e) {}
                }

                toast("✓ Producto '" + name + "' guardado con " + stockInp + " unidades en stock.", "success", 4000);
            }

            await loadProducts();
            await loadProductsAdmin();
        });

        c.querySelectorAll(".btn-del-prod").forEach(btn => btn.addEventListener("click", async () => {
            const reason = await toastPrompt("Motivo para eliminar '" + btn.dataset.name + "':", "Escribe el motivo obligatorio…");
            if (!reason) return;

            const deletedIds = gr("deleted_product_ids", []);
            deletedIds.push(String(btn.dataset.id));
            gw("deleted_product_ids", deletedIds);

            toast("✓ Producto '" + btn.dataset.name + "' eliminado del catálogo.", "info", 4000);
            await loadProducts();
            await loadProductsAdmin();
        }));
    }

    /* ── INVENTARIO (CONTROL POR PAQUETES/BOLSAS Y PRODUCTOS COMPUESTOS) ── */
    async function loadInventory() {
        const c = $("#inventory-container");
        if (!c) return;

        initInv();

        if (!S.invTab) S.invTab = "all";

        const branchSelectHtml = S.isSU ? `
            <div style="display:flex;align-items:center;gap:8px">
                <label style="font-size:12px;font-weight:900;color:#fcebd2">📍 SUCURSAL:</label>
                <select id="inv-branch-filter" style="padding:6px 12px;border-radius:10px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;outline:none;color:#1a0205">
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(S.branchId)?' selected':''}>${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        const saleProds = S.products.filter(p => !p.is_supply && p.category !== "desechables");
        const supplyProds = S.products.filter(p => p.is_supply || p.category === "desechables");

        let displayedList = S.products;
        if (S.invTab === "sales") displayedList = saleProds;
        else if (S.invTab === "supplies") displayedList = supplyProds;

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Inventario de Sucursal — ${esc(S.branchName)}</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Control de piezas, paquetes/bolsas de desechables y productos compuestos</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${branchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-ref-inv"
                    style="padding:8px 16px;background:linear-gradient(135deg,#fff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:var(--wine-950);box-shadow:0 2px 8px rgba(0,0,0,0.2)">
                    🔄 Actualizar Inventario</button>
            </div>
        </div>

        <!-- PESTAÑAS DE FILTRO DE INVENTARIO -->
        <div style="display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap">
            <button type="button" class="inv-tab-btn${S.invTab==='all'?' active-inv-tab':''}" data-tab="all"
                style="padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer;${S.invTab==='all'?'background:var(--gold-400);color:#1a0205;border:1.5px solid var(--gold-500)':'background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2)'}">
                🌈 Todos los Artículos (${S.products.length})
            </button>
            <button type="button" class="inv-tab-btn${S.invTab==='sales'?' active-inv-tab':''}" data-tab="sales"
                style="padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer;${S.invTab==='sales'?'background:var(--gold-400);color:#1a0205;border:1.5px solid var(--gold-500)':'background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2)'}">
                🍨 Productos de Venta (${saleProds.length})
            </button>
            <button type="button" class="inv-tab-btn${S.invTab==='supplies'?' active-inv-tab':''}" data-tab="supplies"
                style="padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer;${S.invTab==='supplies'?'background:var(--gold-400);color:#1a0205;border:1.5px solid var(--gold-500)':'background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2)'}">
                🧤 Desechables e Insumos (${supplyProds.length})
            </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px">
        ${displayedList.map(p => {
            const stock = getStock(p.product_id);
            const isSupply = p.is_supply || p.category === "desechables";
            const isComp = p.is_composite && Array.isArray(p.components) && p.components.length > 0;
            const unitsPack = p.units_per_package || (isSupply ? 50 : 1);
            const packs = Math.floor(stock / unitsPack);
            const leftover = stock % unitsPack;
            const isOut = stock === 0;
            const isLow = stock > 0 && stock <= STOCK_LOW;
            const col = isOut ? "#ff6b6b" : isLow ? "#fbbf24" : "#4ade80";

            return `<article class="dashboard-card" style="padding:18px;border-radius:14px;border:1.5px solid var(--border-subtle);background:linear-gradient(180deg,#2e060c 0%,#1f0306 100%);display:flex;flex-direction:column;justify-content:space-between">
                <div>
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                        <div style="font-size:28px">${isSupply ? '🧤' : '🍦'}</div>
                        <div style="flex:1">
                            <div style="display:flex;justify-content:space-between;align-items:center">
                                <small style="color:#fcebd2;font-size:10.5px;font-weight:700">${esc(p.product_code||"")} • <strong style="color:#ffffff">${esc(p.category)}</strong></small>
                                ${isComp ? '<span style="font-size:9px;background:#fdf4ff;color:#86198f;padding:2px 6px;border-radius:6px;font-weight:900">📦 COMPUESTO</span>' : ''}
                                ${isSupply ? '<span style="font-size:9px;background:#eff6ff;color:#1e40af;padding:2px 6px;border-radius:6px;font-weight:900">🧤 INSUMO</span>' : ''}
                            </div>
                            <h4 style="margin:2px 0;color:#ffffff;font-size:14px;font-weight:900">${esc(p.product_name)}</h4>
                        </div>
                    </div>

                    <!-- ESTADO DEL STOCK EN PIEZAS Y PAQUETES -->
                    <div style="background:rgba(255,255,255,0.08);border-radius:10px;padding:10px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.1)">
                        <div style="display:flex;justify-content:space-between;align-items:center">
                            <span style="font-size:11px;color:#fcebd2">Stock Total:</span>
                            <strong style="font-size:19px;color:${col};font-weight:900">${stock} ${isSupply ? 'piezas' : 'uds.'}</strong>
                        </div>
                        ${isSupply ? `
                        <div style="font-size:11px;color:#93c5fd;font-weight:700;margin-top:4px">
                            📦 Equivale a: ${packs} paq de ${unitsPack} pz ${leftover > 0 ? `(+ ${leftover} sueltas)` : ''}
                        </div>` : ''}
                    </div>

                    ${isComp ? `
                    <div style="margin-bottom:10px;padding:6px 8px;background:rgba(253,244,255,0.1);border:1px dashed #f0abfc;border-radius:8px;font-size:10px;color:#f5d0fe">
                        <strong>📦 Descuenta al venderse:</strong>
                        <div style="margin-top:2px">${p.components.map(c => `• ${c.qty}x ${esc(c.supply_name || c.supply_id)}`).join("<br>")}</div>
                    </div>` : ''}
                </div>

                <!-- BOTONES DE ACCIÓN -->
                <div style="display:grid;grid-template-columns:${isSupply ? '1fr 1fr 1fr' : '1fr 1fr'};gap:6px">
                    ${isSupply ? `
                    <button type="button" class="btn-add-pack" data-id="${esc(p.product_id)}" data-name="${esc(p.product_name)}" data-pack="${unitsPack}"
                        style="padding:8px 4px;background:#fef3c7;color:#92400e;border:1px solid #fcd34d;border-radius:8px;font-weight:900;font-size:10.5px;cursor:pointer">
                        📦 + Paquetes
                    </button>` : ''}
                    <button type="button" class="btn-add-stk" data-id="${esc(p.product_id)}" data-name="${esc(p.product_name)}"
                        style="padding:8px 4px;background:#dcfce7;color:#15803d;border:1px solid #86efac;border-radius:8px;font-weight:800;font-size:10.5px;cursor:pointer">
                        ${isSupply ? '🔢 + Piezas' : '+ Agregar'}
                    </button>
                    <button type="button" class="btn-set-stk" data-id="${esc(p.product_id)}" data-name="${esc(p.product_name)}"
                        style="padding:8px 4px;background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd;border-radius:8px;font-weight:800;font-size:10.5px;cursor:pointer">
                        ✎ Ajustar
                    </button>
                </div>
            </article>`;
        }).join("")}
        </div>`;

        c.querySelectorAll(".inv-tab-btn").forEach(btn => btn.addEventListener("click", () => {
            S.invTab = btn.dataset.tab;
            loadInventory();
        }));

        document.getElementById("inv-branch-filter")?.addEventListener("change", async e => {
            await changeBranch(e.target.value);
            await loadInventory();
        });

        document.getElementById("btn-ref-inv")?.addEventListener("click", async () => {
            await loadInventory();
            toast("Inventario actualizado.", "info");
        });

        // Agregar por paquetes/bolsas
        c.querySelectorAll(".btn-add-pack").forEach(btn => btn.addEventListener("click", async () => {
            const pid = btn.dataset.id;
            const name = btn.dataset.name;
            const packUnits = parseInt(btn.dataset.pack, 10) || 50;
            const cur = getStock(pid);

            const val = await toastPrompt(`📦 Agregar Paquetes a '${name}':\n• Cada paquete contiene: ${packUnits} piezas\n• Stock actual: ${cur} piezas\n\n¿Cuántos paquetes/bolsas deseas ingresar?:`, "1");
            const nPacks = parseInt(val, 10);
            if (!Number.isFinite(nPacks) || nPacks <= 0) return;

            const totalToAdd = nPacks * packUnits;
            addStock(pid, totalToAdd);
            toast(`✓ Se agregaron ${nPacks} paquetes (+${totalToAdd} piezas) a '${name}'. Nuevo stock: ${cur + totalToAdd} piezas.`, "success", 5000);
            loadInventory();
        }));

        // Agregar piezas sueltas / unidades
        c.querySelectorAll(".btn-add-stk").forEach(btn => btn.addEventListener("click", async () => {
            const pid = btn.dataset.id;
            const name = btn.dataset.name;
            const cur = getStock(pid);
            const val = await toastPrompt(`Agregar stock a '${name}':\nActual: ${cur} piezas/unidades\nCantidad a agregar:`, "Cantidad…");
            const n = parseInt(val, 10);
            if (!Number.isFinite(n) || n <= 0) return;
            addStock(pid, n);
            toast(`✓ Stock de '${name}' actualizado a ${cur + n} unidades.`, "success");
            loadInventory();
        }));

        // Ajuste directo del total
        c.querySelectorAll(".btn-set-stk").forEach(btn => btn.addEventListener("click", async () => {
            const pid = btn.dataset.id;
            const name = btn.dataset.name;
            const cur = getStock(pid);
            const val = await toastPrompt(`Ajustar stock total de '${name}':\nActual: ${cur}\nNuevo valor total:`, String(cur));
            const n = parseInt(val, 10);
            if (!Number.isFinite(n) || n < 0) return;
            S.inv[pid] = n; saveBranchInv();
            alertInv();
            toast(`✓ Stock de '${name}' ajustado a ${n} unidades.`, "success");
            loadInventory();
        }));
    }

    /* ── MIS VENTAS (FILTRO POR FECHA, TURNOS, MÉTODO DE PAGO Y CANCELACIONES) ── */
    async function loadSales(silent = false) {
        const c = $("#sales-container");
        if (!c || !S.branchId) return;
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando ventas de ${esc(S.branchName)}…</p></div>`;
        }

        const consolidated = await getConsolidatedSalesForChain();
        const allRecordedSales = gr("all_sales", []).concat(lr("sales", []));
        
        // Filtrar ventas que corresponden a la sucursal activa
        const branchSales = consolidated.filter(s => matchesBranch(s, { id: S.branchId, name: S.branchName }));
        
        const todayStr = toDateKey();
        const datesMap = new Map();
        branchSales.forEach(s => {
            const d = toDateKey(s.created_at);
            if (d) {
                if (!datesMap.has(d)) datesMap.set(d, []);
                datesMap.get(d).push(s);
            }
        });
        if (!datesMap.has(todayStr)) datesMap.set(todayStr, []);

        if (S.salesFilterDate === undefined) S.salesFilterDate = "today";
        if (!S.salesFilterShift) S.salesFilterShift = "all";
        if (!S.salesTab) S.salesTab = "active";

        const selectedDate = S.salesFilterDate || "today";
        const selectedShift = S.salesFilterShift || "all";

        let daySales = (selectedDate === "all")
            ? branchSales
            : (selectedDate === "today" ? (datesMap.get(todayStr) || []) : (datesMap.get(selectedDate) || []));

        if (selectedShift !== "all") {
            daySales = daySales.filter(s => getShiftCategory(s) === selectedShift);
        }

        const activeSales = daySales.filter(s => String(s.status||"").toUpperCase() !== "CANCELLED");
        const cancelledSales = daySales.filter(s => String(s.status||"").toUpperCase() === "CANCELLED");

        const targetList = S.salesTab === "cancelled" ? cancelledSales : activeSales;

        const totalActive = activeSales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const cashSales = activeSales.filter(s => (s.payment_method || "cash") === "cash");
        const cardSales = activeSales.filter(s => s.payment_method === "card");
        const totalCash = cashSales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const totalCard = cardSales.reduce((acc,s) => acc + Number(s.total||0), 0);

        const branchSelectHtml = S.isSU ? `
            <div style="display:flex;align-items:center;gap:8px">
                <label style="font-size:12px;font-weight:900;color:#fcebd2">📍 SUCURSAL:</label>
                <select id="sales-branch-filter" style="padding:6px 12px;border-radius:10px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;outline:none;color:#1a0205">
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(S.branchId)?' selected':''}>${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        const dateOptions = Array.from(datesMap.keys()).sort().reverse();

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Historial de Ventas — ${esc(S.branchName)}</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Tickets cobrados, turnos y métodos de pago</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${branchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-ref-sales"
                    style="padding:8px 16px;background:linear-gradient(135deg,#fff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:var(--wine-950);box-shadow:0 2px 8px rgba(0,0,0,0.2)">
                    🔄 Actualizar Ventas</button>
            </div>
        </div>

        <!-- FILTROS Y RESUMEN DE VENTAS -->
        <div class="dashboard-card" style="padding:18px;border-radius:16px;margin-bottom:20px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
                <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <label style="font-size:12px;font-weight:900;color:var(--wine-800)">FECHA:</label>
                    <select id="sales-date-filter" style="padding:8px 12px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:12.5px;font-weight:700;background:#fff;outline:none">
                        <option value="today"${selectedDate==='today'?' selected':''}>📅 Hoy (${fd(todayStr)})</option>
                        <option value="all"${selectedDate==='all'?' selected':''}>🌐 Todo el Histórico</option>
                        ${dateOptions.filter(d => d !== todayStr).map(d => `<option value="${d}"${selectedDate===d?' selected':''}>📅 ${fd(d)}</option>`).join("")}
                    </select>

                    <label style="font-size:12px;font-weight:900;color:var(--wine-800);margin-left:8px">TURNO:</label>
                    <select id="sales-shift-filter" style="padding:8px 12px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:12.5px;font-weight:700;background:#fff;outline:none">
                        <option value="all"${selectedShift==='all'?' selected':''}>Todos los Turnos</option>
                        <option value="matutino"${selectedShift==='matutino'?' selected':''}>🌅 Matutino</option>
                        <option value="vespertino"${selectedShift==='vespertino'?' selected':''}>🌇 Vespertino</option>
                    </select>
                </div>

                <div style="display:flex;gap:6px">
                    <button type="button" class="sales-tab-btn${S.salesTab==='active'?' active-stab':''}" data-tab="active"
                        style="padding:8px 14px;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer;${S.salesTab==='active'?'background:#15803d;color:#fff;border:none':'background:#f3f4f6;color:#374151;border:1px solid #d1d5db'}">
                        ✓ Ventas Activas (${activeSales.length})
                    </button>
                    <button type="button" class="sales-tab-btn${S.salesTab==='cancelled'?' active-stab':''}" data-tab="cancelled"
                        style="padding:8px 14px;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer;${S.salesTab==='cancelled'?'background:#b91c1c;color:#fff;border:none':'background:#f3f4f6;color:#374151;border:1px solid #d1d5db'}">
                        🚫 Canceladas (${cancelledSales.length})
                    </button>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
                <div style="background:#fff;padding:12px 16px;border-radius:12px;border:1.5px solid rgba(188,132,10,.35)">
                    <small style="font-size:10px;font-weight:900;color:var(--text-muted);display:block">TOTAL VENDIDO</small>
                    <strong style="font-size:22px;color:var(--wine-900);display:block;margin:2px 0">${money(totalActive)}</strong>
                    <small style="color:var(--emerald);font-weight:800">${activeSales.length} tickets</small>
                </div>
                <div style="background:#f0fdf4;padding:12px 16px;border-radius:12px;border:1.5px solid #86efac">
                    <small style="font-size:10px;font-weight:900;color:#166534;display:block">💵 EFECTIVO</small>
                    <strong style="font-size:20px;color:#15803d;display:block;margin:2px 0">${money(totalCash)}</strong>
                    <small style="color:#166534;font-weight:700">${cashSales.length} tickets</small>
                </div>
                <div style="background:#eff6ff;padding:12px 16px;border-radius:12px;border:1.5px solid #93c5fd">
                    <small style="font-size:10px;font-weight:900;color:#1e40af;display:block">💳 TARJETA</small>
                    <strong style="font-size:20px;color:#1d4ed8;display:block;margin:2px 0">${money(totalCard)}</strong>
                    <small style="color:#1e40af;font-weight:700">${cardSales.length} tickets</small>
                </div>
            </div>
        </div>

        <!-- LISTA DE TICKETS Y VENTAS -->
        ${targetList.length ? `
        <div style="display:flex;flex-direction:column;gap:12px">
            ${targetList.map(s => {
                const isCan = String(s.status||"").toUpperCase() === "CANCELLED";
                const isCard = s.payment_method === "card";
                const timeStr = s.created_at ? fdt(s.created_at) : "--:--";
                return `<article class="sale-card" style="background:#fff;border:1.5px solid rgba(188,132,10,.35);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
                    <div>
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                            <strong style="font-size:15px;color:var(--wine-900)">Ticket #${esc(s.sale_number || s.id)}</strong>
                            <span style="font-size:10px;padding:2px 8px;border-radius:12px;font-weight:800;${isCard?'background:#eff6ff;color:#1d4ed8':'background:#f0fdf4;color:#15803d'}">
                                ${isCard ? '💳 Tarjeta' : '💵 Efectivo'}
                            </span>
                            ${isCan ? '<span style="font-size:10px;padding:2px 8px;border-radius:12px;font-weight:900;background:#fee2e2;color:#991b1b">🚫 CANCELADA</span>' : ''}
                        </div>
                        <div style="font-size:11.5px;color:var(--text-muted);font-weight:600">
                            ${timeStr} • Por: <strong>${esc(s.cashier_name || "Encargada")}</strong> (${esc(s.shift_name || "Turno")})
                        </div>
                        ${Array.isArray(s.items) && s.items.length ? `
                        <div style="font-size:11px;color:#4b5563;margin-top:6px">
                            ${s.items.map(i => `• ${i.quantity}x ${esc(i.product_name || 'Producto')} (${money(i.subtotal || i.price*i.quantity)})`).join("<br>")}
                        </div>` : ''}
                    </div>

                    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                        <div style="text-align:right">
                            <div style="font-size:20px;font-weight:900;color:var(--wine-700)">${money(s.total)}</div>
                        </div>
                        <button type="button" class="btn-print-sale" data-id="${esc(s.id)}"
                            style="padding:8px 12px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1px solid var(--gold-400);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:4px">
                            🖨️ Re-Imprimir
                        </button>
                        ${!isCan ? `
                        <button type="button" class="btn-cancel-sale" data-id="${esc(s.id)}" data-num="${esc(s.sale_number || s.id)}"
                            style="padding:8px 12px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer">
                            🚫 Cancelar
                        </button>` : ''}
                        ${S.isSU ? `
                        <button type="button" class="btn-delete-sale" data-id="${esc(s.id)}"
                            style="padding:8px 12px;background:#f3f4f6;color:#4b5563;border:1px solid #d1d5db;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer">
                            🗑 Borrar
                        </button>` : ''}
                    </div>
                </article>`;
            }).join("")}
        </div>` : `
        <div class="empty-state" style="padding:34px;text-align:center">
            <p style="color:var(--text-muted)">No hay ventas registradas con los filtros seleccionados.</p>
        </div>`}
        `;

        c.querySelectorAll(".sales-tab-btn").forEach(btn => btn.addEventListener("click", () => {
            S.salesTab = btn.dataset.tab;
            loadSales();
        }));

        document.getElementById("sales-date-filter")?.addEventListener("change", e => {
            S.salesFilterDate = e.target.value;
            loadSales();
        });

        document.getElementById("sales-shift-filter")?.addEventListener("change", e => {
            S.salesFilterShift = e.target.value;
            loadSales();
        });

        document.getElementById("sales-branch-filter")?.addEventListener("change", async e => {
            await changeBranch(e.target.value);
            await loadSales();
        });

        document.getElementById("btn-ref-sales")?.addEventListener("click", async () => {
            await loadSales();
            toast("Ventas actualizadas.", "info");
        });

        c.querySelectorAll(".btn-print-sale").forEach(btn => btn.addEventListener("click", () => {
            const sid = String(btn.dataset.id);
            const targetSale = branchSales.find(x => String(x.id) === sid) || allRecordedSales.find(x => String(x.id) === sid);
            if (!targetSale) return toast("No se encontró el ticket para imprimir.", "warn");
            printSaleReceipt(targetSale);
            toast(`🖨️ Re-imprimiendo ticket #${targetSale.sale_number || targetSale.id}…`, "info", 3000);
        }));

        c.querySelectorAll(".btn-cancel-sale").forEach(btn => btn.addEventListener("click", async () => {
            const sid = String(btn.dataset.id);
            const snum = btn.dataset.num;
            const reason = await toastPrompt(`Cancelar venta #${snum}:\nEscribe el motivo obligatorio:`, "Error de cobro / Devolución…");
            if (!reason) return;

            let lSales = lr("sales", []);
            const target = lSales.find(x => String(x.id) === sid);
            if (target) { target.status = "CANCELLED"; target.cancel_reason = reason; lw("sales", lSales); }

            let gSales = gr("all_sales", []);
            const gTarget = gSales.find(x => String(x.id) === sid);
            if (gTarget) { gTarget.status = "CANCELLED"; gTarget.cancel_reason = reason; gw("all_sales", gSales); }

            if (db) {
                try {
                    await db.from("sales").update({ status: "CANCELLED", cancel_reason: reason }).eq("id", sid);
                } catch(e) {}
            }

            toast(`✓ Venta #${snum} cancelada con éxito.`, "info", 4000);
            await loadSales();
        }));

        c.querySelectorAll(".btn-delete-sale").forEach(btn => btn.addEventListener("click", async () => {
            const sid = String(btn.dataset.id);
            const ok = await toastConfirm("👑 [Superusuario] ¿Deseas eliminar definitivamente este registro de venta?");
            if (!ok) return;

            let lSales = lr("sales", []).filter(x => String(x.id) !== sid);
            lw("sales", lSales);
            let gSales = gr("all_sales", []).filter(x => String(x.id) !== sid);
            gw("all_sales", gSales);

            if (db) {
                try { await db.from("sales").delete().eq("id", sid); } catch(e) {}
            }

            toast("✓ Registro eliminado de la base de datos.", "info", 4000);
            await loadSales();
        }));
    }

    /* ── CORTES DE CAJA (ARQUEOS Y CIERRES DE TURNO) ── */
    async function loadCuts(silent = false) {
        const c = $("#cuts-container");
        if (!c || !S.branchId) return;
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando cortes de caja de ${esc(S.branchName)}…</p></div>`;
        }

        let remoteCuts = [];
        if (db) {
            try {
                const {data} = await safeQuery(db.from("cash_cuts").select("*").order("created_at", {ascending:false}), null, 1000);
                remoteCuts = data || [];
            } catch(e) {}
        }

        const localCuts = lr("cuts", []);
        const allGlobalCuts = gr("all_cuts", []);
        const cutsMap = new Map();
        localCuts.forEach(ct => cutsMap.set(String(ct.id), ct));
        allGlobalCuts.forEach(ct => cutsMap.set(String(ct.id), ct));
        remoteCuts.forEach(ct => {
            let obs = {};
            try { obs = typeof ct.observations === "string" ? JSON.parse(ct.observations) : (ct.observations || {}); } catch(e) {}
            cutsMap.set(String(ct.id), {
                id: ct.id,
                branch_name: obs.branch_name || S.branchName,
                shift_name: obs.shift_name || "Turno",
                performed_by_name: obs.performed_by_name || "Encargada",
                opening_amount: Number(obs.opening_amount || 0),
                cash_sales: Number(obs.cash_sales || 0),
                card_sales: Number(obs.card_sales || 0),
                total_sales: Number(ct.total_sales || 0),
                expected_cash: Number(ct.expected_cash || 0),
                counted_cash: Number(ct.counted_cash || 0),
                difference: Number(ct.difference || 0),
                net_sales_without_fund: Number(obs.net_sales_without_fund || 0),
                created_at: ct.created_at
            });
        });

        const deletedCutIds = new Set(gr("deleted_cut_ids", []));
        const cutsList = Array.from(cutsMap.values())
            .filter(ct => !deletedCutIds.has(String(ct.id)))
            .filter(ct => S.isSU || matchesBranch(ct, { id: S.branchId, name: S.branchName }))
            .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));

        // Calcular ventas activas del turno actual para el corte
        const consolidated = await getConsolidatedSalesForChain();
        const branchSales = consolidated.filter(s => matchesBranch(s, { id: S.branchId, name: S.branchName }));
        const todayStr = toDateKey();
        const todayActiveSales = branchSales.filter(s => toDateKey(s.created_at) === todayStr && String(s.status||"").toUpperCase() !== "CANCELLED");
        
        const currentCategory = (S.shift.toLowerCase().includes("tarde") || S.shift.toLowerCase().includes("vesp")) ? "vespertino" : "matutino";
        const currentTurnSales = todayActiveSales.filter(s => getShiftCategory(s) === currentCategory);

        const currentCashSales = currentTurnSales.filter(s => (s.payment_method || "cash") === "cash").reduce((a,s)=>a+Number(s.total||0), 0);
        const currentCardSales = currentTurnSales.filter(s => s.payment_method === "card").reduce((a,s)=>a+Number(s.total||0), 0);
        const currentTotalSold = currentCashSales + currentCardSales;
        const initialFund = Number(S.currentShift?.opening_amount || 0);
        const expectedCashInDrawer = initialFund + currentCashSales;

        const branchSelectHtml = S.isSU ? `
            <div style="display:flex;align-items:center;gap:8px">
                <label style="font-size:12px;font-weight:900;color:#fcebd2">📍 SUCURSAL:</label>
                <select id="cuts-branch-filter" style="padding:6px 12px;border-radius:10px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;outline:none;color:#1a0205">
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(S.branchId)?' selected':''}>${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Cortes de Caja — ${esc(S.branchName)} (${esc(S.shift)})</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Arqueos de efectivo, terminal y balance de turnos</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${branchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-ref-cuts"
                    style="padding:8px 16px;background:linear-gradient(135deg,#fff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:var(--wine-950);box-shadow:0 2px 8px rgba(0,0,0,0.2)">
                    🔄 Actualizar Cortes</button>
            </div>
        </div>

        <!-- FORMULARIO NUEVO CORTE DE CAJA -->
        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px">
                <h3 style="color:var(--wine-900);margin:0;font-weight:900">✂️ Realizar Corte de Turno Actual (${esc(S.shift)})</h3>
                <span style="font-size:11px;background:#dcfce7;color:#15803d;padding:4px 10px;border-radius:12px;font-weight:800">
                    🟢 Turno Activo: ${esc(S.shift)}
                </span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:16px">
                <div style="background:#fff;padding:12px 16px;border-radius:12px;border:1.5px solid var(--gold-400)">
                    <small style="font-size:10.5px;font-weight:900;color:var(--text-muted);display:block">FONDO INICIAL</small>
                    <strong style="font-size:20px;color:var(--wine-900)">${money(initialFund)}</strong>
                </div>
                <div style="background:#f0fdf4;padding:12px 16px;border-radius:12px;border:1.5px solid #86efac">
                    <small style="font-size:10.5px;font-weight:900;color:#166534;display:block">💵 COBRADO EFECTIVO</small>
                    <strong style="font-size:20px;color:#15803d">${money(currentCashSales)}</strong>
                </div>
                <div style="background:#eff6ff;padding:12px 16px;border-radius:12px;border:1.5px solid #93c5fd">
                    <small style="font-size:10.5px;font-weight:900;color:#1e40af;display:block">💳 COBRADO TARJETA</small>
                    <strong style="font-size:20px;color:#1d4ed8">${money(currentCardSales)}</strong>
                </div>
                <div style="background:#fdf4ff;padding:12px 16px;border-radius:12px;border:1.5px solid #f0abfc">
                    <small style="font-size:10.5px;font-weight:900;color:#86198f;display:block">EFECTIVO ESPERADO EN CAJA</small>
                    <strong style="font-size:20px;color:#86198f">${money(expectedCashInDrawer)}</strong>
                </div>
            </div>

            <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
                <div style="flex:1;min-width:220px">
                    <label style="font-size:11px;font-weight:900;color:var(--wine-800);display:block;margin-bottom:4px">
                        EFECTIVO CONTADO EN CAJA ($) *
                    </label>
                    <input id="cut-counted-cash" type="number" step="0.5" min="0" placeholder="Ej: 1500.00"
                        style="width:100%;padding:11px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:14px;font-weight:900;box-sizing:border-box">
                </div>
                <button type="button" id="btn-save-cut"
                    style="padding:12px 28px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:900;font-size:13px;cursor:pointer">
                    ✓ Confirmar Corte & Imprimir Ticket
                </button>
            </div>
        </div>

        <!-- HISTORIAL DE CORTES REGISTRADOS -->
        <h3 style="color:#ffffff;margin:0 0 14px;font-weight:900">📜 Historial de Cortes de Caja</h3>
        ${cutsList.length ? `
        <div style="display:flex;flex-direction:column;gap:12px">
            ${cutsList.map(ct => {
                const diff = Number(ct.difference || 0);
                const isOk = diff >= 0;
                return `<article class="sale-card" style="background:#fff;border:1.5px solid rgba(188,132,10,.35);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
                    <div>
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                            <strong style="font-size:15px;color:var(--wine-900)">✂️ Corte — ${esc(ct.branch_name)} (${esc(ct.shift_name)})</strong>
                            <span style="font-size:10px;padding:2px 8px;border-radius:10px;font-weight:800;${isOk?'background:#dcfce7;color:#15803d':'background:#fee2e2;color:#991b1b'}">
                                ${isOk ? '✓ Cuadrado' : '⚠ Diferencia: ' + money(diff)}
                            </span>
                        </div>
                        <div style="font-size:11.5px;color:var(--text-muted);font-weight:600">
                            ${fdt(ct.created_at)} • Por: <strong>${esc(ct.performed_by_name)}</strong>
                        </div>
                        <div style="font-size:11px;color:#4b5563;margin-top:6px;display:flex;gap:14px;flex-wrap:wrap">
                            <span>Fondo: <strong>${money(ct.opening_amount)}</strong></span>
                            <span>Efectivo: <strong style="color:#15803d">${money(ct.cash_sales)}</strong></span>
                            <span>Tarjeta: <strong style="color:#1d4ed8">${money(ct.card_sales)}</strong></span>
                            <span>Total Vendido: <strong style="color:var(--wine-700)">${money(ct.total_sales)}</strong></span>
                        </div>
                    </div>

                    <div style="display:flex;align-items:center;gap:10px">
                        <div style="text-align:right">
                            <small style="font-size:10px;color:var(--text-muted);display:block">CORTE NETO EFECTIVO</small>
                            <strong style="font-size:20px;color:var(--wine-700);font-weight:900">${money(ct.net_sales_without_fund || (ct.counted_cash - ct.opening_amount))}</strong>
                        </div>
                        <button type="button" class="btn-reprint-cut" data-id="${esc(ct.id)}"
                            style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1px solid var(--gold-400);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer">
                            🖨️ Imprimir
                        </button>
                        ${S.isSU ? `
                        <button type="button" class="btn-delete-cut" data-id="${esc(ct.id)}" data-shift="${esc(ct.shift_name)}" data-branch="${esc(ct.branch_name)}"
                            style="padding:8px 12px;background:#fee2e2;color:#991b1b;border:1.5px solid #f87171;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;display:flex;align-items:center;gap:4px">
                            🗑️ Borrar Corte
                        </button>` : ''}
                    </div>
                </article>`;
            }).join("")}
        </div>` : `
        <div class="empty-state" style="padding:34px;text-align:center">
            <p style="color:var(--text-muted)">No hay cortes de caja registrados aún en esta sucursal.</p>
        </div>`}
        `;

        document.getElementById("cuts-branch-filter")?.addEventListener("change", async e => {
            await changeBranch(e.target.value);
            await loadCuts();
        });

        document.getElementById("btn-ref-cuts")?.addEventListener("click", async () => {
            await loadCuts();
            toast("Cortes actualizados.", "info");
        });

        document.getElementById("btn-save-cut")?.addEventListener("click", async () => {
            const countedVal = Number(document.getElementById("cut-counted-cash")?.value);
            if (countedVal === undefined || isNaN(countedVal) || countedVal < 0) {
                return toast("Ingresa el monto de efectivo contado en caja.", "warn");
            }

            const diff = countedVal - expectedCashInDrawer;
            const netWithoutFund = countedVal - initialFund;

            const ok = await toastConfirm(`Confirmar Corte de Turno (${S.shift}):\n• Fondo Inicial: ${money(initialFund)}\n• Cobrado Efectivo: ${money(currentCashSales)}\n• Cobrado Tarjeta: ${money(currentCardSales)}\n• Total Vendido: ${money(currentTotalSold)}\n• Efectivo Contado: ${money(countedVal)}\n• Diferencia: ${diff>=0?'+':''}${money(diff)}\n• Corte Neto Efectivo: ${money(netWithoutFund)}`);
            if (!ok) return;

            const cutRecord = {
                id: "cut_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                branch_id: S.branchId,
                branch_name: S.branchName,
                shift_name: S.shift,
                performed_by_name: S.profile?.full_name || S.user?.email || "Encargada",
                opening_amount: initialFund,
                cash_sales: currentCashSales,
                card_sales: currentCardSales,
                total_sales: currentTotalSold,
                expected_cash: expectedCashInDrawer,
                counted_cash: countedVal,
                difference: diff,
                net_sales_without_fund: netWithoutFund,
                created_at: now()
            };

            const lCuts = lr("cuts", []);
            lCuts.unshift(cutRecord);
            lw("cuts", lCuts);

            const gCuts = gr("all_cuts", []);
            gCuts.unshift(cutRecord);
            gw("all_cuts", gCuts);

            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "cut_created",
                        payload: { cut: cutRecord }
                    });
                } catch(e) {}
            }

            if (db) {
                try {
                    const defaultBranchUUID = "c188dd82-7faf-41b8-948b-af8e789facba";
                    const fallbackUUID = "51bc275d-4e19-4115-be3f-42c0ce3dae5a";
                    const defaultUserUUID = "4710b330-566c-45c7-a92e-b7b6a62355af";

                    const bId = uuid(S.branchId) ? S.branchId : defaultBranchUUID;
                    const cId = uuid(S.companyId) ? S.companyId : fallbackUUID;
                    const uId = uuid(S.user?.id) ? S.user.id : defaultUserUUID;

                    await db.from("cash_cuts").insert({
                        company_id: cId,
                        branch_id: bId,
                        cash_register_id: bId,
                        performed_by: uId,
                        total_sales: currentTotalSold,
                        expected_cash: expectedCashInDrawer,
                        counted_cash: countedVal,
                        difference: diff,
                        observations: JSON.stringify(cutRecord),
                        created_at: cutRecord.created_at
                    });
                } catch(e) {}
            }

            try { printCutReceipt(cutRecord); } catch(e) {}

            toast(`✓ Corte registrado con éxito. Neto: ${money(netWithoutFund)}`, "success", 5000);
            await loadCuts();
        });

        c.querySelectorAll(".btn-reprint-cut").forEach(btn => btn.addEventListener("click", () => {
            const cid = String(btn.dataset.id);
            const target = cutsList.find(x => String(x.id) === cid);
            if (!target) return toast("No se encontró el corte.", "warn");
            try { printCutReceipt(target); } catch(e) {}
            toast(`🖨️ Imprimiendo ticket de corte…`, "info", 3000);
        }));

        if (S.isSU) {
            c.querySelectorAll(".btn-delete-cut").forEach(btn => btn.addEventListener("click", async () => {
                const cid = String(btn.dataset.id);
                const cshift = btn.dataset.shift || "Turno";
                const cbranch = btn.dataset.branch || S.branchName;
                const ok = await toastConfirm("👑 [Superusuario] ¿Deseas eliminar definitivamente este corte duplicado de " + cbranch + " (" + cshift + ")?");
                if (!ok) return;

                // 1. Local storage de sucursal
                let lCuts = lr("cuts", []).filter(x => String(x.id) !== cid);
                lw("cuts", lCuts);

                // 2. Global storage de directivos
                let gCuts = gr("all_cuts", []).filter(x => String(x.id) !== cid);
                gw("all_cuts", gCuts);

                // 3. Registrar en lista negra de eliminados
                const deletedCutIds = gr("deleted_cut_ids", []);
                if (!deletedCutIds.includes(cid)) deletedCutIds.push(cid);
                gw("deleted_cut_ids", deletedCutIds);

                // 4. Base de datos remota Supabase
                if (db) {
                    try {
                        await db.from("cash_cuts").delete().eq("id", cid);
                    } catch(e) {
                        console.warn("Error borrando corte en Supabase:", e);
                    }
                }

                // 5. Difusión en tiempo real
                if (realtimeChannel) {
                    try {
                        realtimeChannel.send({
                            type: "broadcast",
                            event: "cut_deleted",
                            payload: { id: cid }
                        });
                    } catch(e) {}
                }

                toast("✓ Corte duplicado eliminado del sistema.", "success", 4000);
                await loadCuts();
            }));
        }
    }

    /* ── CAMBIO DE TURNO & APERTURA DE FONDO DE CAJA ── */
    async function loadShiftView() {
        const c = $("#shift-container");
        if (!c) return;

        const shiftsHistory = lr("shifts", []);
        const uname = S.profile?.full_name || S.user?.email || "Encargada";

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Cambio de Turno & Apertura — ${esc(S.branchName)}</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Apertura de turno, asignación de fondo inicial de caja y traspaso de turno</div>
            </div>
            <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
        </div>

        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card)">
            <h3 style="color:var(--wine-900);margin:0 0 14px;font-weight:900">🌅 Apertura de Turno & Fondo Inicial</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:14px">
                <div>
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">SUCURSAL</label>
                    <input type="text" value="${esc(S.branchName)}" readonly style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;background:#f9f9f9;font-weight:800;color:var(--wine-900);box-sizing:border-box">
                </div>
                <div>
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">TURNO A ABRIR</label>
                    <select id="open-shift-name" style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;font-weight:800;background:#fff;box-sizing:border-box">
                        <option value="Mañana"${S.shift==='Mañana'?' selected':''}>🌅 Turno Matutino (Mañana)</option>
                        <option value="Tarde"${S.shift==='Tarde'?' selected':''}>🌇 Turno Vespertino (Tarde)</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">FONDO INICIAL EN CAJA ($) *</label>
                    <input id="open-shift-amount" type="number" step="10" min="0" placeholder="Ej: 500.00" value="${S.currentShift?.opening_amount || 500}"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;font-weight:900;box-sizing:border-box">
                </div>
            </div>
            <button type="button" id="btn-open-shift"
                style="padding:12px 28px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer">
                ✓ Iniciar Turno con este Fondo
            </button>
        </div>

        <h3 style="color:#ffffff;margin:0 0 14px;font-weight:900">📜 Historial de Aperturas de Turno</h3>
        ${shiftsHistory.length ? `
        <div style="display:flex;flex-direction:column;gap:12px">
            ${shiftsHistory.map(sh => `
            <article class="sale-card" style="background:#fff;border:1.5px solid rgba(188,132,10,.35);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                <div>
                    <strong style="font-size:15px;color:var(--wine-900)">Turno ${esc(sh.shift_name)}</strong>
                    <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">
                        Iniciado: ${fdt(sh.opened_at || sh.created_at)} • Encargada: <strong>${esc(sh.cashier_name)}</strong>
                    </div>
                </div>
                <div style="text-align:right">
                    <small style="font-size:10px;color:var(--text-muted);display:block">FONDO INICIAL</small>
                    <strong style="font-size:18px;color:#15803d;font-weight:900">${money(sh.opening_amount)}</strong>
                </div>
            </article>`).join("")}
        </div>` : `
        <div class="empty-state" style="padding:30px;text-align:center">
            <p style="color:var(--text-muted)">No hay registros previos de apertura de turno.</p>
        </div>`}
        `;

        document.getElementById("btn-open-shift")?.addEventListener("click", async () => {
            const shiftName = document.getElementById("open-shift-name")?.value || "Mañana";
            const amount = Number(document.getElementById("open-shift-amount")?.value || 0);

            S.shift = shiftName;
            const shiftObj = {
                id: "shift_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                branch_id: S.branchId,
                branch_name: S.branchName,
                shift_name: shiftName,
                cashier_name: uname,
                opening_amount: amount,
                opened_at: now(),
                is_active: true
            };

            S.currentShift = shiftObj;
            lw("current_shift", shiftObj);

            const shifts = lr("shifts", []);
            shifts.unshift(shiftObj);
            lw("shifts", shifts);

            updateUI();
            toast(`✓ Turno ${shiftName} iniciado con fondo de ${money(amount)}.`, "success", 4000);
            await loadShiftView();
        });
    }

    /* ── CAJA ACTUAL ── */
    async function loadCurrentShift() {
        if (!db || !S.branchId) return null;
        try {
            let q = db.from("open_shift_cash_summary_view").select("*").limit(1);
            if (uuid(S.branchId)) q = q.eq("branch_id", S.branchId);
            const {data} = await safeQuery(q.maybeSingle(), {data: null}, 1000);
            S.currentShift = data || null;
            const open = S.currentShift && String(S.currentShift.status||"").toUpperCase() === "OPEN";
            setT("#cash-status-text,#cashStatus,[data-cash-status]", open ? ("CAJA ABIERTA (" + S.shift + ")") : "CAJA ABIERTA");
            const dot = $("#cash-dot,.cash-dot");
            if (dot) dot.style.background = "#10b981";
        } catch {
            setT("#cash-status-text,#cashStatus,[data-cash-status]", "CAJA ABIERTA (" + S.shift + ")");
        }
        return S.currentShift;
    }

    /* ── DAÑOS & AVISOS DIRECTIVOS ── */
    async function loadDamageReports(silent = false) {
        const c = document.getElementById("damage-reports-container");
        if (!c) return;
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div></div>`;
        }

        let remoteReports = [];
        if (db) {
            try {
                let q = db.from("damage_reports").select("*").order("created_at", {ascending:false});
                if (!S.isSU && uuid(S.branchId)) q = q.eq("branch_id", S.branchId);
                const {data} = await q;
                remoteReports = data || [];
            } catch(e) {}
        }

        const allGlobalReports = gr("all_damage_reports", []);
        const repMap = new Map();
        allGlobalReports.forEach(r => repMap.set(String(r.id), r));
        remoteReports.forEach(r => { if (!repMap.has(String(r.id))) repMap.set(String(r.id), r); });

        let reports = Array.from(repMap.values()).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        if (!S.isSU) {
            reports = reports.filter(r => String(r.branch_id) === String(S.branchId) || String(r.branch_name).toLowerCase() === String(S.branchName).toLowerCase());
        }

        const tl = {damage:"Daño en producto", request:"Petición / Solicitud", notice:"Aviso general"};
        const tb = {damage:"#fee2e2;color:#991b1b", request:"#dbeafe;color:#1d4ed8", notice:"#fef3c7;color:#b45309"};
        const ti = {damage:"💥", request:"📋", notice:"📢"};

        c.innerHTML = `
        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc)">
            <h3 style="color:var(--wine-900);margin:0 0 6px">🔔 Registrar Nuevo Reporte / Petición / Aviso</h3>
            <p style="color:var(--text-muted);font-size:12px;margin:0 0 16px">
                Sucursal que reporta: <strong style="color:var(--wine-900)">${esc(S.branchName)}</strong> • Por: <strong>${esc(S.profile?.full_name || S.user?.email || "Encargada")}</strong></p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:12px">
                <div><label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">TIPO DE REPORTE</label>
                    <select id="rep-type" style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box">
                        <option value="damage">💥 Daño en producto</option>
                        <option value="request">📋 Petición / Solicitud de material</option>
                        <option value="notice">📢 Aviso general a dirección</option>
                    </select></div>
                <div><label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">TÍTULO / ASUNTO *</label>
                    <input type="text" id="rep-title" placeholder="Ej: Se dañaron 5 paletas de fresa"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box"></div>
            </div>
            <div style="margin-bottom:14px"><label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">DESCRIPCIÓN DETALLADA *</label>
                <textarea id="rep-desc" rows="3" placeholder="Describe los detalles…"
                    style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box;resize:vertical"></textarea></div>
            <button type="button" id="btn-send-rep"
                style="padding:12px 30px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:800;font-size:14px;cursor:pointer">
                ✓ Enviar Reporte a Dirección</button>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
            <h3 style="margin:0;color:#ffffff;font-weight:900">${S.isSU ? "👑 Todos los Reportes (Las 6 Sucursales en Tiempo Real)" : "Mis Reportes Registrados — " + esc(S.branchName)}</h3>
            <button type="button" id="btn-ref-rep"
                style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:8px;cursor:pointer;font-weight:bold">
                🔄 Actualizar Reportes</button>
        </div>
        ${reports.length
            ? `<div style="display:flex;flex-direction:column;gap:12px">
                ${reports.map(r => {
                    const type = String(r.report_type || r.type || "notice");
                    const bg   = tb[type] || tb.notice;
                    const icon = ti[type] || "📌";
                    return `<article class="sale-card" style="background:#fff;border:1px solid rgba(188,132,10,.35);border-radius:14px;padding:18px">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:8px">
                            <div>
                                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                                    <span style="font-size:11px;padding:3px 10px;border-radius:12px;background:${bg};font-weight:900">
                                        ${icon} ${esc(tl[type]||"Aviso")}</span>
                                    <span style="font-size:11px;background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:10px;font-weight:900">
                                        📍 Sucursal: ${esc(r.branch_name || "La Fuente")}</span>
                                </div>
                                <strong style="font-size:16px;color:var(--wine-900)">${esc(r.title||"Sin título")}</strong>
                                <div style="font-size:12px;color:var(--text-muted);margin-top:3px">
                                    Reportado por: <strong>${esc(r.user_name||"Encargada")}</strong> • 🕐 <strong>${fdt(r.created_at)}</strong></div>
                            </div>
                            <span style="font-size:11px;padding:3px 10px;border-radius:12px;font-weight:900;
                                background:${r.status==="reviewed" ? "#dcfce7;color:#15803d" : "#fef3c7;color:#b45309"}">
                                ${r.status==="reviewed" ? "✓ Revisado por Dirección" : "⏳ Pendiente"}</span>
                        </div>
                        <p style="font-size:13px;color:#333;margin:0 0 10px;padding:12px;background:#fffcf2;border-radius:8px;border-left:4px solid var(--gold-500);line-height:1.4">
                            ${esc(r.description||"")}</p>
                        ${r.superuser_notes
                            ? `<div style="font-size:12px;background:#dcfce7;border-radius:8px;padding:10px;color:#15803d;border-left:4px solid #86efac;margin-bottom:8px">
                                <strong>👑 Respuesta de Dirección:</strong> ${esc(r.superuser_notes)}</div>` : ""}
                        ${S.isSU && r.status !== "reviewed"
                            ? `<button type="button" class="btn-rev-rep" data-id="${esc(r.id)}"
                                style="padding:8px 18px;background:#dcfce7;color:#15803d;border:1px solid #86efac;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer">
                                ✓ Responder y Marcar Revisado</button>` : ""}
                    </article>`;
                }).join("")}
               </div>`
            : `<div class="empty-state" style="padding:40px;text-align:center">
                <div style="font-size:40px">🔔</div>
                <p style="color:var(--text-muted)">No hay reportes registrados.</p>
               </div>`}`;

        document.getElementById("btn-send-rep")?.addEventListener("click", async () => {
            const type  = document.getElementById("rep-type")?.value;
            const title = document.getElementById("rep-title")?.value.trim();
            const desc  = document.getElementById("rep-desc")?.value.trim();
            if (!title) return toast("Escribe el título del reporte.", "warn");
            if (!desc)  return toast("Escribe la descripción detallada.", "warn");

            const ts = now();
            const repRecord = {
                id: "rep_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                report_type: type,
                title: title,
                description: desc,
                branch_id: S.branchId,
                branch_name: S.branchName,
                user_id: S.user?.id,
                user_name: S.profile?.full_name || S.user?.email || "Encargada",
                status: "pending",
                created_at: ts
            };

            const allGlobal = gr("all_damage_reports", []);
            allGlobal.unshift(repRecord);
            gw("all_damage_reports", allGlobal);

            if (db) {
                try {
                    await db.from("damage_reports").insert(repRecord);
                } catch(e) {}
            }

            toast("✓ Reporte enviado. Jaquelin e Ignacio lo verán al instante.", "success", 5000);
            document.getElementById("rep-title").value = "";
            document.getElementById("rep-desc").value  = "";
            await loadDamageReports();
        });

        document.getElementById("btn-ref-rep")?.addEventListener("click", async () => {
            await loadDamageReports();
            toast("Reportes actualizados.", "info");
        });

        c.querySelectorAll(".btn-rev-rep").forEach(btn => btn.addEventListener("click", async () => {
            const notes = await toastPrompt("Escribe tu respuesta directiva:", "Instrucciones o respuesta…");
            if (!notes) return;

            const allGlobal = gr("all_damage_reports", []);
            const target = allGlobal.find(x => String(x.id) === String(btn.dataset.id));
            if (target) {
                target.status = "reviewed";
                target.superuser_notes = notes;
                gw("all_damage_reports", allGlobal);
            }

            if (db) {
                try {
                    await db.from("damage_reports").update({status: "reviewed", superuser_notes: notes}).eq("id", btn.dataset.id);
                } catch(e) {}
            }

            toast("✓ Reporte respondido y archivado.", "success");
            await loadDamageReports();
        }));
    }

    /* ── MOTOR UNIFICADO DE RECUPERACIÓN Y CONSOLIDACIÓN DE VENTAS (HISTÓRICO + EN VIVO + OFFLINE) ── */
    async function getConsolidatedSalesForChain() {
        let remoteSales = [];
        if (db) {
            try {
                // Consulta con timeout generoso (5000ms) para garantizar recuperación total de ventas
                const {data, error} = await safeQuery(db.from("sales")
                    .select("id,company_id,branch_id,shift_id,user_id,sale_number,total,status,observations,created_at")
                    .order("created_at", {ascending:false})
                    .limit(5000), null, 5000);
                if (data && data.length) {
                    remoteSales = data.map(s => {
                        let obs = {};
                        try {
                            obs = typeof s.observations === "string" ? JSON.parse(s.observations) : (s.observations || {});
                        } catch(e) {}

                        // Reconstruir nombre de sucursal mediante observaciones, id de sucursal o email de encargada
                        let bName = obs.branch_name || S.branches.find(b=>String(b.id)===String(s.branch_id))?.name || "";
                        const cashierName = obs.cashier_name || s.user_name || "";
                        if (!bName && cashierName) {
                            const cLower = cashierName.toLowerCase();
                            for (const [em, staffInfo] of Object.entries(STAFF)) {
                                if (cLower.includes(em.toLowerCase()) || (cLower.match(/encargado\d+/) && em.includes(cLower.match(/encargado\d+/)[0]))) {
                                    bName = staffInfo.b;
                                    break;
                                }
                            }
                        }
                        if (!bName) bName = "La Fuente Calzada";

                        return {
                            id: s.id,
                            sale_number: s.sale_number || ("TICK-" + String(s.id).substring(0,8)),
                            branch_id: s.branch_id,
                            branch_name: bName,
                            shift_name: obs.shift_name || "Mañana",
                            cashier_id: s.user_id,
                            cashier_name: cashierName || "Encargada",
                            total: Number(s.total || 0),
                            payment_method: obs.payment_method || "cash",
                            status: String(s.status||"").toUpperCase() === "CANCELLED" ? "CANCELLED" : "COMPLETED",
                            items: obs.items || [],
                            created_at: s.created_at || now(),
                            local_id: obs.local_id || s.id
                        };
                    });
                }
            } catch(e) {
                console.warn("Supabase fetch sales error:", e);
            }
        }

        const salesMap = new Map();
        const cancelledReasons = Object.assign({}, lr("cancelled_reasons", {}), gr("cancelled_reasons", {}));

        // 1. ESCANEO EXHAUSTIVO DE TODAS LAS VENTAS GUARDADAS EN CUALQUIER LLAVE LOCALSTORAGE
        try {
            if (typeof localStorage !== "undefined") {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && (key.startsWith("lf_") || key.includes("sales"))) {
                        try {
                            const raw = localStorage.getItem(key);
                            if (!raw || !raw.startsWith("[")) continue;
                            const parsed = JSON.parse(raw);
                            if (Array.isArray(parsed)) {
                                parsed.forEach(item => {
                                    if (item && (item.total != null || item.sale_number || item.items)) {
                                        const sid = String(item.id || item.sale_number || (Date.now() + Math.random()));
                                        if (!salesMap.has(sid)) {
                                            salesMap.set(sid, item);
                                        }
                                    }
                                });
                            }
                        } catch(e) {}
                    }
                }
            }
        } catch(e) {}

        // 2. FUSIONAR Y DEDUPLICAR CON LAS VENTAS DE SUPABASE
        remoteSales.forEach(s => {
            const sid = String(s.id);
            let matchedKey = null;
            for (const [key, existing] of salesMap.entries()) {
                if (key === sid || 
                   (s.local_id && (key === String(s.local_id) || String(existing.local_id) === String(s.local_id) || String(existing.id) === String(s.local_id))) || 
                   (s.sale_number && existing.sale_number === s.sale_number)) {
                    matchedKey = key;
                    break;
                }
            }
            if (matchedKey) {
                salesMap.set(matchedKey, { ...salesMap.get(matchedKey), ...s });
            } else {
                salesMap.set(sid, s);
            }
        });

        // 3. Normalizar estado de cancelaciones
        for (const [k, s] of salesMap.entries()) {
            if (cancelledReasons[String(s.id)] || cancelledReasons[String(s.sale_number)]) {
                s.status = "CANCELLED";
            }
        }

        const consolidated = Array.from(salesMap.values()).sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        gw("all_sales", consolidated);
        return consolidated;
    }

    /* ── ACCESO PRIVADO DIRECTIVO (MONITOR EN VIVO & CIERRE DE DÍA) ── */
    async function loadPrivateAccess(silent = false) {
        const c = $("#private-access-container");
        if (!c) return;
        if (!S.isSU) {
            if (window.changeView) window.changeView("pos");
            return;
        }
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Sincronizando las 6 sucursales en tiempo real con Contabilidad…</p></div>`;
        }

        const consolidatedSales = await getConsolidatedSalesForChain();
        const todayStr = toDateKey();
        const closedDates = gr("closed_business_days", []);
        const isTodayClosed = closedDates.includes(todayStr);

        // Si el día ya se finalizó con el botón, las ventas archivadas no suman al monitor en vivo activo
        const todaySales = consolidatedSales.filter(s => toDateKey(s.created_at) === todayStr && !s.is_archived_day);

        const allReps = gr("all_damage_reports", []);
        const pendingReps = allReps.filter(r => r.status !== "reviewed");

        let chainTotal = 0;
        let chainCashTotal = 0;
        let chainCardTotal = 0;
        let chainMatTotal = 0;
        let chainVesTotal = 0;

        const summary = S.branches.map(b => {
            const bs = todaySales.filter(s => matchesBranch(s, b));
            const total = bs.reduce((acc,s) => acc + Number(s.total||0), 0);
            const cashTotal = bs.filter(s => (s.payment_method || "cash") === "cash").reduce((acc,s) => acc + Number(s.total||0), 0);
            const cardTotal = bs.filter(s => s.payment_method === "card").reduce((acc,s) => acc + Number(s.total||0), 0);
            const matSales = bs.filter(s => getShiftCategory(s) === "matutino");
            const vesSales = bs.filter(s => getShiftCategory(s) === "vespertino");
            const matTotal = matSales.reduce((acc,s) => acc + Number(s.total||0), 0);
            const vesTotal = vesSales.reduce((acc,s) => acc + Number(s.total||0), 0);

            chainTotal += total;
            chainCashTotal += cashTotal;
            chainCardTotal += cardTotal;
            chainMatTotal += matTotal;
            chainVesTotal += vesTotal;

            return {
                id: b.id,
                name: b.name,
                sales: total,
                orders: bs.length,
                cashTotal: cashTotal,
                cardTotal: cardTotal,
                matTotal: matTotal,
                matOrders: matSales.length,
                vesTotal: vesTotal,
                vesOrders: vesSales.length,
                isOpen: true
            };
        });

        // Últimas 15 ventas en vivo de la red
        const liveRecentSales = todaySales.slice(0, 15);

        c.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px">
            <div class="dashboard-card" style="background:linear-gradient(135deg,#230408,#5c121b);color:#fff;border-color:var(--gold-400);padding:22px;border-radius:18px">
                <span style="color:#fef08a;font-size:10px;font-weight:900;letter-spacing:1px">VENTA TOTAL CONSOLIDADA HOY</span>
                <div style="font-size:30px;font-weight:900;margin:6px 0;color:#ffffff">${money(chainTotal)}</div>
                <small style="color:#fde68a">6 Sucursales en Vivo • Conectado a Contabilidad</small>
            </div>
            <div class="dashboard-card" style="padding:22px;border-radius:18px">
                <span class="section-kicker">TICKETS COBRADOS HOY</span>
                <div style="font-size:30px;font-weight:900;color:#ffffff;margin:6px 0">${todaySales.length}</div>
                <small style="color:#fcebd2">💵 Efectivo: ${money(chainCashTotal)} • 💳 Tarjeta: ${money(chainCardTotal)}</small>
            </div>
            <div class="dashboard-card" style="padding:22px;border-radius:18px">
                <span class="section-kicker">TURNOS HOY (RED COMPLETA)</span>
                <div style="font-size:18px;font-weight:900;color:#ffffff;margin:6px 0">
                    🌅 ${money(chainMatTotal)} <span style="font-size:12px;font-weight:normal;color:#fcebd2">(Matutino)</span>
                </div>
                <div style="font-size:18px;font-weight:900;color:#ffffff">
                    🌇 ${money(chainVesTotal)} <span style="font-size:12px;font-weight:normal;color:#fcebd2">(Vespertino)</span>
                </div>
            </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <h3 style="margin:0;color:#ffffff;font-weight:900">📍 Monitor de Red en Vivo (6 Sucursales)</h3>
            <div style="display:flex;gap:8px">
                <button type="button" id="btn-close-day" style="padding:9px 18px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1px solid var(--gold-400);border-radius:10px;font-weight:900;cursor:pointer">
                    🌙 Finalizar Día & Archivar en Contabilidad</button>
                <button type="button" id="btn-ref-priv" style="padding:9px 18px;background:#fff;border:1.5px solid var(--gold-500);border-radius:10px;font-weight:800;cursor:pointer">
                    🔄 Actualizar</button>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:18px;margin-bottom:28px">
        ${summary.map(b => `
            <div style="background:linear-gradient(145deg,#fffef9,#fceecc);border:1.5px solid rgba(188,132,10,.38);border-radius:18px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 14px rgba(0,0,0,0.15)">
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                        <strong style="font-size:16px;color:var(--wine-900)">🍦 ${esc(b.name)}</strong>
                        <span style="font-size:10px;padding:4px 10px;border-radius:20px;font-weight:bold;background:#dcfce7;color:#15803d">
                            🟢 EN VIVO</span>
                    </div>
                    <div style="background:#fffcf0;border:1px solid #f2e6b5;border-radius:10px;padding:12px;margin-bottom:12px">
                        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                            <span style="font-size:12px;color:var(--text-muted);font-weight:700">Ventas Hoy:</span>
                            <strong style="font-size:17px;color:var(--wine-700)">${money(b.sales)}</strong>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                            <span style="font-size:11px;color:var(--text-muted)">Tickets:</span>
                            <span style="font-weight:700;color:var(--wine-900);font-size:12px">${b.orders}</span>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:6px;border-top:1px dashed #e5e7eb;font-size:11px">
                            <div>💵 Efectivo: <strong style="color:#15803d">${money(b.cashTotal)}</strong></div>
                            <div>💳 Tarjeta: <strong style="color:#1d4ed8">${money(b.cardTotal)}</strong></div>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:4px;font-size:10px;color:var(--text-muted)">
                            <div>🌅 Matutino: <strong style="color:var(--wine-800)">${money(b.matTotal)}</strong></div>
                            <div>🌇 Vespertino: <strong style="color:var(--wine-800)">${money(b.vesTotal)}</strong></div>
                        </div>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                    <button type="button" class="btn-pv-sales" data-branch="${esc(b.id)}"
                        style="padding:9px;background:#fff3c4;color:#713f12;border:1px solid var(--gold-600);border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">
                        🪙 Ver Ventas</button>
                    <button type="button" class="btn-pv-cuts" data-branch="${esc(b.id)}"
                        style="padding:9px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">
                        ✂️ Ver Cortes</button>
                    <button type="button" class="btn-pv-pos" data-branch="${esc(b.id)}"
                        style="grid-column:1/-1;padding:10px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer">
                        Operar esta Sucursal →</button>
                </div>
            </div>`).join("")}
        </div>

        <!-- MONITOR DE TRANSACCIONES EN VIVO (ÚLTIMAS VENTAS REGISTRADAS) -->
        <div class="dashboard-card" style="padding:22px;border-radius:18px;background:#fff;border:1.5px solid rgba(188,132,10,.35);box-shadow:0 4px 14px rgba(0,0,0,0.15)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
                <div>
                    <h3 style="margin:0;color:var(--wine-900);font-weight:900;display:flex;align-items:center;gap:8px">
                        <span>⚡</span> Flujo de Ventas en Vivo (Toda la Cadena)
                    </h3>
                    <small style="color:var(--text-muted);font-weight:600">Transacciones registradas en tiempo real en las 6 sucursales</small>
                </div>
                <span style="font-size:11px;font-weight:800;color:var(--emerald);background:#dcfce7;padding:4px 12px;border-radius:12px">
                    ● Conexión Automática Activa
                </span>
            </div>
            ${liveRecentSales.length ? `
            <div style="overflow-x:auto">
                <table style="width:100%;border-collapse:collapse;font-size:12px">
                    <thead>
                        <tr style="background:#fffdf2;border-bottom:2px solid #e5e7eb;text-align:left;color:var(--wine-900)">
                            <th style="padding:10px 8px;font-weight:900">Hora</th>
                            <th style="padding:10px 8px;font-weight:900">Sucursal</th>
                            <th style="padding:10px 8px;font-weight:900">Encargada / Turno</th>
                            <th style="padding:10px 8px;font-weight:900">Pago</th>
                            <th style="padding:10px 8px;font-weight:900">Ticket</th>
                            <th style="padding:10px 8px;font-weight:900;text-align:right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${liveRecentSales.map(s => {
                            const isCard = (s.payment_method === "card");
                            const timeStr = s.created_at ? new Date(s.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'}) : '--:--';
                            return `<tr style="border-bottom:1px solid #f3f4f6">
                                <td style="padding:9px 8px;color:var(--text-muted);font-weight:700">${timeStr}</td>
                                <td style="padding:9px 8px;font-weight:800;color:var(--wine-900)">📍 ${esc(s.branch_name || "Sucursal")}</td>
                                <td style="padding:9px 8px;color:#4b5563">${esc(s.cashier_name || "Encargada")} <small style="color:var(--text-muted)">(${esc(s.shift_name || "Turno")})</small></td>
                                <td style="padding:9px 8px">${isCard ? '<span style="color:#1d4ed8;font-weight:800;background:#eff6ff;padding:2px 6px;border-radius:4px">💳 Tarjeta</span>' : '<span style="color:#15803d;font-weight:800;background:#f0fdf4;padding:2px 6px;border-radius:4px">💵 Efectivo</span>'}</td>
                                <td style="padding:9px 8px;font-weight:700;color:var(--text-muted)">#${esc(s.sale_number || s.id)}</td>
                                <td style="padding:9px 8px;font-weight:900;color:var(--wine-700);text-align:right;font-size:13px">${money(s.total)}</td>
                            </tr>`;
                        }).join("")}
                    </tbody>
                </table>
            </div>` : `
            <div style="padding:24px;text-align:center;color:var(--text-muted)">
                <p style="margin:0">Aún no hay ventas registradas el día de hoy.</p>
            </div>`}
        </div>`;

        document.getElementById("btn-ref-priv")?.addEventListener("click", async () => {
            await loadPrivateAccess();
            toast("Monitor en vivo y sincronización con contabilidad actualizados.", "info");
        });

        document.getElementById("btn-close-day")?.addEventListener("click", async () => {
            const ok = await toastConfirm("¿Deseas finalizar el día de hoy?\nSe generará el cierre contable oficial por sucursal y turnos (Matutino y Vespertino) y se archivará en la sección de Contabilidad.");
            if (!ok) return;

            const dateKey = todayStr;
            const history = gr("accounting_history", []);

            const dailyArchive = {
                date: dateKey,
                created_at: now(),
                total_chain: chainTotal,
                total_tickets: todaySales.length,
                branches: summary.map(b => {
                    const bSales = todaySales.filter(s => matchesBranch(s, b));
                    const matSales = bSales.filter(s => getShiftCategory(s) === "matutino");
                    const vesSales = bSales.filter(s => getShiftCategory(s) === "vespertino");
                    return {
                        branch_name: b.name,
                        total_day: b.sales,
                        matutino_total: matSales.reduce((a,s)=>a+Number(s.total||0), 0),
                        matutino_tickets: matSales.length,
                        vespertino_total: vesSales.reduce((a,s)=>a+Number(s.total||0), 0),
                        vespertino_tickets: vesSales.length
                    };
                })
            };

            // Evitar duplicados del mismo día reemplazando si ya existe
            const existingIdx = history.findIndex(h => h.date === dateKey);
            if (existingIdx >= 0) {
                history[existingIdx] = dailyArchive;
            } else {
                history.unshift(dailyArchive);
            }
            gw("accounting_history", history);

            // Guardar registro de cierre de jornada para restablecer el monitor en vivo
            const closedDates = gr("closed_business_days", []);
            if (!closedDates.includes(dateKey)) {
                closedDates.push(dateKey);
                gw("closed_business_days", closedDates);
            }

            // Marcar las ventas archivadas del día
            const allGlobalSales = gr("all_sales", []);
            allGlobalSales.forEach(s => {
                if (toDateKey(s.created_at) === dateKey) {
                    s.is_archived_day = true;
                }
            });
            gw("all_sales", allGlobalSales);

            toast("✓ Día finalizado con éxito. Ventas archivadas en Contabilidad y valores restablecidos a $0.00 para la nueva jornada.", "success", 5000);
            window.changeView("accounting");
        });

        c.querySelectorAll(".btn-pv-sales").forEach(btn => btn.addEventListener("click", async () => { await changeBranch(btn.dataset.branch); window.changeView("sales"); }));
        c.querySelectorAll(".btn-pv-cuts").forEach(btn =>  btn.addEventListener("click", async () => { await changeBranch(btn.dataset.branch); window.changeView("cuts"); }));
        c.querySelectorAll(".btn-pv-pos").forEach(btn =>   btn.addEventListener("click", async () => { await changeBranch(btn.dataset.branch); window.changeView("pos"); }));
    }

    /* ── GESTIÓN DE VENTAS / CONTABILIDAD (DESGLOSE MATUTINO & VESPERTINO) ── */
    async function loadAccounting(silent = false) {
        const c = $("#accounting-container");
        if (!c) return;
        if (!S.isSU) {
            window.changeView("pos");
            return;
        }
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando balances y contabilidad sincronizada…</p></div>`;
        }

        const history = gr("accounting_history", []);
        const allSales = await getConsolidatedSalesForChain();

        const allHistoricalActive = allSales.filter(s => String(s.status||"").toUpperCase() !== "CANCELLED");
        const grandHistoricalTotal = allHistoricalActive.reduce((acc,s) => acc + Number(s.total||0), 0);
        const grandHistoricalCash = allHistoricalActive.filter(s => (s.payment_method || "cash") === "cash").reduce((a,s)=>a+Number(s.total||0), 0);
        const grandHistoricalCard = allHistoricalActive.filter(s => s.payment_method === "card").reduce((a,s)=>a+Number(s.total||0), 0);
        const grandHistoricalTickets = allHistoricalActive.length;

        const datesMap = new Map();
        allSales.forEach(s => {
            const d = toDateKey(s.created_at);
            if (d) {
                if (!datesMap.has(d)) datesMap.set(d, []);
                datesMap.get(d).push(s);
            }
        });

        const todayStr = toDateKey();
        if (!datesMap.has(todayStr)) {
            datesMap.set(todayStr, []);
        }

        if (!S.accHistoryFilterDate) {
            S.accHistoryFilterDate = todayStr;
        }

        const selectedDate = S.accHistoryFilterDate || todayStr;
        const isAllDates = (selectedDate === "all");

        const activeUnarchivedSales = isAllDates
            ? allHistoricalActive
            : (datesMap.get(selectedDate) || []).filter(s => String(s.status||"").toUpperCase() !== "CANCELLED");

        const totalSelectedDate = activeUnarchivedSales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const cashSalesChain = activeUnarchivedSales.filter(s => (s.payment_method || "cash") === "cash");
        const cardSalesChain = activeUnarchivedSales.filter(s => s.payment_method === "card");
        const totalCashChain = cashSalesChain.reduce((a,s)=>a+Number(s.total||0), 0);
        const totalCardChain = cardSalesChain.reduce((a,s)=>a+Number(s.total||0), 0);

        const matChainSales = activeUnarchivedSales.filter(s => getShiftCategory(s) === "matutino");
        const vesChainSales = activeUnarchivedSales.filter(s => getShiftCategory(s) === "vespertino");
        const matChainTotal = matChainSales.reduce((a,s)=>a+Number(s.total||0), 0);
        const vesChainTotal = vesChainSales.reduce((a,s)=>a+Number(s.total||0), 0);

        const dateOptions = Array.from(datesMap.keys()).sort().reverse();

        c.innerHTML = `
        <!-- RESUMEN HISTÓRICO GLOBAL DE LA CADENA (DESDE EL DÍA 1) -->
        <div class="dashboard-card" style="background:linear-gradient(135deg,#1f0307,#4a0c14);color:#fff;border:2px solid var(--gold-400);padding:22px;border-radius:18px;margin-bottom:20px;box-shadow:var(--shadow-card)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px">
                <div>
                    <span style="color:#fef08a;font-size:11px;font-weight:900;letter-spacing:1.5px">👑 CONTROL DIRECTIVO SUPERUSUARIO</span>
                    <h2 style="margin:4px 0 0;font-size:22px;color:#fff;font-weight:900">Acumulado Histórico de la Cadena Completa</h2>
                </div>
                <div style="text-align:right">
                    <span style="font-size:11px;color:#fde68a;font-weight:800">Total Histórico en Sistema</span>
                    <div style="font-size:32px;font-weight:900;color:#ffffff">${money(grandHistoricalTotal)}</div>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;padding-top:10px;border-top:1px solid rgba(254,240,138,0.2)">
                <div style="background:rgba(255,255,255,0.08);padding:10px 14px;border-radius:10px">
                    <small style="color:#fde68a;font-size:10px;font-weight:800;display:block">TICKETS TOTALES</small>
                    <strong style="font-size:18px;color:#fff">${grandHistoricalTickets}</strong>
                </div>
                <div style="background:rgba(22,101,52,0.25);padding:10px 14px;border-radius:10px;border:1px solid rgba(134,239,172,0.3)">
                    <small style="color:#86efac;font-size:10px;font-weight:800;display:block">💵 EFECTIVO HISTÓRICO</small>
                    <strong style="font-size:18px;color:#86efac">${money(grandHistoricalCash)}</strong>
                </div>
                <div style="background:rgba(30,64,175,0.25);padding:10px 14px;border-radius:10px;border:1px solid rgba(147,197,253,0.3)">
                    <small style="color:#93c5fd;font-size:10px;font-weight:800;display:block">💳 TARJETA HISTÓRICA</small>
                    <strong style="font-size:18px;color:#93c5fd">${money(grandHistoricalCard)}</strong>
                </div>
            </div>
        </div>

        <!-- REPORTE DETALLADO POR FECHA DE JORNADA -->
        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
                <div>
                    <h3 style="color:var(--wine-900);margin:0;font-weight:900">📊 Gestión de Ventas & Balance Global</h3>
                    <p style="color:var(--text-muted);font-size:12px;margin:3px 0 0;font-weight:700">Informes diarios consolidados por sucursal, turnos y métodos de pago (Efectivo y Tarjeta) sincronizados</p>
                </div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                    <label style="font-size:12px;font-weight:900;color:var(--wine-800)">FECHA:</label>
                    <select id="acc-date-filter" style="padding:8px 12px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:13px;font-weight:700;background:#fff;outline:none;color:#1a0205">
                        <option value="today"${selectedDate==="today"||selectedDate===todayStr?" selected":""}>📅 Hoy (${fd(todayStr)})</option>
                        <option value="all"${selectedDate==="all"?" selected":""}>🌐 Todo el Histórico Consolidado</option>
                        ${dateOptions.filter(d => d !== todayStr).map(d => `<option value="${d}"${selectedDate===d?" selected":""}>📅 ${fd(d)}</option>`).join("")}
                    </select>
                    <button type="button" id="btn-print-daily-acc" style="padding:8px 16px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)">
                        <span>🖨️</span><span>Imprimir Corte Diario</span>
                    </button>
                    <button type="button" id="btn-ref-acc" style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:10px;cursor:pointer;font-weight:bold;font-size:12px">🔄 Actualizar</button>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px">
                <div style="background:#fff;padding:16px;border-radius:14px;border:1.5px solid rgba(188,132,10,.35);box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                    <small style="font-size:10px;font-weight:900;color:var(--text-muted);letter-spacing:1px">VENTA DEL PERÍODO (${isAllDates ? "HISTÓRICO" : fd(selectedDate==="today"?todayStr:selectedDate)})</small>
                    <div style="font-size:26px;font-weight:900;color:var(--wine-900);margin:4px 0">${money(totalSelectedDate)}</div>
                    <small style="color:var(--emerald);font-weight:800">${activeUnarchivedSales.length} tickets activos</small>
                </div>
                <div style="background:#fff;padding:16px;border-radius:14px;border:1.5px solid #86efac;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                    <small style="font-size:10px;font-weight:900;color:#166534;letter-spacing:1px">💵 TOTAL EFECTIVO (RED)</small>
                    <div style="font-size:22px;font-weight:900;color:#15803d;margin:4px 0">
                        ${money(totalCashChain)}
                    </div>
                    <small style="color:#166534;font-weight:700">${cashSalesChain.length} tickets en caja física</small>
                </div>
                <div style="background:#fff;padding:16px;border-radius:14px;border:1.5px solid #93c5fd;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                    <small style="font-size:10px;font-weight:900;color:#1e40af;letter-spacing:1px">💳 TOTAL TARJETAS (RED)</small>
                    <div style="font-size:22px;font-weight:900;color:#1d4ed8;margin:4px 0">
                        ${money(totalCardChain)}
                    </div>
                    <small style="color:#1e40af;font-weight:700">${cardSalesChain.length} tickets en terminal</small>
                </div>
                <div style="background:#fff;padding:16px;border-radius:14px;border:1.5px solid rgba(188,132,10,.35);box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                    <small style="font-size:10px;font-weight:900;color:#854d0e;letter-spacing:1px">🌅 MATUTINO: ${money(matChainTotal)}</small>
                    <small style="font-size:10px;font-weight:900;color:#3730a3;letter-spacing:1px;display:block;margin-top:6px">🌇 VESPERTINO: ${money(vesChainTotal)}</small>
                    <small style="color:var(--text-muted);font-weight:700;display:block;margin-top:6px">Consolidado por turnos</small>
                </div>
            </div>
        </div>

        <h3 style="color:#ffffff;margin:0 0 14px;font-weight:900">🏢 Desglose por Sucursal & Métodos de Pago — ${isAllDates ? "Histórico Consolidado" : fd(selectedDate==="today"?todayStr:selectedDate)}</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;margin-bottom:28px">
            ${BRANCH_NAMES.map(bName => {
                const bSales = activeUnarchivedSales.filter(s => matchesBranch(s, bName));
                const bCashSales = bSales.filter(s => (s.payment_method || "cash") === "cash");
                const bCardSales = bSales.filter(s => s.payment_method === "card");
                const matSales = bSales.filter(s => getShiftCategory(s) === "matutino");
                const vesSales = bSales.filter(s => getShiftCategory(s) === "vespertino");
                
                const bTotal = bSales.reduce((a,s)=>a+Number(s.total||0),0);
                const bCashTotal = bCashSales.reduce((a,s)=>a+Number(s.total||0),0);
                const bCardTotal = bCardSales.reduce((a,s)=>a+Number(s.total||0),0);
                const matTotal = matSales.reduce((a,s)=>a+Number(s.total||0),0);
                const vesTotal = vesSales.reduce((a,s)=>a+Number(s.total||0),0);

                return `<article class="sale-card" style="background:#fff;border:1.5px solid rgba(188,132,10,.35);border-radius:14px;padding:18px;box-shadow:0 4px 14px rgba(0,0,0,0.15)">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1.5px solid #e5e7eb;padding-bottom:8px">
                        <strong style="font-size:16px;color:var(--wine-900)">🍦 ${esc(bName)}</strong>
                        <strong style="font-size:17px;color:var(--wine-700)">${money(bTotal)}</strong>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
                        <div style="background:#f0fdf4;padding:10px;border-radius:10px;border:1.5px solid #86efac">
                            <small style="font-size:10px;font-weight:900;color:#166534;display:block">💵 EFECTIVO</small>
                            <strong style="font-size:15px;color:#15803d;display:block;margin:2px 0">${money(bCashTotal)}</strong>
                            <small style="font-size:10px;color:#166534;font-weight:700">${bCashSales.length} tickets</small>
                        </div>
                        <div style="background:#eff6ff;padding:10px;border-radius:10px;border:1.5px solid #93c5fd">
                            <small style="font-size:10px;font-weight:900;color:#1e40af;display:block">💳 TARJETA</small>
                            <strong style="font-size:15px;color:#1d4ed8;display:block;margin:2px 0">${money(bCardTotal)}</strong>
                            <small style="font-size:10px;color:#1e40af;font-weight:700">${bCardSales.length} tickets</small>
                        </div>
                    </div>
                    <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);font-weight:700;padding-top:6px;border-top:1px dashed #e5e7eb">
                        <span>🌅 Matutino: <strong style="color:var(--wine-800)">${money(matTotal)}</strong></span>
                        <span>🌇 Vespertino: <strong style="color:var(--wine-800)">${money(vesTotal)}</strong></span>
                    </div>
                </article>`;
            }).join("")}
        </div>

        <h3 style="color:#ffffff;margin:0 0 14px;font-weight:900">📜 Histórico de Días Cerrados & Archivados</h3>
        ${history.length
            ? `<div style="display:flex;flex-direction:column;gap:12px">
                ${history.map((h, idx) => `
                <article class="sale-card" style="background:#fff;border:1px solid rgba(188,132,10,.35);border-radius:14px;padding:16px">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:gap:10px">
                        <div>
                            <strong style="font-size:15px;color:var(--wine-900)">📅 Cierre Diario — ${fd(h.date)}</strong>
                            <div style="font-size:11px;color:var(--text-muted);margin-top:2px">Cerrado el: ${fdt(h.created_at)} • ${h.total_tickets} tickets emitidos</div>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                            <div style="text-align:right">
                                <div style="font-size:18px;font-weight:900;color:var(--wine-700)">${money(h.total_chain)}</div>
                                <small style="color:var(--emerald);font-weight:800">✓ Balance Consolidado</small>
                            </div>
                            <button type="button" class="btn-print-hist-day" data-idx="${idx}"
                                style="padding:7px 12px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1px solid var(--gold-400);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:4px">
                                🖨️ Imprimir Ticket
                            </button>
                            ${S.isSU ? `
                            <button type="button" class="btn-del-closed-day" data-idx="${idx}" data-date="${esc(h.date)}"
                                style="padding:7px 12px;background:#fee2e2;color:#991b1b;border:1.5px solid #f87171;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:4px">
                                🗑 Borrar
                            </button>` : ''}
                        </div>
                    </div>
                </article>`).join("")}
               </div>`
            : `<div class="empty-state" style="padding:30px;text-align:center">
                <p style="color:var(--text-muted)">Aún no se han generado cierres de día con el botón de finalización.</p>
               </div>`}
        `;

        // Event listener para imprimir corte diario actual
        document.getElementById("btn-print-daily-acc")?.addEventListener("click", () => {
            const branchBreakdown = BRANCH_NAMES.map(bName => {
                const bSales = activeUnarchivedSales.filter(s => matchesBranch(s, bName));
                const bCash = bSales.filter(s => (s.payment_method || "cash") === "cash").reduce((a,s)=>a+Number(s.total||0),0);
                const bCard = bSales.filter(s => s.payment_method === "card").reduce((a,s)=>a+Number(s.total||0),0);
                const mat = bSales.filter(s => getShiftCategory(s) === "matutino").reduce((a,s)=>a+Number(s.total||0),0);
                const ves = bSales.filter(s => getShiftCategory(s) === "vespertino").reduce((a,s)=>a+Number(s.total||0),0);
                return {
                    name: bName,
                    total: bSales.reduce((a,s)=>a+Number(s.total||0),0),
                    cash: bCash,
                    card: bCard,
                    mat: mat,
                    ves: ves,
                    tickets: bSales.length
                };
            });

            const reportPayload = {
                date: isAllDates ? "HISTÓRICO CONSOLIDADO" : (selectedDate === "today" ? todayStr : selectedDate),
                totalChain: totalSelectedDate,
                cashTotal: totalCashChain,
                cardTotal: totalCardChain,
                matTotal: matChainTotal,
                vesTotal: vesChainTotal,
                totalTickets: activeUnarchivedSales.length,
                branchBreakdown: branchBreakdown
            };

            printDailyAccountingReceipt(reportPayload);
            toast("🖨️ Enviando ticket de corte diario a la impresora…", "info", 3000);
        });

        // Event listener para imprimir día histórico archivado
        c.querySelectorAll(".btn-print-hist-day").forEach(btn => btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.idx, 10);
            const h = history[idx];
            if (!h) return;

            const branchBreakdown = (h.branches || []).map(b => ({
                name: b.name,
                total: b.sales || 0,
                cash: b.cash || b.sales || 0,
                card: b.card || 0,
                mat: 0,
                ves: 0,
                tickets: b.orders || 0
            }));

            const reportPayload = {
                date: h.date,
                totalChain: h.total_chain || 0,
                cashTotal: h.cash_total || h.total_chain || 0,
                cardTotal: h.card_total || 0,
                matTotal: h.mat_total || 0,
                vesTotal: h.ves_total || 0,
                totalTickets: h.total_tickets || 0,
                branchBreakdown: branchBreakdown
            };

            printDailyAccountingReceipt(reportPayload);
            toast(`🖨️ Imprimiendo ticket del día ${fd(h.date)}…`, "info", 3000);
        }));

        // Event listener para borrar cierre archivado (exclusivo Superusuarios)
        c.querySelectorAll(".btn-del-closed-day").forEach(btn => btn.addEventListener("click", async () => {
            const dateToDel = btn.dataset.date;
            const ok = await toastConfirm(`👑 [Superusuario]\n¿Deseas eliminar este Cierre Diario (${fd(dateToDel)}) del histórico?\n\nEsto reabrirá y reactivará las ventas de esa jornada si necesitas corregir o volver a cerrar.`);
            if (!ok) return;

            const idx = parseInt(btn.dataset.idx, 10);
            const hist = gr("accounting_history", []);
            hist.splice(idx, 1);
            gw("accounting_history", hist);

            // Desarchivar de días cerrados
            let clDates = gr("closed_business_days", []);
            clDates = clDates.filter(d => d !== dateToDel);
            gw("closed_business_days", clDates);

            // Desarchivar ventas
            const allGSales = gr("all_sales", []);
            allGSales.forEach(s => {
                if (toDateKey(s.created_at) === dateToDel) {
                    delete s.is_archived_day;
                }
            });
            gw("all_sales", allGSales);

            toast(`✓ Cierre del día ${fd(dateToDel)} eliminado del histórico.`, "info", 5000);
            await loadAccounting();
        }));

        document.getElementById("acc-date-filter")?.addEventListener("change", async e => {
            S.accHistoryFilterDate = e.target.value;
            await loadAccounting();
        });

        document.getElementById("btn-ref-acc")?.addEventListener("click", async () => {
            await loadAccounting();
            toast("Contabilidad actualizada y sincronizada.", "info");
        });
    }

    /* ── BÚSQUEDA ── */
    function initSearch() {
        const inp = document.getElementById("search-products");
        if (!inp) return;
        inp.addEventListener("input", () => {
            S.q = inp.value;
            renderPOS(filtered());
        });
    }

    /* ── SINCRONIZACIÓN EN TIEMPO REAL & CANALES SUPABASE ── */
    let realtimeChannel = null;
    function safeSilentRefresh() {
        if (!S.user) return;
        const active = document.activeElement;
        const isTyping = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT" || active.isContentEditable);
        const hasOpenModal = !!document.querySelector(".modal.open, .modal.show, [data-modal-open='true'], #checkout-modal:not(.hidden), .confirm-modal");
        if (isTyping || hasOpenModal) return;

        if (S.view === "private-access" && S.isSU) loadPrivateAccess(true);
        else if (S.view === "accounting" && S.isSU) loadAccounting(true);
        else if (S.view === "sales") loadSales(true);
        else if (S.view === "cuts") loadCuts(true);
    }

    function setupRealtime() {
        if (!db) return;
        if (realtimeChannel) {
            try { db.removeChannel(realtimeChannel); } catch(e) {}
        }

        try {
            realtimeChannel = db.channel("lafuente-pos-mesh", { config: { broadcast: { self: false } } })
                // 1. RECEPCIÓN DIRECTA DE VENTAS EN TIEMPO REAL (MESH BROADCAST)
                .on("broadcast", { event: "sale_created" }, async ({ payload }) => {
                    if (!payload || !payload.sale) return;
                    const s = payload.sale;
                    const sid = String(s.id);
                    let allGSales = gr("all_sales", []);
                    const exists = allGSales.some(x => String(x.id) === sid || (x.local_id && x.local_id === s.local_id) || (x.sale_number && x.sale_number === s.sale_number));
                    if (!exists) {
                        allGSales.unshift(s);
                        gw("all_sales", allGSales);
                    }
                    if (S.isSU) {
                        toast(`🔔 Venta cobrada: ${money(s.total)} en ${s.branch_name || 'Sucursal'} (${s.shift_name || 'Turno'})`, "success", 4000);
                    }
                    safeSilentRefresh();
                })
                // 2. RECEPCIÓN DIRECTA DE CORTES EN TIEMPO REAL (MESH BROADCAST)
                .on("broadcast", { event: "cut_created" }, async ({ payload }) => {
                    if (!payload || !payload.cut) return;
                    const c = payload.cut;
                    let allCuts = gr("all_cuts", []);
                    if (!allCuts.some(x => String(x.id) === String(c.id))) {
                        allCuts.unshift(c);
                        gw("all_cuts", allCuts);
                    }
                    if (S.isSU) {
                        toast(`✂️ Nuevo Corte de Caja: ${c.branch_name || 'Sucursal'} (${c.shift_name || 'Turno'}) — Total: ${money(c.total_sales || c.net_sales_without_fund || 0)}`, "info", 5000);
                    }
                    safeSilentRefresh();
                })
                // 2.1 RECEPCIÓN DIRECTA DE INVENTARIOS EN TIEMPO REAL (MESH BROADCAST)
                .on("broadcast", { event: "inventory_updated" }, async ({ payload }) => {
                    if (!payload || !payload.inv) return;
                    if (payload.branch_id) {
                        gw("inv_" + payload.branch_id, payload.inv);
                    }
                    if (payload.branch_name) {
                        gw("inv_" + normalizeBranchName(payload.branch_name).replace(/\s+/g, "_"), payload.inv);
                    }
                    if (matchesBranch({ branch_id: payload.branch_id, branch_name: payload.branch_name }, { id: S.branchId, name: S.branchName })) {
                        S.inv = { ...payload.inv };
                        lw("inv", S.inv);
                        alertInv();
                        if (S.view === "inventory") await loadInventory();
                        else if (S.view === "pos") renderPOS(filtered());
                        else if (S.view === "products") await loadProductsAdmin();
                    }
                })
                // 3. PETICIÓN DE SINCRONIZACIÓN DE RED DE OTRAS CUENTAS
                .on("broadcast", { event: "request_sync" }, async () => {
                    const mySales = lr("sales", []);
                    const myCuts = lr("cuts", []);
                    if ((mySales.length || myCuts.length) && realtimeChannel) {
                        realtimeChannel.send({
                            type: "broadcast",
                            event: "sync_response",
                            payload: {
                                branch_name: S.branchName,
                                shift_name: S.shift,
                                sales: mySales,
                                cuts: myCuts
                            }
                        });
                    }
                })
                // 4. RESPUESTA DE SINCRONIZACIÓN RECIBIDA DE OTRAS SUCURSALES
                .on("broadcast", { event: "sync_response" }, async ({ payload }) => {
                    if (!payload) return;
                    if (payload.sales && payload.sales.length) {
                        let allGSales = gr("all_sales", []);
                        const map = new Map();
                        allGSales.forEach(s => map.set(String(s.id), s));
                        payload.sales.forEach(s => {
                            const sid = String(s.id);
                            if (!map.has(sid)) {
                                map.set(sid, s);
                            }
                        });
                        const merged = Array.from(map.values()).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
                        gw("all_sales", merged);
                    }
                    if (payload.cuts && payload.cuts.length) {
                        let allCuts = gr("all_cuts", []);
                        const mapC = new Map();
                        allCuts.forEach(c => mapC.set(String(c.id), c));
                        payload.cuts.forEach(c => {
                            if (!mapC.has(String(c.id))) mapC.set(String(c.id), c);
                        });
                        gw("all_cuts", Array.from(mapC.values()));
                    }
                    safeSilentRefresh();
                })
                // 5. EVENTOS POSTGRESQL NATIVOS SUPABASE
                .on("postgres_changes", { event: "*", schema: "public", table: "sales" }, async payload => {
                    console.log("⚡ [Realtime SQL] Evento de ventas:", payload.eventType, payload);
                    if (payload.eventType === "INSERT" && payload.new) {
                        const n = payload.new;
                        let obs = {};
                        try { obs = typeof n.observations === "string" ? JSON.parse(n.observations) : (n.observations || {}); } catch(e) {}
                        const bName = obs.branch_name || S.branches.find(b=>String(b.id)===String(n.branch_id))?.name || "Sucursal";
                        if (S.isSU) {
                            toast(`🔔 Venta cobrada: ${money(n.total)} en ${bName}`, "success", 3500);
                        }
                    } else if (payload.eventType === "DELETE" && payload.old) {
                        const delId = String(payload.old.id);
                        let gSales = gr("all_sales", []).filter(x => String(x.id) !== delId);
                        gw("all_sales", gSales);
                        let lSales = lr("sales", []).filter(x => String(x.id) !== delId);
                        lw("sales", lSales);
                    } else if (payload.eventType === "UPDATE" && payload.new) {
                        const n = payload.new;
                        const isCan = String(n.status||"").toUpperCase() === "CANCELLED";
                        if (isCan) {
                            let gSales = gr("all_sales", []);
                            const target = gSales.find(x => String(x.id) === String(n.id));
                            if (target) { target.status = "CANCELLED"; gw("all_sales", gSales); }
                            let lSales = lr("sales", []);
                            const lTarget = lSales.find(x => String(x.id) === String(n.id));
                            if (lTarget) { lTarget.status = "CANCELLED"; lw("sales", lSales); }
                        }
                    }
                    safeSilentRefresh();
                })
                .on("postgres_changes", { event: "*", schema: "public", table: "cash_cuts" }, async payload => {
                    safeSilentRefresh();
                })
                .on("postgres_changes", { event: "*", schema: "public", table: "products" }, async () => {
                    await loadProducts();
                    if (S.view === "products") await loadProductsAdmin();
                    else if (S.view === "inventory") await loadInventory();
                    else if (S.view === "pos") renderPOS(filtered());
                })
                .on("postgres_changes", { event: "*", schema: "public", table: "branches" }, async () => {
                    await loadBranches();
                    if (S.view === "private-access" && S.isSU) await loadPrivateAccess(true);
                })
                .subscribe(status => {
                    console.log("📡 [Realtime Mesh] Estado de conexión:", status);
                    if (status === "SUBSCRIBED" && S.isSU) {
                        // Al conectar, pedir a todas las cajeras activas su resumen de ventas
                        try {
                            realtimeChannel.send({
                                type: "broadcast",
                                event: "request_sync",
                                payload: { from: S.user?.email }
                            });
                        } catch(e) {}
                    }
                });
        } catch(e) {
            console.warn("Realtime error:", e);
        }

        // Heartbeat de auto-sincronización periódica suave y sin parpadeos
        if (window._syncTimer) clearInterval(window._syncTimer);
        window._syncTimer = setInterval(async () => {
            if (S.user) {
                syncPendingSalesToSupabase();
                if (S.isSU && realtimeChannel) {
                    try {
                        realtimeChannel.send({
                            type: "broadcast",
                            event: "request_sync",
                            payload: { from: S.user?.email }
                        });
                    } catch(e) {}
                }
                safeSilentRefresh();
            }
        }, 3500);
    }

    /* ── INICIALIZACIÓN ── */
    async function init() {
        if (!initDB()) return;
        const loginEl = document.getElementById("login-screen");
        const shellEl = document.getElementById("app-shell");

        const {data} = await safeQuery(db.auth.getSession(), null, 1000);
        if (data?.session) {
            S.user = data.session.user;
            if (loginEl) loginEl.style.display = "none";
            if (shellEl) shellEl.style.display = "flex";
            document.body.classList.remove("login-active");

            await loadBranches();
            await loadProfile();
            await loadProducts();
            await loadCurrentShift();
            initSearch();
            setupRealtime();
            syncPendingSalesToSupabase();
            autoReconnectUsbPrinter();
            if (S.isSU && window.changeView) window.changeView("private-access");
            else if (window.changeView) window.changeView("pos");
        } else {
            if (loginEl) loginEl.style.display = "flex";
            if (shellEl) shellEl.style.display = "none";
            document.body.classList.add("login-active");

            await loadBranches();
            await loadProducts();
            setupRealtime();
            autoReconnectUsbPrinter();
        }

        db.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN" && session) {
                S.user = session.user;
                if (loginEl) loginEl.style.display = "none";
                if (shellEl) shellEl.style.display = "flex";
                document.body.classList.remove("login-active");

                await loadBranches();
                await loadProfile();
                await loadProducts();
                await loadCurrentShift();
                initSearch();
                setupRealtime();
                if (S.isSU && window.changeView) window.changeView("private-access");
                else if (window.changeView) window.changeView("pos");
            }
            if (event === "SIGNED_OUT") {
                S.user = null; S.profile = null;
                S.cart = []; S.products = [];
                if (loginEl) loginEl.style.display = "flex";
                if (shellEl) shellEl.style.display = "none";
                document.body.classList.add("login-active");

                if (realtimeChannel) {
                    try { db.removeChannel(realtimeChannel); } catch(e) {}
                }
                if (window._syncTimer) clearInterval(window._syncTimer);
            }
        });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();

    /* ── API PÚBLICA ── */
    window.LaFuentePOS = {
        state: S,
        changeBranch,
        loadBranches,
        loadPrivateAccessData: loadPrivateAccess,
        loadProducts,
        loadProductsAdmin,
        loadInventory,
        loadSales,
        loadCurrentShift,
        loadCuts,
        loadProfile,
        loadShiftView,
        loadDamageReports,
        loadAccounting,
        renderCart,
        processSale,
        checkInventoryBlock: checkBlock,
        getStock,
        logout
    };
})();