# Vue 3 + Vite


商城后台前端 vue3 + element plus


线上地址

https://mallweb.acorn.eu.org/login

默认用户名密码 admin admin

项目展示图片
![Screenshot 2023-02-19 at 17.31.22.png](demo_image%2FScreenshot%202023-02-19%20at%2017.31.22.png)
![Screenshot 2023-02-19 at 17.30.36.png](demo_image%2FScreenshot%202023-02-19%20at%2017.30.36.png)
![Screenshot 2023-02-19 at 17.29.29.png](demo_image%2FScreenshot%202023-02-19%20at%2017.29.29.png)












```
➜  src git:(main) ✗ tree
.
├── App.vue
├── api
│   ├── api.js
│   ├── category.js
│   ├── coupon.js
│   ├── distribution.js
│   ├── goods.js
│   ├── goods_comment.js
│   ├── image.js
│   ├── image_class.js
│   ├── index.js
│   ├── level.js
│   ├── manager.js
│   ├── menu.js
│   ├── notice.js
│   ├── order.js
│   ├── record.js
│   ├── role.js
│   ├── skus.js
│   ├── system.js
│   └── user.js
├── assets
│   └── vue.svg
├── axios.js
├── common
│   ├── auth.js
│   ├── useCommon.js
│   ├── useManager.js
│   ├── useSku.js
│   ├── useTabList.js
│   └── util.js
├── components
│   ├── AsideList.vue
│   ├── ChooseGoods.vue
│   ├── ChooseImage.vue
│   ├── ChooseSku.vue
│   ├── CountTo.vue
│   ├── Editor.vue
│   ├── FormDrawer.vue
│   ├── HelloWorld.vue
│   ├── IconSelect.vue
│   ├── ImageAside.vue
│   ├── ImageMain.vue
│   ├── IndexCard.vue
│   ├── IndexChart.vue
│   ├── IndexNavs.vue
│   ├── ListHeader.vue
│   ├── Search.vue
│   ├── SearchItem.vue
│   ├── TagInput.vue
│   └── UploadFile.vue
├── layouts
│   ├── admin.vue
│   └── components
│       ├── AHeader.vue
│       ├── AMenu.vue
│       └── ATagList.vue
├── main.js
├── pages
│   ├── 404.vue
│   ├── api
│   │   └── list.vue
│   ├── category
│   │   ├── components
│   │   │   └── GoodsDrawer.vue
│   │   └── list.vue
│   ├── comment
│   │   └── list.vue
│   ├── coupon
│   │   └── list.vue
│   ├── distribution
│   │   ├── dataDrawer.vue
│   │   ├── index.vue
│   │   ├── panel.vue
│   │   └── setting.vue
│   ├── goods
│   │   ├── banners.vue
│   │   ├── components
│   │   │   ├── SkuCard.vue
│   │   │   ├── SkuCardItem.vue
│   │   │   └── SkuTable.vue
│   │   ├── content.vue
│   │   ├── list.vue
│   │   └── skus.vue
│   ├── image
│   │   └── list.vue
│   ├── index.vue
│   ├── level
│   │   └── list.vue
│   ├── login.vue
│   ├── manager
│   │   └── list.vue
│   ├── menu
│   │   └── list.vue
│   ├── notice
│   │   └── list.vue
│   ├── order
│   │   ├── ExportExcel.vue
│   │   ├── InfoModal.vue
│   │   ├── ShipInfoModal.vue
│   │   └── list.vue
│   ├── record
│   │   └── list.vue
│   ├── role
│   │   └── list.vue
│   ├── setting
│   │   └── base.vue
│   ├── skus
│   │   └── list.vue
│   ├── system
│   │   └── list.vue
│   └── user
│       └── list.vue
├── permission.js
├── router
│   └── index.js
└── store
    └── index.js

29 directories, 89 files
```