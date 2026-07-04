# 📸 Forma — Photo Guide

Drop your photos in the folders below. The site will auto-use them once you replace the `<ImagePlaceholder>` components with Next.js `<Image>` tags.

---

## /images/people/

| Filename | Where it appears | What to shoot |
|---|---|---|
| `parent-exercising.jpg` | Problems section (left column) | A parent doing a light workout — living room, morning light, casual clothes. Warm and relatable, NOT a gym selfie. |
| `arun-testimonial.jpg` | Success Stories — card 1 | Friendly Indian man, 40s, confident smile. Could be in office clothes or casual. |
| `priya-testimonial.jpg` | Success Stories — card 2 | Happy woman, late 30s, energetic. Could be with kids in background or home setting. |
| `james-testimonial.jpg` | Success Stories — card 3 | Man, mid 40s, healthy looking, slight smile. Could be outdoors or office. |

---

## /images/hero/

| Filename | Where it appears | What to shoot |
|---|---|---|
| `hero-main.jpg` | Hero section (optional background art) | A collage or single hero shot — parent and professional in active lifestyle. Bright, warm, inspiring. |

---

## /images/lifestyle/

| Filename | Where it appears | What to shoot |
|---|---|---|
| `workout-at-home.jpg` | How It Works section | Someone doing bodyweight exercise at home — push-ups, squats, yoga. Morning light, casual space. NOT a gym. |
| `healthy-meal.jpg` | Nutrition section (optional) | A real family meal — colorful, healthy but not precious. Think weeknight dinner. |
| `walking-outdoors.jpg` | Community section (optional) | Someone walking or jogging outdoors, smiling, comfortable pace. |

---

## /images/features/

| Filename | Where it appears | What to shoot |
|---|---|---|
| `ai-form-review.jpg` | Features section spotlight | Someone holding phone to record themselves exercising — or a split screen of phone + person. |
| `dashboard-mockup.png` | Features or marketing (optional) | A screenshot of the Forma dashboard at `/dashboard`. |

---

## Tips for best results

- **Aspect ratios**: People cards = portrait (3:4). Lifestyle = landscape (4:3 or 16:9). Hero = wide (16:9 or wider).
- **Style**: Real people > stock photos. Candid > posed. Natural light > studio.  
- **Tone**: Warm, hopeful, achievable. NOT extreme fitness. Think "I can actually do this."
- **Format**: JPG for photos, PNG for screenshots. Keep under 500KB each (use squoosh.app to compress).

---

Once you have a photo ready, swap the `<ImagePlaceholder>` in the component with:

```tsx
import Image from "next/image";

<Image
  src="/images/people/parent-exercising.jpg"
  alt="Parent exercising at home"
  fill
  className="object-cover"
/>
```
