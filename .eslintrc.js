module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser:true,
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  plugins:["vue"],
  rules: {
    indent: [0, 4],
    "key-spacing": [0,
      { "beforeColon": false,
        "afterColon": true
      }],// 对象字面量中冒号的前后空格
    eqeqeq: 1, // 三等号
    quotes: [2, "double"], //建议使用双引号
    "no-unreachable": 1, // 不可能执行到的代码
    "no-undef": 1, // 变量未定义
    "no-unused-vars": 1, //变量定义后未使用
    "block-scoped-var": 1, //变量应在外部上下文中声明，不应在{}代码块中
    "no-return-await": 0, //允许直接返回await
    "no-shadow-restricted-names": 2 //关键词与命名冲突
  }
}
