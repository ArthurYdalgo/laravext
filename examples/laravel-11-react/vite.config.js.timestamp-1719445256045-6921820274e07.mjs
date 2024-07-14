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
        ssr: "resources/js/ssr.jsx"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxsYXJhdmV4dFxcXFxleGFtcGxlc1xcXFxsYXJhdmVsLTExLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFxsYXJhdmV4dFxcXFxleGFtcGxlc1xcXFxsYXJhdmVsLTExLXJlYWN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9sYXJhZ29uL3d3dy9sYXJhdmV4dC9leGFtcGxlcy9sYXJhdmVsLTExLXJlYWN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgbGFyYXZlbCwgeyByZWZyZXNoUGF0aHMgfSBmcm9tIFwibGFyYXZlbC12aXRlLXBsdWdpblwiO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IG1vZGUgfSkge1xuICAgIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG5cbiAgICBjb25zdCBob3N0ID0gZW52LlZJVEVfQVBQX0VOViA9PSBcImxvY2FsXCIgPyBlbnYuVklURV9BUFBfRE9NQUlOIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgICAgIHNlcnZlcjogeyBob3N0IH0sXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIGxhcmF2ZWwoe1xuICAgICAgICAgICAgICAgIGlucHV0OiBbXG4gICAgICAgICAgICAgICAgICAgICdyZXNvdXJjZXMvY3NzL2FwcC5jc3MnLFxuICAgICAgICAgICAgICAgICAgICAncmVzb3VyY2VzL2pzL2FwcC5qc3gnLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVmcmVzaDogWy4uLnJlZnJlc2hQYXRocywgXCJyZXNvdXJjZXMvanMvKipcIiwgXCJhcHAvKipcIl0sXG4gICAgICAgICAgICAgICAgc3NyOiAncmVzb3VyY2VzL2pzL3Nzci5qc3gnLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICByZWFjdCgpXG4gICAgICAgIF0sXG4gICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZHVsZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbG9kYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N3ZWV0YWxlcnQyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2F4aW9zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICducHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmVhY3QtaTE4bmV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd6dXN0YW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rID0gbW9kdWxlcy5maW5kKG1vZHVsZSA9PiBpZC5pbmNsdWRlcyhtb2R1bGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2h1bmsgPyBgdmVuZG9yLSR7Y2h1bmt9YCA6ICd2ZW5kb3Itb3RoZXJzJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVixTQUFTLGNBQWMsZUFBZTtBQUN2WCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxXQUFXLG9CQUFvQjtBQUd2QixTQUFSLG9CQUFrQixFQUFFLEtBQUssR0FBRztBQUMvQixRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBRXZDLFFBQU0sT0FBTyxJQUFJLGdCQUFnQixVQUFVLElBQUksa0JBQWtCO0FBRWpFLFNBQU8sYUFBYTtBQUFBLElBQ2hCLFFBQVEsRUFBRSxLQUFLO0FBQUEsSUFDZixTQUFTO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDSixPQUFPO0FBQUEsVUFDSDtBQUFBLFVBQ0E7QUFBQSxRQUNKO0FBQUEsUUFDQSxTQUFTLENBQUMsR0FBRyxjQUFjLG1CQUFtQixRQUFRO0FBQUEsUUFDdEQsS0FBSztBQUFBLE1BQ1QsQ0FBQztBQUFBLE1BQ0QsTUFBTTtBQUFBLElBQ1Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNILGVBQWU7QUFBQSxRQUNYLFFBQVE7QUFBQSxVQUNKLGFBQWEsSUFBSTtBQUNiLGdCQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDN0Isb0JBQU0sVUFBVTtBQUFBLGdCQUNaO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGNBQ0o7QUFDQSxvQkFBTSxRQUFRLFFBQVEsS0FBSyxZQUFVLEdBQUcsU0FBUyxNQUFNLENBQUM7QUFDeEQscUJBQU8sUUFBUSxVQUFVLEtBQUssS0FBSztBQUFBLFlBQ3ZDO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0osQ0FBQztBQUNMOyIsCiAgIm5hbWVzIjogW10KfQo=
