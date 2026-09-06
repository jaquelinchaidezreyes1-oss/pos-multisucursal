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

    const STOCK_MAX = 100;
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
    async function loadBranches() {
        if (!db) initDB();
        if (db) {
            try {
                const {data} = await db.from("branches").select("id,name,code,is_active").eq("is_active", true).order("name");
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
        const b = S.branches.find(x => String(x.id) === String(id));
        if (!b) return;
        S.branchId = b.id;
        S.branchName = b.name;
        S.currentShift = null;
        S.cart = [];
        updateUI();
        renderSel();
        renderCart();
        await loadCurrentShift();
        await loadProducts();
        if (S.view === "sales")          await loadSales();
        if (S.view === "cuts")           await loadCuts();
        if (S.view === "inventory")      await loadInventory();
        if (S.view === "shift")          await loadShiftView();
        if (S.view === "private-access") await loadPrivateAccess();
        if (S.view === "damage-reports") await loadDamageReports();
        if (S.view === "accounting")     await loadAccounting();
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
                const {data} = await db.from("profiles").select("*").eq("id", S.user.id).maybeSingle();
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

    /* ── INVENTARIO ── */
    function initInv() { S.inv = lr("inv", {}); }
    function getStock(id) { if (S.inv[id] === undefined) S.inv[id] = STOCK_MAX; return S.inv[id]; }
    function deductStock(id, qty) { S.inv[id] = Math.max(0, getStock(id) - qty); lw("inv", S.inv); alertInv(); }
    function addStock(id, qty)    { S.inv[id] = Math.min(STOCK_MAX, getStock(id) + qty); lw("inv", S.inv); alertInv(); }

    function alertInv() {
        const banner = document.getElementById("inventory-alert-banner");
        if (!banner) return;
        const out = S.products.filter(p => getStock(p.product_id) === 0);
        const low = S.products.filter(p => getStock(p.product_id) > 0 && getStock(p.product_id) <= STOCK_LOW);
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

    /* ── CATÁLOGO BASE OFICIAL LA FUENTE ── */
    const DEFAULT_PRODUCTS = [
        // PALETAS
        { product_id: "p_pal_fresa", product_code: "PAL-01", product_name: "Paleta de Fresa (Agua)", category: "paletas", price: 20 },
        { product_id: "p_pal_limon", product_code: "PAL-02", product_name: "Paleta de Limón", category: "paletas", price: 20 },
        { product_id: "p_pal_mango", product_code: "PAL-03", product_name: "Paleta de Mango con Chile", category: "paletas", price: 22 },
        { product_id: "p_pal_tamarindo", product_code: "PAL-04", product_name: "Paleta de Tamarindo", category: "paletas", price: 20 },
        { product_id: "p_pal_vainilla", product_code: "PAL-05", product_name: "Paleta de Vainilla (Leche)", category: "paletas", price: 25 },
        { product_id: "p_pal_chocolate", product_code: "PAL-06", product_name: "Paleta de Chocolate", category: "paletas", price: 25 },
        { product_id: "p_pal_coco", product_code: "PAL-07", product_name: "Paleta de Coco Cremoso", category: "paletas", price: 25 },
        { product_id: "p_pal_nuez", product_code: "PAL-08", product_name: "Paleta de Nuez Fina", category: "paletas", price: 28 },
        { product_id: "p_pal_oreo", product_code: "PAL-09", product_name: "Paleta de Galleta Oreo", category: "paletas", price: 28 },
        { product_id: "p_pal_zarzamora", product_code: "PAL-10", product_name: "Paleta Zarzamora con Queso", category: "paletas", price: 28 },
        
        // HELADOS & NIEVES
        { product_id: "p_hel_sencillo", product_code: "CS", product_name: "Cono Sencillo", category: "helados", price: 25 },
        { product_id: "p_hel_doble_v", product_code: "CDV", product_name: "Cono Doble Vainilla", category: "helados", price: 45 },
        { product_id: "p_hel_doble_ch", product_code: "CDCH", product_name: "Cono Doble Chocolate", category: "helados", price: 45 },
        { product_id: "p_hel_waffle", product_code: "HEL-03", product_name: "Cono Waffle Especial", category: "helados", price: 55 },
        { product_id: "p_hel_vaso_ch", product_code: "HEL-04", product_name: "Vaso de Nieve Chico", category: "helados", price: 30 },
        { product_id: "p_hel_vaso_med", product_code: "HEL-05", product_name: "Vaso de Nieve Mediano", category: "helados", price: 50 },
        { product_id: "p_hel_vaso_gde", product_code: "HEL-06", product_name: "Vaso de Nieve Grande", category: "helados", price: 70 },
        { product_id: "p_hel_medio_lt", product_code: "HEL-07", product_name: "Medio Litro de Nieve", category: "helados", price: 85 },
        { product_id: "p_hel_litro", product_code: "HEL-08", product_name: "Litro de Nieve para Llevar", category: "helados", price: 150 },

        // AGUAS FRESCAS
        { product_id: "p_agua_500", product_code: "AG-01", product_name: "Agua Fresca Vaso 500ml", category: "aguas", price: 25 },
        { product_id: "p_agua_1lt", product_code: "AG-02", product_name: "Agua Fresca Litro (Horchata/Jamaica/Cebada)", category: "aguas", price: 45 },
        { product_id: "p_agua_galon", product_code: "AG-03", product_name: "Galón de Agua Fresca", category: "aguas", price: 140 },

        // PREPARADOS
        { product_id: "p_prep_fresas", product_code: "PREP-01", product_name: "Fresas con Crema Especial", category: "preparados", price: 65 },
        { product_id: "p_prep_esquite", product_code: "PREP-02", product_name: "Esquites / Vaso de Elote", category: "preparados", price: 45 },
        { product_id: "p_prep_nachos", product_code: "PREP-03", product_name: "Nachos con Queso y Jalapeño", category: "preparados", price: 50 },
        { product_id: "p_prep_tosti", product_code: "PREP-04", product_name: "Tostilocos Preparados", category: "preparados", price: 55 },
        { product_id: "p_prep_dori", product_code: "PREP-05", product_name: "Dorilocos Preparados", category: "preparados", price: 55 },
        { product_id: "p_prep_mango", product_code: "PREP-06", product_name: "Mangoneada / Chamoyada", category: "preparados", price: 45 },
        { product_id: "p_prep_bionico", product_code: "PREP-07", product_name: "Biónico de Frutas con Crema", category: "preparados", price: 60 },

        // POSTRES & DULCES
        { product_id: "p_post_pay", product_code: "POS-01", product_name: "Rebanada Pay de Queso", category: "postres", price: 45 },
        { product_id: "p_post_flan", product_code: "POS-02", product_name: "Flan Casero Napolitano", category: "postres", price: 40 },
        { product_id: "p_dul_bolis", product_code: "DUL-01", product_name: "Bolis Gourmet Congelado", category: "dulces", price: 18 },
        { product_id: "p_dul_dulces", product_code: "DUL-02", product_name: "Dulces / Botanas Variadas", category: "dulces", price: 15 }
    ];

    /* ── PRODUCTOS (FILTRADO Y CARGA UNIVERSAL PARA TODAS LAS SUCURSALES) ── */
    async function loadProducts() {
        let remoteProducts = [];
        if (db) {
            try {
                const {data} = await db.from("pos_products_final_view").select("*").eq("is_active", true).order("product_name");
                remoteProducts = data || [];
            } catch(e) {}
            if (!remoteProducts.length) {
                try {
                    const {data} = await db.from("products").select("*").eq("is_active", true).order("product_name");
                    remoteProducts = data || [];
                } catch(e2) {}
            }
        }

        const customProds = gr("custom_products", []);
        const deletedIds  = gr("deleted_product_ids", []);
        const combinedMap = new Map();

        // 1. Cargar catálogo base predeterminado de La Fuente
        DEFAULT_PRODUCTS.forEach(p => {
            if (!deletedIds.includes(String(p.product_id))) {
                combinedMap.set(String(p.product_id), {
                    product_id: p.product_id,
                    product_name: p.product_name,
                    product_code: p.product_code || "",
                    category: p.category,
                    price: Number(p.price || 0),
                    image_url: p.image_url || null,
                    branch_id: "all",
                    branch_name: "General"
                });
            }
        });

        // 2. Fusionar con catálogo remoto de Supabase
        remoteProducts.forEach(p => {
            const pid = String(p.product_id || p.id);
            if (!deletedIds.includes(pid)) {
                let cat = String(p.category || p.product_category || "paletas").toLowerCase().trim();
                const pName = String(p.product_name || "").toLowerCase();
                if (cat.includes("preparad") || pName.includes("esquite") || pName.includes("nacho") || pName.includes("tosti") || pName.includes("fresas con crema")) cat = "preparados";
                else if (cat.includes("helad") || pName.includes("cono") || pName.includes("nieve") || pName.includes("vaso")) cat = "helados";
                else if (cat.includes("agua") || pName.includes("agua") || pName.includes("horchata") || pName.includes("jamaica")) cat = "aguas";
                else if (cat.includes("postre") || pName.includes("flan") || pName.includes("pay") || pName.includes("pastel")) cat = "postres";
                else if (cat.includes("dulce") || pName.includes("boli")) cat = "dulces";
                else if (cat.includes("desechable")) cat = "desechables";
                else if (cat.includes("congelado")) cat = "congelados";
                else if (!cat || cat.length > 20) cat = "paletas";

                combinedMap.set(pid, {
                    product_id: pid,
                    product_name: p.product_name,
                    product_code: p.product_code || p.code || "",
                    category: cat,
                    price: Number(p.price || 0),
                    image_url: p.image_url || null,
                    branch_id: p.branch_id || "all",
                    branch_name: p.branch_name || "General"
                });
            }
        });

        // 3. Fusionar productos personalizados creados en sucursales
        customProds.forEach(p => {
            const pid = String(p.product_id);
            if (!deletedIds.includes(pid)) {
                combinedMap.set(pid, {
                    product_id: pid,
                    product_name: p.product_name,
                    product_code: p.product_code || "",
                    category: (p.category || "paletas").toLowerCase().trim(),
                    price: Number(p.price || 0),
                    image_url: p.image_url || null,
                    branch_id: p.branch_id || "all",
                    branch_name: p.branch_name || "General"
                });
            }
        });

        S.products = Array.from(combinedMap.values()).sort((a,b) => a.product_name.localeCompare(b.product_name));

        initInv();
        renderCatTabs();
        renderPOS(filtered());
        alertInv();
        return S.products;
    }

    function filtered() {
        let p = S.products;
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

    /* ── ADMINISTRACIÓN DE CATÁLOGO & BORRADO ── */
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

        c.innerHTML = `
        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card)">
            <h3 style="color:var(--wine-900);margin:0 0 16px">➕ Agregar Nuevo Producto al Catálogo</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:16px">
                <div><label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">NOMBRE DEL PRODUCTO *</label>
                    <input id="np-name" type="text" placeholder="Ej: Vaso Preparado Especial"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box"></div>
                <div><label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">CÓDIGO / CLAVE</label>
                    <input id="np-code" type="text" placeholder="PREP-01"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box"></div>
                <div><label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">CATEGORÍA EXACTA *</label>
                    <select id="np-cat" style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box">${catOpts}</select></div>
                <div><label style="font-size:11px;font-weight:800;color:var(--wine-700);display:block;margin-bottom:5px">PRECIO ($) *</label>
                    <input id="np-price" type="number" step="0.5" min="0" placeholder="Ej: 35.00"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box"></div>
                ${branchSelectHtml}
            </div>
            <button type="button" id="btn-add-prod"
                style="padding:12px 28px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:800;font-size:14px;cursor:pointer">
                ✓ Guardar Producto en Catálogo</button>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
            <h3 style="color:#ffffff;margin:0;font-weight:900">Productos Disponibles en ${esc(S.branchName)} (${S.products.length})</h3>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${adminBranchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-reload-admin-prods" style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:8px;cursor:pointer;font-weight:bold">🔄 Actualizar</button>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px">
            ${S.products.map(p => {
                const stock = getStock(p.product_id);
                const isGeneral = !p.branch_name || p.branch_name === "General" || p.branch_id === "all";
                const bTag = isGeneral ? "🏢 Todas las Sucursales" : `📍 Solo ${p.branch_name}`;
                return `<article style="background:#fff;border:1px solid rgba(188,132,10,.35);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--shadow-sm)">
                    <div>
                        <div style="height:90px;display:flex;align-items:center;justify-content:center;background:#fffcf0;border-radius:10px;margin-bottom:10px">
                            ${p.image_url ? `<img src="${esc(p.image_url)}" style="max-height:100%;max-width:100%;object-fit:contain">` : '<span style="font-size:36px">🍦</span>'}
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;margin-bottom:4px">
                            <small style="color:var(--text-muted);font-size:11px;font-weight:700">${esc(p.product_code||"S/C")} • <strong>${esc(p.category)}</strong></small>
                            <span style="font-size:9px;padding:2px 6px;border-radius:6px;background:${isGeneral?'#fef3c7':'#dbeafe'};color:${isGeneral?'#92400e':'#1e40af'};font-weight:800">${esc(bTag)}</span>
                        </div>
                        <h4 style="margin:4px 0;color:var(--wine-900);font-size:14px">${esc(p.product_name)}</h4>
                        <strong style="color:var(--wine-700);font-size:15px">${money(p.price)}</strong>
                        <div style="font-size:11px;margin-top:6px;color:${stock<=STOCK_LOW?"#b45309":"#15803d"};font-weight:700">
                            Stock: ${stock} unidades ${stock<=STOCK_LOW?"⚠":'✓'}</div>
                    </div>
                    <button type="button" class="btn-del-prod" data-id="${esc(p.product_id)}" data-name="${esc(p.product_name)}"
                        style="margin-top:12px;padding:8px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:8px;font-size:12px;font-weight:800;cursor:pointer">
                        🗑 Eliminar Producto</button>
                </article>`;
            }).join("")}
        </div>`;

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
            const price = Number(document.getElementById("np-price")?.value);
            const targetBranch = document.getElementById("np-branch")?.value || S.branchName;

            if (!name) return toast("Escribe el nombre del producto.", "warn");
            if (!price || price <= 0) return toast("Ingresa un precio válido.", "warn");

            const bId = (targetBranch === "all") ? "all" : (S.branches.find(b => b.name.toLowerCase().includes(targetBranch.toLowerCase()))?.id || S.branchId);

            const newProd = {
                product_id: "prod_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                product_name: name,
                product_code: code || ("LF-" + Math.floor(Math.random()*900+100)),
                category: cat,
                price: price,
                branch_id: bId,
                branch_name: targetBranch === "all" ? "General" : targetBranch,
                is_active: true,
                created_at: now()
            };

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

            toast(`✓ Producto '${name}' guardado para: ${newProd.branch_name}.`, "success", 4000);
            await loadProducts();
            await loadProductsAdmin();
        });

        c.querySelectorAll(".btn-del-prod").forEach(btn => btn.addEventListener("click", async () => {
            const reason = await toastPrompt(`Motivo para eliminar "${btn.dataset.name}":`, "Escribe el motivo obligatorio…");
            if (!reason) return;

            const deletedIds = gr("deleted_product_ids", []);
            deletedIds.push(String(btn.dataset.id));
            gw("deleted_product_ids", deletedIds);

            if (db) {
                try {
                    await db.from("products").update({is_active: false, delete_reason: reason}).eq("product_id", btn.dataset.id);
                } catch(e) {}
            }

            toast(`'${btn.dataset.name}' eliminado. Motivo: ${reason}`, "info");
            await loadProducts();
            await loadProductsAdmin();
        }));
    }

    /* ── CARRITO & COBRO DE ÓRDENES ── */
    function addToCart(pid) {
        const p = S.products.find(x => String(x.product_id) === String(pid));
        if (!p) return;
        const stock = getStock(pid);
        const ex = S.cart.find(i => String(i.product_id) === String(pid));
        const qty = ex ? ex.quantity : 0;
        if (qty >= stock) {
            toast(`Solo hay ${stock} unidades de "${p.product_name}" en inventario.`, "warn");
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
            return;
        }
        c.innerHTML = S.cart.map(i => {
            const stock = getStock(i.product_id);
            const over  = i.quantity > stock;
            return `<div class="cart-item"${over ? ' style="border-left:3px solid #ef4444"' : ""}>
                <div>
                    <strong style="font-size:13px;color:var(--wine-900)">${esc(i.product_name)}</strong>
                    <div style="font-size:11px;color:var(--text-muted)">${money(i.price)} c/u</div>
                    ${over ? `<div style="font-size:10px;color:#b91c1c;font-weight:900">⚠ Solo hay ${stock} en stock</div>` : ""}
                </div>
                <div class="cart-item-actions">
                    <button type="button" data-minus="${esc(i.product_id)}">−</button>
                    <span style="font-weight:bold;padding:0 6px">${i.quantity}</span>
                    <button type="button" data-plus="${esc(i.product_id)}">+</button>
                </div>
                <strong style="color:${over ? "#b91c1c" : "var(--wine-700)"}">${money(i.price * i.quantity)}</strong>
            </div>`;
        }).join("");

        const total = S.cart.reduce((s,i) => s + (i.price * i.quantity), 0);
        setT("#subtotal,#total,#pay-total", money(total));

        c.querySelectorAll("[data-minus]").forEach(b => b.addEventListener("click", () => {
            const i = S.cart.find(x => String(x.product_id) === String(b.dataset.minus));
            if (!i) return;
            i.quantity--;
            if (i.quantity <= 0) S.cart = S.cart.filter(x => x.product_id !== i.product_id);
            renderCart();
        }));

        c.querySelectorAll("[data-plus]").forEach(b => b.addEventListener("click", () => {
            const i = S.cart.find(x => String(x.product_id) === String(b.dataset.plus));
            if (!i) return;
            const stock = getStock(i.product_id);
            if (i.quantity >= stock) {
                toast(`Solo hay ${stock} unidades de "${i.product_name}".`, "warn");
                return;
            }
            i.quantity++;
            renderCart();
        }));
    }

    /* ── MOTOR UNIVERSAL DE IMPRESIÓN DE TICKETS & CORTES (58MM / 80MM) ── */
    let directUsbDevice = null;
    let directUsbEndpoint = null;
    let directBtChar = null;

    function getPrinterConfig() {
        return gr("printer_config", {
            model: "Ghia POS Thermal (58mm / 80mm)",
            paperWidth: "58mm",
            autoPrint: true,
            connectionType: "browser"
        });
    }

    function savePrinterConfig(cfg) {
        gw("printer_config", cfg);
    }

    async function connectUsbDirect() {
        if (!navigator.usb) {
            toast("WebUSB no está disponible en este navegador. Usa Google Chrome.", "warn");
            return false;
        }
        try {
            const device = await navigator.usb.requestDevice({ filters: [] });
            await device.open();
            if (device.configuration === null) {
                await device.selectConfiguration(1);
            }
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
            cfg.connectionType = "usb_direct";
            savePrinterConfig(cfg);
            toast(`✓ Conectada exitosamente por USB: ${device.productName || 'Impresora Ghia'}`, "success", 5000);
            return true;
        } catch(err) {
            console.warn("USB connect error:", err);
            toast(`No se seleccionó impresora USB: ${err.message || ''}`, "warn");
            return false;
        }
    }

    async function connectBluetoothDirect() {
        if (!navigator.bluetooth) {
            toast("WebBluetooth no está disponible en este navegador. Usa Google Chrome.", "warn");
            return false;
        }
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [
                    "000018f0-0000-1000-8000-00805f9b34fb",
                    "e7810a71-73ae-499d-8c15-faa9aef0c3f2",
                    "49535343-fe7d-4ae5-8fa9-9fafd205e455",
                    "0000ffe0-0000-1000-8000-00805f9b34fb",
                    "0000ff00-0000-1000-8000-00805f9b34fb"
                ]
            });
            const server = await device.gatt.connect();
            const services = await server.getPrimaryServices();
            for (const service of services) {
                const characteristics = await service.getCharacteristics();
                for (const char of characteristics) {
                    if (char.properties.write || char.properties.writeWithoutResponse) {
                        directBtChar = char;
                        break;
                    }
                }
                if (directBtChar) break;
            }
            if (directBtChar) {
                const cfg = getPrinterConfig();
                cfg.connectionType = "bt_direct";
                savePrinterConfig(cfg);
                toast(`✓ Conectada por Bluetooth: ${device.name || 'Impresora Ghia'}`, "success", 5000);
                return true;
            } else {
                toast("No se encontró canal de impresión en el dispositivo Bluetooth seleccionado.", "warn");
                return false;
            }
        } catch(err) {
            console.warn("Bluetooth connect error:", err);
            toast(`No se conectó Bluetooth: ${err.message || ''}`, "warn");
            return false;
        }
    }

    async function sendEscPosBytes(bytes) {
        if (directUsbDevice && directUsbEndpoint) {
            try {
                await directUsbDevice.transferOut(directUsbEndpoint, bytes);
                return true;
            } catch(e) {
                console.warn("Fallo al enviar por USB directo, reintentando...", e);
                try {
                    await directUsbDevice.open();
                    await directUsbDevice.claimInterface(0);
                    await directUsbDevice.transferOut(directUsbEndpoint, bytes);
                    return true;
                } catch(e2) {
                    console.warn("Error definitivo USB:", e2);
                }
            }
        }
        if (directBtChar) {
            try {
                const CHUNK_SIZE = 256;
                for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
                    const chunk = bytes.slice(i, i + CHUNK_SIZE);
                    if (directBtChar.writeValueWithoutResponse) {
                        await directBtChar.writeValueWithoutResponse(chunk);
                    } else {
                        await directBtChar.writeValue(chunk);
                    }
                }
                return true;
            } catch(e) {
                console.warn("Error Bluetooth:", e);
            }
        }
        return false;
    }

    function buildEscPos(lines) {
        const encoder = new TextEncoder();
        const chunks = [];
        const ESC = 0x1B;
        const GS = 0x1D;

        // Init
        chunks.push(new Uint8Array([ESC, 0x40]));

        lines.forEach(item => {
            if (typeof item === "string") {
                chunks.push(encoder.encode(item + "\n"));
            } else if (item.align) {
                const code = item.align === "center" ? 1 : (item.align === "right" ? 2 : 0);
                chunks.push(new Uint8Array([ESC, 0x61, code]));
            } else if (item.bold !== undefined) {
                chunks.push(new Uint8Array([ESC, 0x45, item.bold ? 1 : 0]));
            } else if (item.size) {
                const s = item.size === "double" ? 0x11 : (item.size === "wide" ? 0x20 : (item.size === "tall" ? 0x01 : 0x00));
                chunks.push(new Uint8Array([GS, 0x21, s]));
            } else if (item.text !== undefined) {
                chunks.push(encoder.encode(item.text + (item.noNewline ? "" : "\n")));
            } else if (item.feed) {
                chunks.push(new Uint8Array([ESC, 0x64, item.feed || 3]));
            } else if (item.cut) {
                chunks.push(new Uint8Array([ESC, 0x64, 4, GS, 0x56, 0x41, 0x00]));
            }
        });

        let totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
        const result = new Uint8Array(totalLen);
        let offset = 0;
        for (const chunk of chunks) {
            result.set(chunk, offset);
            offset += chunk.length;
        }
        return result;
    }

    async function triggerUniversalPrint(htmlContent, rawEscPosBytes = null) {
        if (rawEscPosBytes && (directUsbDevice || directBtChar)) {
            const success = await sendEscPosBytes(rawEscPosBytes);
            if (success) {
                toast("✓ Ticket impreso directamente en la Ghia.", "success", 3000);
                return;
            }
        }

        let printed = false;
        try {
            const printWin = window.open("", "_blank", "width=380,height=600,menubar=no,toolbar=no,location=no,status=no");
            if (printWin) {
                printWin.document.open();
                printWin.document.write(htmlContent);
                printWin.document.close();
                printed = true;
                setTimeout(() => {
                    try {
                        printWin.focus();
                        printWin.print();
                    } catch(e) {}
                }, 300);
            }
        } catch(e) {
            console.warn("Direct print popup failed:", e);
        }

        if (!printed) {
            try {
                let iframe = document.getElementById("pos-print-iframe");
                if (!iframe) {
                    iframe = document.createElement("iframe");
                    iframe.id = "pos-print-iframe";
                    iframe.style.position = "fixed";
                    iframe.style.bottom = "0";
                    iframe.style.right = "0";
                    iframe.style.width = "200px";
                    iframe.style.height = "200px";
                    iframe.style.opacity = "0.01";
                    iframe.style.pointerEvents = "none";
                    iframe.style.zIndex = "99999";
                    document.body.appendChild(iframe);
                }
                const doc = iframe.contentWindow.document;
                doc.open();
                doc.write(htmlContent);
                doc.close();
                setTimeout(() => {
                    try {
                        iframe.contentWindow.focus();
                        iframe.contentWindow.print();
                    } catch(e) {
                        console.error("Iframe print error:", e);
                    }
                }, 350);
            } catch(err) {
                console.error("Print execution failed:", err);
            }
        }
    }

    function printSaleReceipt(s) {
        if (!s) return;
        const cfg = getPrinterConfig();
        const pWidth = cfg.paperWidth || "58mm";
        const isCard = s.payment_method === "card";
        const payLabel = isCard ? "TARJETA / TERMINAL" : "EFECTIVO";
        const tickNum = s.sale_number || ("TICK-" + String(s.id).substring(0,8));
        const itemsHtml = (s.items || []).map(it => `
            <tr>
                <td style="text-align:left;padding:3px 0;">${esc(it.quantity)}x ${esc(it.product_name)}</td>
                <td style="text-align:right;padding:3px 0;">${money(it.subtotal || (it.price * it.quantity))}</td>
            </tr>
        `).join("");

        const ticketHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ticket #${esc(tickNum)}</title>
    <style>
        @page { margin: 0; size: ${pWidth} auto; }
        * { box-sizing: border-box; }
        html, body {
            font-family: 'Courier New', Courier, monospace;
            font-size: ${pWidth === "80mm" ? "13px" : "12px"};
            color: #000;
            background: #fff;
            width: ${pWidth};
            max-width: ${pWidth};
            margin: 0 auto;
            padding: 4px 2px;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        table { width: 100%; border-collapse: collapse; font-size: ${pWidth === "80mm" ? "12px" : "11px"}; }
        @media print {
            @page { margin: 0; size: ${pWidth} auto; }
            html, body { width: 100% !important; max-width: ${pWidth} !important; margin: 0 auto !important; padding: 1mm !important; }
        }
    </style>
    <script>
        window.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() { window.focus(); window.print(); }, 150);
        });
    </script>
