# URA Sociale Website

Modern static website concept for **URA Sociale / Social Bridge**, an organization for development and communication based in Vushtrri.

## What We Built So Far

This project is currently a static HTML/CSS/JavaScript website. It does not require installation, a build tool, or a backend.

Created pages:

- `index.html` - homepage / overview
- `misioni.html` - dedicated mission page
- `programet.html` - dedicated programs page
- `aktivitetet.html` - dedicated activities archive page
- `certifikatat.html` - dedicated certificates archive page

Created support files:

- `styles.css` - shared responsive styling for all pages
- `script.js` - mobile menu, icon initialization, and activity filters
- `research-notes.md` - notes about public sources and content still needed

## Current Website Structure

The navigation currently contains:

- Ballina
- Misioni
- Programet
- Aktivitetet
- Certifikatat
- Ndikimi
- Kontakt

The homepage includes:

- Large modern hero section
- Verified impact stats
- Mission preview
- Programs preview
- Featured education initiative
- Activities preview with filters
- Impact timeline
- Formats for schools and institutions
- Partner section
- Certificates teaser
- Public source links
- Contact section

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
- Certificate scans or PDFs
- Phone number
- Email address
- Full official mission statement, if different from the proposed copy
- Founding year
- Team / board information

Content improvements:

- Replace placeholder certificate rows with real files
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
