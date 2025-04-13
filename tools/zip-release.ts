import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const releaseDir = path.join(__dirname, '..', 'release');
const launcherMac = path.join(__dirname, '..', 'launchers', 'mac');
const launcherWin = path.join(__dirname, '..', 'launchers', 'win');

function zipPlatform(name: string, execFile: string, launcherDir: string) {
  const zipPath = path.join(releaseDir, `${name}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`✅ Created: ${zipPath} (${archive.pointer()} bytes)`);
  });

  archive.pipe(output);
  archive.file(path.join(releaseDir, execFile), { name: execFile });

  fs.readdirSync(launcherDir).forEach(file => {
    archive.file(path.join(launcherDir, file), { name: `launchers/${file}` });
  });

  archive.finalize();
}

zipPlatform('cli-macos', 'cli-macos', launcherMac);
zipPlatform('cli-win', 'cli-win.exe', launcherWin);
