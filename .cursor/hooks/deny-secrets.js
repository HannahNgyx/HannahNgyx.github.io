// Blocks agent access to local secret files. Never prints file contents.
const SECRET_MESSAGE =
  "Blocked. .env.local holds the General Translation key and is off limits.";

function isSecretPath(filePath) {
  if (!filePath || typeof filePath !== "string") return false;
  const name = filePath.replace(/\\/g, "/").split("/").pop()?.toLowerCase() ?? "";
  if (name === ".env.example") return false;
  return name === ".env" || name.startsWith(".env.");
}

function commandTouchesSecret(command) {
  if (!command || typeof command !== "string") return false;
  return /(?:^|[\s"'`=:;(])\.env(?!\.example)\b/i.test(command.replace(/\\/g, "/"));
}

function toolTouchesSecret(toolInput) {
  const input = typeof toolInput === "string" ? parseJson(toolInput) : toolInput;
  if (!input || typeof input !== "object") return false;
  const paths = [input.path, input.file_path, input.target_file, input.file];
  if (paths.some(isSecretPath)) return true;
  return commandTouchesSecret(input.command);
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function write(body) {
  process.stdout.write(JSON.stringify(body));
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  raw += chunk;
});
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw || "{}");
  } catch {
    process.exit(2);
  }

  const event = input.hook_event_name;
  const secretFile = isSecretPath(input.file_path);
  const secretAttachment = Array.isArray(input.attachments)
    && input.attachments.some((item) => isSecretPath(item?.file_path));
  const secretCommand = commandTouchesSecret(input.command);
  const secretTool = toolTouchesSecret(input.tool_input);
  const blocked = secretFile || secretAttachment || secretCommand || secretTool;

  if (event === "beforeTabFileRead") {
    write({ permission: blocked ? "deny" : "allow" });
    return;
  }

  if (event === "beforeReadFile") {
    write(blocked
      ? { permission: "deny", user_message: SECRET_MESSAGE }
      : { permission: "allow" });
    return;
  }

  write(blocked
    ? {
        permission: "deny",
        user_message: SECRET_MESSAGE,
        agent_message: "Do not read or print .env.local. Ask the user to run the command themselves.",
      }
    : { permission: "allow" });
});
