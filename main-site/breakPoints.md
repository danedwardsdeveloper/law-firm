# Next.js Image sizes props explanations

- These can be difficult to calculate, so here's my thinking.

## Hero image

- Small screens (< 768px):
  Image is full width minus px-4 (1rem)
  Maximum width caps at approximately 600px (37.5rem)
  min(calc(100vw - 1rem), 37.5rem)

- Medium screens and up (≥ 768px):
  Image is constrained by max-w-96
  Maximum width is 432px (27rem)
  Simply 27rem

```typescript
sizes = '(max-width: 767px) min(calc(100vw - 1rem), 37.5rem), 27rem';
```

## Home page cards

- Mobile (< 640px):
  Image is full width minus px-4 (1rem)
  calc(100vw - 1rem)

- Small screens (640px-767px):
  Image is full width minus px-6 (1.5rem)
  calc(100vw - 1.5rem)

- Medium screens and up (≥ 768px):
  Two-column grid with max-w-2xl (42rem) and gap-x-8 (2rem)
  Each image is approximately half the container width minus the gap
  Max image width is 486px (30.375rem)
  min(calc((min(100vw, 42rem) - 2rem) / 2), 30.375rem)

```typescript
sizes="(max-width: 639px) calc(100vw - 1rem),
       (min-width: 640px) and (max-width: 767px) calc(100vw - 1.5rem),
       (min-width: 768px) min(calc((min(100vw, 42rem) - 2rem) / 2), 30.375rem)"
```

## Article & Team member featured images on level 3 pages

- Mobile (< 640px):
  Image is full width minus px-4 (1rem)
  calc(100vw - 1rem)

- Small screens (640px-767px):
  Image is full width minus px-6 (1.5rem)
  calc(100vw - 1.5rem)

- Medium screens and up (≥ 768px):
  Two-column grid with max-w-2xl (42rem) and gap-x-8 (2rem)
  Each image is approximately half the container width minus the gap
  Max image width is 486px (30.375rem)
  min(calc((min(100vw, 42rem) - 2rem) / 2), 30.375rem)

```tsx
sizes="(max-width: 639px) min(calc(100vw - 1rem), 36rem),
       min(calc(100vw - 1.5rem), 36rem)"
```
