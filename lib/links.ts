/** What a link out says on the board: where it goes — `thock.nawmain.dev`, `github.com/Lwant-02/Tai-Expense`. */
export function linkLabel(href: string): string {
  const url = new URL(href);
  const path = url.pathname.replace(/\.git$/, "").replace(/\/+$/, "");
  return url.host.replace(/^www\./, "") + path;
}
