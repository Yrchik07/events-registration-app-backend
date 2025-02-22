import fs from 'node:fs/promises';
import path from 'node:path';
import { ENV_VARS, UPLOAD_DIR } from '../constants/index.js';
import { env } from '../utils/env.js';

export const saveFileToLocalMachine = async (file) => {
  const content = await fs.readFile(file.path);
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.writeFile(newPath, content);
  await fs.unlink(file.path);
  return env(ENV_VARS.BACKEND_HOST) + `/upload/${file.filename}`;
};