</head>
<body onload="window.print();">
    <div class="center bold" style="font-size:15px;">NEVERIA LA FUENTE</div>
    <div class="center" style="font-size:10px;">PALETERIA &amp; HELADERIA</div>
    <div class="center" style="font-size:9px;">-- DESDE 1962 --</div>
    <div class="divider"></div>
    <div><strong>SUCURSAL:</strong> ${esc(s.branch_name || S.branchName)}</div>
    <div><strong>TURNO:</strong> ${esc(s.shift_name || S.shift)}</div>
    <div><strong>FECHA:</strong> ${fdt(s.created_at)}</div>
    <div><strong>CAJERA:</strong> ${esc(s.cashier_name || "Encargada")}</div>
    <div><strong>TICKET:</strong> #${esc(tickNum)}</div>
    <div class="divider"></div>
    <table>
        <thead>
            <tr style="border-bottom: 1px solid #000;">
                <th style="text-align:left;">CANT / PROD</th>
                <th style="text-align:right;">IMPORTE</th>
            </tr>
        </thead>
        <tbody>
            ${itemsHtml}
        </tbody>
    </table>
    <div class="divider"></div>
    <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:bold;">
        <span>TOTAL:</span>
        <span>${money(s.total)}</span>
    </div>
    <div style="font-size:11px;margin-top:4px;"><strong>FORMA DE PAGO:</strong> ${payLabel}</div>
    <div class="double-divider"></div>
    <div class="center" style="font-size:10px;margin-top:6px;">
        ¡GRACIAS POR SU PREFERENCIA!<br>
        La Fuente Paletería &amp; Heladería
    </div>
    <div style="height: 18mm;"></div>
</body>
</html>`;

        // ESC/POS Crudo
        const escLines = [
            { align: "center" },
            { bold: true },
            { size: "double" },
            { text: "NEVERIA LA FUENTE" },
            { size: "normal" },
            { bold: false },
            { text: "PALETERIA Y HELADERIA" },
            { text: "-- DESDE 1962 --" },
            { text: "--------------------------------" },
            { align: "left" },
            { text: `SUCURSAL: ${s.branch_name || S.branchName}` },
            { text: `TURNO:    ${s.shift_name || S.shift}` },
            { text: `FECHA:    ${fdt(s.created_at)}` },
            { text: `CAJERA:   ${s.cashier_name || "Encargada"}` },
            { text: `TICKET:   #${tickNum}` },
            { text: "--------------------------------" }
        ];

        (s.items || []).forEach(it => {
            const lineName = `${it.quantity}x ${it.product_name}`.substring(0, 22);
            const linePrice = money(it.subtotal || (it.price * it.quantity));
            const pad = Math.max(1, 32 - lineName.length - linePrice.length);
            escLines.push({ text: lineName + " ".repeat(pad) + linePrice });
        });

        escLines.push(
            { text: "--------------------------------" },
            { bold: true },
            { text: `TOTAL:                  ${money(s.total)}` },
            { bold: false },
            { text: `PAGO: ${payLabel}` },
            { text: "================================" },
            { align: "center" },
            { text: "¡GRACIAS POR SU COMPRA!" },
            { text: "La Fuente Paleteria" },
            { feed: 4 },
            { cut: true }
        ];

        const rawBytes = buildEscPos(escLines);
        triggerUniversalPrint(ticketHtml, rawBytes);
    }

    function printCutReceipt(ct) {
        if (!ct) return;
        const cfg = getPrinterConfig();
        const pWidth = cfg.paperWidth || "58mm";
        const diff = Number(ct.difference || 0);
        const diffLabel = diff === 0 ? "CUADRE EXACTO ($0.00)" : (diff > 0 ? `SOBRANTE (+${money(diff)})` : `FALTANTE (${money(diff)})`);
        const isMorning = String(ct.shift_name || "").toLowerCase().includes("mañana") || String(ct.shift_name || "").toLowerCase().includes("matutino");
        const shiftLabel = isMorning ? "MATUTINO (MAÑANA)" : "VESPERTINO (TARDE)";

        const cutHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Recibo de Corte de Caja</title>
    <style>
        @page { margin: 0; size: ${pWidth} auto; }
        * { box-sizing: border-box; }
        html, body {
            font-family: 'Courier New', Courier, monospace;
            font-size: ${pWidth === "80mm" ? "12px" : "11px"};
            color: #000;
            background: #fff;
            width: ${pWidth};
            max-width: ${pWidth};
            margin: 0 auto;
            padding: 4px 2px;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        .row { display: flex; justify-content: space-between; margin: 2px 0; }
        @media print {
            @page { margin: 0; size: ${pWidth} auto; }
            html, body { width: 100% !important; max-width: ${pWidth} !important; margin: 0 auto !important; padding: 1mm !important; }
        }
    </style>
    <script>
        window.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() { window.focus(); window.print(); }, 150);
        });
    </script>
