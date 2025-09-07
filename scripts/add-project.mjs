#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(res=> rl.question(q, a => res(a.trim())));

const file = path.join(process.cwd)
