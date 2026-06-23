# 光和盐摄影工作室 · Vue 组件关系说明

> 本项目基于 **Vue 3 + TypeScript + Composition API**（`<script setup>` 语法）。组件分为 **根组件（App.vue）**、**视图组件（views/）**、**业务组件（components/）** 三层。所有业务组件均为受控组件（通过 props 接收数据 + emit 回传变更），无内部依赖 vuex/pinia。

---

## 一、组件嵌套层级图（从 App.vue 开始）

```
App.vue
├── NavBar.vue                          （固定吸顶导航栏 + 汉堡菜单）
└── <router-view/>                      （Vue Router 出口，渲染以下三个视图之一）
    │
    ├── HomeView.vue                    （首页：负责组合布局）
    │   ├── GalleryWaterfall.vue        （精选作品瀑布流）
    │   └── PricingSection.vue          （数据统计卡 + 套餐卡片）
    │
    ├── PortfolioView.vue               （作品集页）
    │   └── Lightbox.vue                （灯箱：Teleport 到 body，全屏放大）
    │
    └── BookingView.vue                 （预约页）
        ├── Calendar.vue                （日历选日期，v-model）
        ├── TimeSlots.vue               （时段卡片，v-model）
        ├── BookingForm.vue             （姓名 + 手机号表单，emit submit）
        └── <Toast: teleported to body> （预约成功提示，BookingView 内部实现）
```

---

## 二、路由到视图的对应关系

| 路由路径 | 渲染视图 | 职责 |
|---------|---------|------|
| `/` | `HomeView.vue` | 展示品牌介绍、精选作品瀑布流、套餐与数据统计 |
| `/portfolio` | `PortfolioView.vue` | 三分类作品切换浏览 + 灯箱放大 |
| `/booking` | `BookingView.vue` | 日期 → 时段 → 联系方式三步预约流程 |

---

## 三、每个组件详细说明

---

### 1. App.vue
- **文件**：`src/App.vue`
- **职责**：全局布局外壳。负责渲染导航栏、路由出口（`<router-view />`）、全局页脚。
- **Props**：无
- **Emits**：无
- **直接子组件**：
  - `NavBar`（导航栏）
  - `<router-view />`（Vue Router 动态渲染 `HomeView / PortfolioView / BookingView` 之一）

---

### 2. NavBar.vue
- **文件**：`src/components/NavBar.vue`
- **职责**：全局顶部导航，**固定吸顶**；桌面端水平展开，**移动端（< 768px）汉堡菜单** + 遮罩层；滚动 10px 后加毛玻璃背景。
- **Props**：无（导航链接硬编码在组件内的 `navLinks` 常量）
- **Emits**：无（内部直接使用 `<RouterLink>` 进行路由跳转）
- **内部状态**：
  - `scrolled`（boolean）：是否已滚动超过 10px，用于切换吸顶样式
  - `mobileOpen`（boolean）：移动端汉堡菜单是否展开
- **直接父组件**：`App.vue`

---

### 3. HomeView.vue
- **文件**：`src/views/HomeView.vue`
- **职责**：首页 **纯组合布局容器**，不承担具体业务渲染。从上到下依次拼装：
  1. Hero 简介区（工作室名称 + Slogan + CTA 按钮 + 右栅格照片墙，内联实现）
  2. `GalleryWaterfall`（精选瀑布流）
  3. `PricingSection`（统计 + 套餐）
- **Props**：无
- **Emits**：无
- **数据来源**：从 `@/data/mock` 导入 `studioInfo / featuredWorks / studioStats / pricingPlans`
- **直接子组件**：
  - `GalleryWaterfall`
  - `PricingSection`

---

### 4. GalleryWaterfall.vue
- **文件**：`src/components/GalleryWaterfall.vue`
- **职责**：通用两列瀑布流区块。展示一组作品缩略图，悬浮放大 + 渐变遮罩标题，可选「查看更多」跳转按钮。
- **Props（全部通过 props 接收，无内部耦合数据）**：

  | Prop | 类型 | 默认值 | 说明 |
  |------|------|--------|------|
  | `works` | `FeaturedWork[]` | **必填** | 作品数组（`{ id, url, title, ratio }`） |
  | `title` | `string` | `'精选作品'` | 区块标题 |
  | `subtitle` | `string` | `'用镜头讲述你的故事'` | 区块副标题 |
  | `showMoreLink` | `string \| undefined` | `undefined` | 若提供，则在底部渲染「查看全部作品」按钮，`useRouter()` 跳转到该路径 |

