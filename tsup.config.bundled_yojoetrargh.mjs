// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig([
  // Componentes React + utils
  {
    entry: {
      index: "src/index.ts",
      icons: "src/icons.ts",
      "tailwind-preset": "src/tokens/tailwind-preset.ts"
    },
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom", "tailwindcss", "lucide-react"],
    treeshake: true,
    banner: {
      js: '"use client";'
    }
  }
]);
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL3Nlc3Npb25zL2F3ZXNvbWUtcXVpcmt5LWNlcmYvbW50L3N1YWFyZW5hLWRzL3RzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9zZXNzaW9ucy9hd2Vzb21lLXF1aXJreS1jZXJmL21udC9zdWFhcmVuYS1kc1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vc2Vzc2lvbnMvYXdlc29tZS1xdWlya3ktY2VyZi9tbnQvc3VhYXJlbmEtZHMvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd0c3VwJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKFtcbiAgLy8gQ29tcG9uZW50ZXMgUmVhY3QgKyB1dGlsc1xuICB7XG4gICAgZW50cnk6IHtcbiAgICAgIGluZGV4OiAnc3JjL2luZGV4LnRzJyxcbiAgICAgIGljb25zOiAnc3JjL2ljb25zLnRzJyxcbiAgICAgICd0YWlsd2luZC1wcmVzZXQnOiAnc3JjL3Rva2Vucy90YWlsd2luZC1wcmVzZXQudHMnLFxuICAgIH0sXG4gICAgZm9ybWF0OiBbJ2NqcycsICdlc20nXSxcbiAgICBkdHM6IHRydWUsXG4gICAgc3BsaXR0aW5nOiBmYWxzZSxcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgY2xlYW46IHRydWUsXG4gICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3RhaWx3aW5kY3NzJywgJ2x1Y2lkZS1yZWFjdCddLFxuICAgIHRyZWVzaGFrZTogdHJ1ZSxcbiAgICBiYW5uZXI6IHtcbiAgICAgIGpzOiAnXCJ1c2UgY2xpZW50XCI7JyxcbiAgICB9LFxuICB9LFxuXSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsb0JBQW9CO0FBRWxULElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUEsRUFFMUI7QUFBQSxJQUNFLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLG1CQUFtQjtBQUFBLElBQ3JCO0FBQUEsSUFDQSxRQUFRLENBQUMsT0FBTyxLQUFLO0FBQUEsSUFDckIsS0FBSztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsVUFBVSxDQUFDLFNBQVMsYUFBYSxlQUFlLGNBQWM7QUFBQSxJQUM5RCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsTUFDTixJQUFJO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
