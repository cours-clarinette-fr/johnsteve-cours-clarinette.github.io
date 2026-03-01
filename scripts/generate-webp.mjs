import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGE_EXT = /\.(avif|jpg|jpeg|png)$/i;
const IMAGES_DIR = join(__dirname, '..', 'public', 'images');

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && IMAGE_EXT.test(entry.name)) {
      yield full;
    }
  }
}

async function main() {
  const sharp = (await import('sharp')).default;
  let generated = 0;
  let skipped = 0;

  for await (const filePath of walk(IMAGES_DIR)) {
    const ext = extname(filePath).toLowerCase();
    const basePath = filePath.slice(0, -ext.length);
    const webpPath = `${basePath}.webp`;

    try {
      const [srcStat, webpStat] = await Promise.all([
        stat(filePath),
        stat(webpPath).catch(() => null),
      ]);
      if (webpStat && webpStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++;
        continue;
      }
    } catch {
      // webp doesn't exist, continue to generate
    }

    try {
      await sharp(filePath)
        .webp({ quality: 82 })
        .toFile(webpPath);
      console.log(`Generated: ${webpPath.replace(IMAGES_DIR, 'images')}`);
      generated++;
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
    }
  }

  console.log(`Done. Generated: ${generated}, skipped (up to date): ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
