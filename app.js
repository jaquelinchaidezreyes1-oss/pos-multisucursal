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
    const round2 = v => Math.round((Number(v) || 0) * 100) / 100;
    const money = v => round2(v).toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
        if (typeof v === "string") {
            const trimmed = v.trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
                return trimmed;
            }
        }
        const d = (v instanceof Date) ? v : new Date(v);
        if (isNaN(d.getTime())) return String(v).slice(0,10);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    };
    /* ── ALMACENAMIENTO LOCAL & GLOBAL ── */
    const lr = (k, fallback = null) => {
        try {
            const item = localStorage.getItem("lf_" + k);
            return item ? JSON.parse(item) : fallback;
        } catch(e) { return fallback; }
    };
    const lw = (k, v) => {
        try {
            localStorage.setItem("lf_" + k, JSON.stringify(v));
        } catch(e) {}
    };
    const gr = (k, fallback = null) => {
        try {
            const item = localStorage.getItem("lf_" + k);
            return item ? JSON.parse(item) : fallback;
        } catch(e) { return fallback; }
    };
    const gw = (k, v) => {
        try {
            localStorage.setItem("lf_" + k, JSON.stringify(v));
        } catch(e) {}
    };


    /* ── CLASIFICADOR OFICIAL DE TURNOS (ENCARGADOS 1,3,5,7,9,11 = MATUTINO / 2,4,6,8,10,12 = VESPERTINO) ── */
    function getShiftCategory(s) {
        if (!s) return "matutino";
        const email = String(s.cashier_name || s.cashier_id || s.user_name || s.performed_by_name || "").toLowerCase();
        
        // 1. Mapeo oficial por encargada:
        // Matutino (1, 3, 5, 7, 9, 11)
        if (email.includes("encargado11") || email.includes("encargado9") || email.includes("encargado7") || email.includes("encargado5") || email.includes("encargado3") || email.includes("encargado1")) {
            return "matutino";
        }
        // Vespertino (2, 4, 6, 8, 10, 12)
        if (email.includes("encargado12") || email.includes("encargado10") || email.includes("encargado8") || email.includes("encargado6") || email.includes("encargado4") || email.includes("encargado2")) {
            return "vespertino";
        }

        // 2. Detección por nombre explícito de turno
        const sn = String(s.shift_name || s.shift || "").toLowerCase();
        if (sn.includes("tarde") || sn.includes("vesp") || sn.includes("noche")) return "vespertino";
        if (sn.includes("mañana") || sn.includes("mat") || sn.includes("dia")) return "matutino";

        return "matutino";
    }

    function normalizeBranchName(str) {
        if (!str) return "";
        return String(str)
            .toLowerCase()
            .replace(/la fuente/g, "")
            .replace(/sucursal/g, "")
            .replace(/matutino|vespertino|mañana|tarde/g, "")
            .replace(/[()_-]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function matchesBranch(sale, branchRef) {
        if (!sale) return false;
        if (branchRef === "all" || branchRef?.id === "all") return true;

        const ref = normalizeBranchName(typeof branchRef === "string" ? branchRef : (branchRef?.name || branchRef?.id || ""));
        const sBranch = normalizeBranchName(sale.branch_name || "");
        const sId = String(sale.branch_id || "").toLowerCase();
        const sCashier = String(sale.cashier_name || sale.user_name || sale.performed_by_name || sale.performed_by || "").toLowerCase();
        
        // Match by branch ID directly
        if (typeof branchRef === "object" && branchRef?.id && sId && String(branchRef.id).toLowerCase() === sId) {
            return true;
        }

        // Match by branch name / cashier assignment / ID patterns
        if (ref.includes("calzada")) {
            return sBranch.includes("calzada") || sId === "branch-1" || sId.includes("calzada") || sCashier.includes("encargado1") || sCashier.includes("encargado2");
        }
        if (ref.includes("rescate")) {
            return sBranch.includes("rescate") || sId === "branch-2" || sId.includes("rescate") || sCashier.includes("encargado3") || sCashier.includes("encargado4");
        }
        if (ref.includes("mollotes")) {
            return sBranch.includes("mollotes") || sId === "branch-3" || sId.includes("mollotes") || sCashier.includes("encargado5") || sCashier.includes("encargado6");
        }
        if (ref.includes("tagarete 2") || (ref.includes("tagarete") && (ref.includes("2") || ref.includes("dos")))) {
            return (sBranch.includes("tagarete") && (sBranch.includes("2") || sBranch.includes("dos"))) || sId === "branch-5" || sId.includes("tagarete_2") || sId.includes("tagarete2") || sCashier.includes("encargado9") || sCashier.includes("encargado10") || sCashier.includes("tagarete 2");
        }
        if (ref.includes("tagarete 1") || (ref.includes("tagarete") && (ref.includes("1") || ref.includes("uno")))) {
            return (sBranch.includes("tagarete") && (sBranch.includes("1") || sBranch.includes("uno") || (!sBranch.includes("2") && !sBranch.includes("dos")))) || sId === "branch-4" || sId.includes("tagarete_1") || sId.includes("tagarete1") || sCashier.includes("encargado7") || sCashier.includes("encargado8") || sCashier.includes("tagarete 1");
        }
        if (ref.includes("tagarete")) {
            return sBranch.includes("tagarete") || sId.includes("tagarete") || sCashier.includes("encargado7") || sCashier.includes("encargado8") || sCashier.includes("encargado9") || sCashier.includes("encargado10");
        }
        if (ref.includes("cnop") || ref.includes("cenop")) {
            return sBranch.includes("cnop") || sBranch.includes("cenop") || sId === "branch-6" || sId.includes("cnop") || sCashier.includes("encargado11") || sCashier.includes("encargado12");
        }
        
        // Exact normalized name comparison fallback
        if (ref && sBranch && (ref === sBranch || sBranch.includes(ref) || ref.includes(sBranch))) {
            return true;
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
                if (uuid(s.shift_id)) {
                    insertPayload.shift_id = s.shift_id;
                } else if (uuid(S.currentShift?.id)) {
                    insertPayload.shift_id = S.currentShift.id;
                }

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
        c.innerHTML = `<div class="branch-selector-box"><label>CAMBIAR SUCURSAL (👑)</label>
            <select id="branch-selector" class="branch-select-dropdown">
                ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(S.branchId)?" selected":""}>${esc(b.name)}</option>`).join("")}
            </select></div>`;
        $("#branch-selector")?.addEventListener("change", async e => await changeBranch(e.target.value));
    }

    async function changeBranch(id) {
        if (!S.isSU) return;
        const b = S.branches.find(x => String(x.id) === String(id) || String(x.name).toLowerCase().trim() === String(id).toLowerCase().trim());
        if (!b) return;

        // 1. Guardar inventario de la sucursal previa
        if (S.branchId && S.inv && Object.keys(S.inv).length) {
            saveBranchInv();
        }

        // 2. Establecer nueva sucursal
        S.branchId = b.id;
        S.branchName = b.name;
        S.cutsFilterBranchId = b.id;
        S.salesFilterBranchId = b.id;
        S.shiftFilterBranchId = b.id;
        S.currentShift = null;
        S.cart = [];
        
        // 3. Recargar el inventario exclusivo de la sucursal seleccionada
        initInv();
        
        updateUI();
        renderSel();
        renderCart();
        alertInv();
        
        // Sincronizar todos los selectores de sucursales en la vista
        document.querySelectorAll("#branch-selector, #inv-branch-filter, #sales-branch-filter, #admin-branch-filter, #cuts-branch-filter, #shift-branch-filter").forEach(sel => {
            if (sel) sel.value = b.id;
        });

        await loadCurrentShift();
        await loadProducts();
        
        // 4. Refrescar la vista actual de inmediato
        if (S.view === "pos")            renderPOS(filtered());
        if (S.view === "products")       await loadProductsAdmin();
        if (S.view === "sales")          await loadSales();
        if (S.view === "cuts")           await loadCuts();
        if (S.view === "inventory")      await loadInventory();
        if (S.view === "shift")          await loadShiftView();
        if (S.view === "private-access") await loadPrivateAccess();
        if (S.view === "damage-reports") await loadDamageReports();
        if (S.view === "accounting")     await loadAccounting();
        
        toast("📍 Sucursal activa: " + S.branchName + " (Inventario y Cortes actualizados)", "success", 3000);
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
    const BRANCH_BASE_INVENTORY = {
        "calzada": {
            "adbc5511-68a8-4525-97a3-ac7972856e89": 140,
            "a5c3b67a-c276-42f2-863f-a01c6f9294ed": 130,
            "adef0123-f92d-46ed-8797-2dfb46fb5b6d": 125,
            "sup_vaso_1lt": 200,
            "sup_tapa_1lt": 400,
            "sup_vaso_20": 350,
            "sup_tapa_20": 400,
            "sup_charola_banana": 120,
            "sup_cucharas": 300,
            "sup_servilletas": 500,
            "sup_sabritas": 180,
            "sup_tostitos": 25,
            "sup_doritos": 40,
            "sup_cheetos": 45
        },
        "rescate": {
            "adbc5511-68a8-4525-97a3-ac7972856e89": 99,
            "a5c3b67a-c276-42f2-863f-a01c6f9294ed": 95,
            "adef0123-f92d-46ed-8797-2dfb46fb5b6d": 100,
            "sup_vaso_1lt": 125,
            "sup_tapa_1lt": 550,
            "sup_vaso_20": 500,
            "sup_tapa_20": 550,
            "sup_charola_banana": 83,
            "sup_cucharas": 250,
            "sup_servilletas": 500,
            "sup_sabritas": 159,
            "sup_tostitos": 7,
            "sup_doritos": 27,
            "sup_cheetos": 35
        },
        "mollotes": {
            "adbc5511-68a8-4525-97a3-ac7972856e89": 75,
            "a5c3b67a-c276-42f2-863f-a01c6f9294ed": 80,
            "adef0123-f92d-46ed-8797-2dfb46fb5b6d": 70,
            "sup_vaso_1lt": 100,
            "sup_tapa_1lt": 300,
            "sup_vaso_20": 250,
            "sup_tapa_20": 300,
            "sup_charola_banana": 60,
            "sup_cucharas": 200,
            "sup_servilletas": 400,
            "sup_sabritas": 90,
            "sup_tostitos": 15,
            "sup_doritos": 20,
            "sup_cheetos": 25
        },
        "tagarete_1": {
            "adbc5511-68a8-4525-97a3-ac7972856e89": 65,
            "a5c3b67a-c276-42f2-863f-a01c6f9294ed": 60,
            "adef0123-f92d-46ed-8797-2dfb46fb5b6d": 55,
            "sup_vaso_1lt": 80,
            "sup_tapa_1lt": 250,
            "sup_vaso_20": 200,
            "sup_tapa_20": 250,
            "sup_charola_banana": 50,
            "sup_cucharas": 180,
            "sup_servilletas": 350,
            "sup_sabritas": 80,
            "sup_tostitos": 12,
            "sup_doritos": 18,
            "sup_cheetos": 20
        },
        "tagarete_2": {
            "adbc5511-68a8-4525-97a3-ac7972856e89": 48,
            "a5c3b67a-c276-42f2-863f-a01c6f9294ed": 42,
            "adef0123-f92d-46ed-8797-2dfb46fb5b6d": 40,
            "sup_vaso_1lt": 60,
            "sup_tapa_1lt": 200,
            "sup_vaso_20": 180,
            "sup_tapa_20": 200,
            "sup_charola_banana": 40,
            "sup_cucharas": 150,
            "sup_servilletas": 300,
            "sup_sabritas": 65,
            "sup_tostitos": 9,
            "sup_doritos": 14,
            "sup_cheetos": 16
        },
        "cnop": {
            "adbc5511-68a8-4525-97a3-ac7972856e89": 35,
            "a5c3b67a-c276-42f2-863f-a01c6f9294ed": 30,
            "adef0123-f92d-46ed-8797-2dfb46fb5b6d": 32,
            "sup_vaso_1lt": 50,
            "sup_tapa_1lt": 180,
            "sup_vaso_20": 150,
            "sup_tapa_20": 180,
            "sup_charola_banana": 30,
            "sup_cucharas": 120,
            "sup_servilletas": 250,
            "sup_sabritas": 50,
            "sup_tostitos": 8,
            "sup_doritos": 12,
            "sup_cheetos": 15
        }
    };

    function getBranchKeyName(bName) {
        const s = normalizeBranchName(bName || S.branchName || "calzada").replace(/\s+/g, "_");
        if (s.includes("tagarete_2") || (s.includes("tagarete") && s.includes("2"))) return "tagarete_2";
        if (s.includes("tagarete_1") || (s.includes("tagarete") && (s.includes("1") || !s.includes("2")))) return "tagarete_1";
        if (s.includes("rescate")) return "rescate";
        if (s.includes("mollotes")) return "mollotes";
        if (s.includes("cnop")) return "cnop";
        if (s.includes("calzada")) return "calzada";
        return "calzada";
    }

    function saveBranchInv(customInv = null) {
        const invToSave = customInv || S.inv;
        const branchKey = getBranchKeyName(S.branchName);
        
        lw("inv", invToSave);
        gw("inv_" + branchKey, invToSave);
        gw("inv_" + (S.branchId || "x"), invToSave);
        try { localStorage.setItem("lf_inv_" + branchKey, JSON.stringify(invToSave)); } catch(e) {}
        
        // Difundir en tiempo real a todas las pantallas activas
        if (realtimeChannel) {
            try {
                realtimeChannel.send({
                    type: "broadcast",
                    event: "inventory_updated",
                    payload: {
                        branch_id: S.branchId,
                        branch_name: S.branchName,
                        branch_key: branchKey,
                        inv: invToSave
                    }
                });
            } catch(e) {}
        }
    }

    function initInv() { 
        const branchKey = getBranchKeyName(S.branchName);
        
        // 1. Intentar cargar stock guardado o ajustado explícitamente para esta sucursal
        let stored = null;
        try {
            const raw = localStorage.getItem("lf_inv_" + branchKey);
            if (raw) stored = JSON.parse(raw);
        } catch(e) {}

        if (!stored || typeof stored !== "object" || !Object.keys(stored).length) {
            stored = gr("inv_" + branchKey, null);
        }
        if (!stored || typeof stored !== "object" || !Object.keys(stored).length) {
            stored = lr("inv", null);
        }

        if (stored && typeof stored === "object" && Object.keys(stored).length) {
            S.inv = { ...stored };
        } else {
            // 2. Cargar el inventario base exclusivo y diferenciado para esta sucursal
            S.inv = {};
            const branchDefaults = BRANCH_BASE_INVENTORY[branchKey] || BRANCH_BASE_INVENTORY["calzada"] || {};

            S.products.forEach(p => {
                const maxS = getMaxStock(p);
                let baseStk = branchDefaults[p.product_id];
                if (baseStk === undefined) {
                    baseStk = (p.initial_stock !== undefined && p.initial_stock !== null) ? Number(p.initial_stock) : 50;
                    if (branchKey === "tagarete_2") baseStk = Math.max(0, Math.floor(baseStk * 0.50));
                    else if (branchKey === "cnop") baseStk = Math.max(0, Math.floor(baseStk * 0.35));
                    else if (branchKey === "mollotes") baseStk = Math.max(0, Math.floor(baseStk * 0.70));
                    else if (branchKey === "tagarete_1") baseStk = Math.max(0, Math.floor(baseStk * 0.60));
                }
                S.inv[p.product_id] = Math.min(maxS, Math.max(0, baseStk));
            });

            // Guardar para esta sucursal
            saveBranchInv();
        }
    }

    function getMaxStock(prodOrId) {
        let p = (typeof prodOrId === "object" && prodOrId) ? prodOrId : S.products.find(x => String(x.product_id) === String(prodOrId));
        if (p && (p.category === "desechables" || p.is_supply)) return 10000;
        return 500;
    }

    function getStock(id) { 
        if (S.inv[id] === undefined || S.inv[id] === null || isNaN(S.inv[id])) {
            const prod = S.products.find(p => String(p.product_id) === String(id));
            const maxS = getMaxStock(prod);
            const branchKey = getBranchKeyName(S.branchName);
            const branchDefaults = BRANCH_BASE_INVENTORY[branchKey] || {};
            S.inv[id] = branchDefaults[id] !== undefined ? branchDefaults[id] : ((prod && prod.initial_stock !== undefined && prod.initial_stock !== null) ? Number(prod.initial_stock) : Math.min(100, maxS)); 
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
        // ── HELADOS & NIEVES ──
        { product_id: "adbc5511-68a8-4525-97a3-ac7972856e89", product_code: "CS", product_name: "Cono Sencillo", category: "helados", price: 25, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_cono_sencillo", supply_name: "Cono Sencillo (Galleta)", qty: 1}, {supply_id: "sup_servilletas", supply_name: "Servilletas", qty: 1}] },
        { product_id: "a5c3b67a-c276-42f2-863f-a01c6f9294ed", product_code: "CDV", product_name: "Cono Doble Vainilla", category: "helados", price: 45, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_cono_dv", supply_name: "Cono Doble Vainilla (Galleta)", qty: 1}, {supply_id: "sup_servilletas", supply_name: "Servilletas", qty: 1}] },
        { product_id: "adef0123-f92d-46ed-8797-2dfb46fb5b6d", product_code: "CDCH", product_name: "Cono Doble Chocolate", category: "helados", price: 45, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_cono_dch", supply_name: "Cono Doble Chocolate (Galleta)", qty: 1}, {supply_id: "sup_servilletas", supply_name: "Servilletas", qty: 1}] },
        { product_id: "p_nieve_vaso12", product_code: "NV-12", product_name: "Nieve Vaso #12", category: "helados", price: 45, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_12", supply_name: "Vaso #12", qty: 1}, {supply_id: "sup_cucharas", supply_name: "Cucharas para Nieve", qty: 1}] },
        { product_id: "p_nieve_vaso14", product_code: "NV-14", product_name: "Nieve Vaso #14", category: "helados", price: 55, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_14", supply_name: "Vaso #14", qty: 1}, {supply_id: "sup_cucharas", supply_name: "Cucharas para Nieve", qty: 1}] },
        { product_id: "p_nieve_half", product_code: "NV-1/2L", product_name: "Nieve 1/2 Litro", category: "helados", price: 75, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_half", supply_name: "Vaso 1/2 Lt", qty: 1}, {supply_id: "sup_cucharas", supply_name: "Cucharas para Nieve", qty: 2}] },
        { product_id: "p_nieve_1l", product_code: "NV-1L", product_name: "Nieve 1 Litro", category: "helados", price: 140, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_1lt", supply_name: "Vaso 1 Lt", qty: 1}, {supply_id: "sup_tapa_1lt", supply_name: "Tapas Vaso 1 Lt", qty: 1}] },
        { product_id: "p_banana_split", product_code: "PREP-BS", product_name: "Banana Split", category: "helados", price: 65, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_charola_banana", supply_name: "Charola para Banana Split", qty: 1}, {supply_id: "sup_cucharas", supply_name: "Cucharas para Nieve", qty: 1}] },

        // ── PALETAS DE LECHE ──
        { product_id: "p_paleta_leche", product_code: "PAL-LECHE", product_name: "Paleta de Leche", category: "paletas", price: 20, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_leche_vainilla", product_code: "PAL-VAIN", product_name: "Paleta de Vainilla", category: "paletas", price: 20, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_leche_choco", product_code: "PAL-CHOCO", product_name: "Paleta de Chocolate", category: "paletas", price: 20, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_leche_fresa", product_code: "PAL-FRESA-L", product_name: "Paleta de Fresa de Leche", category: "paletas", price: 20, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_leche_nuez", product_code: "PAL-NUEZ", product_name: "Paleta de Nuez", category: "paletas", price: 20, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_leche_oreo", product_code: "PAL-OREO", product_name: "Paleta de Oreo", category: "paletas", price: 20, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_leche_zarza", product_code: "PAL-ZARZA", product_name: "Paleta de Zarzamora con Queso", category: "paletas", price: 20, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_leche_pistache", product_code: "PAL-PISTACHE", product_name: "Paleta de Pistache", category: "paletas", price: 25, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_especial", product_code: "PAL-ESP", product_name: "Paleta Especial Rellena", category: "paletas", price: 30, branch_name: "General", initial_stock: 0 },

        // ── PALETAS DE AGUA ──
        { product_id: "p_paleta_agua", product_code: "PAL-AGUA", product_name: "Paleta de Agua", category: "paletas", price: 18, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_agua_limon", product_code: "PAL-LIMON", product_name: "Paleta de Limón", category: "paletas", price: 18, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_agua_mango", product_code: "PAL-MANGO", product_name: "Paleta de Mango", category: "paletas", price: 18, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_agua_tamarindo", product_code: "PAL-TAM", product_name: "Paleta de Tamarindo", category: "paletas", price: 18, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_agua_fresa", product_code: "PAL-FRESA-A", product_name: "Paleta de Fresa de Agua", category: "paletas", price: 18, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_agua_pina", product_code: "PAL-PINA", product_name: "Paleta de Piña", category: "paletas", price: 18, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_agua_sandia", product_code: "PAL-SANDIA", product_name: "Paleta de Sandía", category: "paletas", price: 18, branch_name: "General", initial_stock: 0 },
        { product_id: "p_pal_agua_maracuya", product_code: "PAL-MARACUYA", product_name: "Paleta de Maracuyá", category: "paletas", price: 18, branch_name: "General", initial_stock: 0 },

        // ── AGUAS FRESCAS ──
        { product_id: "sup_agua_1l", product_code: "AG-1L", product_name: "Agua 1 Lt", category: "aguas", price: 35, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_1lt", supply_name: "Vaso 1 Lt (Transparente)", qty: 1}, {supply_id: "sup_tapa_1lt", supply_name: "Tapas Vaso 1 Lt", qty: 1}] },
        { product_id: "p_agua_half", product_code: "AG-1/2L", product_name: "Agua 1/2 Lt", category: "aguas", price: 25, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_half", supply_name: "Vaso 1/2 Lt", qty: 1}] },
        { product_id: "p_agua_horchata", product_code: "AG-HORCH", product_name: "Agua de Horchata 1 Lt", category: "aguas", price: 35, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_1lt", supply_name: "Vaso 1 Lt", qty: 1}] },
        { product_id: "p_agua_jamaica", product_code: "AG-JAM", product_name: "Agua de Jamaica 1 Lt", category: "aguas", price: 35, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_1lt", supply_name: "Vaso 1 Lt", qty: 1}] },
        { product_id: "p_agua_cebada", product_code: "AG-CEB", product_name: "Agua de Cebada 1 Lt", category: "aguas", price: 35, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_1lt", supply_name: "Vaso 1 Lt", qty: 1}] },
        { product_id: "p_agua_frutas", product_code: "AG-FRUT", product_name: "Agua de Frutas 1 Lt", category: "aguas", price: 35, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_1lt", supply_name: "Vaso 1 Lt", qty: 1}] },

        // ── PREPARADOS & DULCES ──
        { product_id: "p_fresas_crema", product_code: "PREP-FRESA", product_name: "Fresas con Crema", category: "preparados", price: 50, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_tapa_fresas", supply_name: "Tapas para Fresas", qty: 1}, {supply_id: "sup_cucharas", supply_name: "Cucharas para Nieve", qty: 1}] },
        { product_id: "p_esquites", product_code: "PREP-ESQ", product_name: "Esquites Preparados", category: "preparados", price: 40, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_vaso_12", supply_name: "Vaso #12", qty: 1}, {supply_id: "sup_cucharas", supply_name: "Cucharas para Nieve", qty: 1}] },
        { product_id: "p_nachos", product_code: "PREP-NACHO", product_name: "Nachos con Queso", category: "preparados", price: 45, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_charola_banana", supply_name: "Charola para Banana Split", qty: 1}] },
        { product_id: "p_tostilocos", product_code: "PREP-TOSTI", product_name: "Tostilocos Preparados", category: "preparados", price: 45, branch_name: "General", initial_stock: 0, is_composite: true, components: [{supply_id: "sup_cucharas", supply_name: "Cucharas para Nieve", qty: 1}] },
        { product_id: "p_chicle", product_code: "CHIC", product_name: "Chicles & Dulces", category: "dulces", price: 10, branch_name: "General", initial_stock: 0 },

        // ── INSUMOS Y DESECHABLES DE BODEGA ──
        { product_id: "sup_cono_sencillo", product_code: "INS-CS", product_name: "Cono Sencillo (Galleta)", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_cono_dv", product_code: "INS-CDV", product_name: "Cono Doble Vainilla (Galleta)", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_cono_dch", product_code: "INS-CDCH", product_name: "Cono Doble Chocolate (Galleta)", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_cucharas", product_code: "CUCHARA", product_name: "Cucharas para Nieve", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_servilletas", product_code: "SERV-PAQ", product_name: "Servilletas", category: "desechables", price: 0, is_supply: true, units_per_package: 250, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_vaso_1lt", product_code: "VASO-1L", product_name: "Vaso 1 Lt (Transparente)", category: "desechables", price: 0, is_supply: true, units_per_package: 25, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_tapa_1lt", product_code: "TAPA-1L", product_name: "Tapas Vaso 1 Lt", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_vaso_20", product_code: "VASO-20", product_name: "Vasos #20", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_tapa_20", product_code: "TAPA-20", product_name: "Tapas Vaso #20", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_vaso_half", product_code: "VASO-1/2L", product_name: "Vaso 1/2 Lt", category: "desechables", price: 0, is_supply: true, units_per_package: 25, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_tapa_fresas", product_code: "TAPA-FRESA", product_name: "Tapas para Fresas", category: "desechables", price: 0, is_supply: true, units_per_package: 100, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_vaso_6oz", product_code: "VASO-6OZ", product_name: "Vaso #6 oz", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_vaso_1lt_unicel", product_code: "VASO-1L-UNI", product_name: "Vaso 1 Lt Unicel", category: "desechables", price: 0, is_supply: true, units_per_package: 25, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_vaso_14", product_code: "VASO-14", product_name: "Vaso #14", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_vaso_12", product_code: "VASO-12", product_name: "Vaso #12", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_vaso_4", product_code: "VASO-4", product_name: "Vaso #4", category: "desechables", price: 0, is_supply: true, units_per_package: 25, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_charola_banana", product_code: "CHAR-BANANA", product_name: "Charola para Banana Split", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_tapa_unicel", product_code: "TAPA-UNI", product_name: "Tapas Vaso Unicel", category: "desechables", price: 0, is_supply: true, units_per_package: 100, initial_stock: 0, branch_name: "General" },
        { product_id: "sup_tenedores", product_code: "TENEDOR", product_name: "Tenedores Desechables", category: "desechables", price: 0, is_supply: true, units_per_package: 50, initial_stock: 0, branch_name: "General" }
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

        // 2.1 DIFUSIÓN EN TIEMPO REAL A TODAS LAS PANTALLAS ABIERTAS
        if (realtimeChannel) {
            try {
                realtimeChannel.send({
                    type: "broadcast",
                    event: "sale_created",
                    payload: { sale: saleRecord }
                });
            } catch(e) {}
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

    // Normalizador de texto para impresoras térmicas ESC/POS (limpia acentos y caracteres especiales)
    function cleanEscPosText(str) {
        if (!str) return "";
        return String(str)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ñ/g, "n")
            .replace(/Ñ/g, "N")
            .replace(/ü/g, "u")
            .replace(/Ü/g, "U")
            .replace(/[$]/g, "$")
            .replace(/[^\x20-\x7E\r\n\t]/g, " ");
    }

    function getPrinterConfig() {
        try {
            const raw = localStorage.getItem("lf_printer_config");
            if (raw) return JSON.parse(raw);
        } catch(e) {}
        return {
            model: "Mini Impresora Gia / Caysn (58mm Bluetooth)",
            paperWidth: "58mm",
            baudRate: 9600,
            autoPrint: true,
            connectionType: "bt"
        };
    }

    function savePrinterConfig(cfg) {
        try {
            localStorage.setItem("lf_printer_config", JSON.stringify(cfg));
        } catch(e) {}
    }

    function getPrinterConnectionStatus() {
        const cfg = getPrinterConfig();
        if (directBtChar && directBtServer && directBtServer.connected) {
            return { type: "bt", name: directBtDevice?.name || "Mini Impresora Bluetooth", label: "🔵 Conectado por Bluetooth a " + (directBtDevice?.name || "Mini Impresora Gia / Cays") + " (Impresión Directa sin Ventanas)" };
        }
        if (directUsbDevice && directUsbDevice.opened) {
            return { type: "usb", name: directUsbDevice.productName || "Impresora USB", label: "🟢 Conectado por Cable USB / OTG (" + (directUsbDevice.productName || cfg.model) + " - Directo)" };
        }
        if (directSerialPort && directSerialPort.writable) {
            return { type: "serial", name: "Puerto Serie USB", label: "⚡ Conectado por Puerto Serie / COM (Baudio: " + (cfg.baudRate || 9600) + ")" };
        }
        return { type: "browser", name: "Impresora del Sistema", label: "🖨️ Modo Impresión del Sistema (Windows / Ofichido)" };
    }

    // Generador de comandos ESC/POS binarios para Ticket de Venta
    function buildEscPosTicket(s) {
        const encoder = new TextEncoder();
        const parts = [];
        const isCard = s.payment_method === "card";
        const width = 32;

        const initCmd = new Uint8Array([0x1B, 0x40, 0x1B, 0x32]); // ESC @ + ESC 2
        const centerCmd = new Uint8Array([0x1B, 0x61, 0x01]);
        const leftCmd = new Uint8Array([0x1B, 0x61, 0x00]);
        const boldOn = new Uint8Array([0x1B, 0x45, 0x01]);
        const boldOff = new Uint8Array([0x1B, 0x45, 0x00]);
        const feedAndCut = new Uint8Array([0x0D, 0x0A, 0x0D, 0x0A, 0x0D, 0x0A, 0x1B, 0x64, 0x04, 0x1D, 0x56, 0x00]);

        parts.push(initCmd);
        parts.push(centerCmd, boldOn, encoder.encode(cleanEscPosText("NEVERIA LA FUENTE\r\n")), boldOff);
        parts.push(encoder.encode(cleanEscPosText("-- DESDE 1962 --\r\n")));
        parts.push(encoder.encode(cleanEscPosText("PALETERIA Y NEVERIA ARTESANAL\r\n")));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(leftCmd);
        parts.push(encoder.encode(cleanEscPosText("SUCURSAL: " + (s.branch_name || S.branchName) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("TURNO:    " + (s.shift_name || S.shift) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("FECHA:    " + fdt(s.created_at) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("ATENDIO:  " + (s.cashier_name || "Encargada") + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("TICKET:   #" + (s.sale_number || "") + "\r\n")));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(boldOn, encoder.encode("CANT  DESCRIPCION         TOTAL\r\n"), boldOff);
        parts.push(encoder.encode("--------------------------------\r\n"));

        (s.items || []).forEach(i => {
            const qtyStr = (i.quantity + "x ").padEnd(4, " ");
            const subtotalStr = money(i.subtotal != null ? i.subtotal : (i.price * i.quantity)).padStart(9, " ");
            const maxDescLen = width - 4 - 9;
            const rawName = cleanEscPosText(i.product_name || "Producto");
            const descStr = rawName.substring(0, maxDescLen).padEnd(maxDescLen, " ");
            parts.push(encoder.encode(qtyStr + descStr + subtotalStr + "\r\n"));
        });

        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(boldOn, encoder.encode("TOTAL: " + money(s.total).padStart(width - 7, " ") + "\r\n"), boldOff);
        parts.push(encoder.encode("PAGO:  " + (isCard ? "TARJETA" : "EFECTIVO").padStart(width - 7, " ") + "\r\n"));
        parts.push(encoder.encode("================================\r\n"));
        parts.push(centerCmd, boldOn, encoder.encode(cleanEscPosText("¡GRACIAS POR SU COMPRA!\r\n")), boldOff);
        parts.push(encoder.encode(cleanEscPosText("Conserve este ticket\r\n")));
        parts.push(feedAndCut);

        const totalLen = parts.reduce((acc, p) => acc + p.length, 0);
        const combined = new Uint8Array(totalLen);
        let offset = 0;
        for (const p of parts) {
            combined.set(p, offset);
            offset += p.length;
        }
        return combined;
    }

    // Generador de comandos ESC/POS binarios para Corte de Caja
    function buildEscPosCutTicket(ct) {
        const encoder = new TextEncoder();
        const parts = [];

        const initCmd = new Uint8Array([0x1B, 0x40, 0x1B, 0x32]);
        const centerCmd = new Uint8Array([0x1B, 0x61, 0x01]);
        const leftCmd = new Uint8Array([0x1B, 0x61, 0x00]);
        const boldOn = new Uint8Array([0x1B, 0x45, 0x01]);
        const boldOff = new Uint8Array([0x1B, 0x45, 0x00]);
        const feedAndCut = new Uint8Array([0x0D, 0x0A, 0x0D, 0x0A, 0x0D, 0x0A, 0x1B, 0x64, 0x04, 0x1D, 0x56, 0x00]);

        parts.push(initCmd);
        parts.push(centerCmd, boldOn, encoder.encode(cleanEscPosText("NEVERIA LA FUENTE\r\n")), boldOff);
        parts.push(encoder.encode(cleanEscPosText("-- CORTE DE CAJA OFICIAL --\r\n")));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(leftCmd);
        parts.push(encoder.encode(cleanEscPosText("SUCURSAL: " + (ct.branch_name || S.branchName) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("TURNO:    " + (ct.shift_name || S.shift) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("FECHA:    " + fdt(ct.created_at || now()) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("ENCARGADA:" + (ct.cashier_name || "Encargada") + "\r\n")));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(encoder.encode(cleanEscPosText("FONDO INICIAL:   " + money(ct.opening_amount || 0).padStart(15, " ") + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("VENTAS EFECTIVO: " + money(ct.cash_sales || 0).padStart(15, " ") + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("VENTAS TARJETA:  " + money(ct.card_sales || 0).padStart(15, " ") + "\r\n")));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(boldOn, encoder.encode(cleanEscPosText("TOTAL VENDIDO:   " + money(ct.total_sales || 0).padStart(15, " ") + "\r\n")), boldOff);
        parts.push(encoder.encode(cleanEscPosText("EFECTIVO ESPERADO: " + money(ct.expected_cash || 0).padStart(13, " ") + "\r\n")));
        parts.push(boldOn, encoder.encode(cleanEscPosText("EFECTIVO CONTADO:  " + money(ct.counted_cash || 0).padStart(13, " ") + "\r\n")), boldOff);
        const diff = Number(ct.difference || 0);
        const diffStr = (diff > 0 ? "+" : "") + money(diff);
        parts.push(encoder.encode(cleanEscPosText("DIFERENCIA:        " + diffStr.padStart(13, " ") + "\r\n")));
        parts.push(encoder.encode("================================\r\n"));
        parts.push(centerCmd, encoder.encode(cleanEscPosText("FIRMA ENCARGADA\r\n\r\n")));
        parts.push(encoder.encode(cleanEscPosText("___________________________\r\n")));
        parts.push(feedAndCut);

        const totalLen = parts.reduce((acc, p) => acc + p.length, 0);
        const combined = new Uint8Array(totalLen);
        let offset = 0;
        for (const p of parts) {
            combined.set(p, offset);
            offset += p.length;
        }
        return combined;
    }

    // Generador de comandos ESC/POS binarios para Apertura de Turno
    function buildEscPosShiftTicket(sh) {
        const encoder = new TextEncoder();
        const parts = [];

        const initCmd = new Uint8Array([0x1B, 0x40, 0x1B, 0x32]);
        const centerCmd = new Uint8Array([0x1B, 0x61, 0x01]);
        const leftCmd = new Uint8Array([0x1B, 0x61, 0x00]);
        const boldOn = new Uint8Array([0x1B, 0x45, 0x01]);
        const boldOff = new Uint8Array([0x1B, 0x45, 0x00]);
        const feedAndCut = new Uint8Array([0x0D, 0x0A, 0x0D, 0x0A, 0x0D, 0x0A, 0x1B, 0x64, 0x04, 0x1D, 0x56, 0x00]);

        parts.push(initCmd);
        parts.push(centerCmd, boldOn, encoder.encode(cleanEscPosText("NEVERIA LA FUENTE\r\n")), boldOff);
        parts.push(encoder.encode(cleanEscPosText("-- APERTURA DE TURNO --\r\n")));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(leftCmd);
        parts.push(encoder.encode(cleanEscPosText("SUCURSAL: " + (sh.branch_name || S.branchName) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("TURNO:    " + (sh.shift_name || S.shift) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("FECHA:    " + fdt(sh.opened_at || now()) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("ENCARGADA:" + (sh.cashier_name || "Encargada") + "\r\n")));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(boldOn, encoder.encode(cleanEscPosText("FONDO INICIAL: " + money(sh.opening_amount || 0).padStart(17, " ") + "\r\n")), boldOff);
        parts.push(encoder.encode("================================\r\n"));
        parts.push(centerCmd, encoder.encode(cleanEscPosText("FIRMA DE CONFORMIDAD\r\n\r\n")));
        parts.push(encoder.encode(cleanEscPosText("___________________________\r\n")));
        parts.push(feedAndCut);

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
        const initCmd = new Uint8Array([0x1B, 0x40, 0x1B, 0x32]);
        const centerCmd = new Uint8Array([0x1B, 0x61, 0x01]);
        const leftCmd = new Uint8Array([0x1B, 0x61, 0x00]);
        const boldOn = new Uint8Array([0x1B, 0x45, 0x01]);
        const boldOff = new Uint8Array([0x1B, 0x45, 0x00]);
        const feedAndCut = new Uint8Array([0x0D, 0x0A, 0x0D, 0x0A, 0x0D, 0x0A, 0x1B, 0x64, 0x04, 0x1D, 0x56, 0x00]);

        parts.push(initCmd);
        parts.push(centerCmd, boldOn, encoder.encode("NEVERIA LA FUENTE\r\n"), boldOff);
        parts.push(encoder.encode("IMPRESION DIRECTA BLUETOOTH\r\n"));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(leftCmd);
        parts.push(encoder.encode(cleanEscPosText("SUCURSAL: " + S.branchName + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("FECHA:    " + fdt(now()) + "\r\n")));
        parts.push(encoder.encode(cleanEscPosText("DISPOSITIVO: " + (directBtDevice?.name || "Mini Impresora Gia/Cays") + "\r\n")));
        parts.push(encoder.encode("--------------------------------\r\n"));
        parts.push(centerCmd, boldOn, encoder.encode("¡CALIBRACION CORRECTA!\r\n"), boldOff);
        parts.push(encoder.encode("Mini Impresora Conectada\r\n"));
        parts.push(encoder.encode("Impresion Directa sin Ventanas\r\n"));
        parts.push(feedAndCut);

        const totalLen = parts.reduce((acc, p) => acc + p.length, 0);
        const combined = new Uint8Array(totalLen);
        let offset = 0;
        for (const p of parts) {
            combined.set(p, offset);
            offset += p.length;
        }
        return combined;
    }

    // 1. Conectar por WebSerial (Puerto USB COM en Windows)
    async function connectSerialDirect(baudRate = 9600) {
        if (!navigator.serial) {
            toast("WebSerial no está soportado en este navegador. Usa Google Chrome o Microsoft Edge en Windows.", "warn", 5000);
            return false;
        }
        try {
            toast("⚡ Selecciona el puerto USB de tu impresora en la lista…", "info", 4000);
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: Number(baudRate) });
            directSerialPort = port;
            savePrinterConfig({ ...getPrinterConfig(), connectionType: "serial", baudRate: Number(baudRate) });
            toast("✓ ¡Impresora conectada exitosamente por Puerto Serie USB!", "success", 4000);
            return true;
        } catch(err) {
            if (err.name !== "NotFoundError") {
                console.warn("Serial connection error:", err);
                toast("No se pudo conectar por Puerto Serie: " + (err.message || err), "error", 5000);
            }
            return false;
        }
    }

    async function disconnectSerialDirect() {
        try {
            if (directBtServer) {
                await directBtServer.disconnect();
                directBtServer = null;
                directBtDevice = null;
                directBtChar = null;
            }
            if (directUsbDevice) {
                await directUsbDevice.close();
                directUsbDevice = null;
            }
            if (directSerialWriter) {
                await directSerialWriter.close();
                directSerialWriter = null;
            }
            if (directSerialPort) {
                await directSerialPort.close();
                directSerialPort = null;
            }
            toast("Impresora desconectada", "info");
        } catch(e) {
            directBtServer = null;
            directUsbDevice = null;
            directSerialPort = null;
        }
    }

    // 2. Conectar por WebUSB (Cable USB / OTG directo en Android / Windows)
    async function connectUsbDirect() {
        if (!navigator.usb) {
            toast("WebUSB no disponible. Usa Chrome en Android o Windows.", "warn", 5000);
            return false;
        }
        try {
            toast("🔌 Selecciona tu mini impresora en la lista USB…", "info", 4000);
            const device = await navigator.usb.requestDevice({ filters: [] });
            await device.open();
            if (device.configuration === null) await device.selectConfiguration(1);
            for (let i = 0; i < (device.configuration?.interfaces?.length || 1); i++) {
                try { await device.claimInterface(i); } catch(e) {}
            }
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
            savePrinterConfig({ ...getPrinterConfig(), connectionType: "usb" });
            toast("✓ ¡Mini impresora USB conectada! Los tickets saldrán directo sin ventanas.", "success", 4500);
            return true;
        } catch(err) {
            if (err.name !== "NotFoundError") {
                console.warn("USB connect error:", err);
                toast("Error al conectar por USB: " + (err.message || err), "error");
            }
            return false;
        }
    }

    // 3. Conectar por Web Bluetooth (Especial para Android / Mini Impresoras Gia y Caysn)
    async function connectBtDirect() {
        if (!navigator.bluetooth) {
            toast("Bluetooth Web no disponible. Activa Bluetooth y usa Google Chrome en Android.", "warn", 5000);
            return false;
        }
        try {
            toast("📶 Selecciona tu mini impresora Bluetooth (Ghia / Caysn / POS-58)…", "info", 4000);
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [
                    "000018f0-0000-1000-8000-00805f9b34fb",
                    "0000e0ff-0000-1000-8000-00805f9b34fb",
                    "0000ffe0-0000-1000-8000-00805f9b34fb",
                    "0000ff00-0000-1000-8000-00805f9b34fb",
                    "0000fee7-0000-1000-8000-00805f9b34fb",
                    "49535343-fe7d-41aa-8d9b-06ec680ca597",
                    "e7810a71-73ae-499d-8c15-faa9aef0c3f2"
                ]
            });
            const server = await device.gatt.connect();
            directBtDevice = device;
            directBtServer = server;

            let writeChar = null;
            try {
                const services = await server.getPrimaryServices();
                for (const service of services) {
                    try {
                        const chars = await service.getCharacteristics();
                        for (const char of chars) {
                            if (char.properties.writeWithoutResponse || char.properties.write) {
                                writeChar = char;
                                break;
                            }
                        }
                    } catch(e) {}
                    if (writeChar) break;
                }
            } catch(e) {}

            directBtChar = writeChar;
            savePrinterConfig({ ...getPrinterConfig(), connectionType: "bt" });
            toast("✓ ¡Mini impresora '" + device.name + "' conectada por Bluetooth! Los tickets se imprimirán directo sin abrir ventanas.", "success", 5000);
            return true;
        } catch(err) {
            if (err.name !== "NotFoundError") {
                console.warn("BT connect error:", err);
                toast("Error al conectar Bluetooth: " + (err.message || err), "error");
            }
            return false;
        }
    }

    // Escritura de bytes directa al hardware sin pasar por el diálogo del navegador
    async function writeEscPosBytes(uint8Data) {
        // A. Bluetooth Directo (Android Gia / Caysn)
        if (directBtChar && directBtServer && directBtServer.connected) {
            try {
                const CHUNK_SIZE = 100;
                for (let i = 0; i < uint8Data.length; i += CHUNK_SIZE) {
                    const chunk = uint8Data.slice(i, i + CHUNK_SIZE);
                    if (directBtChar.writeValueWithoutResponse) {
                        await directBtChar.writeValueWithoutResponse(chunk);
                    } else if (directBtChar.writeValue) {
                        await directBtChar.writeValue(chunk);
                    }
                    await new Promise(r => setTimeout(r, 15));
                }
                return true;
            } catch(e) {
                console.warn("BT write error:", e);
            }
        }
        // B. USB OTG Directo
        if (directUsbDevice && directUsbDevice.opened) {
            try {
                await directUsbDevice.transferOut(directUsbEndpoint, uint8Data);
                return true;
            } catch(e) {
                console.warn("USB transferOut error:", e);
            }
        }
        // C. Serial Port (Windows)
        if (directSerialPort && directSerialPort.writable) {
            try {
                if (!directSerialWriter) {
                    directSerialWriter = directSerialPort.writable.getWriter();
                }
                await directSerialWriter.write(uint8Data);
                directSerialWriter.releaseLock();
                directSerialWriter = null;
                return true;
            } catch(e) {
                try { directSerialWriter?.releaseLock(); } catch(err) {}
                directSerialWriter = null;
            }
        }
        return false;
    }

    // Invocador Universal del Diálogo de Impresión (Chrome / Windows / Ofichido)
    function triggerUniversalPrint(ticketInnerHtml) {
        try {
            const cfg = getPrinterConfig();
            const is80mm = cfg.paperWidth === "80mm";

            let container = document.getElementById("pos-thermal-receipt-container");
            if (!container) {
                container = document.createElement("div");
                container.id = "pos-thermal-receipt-container";
                document.body.appendChild(container);
            }

            container.className = is80mm ? "width-80mm" : "";
            container.innerHTML = ticketInnerHtml;

            // Disparar diálogo nativo de impresión directamente
            window.focus();
            window.print();
        } catch(err) {
            console.warn("triggerUniversalPrint error:", err);
        }
    }

    function printShiftOpeningReceipt(shiftObj) {
        if (!shiftObj) return;

        // Si Bluetooth o USB está conectado, enviar directo sin ventanas
        if ((directBtChar && directBtServer && directBtServer.connected) || (directUsbDevice && directUsbDevice.opened) || (directSerialPort && directSerialPort.writable)) {
            const raw = buildEscPosShiftTicket(shiftObj);
            writeEscPosBytes(raw).then(ok => {
                if (ok) toast("✓ Comprobante de apertura impreso en mini impresora", "success", 3000);
            });
            return;
        }

        const shiftHtml = `
            <div class="center bold" style="font-size:15px; margin-bottom:2px;">NEVERIA LA FUENTE</div>
            <div class="center" style="font-size:11px; font-style:italic;">-- DESDE 1962 --</div>
            <div class="center" style="font-size:10px; margin-bottom:4px;">APERTURA DE TURNO Y FONDO DE CAJA</div>
            <div class="divider"></div>
            <div><strong>SUCURSAL:</strong> ${esc(shiftObj.branch_name || S.branchName)}</div>
            <div><strong>TURNO:</strong> ${esc(shiftObj.shift_name || S.shift)}</div>
            <div><strong>FECHA / HORA:</strong> ${fdt(shiftObj.opened_at || now())}</div>
            <div><strong>ENCARGADA:</strong> ${esc(shiftObj.cashier_name || "Encargada")}</div>
            <div class="divider"></div>
            <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:bold; margin: 6px 0;">
                <span>FONDO INICIAL:</span>
                <span>${money(shiftObj.opening_amount)}</span>
            </div>
            <div class="divider"></div>
            <div class="center" style="font-size:10px; margin-top:4px;">
                Fondo de caja validado y asignado para el turno.<br>
                Este importe se reflejará en el corte de caja.
            </div>
            <div style="height: 18mm;"></div>
            <div class="center" style="border-top: 1px dashed #000; padding-top: 4px; font-size:10px; margin: 0 10mm;">
                FIRMA DE CONFORMIDAD
            </div>
            <div style="height: 15mm;"></div>
        `;
        triggerUniversalPrint(shiftHtml);
    }

    async function printSaleReceipt(sale) {
        if (!sale) return;
        localStorage.setItem("lf_last_printed_sale", JSON.stringify(sale));

        // 1. Envío binario por hardware directo si Bluetooth o USB está conectado (CERO VENTANAS)
        if ((directBtChar && directBtServer && directBtServer.connected) || (directUsbDevice && directUsbDevice.opened) || (directSerialPort && directSerialPort.writable)) {
            const raw = buildEscPosTicket(sale);
            const ok = await writeEscPosBytes(raw);
            if (ok) {
                toast("✓ Ticket impreso directamente en mini impresora", "success", 3000);
                return;
            }
        }

        // 2. Impresión nativa del sistema (Windows / Ofichido)
        const isCard = sale.payment_method === "card";
        const receiptHtml = `
            <div class="center bold" style="font-size:15px; margin-bottom:2px;">NEVERIA LA FUENTE</div>
            <div class="center" style="font-size:11px; font-style:italic;">-- DESDE 1962 --</div>
            <div class="center" style="font-size:10px; margin-bottom:4px;">PALETERIA Y NEVERIA ARTESANAL</div>
            <div class="divider"></div>
            <div><strong>SUCURSAL:</strong> ${esc(sale.branch_name || S.branchName)}</div>
            <div><strong>TURNO:</strong> ${esc(sale.shift_name || S.shift)}</div>
            <div><strong>FECHA:</strong> ${fdt(sale.created_at)}</div>
            <div><strong>ATENDIÓ:</strong> ${esc(sale.cashier_name || "Encargada")}</div>
            <div><strong>TICKET:</strong> #${esc(sale.sale_number || sale.id)}</div>
            <div class="divider"></div>
            <table style="width:100%; font-size:11px; border-collapse:collapse;">
                <thead>
                    <tr style="border-bottom:1px dashed #000;">
                        <th style="text-align:left; width:15%;">CANT</th>
                        <th style="text-align:left; width:55%;">DESCRIPCIÓN</th>
                        <th style="text-align:right; width:30%;">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    ${(sale.items || []).map(i => `
                        <tr>
                            <td style="vertical-align:top;">${i.quantity}x</td>
                            <td style="vertical-align:top;">${esc(i.product_name)}</td>
                            <td style="text-align:right; vertical-align:top;">${money(i.subtotal != null ? i.subtotal : (i.price * i.quantity))}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            <div class="divider"></div>
            <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:bold; margin: 4px 0;">
                <span>TOTAL:</span>
                <span>${money(sale.total)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:11px;">
                <span>MÉTODO DE PAGO:</span>
                <span>${isCard ? "💳 TARJETA" : "💵 EFECTIVO"}</span>
            </div>
            <div class="double-divider"></div>
            <div class="center bold" style="font-size:12px; margin-top:4px;">¡GRACIAS POR SU COMPRA!</div>
            <div class="center" style="font-size:10px;">Conserve este ticket para cualquier aclaración</div>
            <div style="height: 18mm;"></div>
        `;

        triggerUniversalPrint(receiptHtml);
    }

    async function printCutReceipt(cutData) {
        if (!cutData) return;
        localStorage.setItem("lf_last_printed_cut", JSON.stringify(cutData));

        // 1. Si Bluetooth o USB está conectado (Android / Mini impresora), enviar directo sin ventanas
        if ((directBtChar && directBtServer && directBtServer.connected) || (directUsbDevice && directUsbDevice.opened) || (directSerialPort && directSerialPort.writable)) {
            const raw = buildEscPosCutTicket(cutData);
            const ok = await writeEscPosBytes(raw);
            if (ok) {
                toast("✓ Corte de caja impreso en mini impresora", "success", 3000);
                return;
            }
        }

        // 2. Impresión nativa del sistema (Windows / Ofichido)
        const isM = (cutData.shift_name || "").toLowerCase().includes("mañana") || (cutData.shift_name || "").toLowerCase().includes("matutino");
        const cashier = cutData.performed_by_name || cutData.cashier_name || "Encargada";
        const cutHtml = `
            <div class="center bold" style="font-size:15px; margin-bottom:2px;">NEVERIA LA FUENTE</div>
            <div class="center" style="font-size:11px; font-style:italic;">-- CORTE DE CAJA OFICIAL --</div>
            <div class="divider"></div>
            <div><strong>SUCURSAL:</strong> ${esc(cutData.branch_name || S.branchName)}</div>
            <div><strong>TURNO:</strong> ${isM ? "🌅 MATUTINO (MAÑANA)" : "🌇 VESPERTINO (TARDE)"}</div>
            <div><strong>FECHA / HORA:</strong> ${fdt(cutData.created_at || now())}</div>
            <div><strong>ENCARGADA:</strong> ${esc(cashier)}</div>
            <div class="divider"></div>
            <div style="display:flex; justify-content:space-between; font-size:11.5px; margin: 3px 0;">
                <span>FONDO INICIAL:</span>
                <strong>${money(cutData.opening_amount || 0)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:11.5px; margin: 3px 0;">
                <span>VENTAS EN EFECTIVO:</span>
                <strong>${money(cutData.cash_sales || 0)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:11.5px; margin: 3px 0;">
                <span>VENTAS EN TARJETA:</span>
                <strong>${money(cutData.card_sales || 0)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:11.5px; margin: 3px 0;">
                <span>TOTAL VENDIDO:</span>
                <strong>${money(cutData.total_sales || 0)}</strong>
            </div>
            <div class="divider"></div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:bold; margin: 4px 0;">
                <span>EFECTIVO ESPERADO:</span>
                <span>${money(cutData.expected_cash || 0)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:bold; margin: 4px 0;">
                <span>EFECTIVO CONTADO:</span>
                <span>${money(cutData.counted_cash || 0)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:bold; margin: 4px 0; color:${(cutData.difference||0)<0?'#b91c1c':((cutData.difference||0)>0?'#15803d':'#000')}">
                <span>DIFERENCIA:</span>
                <span>${(cutData.difference||0)>0?'+':''}${money(cutData.difference || 0)}</span>
            </div>
            <div class="double-divider"></div>
            <div style="height: 18mm;"></div>
            <div class="center" style="border-top: 1px dashed #000; padding-top: 4px; font-size:10px; margin: 0 10mm;">
                FIRMA ENCARGADA DE TURNO
            </div>
            <div style="height: 15mm;"></div>
        `;

        triggerUniversalPrint(cutHtml);
    }

    async function printDailyAccountingReceipt(accData) {
        if (!accData) return;
        const repHtml = `
            <div class="center bold" style="font-size:15px; margin-bottom:2px;">NEVERIA LA FUENTE</div>
            <div class="center" style="font-size:11px; font-style:italic;">-- BALANCE DIARIO CONSOLIDADO --</div>
            <div class="divider"></div>
            <div><strong>FECHA REPORTE:</strong> ${accData.dateLabel}</div>
            <div><strong>SUCURSAL:</strong> ${esc(accData.branchName || "Cadena Completa")}</div>
            <div class="divider"></div>
            <div style="display:flex; justify-content:space-between; font-size:11px; margin: 2px 0;">
                <span>VENTAS EFECTIVO:</span>
                <strong>${money(accData.cashTotal || 0)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:11px; margin: 2px 0;">
                <span>VENTAS TARJETA:</span>
                <strong>${money(accData.cardTotal || 0)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:11px; margin: 2px 0;">
                <span>TOTAL TICKETS:</span>
                <strong>${accData.ticketsCount || 0}</strong>
            </div>
            <div class="divider"></div>
            <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:bold; margin: 4px 0;">
                <span>TOTAL DEL DÍA:</span>
                <span>${money(accData.grandTotal || 0)}</span>
            </div>
            <div class="double-divider"></div>
            <div style="height: 15mm;"></div>
        `;

        triggerUniversalPrint(repHtml);
    }

    async function printTestReceipt() {
        // Si Bluetooth o USB está conectado, enviar directo sin ventanas
        if ((directBtChar && directBtServer && directBtServer.connected) || (directUsbDevice && directUsbDevice.opened) || (directSerialPort && directSerialPort.writable)) {
            const raw = buildEscPosTestTicket();
            const ok = await writeEscPosBytes(raw);
            if (ok) {
                toast("✓ ¡Ticket de prueba impreso físicamente por Bluetooth/USB directo!", "success", 4000);
                return;
            }
        }

        const cfg = getPrinterConfig();
        const conn = getPrinterConnectionStatus();

        const testContent = `
            <div class="center bold" style="font-size:15px; margin-bottom:2px;">NEVERIA LA FUENTE</div>
            <div class="center" style="font-size:11px; font-style:italic;">-- PRUEBA DE IMPRESION --</div>
            <div class="divider"></div>
            <div><strong>MODELO:</strong> ${esc(cfg.model || "Ofichido / Gia / Caysn 58mm")}</div>
            <div><strong>ESTADO:</strong> ${esc(conn.label)}</div>
            <div><strong>FECHA / HORA:</strong> ${fdt(now())}</div>
            <div><strong>SUCURSAL:</strong> ${esc(S.branchName)}</div>
            <div><strong>USUARIO:</strong> ${esc(S.profile?.full_name || S.user?.email || "Usuario")}</div>
            <div class="divider"></div>
            <div class="bold center" style="font-size:12px; margin:4px 0;">¡CALIBRACION CORRECTA!</div>
            <div class="center" style="font-size:10px;">
                Esta impresora esta lista para:<br>
                ✓ Tickets de Venta a Clientes<br>
                ✓ Cortes de Caja por Turno<br>
                ✓ Reportes Diarios Consolidados<br>
                ✓ Aperturas de Turno con Firma
            </div>
            <div class="double-divider"></div>
            <div class="center bold" style="font-size:11px; margin-top:6px;">
                [ CORTAR AQUI ]
            </div>
            <div style="height: 20mm;"></div>
        `;

        triggerUniversalPrint(testContent);
    }

    function openPrinterSetupModal() {
        const curCfg = getPrinterConfig();
        const conn = getPrinterConnectionStatus();
        const isBtConnected = !!(directBtChar && directBtServer && directBtServer.connected);
        const isConnectedDirect = isBtConnected || !!(directUsbDevice && directUsbDevice.opened) || !!(directSerialPort && directSerialPort.writable);
        
        const overlay = document.createElement("div");
        overlay.id = "printer-modal-overlay";
        overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);";
        overlay.innerHTML = `
            <div style="background:#fffef8;border:2px solid var(--gold-500);border-radius:22px;padding:24px 22px;max-width:540px;width:100%;box-shadow:0 24px 70px rgba(0,0,0,.45);color:#1a0205;max-height:92vh;overflow-y:auto">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1.5px solid rgba(188,132,10,.3);padding-bottom:10px">
                    <div style="display:flex;align-items:center;gap:8px">
                        <span style="font-size:28px">🖨️</span>
                        <div>
                            <h3 style="margin:0;color:var(--wine-950);font-size:18px;font-weight:900">Impresoras Térmicas</h3>
                            <small style="color:var(--text-muted);font-weight:700">Gia & Caysn (Rescate / Android) | Ofichido (Tagarete / Windows)</small>
                        </div>
                    </div>
                    <button id="p-close-btn" type="button" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--wine-900);font-weight:900">✕</button>
                </div>

                <!-- ESTADO ACTUAL -->
                <div style="background:#fef3c7;border:1.5px solid #fcd34d;padding:10px 12px;border-radius:12px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center">
                    <div>
                        <div style="font-size:10px;color:#92400e;font-weight:900">ESTADO ACTUAL:</div>
                        <strong style="font-size:12px;color:#78350f">${conn.label}</strong>
                    </div>
                    ${isConnectedDirect ? `<button type="button" id="btn-disconnect-printer" style="background:#fee2e2;color:#991b1b;border:1px solid #f87171;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer">Desconectar</button>` : ''}
                </div>

                <!-- SECCIÓN ANDROID / EL RESCATE (BLUETOOTH DIRECTO SIN VENTANAS) -->
                <div style="background:#f0fdf4;border:2.5px solid #22c55e;border-radius:16px;padding:16px;margin-bottom:14px;box-shadow:0 4px 12px rgba(34,197,94,0.15)">
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                        <span style="font-size:22px">📶</span>
                        <strong style="color:#15803d;font-size:14px">EL RESCATE (ANDROID / MINI GIA & CAYSN)</strong>
                    </div>
                    <p style="margin:0 0 10px 0;font-size:11.5px;color:#166534;line-height:1.4">
                        Conecta por <strong>Bluetooth</strong> para que cada cobro o ticket salga <strong>físicamente de inmediato sin abrir ventanas en la pantalla</strong>.
                    </p>
                    <div style="display:flex;flex-direction:column;gap:8px">
                        <button type="button" id="btn-pair-bt-main"
                            style="width:100%;padding:13px;background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;border:none;border-radius:10px;font-weight:900;font-size:13.5px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 3px 10px rgba(34,197,94,0.3)">
                            <span>📶</span>
                            <span>${isBtConnected ? '✓ Mini Impresora Conectada (Reconectar / Cambiar)' : 'Conectar Mini Impresora por Bluetooth (Gia / Caysn)'}</span>
                        </button>
                        ${isBtConnected ? `
                        <button type="button" id="btn-test-bt-direct"
                            style="width:100%;padding:10px;background:#fff;color:#15803d;border:1.5px solid #22c55e;border-radius:10px;font-weight:900;font-size:12.5px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
                            <span>🖨️</span><span>Imprimir Prueba Directa por Bluetooth (Sin Ventanas)</span>
                        </button>` : ''}
                    </div>
                </div>

                <!-- SECCIÓN WINDOWS / TAGARETE (OFICHIDO) -->
                <div style="background:#eff6ff;border:2px solid #3b82f6;border-radius:14px;padding:14px;margin-bottom:14px">
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                        <span style="font-size:20px">🖨️</span>
                        <strong style="color:#1e40af;font-size:13.5px">TAGARETE (WINDOWS / OFICHIDO)</strong>
                    </div>
                    <p style="margin:0 0 10px 0;font-size:11.5px;color:#1e3a8a;line-height:1.4">
                        Abre la ventana de impresión para enviar directamente a la impresora <strong>Ofichido</strong>.
                    </p>
                    <button type="button" id="btn-test-browser"
                        style="width:100%;padding:12px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;border:none;border-radius:10px;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 14px rgba(59,130,246,0.3);display:flex;align-items:center;justify-content:center;gap:8px">
                        <span>🖨️</span>
                        <span>Abrir Diálogo de Impresión (Enviar a Ofichido)</span>
                    </button>
                </div>

                <!-- OTRAS CONEXIONES -->
                <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:10px 12px;margin-bottom:14px">
                    <label style="font-size:10.5px;font-weight:900;color:var(--wine-900);display:block;margin-bottom:6px">CONEXIONES ALTERNATIVAS POR CABLE:</label>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                        <button type="button" id="btn-pair-usb"
                            style="padding:8px 6px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);color:#1e40af;border:1.5px solid #93c5fd;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">
                            <span>🔌</span><span>Cable USB / OTG</span>
                        </button>
                        <button type="button" id="btn-pair-serial"
                            style="padding:8px 6px;background:linear-gradient(135deg,#fef3c7,#fde68a);color:#92400e;border:1.5px solid #fcd34d;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">
                            <span>⚡</span><span>Puerto Serie COM</span>
                        </button>
                    </div>
                </div>

                <div style="display:flex;justify-content:flex-end;gap:8px">
                    <button id="p-close-btn2" type="button"
                        style="padding:10px 22px;background:#e2e8f0;color:#334155;border:none;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer">
                        Cerrar
                    </button>
                </div>
            </div>`;
        document.body.appendChild(overlay);

        overlay.querySelector("#p-close-btn").onclick = () => overlay.remove();
        overlay.querySelector("#p-close-btn2").onclick = () => overlay.remove();

        // Conectar Bluetooth Principal (Gia / Caysn)
        overlay.querySelector("#btn-pair-bt-main").onclick = async () => {
            const ok = await connectBtDirect();
            if (ok) {
                overlay.remove();
                openPrinterSetupModal();
            }
        };

        if (overlay.querySelector("#btn-test-bt-direct")) {
            overlay.querySelector("#btn-test-bt-direct").onclick = async () => {
                await printTestReceipt();
            };
        }

        // Disparo para Windows / Ofichido
        overlay.querySelector("#btn-test-browser").onclick = () => {
            overlay.remove(); // Cerrar modal primero para dar foco a Chrome
            printTestReceipt();
        };

        overlay.querySelector("#btn-pair-usb").onclick = async () => {
            const ok = await connectUsbDirect();
            if (ok) overlay.remove();
        };

        overlay.querySelector("#btn-pair-serial").onclick = async () => {
            const ok = await connectSerialDirect(9600);
            if (ok) overlay.remove();
        };

        if (overlay.querySelector("#btn-disconnect-printer")) {
            overlay.querySelector("#btn-disconnect-printer").onclick = async () => {
                await disconnectSerialDirect();
                overlay.remove();
                openPrinterSetupModal();
            };
        }
    }

    async function directPrintTicketAction() {
        const lastSale = lr("last_printed_sale", null) || lr("sales", [])[0];
        if (lastSale) {
            toast("🖨️ Imprimiendo Ticket #" + (lastSale.sale_number || '') + "…", "info", 3000);
            await printSaleReceipt(lastSale);
        } else {
            toast("🖨️ Imprimiendo ticket de prueba…", "info", 3000);
            await printTestReceipt();
        }
    }

    async function autoReconnectPrinters() {
        if (navigator.serial) {
            try {
                const ports = await navigator.serial.getPorts();
                if (ports && ports.length > 0) {
                    const cfg = getPrinterConfig();
                    const port = ports[0];
                    await port.open({ baudRate: Number(cfg.baudRate || 9600) });
                    directSerialPort = port;
                    console.log("✓ Impresora Serial reconectada automáticamente");
                }
            } catch(e) {}
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

        const activeAdminFilter = S.adminBranchFilter || S.branchId || "all";

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
                <label style="font-size:12px;font-weight:900;color:#fcebd2">📍 VER SUCURSAL:</label>
                <select id="admin-branch-filter" style="padding:7px 12px;border-radius:10px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;outline:none;color:#1a0205">
                    <option value="all"${activeAdminFilter==='all'?' selected':''}>🌐 Catálogo Completo (${S.products.length} productos)</option>
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(activeAdminFilter)?' selected':''}>📍 ${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        // Lista de insumos/desechables disponibles para ser componentes
        const availableSupplies = S.products.filter(p => p.is_supply || p.category === "desechables").sort((a,b) => (a.product_name || "").localeCompare(b.product_name || ""));

        // Filtrar productos según la sucursal seleccionada
        const displayedProducts = S.products.filter(p => {
            if (activeAdminFilter === "all") return true;
            const targetBranch = S.branches.find(b => String(b.id) === String(activeAdminFilter));
            if (!targetBranch) return true;
            const isGen = !p.branch_name || p.branch_name === "General" || p.branch_id === "all";
            if (isGen) return true;
            return matchesBranch({ branch_id: p.branch_id, branch_name: p.branch_name }, targetBranch);
        });

        const activeBranchName = S.branches.find(b => String(b.id) === String(activeAdminFilter))?.name || S.branchName;

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
            <h3 style="color:#ffffff;margin:0;font-weight:900">Catálogo de Productos — ${esc(activeBranchName)} (${displayedProducts.length} productos)</h3>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${adminBranchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-reload-admin-prods" style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:8px;cursor:pointer;font-weight:bold">🔄 Actualizar</button>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px">
            ${displayedProducts.map(p => {
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
            S.adminBranchFilter = e.target.value;
            if (e.target.value !== "all") {
                await changeBranch(e.target.value);
            }
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

        // Resumen preciso por categorías para esta sucursal
        const totalSaleUnits = saleProds.reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalSupplyUnits = supplyProds.reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalPaletas = S.products.filter(p => p.category === "paletas").reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalHelados = S.products.filter(p => p.category === "helados").reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalAguas = S.products.filter(p => p.category === "aguas").reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalPreparados = S.products.filter(p => p.category === "preparados").reduce((sum, p) => sum + getStock(p.product_id), 0);

        let displayedList = S.products;
        if (S.invTab === "sales") displayedList = saleProds;
        else if (S.invTab === "supplies") displayedList = supplyProds;

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Inventario Preciso — ${esc(S.branchName)}</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Existencias reales y diferenciadas por sucursal • Límite 500 uds por producto</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${branchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-ref-inv"
                    style="padding:8px 16px;background:linear-gradient(135deg,#fff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:var(--wine-950);box-shadow:0 2px 8px rgba(0,0,0,0.2)">
                    🔄 Actualizar Inventario</button>
            </div>
        </div>

        <!-- RESUMEN PRECISO DE EXISTENCIAS EN ESTA SUCURSAL -->
        <div class="dashboard-card" style="padding:16px 20px;border-radius:16px;margin-bottom:20px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card)">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
                <div style="background:#fff;padding:10px 14px;border-radius:12px;border:1.5px solid var(--gold-400)">
                    <small style="font-size:10px;font-weight:900;color:var(--text-muted);display:block">🍨 PRODS VENTA</small>
                    <strong style="font-size:18px;color:var(--wine-900)">${totalSaleUnits} uds</strong>
                </div>
                <div style="background:#fff;padding:10px 14px;border-radius:12px;border:1.5px solid rgba(188,132,10,.35)">
                    <small style="font-size:10px;font-weight:900;color:#c2410c;display:block">🍭 PALETAS</small>
                    <strong style="font-size:18px;color:#c2410c">${totalPaletas} uds</strong>
                </div>
                <div style="background:#fff;padding:10px 14px;border-radius:12px;border:1.5px solid rgba(188,132,10,.35)">
                    <small style="font-size:10px;font-weight:900;color:#0369a1;display:block">💧 AGUAS</small>
                    <strong style="font-size:18px;color:#0369a1">${totalAguas} uds</strong>
                </div>
                <div style="background:#fff;padding:10px 14px;border-radius:12px;border:1.5px solid rgba(188,132,10,.35)">
                    <small style="font-size:10px;font-weight:900;color:#7e22ce;display:block">🍧 HELADOS</small>
                    <strong style="font-size:18px;color:#7e22ce">${totalHelados} uds</strong>
                </div>
                <div style="background:#eff6ff;padding:10px 14px;border-radius:12px;border:1.5px solid #93c5fd">
                    <small style="font-size:10px;font-weight:900;color:#1e40af;display:block">🧤 INSUMOS / DESECHABLES</small>
                    <strong style="font-size:18px;color:#1d4ed8">${totalSupplyUnits} pzs</strong>
                </div>
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
                            <span style="font-size:11px;color:#fcebd2">Stock en ${esc(S.branchName)}:</span>
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
            const val = await toastPrompt(`📦 Agregar paquetes de '${name}'\n(Cada paquete tiene ${packUnits} piezas):\n\nStock actual en ${S.branchName}: ${cur} piezas.`, "Ej: 2");
            if (val === null) return;
            const packsNum = parseInt(val, 10);
            if (isNaN(packsNum) || packsNum <= 0) return toast("Ingresa una cantidad válida de paquetes.", "warn");

            const addUnits = packsNum * packUnits;
            const maxS = getMaxStock(pid);
            const n = Math.min(maxS, cur + addUnits);
            S.inv[pid] = n;
            saveBranchInv();
            alertInv();
            toast(`✓ Agregados ${packsNum} paquete(s) (${addUnits} pz) a '${name}' en ${S.branchName}. Total: ${n} pz.`, "success", 4500);
            loadInventory();
        }));

        c.querySelectorAll(".btn-add-stk").forEach(btn => btn.addEventListener("click", async () => {
            const pid = btn.dataset.id;
            const name = btn.dataset.name;
            const cur = getStock(pid);
            const maxS = getMaxStock(pid);
            const val = await toastPrompt(`🔢 Agregar unidades sueltas a '${name}'\n\nStock actual en ${S.branchName}: ${cur} | Límite: ${maxS}\n¿Cuántas unidades deseas agregar?:`, "Ej: 5");
            if (val === null) return;
            const qty = parseInt(val, 10);
            if (isNaN(qty) || qty <= 0) return toast("Ingresa una cantidad válida a agregar.", "warn");
            const n = Math.min(maxS, cur + qty);
            S.inv[pid] = n;
            saveBranchInv();
            alertInv();
            toast(`✓ Agregadas ${qty} unidades a '${name}' en ${S.branchName}. Nuevo stock: ${n}.`, "success", 4000);
            loadInventory();
        }));

        c.querySelectorAll(".btn-set-stk").forEach(btn => btn.addEventListener("click", async () => {
            const pid = btn.dataset.id;
            const name = btn.dataset.name;
            const cur = getStock(pid);
            const maxS = getMaxStock(pid);
            const val = await toastPrompt(`✎ Ajustar Stock de '${name}' en ${S.branchName}\n(Stock actual: ${cur} | Límite: ${maxS}):`, String(cur));
            if (val === null) return;
            const n = Math.min(maxS, Math.max(0, parseInt(val, 10) || 0));
            S.inv[pid] = n;
            saveBranchInv();
            alertInv();
            toast(`✓ Stock de '${name}' en ${S.branchName} ajustado a ${n} unidades.`, "success");
            loadInventory();
        }));
    }

    /* ── MIS VENTAS (FILTRO POR FECHA, TURNOS, MÉTODO DE PAGO Y CANCELACIONES) ── */
    let _lastSalesFetchTime = 0;
    let _cachedConsolidatedSales = null;

    async function getConsolidatedSalesForChain(forceRefresh = false) {
        const nowMs = Date.now();
        if (!forceRefresh && _cachedConsolidatedSales && (nowMs - _lastSalesFetchTime < 2500)) {
            return _cachedConsolidatedSales;
        }
        let remoteSales = [];
        if (db) {
            try {
                const {data, error} = await safeQuery(db.from("sales")
                    .select("*")
                    .order("created_at", {ascending:false})
                    .limit(5000), null, 6000);
                if (data && data.length) {
                    remoteSales = data.map(s => {
                        let obs = {};
                        try {
                            obs = typeof s.observations === "string" ? JSON.parse(s.observations) : (s.observations || {});
                        } catch(e) {}

                        let bName = obs.branch_name || s.branch_name || S.branches.find(b=>String(b.id)===String(s.branch_id))?.name || "";
                        const cashierName = obs.cashier_name || s.user_name || obs.performed_by_name || "";
                        if (!bName && cashierName) {
                            const cLower = cashierName.toLowerCase();
                            for (const [em, staffInfo] of Object.entries(STAFF)) {
                                if (cLower.includes(em.toLowerCase()) || (cLower.match(/encargado\d+/) && em.includes(cLower.match(/encargado\d+/)[0]))) {
                                    bName = staffInfo.b;
                                    break;
                                }
                            }
                        }

                        return {
                            id: s.id,
                            sale_number: s.sale_number || ("TICK-" + String(s.id).substring(0,8)),
                            branch_id: s.branch_id || (bName ? S.branches.find(b => b.name === bName)?.id : ""),
                            branch_name: bName,
                            shift_name: obs.shift_name || (getShiftCategory({ cashier_name: cashierName, created_at: s.created_at }) === "vespertino" ? "Tarde" : "Mañana"),
                            cashier_id: s.user_id,
                            cashier_name: cashierName || "Encargada",
                            total: Number(s.total || 0),
                            payment_method: obs.payment_method || "cash",
                            status: (String(s.status||"").toUpperCase() === "CANCELLED" || String(obs.status||"").toUpperCase() === "CANCELLED") ? "CANCELLED" : "COMPLETED",
                            cancelled_reason: obs.cancelled_reason || null,
                            cancelled_by: obs.cancelled_by || null,
                            cancelled_at: obs.cancelled_at || null,
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
        const deletedSaleIds = new Set(gr("deleted_sale_ids", []));

        const addSaleToMap = (item) => {
            if (!item || (item.total == null && !item.sale_number && !item.items)) return;
            const sid = String(item.id || item.sale_number || item.local_id || (Date.now() + Math.random()));
            if (!salesMap.has(sid)) {
                salesMap.set(sid, item);
            } else {
                salesMap.set(sid, { ...salesMap.get(sid), ...item });
            }
        };

        // 1. Cargar explícitamente desde todas las llaves locales de sucursales conocidas
        const branchKeySuffixes = [
            "branch-1", "branch-2", "branch-3", "branch-4", "branch-5", "branch-6",
            "calzada", "rescate", "mollotes", "tagarete_1", "tagarete_2", "cnop",
            "tagarete 1", "tagarete 2", "la fuente calzada"
        ];
        branchKeySuffixes.forEach(bSuffix => {
            try {
                const raw = localStorage.getItem("lf_" + bSuffix + "_sales");
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) parsed.forEach(addSaleToMap);
                }
            } catch(e) {}
        });

        // 2. Cargar ventas globales y locales activas
        const gSales = gr("all_sales", []);
        if (Array.isArray(gSales)) gSales.forEach(addSaleToMap);

        const curSales = lr("sales", []);
        if (Array.isArray(curSales)) curSales.forEach(addSaleToMap);

        // 3. Escaneo de cualquier otra llave en localStorage
        try {
            if (typeof localStorage !== "undefined") {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && (key.startsWith("lf_") && key.includes("sales"))) {
                        try {
                            const raw = localStorage.getItem(key);
                            if (raw && raw.startsWith("[")) {
                                const parsed = JSON.parse(raw);
                                if (Array.isArray(parsed)) parsed.forEach(addSaleToMap);
                            }
                        } catch(e) {}
                    }
                }
            }
        } catch(e) {}

        // 4. Fusionar y deduplicar con las ventas remotas de Supabase
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

        // 5. Normalizar estado de cancelaciones y motivos
        for (const [k, s] of salesMap.entries()) {
            const reason = cancelledReasons[String(s.id)] || cancelledReasons[String(s.sale_number)];
            if (reason) {
                s.status = "CANCELLED";
                if (!s.cancelled_reason) s.cancelled_reason = reason;
            }
        }

        // 6. Filtrar ventas borradas y ordenar
        const consolidated = Array.from(salesMap.values())
            .filter(s => !deletedSaleIds.has(String(s.id)) && !deletedSaleIds.has(String(s.sale_number)))
            .sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

        gw("all_sales", consolidated);
        _lastSalesFetchTime = Date.now();
        _cachedConsolidatedSales = consolidated;
        return consolidated;
    }

    async function loadSales(silent = false) {
        const c = $("#sales-container");
        if (!c || !S.branchId) return;
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando ventas de ${esc(S.branchName)}…</p></div>`;
        }

        const consolidated = await getConsolidatedSalesForChain();
        const activeBranchFilter = S.isSU ? (S.salesFilterBranchId || "all") : S.branchId;

        // Filtrar ventas por sucursal seleccionada o todas si es Superusuario
        const branchSales = (S.isSU && activeBranchFilter === "all")
            ? consolidated
            : consolidated.filter(s => matchesBranch(s, { id: activeBranchFilter, name: S.branches.find(b=>String(b.id)===String(activeBranchFilter))?.name || S.branchName }));
        
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
                    <option value="all"${activeBranchFilter==='all'?' selected':''}>🌐 Todas las Sucursales</option>
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(activeBranchFilter)?' selected':''}>${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        const dateOptions = Array.from(datesMap.keys()).sort().reverse();

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Historial de Ventas — ${activeBranchFilter==='all'?'Toda la Cadena':esc(S.branchName)}</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Tickets cobrados, turnos (Mañana / Tarde), cancelaciones y reimpresiones</div>
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
                        <option value="vespertino"${selectedShift==='vespertino'?' selected':''}>🌇 Vespertino / Tarde</option>
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
                    <div style="flex:1;min-width:280px">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
                            <strong style="font-size:15px;color:var(--wine-900)">#${esc(s.sale_number || s.id)} — 📍 ${esc(s.branch_name || S.branchName)}</strong>
                            <span style="font-size:10px;padding:2px 8px;border-radius:10px;font-weight:800;${isCan?'background:#fee2e2;color:#991b1b':'background:#dcfce7;color:#15803d'}">
                                ${isCan ? '🚫 Cancelada' : '✓ Cobrada'}
                            </span>
                            <span style="font-size:10px;padding:2px 8px;border-radius:10px;font-weight:800;${isCard?'background:#eff6ff;color:#1d4ed8':'background:#f0fdf4;color:#15803d'}">
                                ${isCard ? '💳 Tarjeta' : '💵 Efectivo'}
                            </span>
                        </div>
                        <div style="font-size:11.5px;color:var(--text-muted);font-weight:600">
                            ${timeStr} • Por: <strong>${esc(s.cashier_name || 'Encargada')}</strong> <small>(${esc(s.shift_name || 'Turno')})</small>
                        </div>
                        <div style="font-size:11px;color:#4b5563;margin-top:6px">
                            ${(s.items||[]).map(i => `${i.quantity}x ${esc(i.product_name || 'Producto')}`).join(" • ")}
                        </div>
                        ${isCan ? `
                        <div style="margin-top:6px;padding:6px 10px;background:#fef2f2;border-left:3px solid #ef4444;border-radius:4px;font-size:11px;color:#991b1b;font-weight:700">
                            🛑 Motivo de Cancelación: ${esc(s.cancelled_reason || "Cancelada por la encargada")} ${s.cancelled_by ? `<small>(por: ${esc(s.cancelled_by)})</small>` : ''}
                        </div>` : ''}
                    </div>

                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                        <strong style="font-size:20px;color:${isCan?'#991b1b':'var(--wine-700)'};font-weight:900">${money(s.total)}</strong>
                        <button type="button" class="btn-reprint-sale" data-id="${esc(s.id)}"
                            style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1px solid var(--gold-400);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer">
                            🖨️ Reimprimir
                        </button>
                        ${!isCan ? `
                        <button type="button" class="btn-cancel-sale" data-id="${esc(s.id)}" data-num="${esc(s.sale_number || s.id)}" data-total="${s.total}"
                            style="padding:8px 12px;background:#fee2e2;color:#991b1b;border:1.5px solid #f87171;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer">
                            🚫 Cancelar Ticket
                        </button>` : ''}
                        ${S.isSU ? `
                        <button type="button" class="btn-delete-sale" data-id="${esc(s.id)}" data-num="${esc(s.sale_number || s.id)}" data-total="${s.total}"
                            style="padding:8px 12px;background:#7f1d1d;color:#fff;border:1.5px solid #991b1b;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;display:flex;align-items:center;gap:4px">
                            🗑️ Borrar Definitiva
                        </button>` : ''}
                    </div>
                </article>`;
            }).join("")}
        </div>` : `
        <div class="empty-state" style="padding:34px;text-align:center">
            <p style="color:var(--text-muted);margin:0 0 12px;font-size:14px;font-weight:700">No hay ventas registradas con los filtros seleccionados.</p>
            ${(branchSales && branchSales.length) ? `<button type="button" id="btn-view-all-sales-hist" style="padding:10px 20px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,0.15)">📅 Ver todo el histórico de ventas (${branchSales.length} tickets)</button>` : ''}
        </div>`}
        `;

        document.getElementById("btn-view-all-sales-hist")?.addEventListener("click", async () => {
            S.salesFilterDate = "all";
            await loadSales();
        });

        document.getElementById("sales-branch-filter")?.addEventListener("change", async e => {
            S.salesFilterBranchId = e.target.value;
            if (e.target.value !== "all") {
                await changeBranch(e.target.value);
            }
            await loadSales();
        });

        document.getElementById("sales-date-filter")?.addEventListener("change", async e => {
            S.salesFilterDate = e.target.value;
            await loadSales();
        });

        document.getElementById("sales-shift-filter")?.addEventListener("change", async e => {
            S.salesFilterShift = e.target.value;
            await loadSales();
        });

        c.querySelectorAll(".sales-tab-btn").forEach(btn => btn.addEventListener("click", async () => {
            S.salesTab = btn.dataset.tab;
            await loadSales();
        }));

        document.getElementById("btn-ref-sales")?.addEventListener("click", async () => {
            await loadSales();
            toast("Ventas actualizadas.", "info");
        });

        c.querySelectorAll(".btn-reprint-sale").forEach(btn => btn.addEventListener("click", () => {
            const sid = String(btn.dataset.id);
            const target = consolidated.find(x => String(x.id) === sid || String(x.sale_number) === sid);
            if (!target) return toast("No se encontró la venta.", "warn");
            try { printSaleReceipt(target); } catch(e) {}
            toast(`🖨️ Reimprimiendo ticket #${target.sale_number || target.id}…`, "info", 3000);
        }));

        // Cancelación de venta para cualquier usuario con motivo obligatorio y devolución a inventario
        c.querySelectorAll(".btn-cancel-sale").forEach(btn => btn.addEventListener("click", async () => {
            const sid = String(btn.dataset.id);
            const snum = btn.dataset.num || sid;
            const stot = Number(btn.dataset.total || 0);

            const reason = await toastPrompt(`🚫 Cancelar Ticket #${snum} (${money(stot)})\nIngresa el motivo de cancelación:`, "Ej: Error de cobro, producto devuelto, cambio de forma de pago...");
            if (!reason || !reason.trim()) {
                return toast("Debes ingresar el motivo de cancelación para poder anular el ticket.", "warn", 4000);
            }

            const cleanReason = reason.trim();
            const cashierCancelling = S.profile?.full_name || S.user?.email || "Encargada";

            const cancelledReasons = Object.assign({}, lr("cancelled_reasons", {}), gr("cancelled_reasons", {}));
            cancelledReasons[sid] = cleanReason;
            cancelledReasons[snum] = cleanReason;
            gw("cancelled_reasons", cancelledReasons);
            lw("cancelled_reasons", cancelledReasons);

            const allGlobalSales = gr("all_sales", []);
            const target = allGlobalSales.find(x => String(x.id) === sid || String(x.sale_number) === snum);
            if (target) {
                target.status = "CANCELLED";
                target.cancelled_reason = cleanReason;
                target.cancelled_by = cashierCancelling;
                target.cancelled_at = now();
                gw("all_sales", allGlobalSales);
            }

            const lSales = lr("sales", []);
            const lTarget = lSales.find(x => String(x.id) === sid || String(x.sale_number) === snum);
            if (lTarget) {
                lTarget.status = "CANCELLED";
                lTarget.cancelled_reason = cleanReason;
                lTarget.cancelled_by = cashierCancelling;
                lTarget.cancelled_at = now();
                lw("sales", lSales);
            }

            // Devolver existencias al inventario local
            const saleItems = (target?.items || lTarget?.items || []);
            if (saleItems.length) {
                const inv = getBranchInventoryMap(S.branchId || S.branchName);
                saleItems.forEach(it => {
                    const pid = it.product_id || it.id;
                    const qty = Number(it.quantity || 1);
                    if (pid && inv[pid] !== undefined) {
                        inv[pid] = Math.min(STOCK_MAX, Math.max(0, (inv[pid] || 0) + qty));
                    }
                });
                saveBranchInventoryMap(S.branchId || S.branchName, inv);
            }

            if (db) {
                try {
                    await db.from("sales").update({
                        status: "CANCELLED",
                        observations: JSON.stringify({
                            ...(target?.observations || {}),
                            status: "CANCELLED",
                            cancelled_reason: cleanReason,
                            cancelled_by: cashierCancelling,
                            cancelled_at: now()
                        })
                    }).eq("id", sid);
                } catch(e) {}
            }

            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "sale_cancelled",
                        payload: { id: sid, sale_number: snum, reason: cleanReason, by: cashierCancelling }
                    });
                } catch(e) {}
            }

            _cachedConsolidatedSales = null;
            await getConsolidatedSalesForChain(true);
            await loadSales();
            toast(`✓ Ticket #${snum} cancelado exitosamente. Motivo: ${cleanReason}`, "success", 4000);
        }));

        // Borrado definitivo exclusivo para Superusuarios
        c.querySelectorAll(".btn-delete-sale").forEach(btn => btn.addEventListener("click", async () => {
            if (!S.isSU) return;
            const sid = String(btn.dataset.id);
            const snum = btn.dataset.num || sid;
            const stot = Number(btn.dataset.total || 0);

            const ok = await toastConfirm(`👑 [SUPERUSUARIO] ¿Estás seguro de ELIMINAR DEFINITIVAMENTE el Ticket #${snum} (${money(stot)})?\n\nEsta venta se borrará permanentemente de la base de datos y de todos los registros.`);
            if (!ok) return;

            const deletedSaleIds = gr("deleted_sale_ids", []);
            if (!deletedSaleIds.includes(sid)) deletedSaleIds.push(sid);
            if (!deletedSaleIds.includes(snum)) deletedSaleIds.push(snum);
            gw("deleted_sale_ids", deletedSaleIds);

            // Eliminar de memoria y localstorage
            gw("all_sales", gr("all_sales", []).filter(x => String(x.id) !== sid && String(x.sale_number) !== snum));
            lw("sales", lr("sales", []).filter(x => String(x.id) !== sid && String(x.sale_number) !== snum));

            if (db) {
                try {
                    await db.from("sales").delete().eq("id", sid);
                } catch(e) {}
            }

            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "sale_deleted",
                        payload: { id: sid, sale_number: snum }
                    });
                } catch(e) {}
            }

            _cachedConsolidatedSales = null;
            await getConsolidatedSalesForChain(true);
            await loadSales();
            toast(`🗑️ Ticket #${snum} eliminado definitivamente del sistema.`, "info", 4000);
        }));
    }


    /* ── CORTES DE CAJA (ARQUEOS Y CIERRES DE TURNO) ── */
    async function getConsolidatedCutsForChain() {
        const cutsMap = new Map();

        // 1. Cargar cortes guardados localmente para cada sucursal
        const addCut = (ct, fallbackBranch) => {
            if (!ct) return;
            let bName = ct.branch_name || fallbackBranch || "";
            let bId = ct.branch_id || "";

            if (!bName && ct.performed_by_name) {
                const pLow = String(ct.performed_by_name).toLowerCase();
                for (const [em, staffInfo] of Object.entries(STAFF)) {
                    if (pLow.includes(em.toLowerCase()) || (pLow.match(/encargado\d+/) && em.includes(pLow.match(/encargado\d+/)[0]))) {
                        bName = staffInfo.b;
                        break;
                    }
                }
            }
            if (!bName && bId) {
                const found = S.branches.find(b => String(b.id) === String(bId));
                if (found) bName = found.name;
            }
            if (!bName) bName = fallbackBranch || S.branchName;

            const cid = String(ct.id || (ct.created_at + "_" + bName));
            if (!cutsMap.has(cid)) {
                cutsMap.set(cid, {
                    ...ct,
                    id: ct.id || cid,
                    branch_name: bName,
                    branch_id: bId || (S.branches.find(b => b.name === bName)?.id || S.branchId),
                    created_at: ct.created_at || now()
                });
            }
        };

        // Cortes de todas las sucursales en localStorage
        const branchKeySuffixes = [
            "branch-1", "branch-2", "branch-3", "branch-4", "branch-5", "branch-6",
            "calzada", "rescate", "mollotes", "tagarete_1", "tagarete_2", "cnop",
            "tagarete 1", "tagarete 2", "la fuente calzada"
        ];
        branchKeySuffixes.forEach(bSuffix => {
            try {
                const raw = localStorage.getItem("lf_" + bSuffix + "_cuts");
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) parsed.forEach(c => addCut(c, bSuffix));
                }
            } catch(e) {}
        });

        // Cortes globales y locales actuales
        const gCuts = gr("all_cuts", []);
        if (Array.isArray(gCuts)) gCuts.forEach(c => addCut(c, ""));

        const lCuts = lr("cuts", []);
        if (Array.isArray(lCuts)) lCuts.forEach(c => addCut(c, S.branchName));

        // Cortes remotos desde Supabase
        if (db) {
            try {
                const {data} = await safeQuery(db.from("cash_cuts").select("*").order("created_at", {ascending:false}), null, 5000);
                if (data && data.length) {
                    data.forEach(ct => {
                        let obs = {};
                        try { obs = typeof ct.observations === "string" ? JSON.parse(ct.observations) : (ct.observations || {}); } catch(e) {}
                        let bName = obs.branch_name || ct.branch_name || "";
                        if (!bName && ct.branch_id) {
                            const found = S.branches.find(b => String(b.id) === String(ct.branch_id));
                            if (found) bName = found.name;
                        }
                        addCut({
                            ...ct,
                            branch_name: bName,
                            shift_name: obs.shift_name || ct.shift_name,
                            cashier_name: obs.cashier_name || obs.performed_by_name || ct.cashier_name,
                            performed_by_name: obs.performed_by_name || obs.cashier_name,
                            opening_amount: obs.opening_amount != null ? obs.opening_amount : ct.opening_amount,
                            cash_sales: obs.cash_sales != null ? obs.cash_sales : ct.cash_sales,
                            card_sales: obs.card_sales != null ? obs.card_sales : ct.card_sales,
                            net_sales_without_fund: obs.net_sales_without_fund != null ? obs.net_sales_without_fund : ct.net_sales_without_fund
                        }, bName);
                    });
                }
            } catch(e) {}
        }

        const deletedCutIds = new Set(gr("deleted_cut_ids", []));
        const consolidatedCuts = Array.from(cutsMap.values())
            .filter(c => !deletedCutIds.has(String(c.id)))
            .sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

        gw("all_cuts", consolidatedCuts);
        return consolidatedCuts;
    }

    async function loadCuts(silent = false) {
        const c = $("#cuts-container");
        if (!c || !S.branchId) return;
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando cortes de caja de ${esc(S.branchName)}…</p></div>`;
        }

        const allConsolidatedCuts = await getConsolidatedCutsForChain();
        const activeFilter = S.isSU ? (S.cutsFilterBranchId || S.branchId) : S.branchId;
        const deletedCutIds = new Set(gr("deleted_cut_ids", []));

        // Filtrar según sucursal activa o seleccionada
        const cutsList = allConsolidatedCuts
            .filter(ct => !deletedCutIds.has(String(ct.id)))
            .filter(ct => {
                if (!S.isSU) return matchesBranch(ct, { id: S.branchId, name: S.branchName });
                if (activeFilter === "all") return true;
                return matchesBranch(ct, { id: activeFilter, name: S.branches.find(b=>String(b.id)===String(activeFilter))?.name || S.branchName });
            })
            .sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

        // Calcular ventas activas del turno actual para el corte
        const consolidatedSales = await getConsolidatedSalesForChain();
        const currentBranchSales = consolidatedSales.filter(s => matchesBranch(s, { id: S.branchId, name: S.branchName }));
        const todayStr = toDateKey();
        const todayActiveSales = currentBranchSales.filter(s => toDateKey(s.created_at) === todayStr && String(s.status||"").toUpperCase() !== "CANCELLED");
        
        const currentCategory = (S.shift.toLowerCase().includes("tarde") || S.shift.toLowerCase().includes("vesp")) ? "vespertino" : "matutino";
        const currentTurnSales = todayActiveSales.filter(s => getShiftCategory(s) === currentCategory);

        const currentCashSales = currentTurnSales.filter(s => (s.payment_method || "cash") === "cash").reduce((a,s)=>a+Number(s.total||0), 0);
        const currentCardSales = currentTurnSales.filter(s => s.payment_method === "card").reduce((a,s)=>a+Number(s.total||0), 0);
        const currentTotalSold = currentCashSales + currentCardSales;

        // Obtener el fondo inicial exacto validado del turno activo
        const activeLocalShift = lr("current_shift", null);
        const initialFund = Number(activeLocalShift?.opening_amount != null ? activeLocalShift.opening_amount : (S.currentShift?.opening_amount != null ? S.currentShift.opening_amount : 500));
        const expectedCashInDrawer = initialFund + currentCashSales;

        const currentBranchDisplayName = S.branches.find(b => String(b.id) === String(activeFilter))?.name || S.branchName;

        const branchSelectHtml = S.isSU ? `
            <div style="display:flex;align-items:center;gap:8px">
                <label style="font-size:12px;font-weight:900;color:#fcebd2">📍 FILTRAR CORTES:</label>
                <select id="cuts-branch-filter" style="padding:7px 12px;border-radius:10px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;outline:none;color:#1a0205">
                    <option value="all"${activeFilter==='all'?' selected':''}>🌐 Todas las Sucursales (${allConsolidatedCuts.length} cortes)</option>
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(activeFilter)?' selected':''}>📍 ${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:18px;color:#ffffff;font-weight:900">Cortes de Caja Oficiales — ${esc(currentBranchDisplayName)} (${esc(S.shift)})</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Arqueos de efectivo, fondo inicial validado y balance de turnos en tiempo real</div>
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
                <h3 style="color:var(--wine-900);margin:0;font-weight:900">✂️ Realizar Corte de Turno Actual (${esc(S.shift)}) — ${esc(S.branchName)}</h3>
                <span style="font-size:11px;background:#dcfce7;color:#15803d;padding:4px 10px;border-radius:12px;font-weight:800;border:1px solid #86efac">
                    🟢 Turno Activo: ${esc(S.shift)} — Fondo Inicial Validado: ${money(initialFund)}
                </span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:16px">
                <div style="background:#fff;padding:12px 14px;border-radius:12px;border:1.5px solid var(--gold-400)">
                    <small style="font-size:10px;font-weight:900;color:var(--text-muted);display:block">FONDO INICIAL EN CAJA</small>
                    <strong style="font-size:18px;color:var(--wine-900)">${money(initialFund)}</strong>
                </div>
                <div style="background:#f0fdf4;padding:12px 14px;border-radius:12px;border:1.5px solid #86efac">
                    <small style="font-size:10px;font-weight:900;color:#166534;display:block">💵 COBRADO EFECTIVO</small>
                    <strong style="font-size:18px;color:#15803d">${money(currentCashSales)}</strong>
                </div>
                <div style="background:#eff6ff;padding:12px 14px;border-radius:12px;border:1.5px solid #93c5fd">
                    <small style="font-size:10px;font-weight:900;color:#1e40af;display:block">💳 COBRADO TARJETA</small>
                    <strong style="font-size:18px;color:#1d4ed8">${money(currentCardSales)}</strong>
                </div>
                <div style="background:#fdf4ff;padding:12px 14px;border-radius:12px;border:1.5px solid #f0abfc">
                    <small style="font-size:10px;font-weight:900;color:#86198f;display:block">EFECTIVO ESPERADO</small>
                    <strong style="font-size:18px;color:#86198f">${money(expectedCashInDrawer)}</strong>
                </div>
            </div>

            <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
                <div style="flex:1;min-width:220px">
                    <label style="font-size:11px;font-weight:900;color:var(--wine-800);display:block;margin-bottom:4px">
                        EFECTIVO CONTADO FÍSICO EN CAJA ($) *
                    </label>
                    <input id="cut-counted-cash" type="number" step="0.5" min="0" placeholder="Ej: 1500.00"
                        style="width:100%;padding:11px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:14px;font-weight:900;box-sizing:border-box">
                </div>
                <button type="button" id="btn-save-cut"
                    style="padding:12px 28px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 3px 10px rgba(112,23,33,0.3)">
                    ✓ Confirmar Corte & Imprimir Ticket
                </button>
            </div>
        </div>

        <!-- HISTORIAL DE CORTES DE CAJA DE LA SUCURSAL -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
            <h3 style="color:#ffffff;margin:0;font-weight:900">📜 Historial de Cortes de Caja — ${esc(currentBranchDisplayName)} (${cutsList.length} registrados)</h3>
        </div>
        ${cutsList.length ? `
        <div style="display:flex;flex-direction:column;gap:14px">
            ${cutsList.map(ct => {
                const diff = Number(ct.difference || 0);
                const isOk = diff >= 0;
                const netAmount = Number(ct.net_sales_without_fund != null ? ct.net_sales_without_fund : (ct.counted_cash - ct.opening_amount));
                const cashierName = ct.performed_by_name || ct.cashier_name || "Encargada";
                
                return `<article class="sale-card" style="background:#ffffff;border:1.5px solid rgba(188,132,10,.35);border-radius:16px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;border-bottom:1px solid #f1e5d1;padding-bottom:12px;margin-bottom:12px">
                        <div>
                            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                                <strong style="font-size:16px;color:var(--wine-900)">✂️ Corte — ${esc(ct.branch_name)} (${esc(ct.shift_name)})</strong>
                                <span style="font-size:11px;padding:3px 10px;border-radius:12px;font-weight:900;${isOk?'background:#dcfce7;color:#15803d;border:1px solid #86efac':'background:#fee2e2;color:#991b1b;border:1px solid #fca5a5'}">
                                    ${isOk ? '✓ Cuadrado' : '⚠ Diferencia: ' + money(diff)}
                                </span>
                            </div>
                            <div style="font-size:12px;color:var(--text-muted);font-weight:600;margin-top:4px">
                                📅 Fecha: <strong>${fdt(ct.created_at)}</strong> • 👤 Encargada: <strong>${esc(cashierName)}</strong>
                            </div>
                        </div>

                        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                            <button type="button" class="btn-reprint-cut" data-id="${esc(ct.id)}"
                                style="padding:8px 16px;background:linear-gradient(135deg,#701721,#3b0a10);color:#ffffff;border:1.5px solid var(--gold-400);border-radius:10px;font-size:12px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15)">
                                <span style="color:#fcd34d">🖨️</span><span style="color:#ffffff">Reimprimir Ticket</span>
                            </button>
                            ${S.isSU ? `
                            <button type="button" class="btn-delete-cut" data-id="${esc(ct.id)}" data-shift="${esc(ct.shift_name)}" data-branch="${esc(ct.branch_name)}"
                                style="padding:8px 12px;background:#fee2e2;color:#991b1b;border:1.5px solid #f87171;border-radius:10px;font-size:11px;font-weight:900;cursor:pointer;display:flex;align-items:center;gap:4px">
                                🗑️ Borrar
                            </button>` : ''}
                        </div>
                    </div>

                    <!-- DESGLOSE DIGITAL PLASMADO -->
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;background:#faf7f2;padding:12px;border-radius:12px;border:1px solid #f1e5d1">
                        <div style="background:#fff;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb">
                            <small style="font-size:10px;color:var(--text-muted);font-weight:800;display:block">FONDO INICIAL</small>
                            <strong style="font-size:14px;color:var(--wine-900)">${money(ct.opening_amount)}</strong>
                        </div>
                        <div style="background:#fff;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb">
                            <small style="font-size:10px;color:#166534;font-weight:800;display:block">💵 EFECTIVO</small>
                            <strong style="font-size:14px;color:#15803d">${money(ct.cash_sales)}</strong>
                        </div>
                        <div style="background:#fff;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb">
                            <small style="font-size:10px;color:#1e40af;font-weight:800;display:block">💳 TARJETA</small>
                            <strong style="font-size:14px;color:#1d4ed8">${money(ct.card_sales)}</strong>
                        </div>
                        <div style="background:#fff;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb">
                            <small style="font-size:10px;color:var(--wine-800);font-weight:800;display:block">TOTAL VENDIDO</small>
                            <strong style="font-size:14px;color:var(--wine-900)">${money(ct.total_sales)}</strong>
                        </div>
                        <div style="background:#fff;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb">
                            <small style="font-size:10px;color:#86198f;font-weight:800;display:block">ESPERADO EN CAJA</small>
                            <strong style="font-size:14px;color:#86198f">${money(ct.expected_cash || (ct.opening_amount + ct.cash_sales))}</strong>
                        </div>
                        <div style="background:#fff;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb">
                            <small style="font-size:10px;color:#0f172a;font-weight:800;display:block">EFECTIVO CONTADO</small>
                            <strong style="font-size:14px;color:#0f172a">${money(ct.counted_cash)}</strong>
                        </div>
                        <div style="background:#fff;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb">
                            <small style="font-size:10px;color:${isOk?'#166534':'#991b1b'};font-weight:800;display:block">DIFERENCIA</small>
                            <strong style="font-size:14px;color:${isOk?'#15803d':'#dc2626'}">${diff>=0?'+':''}${money(diff)}</strong>
                        </div>
                        <div style="background:linear-gradient(135deg,#701721,#3b0a10);padding:8px 12px;border-radius:8px;color:#fff;display:flex;flex-direction:column;justify-content:center">
                            <small style="font-size:10px;color:var(--gold-300);font-weight:800;display:block">CORTE NETO EFECTIVO</small>
                            <strong style="font-size:15px;color:#fff;font-weight:900">${money(netAmount)}</strong>
                        </div>
                    </div>
                </article>`;
            }).join("")}
        </div>` : `
        <div class="empty-state" style="padding:34px;text-align:center">
            <p style="color:var(--text-muted)">No hay cortes de caja registrados aún en ${esc(currentBranchDisplayName)}.</p>
        </div>`}
        `;

        document.getElementById("cuts-branch-filter")?.addEventListener("change", async e => {
            S.cutsFilterBranchId = e.target.value;
            if (e.target.value !== "all") {
                await changeBranch(e.target.value);
            } else {
                await loadCuts();
            }
        });

        document.getElementById("btn-ref-cuts")?.addEventListener("click", async () => {
            await loadCuts();
            toast("Cortes actualizados.", "info");
        });

        document.getElementById("btn-save-cut")?.addEventListener("click", async () => {
            const inputEl = document.getElementById("cut-counted-cash");
            if (!inputEl || inputEl.value.trim() === "") {
                return toast("Por favor ingresa el monto de efectivo contado en caja.", "warn", 4000);
            }

            const countedVal = Number(inputEl.value);
            if (isNaN(countedVal) || countedVal < 0) {
                return toast("Ingresa un monto de efectivo válido mayor o igual a $0.00.", "warn", 4000);
            }

            const diff = countedVal - expectedCashInDrawer;
            const netWithoutFund = countedVal - initialFund;

            const ok = await toastConfirm(`Confirmar Corte de Turno (${S.shift}) — ${S.branchName}:\n• Fondo Inicial: ${money(initialFund)}\n• Cobrado Efectivo: ${money(currentCashSales)}\n• Cobrado Tarjeta: ${money(currentCardSales)}\n• Total Vendido: ${money(currentTotalSold)}\n• Efectivo Contado: ${money(countedVal)}\n• Diferencia: ${diff>=0?'+':''}${money(diff)}\n• Corte Neto Efectivo: ${money(netWithoutFund)}`);
            if (!ok) return;

            const uname = S.profile?.full_name || S.user?.email || "Encargada";
            const cutRecord = {
                id: "cut_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                branch_id: S.branchId,
                branch_name: S.branchName,
                shift_name: S.shift,
                cashier_name: uname,
                performed_by_name: uname,
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

            // 1. Guardado local y global inmediato
            const lCuts = lr("cuts", []);
            lCuts.unshift(cutRecord);
            lw("cuts", lCuts);

            const gCuts = gr("all_cuts", []);
            gCuts.unshift(cutRecord);
            gw("all_cuts", gCuts);

            lw("last_printed_cut", cutRecord);
            gw("last_printed_cut", cutRecord);

            // 2. Difusión en tiempo real
            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "cut_created",
                        payload: { cut: cutRecord }
                    });
                } catch(e) {}
            }

            // 3. Sincronización asíncrona con Supabase en segundo plano
            if (db) {
                (async () => {
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
                            observations: JSON.stringify({
                                branch_name: S.branchName,
                                shift_name: S.shift,
                                cashier_name: uname,
                                performed_by_name: uname,
                                opening_amount: initialFund,
                                cash_sales: currentCashSales,
                                card_sales: currentCardSales,
                                net_sales_without_fund: netWithoutFund
                            })
                        });
                    } catch(e) {
                        console.warn("Supabase cut sync error:", e);
                    }
                })();
            }

            toast("✓ Corte guardado exitosamente. Imprimiendo ticket…", "success", 4000);

            // 4. Impresión física inmediata y automática
            try {
                await printCutReceipt(cutRecord);
            } catch(e) {
                console.warn("Error imprimiendo corte:", e);
            }

            // 5. Actualizar historial de cortes
            await loadCuts(true);
        });

        c.querySelectorAll(".btn-reprint-cut").forEach(btn => btn.addEventListener("click", () => {
            const cid = String(btn.dataset.id);
            const target = cutsList.find(x => String(x.id) === cid);
            if (!target) return toast("No se encontró el corte.", "warn");
            try { printCutReceipt(target); } catch(e) {}
            toast("🖨️ Reimprimiendo corte de caja…", "info", 3000);
        }));

        c.querySelectorAll(".btn-delete-cut").forEach(btn => btn.addEventListener("click", async () => {
            if (!S.isSU) return;
            const cid = String(btn.dataset.id);
            const sName = btn.dataset.shift || "Turno";
            const bName = btn.dataset.branch || "Sucursal";

            const ok = await toastConfirm(`👑 [SUPERUSUARIO] ¿Estás seguro de eliminar este corte de caja de ${bName} (${sName})?\nEsta acción no se puede deshacer.`);
            if (!ok) return;

            const deleted = gr("deleted_cut_ids", []);
            if (!deleted.includes(cid)) deleted.push(cid);
            gw("deleted_cut_ids", deleted);

            gw("all_cuts", gr("all_cuts", []).filter(x => String(x.id) !== cid));
            lw("cuts", lr("cuts", []).filter(x => String(x.id) !== cid));

            if (db) {
                try { await db.from("cash_cuts").delete().eq("id", cid); } catch(e) {}
            }

            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "cut_deleted",
                        payload: { id: cid }
                    });
                } catch(e) {}
            }

            await loadCuts();
            toast("🗑️ Corte eliminado del sistema.", "info", 3000);
        }));
    }
    /* ── GESTIÓN DE TURNOS & APERTURA ── */
    async function getConsolidatedShiftsForChain() {
        const shiftsMap = new Map();

        // 1. Escaneo de todas las aperturas y turnos en cualquier llave de localStorage
        try {
            if (typeof localStorage !== "undefined") {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && (key.startsWith("lf_") && (key.includes("shift") || key.includes("cuts")))) {
                        try {
                            const raw = localStorage.getItem(key);
                            if (!raw || !raw.startsWith("[")) continue;
                            const parsed = JSON.parse(raw);
                            if (Array.isArray(parsed)) {
                                parsed.forEach(sh => {
                                    if (sh && (sh.opening_amount != null || sh.opened_at || sh.shift_name)) {
                                        const sid = String(sh.id || (sh.opened_at || sh.created_at) + "_" + (sh.branch_name || ""));
                                        if (!shiftsMap.has(sid)) {
                                            shiftsMap.set(sid, {
                                                id: sh.id || sid,
                                                branch_id: sh.branch_id,
                                                branch_name: sh.branch_name || S.branchName,
                                                shift_name: sh.shift_name || "Mañana",
                                                cashier_name: sh.cashier_name || sh.performed_by_name || "Encargada",
                                                opening_amount: Number(sh.opening_amount || 0),
                                                opened_at: sh.opened_at || sh.created_at || now()
                                            });
                                        }
                                    }
                                });
                            }
                        } catch(e) {}
                    }
                }
            }
        } catch(e) {}

        // 2. Extraer aperturas de turnos registradas en los cortes de caja
        const allCuts = gr("all_cuts", []).concat(lr("cuts", []));
        allCuts.forEach(ct => {
            if (ct && ct.opening_amount !== undefined) {
                const cutDate = ct.created_at || now();
                const cutKey = "shift_cut_" + (ct.id || (cutDate + "_" + (ct.branch_name || "")));
                if (!shiftsMap.has(cutKey)) {
                    shiftsMap.set(cutKey, {
                        id: cutKey,
                        branch_id: ct.branch_id,
                        branch_name: ct.branch_name || S.branchName,
                        shift_name: ct.shift_name || "Turno",
                        cashier_name: ct.performed_by_name || "Encargada",
                        opening_amount: Number(ct.opening_amount || 0),
                        opened_at: cutDate
                    });
                }
            }
        });

        // 3. Consultar Supabase si existen turnos o cortes registrados
        if (db) {
            try {
                const {data} = await safeQuery(db.from("cash_cuts").select("*").order("created_at", {ascending:false}), null, 4000);
                if (data && data.length) {
                    data.forEach(ct => {
                        let obs = {};
                        try { obs = typeof ct.observations === "string" ? JSON.parse(ct.observations) : (ct.observations || {}); } catch(e) {}
                        const opening = Number(obs.opening_amount != null ? obs.opening_amount : (ct.opening_amount || 0));
                        let bName = obs.branch_name || ct.branch_name || "";
                        if (!bName && ct.branch_id) {
                            const foundB = S.branches.find(b=>String(b.id)===String(ct.branch_id));
                            if (foundB) bName = foundB.name;
                        }
                        if (!bName) bName = "Tagarete 2";
                        const cashier = obs.performed_by_name || ct.performed_by || "Encargada";
                        const cutKey = "shift_db_" + ct.id;
                        if (!shiftsMap.has(cutKey)) {
                            shiftsMap.set(cutKey, {
                                id: cutKey,
                                branch_id: ct.branch_id,
                                branch_name: bName,
                                shift_name: obs.shift_name || "Turno",
                                cashier_name: cashier,
                                opening_amount: opening,
                                opened_at: ct.created_at || now()
                            });
                        }
                    });
                }
            } catch(e) {}
        }

        const consolidatedShifts = Array.from(shiftsMap.values()).sort((a,b) => new Date(b.opened_at || 0) - new Date(a.opened_at || 0));
        gw("all_shifts", consolidatedShifts);
        return consolidatedShifts;
    }

    async function loadShiftView() {
        const c = $("#shift-container");
        if (!c) return;

        const consolidatedShifts = await getConsolidatedShiftsForChain();
        const activeBranchFilter = S.isSU ? (S.shiftFilterBranchId || "all") : S.branchId;

        const shiftsHistory = (S.isSU && activeBranchFilter === "all")
            ? consolidatedShifts
            : consolidatedShifts.filter(sh => matchesBranch(sh, { id: activeBranchFilter, name: S.branches.find(b=>String(b.id)===String(activeBranchFilter))?.name || S.branchName }));

        const uname = S.profile?.full_name || S.user?.email || "Encargada";
        const currentSavedShift = lr("current_shift", null);
        const currentShiftAmount = currentSavedShift?.opening_amount != null ? currentSavedShift.opening_amount : (S.currentShift?.opening_amount != null ? S.currentShift.opening_amount : 500);

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Cambio de Turno & Apertura — ${esc(S.branchName)}</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Apertura de turno, asignación de fondo inicial de caja y traspaso de turno</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)">
                    <span>🖨️</span><span>Impresora</span>
                </button>
            </div>
        </div>

        ${S.isSU ? `
        <div style="background:#fffef9;border:1.5px solid var(--gold-400);border-radius:14px;padding:12px 16px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
            <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:20px">🏢</span>
                <strong style="font-size:13px;color:var(--wine-950)">Filtrar Aperturas por Sucursal:</strong>
            </div>
            <select id="shift-branch-filter" style="padding:8px 12px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:12px;font-weight:800;background:#fff;outline:none">
                <option value="all"${activeBranchFilter==='all'?' selected':''}>🌐 Todas las Sucursales (${consolidatedShifts.length} aperturas)</option>
                ${S.branches.map(b => `<option value="${esc(b.id)}"${String(activeBranchFilter)===String(b.id)?' selected':''}>${esc(b.name)}</option>`).join("")}
            </select>
        </div>` : ''}

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
                    <input id="open-shift-amount" type="number" step="10" min="0" placeholder="Ej: 500.00" value="${currentShiftAmount}"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;font-weight:900;box-sizing:border-box">
                </div>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
                <button type="button" id="btn-open-shift"
                    style="padding:12px 28px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px">
                    <span>✓</span><span>Iniciar Turno con este Fondo</span>
                </button>
            </div>
        </div>

        <h3 style="color:#ffffff;margin:0 0 14px;font-weight:900">📜 Historial de Aperturas de Turno</h3>
        ${shiftsHistory.length ? `
        <div style="display:flex;flex-direction:column;gap:12px">
            ${shiftsHistory.map(sh => `
            <article class="sale-card" style="background:#fff;border:1.5px solid rgba(188,132,10,.35);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                <div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                        <strong style="font-size:15px;color:var(--wine-900)">${(sh.shift_name||"").toLowerCase().includes('tarde') || (sh.shift_name||"").toLowerCase().includes('vesp') ? '🌇 Turno Vespertino' : '🌅 Turno Matutino'} — 📍 ${esc(sh.branch_name || S.branchName)}</strong>
                        <span style="font-size:10px;padding:2px 8px;border-radius:10px;font-weight:800;background:#dcfce7;color:#15803d">
                            ✓ Apertura
                        </span>
                    </div>
                    <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">
                        Fecha: <strong>${fdt(sh.opened_at || sh.created_at)}</strong> • Encargada: <strong>${esc(sh.cashier_name)}</strong>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:14px">
                    <div style="text-align:right">
                        <small style="font-size:10px;color:var(--text-muted);display:block">FONDO INICIAL EN CAJA</small>
                        <strong style="font-size:20px;color:var(--wine-900);font-weight:900">${money(sh.opening_amount)}</strong>
                    </div>
                    <button type="button" class="btn-reprint-shift" data-shift='${JSON.stringify(sh).replace(/'/g, "&apos;")}'
                        style="padding:8px 12px;background:#f1f5f9;color:var(--wine-900);border:1.5px solid #cbd5e1;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:4px">
                        🖨️ Imprimir
                    </button>
                </div>
            </article>`).join("")}
        </div>` : `
        <div class="empty-state" style="padding:34px;text-align:center">
            <p style="color:var(--text-muted)">No hay aperturas de turno registradas con los filtros seleccionados.</p>
        </div>`}
        `;

        document.getElementById("shift-branch-filter")?.addEventListener("change", async e => {
            S.shiftFilterBranchId = e.target.value;
            await loadShiftView();
        });

        c.querySelectorAll(".btn-reprint-shift").forEach(btn => btn.addEventListener("click", () => {
            try {
                const sh = JSON.parse(btn.dataset.shift);
                toast("🖨️ Imprimiendo comprobante de apertura…", "info", 2500);
                printShiftOpeningReceipt(sh);
            } catch(e) {
                console.warn(e);
            }
        }));

        document.getElementById("btn-open-shift")?.addEventListener("click", async () => {
            const shiftName = document.getElementById("open-shift-name")?.value || "Mañana";
            const amountInput = document.getElementById("open-shift-amount")?.value;
            const amount = Number(amountInput);

            if (amountInput === "" || isNaN(amount) || amount < 0) {
                return toast("Por favor ingresa un fondo inicial válido mayor o igual a $0.00.", "warn", 4000);
            }

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

            const allGlobalShifts = gr("all_shifts", []);
            allGlobalShifts.unshift(shiftObj);
            gw("all_shifts", allGlobalShifts);

            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "shift_opened",
                        payload: { shift: shiftObj }
                    });
                } catch(e) {}
            }

            updateUI();
            toast(`✓ Turno ${shiftName} iniciado exitosamente con fondo de ${money(amount)}.`, "success", 4000);
            
            // Auto imprimir comprobante de apertura
            try {
                printShiftOpeningReceipt(shiftObj);
            } catch(e) {}

            await loadShiftView();
        });
    }

    /* ── CAJA ACTUAL & FONDO PERSISTENTE ── */
    async function loadCurrentShift() {
        // 1. Cargar el fondo activo local para la sucursal actual
        const localShift = lr("current_shift", null);
        if (localShift && localShift.opening_amount != null) {
            S.currentShift = localShift;
            S.shift = localShift.shift_name || S.shift;
        }

        // 2. Si no hay turno local previo, verificar si hay un turno activo registrado en global/localStorage
        if (!S.currentShift) {
            const allShifts = gr("all_shifts", []);
            const branchShift = allShifts.find(sh => matchesBranch(sh, { id: S.branchId, name: S.branchName }));
            if (branchShift) {
                S.currentShift = branchShift;
                S.shift = branchShift.shift_name || S.shift;
            }
        }

        // 3. Fallback de turno por hora del día si no está definido
        if (!S.currentShift) {
            const hour = new Date().getHours();
            const autoShiftName = hour >= 15 ? "Tarde" : "Mañana";
            S.shift = S.shift || autoShiftName;
            S.currentShift = {
                branch_id: S.branchId,
                branch_name: S.branchName,
                shift_name: S.shift,
                opening_amount: 500,
                opened_at: now(),
                is_active: true
            };
            lw("current_shift", S.currentShift);
        }

        setT("#cash-status-text,#cashStatus,[data-cash-status]", "CAJA ABIERTA (" + S.shift + ")");
        const dot = $("#cash-dot,.cash-dot");
        if (dot) dot.style.background = "#10b981";
        return S.currentShift;
    }

    /* ── DAÑOS & MERMAS ── */
    async function loadDamageReports(silent = false) {
        const c = $("#damage-reports-container");
        if (!c) return;
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando reportes de merma…</p></div>`;
        }

        const allReports = gr("all_damage_reports", []);
        const branchReports = S.isSU ? allReports : allReports.filter(r => matchesBranch(r, { id: S.branchId, name: S.branchName }));

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Reportes de Merma & Producto Dañado — ${esc(S.branchName)}</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Registro y ajuste automático de inventario por producto derretido o defectuoso</div>
            </div>
            <button type="button" id="btn-ref-damages"
                style="padding:8px 16px;background:linear-gradient(135deg,#fff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:var(--wine-950);box-shadow:0 2px 8px rgba(0,0,0,0.2)">
                🔄 Actualizar Reportes</button>
        </div>

        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card)">
            <h3 style="color:var(--wine-900);margin:0 0 14px;font-weight:900">⚠️ Registrar Nueva Merma o Daño</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:14px">
                <div>
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">PRODUCTO AFECTADO *</label>
                    <select id="damage-product-select" style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;font-weight:800;background:#fff;box-sizing:border-box">
                        <option value="">-- Selecciona producto --</option>
                        ${S.products.map(p => `<option value="${esc(p.id)}">${esc(p.name)} (${money(p.price)})</option>`).join("")}
                    </select>
                </div>
                <div>
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">CANTIDAD DAÑADA *</label>
                    <input id="damage-quantity" type="number" min="1" max="100" value="1"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;font-weight:900;box-sizing:border-box">
                </div>
                <div style="grid-column:1/-1">
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">MOTIVO DEL DAÑO / MERMA *</label>
                    <input id="damage-reason" type="text" placeholder="Ej: Se cayó de la vitrina, descongelamiento, empaque roto..."
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;font-weight:700;box-sizing:border-box">
                </div>
            </div>
            <button type="button" id="btn-submit-damage"
                style="padding:12px 28px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer">
                ✓ Registrar Merma y Descontar Inventario
            </button>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
            <h3 style="color:#ffffff;margin:0;font-weight:900">📜 Historial de Mermas (${branchReports.length} registros)</h3>
        </div>
        ${branchReports.length ? `
        <div style="display:flex;flex-direction:column;gap:12px">
            ${branchReports.map(rep => `
            <article class="sale-card" style="background:#fff;border:1.5px solid rgba(188,132,10,.35);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                <div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                        <strong style="font-size:15px;color:var(--wine-900)">⚠️ ${rep.quantity}x ${esc(rep.product_name)} — 📍 ${esc(rep.branch_name || S.branchName)}</strong>
                        <span style="font-size:10px;padding:2px 8px;border-radius:10px;font-weight:800;background:#fee2e2;color:#991b1b">
                            Merma
                        </span>
                    </div>
                    <div style="font-size:11.5px;color:var(--text-muted)">
                        Fecha: <strong>${fdt(rep.created_at)}</strong> • Encargada: <strong>${esc(rep.reported_by)}</strong>
                    </div>
                    <div style="font-size:11.5px;color:#4b5563;margin-top:4px">
                        Motivo: <em>${esc(rep.reason)}</em>
                    </div>
                </div>
            </article>`).join("")}
        </div>` : `
        <div class="empty-state" style="padding:34px;text-align:center">
            <p style="color:var(--text-muted)">No hay mermas o daños registrados.</p>
        </div>`}
        `;

        document.getElementById("btn-ref-damages")?.addEventListener("click", async () => {
            await loadDamageReports();
            toast("Reportes actualizados.", "info");
        });

        document.getElementById("btn-submit-damage")?.addEventListener("click", async () => {
            const pid = document.getElementById("damage-product-select")?.value;
            const qty = Number(document.getElementById("damage-quantity")?.value || 1);
            const reason = document.getElementById("damage-reason")?.value?.trim();

            if (!pid) return toast("Selecciona el producto afectado.", "warn");
            if (!qty || qty < 1) return toast("Ingresa una cantidad válida.", "warn");
            if (!reason) return toast("Ingresa el motivo del daño o merma.", "warn");

            const prod = S.products.find(p => String(p.id) === String(pid));
            const prodName = prod ? prod.name : "Producto";

            const ok = await toastConfirm(`¿Confirmar registro de merma de ${qty}x ${prodName}?\nSe descontará del inventario de ${S.branchName}.`);
            if (!ok) return;

            const repObj = {
                id: "damage_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                branch_id: S.branchId,
                branch_name: S.branchName,
                product_id: pid,
                product_name: prodName,
                quantity: qty,
                reason: reason,
                reported_by: S.profile?.full_name || S.user?.email || "Encargada",
                created_at: now(),
                status: "pending"
            };

            const allReps = gr("all_damage_reports", []);
            allReps.unshift(repObj);
            gw("all_damage_reports", allReps);

            // Descontar inventario local
            const inv = getBranchInventoryMap(S.branchId || S.branchName);
            inv[pid] = Math.max(0, (inv[pid] || 0) - qty);
            saveBranchInventoryMap(S.branchId || S.branchName, inv);

            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "damage_reported",
                        payload: { report: repObj }
                    });
                } catch(e) {}
            }

            toast(`✓ Merma registrada: ${qty}x ${prodName} descontados del inventario.`, "success", 4000);
            await loadDamageReports();
        });
    }

