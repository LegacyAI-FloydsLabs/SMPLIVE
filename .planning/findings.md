# Findings

1. `.split .figure-overlay` retains a near-black surface in light mode while its content changes to light-mode dark text, producing inadequate contrast.
2. `.air-hero .figure-tag` retains the same near-black surface in light mode and no longer matches the light visual system.
3. `.tvds-switch` retains a near-black surface in light mode while its buttons inherit dark text, making the layout-preview control hard to read.
4. Image-gallery captions have a light-mode rule, but the hero tag and split overlay do not; these related overlay components need the same surface treatment.
