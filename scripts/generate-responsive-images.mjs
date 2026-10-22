import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const directory = fileURLToPath(new URL('../public/images/', import.meta.url));
const output = path.join(directory, 'responsive');
await mkdir(output, { recursive: true });
for (const file of (await readdir(directory)).filter(file => file.endsWith('.webp'))) {
  const source = path.join(directory, file);
  const { width } = await sharp(source).metadata();
  for (const size of [480, 960, 1440].filter(size => size < width)) {
    await sharp(source).resize({ width: size, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(path.join(output, file.replace('.webp', `-${size}.webp`)));
  }
}
