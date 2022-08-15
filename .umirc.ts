import { defineConfig } from 'dumi';

const repo = 'yc-fish';

export default defineConfig({
  title: repo,
  favicon:
    'https://scrm-pic.oss-cn-hangzhou.aliyuncs.com/static_img/images/logo.png',
  logo:
    'https://scrm-pic.oss-cn-hangzhou.aliyuncs.com/static_img/images/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/yc-fish',
    },
  ],
  // more config: https://d.umijs.org/config
});
