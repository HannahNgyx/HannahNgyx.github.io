// PreToolUse hook for the art-director and tester. They have no Edit/Write
// tools; this stops them from changing site code or git state through Bash.
// They may still run gh, read files, run `npm run qa:shots`, and move files
// under design/ and qa/.
//
// Exit 2 blocks the call and shows stderr to the agent.

let input = "";
process.stdin.on("data", (chunk) => { input += chunk; });
process.stdin.on("end", () => {
  let command = "";
  try {
    command = JSON.parse(input).tool_input?.command ?? "";
  } catch {
    process.exit(0);
  }

  const gitWrite = /\bgit\s+(add|commit|push|reset|checkout|switch|restore|stash|merge|rebase|rm|mv|cherry-pick|revert|tag|branch\s+-[dDmM])\b/;
  const ghWrite = /\bgh\s+(pr\s+(create|merge|close|edit|ready)|issue\s+(close|delete|transfer)|repo\s|release\s|api\s+.*-X\s*(POST|PATCH|PUT|DELETE))/i;
  const writes = /(>>?|\btee\b|\bsed\s+-i|\bperl\s+-i|\brm\b|\bmv\b|\bcp\b|\btouch\b|\bmkdir\b|\bnpm\s+(i|install|uninstall|update)\b|Set-Content|Out-File|Remove-Item|Move-Item|Copy-Item|New-Item|writeFile)/;
  const protectedPath = /(^|[\s"'=/\\])(src[/\\]|style\.css|index\.html|SPEC\.md|CLAUDE\.md|package(-lock)?\.json|vite\.config|scripts[/\\]|images[/\\]|\.claude[/\\]|\.github[/\\]|\.gitignore|Hannah_Nguyen_resume)/;

  let reason = "";
  if (gitWrite.test(command)) reason = "git commands that change branches, the index or commits are not allowed for this agent.";
  else if (ghWrite.test(command)) reason = "this gh command is not allowed for this agent (no PRs, merges, closing issues or repo changes).";
  else if (writes.test(command) && protectedPath.test(command)) reason = "this agent may not write to site code or project files; only design/ and qa/ are writable.";

  if (reason) {
    process.stderr.write(`Blocked by readonly-guard: ${reason}\nCommand: ${command}\n`);
    process.exit(2);
  }
  process.exit(0);
});
