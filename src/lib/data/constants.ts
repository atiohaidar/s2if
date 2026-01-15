/**
 * Centralized Constants
 * =====================
 * All shared constants used across the application.
 */

/**
 * Status labels for subjects and topics
 */
export const STATUS_LABELS: Record<string, string> = {
    done: "Selesai",
    wip: "Proses",
    todo: "Belum",
};

/**
 * Topic type icons
 */
export const TOPIC_TYPE_ICONS: Record<string, string> = {
    catatan: "📝",
    visual: "📊",
    praktek: "💻",
};

/**
 * Topic type labels
 */
export const TOPIC_TYPE_LABELS: Record<string, string> = {
    catatan: "Catatan",
    visual: "Visualisasi",
    praktek: "Praktek",
};

/**
 * Callout type icons
 */
export const CALLOUT_ICONS: Record<string, string> = {
    tip: "💡",
    warning: "⚠️",
    info: "ℹ️",
    danger: "🚨",
};

/**
 * Callout default titles
 */
export const CALLOUT_TITLES: Record<string, string> = {
    tip: "Tips",
    warning: "Peringatan",
    info: "Info",
    danger: "Penting",
};

/**
 * Sticker type icons
 */
export const STICKER_ICONS: Record<string, string> = {
    done: "✓",
    wip: "⏳",
    todo: "○",
    important: "⚡",
};
