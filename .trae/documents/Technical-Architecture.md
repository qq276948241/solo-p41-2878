## 1. 架构设计
```mermaid
flowchart TD
  A["Vue 3 SPA"] --> B["Vue Router 路由层"]
  B --> C1["首页 HomeView"]
  B --> C2["预约页 BookingView"]
  B --> C3["作品集 PortfolioView"]
  C1 --> D1["导航栏组件 NavBar"]
  C2 --> D1
  C3 --> D1
  C2 --> D2["日历组件 Calendar"]
  C2 --> D3["时段选择 TimeSlots"]
  C2 --> D4["预约表单 BookingForm"]
  C3 --> D5["作品网格 PortfolioGrid"]
  C3 --> D6["灯箱组件 Lightbox"]
  A --> E["Mock 数据层"]
```

## 2. 技术说明
- 前端：Vue 3 + Vite + Vue Router 4
- 构建工具：Vite 5
- 样式：原生 CSS3（CSS 变量 + Flex/Grid + @media）
- 状态管理：Vue 3 组合式 API（ref/reactive），无需 Pinia
- 数据：本地 Mock JSON 数据，无后端
- 图标：内联 SVG

## 3. 路由定义
| 路由 | 用途 |
|------|------|
| / | 首页：工作室简介 + 精选瀑布流 |
| /booking | 预约页：日历 + 时段 + 表单 |
| /portfolio | 作品集页：分类Tab + 灯箱 |

## 4. 目录结构
```
project41/
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── data/
│   │   └── mock.js
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── BookingView.vue
│   │   └── PortfolioView.vue
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── Calendar.vue
│   │   ├── TimeSlots.vue
│   │   ├── BookingForm.vue
│   │   ├── PortfolioGrid.vue
│   │   └── Lightbox.vue
│   └── styles/
│       └── global.css
├── index.html
├── package.json
└── vite.config.js
```
