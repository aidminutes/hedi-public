const barePageIds = ["msg.conversation"];

export function hasShell(contentId: string) {
  return !barePageIds.includes(contentId);
}
