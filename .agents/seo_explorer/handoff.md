# Handoff Report: SEO Validation Veto Fix

## 1. Observation
- Inspected `d:\Coding Projects\AquacyWebsite\Aquacy_New_Website\next.config.ts`. Lines 2 to 12 contain logic that mutates the file system during config evaluation (`fs.unlinkSync` for `robots.txt` and `sitemap.xml`).
- Inspected `d:\Coding Projects\AquacyWebsite\Aquacy_New_Website\package.json`. It already contains a valid cross-platform Node.js hook in the `"scripts"` block:
  `"prebuild": "node -e \"const fs=require('fs'); ['public/sitemap.xml', 'public/robots.txt'].forEach(f => { if(fs.existsSync(f)) fs.unlinkSync(f) })\""`

## 2. Logic Chain
1. The Reviewer flagged that having file deletion logic within `next.config.ts` breaks CI/CD environments as it makes the configuration file impure.
2. The user requested moving this file deletion functionality to a `prebuild` script in `package.json`.
3. Observation shows that `package.json` *already* has the correct `prebuild` hook configured (likely from a previous attempt), but `next.config.ts` was not properly cleaned up.
4. Removing the cleanup hack from `next.config.ts` will satisfy the Reviewer's veto since the `prebuild` script is safely handling the side-effect via NPM's lifecycle hooks rather than during Next.js config initialization.

## 3. Caveats
- No caveats. The `prebuild` hook utilizes node inline scripting which ensures cross-platform compatibility without requiring `rm` or `git rm` shell commands, satisfying the AFK-user constraints.

## 4. Conclusion
The fix requires solely removing the anti-pattern from `next.config.ts`.
The target implementer should remove the `fs` and `path` imports, and the entire `try/catch` block containing `fs.unlinkSync`.

**Proposed changes for `next.config.ts`:**
Remove lines 2 through 12. The file should look exactly like this:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.admmeters.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

## 5. Verification Method
After modifying `next.config.ts`, verify the build process by checking if `npm run build` evaluates correctly. The `prebuild` script should automatically trigger and quietly clean the files before `next build` starts. 
