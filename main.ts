// One Line, One Chill — a single-sentence horror line, written to /output/entry.txt.
//
// The line is assembled from three deliberate parts so the scare is earned
// rather than announced: an ordinary domestic object, a voice that should
// not be there, and a final clause that reframes who is in the house.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

const SETTING = "My daughter's baby monitor crackled";
const VOICE = "in my own voice it whispered";
const BLOW = "'Don't come upstairs, I'm already holding her.'";

const LINE = `${SETTING}, and ${VOICE}, ${BLOW}`;

// Self-gate, mirroring the sealed scorer: the file must be UTF-8 text of
// 1 to 200 characters, not only white space, and a single line — one
// sentence, one breath. Fail loudly instead of shipping an invalid entry.
function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) throw new Error(`entry is ${chars} characters, gate needs 1-200`);
  if (!line.trim()) throw new Error("entry is only white space");
  if (line.includes("\n")) throw new Error("entry must be a single line");
}

function main(): void {
  gate(LINE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
  console.log(`wrote ${LINE.length} characters to entry.txt`);
}

main();
