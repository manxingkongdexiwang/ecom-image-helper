import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('正在启动开发服务器...');
console.log('项目路径:', __dirname);

const vitePath = path.join(__dirname, 'node_modules', '.bin', 'vite');

const child = exec(`"${vitePath}"`, {
  cwd: __dirname,
  shell: true
});

child.stdout.on('data', (data) => {
  console.log(data.toString());
});

child.stderr.on('data', (data) => {
  console.error(data.toString());
});

child.on('close', (code) => {
  console.log(`子进程退出码: ${code}`);
});