- **Emits**：无（路由跳转为组件内部通过 `useRouter()` 处理）
- **直接父组件**：`HomeView.vue`

---

### 5. PricingSection.vue
- **文件**：`src/components/PricingSection.vue`
- **职责**：统计数字卡 + 套餐卡片区。两个区块独立，传入数组为空时对应区块自动隐藏。
- **Props**：

  | Prop | 类型 | 默认值 | 说明 |
  |------|------|--------|------|
  | `stats` | `StudioStats[]` | `[]` | 数据统计数组（`{ num, label, desc }`），为空不渲染统计部分 |
  | `plans` | `PricingPlan[]` | `[]` | 套餐数组（`{ id, name, description, price, features, featured? }`），为空不渲染套餐部分 |

- **Emits**：无（点击「预约此套餐」按钮内部 `useRouter()` 跳转到 `/booking?plan=<planId>`）
- **内部交互**：
  - 套餐 `featured: true` 的套餐会渲染「人气之选」标签 + 外框高亮 + 主色按钮
- **直接父组件**：`HomeView.vue`

---

### 6. PortfolioView.vue
- **文件**：`src/views/PortfolioView.vue`
- **职责**：作品集页容器。负责三类作品 Tab 切换（婚纱 / 写真 / 证件照）、图片网格展示、管理灯箱打开状态与当前索引。
- **Props**：无
- **Emits**：无
- **内部状态**：
  - `activeTab`：当前选中分类，默认 `'wedding'`
  - `lightboxIndex`：当前灯箱索引（`null` = 关闭，数字 = 打开并展示第 N 张）
  - `filteredItems`：按分类过滤后的作品数组（computed）
- **数据来源**：从 `@/data/mock` 导入 `portfolioItems / categoryTabs`
- **直接子组件**：
  - `Lightbox`（传 `items` + 双向绑定 `currentIndex`）

---

### 7. Lightbox.vue
- **文件**：`src/components/Lightbox.vue`
- **职责**：全屏灯箱组件。通过 `<Teleport to="body">` 传送到 DOM 根部，支持 ESC 关闭、← → 翻页、点击遮罩关闭、小圆点跳转、图片加载占位动画。
- **Props**（标准 `v-model:current-index` 双向绑定用法）：

  | Prop | 类型 | 说明 |
  |------|------|------|
  | `items` | `PortfolioItem[]` | 灯箱里的完整图片列表（已按分类过滤好的数组） |
  | `currentIndex` | `number \| null` | 当前显示索引；`null` 表示关闭，数字为打开 |

- **Emits**（配合 `v-model:currentIndex`）：

  | 事件 | 载荷类型 | 触发时机 |
  |------|---------|---------|
  | `update:currentIndex` | `number \| null` | 关闭、翻页、点击小圆点时回传新索引 |

- **外部用法示例**：
  ```vue
  <Lightbox :items="list" v-model:current-index="lightboxIndex" />
  ```
- **副作用**：
  - 打开时锁定 `document.body.style.overflow = 'hidden'`，关闭恢复
  - 全局监听 `keydown` 事件（ESC / ← →），组件卸载时自动移除
- **直接父组件**：`PortfolioView.vue`

---

### 8. BookingView.vue
- **文件**：`src/views/BookingView.vue`
- **职责**：预约流程控制器。按「日期 → 时段 → 联系方式」三步串联：
  1. 监听 `selectedDate` 变化，调用 `generateDailySlots()` 生成当日时段并重置时段选择
  2. 维护 `selectedSlotId` 当前选中时段
  3. 汇总为 `formReady`（日期+时段都选好才允许提交表单）
  4. 接收 `BookingForm` 的 `submit` 事件，展示 Toast（2.8s 自动关闭）并重置选择
- **Props**：无
- **Emits**：无
- **内部状态**：
  - `selectedDate: Date \| null`
  - `selectedSlotId: string \| null`
  - `slots: TimeSlot[]`（当日时段）
  - `showToast: boolean`（成功提示）
- **数据来源**：从 `@/data/mock` 导入 `generateDailySlots`
- **直接子组件**：
  - `Calendar`（v-model `selectedDate`）
  - `TimeSlots`（传 `slots` + v-model `selectedSlotId`）
  - `BookingForm`（传 `disabled` + 监听 `@submit`）

---

