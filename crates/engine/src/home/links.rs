//! The AllCraft Studio and project links (Help menu, About dialog, start screen, header).

pub const APP_NAME: &str = "The AllCraft Effect";
pub const APP_SLUG: &str = "effectcraft";
pub const DISCORD: &str = "https://github.com/thepixopik/effectcraft/discussions";
pub const WEBSITE: &str = "https://the-allcraft.pages.dev";
pub const APP_PAGE: &str = "https://the-allcraft.pages.dev/effect/";
pub const GITHUB: &str = "https://github.com/thepixopik/effectcraft";
pub const ISSUES: &str = "https://github.com/thepixopik/effectcraft/issues";

/// Sibling apps in The AllCraft Studio: (display name, repo slug).
pub const SIBLINGS: &[(&str, &str)] = &[
    ("The AllCraft Photo", "photocraft"),
    ("The AllCraft Vector", "vectorcraft"),
    ("The AllCraft Film", "filmcraft"),
    ("The AllCraft Light", "lightcraft"),
    ("The AllCraft PDF", "pdfcraft"),
    ("The AllCraft Design", "designcraft"),
];

pub fn github_of(slug: &str) -> String {
    format!("https://github.com/thepixopik/{slug}")
}

pub fn page_of(slug: &str) -> String {
    let mount = slug.strip_suffix("craft").unwrap_or(slug);
    format!("{WEBSITE}/{mount}/")
}