</head>
<body onload="window.print();">
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

        const escLines = [
            { align: "center" },
            { bold: true },
            { text: "NEVERIA LA FUENTE" },
            { text: "CORTE DE CAJA OFICIAL" },
            { bold: false },
            { text: "--------------------------------" },
            { align: "left" },
            { text: `SUCURSAL:  ${ct.branch_name || S.branchName}` },
            { text: `TURNO:     ${shiftLabel}` },
            { text: `FECHA:     ${fdt(ct.created_at)}` },
            { text: `ENCARGADA: ${ct.performed_by_name || "Encargada"}` },
            { text: "--------------------------------" },
            { text: `FONDO INICIAL:   ${money(ct.opening_amount || 0)}` },
            { text: `VENTAS EFECTIVO: ${money(ct.cash_sales || 0)}` },
            { text: `VENTAS TARJETA:  ${money(ct.card_sales || 0)}` },
            { text: "--------------------------------" },
            { bold: true },
            { text: `TOTAL VENDIDO:   ${money(ct.total_sales || 0)}` },
            { text: `EFECTIVO ESP:    ${money(ct.expected_cash || 0)}` },
            { text: `EFECTIVO CONT:   ${money(ct.counted_cash || 0)}` },
            { text: `CORTE NETO:      ${money(ct.net_sales_without_fund || 0)}` },
            { text: `DIFERENCIA:      ${diffLabel}` },
            { bold: false },
            { text: "================================" },
            { feed: 4 },
            { cut: true }
        ];

        const rawBytes = buildEscPos(escLines);
        triggerUniversalPrint(cutHtml, rawBytes);
    }

    function printDailyAccountingReceipt(reportData) {
        if (!reportData) return;
        const cfg = getPrinterConfig();
        const pWidth = cfg.paperWidth || "58mm";

        const branchesHtml = (reportData.branchBreakdown || []).map(b => `
            <div style="margin: 4px 0; padding-bottom: 4px; border-bottom: 1px dotted #888;">
                <div style="font-weight:bold; display:flex; justify-content:space-between;">
                    <span>📍 ${esc(b.name)}:</span>
                    <span>${money(b.total)}</span>
                </div>
                <div style="font-size:10px; display:flex; justify-content:space-between; color:#333;">
                    <span>Efectivo: ${money(b.cash)}</span>
                    <span>Tarjeta: ${money(b.card)}</span>
                </div>
                <div style="font-size:9.5px; color:#555;">
                    Tickets: ${b.tickets} | Mat: ${money(b.mat)} | Ves: ${money(b.ves)}
                </div>
            </div>
        `).join("");

        const dailyHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Corte Diario Consolidado — ${esc(reportData.date)}</title>
    <style>
        @page { margin: 0; size: ${pWidth} auto; }
        * { box-sizing: border-box; }
        html, body {
            font-family: 'Courier New', Courier, monospace;
            font-size: ${pWidth === "80mm" ? "12px" : "11px"};
            color: #000;
            background: #fff;
            width: ${pWidth};
            max-width: ${pWidth};
            margin: 0 auto;
            padding: 4px 2px;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        .row { display: flex; justify-content: space-between; margin: 2px 0; }
        @media print {
            @page { margin: 0; size: ${pWidth} auto; }
            html, body { width: 100% !important; max-width: ${pWidth} !important; margin: 0 auto !important; padding: 1mm !important; }
        }
    </style>
    <script>
        window.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() { window.focus(); window.print(); }, 150);
        });
    </script>
</head>
<body onload="window.print();">
    <div class="center bold" style="font-size:14px;">NEVERIA LA FUENTE</div>
    <div class="center bold" style="font-size:12px;">CORTE DIARIO CONSOLIDADO</div>
    <div class="center" style="font-size:9px;">-- AUDITORIA GENERAL DE RED --</div>
    <div class="divider"></div>
    <div><strong>FECHA AUDITADA:</strong> ${fd(reportData.date)}</div>
    <div><strong>EMISIÓN:</strong> ${fdt(now())}</div>
    <div><strong>AUDITOR / DIRECCIÓN:</strong> ${esc(S.profile?.full_name || S.user?.email || "Dirección General")}</div>
    <div class="divider"></div>
    <div class="bold" style="font-size:11px; margin-bottom:3px;">BALANCE GENERAL DE LA CADENA:</div>
    <div class="row bold" style="font-size:13px;">
        <span>VENTA TOTAL RED:</span>
        <span>${money(reportData.totalChain)}</span>
    </div>
    <div class="row">
        <span>💵 Total Efectivo:</span>
        <span>${money(reportData.cashTotal)}</span>
    </div>
    <div class="row">
        <span>💳 Total Tarjetas:</span>
        <span>${money(reportData.cardTotal)}</span>
    </div>
    <div class="row">
        <span>🌅 Total Matutino:</span>
        <span>${money(reportData.matTotal)}</span>
    </div>
    <div class="row">
        <span>🌇 Total Vespertino:</span>
        <span>${money(reportData.vesTotal)}</span>
    </div>
    <div class="row">
        <span>🧾 Total Tickets:</span>
        <span>${reportData.totalTickets} emitidos</span>
    </div>
    <div class="divider"></div>
    <div class="bold" style="font-size:11px; margin-bottom:4px;">DESGLOSE POR SUCURSAL:</div>
    ${branchesHtml}
    <div class="double-divider"></div>
    <div style="margin-top:24px; text-align:center;">
        ___________________________<br>
        <span style="font-size:10px;">Firma Dirección General (Jaquelin / Ignacio)</span>
    </div>
    <div style="margin-top:16px; text-align:center; font-size:9px; color:#555;">
        La Fuente Paletería &amp; Heladería — Desde 1962
    </div>
    <div style="height: 18mm;"></div>
</body>
</html>`;

        triggerUniversalPrint(dailyHtml);
    }

    function printShiftOpeningReceipt(sh) {
        if (!sh) return;
        const cfg = getPrinterConfig();
        const pWidth = cfg.paperWidth || "58mm";

        const shiftHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Comprobante de Apertura de Turno</title>
    <style>
        @page { margin: 0; size: ${pWidth} auto; }
        * { box-sizing: border-box; }
        html, body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 11px;
            color: #000;
            background: #fff;
            width: ${pWidth};
            max-width: ${pWidth};
            margin: 0 auto;
            padding: 4px 2px;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        .row { display: flex; justify-content: space-between; margin: 2px 0; }
        @media print {
            @page { margin: 0; size: ${pWidth} auto; }
            html, body { width: 100% !important; max-width: ${pWidth} !important; margin: 0 auto !important; padding: 1mm !important; }
        }
    </style>
    <script>
        window.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() { window.focus(); window.print(); }, 150);
        });
    </script>
</head>
<body onload="window.print();">
    <div class="center bold" style="font-size:14px;">NEVERIA LA FUENTE</div>
    <div class="center bold" style="font-size:11px;">APERTURA &amp; CAMBIO DE TURNO</div>
    <div class="center" style="font-size:9px;">-- DESDE 1962 --</div>
    <div class="divider"></div>
    <div><strong>SUCURSAL:</strong> ${esc(sh.branch || S.branchName)}</div>
    <div><strong>TURNO:</strong> ${esc(sh.shift || S.shift)}</div>
    <div><strong>FECHA / HORA:</strong> ${esc(sh.datetime || fdt(sh.created_at))}</div>
    <div><strong>ENCARGADA:</strong> ${esc(sh.user_name || "Encargada")}</div>
    <div class="divider"></div>
    <div class="row bold" style="font-size:13px;">
        <span>FONDO INICIAL RECIBIDO:</span>
        <span>${money(sh.amount)}</span>
    </div>
    <div class="divider"></div>
    <div style="margin-top:20px; text-align:center;">
        ___________________________<br>
        <span style="font-size:10px;">Firma Encargada Entrante</span>
    </div>
    <div style="height: 18mm;"></div>
</body>
</html>`;

        triggerUniversalPrint(shiftHtml);
    }

    function printTestReceipt(customConfig = null) {
        const cfg = customConfig || getPrinterConfig();
        const pWidth = cfg.paperWidth || "58mm";

        const testHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ticket de Prueba de Impresora</title>
    <style>
        @page { margin: 0; size: ${pWidth} auto; }
        * { box-sizing: border-box; }
        html, body {
            font-family: 'Courier New', Courier, monospace;
            font-size: ${pWidth === "80mm" ? "12px" : "11px"};
            color: #000;
            background: #fff;
            width: ${pWidth};
            max-width: ${pWidth};
            margin: 0 auto;
            padding: 4px 2px;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
        .double-divider { border-top: 2px solid #000; margin: 6px 0; }
        .row { display: flex; justify-content: space-between; margin: 2px 0; }
        @media print {
            @page { margin: 0; size: ${pWidth} auto; }
            html, body { width: 100% !important; max-width: ${pWidth} !important; margin: 0 auto !important; padding: 1mm !important; }
        }
    </style>
    <script>
        window.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() { window.focus(); window.print(); }, 150);
        });
    </script>
</head>
<body onload="window.print();">
    <div class="center bold" style="font-size:15px;">*** TEST DE IMPRESIÓN ***</div>
    <div class="center bold" style="font-size:13px;">NEVERIA LA FUENTE POS</div>
    <div class="center" style="font-size:9px;">-- SISTEMA MULTISUCURSAL --</div>
    <div class="double-divider"></div>
    <div><strong>MODELO SELECCIONADO:</strong> ${esc(cfg.model || "Ghia POS Thermal")}</div>
    <div><strong>ANCHO DE ROLLO:</strong> ${esc(pWidth)}</div>
    <div><strong>FECHA Y HORA:</strong> ${fdt(now())}</div>
    <div><strong>SUCURSAL:</strong> ${esc(S.branchName)}</div>
    <div><strong>USUARIO:</strong> ${esc(S.profile?.full_name || S.user?.email || "Usuario")}</div>
    <div class="divider"></div>
    <div class="bold center" style="font-size:12px; margin:4px 0;">¡CALIBRACIÓN CORRECTA!</div>
    <div class="center" style="font-size:10px;">
        Esta impresora está lista para imprimir:<br>
        ✓ Tickets de Venta a Clientes<br>
        ✓ Cortes de Caja por Turno<br>
        ✓ Reportes Diarios Consolidados<br>
        ✓ Aperturas de Turno con Firma
    </div>
    <div class="divider"></div>
    <div class="center bold" style="font-size:10px;">
        1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
        áéíóú ÁÉÍÓÚ ñÑ $12,345.67
    </div>
    <div class="double-divider"></div>
    <div class="center bold" style="font-size:11px; margin-top:6px;">
        [ CORTAR AQUI ]
    </div>
    <div style="height: 20mm;"></div>
