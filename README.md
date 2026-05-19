# URA Sociale Website

Modern static website concept for **URA Sociale / Social Bridge**, an organization for development and communication based in Vushtrri.

## What We Built So Far

This project is currently a static HTML/CSS/JavaScript website. It does not require installation, a build tool, or a backend.

Created pages:

- `index.html` - homepage / overview
- `misioni.html` - dedicated mission page
- `aktivitetet.html` - dedicated activities archive page
- `index-en.html` - English homepage / overview
- `misioni-en.html` - English mission page
- `aktivitetet-en.html` - English activities archive page

Created support files:

- `styles.css` - shared responsive styling for all pages
- `script.js` - mobile menu, icon initialization, and activity filters
- `research-notes.md` - notes about public sources and content still needed
- `assets/` - folder structure for logos, photos, and icons

## Where To Add Images And Documents

Use this structure:

```text
assets/
  images/
    logo.png
    hero.jpg
    activities/
      activity-1.jpg
      activity-2.jpg
  icons/
```

The website header already looks for the logo here:

```text
assets/images/logo.png
```

If `logo.png` does not exist yet, the site shows the fallback `US` circle. When you add the real logo file with that exact name, it will appear automatically.

Recommended naming:

- `assets/images/logo.png` - official logo
- `assets/images/hero.jpg` - homepage hero image, if replacing the current online placeholder
- `assets/images/activities/activity-name.jpg` - real activity photos

## Current Website Structure

The navigation currently contains:

- Ballina
- Misioni
- Aktivitetet
- Kontakt
- Language switcher: `AL` and `EN`

The Albanian pages link to their matching English pages, and the English pages link back to their matching Albanian pages.

The homepage includes:

- Large modern hero section
- Verified impact stats
- Mission presentation section
- Contact block with direct message form

The mission and activities content now lives on separate pages instead of all being shown on `Ballina`.

## Verified Public Information Used

Direct unauthenticated access to the Facebook page was blocked, so the current content uses public indexed sources.

Verified items include:

- Organization name: `Organization for Development and Communication "URA SOCIALE" (Social Bridge)`
- Location: `Deshmoret e Kombit str., no. 13, Vushtrri`
- Public representative: `Mergime Jashari`
- Work areas: quality education, gender equality, prevention of sexual harassment, disability inclusion, local advocacy
- Activities with around `300 students` in two vocational secondary schools in Vushtrri
- `125 students aged 15-18` reached through lectures on sexual harassment prevention and reporting
- Cooperation with schools, municipal education officials, and local institutions

More details and source links are in `research-notes.md`.

## How To Open The Website

From Git Bash on Windows:

```bash
cd "/c/Users/Shkelqim Jashari/OneDrive/Documents/GitHub/urasociale"
"/c/Program Files/Google/Chrome/Application/chrome.exe" "$(pwd -W)/index.html"
```

If Chrome is installed in the x86 folder:

```bash
"/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" "$(pwd -W)/index.html"
```

You can also open `index.html` directly by double-clicking it in the folder.

## What Still Needs To Be Added

Real organization assets:

- Official logo
- Official brand colors
- Real photos from activities
- Phone number
- Full official mission statement, if different from the proposed copy
- Founding year
- Team / board information

Content improvements:

- Add real Facebook activity photos
- Add full project archive if available
- Decide if the site should be Albanian only or multilingual

## Technical Notes

- This is a static website.
- No npm install is needed.
- Images currently use remote Unsplash placeholders.
- Icons load from Lucide via CDN.
- Activity filtering works through `script.js`.
- All pages share the same `styles.css` file.
- Contact form submissions are sent to `office@urasociale.com` through FormSubmit.
