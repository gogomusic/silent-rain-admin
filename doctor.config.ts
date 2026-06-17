import type { ReactDoctorConfig } from "react-doctor/api";

export default {
  ignore: {
    files: [
      "config/**",
      "public/**",
      "scripts/**",
      "types/**",
      "cloudflare-worker/**",
      "src/.umi*/**",
      "src/services/**",
      "src/service-worker.js",
      "**/*.md",
      "**/*.less",
      "**/*.css"
    ]
  },
  failOn: "error",
  adoptExistingLintConfig: true
} satisfies ReactDoctorConfig;
