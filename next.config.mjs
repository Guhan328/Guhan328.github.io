const nextConfig = {
  images: {
    unoptimized: true
  },
  output: "export",        // 强制导出静态文件，适配 GitHub Pages
  trailingSlash: true      // 确保子页面路径正确
};

export default nextConfig;