</body>
</html>`;

        const escLines = [
            { align: "center" },
            { bold: true },
            { size: "double" },
            { text: "*** TEST DE IMPRESION ***" },
            { size: "normal" },
            { text: "NEVERIA LA FUENTE POS" },
            { text: "-- SISTEMA MULTISUCURSAL --" },
            { text: "================================" },
            { align: "left" },
            { bold: false },
            { text: `MODELO:   ${cfg.model || 'Ghia POS Thermal'}` },
            { text: `ROLLO:    ${pWidth}` },
            { text: `FECHA:    ${fdt(now())}` },
            { text: `SUCURSAL: ${S.branchName}` },
            { text: "--------------------------------" },
            { align: "center" },
            { bold: true },
            { text: "¡CALIBRACION CORRECTA!" },
            { bold: false },
            { text: "Lista para ventas y cortes" },
            { text: "================================" },
            { feed: 4 },
            { cut: true }
        ];

        const rawBytes = buildEscPos(escLines);
        triggerUniversalPrint(testHtml, rawBytes);
    }

    /* ── MODAL CONFIGURADOR DE IMPRESORA TÉRMICA ── */
    function openPrinterSetupModal() {
        const curCfg = getPrinterConfig();
        const isUsbConnected = Boolean(directUsbDevice);
        const isBtConnected = Boolean(directBtChar);

        const overlay = document.createElement("div");
        overlay.id = "printer-modal-overlay";
        overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);";
        overlay.innerHTML = `
            <div style="background:#fffef8;border:2px solid var(--gold-500);border-radius:22px;padding:26px 22px;max-width:500px;width:100%;box-shadow:0 24px 70px rgba(0,0,0,.45);color:#1a0205">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1.5px solid rgba(188,132,10,.3);padding-bottom:10px">
                    <div style="display:flex;align-items:center;gap:8px">
                        <span style="font-size:26px">🖨️</span>
                        <div>
                            <h3 style="margin:0;color:var(--wine-950);font-size:17px;font-weight:900">Configurar Impresora Térmica</h3>
                            <small style="color:var(--text-muted);font-weight:700">Mini impresora Ghia (100% Gratis - Sin pagar apps)</small>
                        </div>
                    </div>
                    <button id="p-close-btn" type="button" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--wine-900);font-weight:900">✕</button>
                </div>

                <!-- CONEXIÓN DIRECTA GRATUITA SIN APPS DE PAGO -->
                <div style="background:#f0fdf4;border:1.5px solid #86efac;padding:12px 14px;border-radius:14px;margin-bottom:14px">
                    <div style="font-size:12px;font-weight:900;color:#166534;margin-bottom:6px;display:flex;align-items:center;gap:6px">
                        <span>⚡ CONEXIÓN DIRECTA (GRATIS Y DIRECTA)</span>
                        <span style="font-size:10px;padding:2px 8px;border-radius:10px;background:${(isUsbConnected||isBtConnected)?'#dcfce7;color:#15803d':'#fee2e2;color:#991b1b'}">
                            ${isUsbConnected ? '🟢 USB Conectada' : (isBtConnected ? '🟢 Bluetooth Conectada' : '⚪ No vinculada')}
                        </span>
                    </div>
                    <p style="margin:0 0 10px;font-size:11px;color:#166534;line-height:1.4">
                        Conecta tu impresora directamente por USB o Bluetooth desde Chrome. <strong>No necesitas instalar ni pagar ninguna aplicación.</strong>
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                        <button type="button" id="btn-conn-usb" style="padding:9px;background:#15803d;color:#fff;border:none;border-radius:8px;font-size:11.5px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
                            <span>🔌</span><span>Vincular USB</span>
                        </button>
                        <button type="button" id="btn-conn-bt" style="padding:9px;background:#1d4ed8;color:#fff;border:none;border-radius:8px;font-size:11.5px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
                            <span>📡</span><span>Vincular Bluetooth</span>
                        </button>
                    </div>
                </div>

                <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
                    <div>
                        <label style="font-size:11px;font-weight:900;color:var(--wine-800);display:block;margin-bottom:4px">MODELO / MARCA DE IMPRESORA:</label>
                        <select id="p-model" style="width:100%;padding:10px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:13px;font-weight:700;background:#fff;outline:none">
                            <option value="Ghia POS Thermal (58mm / 80mm)"${curCfg.model.includes("Ghia")?' selected':''}>🖨️ Ghia Mini Impresora Térmica (USB / Bluetooth)</option>
                            <option value="EC Line (58mm / 80mm)"${curCfg.model.includes("EC Line")?' selected':''}>🖨️ EC Line (Térmica USB / Bluetooth)</option>
                            <option value="Ofichido (58mm / 80mm)"${curCfg.model.includes("Ofichido")?' selected':''}>🖨️ Ofichido POS Thermal</option>
                            <option value="Caysn Thermal (POS-58)"${curCfg.model.includes("Caysn")?' selected':''}>🖨️ Caysn Thermal Printer</option>
                            <option value="Xprinter (XP-58 / XP-80)"${curCfg.model.includes("Xprinter")?' selected':''}>🖨️ Xprinter / Gprinter</option>
                            <option value="Impresora POS-58 Genérica"${curCfg.model.includes("POS-58") && !curCfg.model.includes("Ghia")?' selected':''}>🖨️ Impresora POS-58 (Rollo 58mm)</option>
                            <option value="Impresora POS-80 Genérica"${curCfg.model.includes("POS-80") && !curCfg.model.includes("Ghia")?' selected':''}>🖨️ Impresora POS-80 (Rollo 80mm)</option>
                            <option value="Epson TM-T20 / TM-T88"${curCfg.model.includes("Epson")?' selected':''}>🖨️ Epson TM-T20 / TM-T88 (ESC/POS)</option>
                        </select>
                    </div>

                    <div>
                        <label style="font-size:11px;font-weight:900;color:var(--wine-800);display:block;margin-bottom:4px">ANCHO DE PAPEL (ROLLO TÉRMICO):</label>
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
                        <span>Ticket de Prueba</span>
                    </button>
                    <button id="p-save-btn" type="button"
                        style="padding:12px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:none;border-radius:12px;font-weight:900;font-size:12.5px;cursor:pointer">
                        ✓ Guardar Ajustes
                    </button>
                </div>
            </div>`;
        document.body.appendChild(overlay);

        overlay.querySelector("#p-close-btn").onclick = () => overlay.remove();

        overlay.querySelector("#btn-conn-usb").onclick = async () => {
            const ok = await connectUsbDirect();
            if (ok) {
                overlay.remove();
                openPrinterSetupModal();
            }
        };

        overlay.querySelector("#btn-conn-bt").onclick = async () => {
            const ok = await connectBluetoothDirect();
            if (ok) {
                overlay.remove();
                openPrinterSetupModal();
            }
        };

        overlay.querySelector("#p-test-btn").onclick = () => {
            const selectedWidth = overlay.querySelector("input[name='p-width']:checked")?.value || "58mm";
            const selectedModel = overlay.querySelector("#p-model")?.value || "Ghia POS Thermal (58mm / 80mm)";
            printTestReceipt({ model: selectedModel, paperWidth: selectedWidth });
            toast("🖨️ Enviando ticket de prueba a la impresora…", "info", 3000);
        };

        overlay.querySelector("#p-save-btn").onclick = () => {
            const selectedWidth = overlay.querySelector("input[name='p-width']:checked")?.value || "58mm";
            const selectedModel = overlay.querySelector("#p-model")?.value || "Ghia POS Thermal (58mm / 80mm)";
            savePrinterConfig({ model: selectedModel, paperWidth: selectedWidth, autoPrint: true });
            overlay.remove();
            toast("✓ Impresora configurada correctamente.", "success", 4000);
        };
    }

    async function directPrintTicketAction() {
        const lastSale = lr("last_printed_sale", null) || lr("sales", [])[0];
        if (!directUsbDevice && !directBtChar) {
            if (navigator.usb) {
                toast("🔌 Conectando con impresora Ghia por USB…", "info", 3000);
                const ok = await connectUsbDirect();
                if (ok) {
                    if (lastSale) printSaleReceipt(lastSale);
                    else printTestReceipt();
                    return;
                }
            }
        }
        if (lastSale) {
            printSaleReceipt(lastSale);
            toast(`🖨️ Imprimiendo Ticket #${lastSale.sale_number || ''} en físico…`, "info", 3000);
        } else {
            printTestReceipt();
            toast("🖨️ Imprimiendo ticket de prueba en físico…", "info", 3000);
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
                console.log("✓ Impresora Ghia USB reconectada automáticamente:", device.productName);
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
            cashier_name: cashierEmail ? `${cashierName} (${cashierEmail})` : cashierName,
            total: total,
            payment_method: payMethod, // 'cash' o 'card'
            status: "COMPLETADA",
            items: S.cart.map(i => ({product_id: i.product_id, product_name: i.product_name, quantity: i.quantity, price: i.price, subtotal: i.price*i.quantity})),
            created_at: now()
        };

        const localSales = lr("sales", []);
        localSales.unshift(saleRecord);
        lw("sales", localSales);

        const allGlobalSales = gr("all_sales", []);
        allGlobalSales.unshift(saleRecord);
        gw("all_sales", allGlobalSales);

        if (db) {
            try {
                const fallbackUUID = "51bc275d-4e19-4115-be3f-42c0ce3dae5a";
                const defaultBranchUUID = "c188dd82-7faf-41b8-948b-af8e789facba";
                const defaultShiftUUID = "1dabe6df-2ce6-4e3a-97df-b81e179898ab";
                const defaultUserUUID = "4710b330-566c-45c7-a92e-b7b6a62355af";

                const bId = uuid(S.branchId) ? S.branchId : defaultBranchUUID;
                const cId = uuid(S.companyId) ? S.companyId : fallbackUUID;
                const sId = uuid(S.currentShift?.id) ? S.currentShift.id : defaultShiftUUID;
                const uId = uuid(S.user?.id) ? S.user.id : defaultUserUUID;

                const observationsObj = {
                    branch_name: S.branchName,
                    shift_name: S.shift,
                    cashier_name: saleRecord.cashier_name,
                    payment_method: payMethod,
                    items: saleRecord.items,
                    local_id: saleRecord.id
                };

                const { data, error } = await db.from("sales").insert({
                    company_id: cId,
                    branch_id: bId,
                    shift_id: sId,
                    user_id: uId,
                    sale_number: saleRecord.sale_number,
                    subtotal: total,
                    discount: 0,
                    tax: 0,
                    total: total,
                    status: "COMPLETED",
                    observations: JSON.stringify(observationsObj),
                    created_at: saleRecord.created_at
                }).select();

                if (error) {
                    console.error("Error al insertar venta en Supabase:", error);
                } else {
                    console.log("✓ Venta sincronizada exitosamente en Supabase:", data);
                }
            } catch(e) {
                console.error("Excepción al guardar venta en Supabase:", e);
            }
        }

        S.cart.forEach(i => deductStock(i.product_id, i.quantity, i.product_name));
        S.cart = [];
        renderCart();
        renderPOS(filtered());
        alertInv();
        const payLabel = payMethod === "card" ? "💳 TARJETA" : "💵 EFECTIVO";
        toast(`✓ Venta de ${money(total)} cobrada en ${payLabel}. Ticket #${saleRecord.sale_number}`, "success", 4000);

        // Imprimir ticket automáticamente en mini impresora térmica
        lw("last_printed_sale", saleRecord);
        gw("last_printed_sale", saleRecord);
        try {
            printSaleReceipt(saleRecord);
        } catch(e) {
            console.warn("No se pudo disparar diálogo de impresión:", e);
        }
    }

    /* ── MIS VENTAS (FILTRO POR CALENDARIO, TURNOS Y ACUMULADOR PARA CAJA) ── */
    async function loadSales() {
        const c = $("#sales-container");
        if (!c || !S.branchId) return;
        c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando ventas de ${esc(S.branchName)}…</p></div>`;

        const IGNORED_TEST_SALES = new Set([
            "4bd1dff9-876c-420a-abea-2bf038a98b15",
            "db76a364-9102-4ea2-b09f-ac3953245189",
            "2c1d816a-195c-4b4f-928f-9291bb35d0b0",
            "5dcc7cde-0afc-4511-ab15-03edeb768497",
            "1aac230a-8092-44a2-830d-fcd11f88ffdc",
            "TICK-482011",
            "TICK-482012",
            "TICK-482013",
            "TICK-482014",
            "TICK-166807"
        ]);

        let remoteSales = [];
        if (db) {
            try {
                const {data, error} = await db.from("sales").select("id,company_id,branch_id,shift_id,user_id,sale_number,total,status,observations,created_at").order("created_at", {ascending:false});
                if (data && data.length) {
                    remoteSales = data
                        .filter(s => !IGNORED_TEST_SALES.has(String(s.id)) && !IGNORED_TEST_SALES.has(String(s.sale_number)))
                        .map(s => {
                            let obs = {};
                            try {
                                obs = typeof s.observations === "string" ? JSON.parse(s.observations) : (s.observations || {});
                            } catch(e) {}
                            return {
                                id: s.id,
                                sale_number: s.sale_number || ("TICK-" + String(s.id).substring(0,8)),
                                branch_id: s.branch_id,
                                branch_name: obs.branch_name || S.branches.find(b=>String(b.id)===String(s.branch_id))?.name || "Sucursal",
                                shift_name: obs.shift_name || "Mañana",
                                cashier_id: s.user_id,
                                cashier_name: obs.cashier_name || "Encargada",
                                total: Number(s.total || 0),
                                payment_method: obs.payment_method || "cash",
                                status: String(s.status||"").toUpperCase() === "CANCELLED" ? "CANCELLED" : "COMPLETADA",
                                items: obs.items || [],
                                created_at: s.created_at,
                                local_id: obs.local_id || s.id
                            };
                        });
                }
            } catch(e) {
                console.warn("Error cargando ventas remotas:", e);
            }
        }

        const localSales = lr("sales", []).filter(s => !IGNORED_TEST_SALES.has(String(s.id)) && !IGNORED_TEST_SALES.has(String(s.sale_number)));
        const cancelledReasons = Object.assign({}, lr("cancelled_reasons", {}), gr("cancelled_reasons", {}));

        const salesMap = new Map();
        localSales.forEach(s => salesMap.set(String(s.id), s));
        remoteSales.forEach(s => {
            const matchBranch = !s.branch_name || s.branch_name === "General" ||
                                (String(s.branch_id) === String(S.branchId)) || 
                                (s.branch_name && S.branchName && s.branch_name.toLowerCase().includes(S.branchName.toLowerCase())) ||
                                (S.branchName && s.branch_name && S.branchName.toLowerCase().includes(s.branch_name.toLowerCase()));
            if (matchBranch && !salesMap.has(String(s.id))) {
                salesMap.set(String(s.id), s);
            }
        });

        // Asegurar que ventas globales de la sucursal también se unan localmente
        const allGlobalSales = gr("all_sales", []).filter(s => !IGNORED_TEST_SALES.has(String(s.id)) && !IGNORED_TEST_SALES.has(String(s.sale_number)));
        allGlobalSales.forEach(s => {
            const matchBranch = (String(s.branch_id) === String(S.branchId)) || 
                                (s.branch_name && S.branchName && s.branch_name.toLowerCase().includes(S.branchName.toLowerCase())) ||
                                (S.branchName && s.branch_name && S.branchName.toLowerCase().includes(s.branch_name.toLowerCase()));
            if (matchBranch && !salesMap.has(String(s.id))) {
                salesMap.set(String(s.id), s);
            }
        });

        const allSales = Array.from(salesMap.values()).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));

        // Fechas disponibles usando hora local
        const datesSet = new Set();
        allSales.forEach(s => {
            const d = toDateKey(s.created_at);
            if (d) datesSet.add(d);
        });
        const todayStr = toDateKey();
        datesSet.add(todayStr);

        const availableDates = Array.from(datesSet).sort().reverse();
        const selectedDate = S.salesFilterDate || todayStr;
        const selectedShiftFilter = S.salesFilterShift || "all";

        // Ventas del día seleccionado
        const daySales = allSales.filter(s => toDateKey(s.created_at) === selectedDate);
        
        const activeDaySales = daySales.filter(s => String(s.status||"").toUpperCase() !== "CANCELLED" && !cancelledReasons[String(s.id)]);
        const cancelledDaySales = daySales.filter(s => String(s.status||"").toUpperCase() === "CANCELLED" || cancelledReasons[String(s.id)]);

        // Acumulado por turnos del día seleccionado
        const matSales = activeDaySales.filter(s => getShiftCategory(s) === "matutino");
        const vesSales = activeDaySales.filter(s => getShiftCategory(s) === "vespertino");
        
        // Ventas del turno en curso del usuario
        const isCurrentMat = String(S.shift||"").toLowerCase().includes("mañana") || String(S.shift||"").toLowerCase().includes("matutino");
        const isCurrentVes = String(S.shift||"").toLowerCase().includes("tarde") || String(S.shift||"").toLowerCase().includes("vespertino");
        const currentTurnSales = S.isSU 
            ? activeDaySales 
            : (isCurrentMat ? matSales : (isCurrentVes ? vesSales : activeDaySales.filter(s => String(s.shift_name||"").toLowerCase() === String(S.shift||"").toLowerCase())));

        const totalDayActive = activeDaySales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const cashDaySales = activeDaySales.filter(s => (s.payment_method || "cash") === "cash");
        const cardDaySales = activeDaySales.filter(s => s.payment_method === "card");
        const totalCashDay = cashDaySales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const totalCardDay = cardDaySales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const totalCurrentTurn = currentTurnSales.reduce((acc,s) => acc + Number(s.total||0), 0);

        // Filtrado de lista a mostrar
        const isShowingCancelled = S.salesTab === "cancelled";
        let targetList = isShowingCancelled ? cancelledDaySales : activeDaySales;

        if (selectedShiftFilter !== "all") {
            targetList = targetList.filter(s => getShiftCategory(s) === selectedShiftFilter);
        }

        c.innerHTML = `
        <!-- TARJETAS DE CONTROL DE CAJA Y ACUMULADOS POR TURNO Y MÉTODO DE PAGO -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:18px">
            <div class="dashboard-card" style="background:linear-gradient(135deg,#230408,#5c121b);color:#fff;border:1.5px solid var(--gold-400);padding:18px;border-radius:16px;box-shadow:var(--shadow-card)">
                <span style="font-size:9.5px;font-weight:900;color:#fef08a;letter-spacing:1px;display:block">TOTAL VENDIDO HOY</span>
                <div style="font-size:26px;font-weight:900;color:#ffffff;margin:4px 0">${money(totalDayActive)}</div>
                <small style="color:#fde68a">${activeDaySales.length} tickets activos en el día</small>
            </div>
            <div class="dashboard-card" style="padding:18px;border-radius:16px;background:linear-gradient(145deg,#f0fdf4,#dcfce7);border:1.5px solid #86efac;box-shadow:var(--shadow-card)">
                <span style="font-size:9.5px;font-weight:900;color:#166534;letter-spacing:1px;display:block">💵 COBRADO EN EFECTIVO</span>
                <div style="font-size:22px;font-weight:900;color:#15803d;margin:4px 0">${money(totalCashDay)}</div>
                <small style="color:#166534;font-weight:800">${cashDaySales.length} tickets en caja física</small>
            </div>
            <div class="dashboard-card" style="padding:18px;border-radius:16px;background:linear-gradient(145deg,#eff6ff,#dbeafe);border:1.5px solid #93c5fd;box-shadow:var(--shadow-card)">
                <span style="font-size:9.5px;font-weight:900;color:#1e40af;letter-spacing:1px;display:block">💳 COBRADO CON TARJETA</span>
                <div style="font-size:22px;font-weight:900;color:#1d4ed8;margin:4px 0">${money(totalCardDay)}</div>
                <small style="color:#1e40af;font-weight:800">${cardDaySales.length} tickets en terminal</small>
            </div>
            <div class="dashboard-card" style="padding:18px;border-radius:16px;background:linear-gradient(145deg,#fffef9,#fceecc);border:1.5px solid #d9c7a9;box-shadow:var(--shadow-card)">
                <span style="font-size:9.5px;font-weight:900;color:#854d0e;letter-spacing:1px;display:block">✨ EN TU TURNO (${esc(S.shift)})</span>
                <div style="font-size:22px;font-weight:900;color:var(--wine-900);margin:4px 0">${money(totalCurrentTurn)}</div>
                <small style="color:var(--wine-800);font-weight:800">${currentTurnSales.length} tickets en tu jornada</small>
            </div>
        </div>

        <!-- BARRA DE FILTRO POR CALENDARIO Y ESTADOS -->
        <div class="dashboard-card" style="padding:14px 18px;border-radius:16px;margin-bottom:18px;background:linear-gradient(145deg,#fffef9,#fceecc);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                <div style="display:flex;align-items:center;gap:6px">
                    <label style="font-size:11px;font-weight:900;color:var(--wine-900)">📅 FILTRAR FECHA:</label>
                    <input type="date" id="sales-date-picker" value="${selectedDate}"
                        style="padding:6px 10px;border:1.5px solid var(--gold-500);border-radius:8px;font-size:12px;font-weight:800;background:#fff;outline:none;color:#1a0205">
                </div>
                <div style="display:flex;align-items:center;gap:6px">
                    <label style="font-size:11px;font-weight:900;color:var(--wine-900)">FILTRAR TURNO:</label>
                    <select id="sales-shift-filter" style="padding:6px 10px;border:1.5px solid var(--gold-500);border-radius:8px;font-size:12px;font-weight:800;background:#fff;outline:none;color:#1a0205">
                        <option value="all"${selectedShiftFilter==='all'?' selected':''}>Todos los turnos</option>
                        <option value="matutino"${selectedShiftFilter==='matutino'?' selected':''}>Solo Matutino</option>
                        <option value="vespertino"${selectedShiftFilter==='vespertino'?' selected':''}>Solo Vespertino</option>
                    </select>
                </div>
            </div>

            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                <div style="display:flex;gap:4px;background:#fff;padding:4px;border-radius:20px;border:1px solid rgba(188,132,10,.35)">
                    <button type="button" class="btn-sales-tab" data-tab="active" style="padding:6px 14px;border-radius:15px;border:none;font-weight:800;font-size:11px;cursor:pointer;background:${!isShowingCancelled?'var(--wine-700)':'transparent'};color:${!isShowingCancelled?'#fff':'var(--wine-800)'}">✓ Activas (${activeDaySales.length})</button>
                    <button type="button" class="btn-sales-tab" data-tab="cancelled" style="padding:6px 14px;border-radius:15px;border:none;font-weight:800;font-size:11px;cursor:pointer;background:${isShowingCancelled?'#b91c1c':'transparent'};color:${isShowingCancelled?'#fff':'var(--wine-800)'}">🚫 Canceladas (${cancelledDaySales.length})</button>
                </div>
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-rel-sales" style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:8px;cursor:pointer;font-weight:bold">🔄 Actualizar</button>
            </div>
        </div>

        <!-- LISTA DE TICKETS Y VENTAS -->
        ${targetList.length
            ? `<div style="display:flex;flex-direction:column;gap:12px">
                ${targetList.map(s => {
                    const isCan = String(s.status||"").toUpperCase() === "CANCELLED" || cancelledReasons[String(s.id)];
                    const reason = s.cancel_reason || cancelledReasons[String(s.id)] || "Sin motivo especificado";
                    const tickNum = s.sale_number || ("TICK-" + String(s.id).substring(0,8));
                    const isCard = s.payment_method === "card";
                    return `<article class="sale-card" style="background:#fff;border:1px solid rgba(188,132,10,.35);border-radius:12px;padding:16px${isCan ? ";border-left:5px solid #b91c1c" : ""}">
                        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                            <div>
                                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                                    <span style="font-size:18px">${isCan?'🚫':'🧾'}</span>
                                    <strong style="font-size:14px;color:var(--wine-900)">Ticket #${esc(tickNum)}</strong>
                                    <span style="font-size:10px;padding:2px 8px;border-radius:10px;font-weight:bold;
                                        background:${isCan ? "#fee2e2;color:#991b1b" : "#dcfce7;color:#15803d"}">
                                        ${isCan ? "CANCELADA" : "COMPLETADA"}</span>
                                    <span style="font-size:10px;background:${isCard?'#dbeafe;color:#1e40af;border:1px solid #93c5fd':'#dcfce7;color:#166534;border:1px solid #86efac'};padding:2px 8px;border-radius:6px;font-weight:900">
                                        ${isCard ? '💳 TARJETA' : '💵 EFECTIVO'}
                                    </span>
                                    <span style="font-size:10px;background:#fef3c7;color:#854d0e;padding:2px 8px;border-radius:6px;font-weight:800">
                                        Turno: ${esc(s.shift_name || S.shift)}</span>
                                </div>
                                <div style="font-size:11px;color:var(--text-muted);margin-top:4px">🕐 <strong>${fdt(s.created_at)}</strong> • Cobrado por: <strong>${esc(s.cashier_name || "Encargada")}</strong></div>
                                ${s.items && s.items.length ? `
                                    <div style="font-size:11px;color:#4b5563;margin-top:4px">
                                        📦 ${s.items.map(it => `${it.quantity}x ${esc(it.product_name)}`).join(", ")}
                                    </div>` : ""}
                                ${isCan ? `<div style="font-size:12px;color:#991b1b;background:#fef2f2;padding:6px 10px;border-radius:6px;margin-top:6px;font-weight:700">
                                    Motivo de cancelación: ${esc(reason)}</div>` : ''}
                            </div>
                            <div style="display:flex;align-items:center;gap:12px">
                                <div style="text-align:right">
                                    <div style="font-size:18px;font-weight:900;color:${isCan ? "#b91c1c" : "var(--wine-700)"}">${money(s.total)}</div>
                                    <small style="color:${isCard?'#1e40af':'#166534'};font-weight:800">${isCard?'💳 Pago Tarjeta':'💵 Pago Efectivo'}</small>
                                </div>
                                <button type="button" class="btn-print-sale" data-id="${esc(s.id)}"
                                    style="padding:6px 12px;background:#fef3c7;color:#854d0e;border:1.5px solid #fcd34d;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;display:flex;align-items:center;gap:4px">
                                    🖨️ Ticket
                                </button>
                                ${!isCan ? `<button type="button" class="btn-can-sale"
                                    data-id="${esc(s.id)}" data-num="${esc(tickNum)}"
                                    style="padding:6px 14px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">
                                    Cancelar</button>` : ""}
                                ${S.isSU ? `<button type="button" class="btn-del-sale-perm" data-id="${esc(s.id)}" data-num="${esc(tickNum)}"
                                    style="padding:5px 10px;background:#fef2f2;color:#b91c1c;border:1px dashed #f87171;border-radius:6px;font-weight:800;font-size:10px;cursor:pointer" title="Eliminar registro (Solo Superusuarios)">
                                    🗑 Borrar</button>` : ''}
                            </div>
                        </div>
                    </article>`;
                }).join("")}
               </div>`
            : `<div class="empty-state" style="padding:40px;text-align:center">
                <div style="font-size:40px">${isShowingCancelled?'🚫':'🪙'}</div>
                <h3 style="color:#ffffff;margin:6px 0">${isShowingCancelled?'No hay ventas canceladas en esta fecha y turno':'Sin ventas registradas en esta fecha y turno'}</h3>
               </div>`}`;

        document.getElementById("sales-date-picker")?.addEventListener("change", async e => {
            S.salesFilterDate = e.target.value;
            await loadSales();
        });

        document.getElementById("sales-shift-filter")?.addEventListener("change", async e => {
            S.salesFilterShift = e.target.value;
            await loadSales();
        });

        c.querySelectorAll(".btn-sales-tab").forEach(btn => btn.addEventListener("click", async () => {
            S.salesTab = btn.dataset.tab;
            await loadSales();
        }));

        document.getElementById("btn-rel-sales")?.addEventListener("click", async () => {
            await loadSales();
            toast("Ventas actualizadas.", "info");
        });

        c.querySelectorAll(".btn-print-sale").forEach(btn => btn.addEventListener("click", () => {
            const sid = String(btn.dataset.id);
            const targetSale = targetList.find(x => String(x.id) === sid) || allSales.find(x => String(x.id) === sid);
            if (targetSale) printSaleReceipt(targetSale);
        }));

        c.querySelectorAll(".btn-can-sale").forEach(btn => btn.addEventListener("click", async () => {
            const reason = await toastPrompt(`Motivo de cancelación del Ticket #${btn.dataset.num}:\n(Quedará archivado en el apartado de canceladas y no afectará el corte)`, "Escribe el motivo…");
            if (!reason) return;

            const reasons = lr("cancelled_reasons", {});
            reasons[String(btn.dataset.id)] = reason;
            lw("cancelled_reasons", reasons);
            gw("cancelled_reasons", reasons);

            const lSales = lr("sales", []);
            const target = lSales.find(x => String(x.id) === String(btn.dataset.id));
            if (target) {
                target.status = "CANCELLED";
                target.cancel_reason = reason;
                lw("sales", lSales);
            }

            const gSales = gr("all_sales", []);
            const gTarget = gSales.find(x => String(x.id) === String(btn.dataset.id));
            if (gTarget) {
                gTarget.status = "CANCELLED";
                gTarget.cancel_reason = reason;
                gw("all_sales", gSales);
            }

            if (db) {
                try {
                    await db.from("sales").update({status: "CANCELLED"}).eq("id", btn.dataset.id);
                } catch(e) {}
            }

            toast(`Ticket #${btn.dataset.num} cancelado. Motivo registrado en el apartado de canceladas.`, "info", 5000);
            await loadSales();
            if (S.isSU) {
                await loadPrivateAccess(true);
                await loadAccounting(true);
            }
        }));

        c.querySelectorAll(".btn-del-sale-perm").forEach(btn => btn.addEventListener("click", async () => {
            const ok = await toastConfirm(`[Superusuario] ¿Eliminar permanentemente el registro del Ticket #${btn.dataset.num}?`);
            if (!ok) return;

            let lSales = lr("sales", []);
            lSales = lSales.filter(x => String(x.id) !== String(btn.dataset.id));
            lw("sales", lSales);

            let gSales = gr("all_sales", []);
            gSales = gSales.filter(x => String(x.id) !== String(btn.dataset.id));
            gw("all_sales", gSales);

            if (db) {
                try { await db.from("sales").delete().eq("id", btn.dataset.id); } catch(e) {}
            }
            toast(`Registro del ticket #${btn.dataset.num} eliminado.`, "success");
            await loadSales();
            if (S.isSU) {
                await loadPrivateAccess(true);
                await loadAccounting(true);
            }
        }));
    }

    /* ── CORTES DE CAJA (ALERTA ROJA POR DESCUADRE & FILTRO DOBLE) ── */
    async function loadCuts() {
        const c = $("#cuts-container");
        if (!c || !S.branchId) return;
        c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div></div>`;

        const localSales = lr("sales", []);
        const cancelled = lr("cancelled_reasons", {});
        const todayStr = new Date().toISOString().slice(0,10);

        const systemSalesToday = localSales.filter(s => {
            const sDate = (s.created_at || "").slice(0,10);
            const notCan = !cancelled[String(s.id)] && String(s.status||"").toUpperCase() !== "CANCELLED";
            const matchShift = String(s.shift_name || "").toLowerCase() === S.shift.toLowerCase();
            return sDate === todayStr && notCan && matchShift;
        });

        const systemCashSales = systemSalesToday.filter(s => (s.payment_method || "cash") === "cash").reduce((a,s) => a + Number(s.total||0), 0);
        const systemCardSales = systemSalesToday.filter(s => s.payment_method === "card").reduce((a,s) => a + Number(s.total||0), 0);
        const systemTotalSold = systemSalesToday.reduce((acc,s) => acc + Number(s.total||0), 0);

        let remoteCuts = [];
        if (db) {
            try {
                const {data, error} = await db.from("cash_cuts").select("*").order("created_at", {ascending:false});
                if (data && data.length) {
                    remoteCuts = data.map(ct => {
                        let obs = {};
                        try {
                            obs = typeof ct.observations === "string" ? JSON.parse(ct.observations) : (ct.observations || {});
                        } catch(e) {}
                        return {
                            id: ct.id,
                            company_id: ct.company_id,
                            branch_id: ct.branch_id,
                            branch_name: obs.branch_name || S.branches.find(b=>String(b.id)===String(ct.branch_id))?.name || "Sucursal",
                            shift_name: obs.shift_name || "Mañana",
                            performed_by: ct.performed_by,
                            performed_by_name: obs.performed_by_name || "Encargada",
                            opening_amount: obs.opening_amount != null ? Number(obs.opening_amount) : (Number(ct.counted_cash||0) - Number(ct.total_sales||0)),
                            total_sales: Number(ct.total_sales || 0),
                            cash_sales: obs.cash_sales != null ? Number(obs.cash_sales) : Number(ct.total_sales || 0),
                            card_sales: obs.card_sales != null ? Number(obs.card_sales) : 0,
                            system_total_sales: obs.system_total_sales != null ? Number(obs.system_total_sales) : Number(ct.total_sales || 0),
                            expected_cash: Number(ct.expected_cash || 0),
                            counted_cash: Number(ct.counted_cash || 0),
                            net_sales_without_fund: obs.net_sales_without_fund != null ? Number(obs.net_sales_without_fund) : (Number(ct.counted_cash||0) - Number(obs.opening_amount||0)),
                            difference: Number(ct.difference || 0),
                            created_at: ct.created_at,
                            local_id: obs.local_id || ct.id
                        };
                    });
                }
            } catch(e) {
                console.warn("Error cargando cortes de Supabase:", e);
            }
        }
        const localCuts = lr("cuts", []);
        const globalCuts = gr("all_cuts", []);

        const cutsMap = new Map();
        localCuts.forEach(ct => cutsMap.set(String(ct.id), ct));
        globalCuts.forEach(ct => { if(!cutsMap.has(String(ct.id))) cutsMap.set(String(ct.id), ct); });
        remoteCuts.forEach(ct => { if(!cutsMap.has(String(ct.id))) cutsMap.set(String(ct.id), ct); });

        let allCuts = Array.from(cutsMap.values()).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));

        if (S.cutBranchFilter !== "all") {
            allCuts = allCuts.filter(x => String(x.branch_id) === String(S.cutBranchFilter) || String(x.branch_name).toLowerCase().includes(String(S.cutBranchFilter).toLowerCase()));
        } else if (!S.isSU) {
            allCuts = allCuts.filter(x => String(x.branch_id) === String(S.branchId));
        }

        let filteredCuts = allCuts;
        if (S.cutShiftTab === "Mañana") {
            filteredCuts = allCuts.filter(x => String(x.shift_name||"").toLowerCase().includes("mañana") || String(x.shift_name||"").toLowerCase().includes("matutino"));
        } else if (S.cutShiftTab === "Tarde") {
            filteredCuts = allCuts.filter(x => String(x.shift_name||"").toLowerCase().includes("tarde") || String(x.shift_name||"").toLowerCase().includes("vespertino"));
        }

        c.innerHTML = `
        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:14px">
                <div>
                    <h3 style="color:var(--wine-900);margin:0 0 4px">✂️ Realizar Corte de Caja</h3>
                    <p style="color:var(--text-muted);font-size:12px;margin:0">
                        Sucursal: <strong>${esc(S.branchName)}</strong> • Turno Actual: <strong style="color:var(--wine-700)">${esc(S.shift)}</strong></p>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                    <div style="background:#f0fdf4;border:1.5px solid #86efac;padding:8px 12px;border-radius:10px;text-align:right">
                        <small style="color:#166534;font-size:9.5px;font-weight:900;display:block">💵 EFECTIVO SISTEMA</small>
                        <strong style="font-size:15px;color:#15803d">${money(systemCashSales)}</strong>
                    </div>
                    <div style="background:#eff6ff;border:1.5px solid #93c5fd;padding:8px 12px;border-radius:10px;text-align:right">
                        <small style="color:#1e40af;font-size:9.5px;font-weight:900;display:block">💳 TARJETAS SISTEMA</small>
                        <strong style="font-size:15px;color:#1d4ed8">${money(systemCardSales)}</strong>
                    </div>
                    <div style="background:#fff8e0;border:1.5px solid var(--gold-400);padding:8px 12px;border-radius:10px;text-align:right">
                        <small style="color:var(--text-muted);font-size:9.5px;font-weight:900;display:block">TOTAL TURNO (${systemSalesToday.length} TICKETS)</small>
                        <strong style="font-size:15px;color:var(--wine-900)">${money(systemTotalSold)}</strong>
                    </div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:14px">
                <div>
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">
                        1. DINERO CON QUE INICIÓ EL TURNO ($)
                    </label>
                    <input type="number" id="cut-open" step="1" min="0" placeholder="Ej: 1500.00"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:14px;box-sizing:border-box">
                    <small style="color:var(--text-muted);font-size:10px">Fondo inicial en efectivo</small>
                </div>
                <div>
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">
                        2. TOTAL VENDIDO EN EL TURNO ($)
                    </label>
                    <input type="number" id="cut-sold" step="1" min="0" value="${systemTotalSold > 0 ? systemTotalSold : ''}" placeholder="Ej: 13000.00"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:14px;box-sizing:border-box">
                    <small style="color:var(--text-muted);font-size:10px">Suma total (Efectivo + Tarjetas)</small>
                </div>
                <div>
                    <label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">
                        3. EFECTIVO FÍSICO CONTADO EN CAJA ($)
                    </label>
                    <input type="number" id="cut-count" step="1" min="0" placeholder="Ej: 14500.00"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:14px;box-sizing:border-box">
                    <small style="color:var(--text-muted);font-size:10px">Monedas y billetes presentes</small>
                </div>
            </div>

            <div id="cut-preview-box" style="background:#fffcf2;border:2px solid var(--gold-400);border-radius:14px;padding:16px;margin-bottom:16px;">
                <div style="font-size:12px;font-weight:900;color:var(--wine-800);margin-bottom:8px;letter-spacing:1px">
                    📊 VISTA PREVIA DEL CORTE:
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
                    <div style="background:#fff;padding:10px;border-radius:10px;border:1px solid rgba(188,132,10,.25)">
                        <small style="color:var(--text-muted);font-size:10px;font-weight:800;display:block">EFECTIVO ESPERADO EN CAJA</small>
                        <strong id="prev-exp" style="font-size:16px;color:var(--wine-900)">$0.00</strong>
                        <div style="font-size:10px;color:var(--text-muted)">(Fondo + Ventas en Efectivo)</div>
                    </div>
                    <div style="background:#eff6ff;padding:10px;border-radius:10px;border:1.5px solid #93c5fd">
                        <small style="color:#1e40af;font-size:10px;font-weight:800;display:block">💳 COBROS CON TARJETA (BANCO)</small>
                        <strong style="font-size:16px;color:#1d4ed8">${money(systemCardSales)}</strong>
                        <div style="font-size:10px;color:#1e40af">Terminal bancaria / Directo</div>
                    </div>
                    <div style="background:#fff;padding:10px;border-radius:10px;border:1px solid rgba(188,132,10,.25)">
                        <small style="color:var(--text-muted);font-size:10px;font-weight:800;display:block">CORTE NETO EFECTIVO (SIN FONDO)</small>
                        <strong id="prev-net" style="font-size:16px;color:var(--wine-700)">$0.00</strong>
                        <div style="font-size:10px;color:var(--text-muted)">(Efectivo contado − Fondo)</div>
                    </div>
                    <div style="background:#fff;padding:10px;border-radius:10px;border:1px solid rgba(188,132,10,.25)">
                        <small style="color:var(--text-muted);font-size:10px;font-weight:800;display:block">ESTATUS & DESCUADRE</small>
                        <strong id="prev-status" style="font-size:13px;color:#15803d">Esperando datos…</strong>
                        <div id="prev-diff" style="font-size:11px;font-weight:900;margin-top:2px"></div>
                    </div>
                </div>
            </div>

            <button type="button" id="btn-do-cut"
                style="padding:12px 32px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:800;font-size:14px;cursor:pointer">
                ✂️ Guardar y Cerrar Corte de Caja</button>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
            <div>
                <h3 style="color:#ffffff;margin:0;font-weight:900">Historial de Cortes Registrados</h3>
                <small style="color:#fcebd2">Filtrado por turno y sucursal</small>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                ${S.isSU ? `
                <select id="cut-branch-filter" style="padding:6px 12px;border-radius:12px;border:1.5px solid var(--gold-500);font-weight:700;font-size:12px;background:#fff;outline:none">
                    <option value="all"${S.cutBranchFilter==='all'?' selected':''}>🏢 Todas las Sucursales</option>
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(S.cutBranchFilter)===String(b.id)?' selected':''}>${esc(b.name)}</option>`).join("")}
                </select>` : ''}
                <div style="display:flex;gap:4px;background:#fff;padding:4px;border-radius:20px;border:1px solid rgba(188,132,10,.35)">
                    <button type="button" class="btn-cut-tab${S.cutShiftTab==='todos'?' cat-tab-active':''}" data-tab="todos" style="padding:5px 14px;border-radius:15px;border:none;font-weight:800;font-size:11px;cursor:pointer;background:${S.cutShiftTab==='todos'?'var(--wine-700)':'transparent'};color:${S.cutShiftTab==='todos'?'#fff':'var(--wine-800)'}">Todos (${allCuts.length})</button>
                    <button type="button" class="btn-cut-tab${S.cutShiftTab==='Mañana'?' cat-tab-active':''}" data-tab="Mañana" style="padding:5px 14px;border-radius:15px;border:none;font-weight:800;font-size:11px;cursor:pointer;background:${S.cutShiftTab==='Mañana'?'var(--wine-700)':'transparent'};color:${S.cutShiftTab==='Mañana'?'#fff':'var(--wine-800)'}">🌅 Matutino</button>
                    <button type="button" class="btn-cut-tab${S.cutShiftTab==='Tarde'?' cat-tab-active':''}" data-tab="Tarde" style="padding:5px 14px;border-radius:15px;border:none;font-weight:800;font-size:11px;cursor:pointer;background:${S.cutShiftTab==='Tarde'?'var(--wine-700)':'transparent'};color:${S.cutShiftTab==='Tarde'?'#fff':'var(--wine-800)'}">🌇 Vespertino</button>
                </div>
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-rel-cuts" style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:8px;cursor:pointer;font-weight:bold">🔄 Actualizar</button>
            </div>
        </div>

        ${filteredCuts.length
            ? `<div style="display:flex;flex-direction:column;gap:12px">
                ${filteredCuts.map(ct => {
                    const diff = Number(ct.difference || 0);
                    const hasDiff = diff !== 0;
                    const netSale = Number(ct.net_sales_without_fund != null ? ct.net_sales_without_fund : (Number(ct.counted_cash||0) - Number(ct.opening_amount||0)));
                    const isMorning = String(ct.shift_name||"").toLowerCase().includes("mañana") || String(ct.shift_name||"").toLowerCase().includes("matutino");
                    const cutCard = Number(ct.card_sales || 0);
                    const cutCash = Number(ct.cash_sales || (Number(ct.total_sales||0) - cutCard));
                    return `<article class="sale-card" style="background:#fff;border:1.5px solid ${hasDiff?'#f87171':'rgba(188,132,10,.35)'};border-radius:14px;padding:16px;${hasDiff?'box-shadow:0 4px 18px rgba(185,28,28,.12)':''}">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px">
                            <div>
                                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                                    <span style="font-size:18px">✂️</span>
                                    <strong style="font-size:15px;color:var(--wine-900)">Corte — ${esc(ct.branch_name || S.branchName)}</strong>
                                    <span style="font-size:11px;padding:2px 10px;border-radius:12px;font-weight:bold;background:${isMorning?'#fef3c7;color:#92400e':'#e0e7ff;color:#3730a3'}">
                                        ${isMorning ? '🌅 Matutino' : '🌇 Vespertino'}
                                    </span>
                                </div>
                                <div style="font-size:11px;color:var(--text-muted);margin-top:4px">🕐 <strong>${fdt(ct.created_at)}</strong> • Por: ${esc(ct.performed_by_name || "Encargada")}</div>
                                <div style="font-size:12px;margin-top:8px;display:flex;gap:14px;flex-wrap:wrap">
                                    <span>Fondo Inicial: <strong>${money(ct.opening_amount||0)}</strong></span>
                                    <span>💵 Efectivo Cobrado: <strong style="color:#15803d">${money(cutCash)}</strong></span>
                                    <span>💳 Tarjetas: <strong style="color:#1d4ed8">${money(cutCard)}</strong></span>
                                    <span>Total Contado en Caja: <strong>${money(ct.counted_cash||0)}</strong></span>
                                </div>
                                <div style="font-size:13px;margin-top:6px;color:var(--wine-800);font-weight:900">
                                    Corte Final Efectivo (sin fondo): ${money(netSale)}
                                </div>
                            </div>
                            <div style="text-align:right">
                                <div style="font-size:17px;font-weight:900;color:${diff>=0 && !hasDiff ? '#15803d' : '#b91c1c'}">
                                    ${diff>0?'+':''}${money(diff)}
                                </div>
                                <div style="font-size:12px;font-weight:900;color:${diff>=0 && !hasDiff ? '#15803d' : '#b91c1c'};margin-top:2px">
                                    ${!hasDiff ? '✓ Concuerda Exactamente' : (diff>0 ? '⚠ SOBRANTE EN CAJA' : '⚠ FALTANTE EN CAJA')}
                                </div>
                                <div style="display:flex;gap:6px;justify-content:flex-end;margin-top:8px;flex-wrap:wrap">
                                    <button type="button" class="btn-print-cut" data-id="${esc(ct.id)}"
                                        style="padding:5px 12px;background:#fef3c7;color:#854d0e;border:1.5px solid #fcd34d;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
                                        🖨️ Imprimir Recibo
                                    </button>
                                    ${S.isSU ? `<button type="button" class="btn-del-cut" data-id="${esc(ct.id)}" style="padding:4px 10px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:6px;font-size:10px;font-weight:800;cursor:pointer">🗑 Eliminar</button>` : ''}
                                </div>
                            </div>
                        </div>
                    </article>`;
                }).join("")}
               </div>`
            : `<div class="empty-state" style="padding:40px;text-align:center">
                <div style="font-size:40px">✂️</div>
                <h3 style="color:var(--wine-800);margin:6px 0">No hay cortes registrados con los filtros seleccionados</h3>
               </div>`}`;

        c.querySelectorAll(".btn-cut-tab").forEach(btn => btn.addEventListener("click", async () => {
            S.cutShiftTab = btn.dataset.tab;
            await loadCuts();
        }));

        document.getElementById("cut-branch-filter")?.addEventListener("change", async e => {
            S.cutBranchFilter = e.target.value;
            await loadCuts();
        });

        document.getElementById("btn-rel-cuts")?.addEventListener("click", async () => {
            await loadCuts();
            toast("Cortes actualizados.", "info");
        });

        c.querySelectorAll(".btn-print-cut").forEach(btn => btn.addEventListener("click", () => {
            const cid = String(btn.dataset.id);
            const targetCut = filteredCuts.find(x => String(x.id) === cid) || allCuts.find(x => String(x.id) === cid);
            if (targetCut) printCutReceipt(targetCut);
        }));

        c.querySelectorAll(".btn-del-cut").forEach(btn => btn.addEventListener("click", async () => {
            const ok = await toastConfirm("[Superusuario] ¿Eliminar este registro de corte de caja?");
            if (!ok) return;

            let lCuts = lr("cuts", []);
            lCuts = lCuts.filter(x => String(x.id) !== String(btn.dataset.id));
            lw("cuts", lCuts);

            let gCuts = gr("all_cuts", []);
            gCuts = gCuts.filter(x => String(x.id) !== String(btn.dataset.id));
            gw("all_cuts", gCuts);

            if (db) {
                try { await db.from("cash_cuts").delete().eq("id", btn.dataset.id); } catch(e) {}
            }
            toast("Registro de corte eliminado.", "success");
            await loadCuts();
        }));

        function recalcPreview() {
            const o = Number(document.getElementById("cut-open")?.value) || 0;
            const s = Number(document.getElementById("cut-sold")?.value) || 0;
            const cnt = Number(document.getElementById("cut-count")?.value) || 0;

            const exp = o + systemCashSales;
            const net = cnt - o;
            const diffWithExp = cnt - exp;
            const diffWithSys = s - systemTotalSold;

            const pExp = document.getElementById("prev-exp");
            const pNet = document.getElementById("prev-net");
            const pStat = document.getElementById("prev-status");
            const pDiff = document.getElementById("prev-diff");

            if (pExp) pExp.textContent = money(exp);
            if (pNet) pNet.textContent = money(net);

            if (pStat && pDiff) {
                if (!s && !cnt && !o) {
                    pStat.textContent = "Esperando datos…";
                    pStat.style.color = "var(--text-muted)";
                    pDiff.textContent = "";
                } else if (diffWithSys === 0 && diffWithExp === 0) {
                    pStat.textContent = "✓ Concuerda exactamente con el efectivo esperado";
                    pStat.style.color = "#15803d";
                    pDiff.textContent = "Sin diferencias.";
                    pDiff.style.color = "#15803d";
                } else {
                    let msgs = [];
                    if (diffWithSys !== 0) {
                        msgs.push(diffWithSys > 0 ? `Sobra ${money(diffWithSys)} sobre ventas totales` : `Falta ${money(Math.abs(diffWithSys))} sobre ventas totales`);
                    }
                    if (diffWithExp !== 0) {
                        msgs.push(diffWithExp > 0 ? `Sobrante en caja física: ${money(diffWithExp)}` : `Faltante en caja física: ${money(Math.abs(diffWithExp))}`);
                    }
                    pStat.textContent = "⚠ DESCUADRE REGISTRADO";
                    pStat.style.color = "#b91c1c";
                    pDiff.innerHTML = `<span style="color:#b91c1c;font-weight:900">${msgs.join(" | ")}</span>`;
                }
            }
        }

        ["cut-open","cut-sold","cut-count"].forEach(id => {
            document.getElementById(id)?.addEventListener("input", recalcPreview);
        });

        document.getElementById("btn-do-cut")?.addEventListener("click", async () => {
            const opening = Number(document.getElementById("cut-open")?.value);
            const sold    = Number(document.getElementById("cut-sold")?.value);
            const counted = Number(document.getElementById("cut-count")?.value);

            if ([opening, sold, counted].some(v => isNaN(v) || v < 0)) {
                return toast("Ingresa los 3 valores obligatorios del corte.", "warn");
            }

            const expected = opening + systemCashSales;
            const diff = counted - expected;
            const netWithoutFund = counted - opening;

            const ok = await toastConfirm(`Confirmar Corte de Turno (${S.shift}):\n• Fondo Inicial: ${money(opening)}\n• Cobrado en Efectivo: ${money(systemCashSales)}\n• Cobrado con Tarjeta: ${money(systemCardSales)}\n• Total Vendido: ${money(sold)}\n• Corte Neto Efectivo: ${money(netWithoutFund)}\n• Diferencia en Caja: ${diff>=0?'+':''}${money(diff)}`);
            if (!ok) return;

            const cutRecord = {
                id: "cut_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                company_id: S.companyId,
                branch_id: S.branchId,
                branch_name: S.branchName,
                performed_by: S.user?.id,
                performed_by_name: S.profile?.full_name || S.user?.email || "Encargada",
                shift_name: S.shift,
                opening_amount: opening,
                total_sales: sold,
                cash_sales: systemCashSales,
                card_sales: systemCardSales,
                system_total_sales: systemTotalSold,
                expected_cash: expected,
                counted_cash: counted,
                net_sales_without_fund: netWithoutFund,
                difference: diff,
                created_at: now()
            };

            const localList = lr("cuts", []);
            localList.unshift(cutRecord);
            lw("cuts", localList);

            const globalCuts = gr("all_cuts", []);
            globalCuts.unshift(cutRecord);
            gw("all_cuts", globalCuts);

            if (db) {
                try {
                    const fallbackUUID = "51bc275d-4e19-4115-be3f-42c0ce3dae5a";
                    const defaultBranchUUID = "c188dd82-7faf-41b8-948b-af8e789facba";
                    const defaultUserUUID = "4710b330-566c-45c7-a92e-b7b6a62355af";

                    const bId = uuid(S.branchId) ? S.branchId : defaultBranchUUID;
                    const cId = uuid(S.companyId) ? S.companyId : fallbackUUID;
                    const uId = uuid(S.user?.id) ? S.user.id : defaultUserUUID;

                    const cutObsObj = {
                        branch_name: S.branchName,
                        shift_name: S.shift,
                        performed_by_name: cutRecord.performed_by_name,
                        opening_amount: opening,
                        cash_sales: systemCashSales,
                        card_sales: systemCardSales,
                        net_sales_without_fund: netWithoutFund,
                        system_total_sales: systemTotalSold,
                        local_id: cutRecord.id
                    };

                    const { data, error } = await db.from("cash_cuts").insert({
                        company_id: cId,
                        branch_id: bId,
                        cash_register_id: bId,
                        performed_by: uId,
                        total_sales: sold,
                        expected_cash: expected,
                        counted_cash: counted,
                        difference: diff,
                        observations: JSON.stringify(cutObsObj),
                        created_at: cutRecord.created_at
                    }).select();

                    if (error) console.error("Error al registrar corte en Supabase:", error);
                    else console.log("✓ Corte sincronizado en Supabase:", data);
                } catch(e) {
                    console.error("Excepción al registrar corte en Supabase:", e);
                }
            }

            toast(`✓ Corte de ${S.shift} guardado. Corte neto: ${money(netWithoutFund)}`, diff>=0?"success":"warn", 5000);

            // Imprimir recibo físico del corte de caja
            try {
                printCutReceipt(cutRecord);
            } catch(e) {
                console.warn("No se pudo disparar impresión del corte:", e);
            }

            await loadCuts();
        });
    }

    /* ── CAMBIO DE TURNO (HISTORIAL & BORRADO SUPERUSUARIO) ── */
    async function loadShiftView() {
        const c = $("#shift-container");
        if (!c) return;
        const records = lr("shifts", []);
        const uname = S.profile?.full_name || S.user?.email || "Encargada";

        c.innerHTML = `
        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc)">
            <h3 style="color:var(--wine-900);margin:0 0 6px">🔄 Registrar Cambio / Apertura de Turno</h3>
            <p style="color:var(--text-muted);font-size:12px;margin:0 0 16px">
                Sucursal: <strong>${esc(S.branchName)}</strong> • Turno Asignado: <strong>${esc(S.shift)}</strong></p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:16px">
                <div><label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">ENCARGADA EN TURNO</label>
                    <input type="text" value="${esc(uname)}" readonly
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;background:#f8f8f8;box-sizing:border-box"></div>
                <div><label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">FONDO DE APERTURA RECIBIDO ($)</label>
                    <input type="number" id="sh-amount" step="1" min="0" placeholder="Ej: 500.00"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;box-sizing:border-box"></div>
                <div><label style="font-size:11px;font-weight:900;color:var(--wine-700);display:block;margin-bottom:4px">FECHA Y HORA (AUTOMÁTICA)</label>
                    <input type="text" value="${fdt(now())}" readonly
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:8px;font-size:13px;background:#f8f8f8;box-sizing:border-box"></div>
            </div>
            <button type="button" id="btn-reg-shift"
                style="padding:12px 28px;background:linear-gradient(135deg,var(--wine-800),var(--wine-600));color:#fff;border:none;border-radius:10px;font-weight:800;cursor:pointer">
                ✓ Confirmar e Iniciar Turno</button>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px">
            <h3 style="color:#ffffff;margin:0;font-weight:900">Historial de Aperturas de Turno — ${esc(S.branchName)}</h3>
            <div style="display:flex;gap:8px;align-items:center">
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-rel-shifts" style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:8px;cursor:pointer;font-weight:bold">🔄 Actualizar</button>
            </div>
        </div>
        ${records.length
            ? `<div style="display:flex;flex-direction:column;gap:12px">
                ${records.slice().reverse().map((r, idx) => `
                <article class="sale-card" style="background:#fff;border:1px solid rgba(188,132,10,.35);border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center">
                    <div>
                        <div style="display:flex;align-items:center;gap:8px">
                            <span style="font-size:18px">🔄</span>
                            <strong style="color:var(--wine-900)">${esc(r.user_name||"Encargada")}</strong>
                            <span style="font-size:10px;padding:2px 8px;border-radius:10px;background:#dcfce7;color:#15803d;font-weight:bold">${esc(r.shift||"Turno")}</span>
                        </div>
                        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">🕐 ${esc(r.datetime)}</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                        <div style="text-align:right">
                            <div style="font-size:18px;font-weight:900;color:var(--emerald)">${money(r.amount)}</div>
                            <small style="color:var(--text-muted)">Fondo Inicial</small>
                        </div>
                        <button type="button" class="btn-print-shift" data-idx="${records.length - 1 - idx}"
                            style="padding:6px 12px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1px solid var(--gold-400);border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:4px">
                            🖨️ Ticket
                        </button>
                        ${S.isSU ? `<button type="button" class="btn-del-shift" data-idx="${records.length - 1 - idx}" style="padding:6px 10px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer">🗑 Borrar</button>` : ''}
                    </div>
                </article>`).join("")}
               </div>`
            : `<div class="empty-state" style="padding:40px;text-align:center">
                    <div style="font-size:40px">🔄</div>
                    <p style="color:var(--text-muted)">No hay aperturas de turno registradas aún.</p>
               </div>`}`;

        c.querySelectorAll(".btn-print-shift").forEach(btn => btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.idx, 10);
            const targetRec = records[idx];
            if (targetRec) {
                printShiftOpeningReceipt(targetRec);
                toast("🖨️ Imprimiendo comprobante de apertura…", "info", 3000);
            }
        }));

        document.getElementById("btn-rel-shifts")?.addEventListener("click", async () => {
            await loadShiftView();
            toast("Turnos actualizados.", "info");
        });

        document.getElementById("btn-reg-shift")?.addEventListener("click", async () => {
            const amount = Number(document.getElementById("sh-amount")?.value);
            if (isNaN(amount) || amount < 0) return toast("Ingresa el monto del fondo de apertura.", "warn");
            const ts = now();
            const rec = {user_name: uname, shift: S.shift, branch: S.branchName, amount: amount, datetime: fdt(ts), created_at: ts};
            const recs = lr("shifts", []);
            recs.push(rec);
            lw("shifts", recs);

            if (db) {
                try {
                    await db.from("shift_records").insert({branch_id: S.branchId, user_id: S.user?.id, user_name: uname, shift_name: S.shift, opening_amount: amount, created_at: ts});
                } catch(e) {}
            }
            toast(`✓ Turno iniciado con éxito. Fondo: ${money(amount)}`, "success");
            try { printShiftOpeningReceipt(rec); } catch(e) {}
            await loadShiftView();
        });

        c.querySelectorAll(".btn-del-shift").forEach(btn => btn.addEventListener("click", async () => {
            const ok = await toastConfirm("[Superusuario] ¿Eliminar este registro de cambio de turno?");
            if (!ok) return;
            const idx = parseInt(btn.dataset.idx);
            let recs = lr("shifts", []);
            recs.splice(idx, 1);
            lw("shifts", recs);
            toast("Registro de turno eliminado.", "success");
            await loadShiftView();
        }));
    }

    /* ── CAJA ACTUAL ── */
    async function loadCurrentShift() {
        if (!db || !S.branchId) return null;
        try {
            let q = db.from("open_shift_cash_summary_view").select("*").limit(1);
            if (uuid(S.branchId)) q = q.eq("branch_id", S.branchId);
            const {data} = await q.maybeSingle();
            S.currentShift = data || null;
            const open = S.currentShift && String(S.currentShift.status||"").toUpperCase() === "OPEN";
            setT("#cash-status-text,#cashStatus,[data-cash-status]", open ? `CAJA ABIERTA (${S.shift})` : "CAJA ABIERTA");
            const dot = $("#cash-dot,.cash-dot");
            if (dot) dot.style.background = "#10b981";
        } catch {
            setT("#cash-status-text,#cashStatus,[data-cash-status]", `CAJA ABIERTA (${S.shift})`);
        }
        return S.currentShift;
    }

    /* ── INVENTARIO ── */
    async function loadInventory() {
        const c = $("#inventory-container");
        if (!c) return;
        const branchSelectHtml = S.isSU ? `
            <div style="display:flex;align-items:center;gap:8px">
                <label style="font-size:12px;font-weight:900;color:#fcebd2">📍 SUCURSAL:</label>
                <select id="inv-branch-filter" style="padding:6px 12px;border-radius:10px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;outline:none;color:#1a0205">
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(S.branchId)?' selected':''}>${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        c.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div>
                <strong style="font-size:17px;color:#ffffff;font-weight:900">Inventario de Sucursal — ${esc(S.branchName)}</strong>
                <div style="font-size:12px;color:#fcebd2;margin-top:2px">Capacidad máxima: ${STOCK_MAX} uds. | Alerta por debajo de ${STOCK_LOW} uds.</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${branchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
                <button type="button" id="btn-ref-inv"
                    style="padding:8px 16px;background:linear-gradient(135deg,#fff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:var(--wine-950);box-shadow:0 2px 8px rgba(0,0,0,0.2)">
                    🔄 Actualizar Inventario</button>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">
        ${S.products.map(p => {
            const stock = getStock(p.product_id);
            const isOut = stock === 0;
            const isLow = stock > 0 && stock <= STOCK_LOW;
            const pct = Math.round((stock / STOCK_MAX) * 100);
            const col = isOut ? "#ff6b6b" : isLow ? "#fbbf24" : "#4ade80";
            return `<article class="dashboard-card" style="padding:16px;border-radius:14px;border:1.5px solid var(--border-subtle);background:linear-gradient(180deg,#2e060c 0%,#1f0306 100%)">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
                    <div style="font-size:28px">🍦</div>
                    <div>
                        <small style="color:#fcebd2;font-size:10.5px;font-weight:700">${esc(p.product_code||"")} • <strong style="color:#ffffff">${esc(p.category)}</strong></small>
                        <h4 style="margin:2px 0;color:#ffffff;font-size:14px;font-weight:900">${esc(p.product_name)}</h4>
                    </div>
                </div>
                <div style="background:rgba(255,255,255,0.15);border-radius:6px;height:8px;margin-bottom:8px;overflow:hidden">
                    <div style="height:100%;width:${pct}%;background:${col};border-radius:6px;transition:width .4s ease"></div>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                    <strong style="font-size:20px;color:${col};font-weight:900">${stock}</strong>
                    <small style="color:#ffffff;font-weight:700">/ ${STOCK_MAX} unidades</small>
                    ${isOut ? '<span style="font-size:10px;background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:10px;font-weight:900">SIN STOCK</span>' : ""}
                    ${isLow && !isOut ? '<span style="font-size:10px;background:#fef3c7;color:#b45309;padding:2px 8px;border-radius:10px;font-weight:900">⚠ BAJO</span>' : ""}
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                    <button type="button" class="btn-add-stk" data-id="${esc(p.product_id)}" data-name="${esc(p.product_name)}"
                        style="padding:7px;background:#dcfce7;color:#15803d;border:1px solid #86efac;border-radius:7px;font-weight:800;font-size:11px;cursor:pointer">
                        + Agregar</button>
                    <button type="button" class="btn-set-stk" data-id="${esc(p.product_id)}" data-name="${esc(p.product_name)}"
                        style="padding:7px;background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd;border-radius:7px;font-weight:800;font-size:11px;cursor:pointer">
                        ✎ Ajustar</button>
                </div>
            </article>`;
        }).join("")}
        </div>`;

        document.getElementById("inv-branch-filter")?.addEventListener("change", async e => {
            await changeBranch(e.target.value);
            await loadInventory();
        });

        document.getElementById("btn-ref-inv")?.addEventListener("click", async () => {
            await loadInventory();
            toast("Inventario actualizado.", "info");
        });

        c.querySelectorAll(".btn-add-stk").forEach(btn => btn.addEventListener("click", async () => {
            const cur = getStock(btn.dataset.id);
            const avail = STOCK_MAX - cur;
            if (avail <= 0) return toast(`'${btn.dataset.name}' ya está al máximo (${STOCK_MAX}).`, "warn");
            const val = await toastPrompt(`Agregar stock a '${btn.dataset.name}':\nActual: ${cur} | Máx: ${STOCK_MAX}\nCantidad a agregar (máx ${avail}):`, "Cantidad…");
            const n = parseInt(val);
            if (!Number.isFinite(n) || n <= 0) return;
            if (n > avail) return toast(`Solo puedes agregar hasta ${avail} unidades.`, "warn");
            addStock(btn.dataset.id, n);
            toast(`✓ Stock de '${btn.dataset.name}' actualizado a ${cur + n} unidades.`, "success");
            loadInventory();
        }));

        c.querySelectorAll(".btn-set-stk").forEach(btn => btn.addEventListener("click", async () => {
            const cur = getStock(btn.dataset.id);
            const val = await toastPrompt(`Ajustar stock de '${btn.dataset.name}':\nActual: ${cur}\nNuevo stock total (0 a ${STOCK_MAX}):`, "Nuevo valor…");
            const n = parseInt(val);
            if (!Number.isFinite(n) || n < 0 || n > STOCK_MAX) return toast(`Ingresa un valor entre 0 y ${STOCK_MAX}.`, "warn");
            S.inv[btn.dataset.id] = n;
            lw("inv", S.inv);
            alertInv();
            toast(`✓ Stock de '${btn.dataset.name}' ajustado a ${n} unidades.`, "success");
            loadInventory();
        }));
    }

    /* ── DAÑOS & AVISOS DIRECTIVOS ── */
    async function loadDamageReports() {
        const c = document.getElementById("damage-reports-container");
        if (!c) return;
        c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div></div>`;

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

    /* ── MOTOR UNIFICADO DE VENTAS CONSOLIDADAS (EN VIVO + OFFLINE) ── */
    async function getConsolidatedSalesForChain() {
        const IGNORED_TEST_SALES = new Set([
            "4bd1dff9-876c-420a-abea-2bf038a98b15",
            "db76a364-9102-4ea2-b09f-ac3953245189",
            "2c1d816a-195c-4b4f-928f-9291bb35d0b0",
            "5dcc7cde-0afc-4511-ab15-03edeb768497",
            "1aac230a-8092-44a2-830d-fcd11f88ffdc",
            "TICK-482011",
            "TICK-482012",
            "TICK-482013",
            "TICK-482014",
            "TICK-166807"
        ]);

        let remoteSales = [];
        if (db) {
            try {
                const {data, error} = await db.from("sales")
                    .select("id,company_id,branch_id,shift_id,user_id,sale_number,total,status,observations,created_at")
                    .neq("status","CANCELLED")
                    .order("created_at", {ascending:false});
                if (data && data.length) {
                    remoteSales = data
                        .filter(s => !IGNORED_TEST_SALES.has(String(s.id)) && !IGNORED_TEST_SALES.has(String(s.sale_number)))
                        .map(s => {
                            let obs = {};
                            try {
                                obs = typeof s.observations === "string" ? JSON.parse(s.observations) : (s.observations || {});
                            } catch(e) {}
                            return {
                                id: s.id,
                                sale_number: s.sale_number || ("TICK-" + String(s.id).substring(0,8)),
                                branch_id: s.branch_id,
                                branch_name: obs.branch_name || S.branches.find(b=>String(b.id)===String(s.branch_id))?.name || "Sucursal",
                                shift_name: obs.shift_name || "Mañana",
                                cashier_id: s.user_id,
                                cashier_name: obs.cashier_name || "Encargada",
                                total: Number(s.total || 0),
                                payment_method: obs.payment_method || "cash",
                                status: String(s.status||"").toUpperCase() === "CANCELLED" ? "CANCELLED" : "COMPLETADA",
                                items: obs.items || [],
                                created_at: s.created_at,
                                local_id: obs.local_id || s.id
                            };
                        });
                }
            } catch(e) {
                console.warn("Supabase offline, using local storage", e);
            }
        }

        const allGlobalSales = gr("all_sales", []).filter(s => !IGNORED_TEST_SALES.has(String(s.id)) && !IGNORED_TEST_SALES.has(String(s.sale_number)));
        const cancelledReasons = Object.assign({}, lr("cancelled_reasons", {}), gr("cancelled_reasons", {}));
        const salesMap = new Map();

        // 1. Añadir locales primero (filtrando canceladas)
        allGlobalSales.forEach(s => {
            const isCan = String(s.status||"").toUpperCase() === "CANCELLED" || cancelledReasons[String(s.id)];
            if (!isCan) {
                salesMap.set(String(s.id), s);
            }
        });

        // 2. Fusionar remotas
        remoteSales.forEach(s => {
            const sid = String(s.id);
            const isCan = String(s.status||"").toUpperCase() === "CANCELLED" || cancelledReasons[sid];
            if (!isCan && !salesMap.has(sid)) {
                salesMap.set(sid, s);
            }
        });

        const consolidated = Array.from(salesMap.values()).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        // Actualizar caché global para consistencia
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
        if (!silent) {
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
        const summary = S.branches.map(b => {
            const bs = todaySales.filter(s => String(s.branch_id) === String(b.id) || String(s.branch_name||"").toLowerCase().includes(b.name.toLowerCase()));
            const total = bs.reduce((acc,s) => acc + Number(s.total||0), 0);
            chainTotal += total;
            return { id: b.id, name: b.name, sales: total, orders: bs.length, isOpen: true };
        });

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
                <small style="color:#fcebd2">Tickets emitidos hoy</small>
            </div>
            <div class="dashboard-card" style="padding:22px;border-radius:18px">
                <span class="section-kicker">REPORTES PENDIENTES</span>
                <div style="font-size:30px;font-weight:900;color:${pendingReps.length>0?'#ff6b6b':'#4ade80'};margin:6px 0">${pendingReps.length}</div>
                <small style="color:#fcebd2">Daños o peticiones sin revisar</small>
            </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <h3 style="margin:0;color:#ffffff;font-weight:900">📍 Monitor de Red en Vivo</h3>
            <div style="display:flex;gap:8px">
                <button type="button" id="btn-close-day" style="padding:9px 18px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1px solid var(--gold-400);border-radius:10px;font-weight:900;cursor:pointer">
                    🌙 Finalizar Día & Archivar en Contabilidad</button>
                <button type="button" id="btn-ref-priv" style="padding:9px 18px;background:#fff;border:1.5px solid var(--gold-500);border-radius:10px;font-weight:800;cursor:pointer">
                    🔄 Actualizar</button>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:18px">
        ${summary.map(b => `
            <div style="background:linear-gradient(145deg,#fffef9,#fceecc);border:1.5px solid rgba(188,132,10,.38);border-radius:18px;padding:20px;display:flex;flex-direction:column;justify-content:space-between">
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                        <strong style="font-size:16px;color:var(--wine-900)">🍦 ${esc(b.name)}</strong>
                        <span style="font-size:10px;padding:4px 10px;border-radius:20px;font-weight:bold;background:#dcfce7;color:#15803d">
                            🟢 EN VIVO</span>
                    </div>
                    <div style="background:#fffcf0;border:1px solid #f2e6b5;border-radius:10px;padding:12px;margin-bottom:14px">
                        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                            <span style="font-size:12px;color:var(--text-muted)">Ventas Hoy:</span>
                            <strong style="font-size:15px;color:var(--wine-700)">${money(b.sales)}</strong>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12px;color:var(--text-muted)">Tickets:</span>
                            <span style="font-weight:700;color:var(--wine-900)">${b.orders}</span>
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
                    const bSales = todaySales.filter(s => String(s.branch_id) === String(b.id) || String(s.branch_name||"").toLowerCase().includes(b.name.toLowerCase()));
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
        if (!silent) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando balances y contabilidad sincronizada…</p></div>`;
        }

        const history = gr("accounting_history", []);
        const allSales = await getConsolidatedSalesForChain();

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

        // Si no hay filtro manual explícito o si la fecha filtrada es de un día anterior, actualizar a la fecha de hoy
        if (!S.accHistoryFilterDate) {
            S.accHistoryFilterDate = todayStr;
        }

        const selectedDate = S.accHistoryFilterDate || todayStr;

        const dateSales = (datesMap.get(selectedDate) || []).filter(s => String(s.status||"").toUpperCase() !== "CANCELLED");
        
        // Si la fecha actual ya fue cerrada/archivada, los valores en vivo de contabilidad se muestran restablecidos a $0.00
        const closedDates = gr("closed_business_days", []);
        const isArchivedSelectedDate = closedDates.includes(selectedDate);
        const activeUnarchivedSales = isArchivedSelectedDate 
            ? dateSales.filter(s => !s.is_archived_day) 
            : dateSales;

        const totalSelectedDate = activeUnarchivedSales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const cashSalesChain = activeUnarchivedSales.filter(s => (s.payment_method || "cash") === "cash");
        const cardSalesChain = activeUnarchivedSales.filter(s => s.payment_method === "card");
        const totalCashChain = cashSalesChain.reduce((a,s)=>a+Number(s.total||0), 0);
        const totalCardChain = cardSalesChain.reduce((a,s)=>a+Number(s.total||0), 0);

        const matChainSales = activeUnarchivedSales.filter(s => getShiftCategory(s) === "matutino");
        const vesChainSales = activeUnarchivedSales.filter(s => getShiftCategory(s) === "vespertino");
        const matChainTotal = matChainSales.reduce((a,s)=>a+Number(s.total||0), 0);
        const vesChainTotal = vesChainSales.reduce((a,s)=>a+Number(s.total||0), 0);

        c.innerHTML = `
        <div class="dashboard-card" style="padding:24px;border-radius:18px;margin-bottom:24px;background:linear-gradient(145deg,#fffef9,#fceecc);box-shadow:var(--shadow-card)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px">
                <div>
                    <h3 style="color:var(--wine-900);margin:0;font-weight:900">📊 Gestión de Ventas & Balance Global</h3>
                    <p style="color:var(--text-muted);font-size:12px;margin:3px 0 0;font-weight:700">Informes diarios consolidados por sucursal, turnos y métodos de pago (Efectivo y Tarjeta) sincronizados</p>
                </div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                    <label style="font-size:12px;font-weight:900;color:var(--wine-800)">FECHA:</label>
                    <input type="date" id="acc-date-filter" value="${selectedDate}"
                        style="padding:8px 12px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:13px;font-weight:700;background:#fff;outline:none;color:#1a0205">
                    <button type="button" id="btn-print-daily-acc" style="padding:8px 16px;background:linear-gradient(135deg,#701721,#3b0a10);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)">
                        <span>🖨️</span><span>Imprimir Corte Diario</span>
                    </button>
                    <button type="button" id="btn-ref-acc" style="padding:8px 16px;background:#fff;border:1.5px solid var(--gold-500);border-radius:10px;cursor:pointer;font-weight:bold;font-size:12px">🔄 Actualizar</button>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px">
                <div style="background:#fff;padding:16px;border-radius:14px;border:1.5px solid rgba(188,132,10,.35);box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                    <small style="font-size:10px;font-weight:900;color:var(--text-muted);letter-spacing:1px">VENTA TOTAL DEL DÍA</small>
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

        <h3 style="color:#ffffff;margin:0 0 14px;font-weight:900">🏢 Desglose por Sucursal & Métodos de Pago — ${fd(selectedDate)}</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;margin-bottom:28px">
            ${BRANCH_NAMES.map(bName => {
                const bSales = activeUnarchivedSales.filter(s => String(s.branch_name||"").toLowerCase().includes(bName.toLowerCase()));
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
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
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
               </div>`}`;

        // Event listener para imprimir corte diario seleccionado
        document.getElementById("btn-print-daily-acc")?.addEventListener("click", () => {
            const branchBreakdown = BRANCH_NAMES.map(bName => {
                const bSales = activeUnarchivedSales.filter(s => String(s.branch_name||"").toLowerCase().includes(bName.toLowerCase()));
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
                date: selectedDate,
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
    function setupRealtime() {
        if (!db) return;
        if (realtimeChannel) {
            try { db.removeChannel(realtimeChannel); } catch(e) {}
        }

        try {
            realtimeChannel = db.channel("pos-realtime-master")
                .on("postgres_changes", { event: "*", schema: "public", table: "sales" }, async payload => {
                    console.log("⚡ [Realtime] Evento de ventas:", payload.eventType, payload);

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
                        if (S.isSU) {
                            toast("🗑 Registro de venta eliminado de la red.", "info", 3500);
                        }
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

                            if (S.isSU) {
                                toast(`🚫 Venta #${n.sale_number || n.id} fue cancelada.`, "warn", 3500);
                            }
                        }
                    }

                    // Actualizar automáticamente todas las pantallas activas
                    if (S.view === "private-access" && S.isSU) await loadPrivateAccess(true);
                    else if (S.view === "accounting" && S.isSU) await loadAccounting(true);
                    else if (S.view === "sales") await loadSales();
                    else if (S.view === "cuts") await loadCuts();
                })
                .on("postgres_changes", { event: "*", schema: "public", table: "cash_cuts" }, async payload => {
                    console.log("✂️ [Realtime] Evento de cortes:", payload.eventType, payload);
                    if (payload.eventType === "INSERT" && payload.new) {
                        const n = payload.new;
                        let obs = {};
                        try { obs = typeof n.observations === "string" ? JSON.parse(n.observations) : (n.observations || {}); } catch(e) {}
                        const bName = obs.branch_name || "Sucursal";
                        const shiftN = obs.shift_name || "Turno";
                        if (S.isSU) {
                            toast(`✂️ Nuevo Corte de Caja: ${bName} (${shiftN}) — Total: ${money(n.total_sales)}`, "info", 5000);
                        }
                    }
                    if (S.view === "cuts") await loadCuts();
                    else if (S.view === "private-access" && S.isSU) await loadPrivateAccess(true);
                    else if (S.view === "accounting" && S.isSU) await loadAccounting(true);
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
                    console.log("📡 [Realtime] Estado de conexión:", status);
                });
        } catch(e) {
            console.warn("Realtime error:", e);
        }

        // Heartbeat de auto-sincronización periódica cada 4 segundos
        if (window._syncTimer) clearInterval(window._syncTimer);
        window._syncTimer = setInterval(async () => {
            if (S.user) {
                if (S.view === "private-access" && S.isSU) await loadPrivateAccess(true);
                else if (S.view === "accounting" && S.isSU) await loadAccounting(true);
                else if (S.view === "sales") await loadSales();
                else if (S.view === "cuts") await loadCuts();
            }
        }, 4000);
    }

    /* ── INICIALIZACIÓN ── */
    async function init() {
        if (!initDB()) return;
        const {data} = await db.auth.getSession();
        if (data?.session) {
            S.user = data.session.user;
            await loadBranches();
            await loadProfile();
            await loadProducts();
            await loadCurrentShift();
            initSearch();
            setupRealtime();
            autoReconnectUsbPrinter();
            if (S.isSU && window.changeView) window.changeView("private-access");
            else if (window.changeView) window.changeView("pos");
        } else {
            await loadBranches();
            setupRealtime();
            autoReconnectUsbPrinter();
        }

        db.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN" && session) {
                S.user = session.user;
                await loadBranches();
                await loadProfile();
                await loadProducts();
                await loadCurrentShift();
                initSearch();
                setupRealtime();
            }
            if (event === "SIGNED_OUT") {
                S.user = null; S.profile = null;
                S.cart = []; S.products = [];
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