/* ── ACCESO PRIVADO DIRECTIVO (MONITOR EN VIVO & CIERRE DE DÍA) ── */
    async function loadPrivateAccess(silent = false) {
        const c = $("#private-access-container");
        if (!c) return;
        if (!S.isSU) {
            if (window.changeView) window.changeView("pos");
            return;
        }

        const consolidatedSales = await getConsolidatedSalesForChain();
        const todayStr = toDateKey();
        const closedDates = gr("closed_business_days", []);
        const isTodayClosed = closedDates.includes(todayStr);

        const datesMap = new Map();
        consolidatedSales.forEach(s => {
            const d = toDateKey(s.created_at);
            if (d) {
                if (!datesMap.has(d)) datesMap.set(d, []);
                datesMap.get(d).push(s);
            }
        });
        if (!datesMap.has(todayStr)) datesMap.set(todayStr, []);

        if (!S.privateAccessDate) S.privateAccessDate = todayStr;
        const selectedDate = S.privateAccessDate || todayStr;
        const isAllDates = (selectedDate === "all");

        // Ventas activas para la fecha seleccionada (o todas)
        const todaySales = isAllDates
            ? consolidatedSales.filter(s => String(s.status||"").toUpperCase() !== "CANCELLED")
            : (datesMap.get(selectedDate) || []).filter(s => String(s.status||"").toUpperCase() !== "CANCELLED");

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

        // Últimas 20 ventas en vivo de la red completa
        const liveRecentSales = (todaySales.length ? todaySales : consolidatedSales.filter(s => String(s.status||"").toUpperCase() !== "CANCELLED")).slice(0, 20);

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;background:var(--wine-50);border:1.5px solid var(--wine-200);padding:14px 20px;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
            <div style="display:flex;align-items:center;gap:12px">
                <span style="font-size:24px">📅</span>
                <div>
                    <strong style="color:var(--wine-900);font-size:15px;display:block">AUDITORÍA Y VENTAS EN TIEMPO REAL DIRECTIVAS</strong>
                    <small style="color:var(--wine-700)">Mostrando sucursales para: <strong style="color:var(--wine-900)">${selectedDate === todayStr ? '🟢 HOY (' + selectedDate + ')' : (selectedDate === 'all' ? '🌐 TODAS LAS FECHAS' : '📆 ' + selectedDate)}</strong></small>
                
            <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
                <button type="button" id="btn-clean-su-cache" style="padding:6px 12px;background:#fee2e2;color:#991b1b;border:1.5px solid #f87171;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">
                    🧹 Limpiar Caché de Superusuario
                </button>
            </div></div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
                <label style="font-size:12px;font-weight:700;color:var(--wine-800)">Filtrar Fecha:</label>
                <select id="sel-private-access-date" style="padding:8px 14px;border:1.5px solid var(--wine-400);border-radius:8px;font-weight:700;color:var(--wine-900);background:#fff;cursor:pointer">
                    <option value="${todayStr}" ${selectedDate === todayStr ? 'selected' : ''}>🟢 Hoy (${todayStr})</option>
                    ${Array.from(datesMap.keys()).filter(d => d !== todayStr).sort().reverse().map(d => `<option value="${d}" ${selectedDate === d ? 'selected' : ''}>📆 ${d}</option>`).join('')}
                    <option value="all" ${selectedDate === 'all' ? 'selected' : ''}>🌐 Todas las fechas</option>
                </select>
            
            <div style="display:flex;align-items:center;gap:8px;margin-top:10px;width:100%;justify-content:flex-end">
                <button type="button" id="btn-close-business-day" style="padding:10px 18px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,0.25);display:flex;align-items:center;gap:6px">
                    <span>🔒</span><span>Realizar Corte General & Cerrar Día Oficial</span>
                </button>
            </div></div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px">
            <div class="dashboard-card" style="background:linear-gradient(135deg,#230408,#5c121b);color:#fff;border-color:var(--gold-400);padding:22px;border-radius:18px">
                <span style="color:#fef08a;font-size:10px;font-weight:900;letter-spacing:1px">VENTA TOTAL CONSOLIDADA HOY</span>
                <div style="font-size:30px;font-weight:900;margin:6px 0;color:#ffffff">${money(chainTotal)}</div>
                <small style="color:#fde68a">6 Sucursales en Vivo • ${todaySales.length} Tickets</small>
            </div>
            <div class="dashboard-card" style="padding:22px;border-radius:18px;border-left:5px solid #16a34a">
                <span style="color:var(--text-muted);font-size:10px;font-weight:900">💵 TOTAL EFECTIVO RED</span>
                <div style="font-size:26px;font-weight:900;color:#15803d;margin:6px 0">${money(chainCashTotal)}</div>
                <small style="color:var(--text-muted)">Dinero líquido en cajas</small>
            </div>
            <div class="dashboard-card" style="padding:22px;border-radius:18px;border-left:5px solid #2563eb">
                <span style="color:var(--text-muted);font-size:10px;font-weight:900">💳 TOTAL TARJETA RED</span>
                <div style="font-size:26px;font-weight:900;color:#1d4ed8;margin:6px 0">${money(chainCardTotal)}</div>
                <small style="color:var(--text-muted)">Terminales bancarias</small>
            </div>
            <div class="dashboard-card" style="padding:22px;border-radius:18px;border-left:5px solid #d97706">
                <span style="color:var(--text-muted);font-size:10px;font-weight:900">🌅 MATUTINO / 🌇 VESPERTINO</span>
                <div style="font-size:15px;font-weight:800;color:var(--wine-900);margin:6px 0">
                    🌅 ${money(chainMatTotal)} <span style="color:var(--text-muted);font-size:12px">|</span> 🌇 ${money(chainVesTotal)}
                </div>
                <small style="color:var(--text-muted)">Desglose por turnos de red</small>
            </div>
        </div>

        <!-- ══ SECCIÓN: RESUMEN DIARIO DE PRODUCTOS VENDIDOS & PRODUCCIÓN ══ -->
        <div class="card" style="margin-bottom:24px;border:1.5px solid var(--gold-400);border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,0.05);overflow:hidden">
            <div style="background:linear-gradient(135deg,var(--wine-900),var(--wine-700));color:#fff;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                <div style="display:flex;align-items:center;gap:10px">
                    <span style="font-size:22px">🍨</span>
                    <div>
                        <h3 style="margin:0;font-size:16px;font-weight:900;color:#fff">Resumen Diario de Productos Vendidos (Producción & Auditoría)</h3>
                        <p style="margin:2px 0 0;font-size:11px;color:#fef08a">Desglose de unidades vendidas por turno (Matutino vs Vespertino) e inventario restante</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                    <label style="font-size:11px;font-weight:800;color:#fff">Ver Sucursal:</label>
                    <select id="sel-summary-branch" style="background:#fff;color:var(--wine-900);font-weight:800;font-size:12px;border-radius:8px;padding:6px 12px;border:none;cursor:pointer">
                        <option value="all" ${(!S.prodSummaryBranch || S.prodSummaryBranch === "all") ? "selected" : ""}>🌐 Todas las Sucursales</option>
                        ${S.branches.map(b => `<option value="${b.id}" ${S.prodSummaryBranch === b.id ? "selected" : ""}>📍 ${esc(b.name)}</option>`).join("")}
                    </select>
                </div>
            </div>
            <div id="product-summary-table-container" style="padding:16px;overflow-x:auto">
                <!-- Se llena dinámicamente con renderProductSummaryTable -->
            </div>
        </div>

        <h3 style="font-size:18px;font-weight:900;color:var(--wine-900);margin-bottom:16px;display:flex;align-items:center;gap:8px">
            <span>📍</span> Monitor de Red en Vivo (6 Sucursales)
        </h3>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;margin-bottom:28px">
            ${summary.map(b => `
                <div class="dashboard-card" style="border-radius:16px;border:1.5px solid #e5e7eb;padding:18px;position:relative">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                        <h4 style="margin:0;font-size:16px;font-weight:900;color:var(--wine-900);display:flex;align-items:center;gap:6px">
                            <span>🍦</span> ${esc(b.name)}
                        </h4>
                        <span style="font-size:10px;font-weight:900;padding:3px 8px;border-radius:20px;${b.sales > 0 ? 'background:#dcfce7;color:#15803d' : 'background:#fef3c7;color:#92400e'}">
                            ${b.sales > 0 ? '🟢 EN VIVO' : '🟡 LISTO'}</span>
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
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:6px;border-top:1px dashed #e5e7eb;font-size:11px">
                            <div>🌅 Matutino: <strong style="color:var(--wine-800)">${money(b.matTotal)}</strong></div>
                            <div>🌇 Vespertino: <strong style="color:var(--wine-800)">${money(b.vesTotal)}</strong></div>
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
                        <button class="btn btn-sm btn-outline btn-view-branch-sales" data-bid="${b.id}" data-bname="${esc(b.name)}" style="font-size:11px;font-weight:800;padding:8px">
                            📋 Ver Ventas
                        </button>
                        <button class="btn btn-sm btn-outline btn-view-branch-cuts" data-bid="${b.id}" data-bname="${esc(b.name)}" style="font-size:11px;font-weight:800;padding:8px;background:#fdf2f2;border-color:#fca5a5;color:#991b1b">
                            ✂ Ver Cortes
                        </button>
                    </div>
                    <button class="btn btn-sm btn-primary btn-operate-branch" data-bid="${b.id}" data-bname="${esc(b.name)}" style="width:100%;font-size:11px;font-weight:900;padding:8px">
                        Operar esta Sucursal →
                    </button>
                </div>
            `).join("")}
        </div>`;

        // Renderizar tabla de resumen de productos
        renderProductSummaryTable(todaySales);

        // Listeners
        const selBranch = $("#sel-summary-branch");
        if (selBranch) {
            selBranch.addEventListener("change", (e) => {
                S.prodSummaryBranch = e.target.value;
                renderProductSummaryTable(todaySales);
            });
        }

        
        const btnCleanSU = $("#btn-clean-su-cache");
        if (btnCleanSU) {
            btnCleanSU.addEventListener("click", async () => {
                const ok = await toastConfirm("¿Deseas limpiar todos los datos en caché de superusuario?\nSe recargarán únicamente las ventas y cortes en vivo.");
                if (!ok) return;
                const keys = ["lf_all_sales", "lf_all_cuts", "lf_all_shifts", "lf_all_damage_reports", "lf_closed_business_days"];
                keys.forEach(k => { try { localStorage.removeItem(k); } catch(e) {} });
                _cachedConsolidatedSales = null;
                await getConsolidatedSalesForChain(true);
                await loadPrivateAccess();
                toast("✓ Caché de superusuario limpiada con éxito.", "success", 3000);
            });
        }
        
        const btnCloseDay = $("#btn-close-business-day");
        if (btnCloseDay) {
            btnCloseDay.addEventListener("click", async () => {
                const ok = await toastConfirm(`👑 [SUPERUSUARIO] ¿Deseas realizar el CORTE GENERAL del día ${selectedDate}?\n• Se archivarán las ventas y cortes del día en el historial.\n• El monitor en vivo se preparará para el nuevo día.`);
                if (!ok) return;

                const closedDays = gr("closed_business_days", []);
                if (!closedDays.includes(selectedDate)) {
                    closedDays.push(selectedDate);
                    gw("closed_business_days", closedDays);
                }

                // Archivar resumen
                const ledgers = gr("historical_daily_ledgers", {});
                ledgers[selectedDate] = {
                    date: selectedDate,
                    total: chainTotal,
                    cashTotal: chainCashTotal,
                    cardTotal: chainCardTotal,
                    matTotal: chainMatTotal,
                    vesTotal: chainVesTotal,
                    branches: summary,
                    closed_at: now(),
                    closed_by: S.profile?.full_name || S.user?.email || "Dirección General"
                };
                gw("historical_daily_ledgers", ledgers);

                toast(`✓ Corte General del día ${selectedDate} completado y archivado.`, "success", 5000);
                await loadPrivateAccess();
            });
        }
        const selDate = $("#sel-private-access-date");
        if (selDate) {
            selDate.addEventListener("change", (e) => {
                S.privateAccessDate = e.target.value;
                loadPrivateAccess();
            });
        }

        c.querySelectorAll(".btn-operate-branch").forEach(btn => {
            btn.addEventListener("click", () => {
                const bId = btn.dataset.bid;
                const bName = btn.dataset.bname;
                if (bId && bName) {
                    S.branchId = bId;
                    S.branchName = bName;
                    renderSel();
                    if (window.changeView) window.changeView("pos");
                }
            });
        });

        c.querySelectorAll(".btn-view-branch-sales").forEach(btn => {
            btn.addEventListener("click", () => {
                const bId = btn.dataset.bid;
                const bName = btn.dataset.bname;
                if (bId && bName) {
                    S.branchId = bId;
                    S.branchName = bName;
                    S.salesFilterBranchId = bId;
                    renderSel();
                    if (window.changeView) window.changeView("sales");
                }
            });
        });

        c.querySelectorAll(".btn-view-branch-cuts").forEach(btn => {
            btn.addEventListener("click", () => {
                const bId = btn.dataset.bid;
                const bName = btn.dataset.bname;
                if (bId && bName) {
                    S.branchId = bId;
                    S.branchName = bName;
                    S.cutBranchFilter = bId;
                    renderSel();
                    if (window.changeView) window.changeView("cuts");
                }
            });
        });
    }

    // Función auxiliar para renderizar tabla de resumen diario de productos vendidos
    function renderProductSummaryTable(todaySales) {
        const c = $("#product-summary-table-container");
        if (!c) return;

        const targetBranchId = S.prodSummaryBranch || "all";
        const branchSales = (targetBranchId === "all")
            ? todaySales
            : todaySales.filter(s => matchesBranch(s, { id: targetBranchId, name: S.branches.find(b=>String(b.id)===String(targetBranchId))?.name || "" }));

        const productMap = new Map();

        branchSales.forEach(s => {
            const shiftCat = getShiftCategory(s); // 'matutino' o 'vespertino'
            const items = s.items || [];
            items.forEach(item => {
                const pid = String(item.product_id || item.product_name);
                if (!productMap.has(pid)) {
                    productMap.set(pid, {
                        id: pid,
                        name: item.product_name || "Producto",
                        code: item.product_code || "",
                        category: item.category || "General",
                        price: Number(item.price || 0),
                        matQty: 0,
                        vesQty: 0,
                        totalQty: 0,
                        totalMoney: 0
                    });
                }
                const pObj = productMap.get(pid);
                const q = Number(item.quantity || 1);
                const sub = Number(item.subtotal != null ? item.subtotal : (item.price * q));
                if (shiftCat === "matutino") pObj.matQty += q;
                else pObj.vesQty += q;
                pObj.totalQty += q;
                pObj.totalMoney += sub;
            });
        });

        const prodList = Array.from(productMap.values()).sort((a,b) => b.totalQty - a.totalQty);

        if (!prodList.length) {
            c.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted)">
                <div style="font-size:32px">📦</div>
                <p style="margin-top:6px;font-size:13px">Aún no se registran productos vendidos en los turnos seleccionados.</p>
            </div>`;
            return;
        }

        const totalPieces = prodList.reduce((acc, p) => acc + p.totalQty, 0);
        const totalMoney = prodList.reduce((acc, p) => acc + p.totalMoney, 0);
        const totalMat = prodList.reduce((acc, p) => acc + p.matQty, 0);
        const totalVes = prodList.reduce((acc, p) => acc + p.vesQty, 0);

        c.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:16px">
            <div style="background:#fdf2f8;border:1px solid #fbcfe8;border-radius:10px;padding:10px 14px">
                <span style="font-size:10px;font-weight:900;color:#9d174d">🍨 TOTAL UNIDADES VENDIDAS</span>
                <div style="font-size:22px;font-weight:900;color:#831843">${totalPieces} <small style="font-size:12px">piezas</small></div>
            </div>
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:10px 14px">
                <span style="font-size:10px;font-weight:900;color:#92400e">🌅 TURNO MATUTINO</span>
                <div style="font-size:22px;font-weight:900;color:#78350f">${totalMat} <small style="font-size:12px">piezas</small></div>
            </div>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:10px 14px">
                <span style="font-size:10px;font-weight:900;color:#1e40af">🌇 TURNO VESPERTINO</span>
                <div style="font-size:22px;font-weight:900;color:#1e3a8a">${totalVes} <small style="font-size:12px">piezas</small></div>
            </div>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:10px 14px">
                <span style="font-size:10px;font-weight:900;color:#166534">💰 IMPORTE TOTAL GENERADO</span>
                <div style="font-size:22px;font-weight:900;color:#14532d">${money(totalMoney)}</div>
            </div>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead>
                <tr style="background:var(--wine-50);border-bottom:2px solid var(--wine-200);text-align:left;color:var(--wine-900)">
                    <th style="padding:10px 12px;font-weight:900">PRODUCTO / CONCEPTO</th>
                    <th style="padding:10px 12px;font-weight:900">CATEGORÍA</th>
                    <th style="padding:10px 12px;font-weight:900;text-align:center">🌅 MATUTINO</th>
                    <th style="padding:10px 12px;font-weight:900;text-align:center">🌇 VESPERTINO</th>
                    <th style="padding:10px 12px;font-weight:900;text-align:center;background:#fef3c7;color:#92400e">🍨 TOTAL DÍA</th>
                    <th style="padding:10px 12px;font-weight:900;text-align:right">IMPORTE</th>
                    <th style="padding:10px 12px;font-weight:900;text-align:center">STOCK RESTANTE</th>
                </tr>
            </thead>
            <tbody>
                ${prodList.map(p => {
                    const curStock = getStock(p.id);
                    const isLow = curStock <= STOCK_LOW;
                    return `
                    <tr style="border-bottom:1px solid #f3f4f6">
                        <td style="padding:10px 12px;font-weight:800;color:var(--wine-900)">
                            ${esc(p.name)}
                            ${p.code ? `<br><small style="color:var(--text-muted);font-weight:600">${esc(p.code)}</small>` : ''}
                        </td>
                        <td style="padding:10px 12px">
                            <span style="background:#f3f4f6;padding:3px 8px;border-radius:6px;font-size:10px;font-weight:800;color:var(--wine-800);text-transform:uppercase">
                                ${esc(p.category)}
                            </span>
                        </td>
                        <td style="padding:10px 12px;text-align:center;font-weight:700;color:#92400e">${p.matQty} pz</td>
                        <td style="padding:10px 12px;text-align:center;font-weight:700;color:#1e40af">${p.vesQty} pz</td>
                        <td style="padding:10px 12px;text-align:center;font-weight:900;font-size:13px;background:#fffbeb;color:#78350f">${p.totalQty} pz</td>
                        <td style="padding:10px 12px;text-align:right;font-weight:800;color:#15803d">${money(p.totalMoney)}</td>
                        <td style="padding:10px 12px;text-align:center">
                            <span style="padding:3px 8px;border-radius:6px;font-size:11px;font-weight:900;${isLow ? 'background:#fee2e2;color:#991b1b' : 'background:#dcfce7;color:#166534'}">
                                ${curStock} uds. ${isLow ? '⚠ Resurtir' : '✓'}
                            </span>
                        </td>
                    </tr>`;
                }).join("")}
            </tbody>
        </table>`;
    }

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
        let debounceTimer = null;
        inp.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                S.q = inp.value;
                renderPOS(filtered());
            }, 120);
        });
    }

    /* ── SINCRONIZACIÓN EN TIEMPO REAL & CANALES SUPABASE ── */
    let realtimeChannel = null;
    let _lastSalesCount = 0;
    let _lastCutsCount = 0;

    let _lastRefreshHash = "";
    
    /* ── CONTEO DIARIO DE PRODUCTOS VENDIDOS POR SUCURSAL Y TURNO ── */
    async function loadSalesCount(silent = false) {
        const c = document.getElementById("sales-count-container");
        if (!c) return;

        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando conteo de productos vendidos…</p></div>`;
        }

        const consolidatedSales = await getConsolidatedSalesForChain();
        const todayStr = toDateKey();

        // 1. Recoger todas las fechas disponibles
        const datesSet = new Set([todayStr]);
        consolidatedSales.forEach(s => {
            const d = toDateKey(s.created_at);
            if (d) datesSet.add(d);
        });
        const availableDates = Array.from(datesSet).sort().reverse();

        if (!S.salesCountDate) S.salesCountDate = todayStr;
        const selectedDate = S.salesCountDate;
        const isAllDates = (selectedDate === "all");

        // 2. Filtrar ventas por fecha seleccionada y activas (no canceladas)
        const activeSales = consolidatedSales.filter(s => {
            if (String(s.status || "").toUpperCase() === "CANCELLED") return false;
            if (isAllDates) return true;
            return toDateKey(s.created_at) === selectedDate;
        });

        // 3. Filtros de Sucursal y Turno
        const selectedBranchFilter = S.isSU ? (S.salesCountBranch || "all") : (S.branchId || S.branchName);
        const selectedShiftFilter = S.salesCountShift || "all";

        const filteredSales = activeSales.filter(s => {
            if (selectedBranchFilter !== "all" && !matchesBranch(s, { id: selectedBranchFilter, name: selectedBranchFilter })) {
                return false;
            }
            if (selectedShiftFilter !== "all") {
                const shiftCat = getShiftCategory(s);
                if (selectedShiftFilter === "matutino" && shiftCat !== "matutino") return false;
                if (selectedShiftFilter === "vespertino" && shiftCat !== "vespertino") return false;
            }
            return true;
        });

        // 4. Calcular conteo por producto (Matutino vs Vespertino)
        const productStats = new Map();

        // Inicializar con los productos del catálogo
        S.products.forEach(p => {
            if (!p.is_supply && p.category !== "desechables") {
                productStats.set(p.product_id, {
                    id: p.product_id,
                    name: p.product_name,
                    code: p.product_code || "",
                    category: p.category || "General",
                    price: Number(p.price || 0),
                    matutinoQty: 0,
                    vespertinoQty: 0,
                    totalQty: 0,
                    totalAmount: 0
                });
            }
        });

        // Sumar items de las ventas filtradas
        filteredSales.forEach(sale => {
            const shiftCat = getShiftCategory(sale);
            if (Array.isArray(sale.items)) {
                sale.items.forEach(it => {
                    const pid = String(it.product_id || it.id);
                    const qty = Number(it.quantity || it.qty || 1);
                    const subtotal = Number(it.subtotal != null ? it.subtotal : (qty * Number(it.price || 0)));

                    if (!productStats.has(pid)) {
                        productStats.set(pid, {
                            id: pid,
                            name: it.product_name || it.name || "Producto",
                            code: it.product_code || "",
                            category: it.category || "General",
                            price: Number(it.price || 0),
                            matutinoQty: 0,
                            vespertinoQty: 0,
                            totalQty: 0,
                            totalAmount: 0
                        });
                    }

                    const st = productStats.get(pid);
                    if (shiftCat === "vespertino") {
                        st.vespertinoQty += qty;
                    } else {
                        st.matutinoQty += qty;
                    }
                    st.totalQty += qty;
                    st.totalAmount += subtotal;
                });
            }
        });

        const list = Array.from(productStats.values()).sort((a,b) => b.totalQty - a.totalQty || a.name.localeCompare(b.name));

        // KPIs
        const totalItemsSold = list.reduce((sum, x) => sum + x.totalQty, 0);
        const totalMoneySold = list.reduce((sum, x) => sum + x.totalAmount, 0);
        const totalPaletas = list.filter(x => x.category === "paletas").reduce((sum, x) => sum + x.totalQty, 0);
        const totalHelados = list.filter(x => x.category === "helados").reduce((sum, x) => sum + x.totalQty, 0);
        const totalAguas = list.filter(x => x.category === "aguas").reduce((sum, x) => sum + x.totalQty, 0);
        const totalPrep = list.filter(x => x.category === "preparados").reduce((sum, x) => sum + x.totalQty, 0);

        const currentBranchName = S.isSU 
            ? (selectedBranchFilter === "all" ? "Todas las Sucursales" : (S.branches.find(b => String(b.id) === String(selectedBranchFilter))?.name || selectedBranchFilter))
            : S.branchName;

        const branchSelectHtml = S.isSU ? `
            <div>
                <label style="font-size:11px;font-weight:800;color:var(--gold-300);display:block;margin-bottom:4px">📍 SUCURSAL:</label>
                <select id="sc-branch-filter" style="padding:7px 12px;border-radius:8px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;color:var(--wine-900)">
                    <option value="all"${selectedBranchFilter==='all'?' selected':''}>🌐 Todas las Sucursales</option>
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(selectedBranchFilter)?' selected':''}>📍 ${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        c.innerHTML = `
        <!-- ENCABEZADO Y FILTROS -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px;background:linear-gradient(135deg,#230408,#450a12);padding:16px 20px;border-radius:16px;border:1.5px solid var(--gold-400);box-shadow:0 4px 15px rgba(0,0,0,0.2)">
            <div>
                <strong style="font-size:18px;color:#ffffff;font-weight:900;display:flex;align-items:center;gap:8px">
                    <span>📊</span> Conteo Diario de Productos Vendidos — ${esc(currentBranchName)}
                </strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:3px">
                    Producción y consumo diario exacto: Matutino vs Vespertino • Total del Día
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${branchSelectHtml}
                <div>
                    <label style="font-size:11px;font-weight:800;color:var(--gold-300);display:block;margin-bottom:4px">⏰ TURNO:</label>
                    <select id="sc-shift-filter" style="padding:7px 12px;border-radius:8px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;color:var(--wine-900)">
                        <option value="all"${selectedShiftFilter==='all'?' selected':''}>☀️ Ambos Turnos</option>
                        <option value="matutino"${selectedShiftFilter==='matutino'?' selected':''}>🌅 Solo Matutino</option>
                        <option value="vespertino"${selectedShiftFilter==='vespertino'?' selected':''}>🌇 Solo Vespertino</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:11px;font-weight:800;color:var(--gold-300);display:block;margin-bottom:4px">📅 FECHA:</label>
                    <select id="sc-date-filter" style="padding:7px 12px;border-radius:8px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;color:var(--wine-900)">
                        <option value="${todayStr}"${selectedDate===todayStr?' selected':''}>🟢 Hoy (${todayStr})</option>
                        ${availableDates.filter(d => d !== todayStr).map(d => `<option value="${d}"${selectedDate===d?' selected':''}>📆 ${d}</option>`).join("")}
                        <option value="all"${selectedDate==='all'?' selected':''}>🌐 Histórico Completo</option>
                    </select>
                </div>
                <button type="button" id="btn-ref-sales-count"
                    style="margin-top:18px;padding:8px 16px;background:linear-gradient(135deg,#fff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:var(--wine-950)">
                    🔄 Actualizar
                </button>
            </div>
        </div>

        <!-- TARJETAS RESUMEN KPIS -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-bottom:20px">
            <div style="background:#fff;padding:14px;border-radius:14px;border:1.5px solid var(--gold-400);box-shadow:0 2px 8px rgba(0,0,0,0.05)">
                <small style="font-size:10.5px;font-weight:800;color:var(--text-muted);display:block">TOTAL PIEZAS VENDIDAS</small>
                <strong style="font-size:22px;color:var(--wine-900);font-weight:900">${totalItemsSold} pz</strong>
                <div style="font-size:11px;color:#16a34a;font-weight:700;margin-top:2px">${money(totalMoneySold)} total</div>
            </div>
            <div style="background:#fff;padding:14px;border-radius:14px;border:1.5px solid #93c5fd;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
                <small style="font-size:10.5px;font-weight:800;color:#1e40af;display:block">💧 AGUAS VENDIDAS</small>
                <strong style="font-size:22px;color:#1d4ed8;font-weight:900">${totalAguas} pz</strong>
                <div style="font-size:10.5px;color:var(--text-muted)">Litros y medios litros</div>
            </div>
            <div style="background:#fff;padding:14px;border-radius:14px;border:1.5px solid #fbcfe8;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
                <small style="font-size:10.5px;font-weight:800;color:#9d174d;display:block">🍭 PALETAS VENDIDAS</small>
                <strong style="font-size:22px;color:#be185d;font-weight:900">${totalPaletas} pz</strong>
                <div style="font-size:10.5px;color:var(--text-muted)">Leche, agua y rellenas</div>
            </div>
            <div style="background:#fff;padding:14px;border-radius:14px;border:1.5px solid #fed7aa;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
                <small style="font-size:10.5px;font-weight:800;color:#9a3412;display:block">🍨 HELADOS & NIEVES</small>
                <strong style="font-size:22px;color:#c2410c;font-weight:900">${totalHelados} pz</strong>
                <div style="font-size:10.5px;color:var(--text-muted)">Conos, litros y vasos</div>
            </div>
            <div style="background:#fff;padding:14px;border-radius:14px;border:1.5px solid #bbf7d0;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
                <small style="font-size:10.5px;font-weight:800;color:#166534;display:block">🍧 PREPARADOS</small>
                <strong style="font-size:22px;color:#15803d;font-weight:900">${totalPrep} pz</strong>
                <div style="font-size:10.5px;color:var(--text-muted)">Especiales y botanas</div>
            </div>
        </div>

        <!-- TABLA COMPLETA DE CONTEO -->
        <div class="dashboard-card" style="padding:20px;border-radius:16px;background:#ffffff;box-shadow:var(--shadow-card);border:1.5px solid #e5e7eb">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
                <h3 style="color:var(--wine-900);margin:0;font-weight:900;font-size:16px">📋 Desglose Detallado por Producto (${list.length} artículos)</h3>
                <span style="font-size:11.5px;color:var(--text-muted)">Ordenado por mayor cantidad vendida</span>
            </div>

            <div style="overflow-x:auto">
                <table style="width:100%;border-collapse:collapse;text-align:left;font-size:13px">
                    <thead>
                        <tr style="background:#faf7f2;border-bottom:2px solid var(--gold-400)">
                            <th style="padding:10px 12px;font-weight:900;color:var(--wine-900)">PRODUCTO</th>
                            <th style="padding:10px 12px;font-weight:900;color:var(--wine-900)">CATEGORÍA</th>
                            <th style="padding:10px 12px;font-weight:900;color:var(--wine-900);text-align:center">PRECIO</th>
                            <th style="padding:10px 12px;font-weight:900;color:#9a3412;text-align:center">🌅 MAÑANA</th>
                            <th style="padding:10px 12px;font-weight:900;color:#1e40af;text-align:center">🌇 TARDE</th>
                            <th style="padding:10px 12px;font-weight:900;color:#15803d;text-align:center">📊 TOTAL DÍA</th>
                            <th style="padding:10px 12px;font-weight:900;color:var(--wine-900);text-align:right">💰 TOTAL $</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${list.map(p => {
                            const hasSales = p.totalQty > 0;
                            return `
                            <tr style="border-bottom:1px solid #f1f5f9;${hasSales?'background:#fff':'opacity:0.6'}">
                                <td style="padding:10px 12px">
                                    <strong style="color:var(--wine-950);display:block">${esc(p.name)}</strong>
                                    <small style="color:var(--text-muted);font-size:10.5px">${esc(p.code || 'S/C')}</small>
                                </td>
                                <td style="padding:10px 12px">
                                    <span style="font-size:11px;background:#f3f4f6;padding:2px 8px;border-radius:10px;font-weight:700;color:#374151">
                                        ${esc(p.category)}
                                    </span>
                                </td>
                                <td style="padding:10px 12px;text-align:center;font-weight:700;color:#4b5563">${money(p.price)}</td>
                                <td style="padding:10px 12px;text-align:center;font-weight:900;color:${p.matutinoQty>0?'#c2410c':'#9ca3af'}">
                                    ${p.matutinoQty} pz
                                </td>
                                <td style="padding:10px 12px;text-align:center;font-weight:900;color:${p.vespertinoQty>0?'#1d4ed8':'#9ca3af'}">
                                    ${p.vespertinoQty} pz
                                </td>
                                <td style="padding:10px 12px;text-align:center">
                                    <span style="font-size:13px;font-weight:900;padding:4px 10px;border-radius:12px;${hasSales?'background:#dcfce7;color:#15803d;border:1px solid #86efac':'background:#f3f4f6;color:#6b7280'}">
                                        ${p.totalQty} pz
                                    </span>
                                </td>
                                <td style="padding:10px 12px;text-align:right;font-weight:900;color:var(--wine-900)">
                                    ${money(p.totalAmount)}
                                </td>
                            </tr>`;
                        }).join("")}
                    </tbody>
                </table>
            </div>
        </div>
        `;

        // Event listeners
        document.getElementById("sc-branch-filter")?.addEventListener("change", e => {
            S.salesCountBranch = e.target.value;
            loadSalesCount();
        });

        document.getElementById("sc-shift-filter")?.addEventListener("change", e => {
            S.salesCountShift = e.target.value;
            loadSalesCount();
        });

        document.getElementById("sc-date-filter")?.addEventListener("change", e => {
            S.salesCountDate = e.target.value;
            loadSalesCount();
        });

        document.getElementById("btn-ref-sales-count")?.addEventListener("click", () => {
            loadSalesCount();
            toast("Conteo de ventas actualizado.", "info");
        });
    }
    
    function safeSilentRefresh(force = false) {
        if (!S.user) return;
        const active = document.activeElement;
        const isTyping = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT" || active.isContentEditable);
        const hasOpenModal = !!document.querySelector(".modal.open, .modal.show, [data-modal-open='true'], #checkout-modal:not(.hidden), .confirm-modal");
        if (isTyping || hasOpenModal) return;

        const cancelledCount = Object.keys(gr("cancelled_reasons", {})).length;
        const currentHash = S.view + "_" + (gr("all_sales", []).length) + "_" + cancelledCount + "_" + (gr("all_cuts", []).length) + "_" + (gr("all_shifts", []).length);
        if (!force && currentHash === _lastRefreshHash) return;
        _lastRefreshHash = currentHash;

        if (S.view === "private-access" && S.isSU) loadPrivateAccess(true);
        else if (S.view === "accounting" && S.isSU) loadAccounting(true);
        else if (S.view === "sales") loadSales(true);
        else if (S.view === "cuts") loadCuts(true);
        else if (S.view === "sales-count") loadSalesCount(true);
    }

    async function triggerLiveNetworkSync() {
        if (!S.user) return;
        try {
            await syncPendingSalesToSupabase();
            const consolidated = await getConsolidatedSalesForChain();
            
            if (_lastSalesCount > 0 && consolidated.length > _lastSalesCount) {
                const diffCount = consolidated.length - _lastSalesCount;
                const latest = consolidated[0];
                if (latest && S.isSU) {
                    toast(`⚡ ${diffCount} nueva(s) venta(s) recibida(s) en vivo: ${money(latest.total)} en ${latest.branch_name || 'Sucursal'} (${latest.shift_name || 'Turno'})`, "info", 3500);
                }
            }
            _lastSalesCount = consolidated.length;

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
        } catch(e) {
            console.warn("Live network sync error:", e);
        }
    }

    function setupRealtime() {
        if (!db) return;
        if (realtimeChannel) {
            try { db.removeChannel(realtimeChannel); } catch(e) {}
        }

        try {
            realtimeChannel = db.channel("lafuente-pos-mesh", { config: { broadcast: { self: false } } })
                // 1. RECEPCIÓN DIRECTA DE VENTAS EN TIEMPO REAL (MESH BROADCAST)
                .on("broadcast", { event: "sale_cancelled" }, async ({ payload }) => {
                    if (!payload || (!payload.id && !payload.sale_number)) return;
                    const sid = String(payload.id || "");
                    const snum = String(payload.sale_number || "");
                    const reason = payload.reason || "Venta cancelada";
                    const cancelledBy = payload.by || "Encargada";
                    const cancelledAt = payload.at || now();

                    // 1. Guardar motivo de cancelación
                    const cr = Object.assign({}, lr("cancelled_reasons", {}), gr("cancelled_reasons", {}));
                    if (sid) cr[sid] = reason;
                    if (snum) cr[snum] = reason;
                    gw("cancelled_reasons", cr);
                    lw("cancelled_reasons", cr);

                    // 2. Marcar en all_sales global
                    let allGSales = gr("all_sales", []);
                    const target = allGSales.find(x => (sid && String(x.id) === sid) || (snum && String(x.sale_number) === snum) || (x.local_id && (x.local_id === sid || x.local_id === snum)));
                    if (target) {
                        target.status = "CANCELLED";
                        target.cancelled_reason = reason;
                        target.cancelled_by = cancelledBy;
                        target.cancelled_at = cancelledAt;
                        gw("all_sales", allGSales);
                    }

                    // 3. Marcar en ventas locales
                    let lSales = lr("sales", []);
                    const lTarget = lSales.find(x => (sid && String(x.id) === sid) || (snum && String(x.sale_number) === snum));
                    if (lTarget) {
                        lTarget.status = "CANCELLED";
                        lTarget.cancelled_reason = reason;
                        lTarget.cancelled_by = cancelledBy;
                        lTarget.cancelled_at = cancelledAt;
                        lw("sales", lSales);
                    }

                    _cachedConsolidatedSales = null;
                    await getConsolidatedSalesForChain(true);

                    if (S.isSU) {
                        const bName = target?.branch_name || payload.branch_name || "Sucursal";
                        toast(`⚠️ Ticket #${snum || sid} CANCELADO en ${bName}. Descontado de Contabilidad y Acceso Privado.`, "warn", 5000);
                    }

                    safeSilentRefresh(true);
                })
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
                        toast(`🔔 Venta cobrada en vivo: ${money(s.total)} en ${s.branch_name || 'Sucursal'} (${s.shift_name || 'Turno'})`, "success", 4000);
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
                    const allGSales = gr("all_sales", []);
                    const allGCuts = gr("all_cuts", []);
                    const salesToSend = (mySales.length ? mySales : allGSales);
                    const cutsToSend = (myCuts.length ? myCuts : allGCuts);

                    if (realtimeChannel) {
                        try {
                            realtimeChannel.send({
                                type: "broadcast",
                                event: "sync_response",
                                payload: {
                                    branch_name: S.branchName,
                                    branch_id: S.branchId,
                                    shift_name: S.shift,
                                    sales: salesToSend,
                                    cuts: cutsToSend,
                                    inv: S.inv
                                }
                            });
                        } catch(e) {}
                    }
                })
                // 4. RESPUESTA DE SINCRONIZACIÓN RECIBIDA DE OTRAS SUCURSALES
                .on("broadcast", { event: "sync_response" }, async ({ payload }) => {
                    if (!payload) return;
                    let hasNew = false;
                    if (payload.sales && payload.sales.length) {
                        let allGSales = gr("all_sales", []);
                        const map = new Map();
                        allGSales.forEach(s => map.set(String(s.id || s.sale_number), s));
                        payload.sales.forEach(s => {
                            const sid = String(s.id || s.sale_number);
                            if (!map.has(sid)) {
                                map.set(sid, s);
                                hasNew = true;
                            } else {
                                map.set(sid, { ...map.get(sid), ...s });
                            }
                        });
                        const merged = Array.from(map.values()).sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
                        gw("all_sales", merged);
                    }
                    if (payload.cuts && payload.cuts.length) {
                        let allCuts = gr("all_cuts", []);
                        const mapC = new Map();
                        allCuts.forEach(c => mapC.set(String(c.id || c.created_at), c));
                        payload.cuts.forEach(c => {
                            const cid = String(c.id || c.created_at);
                            if (!mapC.has(cid)) {
                                mapC.set(cid, c);
                                hasNew = true;
                            }
                        });
                        gw("all_cuts", Array.from(mapC.values()));
                    }
                    if (payload.inv && payload.branch_id) {
                        gw("inv_" + payload.branch_id, payload.inv);
                    }
                    _cachedConsolidatedSales = null;
                    await getConsolidatedSalesForChain(true);
                    safeSilentRefresh(true);
                })
                .on("postgres_changes", { event: "*", schema: "public", table: "sales" }, async payload => {
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
                    await getConsolidatedSalesForChain();
                    safeSilentRefresh();
                })
                .on("postgres_changes", { event: "*", schema: "public", table: "cash_cuts" }, async () => {
                    if (S.view === "cuts") await loadCuts(true);
                    else safeSilentRefresh();
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
                    if (status === "SUBSCRIBED") {
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

        // Heartbeat de auto-sincronización periódica activa cada 4 segundos
        if (window._syncTimer) clearInterval(window._syncTimer);
        window._syncTimer = setInterval(triggerLiveNetworkSync, 4000);

        // Sincronización inmediata al volver a enfocar la pestaña
        window.addEventListener("focus", triggerLiveNetworkSync);
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") triggerLiveNetworkSync();
        });
    }

    /* ── INICIALIZACIÓN ── */
    async function init() {
        if (!initDB()) return;
        const loginEl = document.getElementById("login-screen");
        const shellEl = document.getElementById("app-shell");

        let activeUser = null;
        try {
            const raw = localStorage.getItem("lf_active_user_session");
            if (raw) activeUser = JSON.parse(raw);
        } catch(e) {}

        const {data} = await safeQuery(db.auth.getSession(), null, 1000);
        if (data?.session?.user) {
            activeUser = data.session.user;
        }

        if (activeUser) {
            S.user = activeUser;
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
            autoReconnectPrinters();
            if (S.isSU && window.changeView) window.changeView("private-access");
            else if (window.changeView) window.changeView("pos");
        } else {
            if (loginEl) loginEl.style.display = "flex";
            if (shellEl) shellEl.style.display = "none";
            document.body.classList.add("login-active");

            await loadBranches();
            await loadProducts();
            setupRealtime();
            autoReconnectPrinters();
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
        loadSalesCount: loadSalesCount,
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