### 9. Calendar.vue
- **文件**：`src/components/Calendar.vue`
- **职责**：月视图日历组件。前后翻月、禁用过期日期、今天高亮、选中态、周末特殊颜色。
- **Props**（标准 `v-model`）：

  | Prop | 类型 | 说明 |
  |------|------|------|
  | `modelValue` | `Date \| null` | 当前选中日期 |

- **Emits**：

  | 事件 | 载荷类型 | 触发时机 |
  |------|---------|---------|
  | `update:modelValue` | `Date` | 用户点击某一天时回传新的 Date 对象 |

- **外部用法示例**：
  ```vue
  <Calendar v-model="selectedDate" />
  ```
- **内置规则**：
  - 早于今天 0 点的日期一律禁用（灰字 + 删除线 + `disabled`）
  - 今天不可再往前翻（会禁用上月按钮），但可无限翻到未来
- **直接父组件**：`BookingView.vue`

---

### 10. TimeSlots.vue
- **文件**：`src/components/TimeSlots.vue`
- **职责**：时段选择卡片组件。按上午 / 下午 / 晚间分组展示，每组右上角显示可约比例，支持三态样式（未选 / 已选 / 已约满）。
- **Props**：

  | Prop | 类型 | 说明 |
  |------|------|------|
  | `slots` | `TimeSlot[]` | 当天完整时段列表（含 `booked` 标记） |
  | `modelValue` | `string \| null` | 当前选中的 `slot.id` |

- **Emits**：

  | 事件 | 载荷类型 | 触发时机 |
  |------|---------|---------|
  | `update:modelValue` | `string` | 用户点击「可约」时段卡回传 `slot.id` |

- **三态样式**：
  - `booked === true` → 浅灰底灰字 + 「已约满」标签 + `disabled`
  - `booked === false` && 未选中 → 白底棕边框，hover 变棕
  - 已选中 → 复古棕填充 + 对勾图标 + 轻微放大
- **直接父组件**：`BookingView.vue`

---

### 11. BookingForm.vue
- **文件**：`src/components/BookingForm.vue`
- **职责**：预约联系方式表单。包含姓名 + 手机号两个字段，带失焦校验 + 实时错误提示 + 提交按钮的可用态控制。
- **Props**：

  | Prop | 类型 | 默认值 | 说明 |
  |------|------|--------|------|
  | `disabled` | `boolean` | `false` | 是否禁用提交按钮（父级用它控制「日期+时段都选了才能提交」） |

- **Emits**：

  | 事件 | 载荷类型 | 触发时机 |
  |------|---------|---------|
  | `submit` | `{ name: string, phone: string }` | 点击提交按钮，且姓名 ≥ 2 字 + 手机号符合 `^1[3-9]\d{9}$` 正则 + `disabled === false` |

- **内置校验规则**：
  - 姓名：≥ 2 字
  - 手机号：11 位，首位 1，第二位 3–9
  - 失焦（`@blur`）才触发第一次显示错误，避免刚输入就报红
- **直接父组件**：`BookingView.vue`

---

## 四、组件数据流总览（预约页为例）

```
BookingView.vue  (单一数据真相源)
  │
  ├── selectedDate  ──v-model──▶  Calendar.vue        （受控显示 + 回传新 Date）
  │
  ├── selectedSlot  ──v-model──▶  TimeSlots.vue       （受控显示 + 回传 slotId）
  │        │
  │        └── computed: formReady  ──disabled prop──▶  BookingForm.vue
  │                                                      │
  └──── handleFormSubmit() ◀────submit 事件◀─────────────┘
         └── showToast = true  →  渲染 Toast
```

## 五、扩展建议

| 需求场景 | 推荐修改位置 | 说明 |
|---------|-------------|------|
| 新增页面 | `src/router/index.ts` + 新建 `views/XxxView.vue` | 路由和视图对应 |
| 首页加新区块 | `HomeView.vue` + 新建 `components/XxxSection.vue` | 首页只管 import 和传 props |
| 接入真后端 | 替换 `@/data/mock` 中的函数调用（如 `generateDailySlots` → `fetch`） | 视图组件无需改 |
| 套餐预选功能 | `BookingView.vue` 读取 `route.query.plan`，传给 `PricingSection` 保持一致 | 现在套餐跳转已带 `?plan=` 参数 |
| 增加作品集分类 | `mock.ts` 的 `categoryTabs` + 给 `portfolioItems` 加对应 category | `PortfolioView` 自动适配 |
