"""Create a public copy of the supplied resume; leave the original untouched.

Optional local tool: python -m pip install pymupdf
Run: python scripts/prepare-resume.py ../In_Sovanreach_Resume.pdf
"""

import re
import sys
from pathlib import Path

import pymupdf


def main():
    source = Path(sys.argv[1]).resolve()
    destination = Path(__file__).resolve().parents[1] / "public" / "Sovanreach_In_Resume.pdf"
    if source == destination:
        raise ValueError("The source must be the private original, not the public output.")
    document = pymupdf.open(source)
    phone_removed = False
    metric_removed = False
    for page in document:
        contact_rect = None
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                for span in line["spans"]:
                    text = span["text"]
                    phone = re.search(r"\b0\d{3}\s*\d{3}\s*\d{3}\s*\|?\s*", text)
                    if phone:
                        contact_rect = pymupdf.Rect(span["bbox"])
                        page.add_redact_annot(contact_rect, fill=(1, 1, 1))
                        phone_removed = True
        # The quantitative company result stays private pending disclosure approval.
        metric_lines = []
        for line in page.get_text("dict")["blocks"]:
            for row in line.get("lines", []):
                value = "".join(span["text"] for span in row["spans"])
                if "Reduced SQL queries" in value or "repeated database checks" in value:
                    metric_lines.append(pymupdf.Rect(row["bbox"]))
        for rect in metric_lines:
            page.add_redact_annot(rect + (-2, -1, 2, 1), fill=(1, 1, 1))
            metric_removed = True
        page.apply_redactions()
        if contact_rect:
            page.insert_text((contact_rect.x0, contact_rect.y1 - 2), "Justreach555@gmail.com", fontsize=11, fontname="helv", color=(0.12, 0.12, 0.12))
        if metric_lines:
            rect = metric_lines[0]
            page.draw_circle((rect.x0 + 2.2, rect.y1 - 5.5), 1.7, color=(0.12, 0.12, 0.12), fill=(0.12, 0.12, 0.12))
            page.insert_text((rect.x0 + 10, rect.y1 - 2), "Improved database query efficiency by preloading records and removing", fontsize=11, fontname="helv", color=(0.12, 0.12, 0.12))
            page.insert_text((rect.x0 + 10, metric_lines[-1].y1 - 2), "repeated database lookups.", fontsize=11, fontname="helv", color=(0.12, 0.12, 0.12))
        # Remove original phone links, even if their visible text was redacted.
        for link in page.get_links():
            if link.get("uri", "").startswith("tel:"):
                page.delete_link(link)
    if not phone_removed or not metric_removed:
        raise ValueError("Expected private fields were not found. Review the source before publishing.")
    document.set_metadata({"title": "Sovanreach In — Resume", "author": "Sovanreach In", "subject": "Public portfolio resume"})
    destination.parent.mkdir(parents=True, exist_ok=True)
    document.save(destination, garbage=4, deflate=True, clean=True)
    document.close()
    with pymupdf.open(destination) as check:
        text = "\n".join(page.get_text() for page in check)
        assert not re.search(r"\b0\d{3}\s*\d{3}\s*\d{3}\b", text), "Phone remains in output"
        assert not re.search(r"\b(?:72|51)\b", text), "Private metric remains in output"
        assert "Justreach555@gmail.com" in text, "Expected email missing"
    print("Created public resume with phone and unapproved company metric removed; original unchanged.")


if __name__ == "__main__":
    main()
