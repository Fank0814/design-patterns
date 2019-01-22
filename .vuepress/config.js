const ROOT = ".";

const sidebar = require("./vendor/sidebarConfig")(ROOT);
const mathjax = require("./vendor/mathjax");
const ga = require("./vendor/ga");
const routeListen = require("./vendor/routeListen");
const leancloud = require("./vendor/leancloud");

module.exports = {
  head: [
    ["script", {}, ga],
    [
      "script",
      {
        type: "text/javascript",
        src:
          "https://cdn.jsdelivr.net/npm/leancloud-storage@3.11.1/dist/av-min.js"
      }
    ],
    [
      "script",
      {
        type: "text/javascript",
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
      }
    ],
    ["script", {}, leancloud],
    ["script", {}, mathjax],
    ["script", {}, routeListen]
  ],
  base: "/design-patterns/",
  title: "设计模式手册",
  description: "设计模式, Web, 算法, JavaScript, Python",
  markdown: {
    toc: { includeLevel: [1, 2, 3] }
  },
  themeConfig: {
    activeHeaderLinks: false,
    repo: "dongyuanxin/design-patterns",
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
    sidebar,
    nav: [
      { text: "🏠介绍", link: "/" },
      {
        text: '📚干货',
        items: [
          { text: '设计模式 | 食用手册', link: '/' },
          { text: 'Webpack4 | 系列教程', link: 'https://godbmw.com/categories/webpack4%E7%B3%BB%E5%88%97%E6%95%99%E7%A8%8B/' },
          { text: 'LeetCode | 解题报告', link: 'https://godbmw.com/leetcode/' }
        ]
      },
      { text: "👱抓我", link: "https://godbmw.com/" }
    ]
  }
};
