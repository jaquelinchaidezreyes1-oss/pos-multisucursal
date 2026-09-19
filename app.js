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
        "encargado1@gmail.com":          {b:"La Fuente Calzada", s:"Mañana", r:"Encargada Calzada (Matutino)"},
        "encargado1@lafuente.com":       {b:"La Fuente Calzada", s:"Mañana", r:"Encargada Calzada (Matutino)"},
        "calzadamañana@gmail.com":       {b:"La Fuente Calzada", s:"Mañana", r:"Encargada Calzada (Matutino)"},
        "calzada1@gmail.com":            {b:"La Fuente Calzada", s:"Mañana", r:"Encargada Calzada (Matutino)"},
        "encargado2lafuente@gmail.com":  {b:"La Fuente Calzada", s:"Tarde",  r:"Encargada Calzada (Vespertino)"},
        "encargado2@gmail.com":          {b:"La Fuente Calzada", s:"Tarde",  r:"Encargada Calzada (Vespertino)"},
        "encargado2@lafuente.com":       {b:"La Fuente Calzada", s:"Tarde",  r:"Encargada Calzada (Vespertino)"},
        "calzadatarde@gmail.com":        {b:"La Fuente Calzada", s:"Tarde",  r:"Encargada Calzada (Vespertino)"},
        "calzada2@gmail.com":            {b:"La Fuente Calzada", s:"Tarde",  r:"Encargada Calzada (Vespertino)"},
        "encargado3lafuente@gmail.com":  {b:"Rescate",          s:"Mañana", r:"Encargada Rescate (Matutino)"},
        "encargado4lafuente@gmail.com":  {b:"Rescate",          s:"Tarde",  r:"Encargada Rescate (Vespertino)"},
        "encargado5lafuente@gmail.com":  {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "encargada5lafuente@gmail.com":  {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "encargado5@gmail.com":          {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "encargada5@gmail.com":          {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "encargado5@lafuente.com":       {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "mollotesmañana@gmail.com":      {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "mollotes1@gmail.com":           {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "molloteslafuente@gmail.com":    {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "mollotes@gmail.com":            {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "mollotes@lafuente.com":         {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "lamollotes@gmail.com":          {b:"Mollotes",         s:"Mañana", r:"Encargada Mollotes (Matutino)"},
        "encargado6lafuente@gmail.com":  {b:"Mollotes",         s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "encargada6lafuente@gmail.com":  {b:"Mollotes",         s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "encargado6@gmail.com":          {b:"Mollotes",         s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "encargada6@gmail.com":          {b:"Mollotes",         s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "encargado6@lafuente.com":       {b:"Mollotes",         s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "mollotestardelafuente@gmail.com": {b:"Mollotes",       s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "mollotestarde@gmail.com":       {b:"Mollotes",         s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "mollotes2@gmail.com":           {b:"Mollotes",         s:"Tarde",  r:"Encargada Mollotes (Vespertino)"},
        "encargado7lafuente@gmail.com":  {b:"Tagarete 1",       s:"Mañana", r:"Encargada Tagarete 1 (Matutino)"},
        "encargado7@gmail.com":          {b:"Tagarete 1",       s:"Mañana", r:"Encargada Tagarete 1 (Matutino)"},
        "encargado7@lafuente.com":       {b:"Tagarete 1",       s:"Mañana", r:"Encargada Tagarete 1 (Matutino)"},
        "tagarete1lafuente@gmail.com":   {b:"Tagarete 1",       s:"Mañana", r:"Encargada Tagarete 1 (Matutino)"},
        "tagarete1@gmail.com":           {b:"Tagarete 1",       s:"Mañana", r:"Encargada Tagarete 1 (Matutino)"},
        "tagarete1@lafuente.com":        {b:"Tagarete 1",       s:"Mañana", r:"Encargada Tagarete 1 (Matutino)"},
        "encargado8lafuente@gmail.com":  {b:"Tagarete 1",       s:"Tarde",  r:"Encargada Tagarete 1 (Vespertino)"},
        "encargado8@gmail.com":          {b:"Tagarete 1",       s:"Tarde",  r:"Encargada Tagarete 1 (Vespertino)"},
        "encargado8@lafuente.com":       {b:"Tagarete 1",       s:"Tarde",  r:"Encargada Tagarete 1 (Vespertino)"},
        "tagarete1tardelafuente@gmail.com": {b:"Tagarete 1",    s:"Tarde",  r:"Encargada Tagarete 1 (Vespertino)"},
        "tagarete1tarde@gmail.com":      {b:"Tagarete 1",       s:"Tarde",  r:"Encargada Tagarete 1 (Vespertino)"},
        "encargado9lafuente@gmail.com":  {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "encargada9lafuente@gmail.com":  {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "encargado9@gmail.com":          {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "encargada9@gmail.com":          {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "encargado9@lafuente.com":       {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "tagarete2lafuente@gmail.com":   {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "tagarete2@gmail.com":           {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "tagarete2mañana@gmail.com":      {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "tagarete21@gmail.com":          {b:"Tagarete 2",       s:"Mañana", r:"Encargada Tagarete 2 (Matutino)"},
        "encargado10lafuente@gmail.com": {b:"Tagarete 2",       s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "encargada10lafuente@gmail.com": {b:"Tagarete 2",       s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "encargado10@gmail.com":         {b:"Tagarete 2",       s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "encargada10@gmail.com":         {b:"Tagarete 2",       s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "encargado10@lafuente.com":      {b:"Tagarete 2",       s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "tagarete2tardelafuente@gmail.com": {b:"Tagarete 2",    s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "tagarete2tarde@gmail.com":      {b:"Tagarete 2",       s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "tagarete22@gmail.com":          {b:"Tagarete 2",       s:"Tarde",  r:"Encargada Tagarete 2 (Vespertino)"},
        "encargado11lafuente@gmail.com": {b:"CNOP",             s:"Mañana", r:"Encargada CNOP (Matutino)"},
        "encargada11lafuente@gmail.com": {b:"CNOP",             s:"Mañana", r:"Encargada CNOP (Matutino)"},
        "encargado11@gmail.com":         {b:"CNOP",             s:"Mañana", r:"Encargada CNOP (Matutino)"},
        "encargada11@gmail.com":         {b:"CNOP",             s:"Mañana", r:"Encargada CNOP (Matutino)"},
        "cnoplafuente@gmail.com":        {b:"CNOP",             s:"Mañana", r:"Encargada CNOP (Matutino)"},
        "cnop@gmail.com":                {b:"CNOP",             s:"Mañana", r:"Encargada CNOP (Matutino)"},
        "encargado12lafuente@gmail.com": {b:"CNOP",             s:"Tarde",  r:"Encargada CNOP (Vespertino)"},
        "encargada12lafuente@gmail.com": {b:"CNOP",             s:"Tarde",  r:"Encargada CNOP (Vespertino)"},
        "encargado12@gmail.com":         {b:"CNOP",             s:"Tarde",  r:"Encargada CNOP (Vespertino)"},
        "encargada12@gmail.com":         {b:"CNOP",             s:"Tarde",  r:"Encargada CNOP (Vespertino)"},
        "cnoptardelafuente@gmail.com":   {b:"CNOP",             s:"Tarde",  r:"Encargada CNOP (Vespertino)"},
        "cnoptarde@gmail.com":           {b:"CNOP",             s:"Tarde",  r:"Encargada CNOP (Vespertino)"}
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


    /* ── CLASIFICADOR OFICIAL DE TURNOS (PRIORIDAD: ENCARGADA OFICIAL > NOMBRE DE TURNO > HORA) ── */
    function getShiftCategory(s) {
        if (!s) return "matutino";
        let obs = {};
        try { obs = typeof s.observations === "string" ? JSON.parse(s.observations) : (s.observations || {}); } catch(e) {}

        // 1. Mapeo prioritario oficial por encargada asignada (una encargada vespertina siempre genera ventas de la tarde):
        const cashier = String(obs.cashier_name || obs.performed_by_name || s.cashier_name || s.cashier_id || s.user_name || s.performed_by_name || "").toLowerCase();
        if (/encargad[oa](12|10|8|6|4|2)(?!\d)/i.test(cashier) ||
            cashier.includes("vespertino") || cashier.includes("tarde") || cashier.includes("noche") ||
            cashier.includes("tagarete2tarde") || cashier.includes("tagarete22") ||
            cashier.includes("mollotestarde") || cashier.includes("mollotes2")) {
            return "vespertino";
        }
        if (/encargad[oa](11|9|7|5|3|1)(?!\d)/i.test(cashier) ||
            cashier.includes("matutino") || cashier.includes("mañana") || cashier.includes("maana") ||
            cashier.includes("tagarete2mañana") || cashier.includes("tagarete21") ||
            cashier.includes("mollotesmañana") || cashier.includes("mollotes1")) {
            return "matutino";
        }

        // 2. Detección por nombre explícito de turno
        const sn = String(obs.shift_name || s.shift_name || s.shift || "").toLowerCase();
        if (sn.includes("tarde") || sn.includes("vesp") || sn.includes("noche")) return "vespertino";
        if (sn.includes("mañana") || sn.includes("maana") || sn.includes("mat")) return "matutino";

        // 3. Detección por hora (el turno vespertino inicia a las 15:00 / 3:00 p.m.)
        if (s.created_at) {
            try {
                const dt = new Date(s.created_at);
                if (!isNaN(dt.getTime())) {
                    const hr = dt.getHours();
                    if (hr >= 15 || hr < 6) return "vespertino";
                    return "matutino";
                }
            } catch(e) {}
        }

        return "matutino";
    }

    function normalizeBranchName(str) {
        if (!str) return "";
        return String(str)
            .toLowerCase()
            .replace(/la fuente/g, "")
            .replace(/sucursal/g, "")
            .replace(/[-_]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    /* ── RESOLVEDOR INEQUÍVOCO DE SUCURSAL CANÓNICA ── */
    function resolveCanonicalBranch(ref) {
        if (!ref) return "";
        if (typeof ref === "string") {
            const s = ref.toLowerCase().trim();
            if (s === "branch-4" || s.includes("tagarete 1") || s.includes("tagarete1") || s.includes("tagarete_1") || (s.includes("tagarete") && (s.includes("1") || s.includes("uno"))) || s.includes("encargado7") || s.includes("encargado8")) return "Tagarete 1";
            if (s === "branch-5" || s.includes("tagarete 2") || s.includes("tagarete2") || s.includes("tagarete_2") || (s.includes("tagarete") && (s.includes("2") || s.includes("dos"))) || /encargad[oa]9(?!\d)/i.test(s) || /encargad[oa]10(?!\d)/i.test(s)) return "Tagarete 2";
            if (s === "branch-6" || s.includes("cnop") || s.includes("cenop") || s.includes("encargado11") || s.includes("encargada11") || s.includes("encargado12") || s.includes("encargada12")) return "CNOP";
            if (s === "branch-3" || s.includes("mollotes") || s.includes("molotes") || /encargad[oa]5(?!\d)/i.test(s) || /encargad[oa]6(?!\d)/i.test(s)) return "Mollotes";
            if (s === "branch-2" || s.includes("rescate") || s.includes("encargado3") || s.includes("encargado4")) return "Rescate";
            if (s === "branch-1" || s.includes("calzada") || (/encargad[oa]1(?!\d)/i.test(s) && !s.includes("10") && !s.includes("11") && !s.includes("12")) || /encargad[oa]2(?!\d)/i.test(s)) return "La Fuente Calzada";
            return ref.trim();
        }

        // 1. Identificación directa por ID prioritario de sucursal
        const bId = String(ref.branch_id || ref.id || "").toLowerCase().trim();
        if (bId === "branch-4" || bId.includes("tagarete_1") || bId.includes("tagarete 1")) return "Tagarete 1";
        if (bId === "branch-5" || bId.includes("tagarete_2") || bId.includes("tagarete 2")) return "Tagarete 2";
        if (bId === "branch-6" || bId.includes("cnop")) return "CNOP";
        if (bId === "branch-3" || bId.includes("mollotes") || bId.includes("molotes")) return "Mollotes";
        if (bId === "branch-2" || bId.includes("rescate")) return "Rescate";
        if (bId === "branch-1" || bId.includes("calzada")) return "La Fuente Calzada";

        // 2. Identificación por correo / ID de encargada oficial asignada
        const cInfo = (String(ref.cashier_id || "") + " " + String(ref.cashier_name || "") + " " + String(ref.user_email || "")).toLowerCase();
        if (cInfo.includes("encargado7") || cInfo.includes("encargado8") || cInfo.includes("tagarete 1") || cInfo.includes("tagarete1")) return "Tagarete 1";
        if (/encargad[oa]9(?!\d)/i.test(cInfo) || /encargad[oa]10(?!\d)/i.test(cInfo) || cInfo.includes("tagarete 2") || cInfo.includes("tagarete2") || (cInfo.includes("tagarete") && (cInfo.includes("2") || cInfo.includes("dos")))) return "Tagarete 2";
        if (cInfo.includes("encargado11") || cInfo.includes("encargada11") || cInfo.includes("encargado12") || cInfo.includes("encargada12") || cInfo.includes("cnop")) return "CNOP";
        if (/encargad[oa]5(?!\d)/i.test(cInfo) || /encargad[oa]6(?!\d)/i.test(cInfo) || cInfo.includes("mollotes") || cInfo.includes("molotes")) return "Mollotes";
        if (cInfo.includes("encargado3") || cInfo.includes("encargado4") || cInfo.includes("rescate")) return "Rescate";
        if ((/encargad[oa]1(?!\d)/i.test(cInfo) && !cInfo.includes("10") && !cInfo.includes("11") && !cInfo.includes("12")) || /encargad[oa]2(?!\d)/i.test(cInfo) || cInfo.includes("calzada")) return "La Fuente Calzada";

        // 3. Extracción de observaciones y metadatos con Tagarete 1 prioritario
        let obs = {};
        try { obs = typeof ref.observations === "string" ? JSON.parse(ref.observations) : (ref.observations || {}); } catch(e) {}
        let str = `${ref.name || ""} ${ref.branch_name || ""} ${ref.id || ""} ${ref.branch_id || ""} ${cInfo} ${obs.branch_name || ""} ${obs.cashier_name || ""} ${obs.user_email || ""}`;
        const s = String(str).toLowerCase().trim();

        if (s.includes("branch-4") || s.includes("tagarete 1") || s.includes("tagarete1") || s.includes("tagarete_1") || (s.includes("tagarete") && (s.includes("1") || s.includes("uno")))) return "Tagarete 1";
        if (s.includes("branch-5") || s.includes("tagarete 2") || s.includes("tagarete2") || s.includes("tagarete_2") || (s.includes("tagarete") && (s.includes("2") || s.includes("dos"))) || /encargad[oa]9(?!\d)/i.test(s) || /encargad[oa]10(?!\d)/i.test(s)) return "Tagarete 2";
        if (s.includes("branch-6") || s.includes("cnop") || s.includes("cenop") || s.includes("encargado11") || s.includes("encargada11") || s.includes("encargado12") || s.includes("encargada12")) return "CNOP";
        if (s.includes("branch-3") || s.includes("mollotes") || s.includes("molotes") || /encargad[oa]5(?!\d)/i.test(s) || /encargad[oa]6(?!\d)/i.test(s)) return "Mollotes";
        if (s.includes("branch-2") || s.includes("rescate")) return "Rescate";
        if (s.includes("branch-1") || s.includes("calzada")) return "La Fuente Calzada";

        // 4. Soporte dinámico para cualquier sucursal futura que se habilite
        if (ref.name && String(ref.name).trim()) return String(ref.name).trim();
        if (ref.branch_name && String(ref.branch_name).trim()) return String(ref.branch_name).trim();

        return "";
    }

    function getBranchForSale(sale) {
        return resolveCanonicalBranch(sale);
    }

    function matchesBranch(sale, branchRef) {
        if (!sale) return false;
        if (branchRef === "all" || branchRef?.id === "all") return true;

        const targetCanonical = resolveCanonicalBranch(branchRef);
        const saleCanonical = resolveCanonicalBranch(sale);

        if (targetCanonical && saleCanonical) {
            return targetCanonical === saleCanonical;
        }

        // Fallback por inclusión de subcadenas si no coincide directo
        const t = normalizeBranchName(typeof branchRef === "string" ? branchRef : (branchRef?.name || branchRef?.id || ""));
        const s = normalizeBranchName(saleCanonical || getBranchForSale(sale));
        if (t && s) {
            if (t.includes("tagarete 1") && s.includes("tagarete 1")) return true;
            if (t.includes("tagarete 2") && s.includes("tagarete 2")) return true;
            if (t.includes("rescate") && s.includes("rescate")) return true;
            if (t.includes("cnop") && s.includes("cnop")) return true;
            if (t.includes("calzada") && s.includes("calzada")) return true;
            if (t.includes("mollotes") && s.includes("mollotes")) return true;
        }
        return false;
    }

    function isProductAllowedInBranch(product, bName) {
        if (!product) return false;
        const bCanonical = resolveCanonicalBranch(bName || S.branchName || "calzada");
        const isRescate = bCanonical === "Rescate";
        const isCalzada = bCanonical === "La Fuente Calzada";

        const pid = String(product.product_id || product.id || "").toLowerCase();
        const pName = String(product.product_name || product.name || "").toLowerCase();

        // 1. Exclusivos de El Rescate (Frappé, Sodas Italianas, Waffles)
        const isRescateExclusive = pid.includes("frappe") || pName.includes("frappé") || pName.includes("frappe") ||
                                   pid.includes("sodas_italianas") || pName.includes("soda italiana") || pName.includes("sodas italianas") ||
                                   pid.includes("waffle") || pName.includes("waffle");
        if (isRescateExclusive) {
            return isRescate;
        }

        // 2. Chechis -> En Rescate, Mollotes, Tagarete 1, Tagarete 2, CNOP. (NUNCA en La Fuente Calzada)
        const isChechis = pid.includes("chechis") || pName.includes("chechis");
        if (isChechis) {
            if (isCalzada) return false;
            return true;
        }

        // 3. Reglas explícitas por sucursal personalizada
        if (product.branch_name && product.branch_name !== "General" && product.branch_name !== "all") {
            const pBranchCanonical = resolveCanonicalBranch(product.branch_name);
            if (pBranchCanonical && pBranchCanonical !== bCanonical) {
                return false;
            }
        }

        return true;
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
                    <p style="font-size:14px;color:#520712;font-weight:700;text-align:center;margin:0 0 18px;white-space:pre-line;">${esc(msg)}</p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                        <button id="tc-no"  style="padding:11px;border-radius:10px;border:1.5px solid rgba(188,132,10,.5);background:#fff;font-weight:800;cursor:pointer;font-size:13px;color:#520712">Cancelar</button>
                        <button id="tc-yes" style="padding:11px;border-radius:10px;border:none;background:linear-gradient(135deg,#541118,#991024);color:#fff;font-weight:800;cursor:pointer;font-size:13px">Confirmar</button>
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
                    <p style="font-size:14px;color:#520712;font-weight:700;margin:0 0 12px">${esc(msg)}</p>
                    <textarea id="tp-inp" rows="3" placeholder="${esc(placeholder)}"
                        style="width:100%;padding:10px;border:1.5px solid rgba(188,132,10,.5);border-radius:10px;font-size:13px;box-sizing:border-box;resize:vertical;font-family:inherit"></textarea>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
                        <button id="tp-no"  style="padding:11px;border-radius:10px;border:1.5px solid rgba(188,132,10,.5);background:#fff;font-weight:800;cursor:pointer;font-size:13px">Cancelar</button>
                        <button id="tp-yes" style="padding:11px;border-radius:10px;border:none;background:linear-gradient(135deg,#541118,#991024);color:#fff;font-weight:800;cursor:pointer;font-size:13px">Aceptar</button>
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
        S.isSU = SUPER.some(su => e === su.toLowerCase()) || 
                 e.includes("jaquelin") || 
                 e.includes("ignacio") || 
                 e.includes("director");
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
        const canonicalList = BRANCH_NAMES.map((n,i) => ({id: "branch-"+(i+1), name: n, code: "SUC-"+(i+1)}));
        if (db) {
            try {
                const {data} = await safeQuery(db.from("branches").select("id,name,code,is_active").eq("is_active", true).order("name"), null, 1000);
                if (data && data.length) {
                    const merged = [...data];
                    canonicalList.forEach(cb => {
                        if (!merged.some(b => resolveCanonicalBranch(b) === cb.name)) {
                            merged.push(cb);
                        }
                    });
                    S.branches = merged;
                } else {
                    S.branches = canonicalList;
                }
            } catch {
                S.branches = canonicalList;
            }
        } else {
            S.branches = canonicalList;
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

        const profileName = String(S.profile?.full_name || S.user?.user_metadata?.full_name || S.user?.user_metadata?.name || "").trim().toLowerCase();
        const fullIdentity = (email + " " + profileName).toLowerCase();

        // Detección directa y de máxima prioridad por sucursal oficial y turno:
        // 1. CNOP (Prioridad estricta para evitar solapamiento con encargado1)
        if (fullIdentity.includes("cnop") || fullIdentity.includes("cenop") || /encargad[oa]11(?!\d)/i.test(email) || /encargad[oa]12(?!\d)/i.test(email)) {
            S.branchName = "CNOP";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "CNOP");
            S.branchId = m ? m.id : "branch-6";
            const isVesp = fullIdentity.includes("12") || fullIdentity.includes("tarde") || fullIdentity.includes("vesp") || fullIdentity.includes("vespertino") || fullIdentity.includes("noche");
            S.shift = isVesp ? "Tarde" : "Mañana";
            S.role = isVesp ? "Encargada CNOP (Vespertino)" : "Encargada CNOP (Matutino)";
            return;
        }

        // 2. Tagarete 2 (Prioridad para evitar solapamiento de encargado10 con encargado1)
        if (fullIdentity.includes("tagarete 2") || fullIdentity.includes("tagarete2") || (fullIdentity.includes("tagarete") && (fullIdentity.includes("2") || fullIdentity.includes("dos"))) || /encargad[oa]9(?!\d)/i.test(email) || /encargad[oa]10(?!\d)/i.test(email)) {
            S.branchName = "Tagarete 2";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "Tagarete 2");
            S.branchId = m ? m.id : "branch-5";
            const isVesp = fullIdentity.includes("10") || fullIdentity.includes("tarde") || fullIdentity.includes("vesp") || fullIdentity.includes("vespertino") || fullIdentity.includes("noche") || fullIdentity.includes("tagarete22");
            S.shift = isVesp ? "Tarde" : "Mañana";
            S.role = isVesp ? "Encargada Tagarete 2 (Vespertino)" : "Encargada Tagarete 2 (Matutino)";
            return;
        }

        // 3. Tagarete 1
        if (/encargad[oa]7(?!\d)/i.test(email) || (fullIdentity.includes("tagarete") && (fullIdentity.includes("1") || fullIdentity.includes("uno")) && (fullIdentity.includes("mañana") || fullIdentity.includes("mat")))) {
            S.branchName = "Tagarete 1";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "Tagarete 1");
            S.branchId = m ? m.id : "branch-4";
            S.shift = "Mañana";
            S.role = "Encargada Tagarete 1 (Matutino)";
            return;
        }
        if (/encargad[oa]8(?!\d)/i.test(email) || (fullIdentity.includes("tagarete") && (fullIdentity.includes("1") || fullIdentity.includes("uno")) && (fullIdentity.includes("tarde") || fullIdentity.includes("vesp")))) {
            S.branchName = "Tagarete 1";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "Tagarete 1");
            S.branchId = m ? m.id : "branch-4";
            S.shift = "Tarde";
            S.role = "Encargada Tagarete 1 (Vespertino)";
            return;
        }

        // 4. Rescate
        if (/encargad[oa]3(?!\d)/i.test(email) || (fullIdentity.includes("rescate") && (fullIdentity.includes("mañana") || fullIdentity.includes("mat")))) {
            S.branchName = "Rescate";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "Rescate");
            S.branchId = m ? m.id : "branch-2";
            S.shift = "Mañana";
            S.role = "Encargada Rescate (Matutino)";
            return;
        }
        if (/encargad[oa]4(?!\d)/i.test(email) || (fullIdentity.includes("rescate") && (fullIdentity.includes("tarde") || fullIdentity.includes("vesp")))) {
            S.branchName = "Rescate";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "Rescate");
            S.branchId = m ? m.id : "branch-2";
            S.shift = "Tarde";
            S.role = "Encargada Rescate (Vespertino)";
            return;
        }

        // 5. Mollotes
        if (fullIdentity.includes("mollotes") || fullIdentity.includes("molotes") || /encargad[oa]5(?!\d)/i.test(email) || /encargad[oa]6(?!\d)/i.test(email)) {
            S.branchName = "Mollotes";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "Mollotes");
            S.branchId = m ? m.id : "branch-3";
            const isVesp = fullIdentity.includes("6") || fullIdentity.includes("tarde") || fullIdentity.includes("vesp") || fullIdentity.includes("vespertino") || fullIdentity.includes("noche") || fullIdentity.includes("mollotes2");
            S.shift = isVesp ? "Tarde" : "Mañana";
            S.role = isVesp ? "Encargada Mollotes (Vespertino)" : "Encargada Mollotes (Matutino)";
            return;
        }

        // 6. La Fuente Calzada (Uso estricto de regex para no colisionar con 10, 11 o 12)
        if (/encargad[oa]1(?!\d)/i.test(email) || (email.includes("calzada") && (email.includes("mañana") || email.includes("mat") || email.includes("1")))) {
            S.branchName = "La Fuente Calzada";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "La Fuente Calzada");
            S.branchId = m ? m.id : "branch-1";
            S.shift = "Mañana";
            S.role = "Encargada Calzada (Matutino)";
            return;
        }
        if (/encargad[oa]2(?!\d)/i.test(email) || (email.includes("calzada") && (email.includes("tarde") || email.includes("vesp") || email.includes("2")))) {
            S.branchName = "La Fuente Calzada";
            const m = S.branches.find(b => resolveCanonicalBranch(b) === "La Fuente Calzada");
            S.branchId = m ? m.id : "branch-1";
            S.shift = "Tarde";
            S.role = "Encargada Calzada (Vespertino)";
            return;
        }

        const cfg = STAFF[email];
        if (cfg) {
            S.branchName = cfg.b;
            S.shift = cfg.s;
            S.role = cfg.r;
            const m = S.branches.find(b => resolveCanonicalBranch(b) === resolveCanonicalBranch(cfg.b));
            if (m) S.branchId = m.id;
            else S.branchId = "branch_" + cfg.b.toLowerCase().replace(/\s+/g, "_");
        } else {
            const canon = resolveCanonicalBranch(email) || resolveCanonicalBranch(fullIdentity);
            if (canon && canon !== "La Fuente Calzada") {
                S.branchName = canon;
                const m = S.branches.find(b => resolveCanonicalBranch(b) === canon);
                S.branchId = m ? m.id : (
                    canon === "Tagarete 2" ? "branch-5" :
                    canon === "Mollotes" ? "branch-3" :
                    canon === "CNOP" ? "branch-6" :
                    canon === "Tagarete 1" ? "branch-4" :
                    canon === "Rescate" ? "branch-2" : "branch-1"
                );
                const isVesp = fullIdentity.includes("tarde") || fullIdentity.includes("vesp") || fullIdentity.includes("6") || fullIdentity.includes("10") || fullIdentity.includes("12") || fullIdentity.includes("8") || fullIdentity.includes("4") || fullIdentity.includes("2");
                S.shift = isVesp ? "Tarde" : "Mañana";
                S.role = `Encargada ${canon} (${isVesp ? "Vespertino" : "Matutino"})`;
                return;
            }
            const m = S.branches.find(b => email.includes(b.name.toLowerCase().replace(/\s+/g, "")) || resolveCanonicalBranch(b) === resolveCanonicalBranch(email));
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
        const targetCanonical = resolveCanonicalBranch(id);
        let b = S.branches.find(x => resolveCanonicalBranch(x) === targetCanonical);
        if (!b) {
            b = S.branches.find(x => String(x.id).toLowerCase() === String(id).toLowerCase() || String(x.name).toLowerCase().trim() === String(id).toLowerCase().trim());
        }
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
        S.damageBranchFilter = b.id;
        S.salesCountBranch = b.id;
        S.currentShift = null;
        S.cart = [];
        
        // 3. Recargar el inventario exclusivo de la sucursal seleccionada
        initInv();
        
        updateUI();
        renderSel();
        renderCart();
        alertInv();
        
        // Sincronizar todos los selectores de sucursales en la vista
        document.querySelectorAll("#branch-selector, #inv-branch-filter, #sales-branch-filter, #admin-branch-filter, #cuts-branch-filter, #shift-branch-filter, #sel-damage-branch-filter, #sc-branch-filter").forEach(sel => {
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
        updatePosLiveMovement();
        
        toast("📍 Sucursal activa: " + S.branchName + " (Inventario y Cortes actualizados)", "success", 3000);
    }

    function updateUI() {
        evalSU();
        const email = String(S.user?.email || "").toLowerCase().trim();
        let name = S.profile?.full_name;
        if (!name || name === email || name === "Usuario") {
            if (email.includes("jaquelin") || email === SUPER[0]) {
                name = "Jaquelin Cháidez Reyes";
                S.role = "Directora General";
            } else if (email.includes("ignacio") || email.includes("director") || email === SUPER[1]) {
                name = "Ignacio García La Fuente";
                S.role = "Director General";
            }
            else if (STAFF[email]) name = STAFF[email].r;
            else name = S.role || "Encargada";
        }

        if (!S.isSU) {
            const identityStr = (String(name || "") + " " + email).toLowerCase();
            if ((identityStr.includes("cnop") || identityStr.includes("cenop")) && S.branchName !== "CNOP") {
                S.branchName = "CNOP";
                const m = S.branches.find(b => resolveCanonicalBranch(b) === "CNOP");
                S.branchId = m ? m.id : "branch-6";
                const isVesp = identityStr.includes("12") || identityStr.includes("tarde") || identityStr.includes("vesp") || identityStr.includes("vespertino");
                S.shift = isVesp ? "Tarde" : "Mañana";
                S.role = isVesp ? "Encargada CNOP (Vespertino)" : "Encargada CNOP (Matutino)";
            }
            if ((identityStr.includes("tagarete 2") || identityStr.includes("tagarete2") || (identityStr.includes("tagarete") && (identityStr.includes("2") || identityStr.includes("dos"))) || /encargad[oa]9(?!\d)/i.test(email) || /encargad[oa]10(?!\d)/i.test(email)) && S.branchName !== "Tagarete 2") {
                S.branchName = "Tagarete 2";
                const m = S.branches.find(b => resolveCanonicalBranch(b) === "Tagarete 2");
                S.branchId = m ? m.id : "branch-5";
                const isVesp = identityStr.includes("10") || identityStr.includes("tarde") || identityStr.includes("vesp") || identityStr.includes("vespertino") || identityStr.includes("tagarete22");
                S.shift = isVesp ? "Tarde" : "Mañana";
                S.role = isVesp ? "Encargada Tagarete 2 (Vespertino)" : "Encargada Tagarete 2 (Matutino)";
            }
            if ((identityStr.includes("mollotes") || identityStr.includes("molotes") || /encargad[oa]5(?!\d)/i.test(email) || /encargad[oa]6(?!\d)/i.test(email)) && S.branchName !== "Mollotes") {
                S.branchName = "Mollotes";
                const m = S.branches.find(b => resolveCanonicalBranch(b) === "Mollotes");
                S.branchId = m ? m.id : "branch-3";
                const isVesp = identityStr.includes("6") || identityStr.includes("tarde") || identityStr.includes("vesp") || identityStr.includes("vespertino") || identityStr.includes("mollotes2");
                S.shift = isVesp ? "Tarde" : "Mañana";
                S.role = isVesp ? "Encargada Mollotes (Vespertino)" : "Encargada Mollotes (Matutino)";
            }
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
        syncBranch();
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
        
        // 1. Intentar cargar stock guardado para esta sucursal
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

        // Evaluar si stored tiene casi todos los productos en 0 (lo cual bloqueaba a las encargadas)
        let zeroCount = 0;
        let totalKeys = 0;
        if (stored && typeof stored === "object") {
            const entries = Object.values(stored);
            totalKeys = entries.length;
            entries.forEach(v => { if (Number(v) <= 0) zeroCount++; });
        }

        const isWiped = totalKeys > 0 && (zeroCount / totalKeys) > 0.65;

        if (stored && typeof stored === "object" && totalKeys > 0 && !isWiped) {
            S.inv = { ...stored };
            // Asegurar que ningún producto nuevo quede indefinido
            S.products.forEach(p => {
                if (S.inv[p.product_id] === undefined || S.inv[p.product_id] === null) {
                    S.inv[p.product_id] = (p.initial_stock && Number(p.initial_stock) > 0) ? Number(p.initial_stock) : 60;
                }
            });
        } else {
            // Cargar stock operativo saludable y diferenciado por sucursal
            S.inv = {};
            const branchDefaults = BRANCH_BASE_INVENTORY[branchKey] || {};

            S.products.forEach(p => {
                const maxS = getMaxStock(p);
                let baseStk = branchDefaults[p.product_id];
                if (baseStk === undefined || baseStk === null || Number(baseStk) <= 0) {
                    baseStk = (p.initial_stock !== undefined && p.initial_stock !== null && Number(p.initial_stock) > 0) 
                        ? Number(p.initial_stock) 
                        : (p.is_supply || p.category === "desechables" ? 250 : (p.category === "paletas" ? 100 : (p.category === "helados" ? 80 : 60)));
                    if (branchKey === "tagarete_2") baseStk = Math.max(25, Math.floor(baseStk * 0.75));
                    else if (branchKey === "cnop") baseStk = Math.max(20, Math.floor(baseStk * 0.65));
                    else if (branchKey === "rescate") baseStk = Math.max(30, Math.floor(baseStk * 0.85));
                }
                S.inv[p.product_id] = Math.min(maxS, Math.max(0, baseStk));
            });

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

    function deductStock(id, qty = 1, name = "", dynamicComponents = null) { 
        // 1. Descontar el producto base
        const cur = getStock(id);
        S.inv[id] = Math.max(0, cur - qty); 

        // 2. Resolver el producto en catálogo para verificar si es compuesto
        let prod = S.products.find(p => String(p.product_id) === String(id) || (name && String(p.product_name || "").toLowerCase() === String(name).toLowerCase()));
        if (!prod && typeof DEFAULT_PRODUCTS !== "undefined") {
            prod = DEFAULT_PRODUCTS.find(p => String(p.product_id) === String(id) || (name && String(p.product_name || "").toLowerCase() === String(name).toLowerCase()));
        }
        if (!prod) {
            const customs = gr("custom_products", []);
            prod = customs.find(p => String(p.product_id) === String(id) || (name && String(p.product_name || "").toLowerCase() === String(name).toLowerCase()));
        }

        // 3. Descontar automáticamente todos sus insumos/desechables/ingredientes asociados
        const componentsToDeduct = (dynamicComponents && Array.isArray(dynamicComponents) && dynamicComponents.length)
            ? dynamicComponents
            : (prod && (prod.is_composite || (Array.isArray(prod.components) && prod.components.length > 0)) ? prod.components : []);

        if (Array.isArray(componentsToDeduct) && componentsToDeduct.length > 0) {
            componentsToDeduct.forEach(comp => {
                const reqPerUnit = Number(comp.qty || comp.quantity || 1);
                const totalReq = reqPerUnit * qty;

                // Resolver ID exacto del insumo/componente por supply_id, product_id, id o nombre
                const rawSupplyId = comp.supply_id || comp.product_id || comp.id;
                let supplyProd = null;
                if (rawSupplyId) {
                    supplyProd = S.products.find(p => String(p.product_id) === String(rawSupplyId) || String(p.id) === String(rawSupplyId));
                    if (!supplyProd && typeof DEFAULT_PRODUCTS !== "undefined") {
                        supplyProd = DEFAULT_PRODUCTS.find(p => String(p.product_id) === String(rawSupplyId) || String(p.id) === String(rawSupplyId));
                    }
                }
                if (!supplyProd && (comp.supply_name || comp.name || comp.product_name)) {
                    const targetName = String(comp.supply_name || comp.name || comp.product_name).toLowerCase().trim();
                    supplyProd = S.products.find(p => String(p.product_name || "").toLowerCase().trim() === targetName);
                    if (!supplyProd && typeof DEFAULT_PRODUCTS !== "undefined") {
                        supplyProd = DEFAULT_PRODUCTS.find(p => String(p.product_name || "").toLowerCase().trim() === targetName);
                    }
                }

                const finalSupplyId = supplyProd ? supplyProd.product_id : rawSupplyId;
                if (finalSupplyId) {
                    const compCur = getStock(finalSupplyId);
                    S.inv[finalSupplyId] = Math.max(0, compCur - totalReq);
                    if (rawSupplyId && rawSupplyId !== finalSupplyId) {
                        S.inv[rawSupplyId] = Math.max(0, (S.inv[rawSupplyId] != null ? S.inv[rawSupplyId] : compCur) - totalReq);
                    }
                }
            });
        }

        saveBranchInv(); 
        alertInv(); 
    }

    function addStock(id, qty = 1, name = "") { 
        // 1. Reintegrar el producto base
        const maxS = getMaxStock(id);
        S.inv[id] = Math.min(maxS, getStock(id) + qty); 

        // 2. Si es un Producto Compuesto, reintegrar también todos sus insumos/desechables al inventario
        let prod = S.products.find(p => String(p.product_id) === String(id) || (name && String(p.product_name || "").toLowerCase() === String(name).toLowerCase()));
        if (!prod && typeof DEFAULT_PRODUCTS !== "undefined") {
            prod = DEFAULT_PRODUCTS.find(p => String(p.product_id) === String(id) || (name && String(p.product_name || "").toLowerCase() === String(name).toLowerCase()));
        }
        if (!prod) {
            const customs = gr("custom_products", []);
            prod = customs.find(p => String(p.product_id) === String(id) || (name && String(p.product_name || "").toLowerCase() === String(name).toLowerCase()));
        }

        if (prod && (prod.is_composite || (Array.isArray(prod.components) && prod.components.length > 0))) {
            const comps = prod.components || [];
            comps.forEach(comp => {
                const reqPerUnit = Number(comp.qty || comp.quantity || 1);
                const totalReq = reqPerUnit * qty;
                const rawSupplyId = comp.supply_id || comp.product_id || comp.id;
                let supplyProd = null;
                if (rawSupplyId) {
                    supplyProd = S.products.find(p => String(p.product_id) === String(rawSupplyId) || String(p.id) === String(rawSupplyId));
                    if (!supplyProd && typeof DEFAULT_PRODUCTS !== "undefined") {
                        supplyProd = DEFAULT_PRODUCTS.find(p => String(p.product_id) === String(rawSupplyId) || String(p.id) === String(rawSupplyId));
                    }
                }
                if (!supplyProd && (comp.supply_name || comp.name || comp.product_name)) {
                    const targetName = String(comp.supply_name || comp.name || comp.product_name).toLowerCase().trim();
                    supplyProd = S.products.find(p => String(p.product_name || "").toLowerCase().trim() === targetName);
                    if (!supplyProd && typeof DEFAULT_PRODUCTS !== "undefined") {
                        supplyProd = DEFAULT_PRODUCTS.find(p => String(p.product_name || "").toLowerCase().trim() === targetName);
                    }
                }

                const finalSupplyId = supplyProd ? supplyProd.product_id : rawSupplyId;
                if (finalSupplyId) {
                    const maxCompStock = getMaxStock(finalSupplyId);
                    S.inv[finalSupplyId] = Math.min(maxCompStock, getStock(finalSupplyId) + totalReq);
                    if (rawSupplyId && rawSupplyId !== finalSupplyId) {
                        S.inv[rawSupplyId] = Math.min(maxCompStock, (S.inv[rawSupplyId] || 0) + totalReq);
                    }
                }
            });
        }

        saveBranchInv(); 
        alertInv(); 
    }

    function alertInv() {
        const banner = document.getElementById("inventory-alert-banner");
        if (!banner) return;
        const out = S.products.filter(p => !p.is_supply && getStock(p.product_id) === 0);
        const low = S.products.filter(p => !p.is_supply && getStock(p.product_id) > 0 && getStock(p.product_id) <= STOCK_LOW);
        const txt = document.getElementById("inventory-alert-text");
        if (out.length > 0 && out.length <= 8) {
            banner.style.display = "flex";
            if (txt) txt.textContent = "📦 Aviso de Stock: " + out.map(p => p.product_name).join(", ") + " — Reponer en Inventario.";
        } else if (out.length > 8) {
            banner.style.display = "flex";
            if (txt) txt.textContent = "📦 Aviso de Stock: " + out.slice(0, 5).map(p => p.product_name).join(", ") + " y " + (out.length - 5) + " más por reponer en Inventario.";
        } else if (low.length) {
            banner.style.display = "flex";
            if (txt) txt.textContent = "📉 Stock bajo en: " + low.slice(0, 5).map(p => p.product_name).join(", ");
        } else {
            banner.style.display = "none";
        }
    }

    function checkBlock() { return S.cart.some(i => i.quantity > getStock(i.product_id)); }

    /* ── CATÁLOGO OFICIAL LA FUENTE (PUNTOS DE VENTA & SUCURSALES) ── */
    const DEFAULT_PRODUCTS = [
        // ── AGUAS FRESCAS & BEBIDAS ESPECIALES ──
        { product_id: "p_ag_grande", product_code: "AG", product_name: "Agua Grande", category: "aguas", price: 45, branch_name: "General", initial_stock: 60 },
        { product_id: "p_ag_mediana", product_code: "AM", product_name: "Agua Mediana", category: "aguas", price: 30, branch_name: "General", initial_stock: 60 },
        { product_id: "p_ag_chica", product_code: "ACH", product_name: "Agua Chica", category: "aguas", price: 25, branch_name: "General", initial_stock: 60 },
        { product_id: "p_ag_nat_chica", product_code: "ANCH", product_name: "Agua Natural Chica", category: "aguas", price: 15, branch_name: "General", initial_stock: 60 },
        { product_id: "p_ag_nat_grande", product_code: "ANG", product_name: "Agua Natural Grande", category: "aguas", price: 20, branch_name: "General", initial_stock: 60 },
        { product_id: "p_sodas_italianas", product_code: "SI", product_name: "Sodas Italianas", category: "aguas", price: 75, branch_name: "Rescate", initial_stock: 60 },
        { product_id: "p_frappe", product_code: "FRAPPE", product_name: "Frappé", category: "aguas", price: 50, branch_name: "Rescate", initial_stock: 60 },

        // ── HELADOS & NIEVES ──
        { product_id: "p_cono_sencillo", product_code: "CS", product_name: "Cono Sencillo", category: "helados", price: 25, branch_name: "General", initial_stock: 80 },
        { product_id: "p_cono_doble_choco", product_code: "CDCH", product_name: "Cono Doble Chocolate", category: "helados", price: 45, branch_name: "General", initial_stock: 80 },
        { product_id: "p_cono_doble_vain", product_code: "CDV", product_name: "Cono Doble Vainilla", category: "helados", price: 45, branch_name: "General", initial_stock: 80 },
        { product_id: "p_cono_cubierto", product_code: "CC", product_name: "Cono Cubierto", category: "helados", price: 45, branch_name: "General", initial_stock: 80 },
        { product_id: "p_canasta_doble", product_code: "CanastaDoble", product_name: "Canasta Doble", category: "helados", price: 40, branch_name: "General", initial_stock: 80 },
        { product_id: "p_canasta_triple", product_code: "CanastaTriple", product_name: "Canasta Triple", category: "helados", price: 50, branch_name: "General", initial_stock: 80 },
        { product_id: "p_helado_vaso1", product_code: "HV1", product_name: "Helado Vaso 1", category: "helados", price: 20, branch_name: "General", initial_stock: 80 },
        { product_id: "p_helado_vaso2", product_code: "HV2", product_name: "Helado Vaso 2", category: "helados", price: 35, branch_name: "General", initial_stock: 80 },
        { product_id: "p_helado_vaso3", product_code: "HV3", product_name: "Helado Vaso 3", category: "helados", price: 40, branch_name: "General", initial_stock: 80 },
        { product_id: "p_helado_vaso4", product_code: "HV4", product_name: "Helado Vaso 4", category: "helados", price: 50, branch_name: "General", initial_stock: 80 },
        { product_id: "p_helado_maquina", product_code: "HM", product_name: "Helado Máquina", category: "helados", price: 15, branch_name: "General", initial_stock: 80 },
        { product_id: "p_helado_maq_sencillo", product_code: "HMS", product_name: "Helado Máquina Sencillo", category: "helados", price: 18, branch_name: "General", initial_stock: 80 },

        // ── PALETAS ──
        { product_id: "p_paleta_crema_gde", product_code: "PCG", product_name: "Paleta Crema Grande", category: "paletas", price: 30, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_agua_gde", product_code: "PAG", product_name: "Paleta Agua Grande", category: "paletas", price: 25, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_agua_chica", product_code: "PACH", product_name: "Paleta Agua Chica", category: "paletas", price: 12, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_chapurrita", product_code: "PCH", product_name: "Paleta Chapurrita", category: "paletas", price: 20, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_payaso", product_code: "PP", product_name: "Paleta Payaso", category: "paletas", price: 30, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_michelada", product_code: "PM", product_name: "Paleta Michelada", category: "paletas", price: 40, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_nuez_esp", product_code: "NE", product_name: "Nuez Especial", category: "paletas", price: 40, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_pinon", product_code: "PINON", product_name: "Piñón", category: "paletas", price: 40, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_zanahoria", product_code: "ZANAH", product_name: "Zanahoria", category: "paletas", price: 40, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_tequila", product_code: "TEQUILA", product_name: "Tequila", category: "paletas", price: 40, branch_name: "General", initial_stock: 100 },
        { product_id: "p_paleta_bombon", product_code: "PB", product_name: "Paleta Bombón", category: "paletas", price: 20, branch_name: "General", initial_stock: 100 },
        { product_id: "p_mini_esquimal", product_code: "ME", product_name: "Mini Esquimal", category: "paletas", price: 15, branch_name: "General", initial_stock: 100 },
        { product_id: "p_mini", product_code: "MINI", product_name: "Mini", category: "paletas", price: 5, branch_name: "General", initial_stock: 100 },

        // ── PREPARADOS & BOTANAS ──
        { product_id: "p_tostilocos", product_code: "TP", product_name: "Tostilocos", category: "preparados", price: 55, branch_name: "General", initial_stock: 60 },
        { product_id: "p_tostiloco_barcel", product_code: "TB", product_name: "Tostiloco Barcel", category: "preparados", price: 55, branch_name: "General", initial_stock: 60 },
        { product_id: "p_tostiloco_vaso", product_code: "TV", product_name: "Tostiloco en Vaso", category: "preparados", price: 60, branch_name: "General", initial_stock: 60 },
        { product_id: "p_tostiloco_vaso_barcel", product_code: "TVB", product_name: "Tostiloco en Vaso Barcel", category: "preparados", price: 60, branch_name: "General", initial_stock: 60 },
        { product_id: "p_papas_cueros", product_code: "PCC", product_name: "Papas con Cueros", category: "preparados", price: 50, branch_name: "General", initial_stock: 60 },
        { product_id: "p_cacahuatadas", product_code: "CACAH", product_name: "Cacahuatadas", category: "preparados", price: 35, branch_name: "General", initial_stock: 60 },
        { product_id: "p_nachos", product_code: "Nachos", product_name: "Nachos", category: "preparados", price: 45, branch_name: "General", initial_stock: 60 },
        { product_id: "p_dorinachos", product_code: "Dorinachos", product_name: "Dorinachos", category: "preparados", price: 45, branch_name: "General", initial_stock: 60 },
        { product_id: "p_barcel_nacho", product_code: "BN", product_name: "Barcel Nacho", category: "preparados", price: 45, branch_name: "General", initial_stock: 60 },
        { product_id: "p_escamocha_gde", product_code: "EG", product_name: "Escamocha Grande", category: "preparados", price: 75, branch_name: "General", initial_stock: 60 },
        { product_id: "p_escamocha_chica", product_code: "ECH", product_name: "Escamocha Chica", category: "preparados", price: 55, branch_name: "General", initial_stock: 60 },
        { product_id: "p_carne_seca", product_code: "CarneS", product_name: "Carne Seca", category: "preparados", price: 40, branch_name: "General", initial_stock: 60 },
        { product_id: "p_waffle", product_code: "Waffle", product_name: "Waffle", category: "preparados", price: 85, branch_name: "Rescate", initial_stock: 60 },
        { product_id: "p_chechis_bolsa", product_code: "CPB", product_name: "Chechis Preparado Bolsa", category: "preparados", price: 20, branch_name: "General", excluded_branches: ["La Fuente Calzada", "Calzada"], initial_stock: 60 },
        { product_id: "p_chechis_vaso", product_code: "CPV", product_name: "Chechis Preparados Vaso", category: "preparados", price: 25, branch_name: "General", excluded_branches: ["La Fuente Calzada", "Calzada"], initial_stock: 60 },

        // ── CONGELADOS & FRUTAS ──
        { product_id: "p_fresa_congelada", product_code: "FC", product_name: "Fresa Congelada", category: "congelados", price: 45, branch_name: "General", initial_stock: 50 },
        { product_id: "p_fresa_natural", product_code: "FN", product_name: "Fresa Natural", category: "congelados", price: 55, branch_name: "General", initial_stock: 50 },
        { product_id: "p_mordisco", product_code: "Mordi", product_name: "Mordisco", category: "congelados", price: 25, branch_name: "General", initial_stock: 50 },
        { product_id: "p_trol", product_code: "Trol", product_name: "Trol", category: "congelados", price: 30, branch_name: "General", initial_stock: 50 },
        { product_id: "p_mango_congelado", product_code: "MC", product_name: "Mango Congelado", category: "congelados", price: 45, branch_name: "General", initial_stock: 50 },
        { product_id: "p_mangonadas", product_code: "Mangonadas", product_name: "Mangonadas", category: "congelados", price: 45, branch_name: "General", initial_stock: 50 },
        { product_id: "p_bolis", product_code: "Bolis", product_name: "Bolis", category: "congelados", price: 15, branch_name: "General", initial_stock: 50 },

        // ── DULCES, POSTRES & BOTANAS SOLAS ──
        { product_id: "p_donas", product_code: "Donas", product_name: "Donas", category: "postres", price: 20, branch_name: "General", initial_stock: 45 },
        { product_id: "p_semillas", product_code: "Semillas", product_name: "Semillas", category: "dulces", price: 20, branch_name: "General", initial_stock: 45 },
        { product_id: "p_choco_corazon", product_code: "ChocoCorazon", product_name: "Chocolate Corazón", category: "dulces", price: 10, branch_name: "General", initial_stock: 45 },
        { product_id: "p_trufa", product_code: "Trufa", product_name: "Trufa", category: "dulces", price: 15, branch_name: "General", initial_stock: 45 },
        { product_id: "p_gomi_fish", product_code: "GF", product_name: "Gomi Fish", category: "dulces", price: 5, branch_name: "General", initial_stock: 45 },
        { product_id: "p_manzana", product_code: "Manzana", product_name: "Manzana", category: "postres", price: 50, branch_name: "General", initial_stock: 45 },
        { product_id: "p_gomitas_carrucel", product_code: "GC", product_name: "Gomitas Carrucel", category: "dulces", price: 15, branch_name: "General", initial_stock: 45 },
        { product_id: "p_rebanada_pay", product_code: "RebanadaPay", product_name: "Rebanada Pay", category: "postres", price: 50, branch_name: "General", initial_stock: 45 },
        { product_id: "p_chocoflan", product_code: "CHOCO", product_name: "Chocoflan", category: "postres", price: 50, branch_name: "General", initial_stock: 45 },
        { product_id: "p_tostito_solo", product_code: "TS", product_name: "Tostito Solo", category: "preparados", price: 22, branch_name: "General", initial_stock: 60 },
        { product_id: "p_barcel_solo", product_code: "BS", product_name: "Barcel Solo", category: "preparados", price: 22, branch_name: "General", initial_stock: 60 },
        { product_id: "p_churros_camaron", product_code: "ChurrosCamaron", product_name: "Churros Camarón", category: "preparados", price: 20, branch_name: "General", initial_stock: 60 },
        { product_id: "p_papas", product_code: "Papas", product_name: "Papas", category: "preparados", price: 50, branch_name: "General", initial_stock: 60 },

        // ── DESECHABLES, INSUMOS & BASES SOLAS ──
        { product_id: "p_cono_sencillo_solo", product_code: "CSS", product_name: "Cono Sencillo Solo", category: "desechables", price: 5, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_cono_doble_choco_solo", product_code: "CDCHS", product_name: "Cono Doble Chocolate Solo", category: "desechables", price: 10, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_cono_doble_vain_solo", product_code: "CDVS", product_name: "Cono Doble Vainilla Solo", category: "desechables", price: 10, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_canasta_doble_sola", product_code: "CDS", product_name: "Canasta Doble Sola", category: "desechables", price: 10, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_canasta_triple_sola", product_code: "CTS", product_name: "Canasta Triple Sola", category: "desechables", price: 10, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_charola_nacho", product_code: "CharolaNacho", product_name: "Charola para Nacho", category: "desechables", price: 5, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_cuchara", product_code: "Cuchara", product_name: "Cuchara", category: "desechables", price: 5, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_cuchara_trol", product_code: "CucharaTrol", product_name: "Cuchara Trol", category: "desechables", price: 5, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_cuchara_prueba", product_code: "CucharaPrueba", product_name: "Cuchara de Prueba", category: "desechables", price: 5, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 },
        { product_id: "p_popote", product_code: "Popote", product_name: "Popote", category: "desechables", price: 5, branch_name: "General", is_supply: true, units_per_package: 100, initial_stock: 300 },
        { product_id: "p_vaso_cualquier_medida", product_code: "VasoCualquierMedida", product_name: "Cualquier Vaso de Cualquier Medida", category: "desechables", price: 5, branch_name: "General", is_supply: true, units_per_package: 50, initial_stock: 300 }
    ];

    
    function broadcastCatalogChanges(actionDescription = "Modificación de catálogo") {
        const customList = gr("custom_products", []);
        const deletedList = gr("deleted_product_ids", []);
        
        // 1. Difusión en tiempo real por canal Mesh a todos los navegadores abiertos
        if (realtimeChannel) {
            try {
                realtimeChannel.send({
                    type: "broadcast",
                    event: "catalog_updated",
                    payload: {
                        custom_products: customList,
                        deleted_product_ids: deletedList,
                        branch_name: S.branchName,
                        action: actionDescription,
                        user: S.profile?.full_name || S.user?.email || "Encargada",
                        updated_at: now()
                    }
                });
            } catch(e) {}
        }

        // 2. Persistir en la nube de Supabase para que cualquier dispositivo / Superusuario lo reciba aunque abra después
        if (db) {
            try {
                safeQuery(db.from("sales").insert({
                    branch_id: "c188dd82-7faf-41b8-948b-af8e789facba",
                    company_id: "51bc275d-4e19-4115-be3f-42c0ce3dae5a",
                    shift_id: "1dabe6df-2ce6-4e3a-97df-b81e179898ab",
                    user_id: "4710b330-566c-45c7-a92e-b7b6a62355af",
                    sale_number: "CATALOG-" + Date.now(),
                    subtotal: 0,
                    discount: 0,
                    tax: 0,
                    total: 0,
                    status: "CATALOG_RECORD",
                    observations: JSON.stringify({
                        is_catalog_record: true,
                        custom_products: customList,
                        deleted_product_ids: deletedList,
                        updated_at: now(),
                        updated_by: S.profile?.full_name || S.user?.email || "Encargada",
                        branch_name: S.branchName,
                        action: actionDescription
                    })
                }), null, 2500).catch(e => console.warn("Cloud catalog persist:", e));
            } catch(e) {}
        }
    }

    /* ── PRODUCTOS (CARGA DESDE SUPABASE Y CATÁLOGO AUTÉNTICO) ── */
    async function loadProducts() {
        // Cargar registros de personalizaciones y cambios de catálogo desde la nube
        if (db) {
            try {
                const {data: catalogRecords} = await safeQuery(db.from("sales").select("*").eq("status", "CATALOG_RECORD").order("created_at", {ascending: false}).limit(50), null, 2500);
                if (catalogRecords && catalogRecords.length) {
                    const localCustom = gr("custom_products", []);
                    const mapCust = new Map();
                    localCustom.forEach(p => mapCust.set(String(p.product_id), p));
                    const delSet = new Set(gr("deleted_product_ids", []));

                    catalogRecords.reverse().forEach(cr => {
                        let obs = {};
                        try { obs = typeof cr.observations === "string" ? JSON.parse(cr.observations) : (cr.observations || {}); } catch(e) {}
                        if (obs.custom_products && Array.isArray(obs.custom_products)) {
                            obs.custom_products.forEach(p => mapCust.set(String(p.product_id), p));
                        }
                        if (obs.deleted_product_ids && Array.isArray(obs.deleted_product_ids)) {
                            obs.deleted_product_ids.forEach(id => delSet.add(String(id)));
                        }
                    });

                    const mergedCustom = Array.from(mapCust.values());
                    const mergedDel = Array.from(delSet);
                    gw("custom_products", mergedCustom);
                    lw("custom_products", mergedCustom);
                    gw("deleted_product_ids", mergedDel);
                    lw("deleted_product_ids", mergedDel);
                }
            } catch(e) {}
        }

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

        // Escaneo de productos personalizados guardados por sucursales específicas
        const branchKeySuffixes = [
            "branch-1", "branch-2", "branch-3", "branch-4", "branch-5", "branch-6",
            "calzada", "rescate", "mollotes", "tagarete_1", "tagarete_2", "cnop",
            "tagarete 1", "tagarete 2", "la fuente calzada"
        ];
        branchKeySuffixes.forEach(bSuffix => {
            try {
                const raw = localStorage.getItem("lf_" + bSuffix + "_custom_products");
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) {
                        parsed.forEach(p => {
                            if (p && p.product_id && !customProds.some(x => String(x.product_id) === String(p.product_id))) {
                                customProds.push(p);
                            }
                        });
                    }
                }
            } catch(e) {}
        });

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

        // Aplicar reglas estrictas de disponibilidad por sucursal
        p = p.filter(x => isProductAllowedInBranch(x, S.branchName));

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

    /* ── NUEVA FUNCIÓN: MONITOR DE MOVIMIENTO EN VIVO & VENTAS DEL DÍA ── */
    async function updatePosLiveMovement() {
        const prodSec = document.querySelector(".products-section");
        if (!prodSec) return;

        let bar = document.getElementById("pos-live-movement-bar");
        if (!bar) {
            bar = document.createElement("div");
            bar.id = "pos-live-movement-bar";
            const tabs = document.getElementById("category-tabs");
            if (tabs) prodSec.insertBefore(bar, tabs);
            else prodSec.prepend(bar);
        }

        const allSales = await getConsolidatedSalesForChain();
        const activeSales = allSales.filter(s => String(s.status || "").toUpperCase() !== "CANCELLED");

        const todayStr = toDateKey();
        let bSales = activeSales.filter(s => matchesBranch(s, { id: S.branchId, name: S.branchName }) && toDateKey(s.created_at) === todayStr);
        if (!bSales.length) {
            const branchAll = activeSales.filter(s => matchesBranch(s, { id: S.branchId, name: S.branchName }));
            if (branchAll.length) {
                const datesMap = new Map();
                branchAll.forEach(s => {
                    const d = toDateKey(s.created_at);
                    if (d) {
                        if (!datesMap.has(d)) datesMap.set(d, []);
                        datesMap.get(d).push(s);
                    }
                });
                const latestDate = Array.from(datesMap.keys()).sort().reverse()[0];
                if (latestDate) {
                    bSales = datesMap.get(latestDate) || [];
                }
            }
        }

        const matSales = bSales.filter(s => getShiftCategory(s) === "matutino");
        const vesSales = bSales.filter(s => getShiftCategory(s) === "vespertino");

        const matCash = matSales.filter(s => (s.payment_method || "cash") === "cash").reduce((a, s) => a + Number(s.total || 0), 0);
        const matCard = matSales.filter(s => s.payment_method === "card").reduce((a, s) => a + Number(s.total || 0), 0);
        const matTotal = matCash + matCard;

        const vesCash = vesSales.filter(s => (s.payment_method || "cash") === "cash").reduce((a, s) => a + Number(s.total || 0), 0);
        const vesCard = vesSales.filter(s => s.payment_method === "card").reduce((a, s) => a + Number(s.total || 0), 0);
        const vesTotal = vesCash + vesCard;

        const dayCash = matCash + vesCash;
        const dayCard = matCard + vesCard;
        const dayTotal = matTotal + vesTotal;

        const allShifts = gr("all_shifts", []);
        const branchShift = allShifts.find(sh => matchesBranch(sh, { id: S.branchId, name: S.branchName }));
        const activeLocalShift = lr("current_shift", null);
        const initialFund = (branchShift && branchShift.opening_amount != null)
            ? Number(branchShift.opening_amount)
            : (activeLocalShift && activeLocalShift.opening_amount != null
                ? Number(activeLocalShift.opening_amount)
                : (S.currentShift?.opening_amount != null ? Number(S.currentShift.opening_amount) : 1000));

        const isCurrentVesp = (S.shift || "").toLowerCase().includes("tarde") || (S.shift || "").toLowerCase().includes("vesp");

        bar.innerHTML = `
        <div style="background:linear-gradient(135deg,#ffffff,#fffdf5);border:1.5px solid var(--gold-400);border-radius:14px;padding:12px 16px;margin-bottom:14px;box-shadow:0 3px 12px rgba(0,0,0,0.06);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
            <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:24px">🍦</span>
                <div>
                    <div style="display:flex;align-items:center;gap:8px">
                        <strong style="font-size:14px;color:var(--wine-900);font-weight:900">📍 ${esc(S.branchName)}</strong>
                        <span style="font-size:10px;font-weight:900;background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:10px;border:1px solid #86efac;display:inline-flex;align-items:center;gap:4px">
                            <span style="width:6px;height:6px;background:#15803d;border-radius:50%;display:inline-block"></span> EN VIVO
                        </span>
                    </div>
                    <small style="color:var(--text-muted);font-size:11px;display:block;margin-top:2px">
                        Turno actual: <strong style="color:var(--wine-800)">${esc(S.shift)}</strong> • Fondo Inicial: <strong>${money(initialFund)}</strong> • 🧾 <strong>${bSales.length} tickets hoy</strong>
                    </small>
                </div>
            </div>

            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                <!-- MAÑANA -->
                <div style="background:#fffef0;padding:6px 12px;border-radius:10px;border:1.5px solid ${!isCurrentVesp ? '#d97706' : '#fde68a'};text-align:right">
                    <small style="font-size:9.5px;font-weight:900;color:#92400e;display:block">🌅 MAÑANA (${matSales.length} tks)</small>
                    <strong style="font-size:14px;color:#78350f">${money(matTotal)}</strong>
                </div>

                <!-- TARDE -->
                <div style="background:#eef2ff;padding:6px 12px;border-radius:10px;border:1.5px solid ${isCurrentVesp ? '#6366f1' : '#c7d2fe'};text-align:right">
                    <small style="font-size:9.5px;font-weight:900;color:#3730a3;display:block">🌇 TARDE (EN VIVO - ${vesSales.length} tks)</small>
                    <strong style="font-size:14px;color:#312e81">${money(vesTotal)}</strong>
                </div>

                <!-- TOTAL DÍA -->
                <div style="background:#f0fdf4;padding:6px 14px;border-radius:10px;border:1.5px solid #86efac;text-align:right">
                    <small style="font-size:10px;font-weight:900;color:#166534;display:block">💰 TOTAL VENDIDO HOY</small>
                    <strong style="font-size:16px;color:#15803d">${money(dayTotal)}</strong>
                </div>

                <button type="button" class="btn-goto-sales-live" style="padding:7px 12px;background:linear-gradient(135deg,var(--wine-800),var(--wine-950));color:#fff;border:1px solid var(--gold-400);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:4px">
                    📋 Ver Tickets
                </button>
            </div>
        </div>`;

        bar.querySelector(".btn-goto-sales-live")?.addEventListener("click", () => {
            if (window.changeView) window.changeView("sales");
        });
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
                data-pid="${esc(p.product_id)}">
                <div class="product-image">${p.image_url
                    ? `<img src="${esc(p.image_url)}" alt="${esc(p.product_name)}">`
                    : '<div class="product-placeholder">🍦</div>'}</div>
                <div class="product-info">
                    <small>${esc(p.product_code || "")} • ${esc(p.category || "General")}</small>
                    <strong>${esc(p.product_name)}</strong>
                    <span>${money(p.price)}</span>
                    ${isOut ? '<span style="font-size:10px;color:#d97706;font-weight:900;display:block;margin-top:3px">⚠️ Stock 0 (Reponer)</span>' : ""}
                    ${isLow ? `<span style="font-size:10px;color:#b45309;font-weight:900;display:block;margin-top:3px">⚠ Quedan ${stock} uds.</span>` : ""}
                </div></button>`;
        }).join("");
        c.querySelectorAll(".product-card").forEach(btn =>
            btn.addEventListener("click", () => addToCart(btn.dataset.pid))
        );
        updatePosLiveMovement();
    }

    /* ── CARRITO & COBRO DE ÓRDENES ── */
    function addToCart(pid) {
        const p = S.products.find(x => String(x.product_id) === String(pid));
        if (!p) return;
        const stock = getStock(pid);
        if (stock <= 0) {
            toast("'" + p.product_name + "' agregado a la orden (stock bajo, recuerda reponer en Inventario).", "info", 2000);
        }
        const ex = S.cart.find(i => String(i.product_id) === String(pid));
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
        const total = S.cart.reduce((s,i) => s + (i.price * i.quantity), 0);

        // Selección de método de pago interactiva (Efectivo vs Tarjeta)
        const payMethod = await toastPaymentMethod(total);
        if (!payMethod) return;

        const cashierEmail = S.user?.email || "";
        const cashierName = S.profile?.full_name || cashierEmail || "Encargada";

        const resolvedBranchName = resolveCanonicalBranch(S.branchName || cashierEmail) || "La Fuente Calzada";
        const defaultBranchId = (
            resolvedBranchName === "La Fuente Calzada" ? "branch-1" :
            resolvedBranchName === "Rescate" ? "branch-2" :
            resolvedBranchName === "Mollotes" ? "branch-3" :
            resolvedBranchName === "Tagarete 1" ? "branch-4" :
            resolvedBranchName === "Tagarete 2" ? "branch-5" :
            resolvedBranchName === "CNOP" ? "branch-6" : "branch-1"
        );
        const saleBranchId = S.branchId || defaultBranchId;
        const saleBranchName = resolvedBranchName;
        const isTag1 = resolvedBranchName === "Tagarete 1";
        const isTag2 = resolvedBranchName === "Tagarete 2";
        const isCalzada = resolvedBranchName === "La Fuente Calzada";
        const isMollotes = resolvedBranchName === "Mollotes";

        const saleRecord = {
            id: "sale_" + Date.now() + "_" + Math.random().toString(36).substring(2,7),
            sale_number: "TICK-" + Math.floor(100000 + Math.random() * 900000),
            branch_id: saleBranchId,
            branch_name: saleBranchName,
            shift_name: S.shift || (getShiftCategory({ cashier_name: cashierEmail, created_at: now() }) === "vespertino" ? "Tarde" : "Mañana"),
            cashier_id: S.user?.id || "offline",
            cashier_name: cashierEmail ? (cashierName + " (" + cashierEmail + ")") : cashierName,
            total: total,
            payment_method: payMethod,
            status: "COMPLETADA",
            items: S.cart.map(i => ({product_id: i.product_id, product_name: i.product_name, quantity: i.quantity, price: i.price, subtotal: i.price*i.quantity})),
            created_at: now()
        };

        // 1. GUARDADO LOCAL Y POR SUCURSAL INSTANTÁNEO
        const localSales = lr("sales", []);
        localSales.unshift(saleRecord);
        lw("sales", localSales);

        const allGlobalSales = gr("all_sales", []);
        allGlobalSales.unshift(saleRecord);
        gw("all_sales", allGlobalSales);

        // Guardar explícitamente en la llave de la sucursal activa para sincronización multiusuario
        const bKey = getBranchKeyName(saleRecord.branch_name);
        try {
            const rawBSales = localStorage.getItem("lf_" + bKey + "_sales");
            const bSalesList = rawBSales ? JSON.parse(rawBSales) : [];
            bSalesList.unshift(saleRecord);
            localStorage.setItem("lf_" + bKey + "_sales", JSON.stringify(bSalesList));
            localStorage.setItem("lf_" + saleRecord.branch_id + "_sales", JSON.stringify(bSalesList));
            if (isTag1) {
                localStorage.setItem("lf_tagarete_1_sales", JSON.stringify(bSalesList));
                localStorage.setItem("lf_branch-4_sales", JSON.stringify(bSalesList));
                localStorage.setItem("lf_tagarete 1_sales", JSON.stringify(bSalesList));
            } else if (isTag2) {
                localStorage.setItem("lf_tagarete_2_sales", JSON.stringify(bSalesList));
                localStorage.setItem("lf_branch-5_sales", JSON.stringify(bSalesList));
                localStorage.setItem("lf_tagarete 2_sales", JSON.stringify(bSalesList));
            } else if (isCalzada) {
                localStorage.setItem("lf_calzada_sales", JSON.stringify(bSalesList));
                localStorage.setItem("lf_branch-1_sales", JSON.stringify(bSalesList));
                localStorage.setItem("lf_la_fuente_calzada_sales", JSON.stringify(bSalesList));
            } else if (isMollotes) {
                localStorage.setItem("lf_mollotes_sales", JSON.stringify(bSalesList));
                localStorage.setItem("lf_branch-3_sales", JSON.stringify(bSalesList));
                localStorage.setItem("lf_molotes_sales", JSON.stringify(bSalesList));
            }
        } catch(e) {}

        // Invalidar caché en memoria para que Contabilidad, Conteo y Mis Ventas tomen la nueva venta de inmediato
        _cachedConsolidatedSales = null;
        _lastSalesFetchTime = 0;

        // Guardar última venta registrada para reimpresión directa
        lw("last_printed_sale", saleRecord);
        gw("last_printed_sale", saleRecord);

        // 2. ACTUALIZACIÓN INMEDIATA DE LA UI E INVENTARIOS
        const cartItemsSnapshot = [...S.cart];
        cartItemsSnapshot.forEach(i => deductStock(i.product_id, i.quantity, i.product_name, i.components || i.extras || null));
        S.cart = [];
        renderCart();
        renderPOS(filtered());
        updatePosLiveMovement();
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
                        branch_name: saleRecord.branch_name,
                        branch_id: saleRecord.branch_id,
                        shift_name: saleRecord.shift_name,
                        cashier_name: saleRecord.cashier_name,
                        user_email: cashierEmail,
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
            return isProductAllowedInBranch(p, targetBranch.name);
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
        <div class="dashboard-card" style="padding:18px 22px;border-radius:16px;margin-bottom:24px;background:linear-gradient(145deg,#44060e,#2a0409);border:1.5px solid var(--gold-400);box-shadow:var(--shadow-card)">
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
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
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

            broadcastCatalogChanges("Insumo '" + name.trim() + "' agregado (" + packUnits + " pz/paq)");
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
            broadcastCatalogChanges();
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

            broadcastCatalogChanges("Insumo '" + supName + "' eliminado");
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
                broadcastCatalogChanges("Producto '" + name + "' editado");
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
                lw("custom_products", customList);

                // Persistencia blindada específica por sucursal
                const branchCleanName = normalizeBranchName(targetBranch === "all" ? S.branchName : targetBranch).replace(/\s+/g, "_");
                try {
                    const bKey = "lf_" + branchCleanName + "_custom_products";
                    const bList = JSON.parse(localStorage.getItem(bKey) || "[]");
                    bList.push(newProd);
                    localStorage.setItem(bKey, JSON.stringify(bList));
                } catch(e) {}

                broadcastCatalogChanges("Nuevo producto '" + name + "' registrado");
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

            broadcastCatalogChanges("Producto '" + btn.dataset.name + "' eliminado");
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

        const branchAllowedProducts = S.products.filter(p => isProductAllowedInBranch(p, S.branchName));
        const saleProds = branchAllowedProducts.filter(p => !p.is_supply && p.category !== "desechables");
        const supplyProds = branchAllowedProducts.filter(p => p.is_supply || p.category === "desechables");

        // Resumen preciso por categorías para esta sucursal
        const totalSaleUnits = saleProds.reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalSupplyUnits = supplyProds.reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalPaletas = branchAllowedProducts.filter(p => p.category === "paletas").reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalHelados = branchAllowedProducts.filter(p => p.category === "helados").reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalAguas = branchAllowedProducts.filter(p => p.category === "aguas").reduce((sum, p) => sum + getStock(p.product_id), 0);
        const totalPreparados = branchAllowedProducts.filter(p => p.category === "preparados").reduce((sum, p) => sum + getStock(p.product_id), 0);

        let displayedList = branchAllowedProducts;
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
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
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

            return `<article class="dashboard-card" style="padding:18px;border-radius:14px;border:1.5px solid var(--border-subtle);background:linear-gradient(180deg,#44060e 0%,#2a0409 100%);display:flex;flex-direction:column;justify-content:space-between">
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
                <div style="display:grid;grid-template-columns:${isSupply ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'};gap:5px">
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
                        style="padding:8px 3px;background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd;border-radius:8px;font-weight:800;font-size:10px;cursor:pointer">
                        ✎ Ajustar
                    </button>
                    <button type="button" class="btn-withdraw-stk" data-id="${esc(p.product_id)}" data-name="${esc(p.product_name)}"
                        style="padding:8px 3px;background:#fee2e2;color:#991b1b;border:1px solid #f87171;border-radius:8px;font-weight:900;font-size:10px;cursor:pointer" title="Retirar producto por merma o traslado">
                        ➖ Retirar
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
            const targetId = e.target.value;
            await changeBranch(targetId);
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

        c.querySelectorAll(".btn-withdraw-stk").forEach(btn => btn.addEventListener("click", async () => {
            const pid = btn.dataset.id;
            const name = btn.dataset.name;
            const cur = getStock(pid);
            const val = await toastPrompt(`➖ Retirar Producto / Merma: '${name}'\n\nStock actual en ${S.branchName}: ${cur} uds.\n¿Cuántas unidades deseas retirar/dar de baja por merma o traslado?:`, "1");
            if (val === null) return;
            const qty = parseInt(val, 10);
            if (isNaN(qty) || qty <= 0) return toast("Ingresa una cantidad válida a retirar.", "warn");
            if (qty > cur) return toast(`No puedes retirar más del stock actual (${cur} uds).`, "error");

            const reason = await toastPrompt(`Motivo del retiro de ${qty} uds de '${name}' (opcional, ej: Merma, Caducidad, Traslado a otra sucursal):`, "Merma / Traslado");

            const n = Math.max(0, cur - qty);
            S.inv[pid] = n;
            saveBranchInv();
            alertInv();

            // Notificar retiro
            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "inventory_withdrawn",
                        payload: {
                            product_id: pid,
                            product_name: name,
                            qty_withdrawn: qty,
                            remaining_stock: n,
                            reason: reason || "Retiro de producto",
                            branch_name: S.branchName,
                            user: S.profile?.full_name || S.user?.email || "Encargada"
                        }
                    });
                } catch(e) {}
            }

            toast(`✓ Retiradas ${qty} unidades de '${name}'. Stock restante: ${n} uds.`, "warn", 5000);
            loadInventory();
        }));
    }

    /* ── MIS VENTAS (FILTRO POR FECHA, TURNOS, MÉTODO DE PAGO Y CANCELACIONES) ── */
    let _lastSalesFetchTime = 0;
    let _cachedConsolidatedSales = null;

    // Ventas y cortes de respaldo activo de la jornada para turnos matutinos y vespertinos
    const BASE_ACTIVE_SALES = [
        {
                "id": "sale_1789689420112_tag1m1",
                "sale_number": "TICK-421105",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Mañana",
                "cashier_id": "usr_encargado7lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 1 (Matutino) (encargado7lafuente@gmail.com)",
                "total": 65,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_paleta_agua",
                                "product_name": "Paleta de Agua",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-18T16:15:00.000Z"
        },
        {
                "id": "sale_1789685120334_tag1m2",
                "sale_number": "TICK-783290",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Mañana",
                "cashier_id": "usr_encargado7lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 1 (Matutino) (encargado7lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-18T18:40:00.000Z"
        },
        {
                "id": "sale_1789682120556_tag1m3",
                "sale_number": "TICK-554109",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Mañana",
                "cashier_id": "usr_encargado7lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 1 (Matutino) (encargado7lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789697863281_0x5g",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-18T19:25:00.000Z"
        },
        {
                "id": "sale_1789700424873_us2j8",
                "sale_number": "TICK-328180",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado8lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 1 (Vespertino) (encargado8lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789700411818_dozi",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-18T23:30:24.874Z"
        },
        {
                "id": "sale_1789698534264_262xu",
                "sale_number": "TICK-818895",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado8lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 1 (Vespertino) (encargado8lafuente@gmail.com)",
                "total": 5,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789698424044_shdx",
                                "product_name": "Mini",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "created_at": "2026-09-18T23:05:54.265Z"
        },
        {
                "id": "sale_1789698176424_b1t92",
                "sale_number": "TICK-610565",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado8lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 1 (Vespertino) (encargado8lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789697863281_0x5g",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-18T22:45:56.424Z"
        },
        {
                "id": "sale_1789697935288_v6drr",
                "sale_number": "TICK-908438",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado8lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 1 (Vespertino) (encargado8lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789697863281_0x5g",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-18T21:30:55.288Z"
        },
        {
                "id": "sale_1789603197413_w4lhw",
                "sale_number": "TICK-491579",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T23:59:57.413Z"
        },
        {
                "id": "sale_1789603155052_u4r27",
                "sale_number": "TICK-398455",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 320,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789519605495_luuy",
                                "product_name": "Fresa Congelada",
                                "quantity": 5,
                                "price": 45,
                                "subtotal": 225
                        },
                        {
                                "product_id": "prod_1789582932954_4zly",
                                "product_name": "Nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_rebanada_pay",
                                "product_name": "Rebanada Pay",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T23:59:15.052Z"
        },
        {
                "id": "sale_1789602660700_n45og",
                "sale_number": "TICK-340726",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T23:51:00.701Z"
        },
        {
                "id": "sale_1789602573758_9jac4",
                "sale_number": "TICK-826647",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T23:49:33.758Z"
        },
        {
                "id": "sale_1789602408708_lldzk",
                "sale_number": "TICK-545803",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 245,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789344787923_spve",
                                "product_name": "Esquimal Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789521489453_elhu",
                                "product_name": "Papas cueros",
                                "quantity": 2,
                                "price": 50,
                                "subtotal": 100
                        },
                        {
                                "product_id": "prod_1789602349227_tspm",
                                "product_name": "Mordisco",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T23:46:48.708Z"
        },
        {
                "id": "sale_1789602400084_0qt2h",
                "sale_number": "TICK-284966",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T23:46:40.084Z"
        },
        {
                "id": "861a2829-dc17-4682-8578-dac0d410d673",
                "sale_number": "CATALOG-1789602349253",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-16T23:45:50.706703+00:00",
                "local_id": "861a2829-dc17-4682-8578-dac0d410d673"
        },
        {
                "id": "sale_1789602249324_r968s",
                "sale_number": "TICK-703567",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789510933216_lzqv",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T23:44:09.325Z"
        },
        {
                "id": "sale_1789602227660_qc9rw",
                "sale_number": "TICK-729490",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789439136025_ds7y",
                                "product_name": "AGUA MEDIANA",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T23:43:47.660Z"
        },
        {
                "id": "sale_1789601886423_az28l",
                "sale_number": "TICK-889579",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 95,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_zanahoria",
                                "product_name": "Zanahoria",
                                "quantity": 1,
                                "price": 40,
                                "subtotal": 40
                        },
                        {
                                "product_id": "prod_1789581994012_afpt",
                                "product_name": "paleta de crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789503512135_chg1",
                                "product_name": "paleta de agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T23:38:06.423Z"
        },
        {
                "id": "sale_1789601623469_rm10v",
                "sale_number": "TICK-761728",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_escamocha_gde",
                                "product_name": "Escamocha Grande",
                                "quantity": 1,
                                "price": 75,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T23:33:43.469Z"
        },
        {
                "id": "sale_1789601607228_jginj",
                "sale_number": "TICK-783327",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 220,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 2,
                                "price": 20,
                                "subtotal": 40
                        },
                        {
                                "product_id": "prod_1789415873355_j12h",
                                "product_name": "Medio Litro de Nieve",
                                "quantity": 1,
                                "price": 60,
                                "subtotal": 60
                        },
                        {
                                "product_id": "p_nachos",
                                "product_name": "Nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_fresa_congelada",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "p_mini",
                                "product_name": "Mini",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "created_at": "2026-09-16T23:33:27.228Z"
        },
        {
                "id": "sale_1789601420808_u3ond",
                "sale_number": "TICK-129621",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 190,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789519605495_luuy",
                                "product_name": "Fresa Congelada",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789600771887_fm7r",
                                "product_name": "Extra Nuez",
                                "quantity": 2,
                                "price": 5,
                                "subtotal": 10
                        },
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-16T23:30:20.809Z"
        },
        {
                "id": "dd8514ff-17b2-460a-a0ca-54edfd6cc0d4",
                "sale_number": "CATALOG-1789600771915",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-16T23:19:33.203107+00:00",
                "local_id": "dd8514ff-17b2-460a-a0ca-54edfd6cc0d4"
        },
        {
                "id": "40506928-ed42-4d5a-bbdd-44c7f6eb1a4d",
                "sale_number": "CATALOG-1789600675715",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-16T23:17:59.012811+00:00",
                "local_id": "40506928-ed42-4d5a-bbdd-44c7f6eb1a4d"
        },
        {
                "id": "sale_1789600513844_i6e3n",
                "sale_number": "TICK-625636",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 95,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789427668265_puwa",
                                "product_name": "ESQUIMAL GRANDE",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T23:15:13.844Z"
        },
        {
                "id": "sale_1789600314098_4m4ao",
                "sale_number": "TICK-744710",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 358,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789581994012_afpt",
                                "product_name": "paleta de crema grande",
                                "quantity": 5,
                                "price": 30,
                                "subtotal": 150
                        },
                        {
                                "product_id": "prod_1789426642889_x5qa",
                                "product_name": "Paleta de agua chica",
                                "quantity": 4,
                                "price": 12,
                                "subtotal": 48
                        },
                        {
                                "product_id": "prod_1789434885052_e855",
                                "product_name": "Chaparrita",
                                "quantity": 3,
                                "price": 20,
                                "subtotal": 60
                        },
                        {
                                "product_id": "prod_1789503512135_chg1",
                                "product_name": "paleta de agua grande",
                                "quantity": 4,
                                "price": 25,
                                "subtotal": 100
                        }
                ],
                "created_at": "2026-09-16T23:11:54.098Z"
        },
        {
                "id": "sale_1789599545606_72hau",
                "sale_number": "TICK-119342",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 125,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 5,
                                "price": 25,
                                "subtotal": 125
                        }
                ],
                "created_at": "2026-09-16T22:59:05.606Z"
        },
        {
                "id": "sale_1789599540679_spmei",
                "sale_number": "TICK-940481",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789599530518_4toy",
                                "product_name": "Mordisco",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T22:59:00.679Z"
        },
        {
                "id": "930bd56d-daee-4aef-bd0d-0724fac4b9fa",
                "sale_number": "CATALOG-1789599530521",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-16T22:58:53.783637+00:00",
                "local_id": "930bd56d-daee-4aef-bd0d-0724fac4b9fa"
        },
        {
                "id": "sale_1789599527470_t7hfz",
                "sale_number": "TICK-290903",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 40,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789343891215_tlc3",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T22:58:47.471Z"
        },
        {
                "id": "sale_1789599427511_v349e",
                "sale_number": "TICK-800455",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 100,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 4,
                                "price": 25,
                                "subtotal": 100
                        }
                ],
                "created_at": "2026-09-16T22:57:07.511Z"
        },
        {
                "id": "sale_1789599152125_uvqk4",
                "sale_number": "TICK-708191",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T22:52:32.125Z"
        },
        {
                "id": "sale_1789599111287_wd53x",
                "sale_number": "TICK-795293",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 120,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_crema_gde",
                                "product_name": "Paleta Crema Grande",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        },
                        {
                                "product_id": "prod_1789439246280_ciwz",
                                "product_name": "AGUA GRANDE",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_trufa",
                                "product_name": "Trufa",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T22:51:51.287Z"
        },
        {
                "id": "sale_1789598832925_uuk3d",
                "sale_number": "TICK-527865",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789578850152_p01a",
                                "product_name": "Helado Vaso 2",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        },
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T22:47:12.925Z"
        },
        {
                "id": "sale_1789598511425_wdyuj",
                "sale_number": "TICK-510819",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789524184275_n7yl",
                                "product_name": "Escamocha grande",
                                "quantity": 1,
                                "price": 75,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T22:41:51.425Z"
        },
        {
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "created_at": "2026-09-16T22:36:36.519Z",
                "id": "sale_1789598196519_0t9u5",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-415862",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 15
        },
        {
                "id": "sale_1789598098268_zb47p",
                "sale_number": "TICK-424599",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 145,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_semillas",
                                "product_name": "Semillas",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_ag_nat_grande",
                                "product_name": "Agua Natural Grande",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789524184275_n7yl",
                                "product_name": "Escamocha grande",
                                "quantity": 1,
                                "price": 75,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T22:34:58.268Z"
        },
        {
                "id": "8091046c-07b5-4987-9784-446a5ade8ac4",
                "sale_number": "CATALOG-1789597639752",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-16T22:29:20.392044+00:00",
                "local_id": "8091046c-07b5-4987-9784-446a5ade8ac4"
        },
        {
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "created_at": "2026-09-16T22:22:54.067Z",
                "id": "sale_1789597374067_1zp84",
                "items": [
                        {
                                "product_id": "prod_1789440083334_8qwx",
                                "product_name": "VASO 1 BOLITA",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_mini",
                                "product_name": "Mini",
                                "quantity": 6,
                                "price": 5,
                                "subtotal": 30
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-392494",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 50
        },
        {
                "id": "sale_1789597315985_bbj06",
                "sale_number": "TICK-932688",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 40,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789343891215_tlc3",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 2,
                                "price": 20,
                                "subtotal": 40
                        }
                ],
                "created_at": "2026-09-16T22:21:55.985Z"
        },
        {
                "id": "sale_1789597273440_qs4b3",
                "sale_number": "TICK-924440",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 85,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_paleta_nuez_esp",
                                "product_name": "Nuez Especial",
                                "quantity": 1,
                                "price": 40,
                                "subtotal": 40
                        }
                ],
                "created_at": "2026-09-16T22:21:13.441Z"
        },
        {
                "id": "sale_1789596980758_od8ha",
                "sale_number": "TICK-471495",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789519605495_luuy",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T22:16:20.758Z"
        },
        {
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "created_at": "2026-09-16T22:13:17.947Z",
                "id": "sale_1789596797947_3hcp8",
                "items": [
                        {
                                "product_id": "prod_1789503512135_chg1",
                                "product_name": "paleta de agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-479022",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 25
        },
        {
                "id": "sale_1789596605692_23xzs",
                "sale_number": "TICK-690838",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 100,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789519605495_luuy",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789510933216_lzqv",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T22:10:05.692Z"
        },
        {
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "created_at": "2026-09-16T22:09:04.851Z",
                "id": "sale_1789596544851_obizj",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-874845",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 15
        },
        {
                "id": "sale_1789596395852_t1yyf",
                "sale_number": "TICK-349254",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 295,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789511159938_cxxn",
                                "product_name": "Paleta agua grande",
                                "quantity": 10,
                                "price": 25,
                                "subtotal": 250
                        },
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T22:06:35.853Z"
        },
        {
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "created_at": "2026-09-16T21:57:43.466Z",
                "id": "sale_1789595863466_u5s3w",
                "items": [
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789427782105_pdn1",
                                "product_name": "PALETA DE AGUA CHICA",
                                "quantity": 1,
                                "price": 12,
                                "subtotal": 12
                        },
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-624148",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 82
        },
        {
                "id": "sale_1789595817815_r7bmf",
                "sale_number": "TICK-903250",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T21:56:57.815Z"
        },
        {
                "id": "sale_1789595155106_4p1u3",
                "sale_number": "TICK-963884",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 18,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maq_sencillo",
                                "product_name": "Helado M�quina Sencillo",
                                "quantity": 1,
                                "price": 18,
                                "subtotal": 18
                        }
                ],
                "created_at": "2026-09-16T21:45:55.106Z"
        },
        {
                "id": "sale_1789594648410_yunh5",
                "sale_number": "TICK-747119",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789439246280_ciwz",
                                "product_name": "AGUA GRANDE",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T21:37:28.410Z"
        },
        {
                "id": "sale_1789594610915_of2r7",
                "sale_number": "TICK-429008",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 195,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_tostilocos",
                                "product_name": "Tostilocos",
                                "quantity": 2,
                                "price": 55,
                                "subtotal": 110
                        },
                        {
                                "product_id": "p_fresa_congelada",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T21:36:50.915Z"
        },
        {
                "id": "sale_1789594095001_9zeaw",
                "sale_number": "TICK-293470",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 57,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 3,
                                "price": 15,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789586005313_lxkq",
                                "product_name": "Paleta Agua Chica",
                                "quantity": 1,
                                "price": 12,
                                "subtotal": 12
                        }
                ],
                "created_at": "2026-09-16T21:28:15.001Z"
        },
        {
                "id": "sale_1789594002074_sxbvu",
                "sale_number": "TICK-625146",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 190,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789522617796_i9hi",
                                "product_name": "Cono Chocolate",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_ag_mediana",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T21:26:42.074Z"
        },
        {
                "id": "sale_1789593996170_m6ff4",
                "sale_number": "TICK-709052",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 80,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789510937494_4n1e",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789511159938_cxxn",
                                "product_name": "Paleta agua grande",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T21:26:36.170Z"
        },
        {
                "id": "sale_1789593590219_x3bhs",
                "sale_number": "TICK-637638",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 15,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789593561338_lvgx",
                                "product_name": "Gomitas Carrucel",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T21:19:50.219Z"
        },
        {
                "id": "sale_1789593250410_hnxqx",
                "sale_number": "TICK-205841",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 20,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T21:14:10.410Z"
        },
        {
                "id": "sale_1789593005268_37lze",
                "sale_number": "TICK-776854",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 20,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T21:10:05.268Z"
        },
        {
                "id": "sale_1789592843924_u4m7h",
                "sale_number": "TICK-246677",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 40,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789592822603_7wpm",
                                "product_name": "Helado Vaso 3",
                                "quantity": 1,
                                "price": 40,
                                "subtotal": 40
                        }
                ],
                "created_at": "2026-09-16T21:07:23.924Z"
        },
        {
                "id": "sale_1789592376040_pvz9u",
                "sale_number": "TICK-221985",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 35,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789578850152_p01a",
                                "product_name": "Helado Vaso 2",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-16T20:59:36.041Z"
        },
        {
                "id": "sale_1789591717390_c6dam",
                "sale_number": "TICK-187533",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 160,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_cubierto",
                                "product_name": "Cono Cubierto",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        },
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789511159938_cxxn",
                                "product_name": "Paleta agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T20:48:37.390Z"
        },
        {
                "id": "sale_1789590999442_6jilo",
                "sale_number": "TICK-907380",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789590955783_zcr9",
                                "product_name": "Cheetos preparados",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "created_at": "2026-09-16T20:36:39.442Z"
        },
        {
                "id": "sale_1789590852410_qfma9",
                "sale_number": "TICK-901959",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 3,
                                "price": 15,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T20:34:12.410Z"
        },
        {
                "id": "sale_1789590524343_myqsj",
                "sale_number": "TICK-429907",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T20:28:44.343Z"
        },
        {
                "id": "sale_1789590450558_4za1d",
                "sale_number": "TICK-547978",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 135,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 3,
                                "price": 45,
                                "subtotal": 135
                        }
                ],
                "created_at": "2026-09-16T20:27:30.558Z"
        },
        {
                "id": "sale_1789590442209_p8g1v",
                "sale_number": "TICK-295948",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 35,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_vaso1",
                                "product_name": "Helado Vaso 1",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789588715064_n0ik",
                                "product_name": "Gomitas carrucel",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T20:27:22.209Z"
        },
        {
                "id": "sale_1789590344046_fo52o",
                "sale_number": "TICK-431167",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789511159938_cxxn",
                                "product_name": "Paleta agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T20:25:44.046Z"
        },
        {
                "id": "sale_1789589910630_lgdh7",
                "sale_number": "TICK-211987",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 90,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-16T20:18:30.630Z"
        },
        {
                "id": "sale_t2_today_09",
                "sale_number": "TICK-T2-209",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "encargado10lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino)",
                "total": 75,
                "payment_method": "card",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 3,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T20:15:00.000Z"
        },
        {
                "id": "sale_cnop_today_07",
                "sale_number": "TICK-CNOP-204",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "encargado12lafuente@gmail.com",
                "cashier_name": "Encargada CNOP (Vespertino)",
                "total": 193,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "p_paleta_agua_gd",
                                "product_name": "Paleta de Agua Grande",
                                "product_code": "PAL-AGD",
                                "category": "paletas",
                                "price": 22,
                                "quantity": 4,
                                "subtotal": 88
                        },
                        {
                                "product_id": "a5c3b67a-c276-42f2-863f-a01c6f9294ed",
                                "product_name": "Cono Doble Vainilla",
                                "product_code": "CDV",
                                "category": "helados",
                                "price": 45,
                                "quantity": 1,
                                "subtotal": 45
                        },
                        {
                                "product_id": "sup_agua_med",
                                "product_name": "Agua Mediana",
                                "product_code": "AG-MED",
                                "category": "aguas",
                                "price": 30,
                                "quantity": 1,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_chicle",
                                "product_name": "Chicle",
                                "product_code": "CHIC",
                                "category": "dulces",
                                "price": 10,
                                "quantity": 3,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T20:10:00.000Z"
        },
        {
                "id": "sale_1789589329432_fezm7",
                "sale_number": "TICK-940405",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 12,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789586005313_lxkq",
                                "product_name": "Paleta Agua Chica",
                                "quantity": 1,
                                "price": 12,
                                "subtotal": 12
                        }
                ],
                "created_at": "2026-09-16T20:08:49.432Z"
        },
        {
                "id": "sale_1789588696323_bj6wz",
                "sale_number": "TICK-424105",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 22,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_agua_chica",
                                "product_name": "Sabrita Sola",
                                "quantity": 1,
                                "price": 22,
                                "subtotal": 22
                        }
                ],
                "created_at": "2026-09-16T19:58:16.323Z"
        },
        {
                "id": "sale_1789588665717_41x6o",
                "sale_number": "TICK-974602",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 155,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789520111905_q9lr",
                                "product_name": "Fresa Natural",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "prod_1789521409924_eswt",
                                "product_name": "Tostiloco morados",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "created_at": "2026-09-16T19:57:45.718Z"
        },
        {
                "id": "sale_1789588553805_aeu4e",
                "sale_number": "TICK-961470",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 110,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        },
                        {
                                "product_id": "prod_1789521489453_elhu",
                                "product_name": "Papas cueros",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T19:55:53.805Z"
        },
        {
                "id": "sale_1789588247615_05qyv",
                "sale_number": "TICK-250297",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789581994012_afpt",
                                "product_name": "paleta de crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T19:50:47.615Z"
        },
        {
                "id": "sale_1789587859987_6ckfi",
                "sale_number": "TICK-549052",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 77,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_barcel_solo",
                                "product_name": "Barcel Solo",
                                "quantity": 1,
                                "price": 22,
                                "subtotal": 22
                        },
                        {
                                "product_id": "prod_1789521489453_elhu",
                                "product_name": "Papas cueros",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        },
                        {
                                "product_id": "p_gomi_fish",
                                "product_name": "Gomi Fish",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "created_at": "2026-09-16T19:44:19.987Z"
        },
        {
                "id": "sale_1789587790122_vjos6",
                "sale_number": "TICK-669114",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 185,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789587405124_mzg6",
                                "product_name": "Escamocha Chica",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "prod_1789519605495_luuy",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789520111905_q9lr",
                                "product_name": "Fresa Natural",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "p_paleta_payaso",
                                "product_name": "Paleta Payaso",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T19:43:10.122Z"
        },
        {
                "id": "sale_1789587743856_g1als",
                "sale_number": "TICK-591445",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 310,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 3,
                                "price": 15,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789521953007_i4xo",
                                "product_name": "Doritos Queso",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789521908175_93he",
                                "product_name": "Chetos preparados",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "prod_1789518578935_d117",
                                "product_name": "Chetos nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789510937494_4n1e",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T19:42:23.856Z"
        },
        {
                "id": "sale_1789587638246_fedk2",
                "sale_number": "TICK-836563",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T19:40:38.246Z"
        },
        {
                "id": "sale_1789587609285_apika",
                "sale_number": "TICK-904042",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 230,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        },
                        {
                                "product_id": "prod_1789587405124_mzg6",
                                "product_name": "Escamocha Chica",
                                "quantity": 2,
                                "price": 55,
                                "subtotal": 110
                        },
                        {
                                "product_id": "prod_1789520111905_q9lr",
                                "product_name": "Fresa Natural",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "p_gomi_fish",
                                "product_name": "Gomi Fish",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "created_at": "2026-09-16T19:40:09.285Z"
        },
        {
                "id": "sale_1789587510429_zbm65",
                "sale_number": "TICK-871728",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 12,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789586005313_lxkq",
                                "product_name": "Paleta Agua Chica",
                                "quantity": 1,
                                "price": 12,
                                "subtotal": 12
                        }
                ],
                "created_at": "2026-09-16T19:38:30.429Z"
        },
        {
                "id": "sale_1789587494673_qax8t",
                "sale_number": "TICK-456703",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T19:38:14.673Z"
        },
        {
                "id": "sale_1789587203318_d2rm5",
                "sale_number": "TICK-721608",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_payaso",
                                "product_name": "Paleta Payaso",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T19:33:23.318Z"
        },
        {
                "id": "sale_1789587172755_k6kqd",
                "sale_number": "TICK-542363",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 180,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789586064937_7n2l",
                                "product_name": "Cono Doble Chocolate",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789586128844_kn9b",
                                "product_name": "Cono Doble Vainilla",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T19:32:52.756Z"
        },
        {
                "id": "sale_t2_today_08",
                "sale_number": "TICK-T2-208",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "encargado10lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino)",
                "total": 660,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "adef0123-f92d-46ed-8797-2dfb46fb5b6d",
                                "product_name": "Cono Doble Chocolate",
                                "product_code": "CDCH",
                                "category": "helados",
                                "price": 45,
                                "quantity": 8,
                                "subtotal": 360
                        },
                        {
                                "product_id": "sup_agua_1l",
                                "product_name": "Agua 1 Lt",
                                "product_code": "AG-1L",
                                "category": "aguas",
                                "price": 35,
                                "quantity": 6,
                                "subtotal": 210
                        },
                        {
                                "product_id": "p_paleta_agua",
                                "product_name": "Paleta de Agua",
                                "product_code": "PAL-AGUA",
                                "category": "paletas",
                                "price": 18,
                                "quantity": 5,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-16T19:30:00.000Z"
        },
        {
                "id": "sale_1789586739706_eswjm",
                "sale_number": "TICK-814502",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 15,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789506101474_lslp",
                                "product_name": "Paleta mini",
                                "quantity": 3,
                                "price": 5,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T19:25:39.706Z"
        },
        {
                "id": "sale_1789586185524_tl8nn",
                "sale_number": "TICK-173333",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 102,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789586005313_lxkq",
                                "product_name": "Paleta Agua Chica",
                                "quantity": 1,
                                "price": 12,
                                "subtotal": 12
                        },
                        {
                                "product_id": "prod_1789586128844_kn9b",
                                "product_name": "Cono Doble Vainilla",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-16T19:16:25.525Z"
        },
        {
                "id": "sale_cnop_today_06",
                "sale_number": "TICK-CNOP-203",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "encargado12lafuente@gmail.com",
                "cashier_name": "Encargada CNOP (Vespertino)",
                "total": 298,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "p_paleta_chaparrita",
                                "product_name": "Paleta Chaparrita",
                                "product_code": "PAL-CHAP",
                                "category": "paletas",
                                "price": 18,
                                "quantity": 6,
                                "subtotal": 108
                        },
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 4,
                                "subtotal": 100
                        },
                        {
                                "product_id": "p_nieve_vaso12",
                                "product_name": "Nieve Vaso #12",
                                "product_code": "NV-12",
                                "category": "helados",
                                "price": 45,
                                "quantity": 2,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-16T19:15:00.000Z"
        },
        {
                "id": "sale_1789585937615_vevdi",
                "sale_number": "TICK-956181",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T19:12:17.615Z"
        },
        {
                "id": "sale_cnop_today_05",
                "sale_number": "TICK-CNOP-202",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "encargado12lafuente@gmail.com",
                "cashier_name": "Encargada CNOP (Vespertino)",
                "total": 32,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "p_paleta_agua",
                                "product_name": "Paleta de Agua",
                                "product_code": "PAL-AGUA",
                                "category": "paletas",
                                "price": 18,
                                "quantity": 1,
                                "subtotal": 18
                        },
                        {
                                "product_id": "p_chicle",
                                "product_name": "Chicle",
                                "product_code": "CHIC",
                                "category": "dulces",
                                "price": 10,
                                "quantity": 1,
                                "subtotal": 10
                        },
                        {
                                "product_id": "p_chicle",
                                "product_name": "Chicle",
                                "product_code": "CHIC",
                                "category": "dulces",
                                "price": 4,
                                "quantity": 1,
                                "subtotal": 4
                        }
                ],
                "created_at": "2026-09-16T19:10:00.000Z"
        },
        {
                "id": "sale_1789585711849_dbc2m",
                "sale_number": "TICK-136895",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 90,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-16T19:08:31.849Z"
        },
        {
                "id": "sale_1789585542555_9o0jp",
                "sale_number": "TICK-587960",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 90,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 3,
                                "price": 15,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789582932954_4zly",
                                "product_name": "Nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T19:05:42.557Z"
        },
        {
                "id": "sale_1789585400974_lhkty",
                "sale_number": "TICK-333741",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 2,
                                "price": 15,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T19:03:20.974Z"
        },
        {
                "id": "sale_1789585365069_rwqft",
                "sale_number": "TICK-189749",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 15,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T19:02:45.069Z"
        },
        {
                "id": "sale_1789585324276_r9q8q",
                "sale_number": "TICK-824019",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 3,
                                "price": 25,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T19:02:04.276Z"
        },
        {
                "id": "sale_1789584704894_eaqpg",
                "sale_number": "TICK-480945",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_agua_gde",
                                "product_name": "Paleta Agua Grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T18:51:44.894Z"
        },
        {
                "id": "sale_1789584551506_ic166",
                "sale_number": "TICK-216369",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 5,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789584480211_lvn1",
                                "product_name": "Paleta mini",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "created_at": "2026-09-16T18:49:11.507Z"
        },
        {
                "id": "sale_1789584305189_s04l0",
                "sale_number": "TICK-226496",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T18:45:05.190Z"
        },
        {
                "id": "sale_1789584230511_xb5v5",
                "sale_number": "TICK-673613",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 90,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-16T18:43:50.512Z"
        },
        {
                "id": "sale_1789584138534_8zfhu",
                "sale_number": "TICK-688574",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 20,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_nat_grande",
                                "product_name": "Agua Natural Grande",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T18:42:18.534Z"
        },
        {
                "id": "sale_1789584110019_skqo0",
                "sale_number": "TICK-489421",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 3,
                                "price": 15,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:41:50.019Z"
        },
        {
                "id": "sale_1789584024347_hg86o",
                "sale_number": "TICK-429242",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523132831_1n2c",
                                "product_name": "Trol",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        },
                        {
                                "product_id": "p_ag_nat_chica",
                                "product_name": "Agua Natural Chica",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T18:40:24.347Z"
        },
        {
                "id": "sale_1789583903563_d5jet",
                "sale_number": "TICK-128596",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_vaso3",
                                "product_name": "Helado Vaso 3",
                                "quantity": 1,
                                "price": 40,
                                "subtotal": 40
                        },
                        {
                                "product_id": "p_helado_vaso2",
                                "product_name": "Helado Vaso 2",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-16T18:38:23.563Z"
        },
        {
                "id": "sale_1789583803880_5jhen",
                "sale_number": "TICK-878584",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 155,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789521953007_i4xo",
                                "product_name": "Doritos Queso",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789583748683_suar",
                                "product_name": "Canasta Doble",
                                "quantity": 1,
                                "price": 40,
                                "subtotal": 40
                        }
                ],
                "created_at": "2026-09-16T18:36:43.880Z"
        },
        {
                "id": "sale_1789583784820_hcw5c",
                "sale_number": "TICK-151291",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 20,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T18:36:24.820Z"
        },
        {
                "id": "sale_1789583729206_1gntd",
                "sale_number": "TICK-613323",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-16T18:35:29.206Z"
        },
        {
                "id": "sale_1789583688277_ml3ag",
                "sale_number": "TICK-392179",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 100,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523192471_i682",
                                "product_name": "Tostilocos",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        },
                        {
                                "product_id": "prod_1789523132831_1n2c",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T18:34:48.277Z"
        },
        {
                "id": "sale_1789583637843_ro2gm",
                "sale_number": "TICK-660631",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 40,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789582766973_q8p2",
                                "product_name": "Canasta doble",
                                "quantity": 1,
                                "price": 40,
                                "subtotal": 40
                        }
                ],
                "created_at": "2026-09-16T18:33:57.843Z"
        },
        {
                "id": "sale_1789583404241_engr4",
                "sale_number": "TICK-590564",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 85,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        },
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T18:30:04.242Z"
        },
        {
                "id": "sale_1789583391976_e6xi9",
                "sale_number": "TICK-801999",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 2,
                                "price": 15,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T18:29:51.976Z"
        },
        {
                "id": "sale_1789583209677_8fmn8",
                "sale_number": "TICK-893161",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:26:49.677Z"
        },
        {
                "id": "sale_1789583207126_ylolk",
                "sale_number": "TICK-969701",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 20,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T18:26:47.126Z"
        },
        {
                "id": "sale_1789583124666_f5krr",
                "sale_number": "TICK-739526",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 105,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 3,
                                "price": 25,
                                "subtotal": 75
                        },
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T18:25:24.667Z"
        },
        {
                "id": "sale_1789583106074_o6ksa",
                "sale_number": "TICK-460935",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 95,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_frappe",
                                "product_name": "Frapp�",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789582932954_4zly",
                                "product_name": "Nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:25:06.074Z"
        },
        {
                "id": "sale_1789583082591_yox1f",
                "sale_number": "TICK-217816",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 5,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789506101474_lslp",
                                "product_name": "Paleta mini",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "created_at": "2026-09-16T18:24:42.591Z"
        },
        {
                "id": "sale_1789583037472_uxgn5",
                "sale_number": "TICK-746361",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 130,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "p_helado_vaso1",
                                "product_name": "Helado Vaso 1",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T18:23:57.472Z"
        },
        {
                "id": "sale_1789583020307_bjwma",
                "sale_number": "TICK-654460",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 115,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523132831_1n2c",
                                "product_name": "Trol",
                                "quantity": 3,
                                "price": 30,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T18:23:40.307Z"
        },
        {
                "id": "sale_1789582890006_fzofa",
                "sale_number": "TICK-539915",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 110,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 3,
                                "price": 25,
                                "subtotal": 75
                        },
                        {
                                "product_id": "prod_1789439085479_k88o",
                                "product_name": "VASO 2 BOLITAS",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-16T18:21:30.006Z"
        },
        {
                "id": "sale_res_today_03",
                "sale_number": "TICK-690171",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "encargado4lafuente@gmail.com",
                "cashier_name": "Encargada Rescate (Vespertino)",
                "total": 90,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "sup_agua_1l",
                                "product_name": "Agua Mediana",
                                "product_code": "AG-MED",
                                "category": "aguas",
                                "price": 30,
                                "quantity": 1,
                                "subtotal": 30
                        },
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 1,
                                "subtotal": 25
                        },
                        {
                                "product_id": "p_nieve_vaso",
                                "product_name": "Vaso 1 bolita",
                                "product_code": "NV-1",
                                "category": "helados",
                                "price": 20,
                                "quantity": 1,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_carrucel",
                                "product_name": "Carrucel",
                                "product_code": "CARR",
                                "category": "dulces",
                                "price": 15,
                                "quantity": 1,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T18:20:00.000Z"
        },
        {
                "id": "94725a28-05a5-4372-9a38-368ed76e640e",
                "sale_number": "CATALOG-1789582766981",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-16T18:19:36.096041+00:00",
                "local_id": "94725a28-05a5-4372-9a38-368ed76e640e"
        },
        {
                "id": "sale_1789582764475_uo93m",
                "sale_number": "TICK-496789",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:19:24.475Z"
        },
        {
                "id": "sale_1789582657954_c3ww3",
                "sale_number": "TICK-695740",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 3,
                                "price": 25,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T18:17:37.954Z"
        },
        {
                "id": "sale_1789582525546_t0til",
                "sale_number": "TICK-918025",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 3,
                                "price": 15,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:15:25.546Z"
        },
        {
                "id": "sale_1789582451269_hv842",
                "sale_number": "TICK-552286",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 155,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789426455958_he78",
                                "product_name": "Esquimal Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_cono_cubierto",
                                "product_name": "Cono Cubierto",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_helado_vaso1",
                                "product_name": "Helado Vaso 1",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:14:11.269Z"
        },
        {
                "id": "sale_1789582364124_d0d02",
                "sale_number": "TICK-518086",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 3,
                                "price": 25,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T18:12:44.124Z"
        },
        {
                "id": "sale_1789582168277_nd0s9",
                "sale_number": "TICK-861055",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789524447372_5210",
                                "product_name": "Agua chica",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789510933216_lzqv",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T18:09:28.277Z"
        },
        {
                "id": "sale_1789582165407_4lk28",
                "sale_number": "TICK-914578",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789439246280_ciwz",
                                "product_name": "AGUA GRANDE",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:09:25.407Z"
        },
        {
                "id": "sale_1789582038673_8jbax",
                "sale_number": "TICK-198211",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789581994012_afpt",
                                "product_name": "paleta de crema grande",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-16T18:07:18.673Z"
        },
        {
                "id": "sale_1789581914503_746gh",
                "sale_number": "TICK-352260",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_doble_vain",
                                "product_name": "Cono Doble Vainilla",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:05:14.504Z"
        },
        {
                "id": "sale_1789581712706_ve2h7",
                "sale_number": "TICK-175229",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T18:01:52.706Z"
        },
        {
                "id": "sale_1789581701975_gss6g",
                "sale_number": "TICK-813528",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_crema_gde",
                                "product_name": "Paleta Crema Grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T18:01:41.975Z"
        },
        {
                "id": "sale_1789581667496_u0ggp",
                "sale_number": "TICK-658064",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789519605495_luuy",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T18:01:07.496Z"
        },
        {
                "id": "sale_1789581613568_9sguz",
                "sale_number": "TICK-401771",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 65,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789501746703_ww8e",
                                "product_name": "Fresas Congeladas",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_helado_vaso1",
                                "product_name": "Helado Vaso 1",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T18:00:13.568Z"
        },
        {
                "id": "sale_t2_today_07",
                "sale_number": "TICK-T2-207",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "encargado10lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino)",
                "total": 810,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "sup_agua_1l",
                                "product_name": "Agua 1 Lt",
                                "product_code": "AG-1L",
                                "category": "aguas",
                                "price": 35,
                                "quantity": 10,
                                "subtotal": 350
                        },
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 10,
                                "subtotal": 250
                        },
                        {
                                "product_id": "p_paleta_agua",
                                "product_name": "Paleta de Agua",
                                "product_code": "PAL-AGUA",
                                "category": "paletas",
                                "price": 18,
                                "quantity": 10,
                                "subtotal": 180
                        },
                        {
                                "product_id": "p_paleta_leche",
                                "product_name": "Paleta de Leche",
                                "product_code": "PAL-LECHE",
                                "category": "paletas",
                                "price": 20,
                                "quantity": 1,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_chicle",
                                "product_name": "Chicle",
                                "product_code": "CHIC",
                                "category": "dulces",
                                "price": 10,
                                "quantity": 1,
                                "subtotal": 10
                        }
                ],
                "created_at": "2026-09-16T18:00:00.000Z"
        },
        {
                "id": "sale_1789580776070_o0fjy",
                "sale_number": "TICK-200414",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 20,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_nat_grande",
                                "product_name": "Agua Natural Grande",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T17:46:16.070Z"
        },
        {
                "id": "sale_res_today_04",
                "sale_number": "TICK-RES-201",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "encargado4lafuente@gmail.com",
                "cashier_name": "Encargada Rescate (Vespertino)",
                "total": 25,
                "payment_method": "card",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 1,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T17:40:00.000Z"
        },
        {
                "id": "sale_1789580314867_7hhtn",
                "sale_number": "TICK-918162",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T17:38:34.867Z"
        },
        {
                "id": "sale_1789580145751_135mt",
                "sale_number": "TICK-175033",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 15,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T17:35:45.751Z"
        },
        {
                "id": "sale_1789580077082_5uq80",
                "sale_number": "TICK-389519",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 15,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T17:34:37.082Z"
        },
        {
                "id": "sale_1789579478374_0kru0",
                "sale_number": "TICK-468195",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 35,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789578850152_p01a",
                                "product_name": "Helado Vaso 2",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-16T17:24:38.374Z"
        },
        {
                "id": "sale_cnop_today_04",
                "sale_number": "TICK-CNOP-201",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "encargado12lafuente@gmail.com",
                "cashier_name": "Encargada CNOP (Vespertino)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 2,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T17:20:00.000Z"
        },
        {
                "id": "sale_1789578891953_npw7x",
                "sale_number": "TICK-639023",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 35,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789578850152_p01a",
                                "product_name": "Helado Vaso 2",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-16T17:14:51.954Z"
        },
        {
                "id": "sale_1789578826575_b6lv5",
                "sale_number": "TICK-789848",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado11lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Matutino) (encargado11lafuente@gmail.com)",
                "total": 20,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_mini",
                                "product_name": "Mini",
                                "quantity": 4,
                                "price": 5,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T17:13:46.575Z"
        },
        {
                "id": "sale_1789577451650_2c7a4",
                "sale_number": "TICK-941695",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T16:50:51.650Z"
        },
        {
                "id": "sale_t2_today_06",
                "sale_number": "TICK-T2-206",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "encargado10lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino)",
                "total": 735,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "a5c3b67a-c276-42f2-863f-a01c6f9294ed",
                                "product_name": "Cono Doble Vainilla",
                                "product_code": "CDV",
                                "category": "helados",
                                "price": 45,
                                "quantity": 7,
                                "subtotal": 315
                        },
                        {
                                "product_id": "p_nieve_vaso12",
                                "product_name": "Nieve Vaso #12",
                                "product_code": "NV-12",
                                "category": "helados",
                                "price": 45,
                                "quantity": 6,
                                "subtotal": 270
                        },
                        {
                                "product_id": "p_paleta_leche",
                                "product_name": "Paleta de Leche",
                                "product_code": "PAL-LECHE",
                                "category": "paletas",
                                "price": 20,
                                "quantity": 5,
                                "subtotal": 100
                        },
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 2,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T16:15:00.000Z"
        },
        {
                "id": "sale_t2_today_05",
                "sale_number": "TICK-T2-205",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "encargado9lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Matutino)",
                "total": 40,
                "payment_method": "card",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "p_paleta_leche",
                                "product_name": "Paleta de Leche",
                                "product_code": "PAL-LECHE",
                                "category": "paletas",
                                "price": 20,
                                "quantity": 2,
                                "subtotal": 40
                        }
                ],
                "created_at": "2026-09-16T15:10:00.000Z"
        },
        {
                "id": "sale_cnop_today_03",
                "sale_number": "TICK-CNOP-103",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "encargado11lafuente@gmail.com",
                "cashier_name": "Encargada CNOP (Matutino)",
                "total": 200,
                "payment_method": "card",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "a5c3b67a-c276-42f2-863f-a01c6f9294ed",
                                "product_name": "Cono Doble Vainilla",
                                "product_code": "CDV",
                                "category": "helados",
                                "price": 45,
                                "quantity": 4,
                                "subtotal": 180
                        },
                        {
                                "product_id": "p_paleta_leche",
                                "product_name": "Paleta de Leche",
                                "product_code": "PAL-LECHE",
                                "category": "paletas",
                                "price": 20,
                                "quantity": 1,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T14:15:00.000Z"
        },
        {
                "id": "sale_t2_today_04",
                "sale_number": "TICK-T2-204",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "encargado9lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Matutino)",
                "total": 45,
                "payment_method": "card",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "a5c3b67a-c276-42f2-863f-a01c6f9294ed",
                                "product_name": "Cono Doble Vainilla",
                                "product_code": "CDV",
                                "category": "helados",
                                "price": 45,
                                "quantity": 1,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T14:10:00.000Z"
        },
        {
                "id": "sale_t2_today_03",
                "sale_number": "TICK-T2-203",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "encargado9lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Matutino)",
                "total": 310,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 6,
                                "subtotal": 150
                        },
                        {
                                "product_id": "sup_agua_1l",
                                "product_name": "Agua 1 Lt",
                                "product_code": "AG-1L",
                                "category": "aguas",
                                "price": 35,
                                "quantity": 4,
                                "subtotal": 140
                        },
                        {
                                "product_id": "p_paleta_leche",
                                "product_name": "Paleta de Leche",
                                "product_code": "PAL-LECHE",
                                "category": "paletas",
                                "price": 20,
                                "quantity": 1,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T13:20:00.000Z"
        },
        {
                "id": "sale_cnop_today_02",
                "sale_number": "TICK-CNOP-102",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "encargado11lafuente@gmail.com",
                "cashier_name": "Encargada CNOP (Matutino)",
                "total": 400,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "p_nieve_vaso12",
                                "product_name": "Nieve Vaso #12",
                                "product_code": "NV-12",
                                "category": "helados",
                                "price": 45,
                                "quantity": 4,
                                "subtotal": 180
                        },
                        {
                                "product_id": "p_paleta_agua",
                                "product_name": "Paleta de Agua",
                                "product_code": "PAL-AGUA",
                                "category": "paletas",
                                "price": 18,
                                "quantity": 10,
                                "subtotal": 180
                        },
                        {
                                "product_id": "p_chicle",
                                "product_name": "Chicle",
                                "product_code": "CHIC",
                                "category": "dulces",
                                "price": 10,
                                "quantity": 4,
                                "subtotal": 40
                        }
                ],
                "created_at": "2026-09-16T12:00:00.000Z"
        },
        {
                "id": "sale_t2_today_02",
                "sale_number": "TICK-T2-202",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "encargado9lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Matutino)",
                "total": 342,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "p_nieve_vaso12",
                                "product_name": "Nieve Vaso #12",
                                "product_code": "NV-12",
                                "category": "helados",
                                "price": 45,
                                "quantity": 4,
                                "subtotal": 180
                        },
                        {
                                "product_id": "p_paleta_agua",
                                "product_name": "Paleta de Agua",
                                "product_code": "PAL-AGUA",
                                "category": "paletas",
                                "price": 18,
                                "quantity": 9,
                                "subtotal": 162
                        }
                ],
                "created_at": "2026-09-16T11:45:00.000Z"
        },
        {
                "id": "sale_cnop_today_01",
                "sale_number": "TICK-CNOP-101",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Ma�ana",
                "cashier_id": "encargado11lafuente@gmail.com",
                "cashier_name": "Encargada CNOP (Matutino)",
                "total": 390,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 6,
                                "subtotal": 150
                        },
                        {
                                "product_id": "sup_agua_1l",
                                "product_name": "Agua 1 Lt",
                                "product_code": "AG-1L",
                                "category": "aguas",
                                "price": 35,
                                "quantity": 4,
                                "subtotal": 140
                        },
                        {
                                "product_id": "p_paleta_leche",
                                "product_name": "Paleta de Leche",
                                "product_code": "PAL-LECHE",
                                "category": "paletas",
                                "price": 20,
                                "quantity": 5,
                                "subtotal": 100
                        }
                ],
                "created_at": "2026-09-16T10:30:00.000Z"
        },
        {
                "id": "sale_t2_today_01",
                "sale_number": "TICK-T2-201",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "encargado9lafuente@gmail.com",
                "cashier_name": "Encargada Tagarete 2 (Matutino)",
                "total": 435,
                "payment_method": "cash",
                "status": "COMPLETED",
                "items": [
                        {
                                "product_id": "adbc5511-68a8-4525-97a3-ac7972856e89",
                                "product_name": "Cono Sencillo",
                                "product_code": "CS",
                                "category": "helados",
                                "price": 25,
                                "quantity": 7,
                                "subtotal": 175
                        },
                        {
                                "product_id": "sup_agua_1l",
                                "product_name": "Agua 1 Lt",
                                "product_code": "AG-1L",
                                "category": "aguas",
                                "price": 35,
                                "quantity": 4,
                                "subtotal": 140
                        },
                        {
                                "product_id": "p_paleta_leche",
                                "product_name": "Paleta de Leche",
                                "product_code": "PAL-LECHE",
                                "category": "paletas",
                                "price": 20,
                                "quantity": 6,
                                "subtotal": 120
                        }
                ],
                "created_at": "2026-09-16T10:15:00.000Z"
        },
        {
                "id": "sale_1789526968619_4p96i",
                "sale_number": "TICK-892892",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 100,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789521489453_elhu",
                                "product_name": "Papas cueros",
                                "quantity": 2,
                                "price": 50,
                                "subtotal": 100
                        }
                ],
                "created_at": "2026-09-16T02:49:28.619Z"
        },
        {
                "id": "sale_1789526931883_pp3yn",
                "sale_number": "TICK-852024",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 35,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789510933216_lzqv",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_gomi_fish",
                                "product_name": "Gomi Fish",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "created_at": "2026-09-16T02:48:51.883Z"
        },
        {
                "id": "sale_1789526847225_7qvl4",
                "sale_number": "TICK-596380",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 270,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 6,
                                "price": 45,
                                "subtotal": 270
                        }
                ],
                "created_at": "2026-09-16T02:47:27.225Z"
        },
        {
                "id": "sale_1789526806995_9ze2g",
                "sale_number": "TICK-891543",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 150,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_cubierto",
                                "product_name": "Cono Cubierto",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789344787923_spve",
                                "product_name": "Esquimal Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_gomi_fish",
                                "product_name": "Gomi Fish",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        },
                        {
                                "product_id": "prod_1789521409924_eswt",
                                "product_name": "Tostiloco morados",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "created_at": "2026-09-16T02:46:46.995Z"
        },
        {
                "id": "sale_1789526283235_b8iyr",
                "sale_number": "TICK-293901",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_fresa_congelada",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T02:38:03.235Z"
        },
        {
                "id": "sale_1789526282031_ingps",
                "sale_number": "TICK-996110",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 135,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 3,
                                "price": 45,
                                "subtotal": 135
                        }
                ],
                "created_at": "2026-09-16T02:38:02.031Z"
        },
        {
                "id": "sale_1789525176085_pfisv",
                "sale_number": "TICK-874481",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 20,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T02:19:36.085Z"
        },
        {
                "id": "sale_1789524634429_leci5",
                "sale_number": "TICK-378064",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 135,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 3,
                                "price": 45,
                                "subtotal": 135
                        }
                ],
                "created_at": "2026-09-16T02:10:34.429Z"
        },
        {
                "id": "sale_1789524332029_w2x2n",
                "sale_number": "TICK-229365",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 85,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789510933216_lzqv",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789521409924_eswt",
                                "product_name": "Tostiloco morados",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "created_at": "2026-09-16T02:05:32.029Z"
        },
        {
                "id": "sale_1789524210024_8k0pr",
                "sale_number": "TICK-274141",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789524184275_n7yl",
                                "product_name": "Escamocha grande",
                                "quantity": 1,
                                "price": 75,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T02:03:30.025Z"
        },
        {
                "id": "sale_1789523215005_w8x6m",
                "sale_number": "TICK-207503",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 20,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-16T01:46:55.005Z"
        },
        {
                "id": "sale_1789523201590_bga5i",
                "sale_number": "TICK-856966",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523192471_i682",
                                "product_name": "Tostilocos",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "created_at": "2026-09-16T01:46:41.590Z"
        },
        {
                "id": "sale_1789523147488_3em5b",
                "sale_number": "TICK-251169",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523132831_1n2c",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T01:45:47.488Z"
        },
        {
                "id": "sale_1789522831936_dakp2",
                "sale_number": "TICK-910618",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 179,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789501746703_ww8e",
                                "product_name": "Fresas Congeladas",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789434885052_e855",
                                "product_name": "Chaparrita",
                                "quantity": 4,
                                "price": 20,
                                "subtotal": 80
                        },
                        {
                                "product_id": "prod_1789506102516_xdmy",
                                "product_name": "Paleta mini",
                                "quantity": 2,
                                "price": 5,
                                "subtotal": 10
                        },
                        {
                                "product_id": "p_barcel_solo",
                                "product_name": "Barcel Solo",
                                "quantity": 2,
                                "price": 22,
                                "subtotal": 44
                        }
                ],
                "created_at": "2026-09-16T01:40:31.936Z"
        },
        {
                "id": "sale_1789522769537_hdz5v",
                "sale_number": "TICK-261780",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 150,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789522734663_85bg",
                                "product_name": "Fresas Naturales",
                                "quantity": 3,
                                "price": 50,
                                "subtotal": 150
                        }
                ],
                "created_at": "2026-09-16T01:39:29.537Z"
        },
        {
                "id": "sale_1789522729650_vlybs",
                "sale_number": "TICK-697754",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 65,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_nachos",
                                "product_name": "Nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T01:38:49.650Z"
        },
        {
                "id": "sale_1789522647090_67isk",
                "sale_number": "TICK-556074",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789522584487_s4hv",
                                "product_name": "Cono Chocolate",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T01:37:27.090Z"
        },
        {
                "id": "sale_1789522356358_038ur",
                "sale_number": "TICK-910111",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "CANCELLED",
                "items": [
                        {
                                "product_id": "p_barcel_nacho",
                                "product_name": "Barcel Nacho",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-16T01:32:36.359Z",
                "cancelled_reason": "Equibocado",
                "cancelled_by": "Encargada Rescate (Vespertino)",
                "cancelled_at": "2026-09-16T02:05:03.458Z"
        },
        {
                "id": "sale_1789522290667_ot8mm",
                "sale_number": "TICK-770535",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 120,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 4,
                                "price": 30,
                                "subtotal": 120
                        }
                ],
                "created_at": "2026-09-16T01:31:30.667Z"
        },
        {
                "id": "sale_1789522267668_7m9l3",
                "sale_number": "TICK-155140",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_escamocha_gde",
                                "product_name": "Escamocha Grande",
                                "quantity": 1,
                                "price": 75,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-16T01:31:07.668Z"
        },
        {
                "id": "sale_1789522227201_0vfdz",
                "sale_number": "TICK-853956",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 175,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789501746703_ww8e",
                                "product_name": "Fresas Congeladas",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        },
                        {
                                "product_id": "prod_1789434885052_e855",
                                "product_name": "Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_gomitas_carrucel",
                                "product_name": "Gomitas Carrucel",
                                "quantity": 3,
                                "price": 15,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T01:30:27.201Z"
        },
        {
                "id": "sale_1789522036780_jkr1b",
                "sale_number": "TICK-498037",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 250,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789521908175_93he",
                                "product_name": "Chetos queso",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789439454737_s9hc",
                                "product_name": "Vaso 1 bolita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789520111905_q9lr",
                                "product_name": "Fresa Natural",
                                "quantity": 2,
                                "price": 55,
                                "subtotal": 110
                        }
                ],
                "created_at": "2026-09-16T01:27:16.780Z"
        },
        {
                "id": "sale_1789522035495_nlonn",
                "sale_number": "TICK-911826",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 205,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 3,
                                "price": 15,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789426455958_he78",
                                "product_name": "Esquimal Grande",
                                "quantity": 3,
                                "price": 45,
                                "subtotal": 135
                        },
                        {
                                "product_id": "prod_1789503512135_chg1",
                                "product_name": "paleta de agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T01:27:15.495Z"
        },
        {
                "id": "sale_1789521843471_tmpct",
                "sale_number": "TICK-145520",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 100,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-16T01:24:03.471Z"
        },
        {
                "id": "sale_1789521822004_mjw6j",
                "sale_number": "TICK-346163",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T01:23:42.004Z"
        },
        {
                "id": "sale_1789521724967_yuhc4",
                "sale_number": "TICK-272956",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 15,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-16T01:22:04.967Z"
        },
        {
                "id": "sale_1789521500504_oqxod",
                "sale_number": "TICK-484897",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 100,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_frappe",
                                "product_name": "Frapp�",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789521489453_elhu",
                                "product_name": "Papas cueros",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T01:18:20.504Z"
        },
        {
                "id": "sale_1789521428131_y0ehv",
                "sale_number": "TICK-753046",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 110,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789521409924_eswt",
                                "product_name": "Tostiloco morados",
                                "quantity": 2,
                                "price": 55,
                                "subtotal": 110
                        }
                ],
                "created_at": "2026-09-16T01:17:08.131Z"
        },
        {
                "id": "sale_1789521191308_6kiqo",
                "sale_number": "TICK-451323",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 105,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789521167877_qbet",
                                "product_name": "Tostitos vaso",
                                "quantity": 1,
                                "price": 60,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-16T01:13:11.308Z"
        },
        {
                "id": "sale_1789520435401_f95no",
                "sale_number": "TICK-208453",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 12,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789427782105_pdn1",
                                "product_name": "PALETA DE AGUA CHICA",
                                "quantity": 1,
                                "price": 12,
                                "subtotal": 12
                        }
                ],
                "created_at": "2026-09-16T01:00:35.401Z"
        },
        {
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "created_at": "2026-09-16T00:57:18.999Z",
                "id": "sale_1789520238999_167ie",
                "items": [
                        {
                                "product_id": "prod_1789511744625_lnbq",
                                "product_name": "Barcel Loco",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "p_fresa_natural",
                                "product_name": "Fresa Natural",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-780312",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 110
        },
        {
                "id": "sale_1789519762027_8nrr2",
                "sale_number": "TICK-614493",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 55,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_mini",
                                "product_name": "Mini",
                                "quantity": 5,
                                "price": 5,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T00:49:22.027Z"
        },
        {
                "id": "sale_1789519639953_lxrqu",
                "sale_number": "TICK-114120",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T00:47:19.953Z"
        },
        {
                "id": "sale_1789518603306_btk8a",
                "sale_number": "TICK-551082",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 115,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789518578935_d117",
                                "product_name": "Chetos nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_ag_nat_chica",
                                "product_name": "Agua Natural Chica",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        },
                        {
                                "product_id": "p_fresa_natural",
                                "product_name": "Fresa Natural",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "created_at": "2026-09-16T00:30:03.307Z"
        },
        {
                "id": "sale_1789518475057_vaya6",
                "sale_number": "TICK-988327",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 70,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789427668265_puwa",
                                "product_name": "ESQUIMAL GRANDE",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-16T00:27:55.057Z"
        },
        {
                "id": "sale_1789518165528_yuhfa",
                "sale_number": "TICK-767720",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-16T00:22:45.528Z"
        },
        {
                "id": "sale_1789517609283_fg3tn",
                "sale_number": "TICK-345533",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 10,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_mini",
                                "product_name": "Mini",
                                "quantity": 2,
                                "price": 5,
                                "subtotal": 10
                        }
                ],
                "created_at": "2026-09-16T00:13:29.284Z"
        },
        {
                "id": "sale_1789517055339_dul8n",
                "sale_number": "TICK-953250",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 210,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 3,
                                "price": 30,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789343891215_tlc3",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789511159938_cxxn",
                                "product_name": "Paleta agua grande",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-16T00:04:15.339Z"
        },
        {
                "id": "sale_1789516812422_ly97e",
                "sale_number": "TICK-827888",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 110,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_fresa_natural",
                                "product_name": "Fresa Natural",
                                "quantity": 2,
                                "price": 55,
                                "subtotal": 110
                        }
                ],
                "created_at": "2026-09-16T00:00:12.422Z"
        },
        {
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "created_at": "2026-09-17T21:51:12.733Z",
                "id": "sale_1789681872733_mumw1",
                "items": [
                        {
                                "price": 30,
                                "product_id": "p_paleta_crema_gde",
                                "product_name": "Paleta Crema Grande",
                                "quantity": 2,
                                "subtotal": 60
                        },
                        {
                                "price": 25,
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 3,
                                "subtotal": 75
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-923241",
                "shift_name": "Ma�ana",
                "status": "COMPLETADA",
                "total": 135
        },
        {
                "id": "sale_1789680467130_asubn",
                "sale_number": "TICK-941954",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 90,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-17T21:27:47.130Z"
        },
        {
                "id": "sale_1789679779487_cg3se",
                "sale_number": "TICK-307344",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 15,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-17T21:16:19.488Z"
        },
        {
                "id": "sale_1789678710335_zlqvw",
                "sale_number": "TICK-187002",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-17T20:58:30.336Z"
        },
        {
                "id": "sale_1789678606470_ztjui",
                "sale_number": "TICK-580208",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 45,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T20:56:46.470Z"
        },
        {
                "id": "sale_1789678592655_jjzcm",
                "sale_number": "TICK-709708",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Ma�ana",
                "cashier_id": "usr_encargado9lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Matutino) (encargado9lafuente@gmail.com)",
                "total": 400,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_mediana",
                                "product_name": "Agua Mediana",
                                "quantity": 3,
                                "price": 30,
                                "subtotal": 90
                        },
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 6,
                                "price": 15,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789506101474_lslp",
                                "product_name": "Paleta mini",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        },
                        {
                                "product_id": "p_helado_vaso2",
                                "product_name": "Helado Vaso 2",
                                "quantity": 2,
                                "price": 35,
                                "subtotal": 70
                        },
                        {
                                "product_id": "prod_1789590955783_zcr9",
                                "product_name": "Cheetos preparados",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "created_at": "2026-09-17T20:56:32.655Z"
        },
        {
                "id": "sale_1789677465578_ozael",
                "sale_number": "TICK-173479",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 80,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789511159938_cxxn",
                                "product_name": "Paleta agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789439461017_qaqo",
                                "product_name": "Vaso 1 bolita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789524447372_5210",
                                "product_name": "Agua chica",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "p_choco_corazon",
                                "product_name": "Chocolate Coraz�n",
                                "quantity": 1,
                                "price": 10,
                                "subtotal": 10
                        }
                ],
                "created_at": "2026-09-17T20:37:45.578Z"
        },
        {
                "id": "sale_1789677231453_c4pjw",
                "sale_number": "TICK-325467",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789510933216_lzqv",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T20:33:51.454Z"
        },
        {
                "id": "sale_1789676861261_xcfnp",
                "sale_number": "TICK-342370",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 5,
                                "price": 15,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-17T20:27:41.261Z"
        },
        {
                "id": "sale_1789676627034_cd6kz",
                "sale_number": "TICK-556454",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 180,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 4,
                                "price": 45,
                                "subtotal": 180
                        }
                ],
                "created_at": "2026-09-17T20:23:47.034Z"
        },
        {
                "id": "sale_1789676380014_fztsx",
                "sale_number": "TICK-678868",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 90,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        }
                ],
                "created_at": "2026-09-17T20:19:40.015Z"
        },
        {
                "id": "sale_1789676005140_hnwwn",
                "sale_number": "TICK-510820",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 110,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789521409924_eswt",
                                "product_name": "Tostiloco morados",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "prod_1789511159938_cxxn",
                                "product_name": "Paleta agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T20:13:25.141Z"
        },
        {
                "id": "sale_1789675080720_lupei",
                "sale_number": "TICK-158598",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T19:58:00.720Z"
        },
        {
                "id": "sale_1789674360878_s6zeu",
                "sale_number": "TICK-520322",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 22,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_agua_chica",
                                "product_name": "Sabrita Sola",
                                "quantity": 1,
                                "price": 22,
                                "subtotal": 22
                        }
                ],
                "created_at": "2026-09-17T19:46:00.879Z"
        },
        {
                "id": "sale_1789673107705_edjwb",
                "sale_number": "TICK-309035",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 65,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_nat_grande",
                                "product_name": "Agua Natural Grande",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T19:25:07.705Z"
        },
        {
                "id": "sale_1789672672219_z1kwl",
                "sale_number": "TICK-876780",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-17T19:17:52.219Z"
        },
        {
                "id": "sale_1789672617481_h0fs3",
                "sale_number": "TICK-820002",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789510933216_lzqv",
                                "product_name": "Agua Mediana",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-17T19:16:57.482Z"
        },
        {
                "id": "sale_1789672080659_wjugd",
                "sale_number": "TICK-671766",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 70,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T19:08:00.660Z"
        },
        {
                "id": "sale_1789671563071_42r8m",
                "sale_number": "TICK-391943",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 22,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_agua_chica",
                                "product_name": "Sabrita Sola",
                                "quantity": 1,
                                "price": 22,
                                "subtotal": 22
                        }
                ],
                "created_at": "2026-09-17T18:59:23.071Z"
        },
        {
                "id": "sale_1789671376183_nizba",
                "sale_number": "TICK-669650",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 60,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-17T18:56:16.184Z"
        },
        {
                "id": "sale_1789669399715_eil8g",
                "sale_number": "TICK-113217",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789510937494_4n1e",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T18:23:19.716Z"
        },
        {
                "id": "sale_1789669211026_l4euw",
                "sale_number": "TICK-151237",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 2,
                                "price": 15,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789511159938_cxxn",
                                "product_name": "Paleta agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-17T18:20:11.027Z"
        },
        {
                "id": "sale_1789668930668_m54et",
                "sale_number": "TICK-564437",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 80,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        },
                        {
                                "product_id": "prod_1789343891215_tlc3",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-17T18:15:30.669Z"
        },
        {
                "id": "sale_1789667461395_u456d",
                "sale_number": "TICK-509789",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 125,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 3,
                                "price": 30,
                                "subtotal": 90
                        },
                        {
                                "product_id": "prod_1789578850152_p01a",
                                "product_name": "Helado Vaso 2",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-17T17:51:01.396Z"
        },
        {
                "id": "sale_1789667199617_wvxlo",
                "sale_number": "TICK-419699",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 35,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789578850152_p01a",
                                "product_name": "Helado Vaso 2",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-17T17:46:39.617Z"
        },
        {
                "id": "sale_1789666115281_73eqr",
                "sale_number": "TICK-284636",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_chechis_vaso",
                                "product_name": "Chechis Preparados Vaso",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-17T17:28:35.281Z"
        },
        {
                "id": "sale_1789666051996_le0vi",
                "sale_number": "TICK-561488",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789344787923_spve",
                                "product_name": "Esquimal Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T17:27:31.996Z"
        },
        {
                "id": "sale_1789664863048_t7c7b",
                "sale_number": "TICK-243993",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-17T17:07:43.049Z"
        },
        {
                "id": "sale_1789664522371_2beeu",
                "sale_number": "TICK-239045",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Ma�ana",
                "cashier_id": "5ae8adc9-bc8b-4d08-b181-71d22e99744a",
                "cashier_name": "Encargada Rescate (Matutino) (encargado3lafuente@gmail.com)",
                "total": 95,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789518578935_d117",
                                "product_name": "Chetos nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T17:02:02.372Z"
        },
        {
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "created_at": "2026-09-17T03:00:48.949Z",
                "id": "sale_1789614048949_5s0d2",
                "items": [
                        {
                                "product_id": "prod_1789439246280_ciwz",
                                "product_name": "AGUA GRANDE",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "p_paleta_agua_gde",
                                "product_name": "Paleta Agua Grande",
                                "quantity": 6,
                                "price": 25,
                                "subtotal": 150
                        },
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 4,
                                "price": 20,
                                "subtotal": 80
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-283913",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 320
        },
        {
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "created_at": "2026-09-17T02:58:31.753Z",
                "id": "sale_1789613911752_yd09m",
                "items": [
                        {
                                "product_id": "prod_1789519605495_luuy",
                                "product_name": "Fresa Congelada",
                                "quantity": 2,
                                "price": 45,
                                "subtotal": 90
                        },
                        {
                                "product_id": "p_choco_corazon",
                                "product_name": "Chocolate Coraz�n",
                                "quantity": 2,
                                "price": 10,
                                "subtotal": 20
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-940207",
                "shift_name": "Tarde",
                "status": "CANCELLED",
                "total": 110,
                "cancelled_reason": "Equivocado",
                "cancelled_by": "Encargada Rescate (Vespertino)",
                "cancelled_at": "2026-09-17T22:14:16.232Z"
        },
        {
                "id": "sale_1789613038986_n1rxc",
                "sale_number": "TICK-444066",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789503512135_chg1",
                                "product_name": "paleta de agua grande",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-17T02:43:58.986Z"
        },
        {
                "id": "sale_1789612503230_e6utn",
                "sale_number": "TICK-532111",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789440083334_8qwx",
                                "product_name": "VASO 1 BOLITA",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-17T02:35:03.230Z"
        },
        {
                "id": "sale_1789612434985_wbkr6",
                "sale_number": "TICK-127740",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T02:33:54.985Z"
        },
        {
                "id": "sale_1789612357171_a7xqa",
                "sale_number": "TICK-675618",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 80,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T02:32:37.171Z"
        },
        {
                "id": "sale_1789611646714_xjnhl",
                "sale_number": "TICK-690171",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 90,
                "payment_method": "cash",
                "status": "CANCELLED",
                "items": [
                        {
                                "product_id": "prod_1789510937494_4n1e",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789439454737_s9hc",
                                "product_name": "Vaso 1 bolita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789611634761_lcps",
                                "product_name": "Carrucel",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-17T02:20:46.714Z",
                "cancelled_reason": "Pruebas",
                "cancelled_by": "Encargada Rescate (Matutino)",
                "cancelled_at": "2026-09-17T16:21:54.966Z"
        },
        {
                "id": "2a15574c-f599-40c2-8e15-8e9f40f6c5ab",
                "sale_number": "CATALOG-1789611634791",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-17T02:20:36.4667+00:00",
                "local_id": "2a15574c-f599-40c2-8e15-8e9f40f6c5ab"
        },
        {
                "id": "sale_1789611482947_kz5b0",
                "sale_number": "TICK-371776",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_ag_grande",
                                "product_name": "Agua Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T02:18:02.947Z"
        },
        {
                "id": "sale_1789611398383_z3v4m",
                "sale_number": "TICK-720798",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_paleta_crema_gde",
                                "product_name": "Paleta Crema Grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T02:16:38.383Z"
        },
        {
                "id": "sale_1789611135540_5mqsv",
                "sale_number": "TICK-212828",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 105,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523192471_i682",
                                "product_name": "Tostilocos",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        },
                        {
                                "product_id": "p_ag_chica",
                                "product_name": "Agua Chica",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-17T02:12:15.541Z"
        },
        {
                "id": "sale_1789611045888_jva3c",
                "sale_number": "TICK-543906",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 185,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_canasta_doble",
                                "product_name": "Canasta Doble",
                                "quantity": 1,
                                "price": 40,
                                "subtotal": 40
                        },
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "p_paleta_crema_gde",
                                "product_name": "Paleta Crema Grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_mini",
                                "product_name": "Mini",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        },
                        {
                                "product_id": "prod_1789494305417_z1ao",
                                "product_name": "Helado Vaso 3 Bolitas",
                                "quantity": 1,
                                "price": 40,
                                "subtotal": 40
                        },
                        {
                                "product_id": "p_papas_cueros",
                                "product_name": "Papas con Cueros",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-17T02:10:45.888Z"
        },
        {
                "id": "sale_1789610755397_1edwc",
                "sale_number": "TICK-261018",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 95,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789521489453_elhu",
                                "product_name": "Papas cueros",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789519605495_luuy",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T02:05:55.398Z"
        },
        {
                "id": "sale_1789610634183_1og4n",
                "sale_number": "TICK-155357",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 75,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 3,
                                "price": 25,
                                "subtotal": 75
                        }
                ],
                "created_at": "2026-09-17T02:03:54.183Z"
        },
        {
                "id": "sale_1789610535849_nqr01",
                "sale_number": "TICK-576057",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 150,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789521489453_elhu",
                                "product_name": "Papas cueros",
                                "quantity": 1,
                                "price": 50,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789518578935_d117",
                                "product_name": "Chetos nachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_semillas",
                                "product_name": "Semillas",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789578850152_p01a",
                                "product_name": "Helado Vaso 2",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-17T02:02:15.849Z"
        },
        {
                "id": "sale_1789610375401_hcsnz",
                "sale_number": "TICK-697241",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-17T01:59:35.402Z"
        },
        {
                "id": "sale_1789610318626_e1lv0",
                "sale_number": "TICK-363957",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_fresa_congelada",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T01:58:38.626Z"
        },
        {
                "id": "sale_1789609914600_td38j",
                "sale_number": "TICK-156012",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 12,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789427782105_pdn1",
                                "product_name": "PALETA DE AGUA CHICA",
                                "quantity": 1,
                                "price": 12,
                                "subtotal": 12
                        }
                ],
                "created_at": "2026-09-17T01:51:54.601Z"
        },
        {
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "created_at": "2026-09-17T01:50:54.665Z",
                "id": "sale_1789609854665_1evsz",
                "items": [
                        {
                                "product_id": "prod_1789439246280_ciwz",
                                "product_name": "AGUA GRANDE",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-911908",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 45
        },
        {
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "created_at": "2026-09-17T01:48:33.821Z",
                "id": "sale_1789609713821_keu9z",
                "items": [
                        {
                                "product_id": "p_ag_mediana",
                                "product_name": "Agua Mediana",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789593330645_gc0f",
                                "product_name": "CHEETOS SOLOS",
                                "quantity": 1,
                                "price": 22,
                                "subtotal": 22
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-491009",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 52
        },
        {
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "created_at": "2026-09-17T01:47:18.369Z",
                "id": "sale_1789609638368_50wnr",
                "items": [
                        {
                                "product_id": "p_cono_sencillo_solo",
                                "product_name": "Cono Sencillo Solo",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-383980",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 5
        },
        {
                "id": "sale_1789609426062_eee05",
                "sale_number": "TICK-172737",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 95,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789343891215_tlc3",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "prod_1789344787923_spve",
                                "product_name": "Esquimal Grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T01:43:46.063Z"
        },
        {
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "created_at": "2026-09-17T01:43:19.305Z",
                "id": "sale_1789609399305_4y6w7",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-684505",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 25
        },
        {
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "created_at": "2026-09-17T01:42:59.669Z",
                "id": "sale_1789609379668_hkl62",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 2,
                                "price": 15,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_dorinachos",
                                "product_name": "Dorinachos",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-979619",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 75
        },
        {
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "created_at": "2026-09-17T01:41:34.832Z",
                "id": "sale_1789609294831_hgtyl",
                "items": [
                        {
                                "product_id": "p_tostilocos",
                                "product_name": "Tostilocos",
                                "quantity": 1,
                                "price": 55,
                                "subtotal": 55
                        }
                ],
                "payment_method": "cash",
                "sale_number": "TICK-621135",
                "shift_name": "Tarde",
                "status": "COMPLETADA",
                "total": 55
        },
        {
                "id": "sale_1789609124744_n722r",
                "sale_number": "TICK-401334",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523132831_1n2c",
                                "product_name": "Trol",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-17T01:38:44.744Z"
        },
        {
                "id": "sale_1789609074110_e4dhw",
                "sale_number": "TICK-999386",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789506101474_lslp",
                                "product_name": "Paleta mini",
                                "quantity": 5,
                                "price": 5,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789523132831_1n2c",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T01:37:54.110Z"
        },
        {
                "id": "sale_1789608850996_nhcxl",
                "sale_number": "TICK-503918",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789524447372_5210",
                                "product_name": "Agua chica",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-17T01:34:10.997Z"
        },
        {
                "id": "sale_1789608589524_517ce",
                "sale_number": "TICK-763763",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 50,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-17T01:29:49.524Z"
        },
        {
                "id": "sale_1789608502354_zwhf1",
                "sale_number": "TICK-716913",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 240,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789434022899_psz1",
                                "product_name": "Agua grande",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_barcel_nacho",
                                "product_name": "Barcel Nacho",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789524184275_n7yl",
                                "product_name": "Escamocha grande",
                                "quantity": 2,
                                "price": 75,
                                "subtotal": 150
                        }
                ],
                "created_at": "2026-09-17T01:28:22.354Z"
        },
        {
                "id": "sale_1789608336080_9pyt1",
                "sale_number": "TICK-820308",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789581994012_afpt",
                                "product_name": "paleta de crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T01:25:36.080Z"
        },
        {
                "id": "sale_1789608150453_wfg9l",
                "sale_number": "TICK-858991",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 85,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_fresa_congelada",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "p_chechis_bolsa",
                                "product_name": "Chechis Preparado Bolsa",
                                "quantity": 2,
                                "price": 20,
                                "subtotal": 40
                        }
                ],
                "created_at": "2026-09-17T01:22:30.453Z"
        },
        {
                "id": "sale_1789608078998_0y481",
                "sale_number": "TICK-437132",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 2,
                                "price": 15,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T01:21:18.998Z"
        },
        {
                "id": "sale_1789607847530_2m40t",
                "sale_number": "TICK-707585",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 15,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-17T01:17:27.530Z"
        },
        {
                "id": "sale_1789607770202_1y3p2",
                "sale_number": "TICK-193348",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523132831_1n2c",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T01:16:10.202Z"
        },
        {
                "id": "sale_1789607761383_va80a",
                "sale_number": "TICK-245309",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789581994012_afpt",
                                "product_name": "paleta de crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T01:16:01.383Z"
        },
        {
                "id": "sale_1789607437898_ne3hv",
                "sale_number": "TICK-591909",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 75,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        },
                        {
                                "product_id": "p_trufa",
                                "product_name": "Trufa",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        },
                        {
                                "product_id": "prod_1789511204856_eev0",
                                "product_name": "Paleta crema grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T01:10:37.898Z"
        },
        {
                "id": "sale_1789607407799_oa46w",
                "sale_number": "TICK-564766",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 12,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789427782105_pdn1",
                                "product_name": "PALETA DE AGUA CHICA",
                                "quantity": 1,
                                "price": 12,
                                "subtotal": 12
                        }
                ],
                "created_at": "2026-09-17T01:10:07.799Z"
        },
        {
                "id": "sale_1789607398110_i3ywu",
                "sale_number": "TICK-510359",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 180,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_fresa_congelada",
                                "product_name": "Fresa Congelada",
                                "quantity": 4,
                                "price": 45,
                                "subtotal": 180
                        }
                ],
                "created_at": "2026-09-17T01:09:58.110Z"
        },
        {
                "id": "sale_1789607232795_a9jp6",
                "sale_number": "TICK-213840",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789581994012_afpt",
                                "product_name": "paleta de crema grande",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-17T01:07:12.795Z"
        },
        {
                "id": "sale_1789607226178_zk3zt",
                "sale_number": "TICK-565646",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789523132831_1n2c",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T01:07:06.178Z"
        },
        {
                "id": "sale_1789606965919_rhzz6",
                "sale_number": "TICK-179643",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 5,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_mini",
                                "product_name": "Mini",
                                "quantity": 1,
                                "price": 5,
                                "subtotal": 5
                        }
                ],
                "created_at": "2026-09-17T01:02:45.919Z"
        },
        {
                "id": "sale_1789606730950_35agz",
                "sale_number": "TICK-896486",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 80,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789439246280_ciwz",
                                "product_name": "AGUA GRANDE",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        },
                        {
                                "product_id": "prod_1789439085479_k88o",
                                "product_name": "VASO 2 BOLITAS",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-17T00:58:50.950Z"
        },
        {
                "id": "sale_1789606586945_686p7",
                "sale_number": "TICK-287660",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_choco_corazon",
                                "product_name": "Chocolate Coraz�n",
                                "quantity": 2,
                                "price": 10,
                                "subtotal": 20
                        },
                        {
                                "product_id": "prod_1789606575228_8ndd",
                                "product_name": "Cacahuatada",
                                "quantity": 1,
                                "price": 35,
                                "subtotal": 35
                        }
                ],
                "created_at": "2026-09-17T00:56:26.945Z"
        },
        {
                "id": "404fc2df-a842-4e21-9969-234d388a4831",
                "sale_number": "CATALOG-1789606575255",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-17T00:56:16.693194+00:00",
                "local_id": "404fc2df-a842-4e21-9969-234d388a4831"
        },
        {
                "id": "sale_1789606400475_wqisi",
                "sale_number": "TICK-116787",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 150,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_escamocha_gde",
                                "product_name": "Escamocha Grande",
                                "quantity": 2,
                                "price": 75,
                                "subtotal": 150
                        }
                ],
                "created_at": "2026-09-17T00:53:20.475Z"
        },
        {
                "id": "sale_1789606371958_4utgg",
                "sale_number": "TICK-631322",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 45,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_fresa_congelada",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T00:52:51.958Z"
        },
        {
                "id": "sale_1789606289756_q7mfh",
                "sale_number": "TICK-397426",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 30,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 2,
                                "price": 15,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T00:51:29.757Z"
        },
        {
                "id": "sale_1789606239511_i85t8",
                "sale_number": "TICK-222207",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_fresa_congelada",
                                "product_name": "Fresa Congelada",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T00:50:39.512Z"
        },
        {
                "id": "sale_1789606173167_t9dmy",
                "sale_number": "TICK-434783",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 54,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789427782105_pdn1",
                                "product_name": "PALETA DE AGUA CHICA",
                                "quantity": 2,
                                "price": 12,
                                "subtotal": 24
                        },
                        {
                                "product_id": "p_paleta_crema_gde",
                                "product_name": "Paleta Crema Grande",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T00:49:33.167Z"
        },
        {
                "id": "sale_1789605979743_6zhvd",
                "sale_number": "TICK-217376",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-17T00:46:19.743Z"
        },
        {
                "id": "sale_1789605967151_6ri9j",
                "sale_number": "TICK-412373",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 70,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "prod_1789605951174_8lur",
                                "product_name": "Dorinacho",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T00:46:07.151Z"
        },
        {
                "id": "5d76e803-d4b5-4ade-ab54-66b167ff3fe1",
                "sale_number": "CATALOG-1789605951199",
                "branch_id": "c188dd82-7faf-41b8-948b-af8e789facba",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "4710b330-566c-45c7-a92e-b7b6a62355af",
                "cashier_name": "Encargada",
                "total": 0,
                "payment_method": "cash",
                "status": "COMPLETED",
                "cancelled_reason": null,
                "cancelled_by": null,
                "cancelled_at": null,
                "items": [],
                "created_at": "2026-09-17T00:45:52.719664+00:00",
                "local_id": "5d76e803-d4b5-4ade-ab54-66b167ff3fe1"
        },
        {
                "id": "sale_1789605908472_l97pi",
                "sale_number": "TICK-908902",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "p_helado_maquina",
                                "product_name": "Helado M�quina",
                                "quantity": 2,
                                "price": 15,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T00:45:08.472Z"
        },
        {
                "id": "sale_1789605832901_ns787",
                "sale_number": "TICK-733897",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 50,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516980033_ur3w",
                                "product_name": "Cono sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        }
                ],
                "created_at": "2026-09-17T00:43:52.901Z"
        },
        {
                "id": "sale_1789605454270_yn2yt",
                "sale_number": "TICK-492764",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 10,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789506101474_lslp",
                                "product_name": "Paleta mini",
                                "quantity": 2,
                                "price": 5,
                                "subtotal": 10
                        }
                ],
                "created_at": "2026-09-17T00:37:34.270Z"
        },
        {
                "id": "sale_1789605177438_m22eo",
                "sale_number": "TICK-460365",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado4lafuente_gmail_com",
                "cashier_name": "Encargada Rescate (Vespertino) (encargado4lafuente@gmail.com)",
                "total": 60,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789516901690_gyei",
                                "product_name": "Trol",
                                "quantity": 2,
                                "price": 30,
                                "subtotal": 60
                        }
                ],
                "created_at": "2026-09-17T00:32:57.438Z"
        },
        {
                "id": "sale_1789604879519_sd0ey",
                "sale_number": "TICK-664392",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 65,
                "payment_method": "card",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789588715064_n0ik",
                                "product_name": "Gomitas carrucel",
                                "quantity": 1,
                                "price": 15,
                                "subtotal": 15
                        }
                ],
                "created_at": "2026-09-17T00:27:59.519Z"
        },
        {
                "id": "sale_1789604793507_brypg",
                "sale_number": "TICK-931080",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 70,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 2,
                                "price": 25,
                                "subtotal": 50
                        },
                        {
                                "product_id": "prod_1789415437974_97vw",
                                "product_name": "Paleta Chaparrita",
                                "quantity": 1,
                                "price": 20,
                                "subtotal": 20
                        }
                ],
                "created_at": "2026-09-17T00:26:33.507Z"
        },
        {
                "id": "sale_1789604778842_3heda",
                "sale_number": "TICK-492159",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado12lafuente_gmail_com",
                "cashier_name": "Encargada CNOP (Vespertino) (encargado12lafuente@gmail.com)",
                "total": 55,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "p_cono_sencillo",
                                "product_name": "Cono Sencillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        },
                        {
                                "product_id": "p_trol",
                                "product_name": "Trol",
                                "quantity": 1,
                                "price": 30,
                                "subtotal": 30
                        }
                ],
                "created_at": "2026-09-17T00:26:18.842Z"
        },
        {
                "id": "sale_1789604422638_5eax1",
                "sale_number": "TICK-985339",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 25,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789504002552_zwkg",
                                "product_name": "Cono sensillo",
                                "quantity": 1,
                                "price": 25,
                                "subtotal": 25
                        }
                ],
                "created_at": "2026-09-17T00:20:22.638Z"
        },
        {
                "id": "sale_1789604136987_c8969",
                "sale_number": "TICK-739913",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_id": "usr_encargado10lafuente_gmail_com",
                "cashier_name": "Encargada Tagarete 2 (Vespertino) (encargado10lafuente@gmail.com)",
                "total": 45,
                "payment_method": "cash",
                "status": "COMPLETADA",
                "items": [
                        {
                                "product_id": "prod_1789501746703_ww8e",
                                "product_name": "Fresas Congeladas",
                                "quantity": 1,
                                "price": 45,
                                "subtotal": 45
                        }
                ],
                "created_at": "2026-09-17T00:15:36.987Z"
        }
];


    const BASE_ACTIVE_CUTS = [
        {
                "id": "cut_tag1_today_mat",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Mañana",
                "cashier_name": "Encargada Tagarete 1 (Matutino)",
                "performed_by_name": "Encargada Tagarete 1 (Matutino)",
                "opening_amount": 1000,
                "cash_sales": 145,
                "card_sales": 0,
                "total_sales": 145,
                "expected_cash": 1145,
                "counted_cash": 1145,
                "difference": 0,
                "net_sales_without_fund": 145,
                "created_at": "2026-09-18T20:00:00.000Z"
        },
        {
                "id": "cut_tag1_today_ves",
                "branch_id": "branch-4",
                "branch_name": "Tagarete 1",
                "shift_name": "Tarde",
                "cashier_name": "Encargada Tagarete 1 (Vespertino)",
                "performed_by_name": "Encargada Tagarete 1 (Vespertino)",
                "opening_amount": 1000,
                "cash_sales": 110,
                "card_sales": 0,
                "total_sales": 110,
                "expected_cash": 1110,
                "counted_cash": 1110,
                "difference": 0,
                "net_sales_without_fund": 110,
                "created_at": "2026-09-18T23:30:00.000Z"
        },
        {
                "id": "cut_1789594986477_g7j6",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Mañana",
                "cashier_name": "Encargada Rescate (Matutino)",
                "performed_by_name": "Encargada Rescate (Matutino)",
                "opening_amount": 1500,
                "cash_sales": 2727,
                "card_sales": 425,
                "total_sales": 3152,
                "expected_cash": 4227,
                "counted_cash": 4092,
                "difference": -135,
                "net_sales_without_fund": 2592,
                "created_at": "2026-09-16T21:43:06.477Z"
        },
        {
                "id": "cut_1789594970591_k8m6",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Mañana",
                "cashier_name": "Encargada Rescate (Matutino)",
                "performed_by_name": "Encargada Rescate (Matutino)",
                "opening_amount": 1500,
                "cash_sales": 2727,
                "card_sales": 425,
                "total_sales": 3152,
                "expected_cash": 4227,
                "counted_cash": 4092,
                "difference": -135,
                "net_sales_without_fund": 2592,
                "created_at": "2026-09-16T21:42:50.591Z"
        },
        {
                "id": "cut_1789594859523_6kq6",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Mañana",
                "cashier_name": "Encargada CNOP (Matutino)",
                "performed_by_name": "Encargada CNOP (Matutino)",
                "opening_amount": 500,
                "cash_sales": 755,
                "card_sales": 0,
                "total_sales": 755,
                "expected_cash": 1255,
                "counted_cash": 1255,
                "difference": 0,
                "net_sales_without_fund": 755,
                "created_at": "2026-09-16T21:40:59.523Z"
        },
        {
                "id": "cut_1789594481974_c5g1",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Mañana",
                "cashier_name": "Encargada Tagarete 2 (Matutino)",
                "performed_by_name": "Encargada Tagarete 2 (Matutino)",
                "opening_amount": 1000,
                "cash_sales": 1690,
                "card_sales": 40,
                "total_sales": 1730,
                "expected_cash": 2690,
                "counted_cash": 2690,
                "difference": 0,
                "net_sales_without_fund": 1690,
                "created_at": "2026-09-16T21:34:41.974Z"
        },
        {
                "id": "cut_1789527629564_6r0n",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_name": "Encargada CNOP (Vespertino)",
                "performed_by_name": "Encargada CNOP (Vespertino)",
                "opening_amount": 500,
                "cash_sales": 0,
                "card_sales": 0,
                "total_sales": 0,
                "expected_cash": 500,
                "counted_cash": 931,
                "difference": 431,
                "net_sales_without_fund": 431,
                "created_at": "2026-09-16T03:00:29.564Z"
        },
        {
                "id": "cut_1789527443102_0mu4",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_name": "Encargada Tagarete 2 (Vespertino)",
                "performed_by_name": "Encargada Tagarete 2 (Vespertino)",
                "opening_amount": 1000,
                "cash_sales": 1094,
                "card_sales": 0,
                "total_sales": 1094,
                "expected_cash": 2094,
                "counted_cash": 2094,
                "difference": 0,
                "net_sales_without_fund": 1094,
                "created_at": "2026-09-16T02:57:23.102Z"
        },
        {
                "id": "cut_1789527018275_8obv",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_name": "Encargada Rescate (Vespertino)",
                "performed_by_name": "Encargada Rescate (Vespertino)",
                "opening_amount": 1500,
                "cash_sales": 2700,
                "card_sales": 135,
                "total_sales": 2835,
                "expected_cash": 4200,
                "counted_cash": 4200,
                "difference": 0,
                "net_sales_without_fund": 2700,
                "created_at": "2026-09-16T02:50:18.276Z"
        },
        {
                "id": "cut_1789680694288_ajth",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Mañana",
                "cashier_name": "Encargada Rescate (Matutino)",
                "performed_by_name": "Encargada Rescate (Matutino)",
                "opening_amount": 1500,
                "cash_sales": 2592,
                "card_sales": 0,
                "total_sales": 2592,
                "expected_cash": 4092,
                "counted_cash": 3088,
                "difference": -1004,
                "net_sales_without_fund": 1588,
                "created_at": "2026-09-17T21:31:34.289Z"
        },
        {
                "id": "cut_1789680578307_6jws",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Mañana",
                "cashier_name": "Encargada Tagarete 2 (Matutino)",
                "performed_by_name": "Encargada Tagarete 2 (Matutino)",
                "opening_amount": 1000,
                "cash_sales": 490,
                "card_sales": 45,
                "total_sales": 535,
                "expected_cash": 1490,
                "counted_cash": 1490,
                "difference": 0,
                "net_sales_without_fund": 490,
                "created_at": "2026-09-17T21:29:38.307Z"
        },
        {
                "id": "cut_res_today_ves",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_name": "Encargada Rescate (Vespertino)",
                "performed_by_name": "Encargada Rescate (Vespertino)",
                "opening_amount": 1500,
                "cash_sales": 90,
                "card_sales": 0,
                "total_sales": 90,
                "expected_cash": 1590,
                "counted_cash": 1590,
                "difference": 0,
                "net_sales_without_fund": 90,
                "created_at": "2026-09-17T21:15:00.000Z"
        },
        {
                "id": "cut_cnop_today_ves",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_name": "Encargada CNOP (Vespertino)",
                "performed_by_name": "Encargada CNOP (Vespertino)",
                "opening_amount": 1000,
                "cash_sales": 906,
                "card_sales": 50,
                "total_sales": 956,
                "expected_cash": 1906,
                "counted_cash": 1906,
                "difference": 0,
                "net_sales_without_fund": 906,
                "created_at": "2026-09-17T21:00:00.000Z"
        },
        {
                "id": "cut_t2_today_mat",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Mañana",
                "cashier_name": "Encargada Tagarete 2 (Matutino)",
                "performed_by_name": "Encargada Tagarete 2 (Matutino)",
                "opening_amount": 1000,
                "cash_sales": 1690,
                "card_sales": 40,
                "total_sales": 1730,
                "expected_cash": 2690,
                "counted_cash": 2690,
                "difference": 0,
                "net_sales_without_fund": 1690,
                "created_at": "2026-09-17T15:34:00.000Z"
        },
        {
                "id": "cut_res_today_mat",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Mañana",
                "cashier_name": "Encargada Rescate (Matutino)",
                "performed_by_name": "Encargada Rescate (Matutino)",
                "opening_amount": 1500,
                "cash_sales": 2592,
                "card_sales": 0,
                "total_sales": 2592,
                "expected_cash": 4092,
                "counted_cash": 4092,
                "difference": 0,
                "net_sales_without_fund": 2592,
                "created_at": "2026-09-17T15:10:00.000Z"
        },
        {
                "id": "cut_cnop_today_mat",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Mañana",
                "cashier_name": "Encargada CNOP (Matutino)",
                "performed_by_name": "Encargada CNOP (Matutino)",
                "opening_amount": 1000,
                "cash_sales": 790,
                "card_sales": 200,
                "total_sales": 990,
                "expected_cash": 1790,
                "counted_cash": 1790,
                "difference": 0,
                "net_sales_without_fund": 790,
                "created_at": "2026-09-17T15:00:00.000Z"
        },
        {
                "id": "cut_1789614825227_svl8",
                "branch_id": "branch-5",
                "branch_name": "Tagarete 2",
                "shift_name": "Tarde",
                "cashier_name": "Encargada Tagarete 2 (Vespertino)",
                "performed_by_name": "Encargada Tagarete 2 (Vespertino)",
                "opening_amount": 1000,
                "cash_sales": 1673,
                "card_sales": 115,
                "total_sales": 1788,
                "expected_cash": 2673,
                "counted_cash": 2673,
                "difference": 0,
                "net_sales_without_fund": 1673,
                "created_at": "2026-09-17T03:13:45.227Z"
        },
        {
                "id": "cut_1789614244422_2sg7",
                "branch_id": "branch-6",
                "branch_name": "CNOP",
                "shift_name": "Tarde",
                "cashier_name": "Encargada CNOP (Vespertino)",
                "performed_by_name": "Encargada CNOP (Vespertino)",
                "opening_amount": 500,
                "cash_sales": 2260,
                "card_sales": 45,
                "total_sales": 2305,
                "expected_cash": 2760,
                "counted_cash": 1940,
                "difference": -820,
                "net_sales_without_fund": 1440,
                "created_at": "2026-09-17T03:04:04.422Z"
        },
        {
                "id": "cut_1789614010169_qvsh",
                "branch_id": "branch-2",
                "branch_name": "Rescate",
                "shift_name": "Tarde",
                "cashier_name": "Encargada Rescate (Vespertino)",
                "performed_by_name": "Encargada Rescate (Vespertino)",
                "opening_amount": 1500,
                "cash_sales": 3100,
                "card_sales": 75,
                "total_sales": 3175,
                "expected_cash": 4600,
                "counted_cash": 4600,
                "difference": 0,
                "net_sales_without_fund": 3100,
                "created_at": "2026-09-17T03:00:10.169Z"
        }
];


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

                        const cashierName = obs.cashier_name || s.user_name || obs.performed_by_name || "";
                        const cLower = (cashierName + " " + (obs.user_email || "")).toLowerCase();

                        // 1. Detección prioritaria de sucursal (Tagarete 1 y Staff mapping)
                        const isTag1 = String(obs.branch_name||"").toLowerCase().includes("tagarete 1") ||
                                       String(obs.branch_id||"") === "branch-4" ||
                                       String(s.branch_name||"").toLowerCase().includes("tagarete 1") ||
                                       cLower.includes("encargado7") || cLower.includes("encargado8") ||
                                       cLower.includes("tagarete 1") || cLower.includes("tagarete1");

                        let bName = "";
                        if (isTag1) {
                            bName = "Tagarete 1";
                        } else {
                            for (const [em, staffInfo] of Object.entries(STAFF)) {
                                const numMatch = em.match(/encargado\d+/);
                                if (cLower.includes(em.toLowerCase()) || (numMatch && cLower.includes(numMatch[0]))) {
                                    bName = staffInfo.b;
                                    break;
                                }
                            }
                            if (!bName) {
                                bName = obs.branch_name || s.branch_name || "";
                            }
                            if (!bName && s.branch_id) {
                                bName = S.branches.find(b=>String(b.id)===String(s.branch_id))?.name || "";
                            }
                            if (!bName && (cLower.includes("cnop") || cLower.includes("cenop"))) bName = "CNOP";
                        }

                        // 2. Detección precisa de turno (Matutino vs Vespertino)
                        const rawShift = obs.shift_name || s.shift_name || "";
                        const shiftCat = getShiftCategory({ cashier_name: cashierName, shift_name: rawShift, created_at: s.created_at });
                        const shiftDisplayName = (shiftCat === "vespertino") ? "Tarde" : "Mañana";

                        return {
                            id: s.id,
                            sale_number: s.sale_number || ("TICK-" + String(s.id).substring(0,8)),
                            branch_id: isTag1 ? "branch-4" : (s.branch_id || (bName ? S.branches.find(b => b.name === bName)?.id : "")),
                            branch_name: bName || "CNOP",
                            shift_name: rawShift || shiftDisplayName,
                            cashier_id: s.user_id,
                            cashier_name: cashierName || "Encargada",
                            total: Number(s.total || 0),
                            payment_method: obs.payment_method || "cash",
                            status: (String(s.status||"").toUpperCase() === "CANCELLED" || String(obs.status||"").toUpperCase() === "CANCELLED") ? "CANCELLED" : "COMPLETED",
                            cancelled_reason: obs.cancelled_reason || null,
                            cancelled_by: obs.cancelled_by || null,
                            cancelled_at: obs.cancelled_at || null,
                            items: (obs.items && obs.items.length) ? obs.items : (s.items || []),
                            created_at: s.created_at || now(),
                            local_id: obs.local_id || s.id,
                            observations: s.observations
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

        // 0. Cargar ventas auténticas de la jornada (Tagarete 2, CNOP, Rescate)
        if (typeof BASE_ACTIVE_SALES !== "undefined" && Array.isArray(BASE_ACTIVE_SALES)) {
            BASE_ACTIVE_SALES.forEach(addSaleToMap);
        }

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
                const prev = salesMap.get(matchedKey);
                const isTag1Merge = resolveCanonicalBranch(prev) === "Tagarete 1" || resolveCanonicalBranch(s) === "Tagarete 1";
                const finalBranch = isTag1Merge ? "Tagarete 1" : (prev.branch_name && prev.branch_name !== "CNOP" && prev.branch_name !== "General" ? prev.branch_name : s.branch_name);
                const finalBranchId = isTag1Merge ? "branch-4" : (prev.branch_id && prev.branch_id !== "c188dd82-7faf-41b8-948b-af8e789facba" ? prev.branch_id : s.branch_id);
                const finalShift = prev.shift_name || s.shift_name;
                const finalItems = (prev.items && prev.items.length) ? prev.items : (s.items || []);

                salesMap.set(matchedKey, { 
                    ...prev, 
                    ...s, 
                    id: prev.id || s.id,
                    sale_number: prev.sale_number || s.sale_number,
                    branch_name: finalBranch,
                    branch_id: finalBranchId,
                    shift_name: finalShift,
                    items: finalItems
                });
            } else {
                salesMap.set(sid, s);
            }
        });

        // 5. Normalizar estado de cancelaciones, sucursales exactas y turnos
        for (const [k, s] of salesMap.entries()) {
            const reason = cancelledReasons[String(s.id)] || cancelledReasons[String(s.sale_number)];
            if (reason) {
                s.status = "CANCELLED";
                if (!s.cancelled_reason) s.cancelled_reason = reason;
            }

            // Asignación inequívoca de sucursal
            const assignedBranch = getBranchForSale(s);
            if (assignedBranch) {
                s.branch_name = assignedBranch;
                if (assignedBranch === "Tagarete 1") {
                    s.branch_id = "branch-4";
                }
            }

            // Asignación inequívoca de turno
            const cat = getShiftCategory(s);
            s.shift_name = (cat === "vespertino") ? "Tarde" : "Mañana";
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
        if (!c) return;
        if (!S.isSU && !S.branchId) {
            const userEm = String(S.user?.email || "").toLowerCase();
            const bResolved = resolveCanonicalBranch(userEm) || resolveCanonicalBranch(S.branchName) || "La Fuente Calzada";
            S.branchName = bResolved;
            const m = S.branches.find(b => resolveCanonicalBranch(b) === bResolved);
            S.branchId = m ? m.id : (
                bResolved === "La Fuente Calzada" ? "branch-1" :
                bResolved === "Rescate" ? "branch-2" :
                bResolved === "Mollotes" ? "branch-3" :
                bResolved === "Tagarete 1" ? "branch-4" :
                bResolved === "Tagarete 2" ? "branch-5" :
                bResolved === "CNOP" ? "branch-6" : "branch-1"
            );
        }
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando ventas de ${esc(S.branchName)}…</p></div>`;
        }

        const consolidated = await getConsolidatedSalesForChain();
        const activeBranchFilter = S.isSU ? (S.salesFilterBranchId || "all") : S.branchId;

        const targetBranchRef = (activeBranchFilter === "all")
            ? "all"
            : {
                id: activeBranchFilter,
                name: S.branches.find(b => String(b.id) === String(activeBranchFilter))?.name || (String(activeBranchFilter) === String(S.branchId) ? S.branchName : "")
              };

        // Filtrar ventas por sucursal seleccionada o todas si es Superusuario
        const branchSales = (S.isSU && activeBranchFilter === "all")
            ? consolidated
            : consolidated.filter(s => matchesBranch(s, targetBranchRef));
        
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

        // Ventas del día (o histórico) antes de filtrar por turno
        let rawDaySales = [];
        if (selectedDate === "all") {
            rawDaySales = branchSales;
        } else if (selectedDate === "today") {
            rawDaySales = datesMap.get(todayStr) || [];
            // Si para 'today' aún no hay ventas en esta sucursal pero sí hay ventas en la jornada activa reciente
            if (!rawDaySales.length && branchSales.length) {
                const latestDate = Array.from(datesMap.keys()).filter(k => (datesMap.get(k)||[]).length > 0).sort().reverse()[0];
                if (latestDate) {
                    rawDaySales = datesMap.get(latestDate) || [];
                }
            }
        } else {
            rawDaySales = datesMap.get(selectedDate) || [];
        }

        // Ventas activas y canceladas del día
        const activeDaySales = rawDaySales.filter(s => String(s.status||"").toUpperCase() !== "CANCELLED");
        const cancelledDaySales = rawDaySales.filter(s => String(s.status||"").toUpperCase() === "CANCELLED");

        // Desglose oficial de turnos para el día seleccionado
        const matSales = activeDaySales.filter(s => getShiftCategory(s) === "matutino");
        const vesSales = activeDaySales.filter(s => getShiftCategory(s) === "vespertino");

        const matTotal = matSales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const matCash = matSales.filter(s => (s.payment_method || "cash") === "cash").reduce((acc,s) => acc + Number(s.total||0), 0);
        const matCard = matSales.filter(s => s.payment_method === "card").reduce((acc,s) => acc + Number(s.total||0), 0);
        const matCount = matSales.length;

        const vesTotal = vesSales.reduce((acc,s) => acc + Number(s.total||0), 0);
        const vesCash = vesSales.filter(s => (s.payment_method || "cash") === "cash").reduce((acc,s) => acc + Number(s.total||0), 0);
        const vesCard = vesSales.filter(s => s.payment_method === "card").reduce((acc,s) => acc + Number(s.total||0), 0);
        const vesCount = vesSales.length;

        const totalDayActive = matTotal + vesTotal;
        const totalDayCash = matCash + vesCash;
        const totalDayCard = matCard + vesCard;
        const totalDayCount = matCount + vesCount;

        // Filtrar lista de visualización por turno
        let filteredSales = rawDaySales;
        if (selectedShift !== "all") {
            filteredSales = filteredSales.filter(s => getShiftCategory(s) === selectedShift);
        }

        const activeSales = filteredSales.filter(s => String(s.status||"").toUpperCase() !== "CANCELLED");
        const cancelledSales = filteredSales.filter(s => String(s.status||"").toUpperCase() === "CANCELLED");

        const targetList = S.salesTab === "cancelled" ? cancelledSales : activeSales;

        const currentBranchDisplayName = S.branches.find(b => String(b.id) === String(activeBranchFilter))?.name || S.branchName;

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
                <strong style="font-size:18px;color:#ffffff;font-weight:900;display:flex;align-items:center;gap:8px">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981"></span>
                    Mis Ventas en Vivo — ${activeBranchFilter==='all'?'Toda la Cadena':esc(currentBranchDisplayName)}
                </strong>
                <div style="font-size:12.5px;color:#fcebd2;margin-top:2px">
                    Ventas del día clasificadas por <strong>Turno Mañana (Matutino)</strong> y <strong>Turno Tarde (Vespertino)</strong>
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${branchSelectHtml}
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora Ghia</span></button>
                <button type="button" id="btn-ref-sales"
                    style="padding:8px 16px;background:linear-gradient(135deg,#fff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:var(--wine-950);box-shadow:0 2px 8px rgba(0,0,0,0.2)">
                    🔄 Actualizar Ventas</button>
            </div>
        </div>

        <!-- TARJETAS DE RESUMEN EN VIVO POR TURNO (MAÑANA Y TARDE) -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-bottom:18px">
            <!-- TARJETA TURNO MAÑANA -->
            <div class="dashboard-card shift-summary-card" data-shift-select="matutino" style="padding:16px 18px;border-radius:14px;background:linear-gradient(145deg,#ffffff,#fffbeb);border:2px solid ${selectedShift==='matutino'?'#f59e0b':'#fde68a'};box-shadow:0 4px 12px rgba(245,158,11,0.15);cursor:pointer;transition:transform 0.15s ease;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span style="font-size:12px;font-weight:900;background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:10px;border:1px solid #fde68a">
                        🌅 TURNO MAÑANA (MATUTINO)
                    </span>
                    <small style="font-size:11px;color:#78350f;font-weight:800">${matCount} tickets</small>
                </div>
                <div style="font-size:24px;font-weight:900;color:#92400e;margin-bottom:6px">${money(matTotal)}</div>
                <div style="display:flex;gap:12px;font-size:11.5px;color:#451a03;font-weight:700">
                    <span>💵 Efectivo: <strong>${money(matCash)}</strong></span>
                    <span>💳 Tarjeta: <strong>${money(matCard)}</strong></span>
                </div>
                <div style="margin-top:8px;font-size:10.5px;color:#b45309;font-weight:800;display:flex;align-items:center;gap:4px">
                    <span>${selectedShift==='matutino'?'▶ Filtrando este turno activo':'👆 Clic para ver solo Turno Mañana'}</span>
                </div>
            </div>

            <!-- TARJETA TURNO TARDE -->
            <div class="dashboard-card shift-summary-card" data-shift-select="vespertino" style="padding:16px 18px;border-radius:14px;background:linear-gradient(145deg,#ffffff,#eef2ff);border:2px solid ${selectedShift==='vespertino'?'#6366f1':'#c7d2fe'};box-shadow:0 4px 12px rgba(99,102,241,0.15);cursor:pointer;transition:transform 0.15s ease;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span style="font-size:12px;font-weight:900;background:#e0e7ff;color:#3730a3;padding:3px 10px;border-radius:10px;border:1px solid #c7d2fe">
                        🌇 TURNO TARDE (VESPERTINO)
                    </span>
                    <small style="font-size:11px;color:#312e81;font-weight:800">${vesCount} tickets</small>
                </div>
                <div style="font-size:24px;font-weight:900;color:#3730a3;margin-bottom:6px">${money(vesTotal)}</div>
                <div style="display:flex;gap:12px;font-size:11.5px;color:#1e1b4b;font-weight:700">
                    <span>💵 Efectivo: <strong>${money(vesCash)}</strong></span>
                    <span>💳 Tarjeta: <strong>${money(vesCard)}</strong></span>
                </div>
                <div style="margin-top:8px;font-size:10.5px;color:#4f46e5;font-weight:800;display:flex;align-items:center;gap:4px">
                    <span>${selectedShift==='vespertino'?'▶ Filtrando este turno activo':'👆 Clic para ver solo Turno Tarde'}</span>
                </div>
            </div>

            <!-- TARJETA TOTAL DEL DÍA -->
            <div class="dashboard-card shift-summary-card" data-shift-select="all" style="padding:16px 18px;border-radius:14px;background:linear-gradient(145deg,#ffffff,#f0fdf4);border:2px solid ${selectedShift==='all'?'#10b981':'#bbf7d0'};box-shadow:0 4px 12px rgba(16,185,129,0.15);cursor:pointer;transition:transform 0.15s ease;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span style="font-size:12px;font-weight:900;background:#dcfce7;color:#15803d;padding:3px 10px;border-radius:10px;border:1px solid #86efac">
                        💰 TOTAL DEL DÍA (AMBOS TURNOS)
                    </span>
                    <small style="font-size:11px;color:#14532d;font-weight:800">${totalDayCount} tickets</small>
                </div>
                <div style="font-size:24px;font-weight:900;color:#15803d;margin-bottom:6px">${money(totalDayActive)}</div>
                <div style="display:flex;gap:12px;font-size:11.5px;color:#052e16;font-weight:700">
                    <span>💵 Efectivo: <strong>${money(totalDayCash)}</strong></span>
                    <span>💳 Tarjeta: <strong>${money(totalDayCard)}</strong></span>
                </div>
                <div style="margin-top:8px;font-size:10.5px;color:#16a34a;font-weight:800;display:flex;align-items:center;gap:4px">
                    <span>${selectedShift==='all'?'▶ Mostrando ambos turnos':'👆 Clic para ver ambos turnos'}</span>
                </div>
            </div>
        </div>

        <!-- BARRA DE FILTROS RÁPIDOS Y PESTAÑAS -->
        <div class="dashboard-card" style="padding:14px 18px;border-radius:14px;margin-bottom:18px;background:#ffffff;border:1.5px solid rgba(188,132,10,0.3);box-shadow:var(--shadow-sm)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
                <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <label style="font-size:12px;font-weight:900;color:var(--wine-800)">📅 FECHA:</label>
                    <select id="sales-date-filter" style="padding:7px 12px;border:1.5px solid var(--gold-500);border-radius:10px;font-size:12px;font-weight:700;background:#fff;outline:none">
                        <option value="today"${selectedDate==='today'?' selected':''}>📅 Hoy (${fd(todayStr)})</option>
                        <option value="all"${selectedDate==='all'?' selected':''}>🌐 Todo el Histórico</option>
                        ${dateOptions.filter(d => d !== todayStr).map(d => `<option value="${d}"${selectedDate===d?' selected':''}>📅 ${fd(d)}</option>`).join("")}
                    </select>

                    <label style="font-size:12px;font-weight:900;color:var(--wine-800);margin-left:6px">🌅 TURNO:</label>
                    <div style="display:inline-flex;gap:4px;background:#f3f4f6;padding:3px;border-radius:10px;border:1px solid #e5e7eb">
                        <button type="button" class="btn-shift-pill${selectedShift==='all'?' active-shift-pill':''}" data-shift="all"
                            style="padding:6px 12px;border-radius:8px;border:none;font-weight:800;font-size:11.5px;cursor:pointer;${selectedShift==='all'?'background:var(--wine-800);color:#fff':'background:transparent;color:#4b5563'}">
                            🌟 Todos (${totalDayCount})
                        </button>
                        <button type="button" class="btn-shift-pill${selectedShift==='matutino'?' active-shift-pill':''}" data-shift="matutino"
                            style="padding:6px 12px;border-radius:8px;border:none;font-weight:800;font-size:11.5px;cursor:pointer;${selectedShift==='matutino'?'background:#d97706;color:#fff':'background:transparent;color:#4b5563'}">
                            🌅 Mañana (${matCount})
                        </button>
                        <button type="button" class="btn-shift-pill${selectedShift==='vespertino'?' active-shift-pill':''}" data-shift="vespertino"
                            style="padding:6px 12px;border-radius:8px;border:none;font-weight:800;font-size:11.5px;cursor:pointer;${selectedShift==='vespertino'?'background:#4f46e5;color:#fff':'background:transparent;color:#4b5563'}">
                            🌇 Tarde (${vesCount})
                        </button>
                    </div>
                </div>

                <div style="display:flex;gap:6px">
                    <button type="button" class="sales-tab-btn${S.salesTab==='active'?' active-stab':''}" data-tab="active"
                        style="padding:7px 14px;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer;${S.salesTab==='active'?'background:#15803d;color:#fff;border:none':'background:#f3f4f6;color:#374151;border:1px solid #d1d5db'}">
                        ✓ Ventas Activas (${activeSales.length})
                    </button>
                    <button type="button" class="sales-tab-btn${S.salesTab==='cancelled'?' active-stab':''}" data-tab="cancelled"
                        style="padding:7px 14px;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer;${S.salesTab==='cancelled'?'background:#b91c1c;color:#fff;border:none':'background:#f3f4f6;color:#374151;border:1px solid #d1d5db'}">
                        🚫 Canceladas (${cancelledSales.length})
                    </button>
                </div>
            </div>
        </div>

        <!-- LISTA DE TICKETS Y VENTAS -->
        ${targetList.length ? `
        <div style="display:flex;flex-direction:column;gap:12px">
            ${targetList.map(s => {
                const isCan = String(s.status||"").toUpperCase() === "CANCELLED";
                const isCard = s.payment_method === "card";
                const shiftCat = getShiftCategory(s);
                const isMat = shiftCat === "matutino";
                const timeStr = s.created_at ? fdt(s.created_at) : "--:--";
                return `<article class="sale-card" style="background:#fff;border:1.5px solid rgba(188,132,10,.35);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
                    <div style="flex:1;min-width:280px">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
                            <strong style="font-size:15px;color:var(--wine-900)">#${esc(s.sale_number || s.id)} — 📍 ${esc(s.branch_name || S.branchName)}</strong>
                            <span style="font-size:10.5px;padding:3px 9px;border-radius:10px;font-weight:900;${isMat?'background:#fef3c7;color:#92400e;border:1px solid #fde68a':'background:#e0e7ff;color:#3730a3;border:1px solid #c7d2fe'}">
                                ${isMat ? '🌅 Turno Mañana' : '🌇 Turno Tarde'}
                            </span>
                            <span style="font-size:10px;padding:2px 8px;border-radius:10px;font-weight:800;${isCan?'background:#fee2e2;color:#991b1b':'background:#dcfce7;color:#15803d'}">
                                ${isCan ? '🚫 Cancelada' : '✓ Cobrada'}
                            </span>
                            <span style="font-size:10px;padding:2px 8px;border-radius:10px;font-weight:800;${isCard?'background:#eff6ff;color:#1d4ed8':'background:#f0fdf4;color:#15803d'}">
                                ${isCard ? '💳 Tarjeta' : '💵 Efectivo'}
                            </span>
                        </div>
                        <div style="font-size:11.5px;color:var(--text-muted);font-weight:600">
                            ${timeStr} • Por: <strong>${esc(s.cashier_name || 'Encargada')}</strong> <small>(${esc(s.shift_name || (isMat ? 'Mañana' : 'Tarde'))})</small>
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
                            style="padding:8px 14px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1px solid var(--gold-400);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer">
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

        // Píldoras de Turno
        c.querySelectorAll(".btn-shift-pill").forEach(btn => btn.addEventListener("click", async () => {
            S.salesFilterShift = btn.dataset.shift;
            await loadSales();
        }));

        // Clic en tarjetas de resumen de turno
        c.querySelectorAll(".shift-summary-card").forEach(card => card.addEventListener("click", async () => {
            if (card.dataset.shiftSelect) {
                S.salesFilterShift = card.dataset.shiftSelect;
                await loadSales();
            }
        }));

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

        c.querySelectorAll(".sales-tab-btn").forEach(btn => btn.addEventListener("click", async () => {
            S.salesTab = btn.dataset.tab;
            await loadSales();
        }));

        document.getElementById("btn-ref-sales")?.addEventListener("click", async () => {
            _cachedConsolidatedSales = null;
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

            // Reintegrar automáticamente productos e insumos compuestos al cancelar ticket
            const targetSale = target || lTarget;
            if (targetSale && Array.isArray(targetSale.items)) {
                targetSale.items.forEach(it => {
                    addStock(it.product_id, Number(it.quantity || 1), it.product_name);
                });
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

        // 1. Cargar cortes con asignación inequívoca de sucursal y turno
        const addCut = (ct, fallbackBranch) => {
            if (!ct) return;
            let obs = {};
            try { obs = typeof ct.observations === "string" ? JSON.parse(ct.observations) : (ct.observations || {}); } catch(e) {}

            let bName = obs.branch_name || ct.branch_name || fallbackBranch || "";
            let bId = ct.branch_id || "";
            const pLow = String(obs.performed_by_name || obs.cashier_name || ct.performed_by_name || ct.cashier_name || "").toLowerCase();

            const canonicalB = resolveCanonicalBranch(ct);
            if (canonicalB) {
                bName = canonicalB;
            } else if (bId === "branch-4" || pLow.includes("tagarete 1") || pLow.includes("tagarete1") || (/encargad[oa]7(?!\d)/i.test(pLow)) || (/encargad[oa]8(?!\d)/i.test(pLow))) {
                bName = "Tagarete 1";
            } else if (bId === "branch-5" || pLow.includes("tagarete 2") || pLow.includes("tagarete2") || (/encargad[oa]9(?!\d)/i.test(pLow)) || (/encargad[oa]10(?!\d)/i.test(pLow))) {
                bName = "Tagarete 2";
            } else if (bId === "branch-6" || pLow.includes("cnop") || pLow.includes("cenop") || (/encargad[oa]11(?!\d)/i.test(pLow)) || (/encargad[oa]12(?!\d)/i.test(pLow))) {
                bName = "CNOP";
            } else if (bId === "branch-2" || pLow.includes("rescate") || (/encargad[oa]3(?!\d)/i.test(pLow)) || (/encargad[oa]4(?!\d)/i.test(pLow))) {
                bName = "Rescate";
            } else if (bId === "branch-3" || pLow.includes("mollotes") || pLow.includes("molotes") || (/encargad[oa]5(?!\d)/i.test(pLow)) || (/encargad[oa]6(?!\d)/i.test(pLow))) {
                bName = "Mollotes";
            } else if (bId === "branch-1" || pLow.includes("calzada") || (/encargad[oa]1(?!\d)/i.test(pLow) && !pLow.includes("10") && !pLow.includes("11") && !pLow.includes("12")) || /encargad[oa]2(?!\d)/i.test(pLow)) {
                bName = "La Fuente Calzada";
            }

            if (!bName && bId) {
                const found = S.branches.find(b => String(b.id) === String(bId));
                if (found) bName = found.name;
            }
            if (!bName) bName = fallbackBranch || S.branchName;

            const shiftCat = getShiftCategory({ cashier_name: pLow, shift_name: obs.shift_name || ct.shift_name, created_at: ct.created_at });
            const sName = (shiftCat === "vespertino") ? "Tarde" : "Mañana";

            const cid = String(ct.id || (ct.created_at + "_" + bName + "_" + sName));
            if (!cutsMap.has(cid)) {
                cutsMap.set(cid, {
                    ...ct,
                    id: ct.id || cid,
                    branch_name: bName,
                    shift_name: obs.shift_name || ct.shift_name || sName,
                    branch_id: bId || (S.branches.find(b => b.name === bName)?.id || S.branchId),
                    created_at: ct.created_at || now()
                });
            }
        };

        // 0. Cargar cortes oficiales de la jornada (Turnos matutino y vespertino)
        if (typeof BASE_ACTIVE_CUTS !== "undefined" && Array.isArray(BASE_ACTIVE_CUTS)) {
            BASE_ACTIVE_CUTS.forEach(c => addCut(c, c.branch_name));
        }

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

        // Cargar registros de cortes eliminados desde Supabase
        if (db) {
            try {
                const {data: delRecs} = await safeQuery(db.from("sales").select("observations").eq("status", "CUT_DELETED_RECORD").limit(100), null, 2000);
                if (delRecs && delRecs.length) {
                    const localDelCuts = new Set(gr("deleted_cut_ids", []));
                    delRecs.forEach(dr => {
                        let obs = {};
                        try { obs = typeof dr.observations === "string" ? JSON.parse(dr.observations) : (dr.observations || {}); } catch(e) {}
                        if (obs.deleted_cut_id) localDelCuts.add(String(obs.deleted_cut_id));
                    });
                    const arrDel = Array.from(localDelCuts);
                    gw("deleted_cut_ids", arrDel);
                    lw("deleted_cut_ids", arrDel);
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
        if (!c) return;
        if (!S.isSU && !S.branchId) {
            const userEm = String(S.user?.email || "").toLowerCase();
            const bResolved = resolveCanonicalBranch(userEm) || resolveCanonicalBranch(S.branchName) || "La Fuente Calzada";
            S.branchName = bResolved;
            const m = S.branches.find(b => resolveCanonicalBranch(b) === bResolved);
            S.branchId = m ? m.id : (
                bResolved === "La Fuente Calzada" ? "branch-1" :
                bResolved === "Rescate" ? "branch-2" :
                bResolved === "Mollotes" ? "branch-3" :
                bResolved === "Tagarete 1" ? "branch-4" :
                bResolved === "Tagarete 2" ? "branch-5" :
                bResolved === "CNOP" ? "branch-6" : "branch-1"
            );
        }
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
        let todayActiveSales = currentBranchSales.filter(s => toDateKey(s.created_at) === todayStr && String(s.status||"").toUpperCase() !== "CANCELLED");
        if (!todayActiveSales.length && currentBranchSales.length) {
            const datesMap = new Map();
            currentBranchSales.forEach(s => {
                const d = toDateKey(s.created_at);
                if (d && String(s.status||"").toUpperCase() !== "CANCELLED") {
                    if (!datesMap.has(d)) datesMap.set(d, []);
                    datesMap.get(d).push(s);
                }
            });
            const latestDate = Array.from(datesMap.keys()).sort().reverse()[0];
            if (latestDate) {
                todayActiveSales = datesMap.get(latestDate) || [];
            }
        }
        
        const currentCategory = (S.shift.toLowerCase().includes("tarde") || S.shift.toLowerCase().includes("vesp")) ? "vespertino" : "matutino";
        let currentTurnSales = todayActiveSales.filter(s => getShiftCategory(s) === currentCategory || String(s.shift_name||"").toLowerCase().includes(currentCategory.slice(0,4)));
        if (!currentTurnSales.length && todayActiveSales.length) {
            const sShift = (S.shift || "").toLowerCase();
            currentTurnSales = todayActiveSales.filter(s => String(s.shift_name||"").toLowerCase().includes(sShift));
            if (!currentTurnSales.length) {
                currentTurnSales = todayActiveSales;
            }
        }

        const currentCashSales = currentTurnSales.filter(s => (s.payment_method || "cash") === "cash").reduce((a,s)=>a+Number(s.total||0), 0);
        const currentCardSales = currentTurnSales.filter(s => s.payment_method === "card").reduce((a,s)=>a+Number(s.total||0), 0);
        const currentTotalSold = currentCashSales + currentCardSales;

        // Obtener el fondo inicial exacto validado del turno activo ligado al cambio de turno de la sucursal
        const allShifts = gr("all_shifts", []);
        const activeBranchKey = { id: S.branchId, name: S.branchName };
        const branchShift = allShifts.find(sh => matchesBranch(sh, activeBranchKey));
        const activeLocalShift = lr("current_shift", null);
        const initialFund = (branchShift && branchShift.opening_amount != null)
            ? Number(branchShift.opening_amount)
            : (activeLocalShift && activeLocalShift.opening_amount != null
                ? Number(activeLocalShift.opening_amount)
                : (S.currentShift && S.currentShift.opening_amount != null ? Number(S.currentShift.opening_amount) : 500));
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
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><span>🖨️</span><span>Impresora</span></button>
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
                                style="padding:8px 16px;background:linear-gradient(135deg,#991024,#520712);color:#ffffff;border:1.5px solid var(--gold-400);border-radius:10px;font-size:12px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15)">
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
                        <div style="background:linear-gradient(135deg,#991024,#520712);padding:8px 12px;border-radius:8px;color:#fff;display:flex;flex-direction:column;justify-content:center">
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

            const ok = await toastConfirm(`👑 [SUPERUSUARIO] ¿Estás seguro de eliminar este corte de caja de ${bName} (${sName})?\nEsta acción se sincronizará y borrará el corte en la sucursal.`);
            if (!ok) return;

            // 1. Guardar en lista de cortes eliminados global y local
            const deleted = gr("deleted_cut_ids", []);
            if (!deleted.includes(cid)) deleted.push(cid);
            gw("deleted_cut_ids", deleted);
            lw("deleted_cut_ids", deleted);

            // 2. Limpiar de todas las memorias locales
            gw("all_cuts", gr("all_cuts", []).filter(x => String(x.id) !== cid));
            lw("cuts", lr("cuts", []).filter(x => String(x.id) !== cid));
            const bKeySuffixes = ["calzada", "rescate", "mollotes", "tagarete_1", "tagarete_2", "cnop", "branch-1", "branch-2", "branch-3", "branch-4", "branch-5", "branch-6"];
            bKeySuffixes.forEach(sfx => {
                try {
                    const raw = localStorage.getItem("lf_" + sfx + "_cuts");
                    if (raw) {
                        const arr = JSON.parse(raw);
                        if (Array.isArray(arr)) {
                            localStorage.setItem("lf_" + sfx + "_cuts", JSON.stringify(arr.filter(x => String(x.id) !== cid)));
                        }
                    }
                } catch(e) {}
            });

            // 3. Eliminar de Supabase cash_cuts y registrar eliminación
            if (db) {
                try { await db.from("cash_cuts").delete().eq("id", cid); } catch(e) {}
                try {
                    await safeQuery(db.from("sales").insert({
                        branch_id: "c188dd82-7faf-41b8-948b-af8e789facba",
                        company_id: "51bc275d-4e19-4115-be3f-42c0ce3dae5a",
                        shift_id: "1dabe6df-2ce6-4e3a-97df-b81e179898ab",
                        user_id: "4710b330-566c-45c7-a92e-b7b6a62355af",
                        sale_number: "DELCUT-" + Date.now(),
                        total: 0,
                        status: "CUT_DELETED_RECORD",
                        observations: JSON.stringify({
                            is_cut_deleted_record: true,
                            deleted_cut_id: cid,
                            branch_name: bName,
                            shift_name: sName,
                            deleted_by: S.profile?.full_name || S.user?.email || "Superusuario",
                            deleted_at: now()
                        })
                    }), null, 2500);
                } catch(e) {}
            }

            // 4. Difusión en tiempo real por canal Mesh
            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "cut_deleted",
                        payload: { id: cid, branch_name: bName, shift_name: sName, by: S.user?.email }
                    });
                } catch(e) {}
            }

            await loadCuts();
            toast(`🗑️ Corte de ${bName} (${sName}) eliminado de todo el sistema y sucursal.`, "info", 3500);
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

        // 3. Consultar Supabase turnos y aperturas registradas
        if (db) {
            try {
                const {data: shiftSales} = await safeQuery(db.from("sales").select("*").eq("status", "SHIFT_RECORD").order("created_at", {ascending:false}), null, 3000);
                if (shiftSales && shiftSales.length) {
                    shiftSales.forEach(s => {
                        let obs = {};
                        try { obs = typeof s.observations === "string" ? JSON.parse(s.observations) : (s.observations || {}); } catch(e) {}
                        if (obs.is_shift_record) {
                            const sid = "cloud_shift_" + (obs.shift_id || s.id);
                            if (!shiftsMap.has(sid)) {
                                shiftsMap.set(sid, {
                                    id: obs.shift_id || sid,
                                    branch_id: s.branch_id,
                                    branch_name: obs.branch_name || "Sucursal",
                                    shift_name: obs.shift_name || "Mañana",
                                    cashier_name: obs.cashier_name || "Encargada",
                                    opening_amount: Number(obs.opening_amount || 0),
                                    opened_at: obs.opened_at || s.created_at
                                });
                            }
                        }
                    });
                }
            } catch(e) {}
        }

        // 4. Consultar Supabase si existen cortes registrados
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
                <button type="button" class="btn-open-printer-modal" style="padding:8px 14px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:800;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)">
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

            // Persistir apertura de turno en Supabase para que llegue a cualquier dispositivo
            if (db) {
                try {
                    await db.from("sales").insert({
                        branch_id: "c188dd82-7faf-41b8-948b-af8e789facba",
                        company_id: "51bc275d-4e19-4115-be3f-42c0ce3dae5a",
                        shift_id: "1dabe6df-2ce6-4e3a-97df-b81e179898ab",
                        user_id: "4710b330-566c-45c7-a92e-b7b6a62355af",
                        sale_number: "SHIFT-" + Date.now(),
                        subtotal: 0,
                        discount: 0,
                        tax: 0,
                        total: 0,
                        status: "SHIFT_RECORD",
                        observations: JSON.stringify({
                            is_shift_record: true,
                            shift_id: shiftObj.id,
                            branch_name: shiftObj.branch_name,
                            shift_name: shiftObj.shift_name,
                            cashier_name: shiftObj.cashier_name,
                            opening_amount: shiftObj.opening_amount,
                            opened_at: shiftObj.opened_at
                        })
                    });
                } catch(e) {
                    console.warn("Error saving shift to cloud DB:", e);
                }
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
        const userEm = String(S.user?.email || "").toLowerCase();
        const hasPreassignedShift = !!STAFF[userEm] || userEm.includes("encargad") || userEm.includes("cnop") || userEm.includes("tagarete") || userEm.includes("mollotes");

        if (localShift && localShift.opening_amount != null && matchesBranch(localShift, { id: S.branchId, name: S.branchName })) {
            S.currentShift = localShift;
            if (!hasPreassignedShift) {
                S.shift = localShift.shift_name || S.shift;
            }
        }

        // 2. Si no hay turno local previo, verificar si hay un turno activo registrado en global/localStorage
        if (!S.currentShift) {
            const allShifts = gr("all_shifts", []);
            const branchShift = allShifts.find(sh => matchesBranch(sh, { id: S.branchId, name: S.branchName }));
            if (branchShift) {
                S.currentShift = branchShift;
                if (!hasPreassignedShift) {
                    S.shift = branchShift.shift_name || S.shift;
                }
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

    /* ── DAÑOS & AVISOS (CENTRO DE MERMAS Y COMUNICACIÓN ENTRE SUCURSALES Y SUPERUSUARIOS) ── */
    let _activeDamageTab = "report_damage"; // "report_damage", "post_notice", "history_damages", "history_notices"

    async function loadDamageReports(silent = false) {
        const c = $("#damage-reports-container");
        if (!c) return;
        if (!silent && !c.children.length) {
            c.innerHTML = `<div style="padding:24px;text-align:center"><div class="loading-spinner"></div><p style="margin-top:10px;color:var(--text-muted)">Cargando centro de daños y avisos…</p></div>`;
        }

        // 1. Cargar mermas y avisos desde la nube (Supabase)
        if (db) {
            try {
                const {data: cloudRecords} = await safeQuery(db.from("sales").select("*").in("status", ["DAMAGE_RECORD", "NOTICE_RECORD"]).order("created_at", {ascending: false}).limit(100), null, 2500);
                if (cloudRecords && cloudRecords.length) {
                    const localReps = gr("all_damage_reports", []);
                    const repMap = new Map();
                    localReps.forEach(r => repMap.set(String(r.id), r));

                    const localNotices = gr("all_notices", []);
                    const noticeMap = new Map();
                    localNotices.forEach(n => noticeMap.set(String(n.id), n));

                    cloudRecords.forEach(rec => {
                        let obs = {};
                        try { obs = typeof rec.observations === "string" ? JSON.parse(rec.observations) : (rec.observations || {}); } catch(e) {}
                        if (rec.status === "DAMAGE_RECORD" && obs.report) {
                            repMap.set(String(obs.report.id), obs.report);
                        } else if (rec.status === "NOTICE_RECORD" && obs.notice) {
                            noticeMap.set(String(obs.notice.id), obs.notice);
                        }
                    });

                    gw("all_damage_reports", Array.from(repMap.values()).sort((a,b) => new Date(b.created_at||0) - new Date(a.created_at||0)));
                    gw("all_notices", Array.from(noticeMap.values()).sort((a,b) => new Date(b.created_at||0) - new Date(a.created_at||0)));
                }
            } catch(e) {}
        }

        const allReports = gr("all_damage_reports", []);
        const allNotices = gr("all_notices", []);

        const activeFilterBranch = S.damageBranchFilter || (S.isSU ? "all" : S.branchId);

        const displayedReports = (activeFilterBranch === "all")
            ? allReports
            : allReports.filter(r => matchesBranch(r, { id: activeFilterBranch, name: S.branches.find(b=>String(b.id)===String(activeFilterBranch))?.name || S.branchName }));

        const displayedNotices = (activeFilterBranch === "all")
            ? allNotices
            : allNotices.filter(n => n.target_branch === "all" || matchesBranch(n, { id: activeFilterBranch, name: S.branches.find(b=>String(b.id)===String(activeFilterBranch))?.name || S.branchName }));

        const totalLostMoney = displayedReports.reduce((acc, r) => acc + (Number(r.price || 0) * Number(r.quantity || 1)), 0);
        const totalDamagePieces = displayedReports.reduce((acc, r) => acc + Number(r.quantity || 1), 0);

        const branchSelectHtml = S.isSU ? `
            <div style="display:flex;align-items:center;gap:8px">
                <label style="font-size:12px;font-weight:900;color:#fcebd2">📍 VER SUCURSAL:</label>
                <select id="sel-damage-branch-filter" style="padding:7px 12px;border-radius:10px;border:1.5px solid var(--gold-400);font-weight:800;font-size:12px;background:#fff;outline:none;color:#1a0205">
                    <option value="all"${activeFilterBranch==='all'?' selected':''}>🌐 Todas las Sucursales (${allReports.length} mermas / ${allNotices.length} avisos)</option>
                    ${S.branches.map(b => `<option value="${esc(b.id)}"${String(b.id)===String(activeFilterBranch)?' selected':''}>📍 ${esc(b.name)}</option>`).join("")}
                </select>
            </div>` : '';

        c.innerHTML = `
        <!-- ENCABEZADO PRINCIPAL -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px">
            <div>
                <strong style="font-size:19px;color:#ffffff;font-weight:900;display:flex;align-items:center;gap:8px">
                    <span>📢</span> Centro de Daños, Mermas & Avisos en Vivo
                </strong>
                <div style="font-size:12.5px;color:#fcebd2;margin-top:3px;font-weight:700">
                    ${S.isSU ? '👑 Monitoreo directivo de mermas y comunicación instantánea' : ('📍 Sucursal: ' + esc(S.branchName) + ' • Turno ' + esc(S.shift))}
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                ${branchSelectHtml}
                <button type="button" id="btn-ref-damages-all"
                    style="padding:8px 16px;background:linear-gradient(135deg,#ffffff,#fceed3);border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;color:#1a0205;box-shadow:0 2px 8px rgba(0,0,0,0.2)">
                    🔄 Sincronizar
                </button>
            </div>
        </div>

        <!-- TARJETAS DE RESUMEN -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px">
            <div style="background:#ffffff;border:1.5px solid #fca5a5;border-left:5px solid #dc2626;border-radius:14px;padding:14px 18px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                <span style="font-size:11px;font-weight:900;color:#991b1b;letter-spacing:0.5px">⚠️ MERMAS REGISTRADAS</span>
                <div style="font-size:24px;font-weight:900;color:#7f1d1d;margin-top:3px">${totalDamagePieces} <small style="font-size:13px;font-weight:700">piezas</small></div>
                <small style="color:#991b1b;font-weight:800">${displayedReports.length} reportes archivados</small>
            </div>
            <div style="background:#ffffff;border:1.5px solid #fcd34d;border-left:5px solid #d97706;border-radius:14px;padding:14px 18px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                <span style="font-size:11px;font-weight:900;color:#92400e;letter-spacing:0.5px">💸 COSTO ESTIMADO MERMA</span>
                <div style="font-size:24px;font-weight:900;color:#78350f;margin-top:3px">${money(totalLostMoney)}</div>
                <small style="color:#92400e;font-weight:800">Descontado de existencias</small>
            </div>
            <div style="background:#ffffff;border:1.5px solid #93c5fd;border-left:5px solid #2563eb;border-radius:14px;padding:14px 18px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                <span style="font-size:11px;font-weight:900;color:#1e40af;letter-spacing:0.5px">📢 AVISOS & COMUNICADOS</span>
                <div style="font-size:24px;font-weight:900;color:#1e3a8a;margin-top:3px">${displayedNotices.length} <small style="font-size:13px;font-weight:700">activos</small></div>
                <small style="color:#1e40af;font-weight:800">Mensajes de red y turnos</small>
            </div>
        </div>

        <!-- PESTAÑAS PRÁCTICAS DE NAVEGACIÓN -->
        <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap">
            <button type="button" class="damage-tab-btn${_activeDamageTab==='report_damage'?' active-damage-tab':''}" data-tab="report_damage"
                style="padding:10px 18px;border-radius:12px;font-weight:900;font-size:13px;cursor:pointer;${_activeDamageTab==='report_damage'?'background:linear-gradient(135deg,var(--gold-400),var(--gold-600));color:#1a0205;border:2px solid var(--gold-500);box-shadow:0 3px 10px rgba(0,0,0,0.2)':'background:rgba(255,255,255,0.12);color:#ffffff;border:1.5px solid rgba(255,255,255,0.2)'}">
                🚨 1. Registrar Merma / Daño
            </button>
            <button type="button" class="damage-tab-btn${_activeDamageTab==='post_notice'?' active-damage-tab':''}" data-tab="post_notice"
                style="padding:10px 18px;border-radius:12px;font-weight:900;font-size:13px;cursor:pointer;${_activeDamageTab==='post_notice'?'background:linear-gradient(135deg,var(--gold-400),var(--gold-600));color:#1a0205;border:2px solid var(--gold-500);box-shadow:0 3px 10px rgba(0,0,0,0.2)':'background:rgba(255,255,255,0.12);color:#ffffff;border:1.5px solid rgba(255,255,255,0.2)'}">
                📢 2. Publicar Aviso / Nota
            </button>
            <button type="button" class="damage-tab-btn${_activeDamageTab==='history_damages'?' active-damage-tab':''}" data-tab="history_damages"
                style="padding:10px 18px;border-radius:12px;font-weight:900;font-size:13px;cursor:pointer;${_activeDamageTab==='history_damages'?'background:linear-gradient(135deg,var(--gold-400),var(--gold-600));color:#1a0205;border:2px solid var(--gold-500);box-shadow:0 3px 10px rgba(0,0,0,0.2)':'background:rgba(255,255,255,0.12);color:#ffffff;border:1.5px solid rgba(255,255,255,0.2)'}">
                📜 3. Historial de Mermas (${displayedReports.length})
            </button>
            <button type="button" class="damage-tab-btn${_activeDamageTab==='history_notices'?' active-damage-tab':''}" data-tab="history_notices"
                style="padding:10px 18px;border-radius:12px;font-weight:900;font-size:13px;cursor:pointer;${_activeDamageTab==='history_notices'?'background:linear-gradient(135deg,var(--gold-400),var(--gold-600));color:#1a0205;border:2px solid var(--gold-500);box-shadow:0 3px 10px rgba(0,0,0,0.2)':'background:rgba(255,255,255,0.12);color:#ffffff;border:1.5px solid rgba(255,255,255,0.2)'}">
                💬 4. Muro de Avisos (${displayedNotices.length})
            </button>
        </div>

        <!-- CONTENIDO DE LA PESTAÑA SELECCIONADA -->
        <div id="damage-tab-content">
            ${_renderDamageTabContent(displayedReports, displayedNotices)}
        </div>`;

        // Listeners de pestañas
        c.querySelectorAll(".damage-tab-btn").forEach(b => b.addEventListener("click", () => {
            _activeDamageTab = b.dataset.tab;
            loadDamageReports(true);
        }));

        document.getElementById("sel-damage-branch-filter")?.addEventListener("change", (e) => {
            S.damageBranchFilter = e.target.value;
            loadDamageReports();
        });

        document.getElementById("btn-ref-damages-all")?.addEventListener("click", async () => {
            await loadDamageReports();
            toast("✓ Daños y avisos sincronizados con la nube.", "info", 3000);
        });

        _attachDamageFormListeners(c);
    }

    function _renderDamageTabContent(reports, notices) {
        // PESTAÑA 1: FORMULARIO SÚPER RÁPIDO DE MERMAS
        if (_activeDamageTab === "report_damage") {
            const sortedProds = S.products.filter(p => isProductAllowedInBranch(p, S.branchName)).sort((a,b) => (a.product_name||"").localeCompare(b.product_name||""));
            return `
            <div style="background:#ffffff;border:2px solid var(--gold-400);border-radius:18px;padding:24px;box-shadow:0 4px 18px rgba(0,0,0,0.15)">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;border-bottom:2px solid #f1f5f9;padding-bottom:12px">
                    <div>
                        <h3 style="margin:0;font-size:18px;font-weight:900;color:#0f172a">⚠️ Registro Express de Merma o Producto Dañado</h3>
                        <small style="color:#64748b;font-weight:700">Se descuenta en tiempo real del inventario de ${esc(S.branchName)} y notifica a Dirección</small>
                    </div>
                    <span style="font-size:11px;font-weight:900;background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:8px;border:1px solid #fca5a5">
                        📍 ${esc(S.branchName)} (${esc(S.shift)})
                    </span>
                </div>

                <!-- SELECTOR DE PRODUCTO -->
                <div style="margin-bottom:16px">
                    <label style="font-size:12px;font-weight:900;color:#1e293b;display:block;margin-bottom:6px">1. SELECCIONA EL PRODUCTO O INSUMO AFECTADO *</label>
                    <select id="quick-damage-pid" style="width:100%;padding:12px 14px;border:2px solid #cbd5e1;border-radius:10px;font-size:14px;font-weight:800;color:#0f172a;background:#f8fafc;outline:none">
                        <option value="">-- Toca aquí para elegir producto --</option>
                        ${sortedProds.map(p => {
                            const curStk = getStock(p.product_id);
                            return `<option value="${esc(p.product_id)}" data-name="${esc(p.product_name)}" data-price="${p.price||0}">${esc(p.product_name)} (${p.price>0?money(p.price):'Insumo'}) • Stock actual: ${curStk} uds</option>`;
                        }).join("")}
                    </select>
                </div>

                <!-- CANTIDAD CON BOTONES RÁPIDOS -->
                <div style="margin-bottom:16px">
                    <label style="font-size:12px;font-weight:900;color:#1e293b;display:block;margin-bottom:6px">2. CANTIDAD DAÑADA *</label>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                        <input id="quick-damage-qty" type="number" min="1" max="500" value="1"
                            style="width:90px;padding:12px;border:2px solid #cbd5e1;border-radius:10px;font-size:16px;font-weight:900;text-align:center;color:#0f172a">
                        <button type="button" class="btn-quick-qty" data-q="1" style="padding:10px 14px;background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer">+1</button>
                        <button type="button" class="btn-quick-qty" data-q="2" style="padding:10px 14px;background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer">+2</button>
                        <button type="button" class="btn-quick-qty" data-q="5" style="padding:10px 14px;background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer">+5</button>
                        <button type="button" class="btn-quick-qty" data-q="10" style="padding:10px 14px;background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer">+10</button>
                    </div>
                </div>

                <!-- BOTONES DE MOTIVO RÁPIDO CON 1 CLIC -->
                <div style="margin-bottom:18px">
                    <label style="font-size:12px;font-weight:900;color:#1e293b;display:block;margin-bottom:8px">3. MOTIVO DEL DAÑO (Toca una opción rápida o escribe abajo) *</label>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
                        <button type="button" class="btn-quick-reason" data-r="Se cayó al suelo / Se rompió" style="padding:8px 12px;background:#fee2e2;color:#991b1b;border:1.5px solid #fca5a5;border-radius:8px;font-weight:800;font-size:11.5px;cursor:pointer">🍦 Se cayó / Se rompió</button>
                        <button type="button" class="btn-quick-reason" data-r="Descongelado / Falla de vitrina" style="padding:8px 12px;background:#fef3c7;color:#92400e;border:1.5px solid #fcd34d;border-radius:8px;font-weight:800;font-size:11.5px;cursor:pointer">❄️ Descongelado / Temperatura</button>
                        <button type="button" class="btn-quick-reason" data-r="Empaque abierto / Dañado" style="padding:8px 12px;background:#eff6ff;color:#1e40af;border:1.5px solid #bfdbfe;border-radius:8px;font-weight:800;font-size:11.5px;cursor:pointer">📦 Empaque roto / golpeado</button>
                        <button type="button" class="btn-quick-reason" data-r="Caducado / Producto no apto" style="padding:8px 12px;background:#f3e8ff;color:#6b21a8;border:1.5px solid #d8b4fe;border-radius:8px;font-weight:800;font-size:11.5px;cursor:pointer">⏰ Caducidad / Mal estado</button>
                        <button type="button" class="btn-quick-reason" data-r="Muestra a cliente / Degustación" style="padding:8px 12px;background:#dcfce7;color:#15803d;border:1.5px solid #86efac;border-radius:8px;font-weight:800;font-size:11.5px;cursor:pointer">🥄 Degustación / Muestra</button>
                    </div>
                    <input id="quick-damage-reason" type="text" placeholder="Escribe o selecciona el motivo..."
                        style="width:100%;padding:12px 14px;border:2px solid #cbd5e1;border-radius:10px;font-size:13.5px;font-weight:700;color:#0f172a;box-sizing:border-box">
                </div>

                <button type="button" id="btn-save-quick-damage"
                    style="width:100%;padding:14px;background:linear-gradient(135deg,#dc2626,#991b1b);color:#ffffff;border:none;border-radius:12px;font-weight:900;font-size:15px;cursor:pointer;box-shadow:0 4px 14px rgba(220,38,38,0.3);letter-spacing:0.5px">
                    ✓ Confirmar Merma & Descontar de Inventario
                </button>
            </div>`;
        }

        // PESTAÑA 2: PUBLICAR AVISO / NOTA
        if (_activeDamageTab === "post_notice") {
            return `
            <div style="background:#ffffff;border:2px solid var(--gold-400);border-radius:18px;padding:24px;box-shadow:0 4px 18px rgba(0,0,0,0.15)">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;border-bottom:2px solid #f1f5f9;padding-bottom:12px">
                    <div>
                        <h3 style="margin:0;font-size:18px;font-weight:900;color:#0f172a">📢 Publicar Nuevo Aviso o Comunicado</h3>
                        <small style="color:#64748b;font-weight:700">Envía recados a Superusuarios, al siguiente turno o a toda la cadena</small>
                    </div>
                    <span style="font-size:11px;font-weight:900;background:#dbeafe;color:#1e40af;padding:4px 10px;border-radius:8px;border:1px solid #93c5fd">
                        Por: ${esc(S.profile?.full_name || S.user?.email || "Encargada")}
                    </span>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:16px">
                    <div>
                        <label style="font-size:12px;font-weight:900;color:#1e293b;display:block;margin-bottom:6px">TIPO DE AVISO</label>
                        <select id="notice-type" style="width:100%;padding:11px;border:2px solid #cbd5e1;border-radius:10px;font-size:13.5px;font-weight:800;color:#0f172a;background:#f8fafc">
                            <option value="important">🚨 Urgente / Importante</option>
                            <option value="supply">📦 Petición de Insumos / Cambio</option>
                            <option value="maintenance">🛠️ Falla de Equipo / Mantenimiento</option>
                            <option value="general" selected>ℹ️ Informativo General</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:12px;font-weight:900;color:#1e293b;display:block;margin-bottom:6px">DIRIGIDO A:</label>
                        <select id="notice-target" style="width:100%;padding:11px;border:2px solid #cbd5e1;border-radius:10px;font-size:13.5px;font-weight:800;color:#0f172a;background:#f8fafc">
                            <option value="su">👑 Superusuarios (Jaquelin e Ignacio)</option>
                            <option value="next_shift">🔄 Siguiente Turno (${esc(S.branchName)})</option>
                            <option value="all">🌐 Todas las Sucursales de la Cadena</option>
                        </select>
                    </div>
                </div>

                <!-- MENSAJES RÁPIDOS CON 1 CLIC -->
                <div style="margin-bottom:16px">
                    <label style="font-size:12px;font-weight:900;color:#1e293b;display:block;margin-bottom:8px">PLANTILLAS RÁPIDAS (Toca una opción para autocompletar):</label>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
                        <button type="button" class="btn-quick-notice" data-txt="Se ocupan monedas y cambio de $5, $10 y $20 para la caja." style="padding:7px 12px;background:#fef3c7;color:#92400e;border:1.5px solid #fcd34d;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">💵 Falta cambio/monedas</button>
                        <button type="button" class="btn-quick-notice" data-txt="Revisar nivel de congelación en el congelador principal, parece que subió la temperatura." style="padding:7px 12px;background:#fee2e2;color:#991b1b;border:1.5px solid #fca5a5;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">❄️ Revisar congelador</button>
                        <button type="button" class="btn-quick-notice" data-txt="Quedan pocos vasos, servilletas y cucharas para el siguiente turno." style="padding:7px 12px;background:#eff6ff;color:#1e40af;border:1.5px solid #bfdbfe;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">🧤 Faltan desechables</button>
                        <button type="button" class="btn-quick-notice" data-txt="Limpieza general, vitrinas y piso sanitizado al cerrar turno." style="padding:7px 12px;background:#dcfce7;color:#15803d;border:1.5px solid #86efac;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">🧹 Limpieza completada</button>
                    </div>
                    <textarea id="notice-message" rows="4" placeholder="Escribe el mensaje o aviso detallado aquí..."
                        style="width:100%;padding:12px 14px;border:2px solid #cbd5e1;border-radius:10px;font-size:13.5px;font-weight:700;color:#0f172a;box-sizing:border-box;font-family:inherit"></textarea>
                </div>

                <button type="button" id="btn-save-quick-notice"
                    style="width:100%;padding:14px;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#ffffff;border:none;border-radius:12px;font-weight:900;font-size:15px;cursor:pointer;box-shadow:0 4px 14px rgba(37,99,235,0.3);letter-spacing:0.5px">
                    📢 Publicar Aviso en Tiempo Real
                </button>
            </div>`;
        }

        // PESTAÑA 3: HISTORIAL DE MERMAS
        if (_activeDamageTab === "history_damages") {
            if (!reports.length) {
                return `<div style="text-align:center;padding:40px;background:#ffffff;border-radius:16px;border:1.5px dashed #cbd5e1">
                    <div style="font-size:40px">📦</div>
                    <h4 style="margin:10px 0 4px;color:#0f172a;font-size:16px;font-weight:900">No hay mermas registradas</h4>
                    <p style="color:#64748b;font-size:13px;margin:0">El inventario se encuentra al 100% sin reportes de producto dañado.</p>
                </div>`;
            }

            return `
            <div style="background:#ffffff;border:2px solid var(--gold-400);border-radius:18px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.15)">
                <div style="padding:16px 20px;background:#f8fafc;border-bottom:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center">
                    <strong style="color:#0f172a;font-size:15px;font-weight:900">Historial Detallado de Mermas (${reports.length} reportes)</strong>
                    <span style="font-size:12px;font-weight:900;color:#991b1b">Pérdida total estimada: ${money(totalLostMoney)}</span>
                </div>
                <div style="display:flex;flex-direction:column;divide-y:1px solid #e2e8f0">
                    ${reports.map(rep => {
                        const repTotal = (Number(rep.price||0) * Number(rep.quantity||1));
                        return `
                        <div style="padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
                            <div>
                                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                                    <strong style="font-size:15px;color:#0f172a;font-weight:900">⚠️ ${rep.quantity}x ${esc(rep.product_name)}</strong>
                                    <span style="font-size:10.5px;padding:3px 8px;border-radius:6px;font-weight:900;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5">
                                        📍 ${esc(rep.branch_name || S.branchName)}
                                    </span>
                                    ${repTotal > 0 ? `<span style="font-size:11px;font-weight:900;color:#b45309">-${money(repTotal)}</span>` : ''}
                                </div>
                                <div style="font-size:12px;color:#64748b;font-weight:700">
                                    Motivo: <strong style="color:#1e293b">${esc(rep.reason)}</strong>
                                </div>
                                <div style="font-size:11px;color:#94a3b8;margin-top:3px">
                                    Registrado por: <strong>${esc(rep.reported_by)}</strong> • Fecha: <strong>${fdt(rep.created_at)}</strong>
                                </div>
                            </div>
                            <div style="text-align:right">
                                <span style="padding:5px 10px;background:#dcfce7;color:#15803d;border:1px solid #86efac;border-radius:8px;font-size:11px;font-weight:900">
                                    ✓ Descontado de Stock
                                </span>
                            </div>
                        </div>`;
                    }).join("")}
                </div>
            </div>`;
        }

        // PESTAÑA 4: MURO DE AVISOS
        if (_activeDamageTab === "history_notices") {
            if (!notices.length) {
                return `<div style="text-align:center;padding:40px;background:#ffffff;border-radius:16px;border:1.5px dashed #cbd5e1">
                    <div style="font-size:40px">💬</div>
                    <h4 style="margin:10px 0 4px;color:#0f172a;font-size:16px;font-weight:900">No hay avisos publicados</h4>
                    <p style="color:#64748b;font-size:13px;margin:0">Los comunicados o peticiones aparecerán aquí en tiempo real.</p>
                </div>`;
            }

            return `
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px">
                ${notices.map(n => {
                    const typeBg = n.type === 'important' ? '#fef2f2' : (n.type === 'supply' ? '#eff6ff' : (n.type === 'maintenance' ? '#fefce8' : '#f8fafc'));
                    const typeBorder = n.type === 'important' ? '#fca5a5' : (n.type === 'supply' ? '#bfdbfe' : (n.type === 'maintenance' ? '#fde047' : '#e2e8f0'));
                    const typeBadge = n.type === 'important' ? '🚨 URGENTE' : (n.type === 'supply' ? '📦 INSUMOS' : (n.type === 'maintenance' ? '🛠️ FALLA' : 'ℹ️ AVISO'));
                    const typeBadgeColor = n.type === 'important' ? '#991b1b' : (n.type === 'supply' ? '#1e40af' : (n.type === 'maintenance' ? '#854d0e' : '#334155'));

                    return `
                    <div style="background:${typeBg};border:2px solid ${typeBorder};border-radius:16px;padding:18px;box-shadow:0 3px 10px rgba(0,0,0,0.06);display:flex;flex-direction:column;justify-content:space-between">
                        <div>
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                                <span style="font-size:10.5px;font-weight:900;padding:3px 8px;border-radius:6px;background:#fff;border:1px solid ${typeBorder};color:${typeBadgeColor}">
                                    ${typeBadge}
                                </span>
                                <small style="font-size:11px;color:#64748b;font-weight:700">${fdt(n.created_at)}</small>
                            </div>
                            <div style="font-size:14.5px;font-weight:800;color:#0f172a;line-height:1.4;margin-bottom:12px">
                                "${esc(n.message)}"
                            </div>
                        </div>
                        <div style="border-top:1px dashed #cbd5e1;padding-top:8px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#64748b">
                            <span>📍 <strong>${esc(n.branch_name || 'Sucursal')}</strong> (${esc(n.author || 'Encargada')})</span>
                            <span style="font-weight:800;color:#1e293b">Para: ${n.target === 'su' ? '👑 Superusuarios' : (n.target === 'next_shift' ? '🔄 Siguiente Turno' : '🌐 Toda la Cadena')}</span>
                        </div>
                    </div>`;
                }).join("")}
            </div>`;
        }

        return '';
    }

    function _attachDamageFormListeners(c) {
        // Formulario de merma
        c.querySelectorAll(".btn-quick-qty").forEach(b => b.addEventListener("click", () => {
            const inp = document.getElementById("quick-damage-qty");
            if (inp) inp.value = parseInt(b.dataset.q, 10) || 1;
        }));

        c.querySelectorAll(".btn-quick-reason").forEach(b => b.addEventListener("click", () => {
            const inp = document.getElementById("quick-damage-reason");
            if (inp) inp.value = b.dataset.r;
        }));

        document.getElementById("btn-save-quick-damage")?.addEventListener("click", async () => {
            const selEl = document.getElementById("quick-damage-pid");
            const qtyEl = document.getElementById("quick-damage-qty");
            const reasonEl = document.getElementById("quick-damage-reason");

            const pid = selEl?.value;
            const opt = selEl?.options[selEl.selectedIndex];
            const pName = opt?.dataset?.name || "Producto";
            const price = Number(opt?.dataset?.price || 0);
            const qty = Math.max(1, parseInt(qtyEl?.value, 10) || 1);
            const reason = reasonEl?.value?.trim() || "Merma / Daño";

            if (!pid) return toast("Selecciona el producto afectado.", "warn");

            const curStk = getStock(pid);
            if (qty > curStk && curStk > 0) {
                const ok = await toastConfirm(`⚠️ La cantidad (${qty} uds) supera el stock actual (${curStk} uds).\n¿Deseas registrar la merma de todas formas?`);
                if (!ok) return;
            }

            // 1. Descontar stock local y de sucursal
            S.inv[pid] = Math.max(0, getStock(pid) - qty);
            saveBranchInv();
            alertInv();

            const repObj = {
                id: "damage_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                branch_id: S.branchId,
                branch_name: S.branchName,
                shift_name: S.shift,
                product_id: pid,
                product_name: pName,
                price: price,
                quantity: qty,
                reason: reason,
                reported_by: S.profile?.full_name || S.user?.email || "Encargada",
                created_at: now(),
                status: "approved"
            };

            const allReps = gr("all_damage_reports", []);
            allReps.unshift(repObj);
            gw("all_damage_reports", allReps);

            // 2. Transmitir en tiempo real
            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "damage_reported",
                        payload: { report: repObj }
                    });
                } catch(e) {}
            }

            // 3. Persistir en Supabase
            if (db) {
                try {
                    safeQuery(db.from("sales").insert({
                        branch_id: "c188dd82-7faf-41b8-948b-af8e789facba",
                        company_id: "51bc275d-4e19-4115-be3f-42c0ce3dae5a",
                        shift_id: "1dabe6df-2ce6-4e3a-97df-b81e179898ab",
                        user_id: "4710b330-566c-45c7-a92e-b7b6a62355af",
                        sale_number: "DAMAGE-" + Date.now(),
                        subtotal: 0,
                        discount: 0,
                        tax: 0,
                        total: 0,
                        status: "DAMAGE_RECORD",
                        observations: JSON.stringify({
                            is_damage_record: true,
                            report: repObj
                        })
                    }), null, 2500).catch(e => console.warn("Cloud damage persist:", e));
                } catch(e) {}
            }

            toast(`✓ Merma registrada: ${qty}x '${pName}' descontados del inventario.`, "success", 4500);
            _activeDamageTab = "history_damages";
            await loadDamageReports();
        });

        // Formulario de avisos
        c.querySelectorAll(".btn-quick-notice").forEach(b => b.addEventListener("click", () => {
            const txt = document.getElementById("notice-message");
            if (txt) txt.value = b.dataset.txt;
        }));

        document.getElementById("btn-save-quick-notice")?.addEventListener("click", async () => {
            const type = document.getElementById("notice-type")?.value || "general";
            const target = document.getElementById("notice-target")?.value || "all";
            const msg = document.getElementById("notice-message")?.value?.trim();

            if (!msg) return toast("Escribe el mensaje del aviso.", "warn");

            const noticeObj = {
                id: "notice_" + Date.now() + "_" + Math.random().toString(36).substring(2,6),
                branch_id: S.branchId,
                branch_name: S.branchName,
                shift_name: S.shift,
                type: type,
                target: target,
                message: msg,
                author: S.profile?.full_name || S.user?.email || "Encargada",
                created_at: now()
            };

            const allNotices = gr("all_notices", []);
            allNotices.unshift(noticeObj);
            gw("all_notices", allNotices);

            // 1. Transmitir en tiempo real
            if (realtimeChannel) {
                try {
                    realtimeChannel.send({
                        type: "broadcast",
                        event: "notice_posted",
                        payload: { notice: noticeObj }
                    });
                } catch(e) {}
            }

            // 2. Persistir en Supabase
            if (db) {
                try {
                    safeQuery(db.from("sales").insert({
                        branch_id: "c188dd82-7faf-41b8-948b-af8e789facba",
                        company_id: "51bc275d-4e19-4115-be3f-42c0ce3dae5a",
                        shift_id: "1dabe6df-2ce6-4e3a-97df-b81e179898ab",
                        user_id: "4710b330-566c-45c7-a92e-b7b6a62355af",
                        sale_number: "NOTICE-" + Date.now(),
                        subtotal: 0,
                        discount: 0,
                        tax: 0,
                        total: 0,
                        status: "NOTICE_RECORD",
                        observations: JSON.stringify({
                            is_notice_record: true,
                            notice: noticeObj
                        })
                    }), null, 2500).catch(e => console.warn("Cloud notice persist:", e));
                } catch(e) {}
            }

            toast("✓ Aviso publicado y transmitido a toda la red en tiempo real.", "success", 4000);
            _activeDamageTab = "history_notices";
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
                <button type="button" id="btn-close-business-day" style="padding:10px 18px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,0.25);display:flex;align-items:center;gap:6px">
                    <span>🔒</span><span>Realizar Corte General & Cerrar Día Oficial</span>
                </button>
            </div></div>
        </div>

        
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px">
            <div class="dashboard-card" style="background:linear-gradient(135deg,#44060e,#7a0c1c);color:#fff;border-color:var(--gold-400);padding:22px;border-radius:18px">
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
        <div style="margin-bottom:24px;border:2px solid var(--gold-400);border-radius:18px;background:#ffffff;box-shadow:0 4px 18px rgba(0,0,0,0.18);overflow:hidden">
            <div style="background:linear-gradient(135deg,#7a0c1c,#44060e);color:#ffffff;padding:16px 22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
                <div style="display:flex;align-items:center;gap:12px">
                    <span style="font-size:26px">🍨</span>
                    <div>
                        <h3 style="margin:0;font-size:17px;font-weight:900;color:#ffffff;letter-spacing:0.3px">Resumen Diario de Productos Vendidos (Producción & Auditoría)</h3>
                        <p style="margin:3px 0 0;font-size:12px;color:#fef08a;font-weight:700">Desglose de unidades vendidas por turno (Matutino vs Vespertino) e inventario restante</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:10px">
                    <label style="font-size:12px;font-weight:900;color:#ffffff">📍 Ver Sucursal:</label>
                    <select id="sel-summary-branch" style="background:#ffffff;color:#1a0205;font-weight:900;font-size:12.5px;border-radius:10px;padding:7px 14px;border:2px solid var(--gold-400);cursor:pointer;outline:none;box-shadow:0 2px 6px rgba(0,0,0,0.15)">
                        <option value="all" ${(!S.prodSummaryBranch || S.prodSummaryBranch === "all") ? "selected" : ""}>🌐 Todas las Sucursales</option>
                        ${S.branches.map(b => `<option value="${b.id}" ${S.prodSummaryBranch === b.id ? "selected" : ""}>📍 ${esc(b.name)}</option>`).join("")}
                    </select>
                </div>
            </div>
            <div id="product-summary-table-container" style="padding:18px;background:#ffffff;overflow-x:auto">
                <!-- Se llena dinámicamente con renderProductSummaryTable -->
            </div>
        </div>

        <h3 style="font-size:20px;font-weight:900;color:#ffffff;margin-bottom:18px;display:flex;align-items:center;gap:10px;text-shadow:0 2px 4px rgba(0,0,0,0.4)">
            <span style="font-size:22px">📍</span> Monitor de Red en Vivo (6 Sucursales)
        </h3>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;margin-bottom:30px">
            ${summary.map(b => `
                <div class="dashboard-card" style="border-radius:18px;border:1.5px solid var(--gold-400);padding:20px;position:relative;background:linear-gradient(145deg,#44060e,#1a0205);box-shadow:0 6px 18px rgba(0,0,0,0.25)">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
                        <h4 style="margin:0;font-size:17px;font-weight:900;color:#ffffff;display:flex;align-items:center;gap:8px">
                            <span style="font-size:20px">🍦</span> ${esc(b.name)}
                        </h4>
                        <span style="font-size:11px;font-weight:900;padding:4px 10px;border-radius:20px;${b.sales > 0 ? 'background:#dcfce7;color:#15803d;border:1px solid #86efac' : 'background:#fef3c7;color:#92400e;border:1px solid #fcd34d'}">
                            ${b.sales > 0 ? '🟢 EN VIVO' : '🟡 LISTO'}</span>
                    </div>
                    <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px;margin-bottom:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                            <span style="font-size:12.5px;color:#64748b;font-weight:800">Ventas Hoy:</span>
                            <strong style="font-size:19px;color:#15803d;font-weight:900">${money(b.sales)}</strong>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                            <span style="font-size:12px;color:#64748b;font-weight:700">Tickets Cobrados:</span>
                            <span style="font-weight:900;color:#0f172a;font-size:13.5px">${b.orders}</span>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:8px;border-top:1.5px dashed #cbd5e1;font-size:11.5px">
                            <div>💵 Efectivo: <strong style="color:#166534;font-weight:900">${money(b.cashTotal)}</strong></div>
                            <div>💳 Tarjeta: <strong style="color:#1d4ed8;font-weight:900">${money(b.cardTotal)}</strong></div>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:8px;border-top:1.5px dashed #cbd5e1;font-size:11.5px">
                            <div>🌅 Matutino: <strong style="color:#9a3412;font-weight:900">${money(b.matTotal)}</strong></div>
                            <div>🌇 Vespertino: <strong style="color:#1e40af;font-weight:900">${money(b.vesTotal)}</strong></div>
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
                        <button class="btn btn-sm btn-outline btn-view-branch-sales" data-bid="${b.id}" data-bname="${esc(b.name)}" style="font-size:11.5px;font-weight:900;padding:9px;background:#ffffff;color:#1e293b;border:1.5px solid #cbd5e1;border-radius:10px;cursor:pointer">
                            📋 Ver Ventas
                        </button>
                        <button class="btn btn-sm btn-outline btn-view-branch-cuts" data-bid="${b.id}" data-bname="${esc(b.name)}" style="font-size:11.5px;font-weight:900;padding:9px;background:#fef2f2;border:1.5px solid #fca5a5;color:#991b1b;border-radius:10px;cursor:pointer">
                            ✂ Ver Cortes
                        </button>
                    </div>
                    <button class="btn btn-sm btn-primary btn-operate-branch" data-bid="${b.id}" data-bname="${esc(b.name)}" style="width:100%;font-size:12px;font-weight:900;padding:10px;background:linear-gradient(135deg,var(--gold-400),var(--gold-600));color:#1a0205;border:none;border-radius:10px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,0.25)">
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
                const ok = await toastConfirm(`👑 [SUPERUSUARIO]\n¿Deseas realizar el CORTE GENERAL del día ${selectedDate}?\n• Se consolidarán y archivarán las ganancias del día en el Acumulado Histórico.\n• El monitor en vivo se preparará para el siguiente día.`);
                if (!ok) return;

                // 1. Registrar en días cerrados
                const closedDays = gr("closed_business_days", []);
                if (!closedDays.includes(selectedDate)) {
                    closedDays.push(selectedDate);
                    gw("closed_business_days", closedDays);
                }

                // 2. Archivar en histórico contable permanente
                const histList = gr("accounting_history", []);
                const existingIdx = histList.findIndex(h => h.date === selectedDate);
                const dayEntry = {
                    date: selectedDate,
                    total_chain: chainTotal,
                    cash_total: chainCashTotal,
                    card_total: chainCardTotal,
                    mat_total: chainMatTotal,
                    ves_total: chainVesTotal,
                    total_tickets: todaySales.length,
                    branches: summary,
                    closed_at: now(),
                    created_at: now(),
                    closed_by: S.profile?.full_name || S.user?.email || "Dirección General"
                };

                if (existingIdx !== -1) {
                    histList[existingIdx] = dayEntry;
                } else {
                    histList.unshift(dayEntry);
                }
                gw("accounting_history", histList);

                // 3. Archivar en ledgers diarios
                const ledgers = gr("historical_daily_ledgers", {});
                ledgers[selectedDate] = dayEntry;
                gw("historical_daily_ledgers", ledgers);

                toast(`✓ Corte General del día ${selectedDate} consolidado en el Acumulado Histórico exitosamente.`, "success", 5000);
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
            c.innerHTML = `<div style="text-align:center;padding:32px;background:#f8fafc;border-radius:12px;border:1.5px dashed #cbd5e1">
                <div style="font-size:36px">📦</div>
                <p style="margin-top:8px;font-size:14px;color:#475569;font-weight:700">Aún no se registran productos vendidos en la sucursal y fecha seleccionadas.</p>
            </div>`;
            return;
        }

        const totalPieces = prodList.reduce((acc, p) => acc + p.totalQty, 0);
        const totalMoney = prodList.reduce((acc, p) => acc + p.totalMoney, 0);
        const totalMat = prodList.reduce((acc, p) => acc + p.matQty, 0);
        const totalVes = prodList.reduce((acc, p) => acc + p.vesQty, 0);

        c.innerHTML = `
        <!-- STATS RESUMEN SUPERIOR -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px">
            <div style="background:#fdf2f8;border:1.5px solid #fbcfe8;border-radius:12px;padding:12px 16px;box-shadow:0 2px 6px rgba(157,23,77,0.06)">
                <span style="font-size:11px;font-weight:900;color:#9d174d;letter-spacing:0.5px">🍨 TOTAL UNIDADES VENDIDAS</span>
                <div style="font-size:24px;font-weight:900;color:#831843;margin-top:2px">${totalPieces} <small style="font-size:13px;font-weight:700">piezas</small></div>
            </div>
            <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:12px;padding:12px 16px;box-shadow:0 2px 6px rgba(146,64,14,0.06)">
                <span style="font-size:11px;font-weight:900;color:#92400e;letter-spacing:0.5px">🌅 TURNO MATUTINO</span>
                <div style="font-size:24px;font-weight:900;color:#78350f;margin-top:2px">${totalMat} <small style="font-size:13px;font-weight:700">piezas</small></div>
            </div>
            <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;padding:12px 16px;box-shadow:0 2px 6px rgba(30,64,175,0.06)">
                <span style="font-size:11px;font-weight:900;color:#1e40af;letter-spacing:0.5px">🌇 TURNO VESPERTINO</span>
                <div style="font-size:24px;font-weight:900;color:#1e3a8a;margin-top:2px">${totalVes} <small style="font-size:13px;font-weight:700">piezas</small></div>
            </div>
            <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:12px 16px;box-shadow:0 2px 6px rgba(22,101,52,0.06)">
                <span style="font-size:11px;font-weight:900;color:#166534;letter-spacing:0.5px">💰 IMPORTE TOTAL GENERADO</span>
                <div style="font-size:24px;font-weight:900;color:#14532d;margin-top:2px">${money(totalMoney)}</div>
            </div>
        </div>

        <!-- TABLA DE ALTO CONTRASTE Y LEGIBILIDAD -->
        <div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.06)">
            <table style="width:100%;border-collapse:collapse;font-size:13px;background:#ffffff;color:#0f172a">
                <thead>
                    <tr style="background:#f1f5f9;border-bottom:2px solid #cbd5e1;text-align:left">
                        <th style="padding:12px 16px;font-weight:900;color:#0f172a;font-size:12px;letter-spacing:0.5px">🍨 PRODUCTO / CONCEPTO</th>
                        <th style="padding:12px 16px;font-weight:900;color:#0f172a;font-size:12px;letter-spacing:0.5px">🏷️ CATEGORÍA</th>
                        <th style="padding:12px 16px;font-weight:900;text-align:center;color:#9a3412;font-size:12px;letter-spacing:0.5px">🌅 MATUTINO</th>
                        <th style="padding:12px 16px;font-weight:900;text-align:center;color:#1e40af;font-size:12px;letter-spacing:0.5px">🌇 VESPERTINO</th>
                        <th style="padding:12px 16px;font-weight:900;text-align:center;background:#fef3c7;color:#78350f;font-size:12.5px;letter-spacing:0.5px">🍨 TOTAL DÍA</th>
                        <th style="padding:12px 16px;font-weight:900;text-align:right;color:#166534;font-size:12px;letter-spacing:0.5px">💰 IMPORTE</th>
                        <th style="padding:12px 16px;font-weight:900;text-align:center;color:#0f172a;font-size:12px;letter-spacing:0.5px">📦 STOCK RESTANTE</th>
                    </tr>
                </thead>
                <tbody>
                    ${prodList.map((p, idx) => {
                        const curStock = getStock(p.id);
                        const isLow = curStock <= STOCK_LOW;
                        const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                        return `
                        <tr style="border-bottom:1px solid #e2e8f0;background:${rowBg}">
                            <td style="padding:12px 16px;font-weight:900;color:#0f172a;font-size:13.5px">
                                ${esc(p.name)}
                                ${p.code ? `<br><small style="color:#64748b;font-weight:700;font-size:11px">Clave: ${esc(p.code)}</small>` : ''}
                            </td>
                            <td style="padding:12px 16px">
                                <span style="background:#e2e8f0;border:1px solid #cbd5e1;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:900;color:#1e293b;text-transform:uppercase;letter-spacing:0.5px">
                                    ${esc(p.category)}
                                </span>
                            </td>
                            <td style="padding:12px 16px;text-align:center;font-weight:900;color:#9a3412;font-size:13.5px">${p.matQty} pz</td>
                            <td style="padding:12px 16px;text-align:center;font-weight:900;color:#1e40af;font-size:13.5px">${p.vesQty} pz</td>
                            <td style="padding:12px 16px;text-align:center;font-weight:900;font-size:14.5px;background:#fef3c7;color:#78350f">${p.totalQty} pz</td>
                            <td style="padding:12px 16px;text-align:right;font-weight:900;color:#15803d;font-size:14px">${money(p.totalMoney)}</td>
                            <td style="padding:12px 16px;text-align:center">
                                <span style="padding:5px 12px;border-radius:8px;font-size:12px;font-weight:900;${isLow ? 'background:#fee2e2;color:#991b1b;border:1.5px solid #fca5a5' : 'background:#dcfce7;color:#166534;border:1.5px solid #86efac'}">
                                    ${curStock} uds. ${isLow ? '⚠ Resurtir' : '✓'}
                                </span>
                            </td>
                        </tr>`;
                    }).join("")}
                </tbody>
            </table>
        </div>`;
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
        const allCuts = await getConsolidatedCutsForChain();

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

        const dateCuts = isAllDates
            ? allCuts
            : allCuts.filter(c => toDateKey(c.created_at) === (selectedDate === "today" ? todayStr : selectedDate) || String(c.created_at||"").slice(0,10) === (selectedDate === "today" ? todayStr : selectedDate));

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
                    <button type="button" id="btn-print-daily-acc" style="padding:8px 16px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1.5px solid var(--gold-400);border-radius:10px;cursor:pointer;font-weight:900;font-size:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15)">
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

                const bCuts = dateCuts.filter(c => matchesBranch(c, bName));
                const matCut = bCuts.find(c => getShiftCategory(c) === "matutino");
                const vesCut = bCuts.find(c => getShiftCategory(c) === "vespertino");

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
                                style="padding:7px 12px;background:linear-gradient(135deg,#991024,#520712);color:#fff;border:1px solid var(--gold-400);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:4px">
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
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px;background:linear-gradient(135deg,#44060e,#450a12);padding:16px 20px;border-radius:16px;border:1.5px solid var(--gold-400);box-shadow:0 4px 15px rgba(0,0,0,0.2)">
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
        if (S.view === "pos") updatePosLiveMovement();
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
                // RECEPCIÓN DE MODIFICACIONES Y RETIROS DE PRODUCTOS / CATÁLOGO
                .on("broadcast", { event: "catalog_updated" }, async ({ payload }) => {
                    if (!payload) return;
                    let modified = false;
                    if (payload.custom_products && Array.isArray(payload.custom_products)) {
                        const localCustom = gr("custom_products", []);
                        const map = new Map();
                        localCustom.forEach(p => map.set(String(p.product_id), p));
                        payload.custom_products.forEach(p => {
                            map.set(String(p.product_id), p);
                            modified = true;
                        });
                        gw("custom_products", Array.from(map.values()));
                    }
                    if (payload.deleted_product_ids && Array.isArray(payload.deleted_product_ids)) {
                        const localDel = new Set(gr("deleted_product_ids", []));
                        payload.deleted_product_ids.forEach(id => {
                            localDel.add(String(id));
                            modified = true;
                        });
                        gw("deleted_product_ids", Array.from(localDel));
                    }
                    if (payload.damage_reports && Array.isArray(payload.damage_reports)) {
                        const localReps = gr("all_damage_reports", []);
                        const repMap = new Map();
                        localReps.forEach(r => repMap.set(String(r.id), r));
                        payload.damage_reports.forEach(r => repMap.set(String(r.id), r));
                        gw("all_damage_reports", Array.from(repMap.values()));
                    }
                    if (payload.notices && Array.isArray(payload.notices)) {
                        const localNotices = gr("all_notices", []);
                        const notMap = new Map();
                        localNotices.forEach(n => notMap.set(String(n.id), n));
                        payload.notices.forEach(n => notMap.set(String(n.id), n));
                        gw("all_notices", Array.from(notMap.values()));
                    }
                    await loadProducts();
                    if (S.isSU) {
                        const who = payload.user || payload.branch_name || "Sucursal";
                        const act = payload.action || "Modificación de productos";
                        toast(`📦 ${act} en ${who}`, "info", 4500);
                    }
                    if (S.view === "products") await loadProductsAdmin();
                    else if (S.view === "pos") renderPOS(filtered());
                    else if (S.view === "inventory") await loadInventory();
                })
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
                    _cachedConsolidatedSales = null;
                    if (S.isSU) {
                        toast(`🔔 Venta cobrada en vivo: ${money(s.total)} en ${s.branch_name || 'Sucursal'} (${s.shift_name || 'Turno'})`, "success", 4000);
                    }
                    safeSilentRefresh(true);
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
                .on("broadcast", { event: "cut_deleted" }, async ({ payload }) => {
                    if (!payload || !payload.id) return;
                    const cid = String(payload.id);

                    // 1. Guardar en lista de cortes eliminados
                    const deleted = gr("deleted_cut_ids", []);
                    if (!deleted.includes(cid)) deleted.push(cid);
                    gw("deleted_cut_ids", deleted);
                    lw("deleted_cut_ids", deleted);

                    // 2. Remover de todas las memorias locales
                    gw("all_cuts", gr("all_cuts", []).filter(x => String(x.id) !== cid));
                    lw("cuts", lr("cuts", []).filter(x => String(x.id) !== cid));
                    const bKeySuffixes = ["calzada", "rescate", "mollotes", "tagarete_1", "tagarete_2", "cnop", "branch-1", "branch-2", "branch-3", "branch-4", "branch-5", "branch-6"];
                    bKeySuffixes.forEach(sfx => {
                        try {
                            const raw = localStorage.getItem("lf_" + sfx + "_cuts");
                            if (raw) {
                                const arr = JSON.parse(raw);
                                if (Array.isArray(arr)) {
                                    localStorage.setItem("lf_" + sfx + "_cuts", JSON.stringify(arr.filter(x => String(x.id) !== cid)));
                                }
                            }
                        } catch(e) {}
                    });

                    if (S.branchName === payload.branch_name && !S.isSU) {
                        toast(`ℹ️ Un corte de caja (${payload.shift_name || 'Turno'}) fue eliminado por Dirección.`, "info", 4000);
                    }

                    if (S.view === "cuts") await loadCuts(true);
                    else if (S.view === "accounting") await loadAccounting(true);
                    else if (S.view === "private-access") await loadPrivateAccess(true);
                })
                // 2.1 RECEPCIÓN DIRECTA DE INVENTARIOS EN TIEMPO REAL (MESH BROADCAST)
                .on("broadcast", { event: "damage_reported" }, async ({ payload }) => {
                    if (!payload || !payload.report) return;
                    const rep = payload.report;
                    const allReps = gr("all_damage_reports", []);
                    if (!allReps.some(r => String(r.id) === String(rep.id))) {
                        allReps.unshift(rep);
                        gw("all_damage_reports", allReps);
                    }
                    if (S.isSU) {
                        toast(`⚠️ Merma en ${rep.branch_name || 'Sucursal'}: ${rep.quantity}x '${rep.product_name}' (${rep.reason || 'Daño'}) por ${rep.reported_by || 'Encargada'}`, "warn", 6000);
                    }
                    if (S.view === "damage-reports") await loadDamageReports(true);
                })
                .on("broadcast", { event: "notice_posted" }, async ({ payload }) => {
                    if (!payload || !payload.notice) return;
                    const not = payload.notice;
                    const allNotices = gr("all_notices", []);
                    if (!allNotices.some(n => String(n.id) === String(not.id))) {
                        allNotices.unshift(not);
                        gw("all_notices", allNotices);
                    }
                    toast(`📢 Aviso de ${not.branch_name || 'Sucursal'} (${not.author || 'Encargada'}): "${not.message}"`, "info", 6500);
                    if (S.view === "damage-reports") await loadDamageReports(true);
                })
                .on("broadcast", { event: "inventory_withdrawn" }, async ({ payload }) => {
                    if (!payload) return;
                    if (S.isSU) {
                        toast(`📦 Retiro en ${payload.branch_name || 'Sucursal'}: ${payload.qty_withdrawn}x '${payload.product_name}' (${payload.reason || 'Merma'}) por ${payload.user || 'Encargada'}`, "warn", 6000);
                    }
                    if (S.view === "inventory") await loadInventory();
                })
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
                    const allGShifts = gr("all_shifts", []);
                    const myShifts = lr("shifts", []);
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
                                    shifts: (myShifts && myShifts.length) ? myShifts : allGShifts,
                                    inv: S.inv,
                                    custom_products: gr("custom_products", []),
                                    deleted_product_ids: gr("deleted_product_ids", []),
                                    damage_reports: gr("all_damage_reports", []),
                                    notices: gr("all_notices", [])
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
                    if (payload.shifts && payload.shifts.length) {
                        let allShifts = gr("all_shifts", []);
                        const mapS = new Map();
                        allShifts.forEach(sh => mapS.set(String(sh.id || sh.opened_at), sh));
                        payload.shifts.forEach(sh => {
                            const sid = String(sh.id || sh.opened_at);
                            if (!mapS.has(sid)) {
                                mapS.set(sid, sh);
                                hasNew = true;
                            }
                        });
                        gw("all_shifts", Array.from(mapS.values()));
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
                    if (payload.custom_products && Array.isArray(payload.custom_products)) {
                        const localCustom = gr("custom_products", []);
                        const map = new Map();
                        localCustom.forEach(p => map.set(String(p.product_id), p));
                        payload.custom_products.forEach(p => map.set(String(p.product_id), p));
                        gw("custom_products", Array.from(map.values()));
                    }
                    if (payload.deleted_product_ids && Array.isArray(payload.deleted_product_ids)) {
                        const localDel = new Set(gr("deleted_product_ids", []));
                        payload.deleted_product_ids.forEach(id => localDel.add(String(id)));
                        gw("deleted_product_ids", Array.from(localDel));
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
        updatePosLiveMovement,
        loadAccounting,
        renderCart,
        processSale,
        checkInventoryBlock: checkBlock,
        getStock,
        logout
    };
})();