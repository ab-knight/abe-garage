import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { query } from '../config/db.config.js'

export async function run() {
  try {
    const sqlDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'sql')
    const files = (await readdir(sqlDir)).filter((file) => file.endsWith('.sql')).sort()

    for (const file of files) {
      const sql = await readFile(path.join(sqlDir, file), 'utf8')
      await query(sql)
    }

    return { success: true, message: `${files.length} table(s) created successfully` }
  } catch (error) {
    return { success: false, message: error.message }
  }
}