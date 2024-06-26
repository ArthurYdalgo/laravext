// vite.config.js
import { defineConfig, loadEnv } from "file:///D:/laragon/www/laravext/examples/laravel-11-react/node_modules/vite/dist/node/index.js";
import react from "file:///D:/laragon/www/laravext/examples/laravel-11-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import laravel, { refreshPaths } from "file:///D:/laragon/www/laravext/examples/laravel-11-react/node_modules/laravel-vite-plugin/dist/index.js";
function vite_config_default({ mode }) {
  const env = loadEnv(mode, process.cwd());
  const host = env.VITE_APP_ENV == "local" ? env.VITE_APP_DOMAIN : void 0;
  return defineConfig({
    server: { host },
    plugins: [
      laravel({
        input: [
          "resources/css/app.css",
          "resources/js/app.jsx"
        ],
        refresh: [...refreshPaths, "resources/js/**", "app/**"],
        ssr: "resources/js/ssr.js"
      }),
      react()
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const modules = [
                "moment",
                "lodash",
                "sweetalert2",
                "axios",
                "@fortawesome/free-solid-svg-icons",
                "nprogress",
                "react-i18next",
                "zustand",
                "@fortawesome/free-solid-svg-icons"
              ];
              const chunk = modules.find((module) => id.includes(module));
              return chunk ? `vendor-${chunk}` : "vendor-others";
            }
          }
        }
      }
    }
  });
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxsYXJhdmV4dFxcXFxleGFtcGxlc1xcXFxsYXJhdmVsLTExLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxsYXJhdmV4dFxcXFxleGFtcGxlc1xcXFxsYXJhdmVsLTExLXJlYWN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9sYXJhZ29uL3d3dy9sYXJhdmV4dC9leGFtcGxlcy9sYXJhdmVsLTExLXJlYWN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgbGFyYXZlbCwgeyByZWZyZXNoUGF0aHMgfSBmcm9tIFwibGFyYXZlbC12aXRlLXBsdWdpblwiO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IG1vZGUgfSkge1xuICAgIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG5cbiAgICBjb25zdCBob3N0ID0gZW52LlZJVEVfQVBQX0VOViA9PSBcImxvY2FsXCIgPyBlbnYuVklURV9BUFBfRE9NQUlOIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgICAgIHNlcnZlcjogeyBob3N0IH0sXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIGxhcmF2ZWwoe1xuICAgICAgICAgICAgICAgIGlucHV0OiBbXG4gICAgICAgICAgICAgICAgICAgICdyZXNvdXJjZXMvY3NzL2FwcC5jc3MnLFxuICAgICAgICAgICAgICAgICAgICAncmVzb3VyY2VzL2pzL2FwcC5qc3gnLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVmcmVzaDogWy4uLnJlZnJlc2hQYXRocywgXCJyZXNvdXJjZXMvanMvKipcIiwgXCJhcHAvKipcIl0sXG4gICAgICAgICAgICAgICAgc3NyOiAncmVzb3VyY2VzL2pzL3Nzci5qcycsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHJlYWN0KClcbiAgICAgICAgXSxcbiAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kdWxlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsb2Rhc2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3dlZXRhbGVydDInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYXhpb3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25wcm9ncmVzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZWFjdC1pMThuZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3p1c3RhbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2h1bmsgPSBtb2R1bGVzLmZpbmQobW9kdWxlID0+IGlkLmluY2x1ZGVzKG1vZHVsZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaHVuayA/IGB2ZW5kb3ItJHtjaHVua31gIDogJ3ZlbmRvci1vdGhlcnMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsY0FBYyxlQUFlO0FBQ3ZYLE9BQU8sV0FBVztBQUNsQixPQUFPLFdBQVcsb0JBQW9CO0FBR3ZCLFNBQVIsb0JBQWtCLEVBQUUsS0FBSyxHQUFHO0FBQy9CLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFFdkMsUUFBTSxPQUFPLElBQUksZ0JBQWdCLFVBQVUsSUFBSSxrQkFBa0I7QUFFakUsU0FBTyxhQUFhO0FBQUEsSUFDaEIsUUFBUSxFQUFFLEtBQUs7QUFBQSxJQUNmLFNBQVM7QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNKLE9BQU87QUFBQSxVQUNIO0FBQUEsVUFDQTtBQUFBLFFBQ0o7QUFBQSxRQUNBLFNBQVMsQ0FBQyxHQUFHLGNBQWMsbUJBQW1CLFFBQVE7QUFBQSxRQUN0RCxLQUFLO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxNQUFNO0FBQUEsSUFDVjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0gsZUFBZTtBQUFBLFFBQ1gsUUFBUTtBQUFBLFVBQ0osYUFBYSxJQUFJO0FBQ2IsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUM3QixvQkFBTSxVQUFVO0FBQUEsZ0JBQ1o7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsY0FDSjtBQUNBLG9CQUFNLFFBQVEsUUFBUSxLQUFLLFlBQVUsR0FBRyxTQUFTLE1BQU0sQ0FBQztBQUN4RCxxQkFBTyxRQUFRLFVBQVUsS0FBSyxLQUFLO0FBQUEsWUFDdkM7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSixDQUFDO0FBQ0w7IiwKICAibmFtZXMiOiBbXQp9Cg==
