# Final stable homepage repair

The fix is intentionally embedded inside `index.html`.

Why:
- The screenshot showed that new HTML was deployed while the final stylesheet
  rules were either cached or not uploaded.
- Floating `.open-card` action labels have now been removed from the HTML.
- The equal-card grid and footer use critical CSS inside `index.html`, so an
  older cached `styles.css` cannot reproduce the tall dark overlays.

## Replace
Replace both:
- `index.html`
- `styles.css`

Then refresh with Ctrl + Shift + R.
