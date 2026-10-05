import sharp from 'sharp';

await sharp('public/og-image.svg')
  .resize(1200, 630, {
    fit: 'fill',
  })
  .png()
  .toFile('public/og-image.png');

console.log('Created public/og-image.png (1200x630)');