/**
 * 获取MonacoEditor的语言类型
 * @param title
 */
export default function getLanguage(title: string = "") {
  const idx = title.lastIndexOf(".");
  const ext = title.substring(idx + 1);
  // TODO: 类型待完善
  switch (ext) {
    case "ts":
    case "tsx":
      return "typescript";

    case "js":
    case "jsx":
      return "javascript";

    case "java":
      return "java";

    case "html":
    case "htm":
      return "html";

    case "md":
      return "markdown";

    case "css":
      return "css";

    case "json":
      return "json";

    default:
      return "txt";
  }
}
