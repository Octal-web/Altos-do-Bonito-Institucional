// CMS titles may contain formatting; accessible names must be plain text.
export const accessibleText = (value) => String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(nbsp|amp|quot|apos|lt|gt);/g, (_, entity) => ({
        nbsp: " ", amp: "&", quot: '"', apos: "'", lt: "<", gt: ">",
    })[entity])
    .replace(/\s+/g, " ")
    .trim();
