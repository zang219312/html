# Vue 3 + TypeScript + Vite

仿明日方舟官网 Logo 粒子动画，拉取后记得`yarn install` or `npm install`

主要使用三个类：Particle、LogoImg、ParticleCanvas

1. Particle：记录粒子位置、颜色、大小、动画耗时 和 x/y 方向上的移动速度，提供绘制粒子方法`draw`、更新方法`update`、替换方法`change`
2. LogoImg：记录图片解析后的粒子数组信息`particleData`
3. ParticleCanvas：记录目标画布、画布中的粒子数组和鼠标在画布中的位置，提供绘制画布方法`drawCanvas`、改变粒子数组方法`changeImg`

流程：

- 实例化一个`ParticleCanvas`对象`prtCanvas`
- 点击某个图片`clickLogo`时调用`prtCanvas.changeImg(particleData)`方法传入其粒子数组信息。
- - 首次 changeImg，直接赋值
- - 非首次，对比粒子数组 移除/生成粒子，并随机映射

这里就已经实现粒子动画了，粒子的生成和移动就不细说了看代码！

然后就是吸引/排斥：

- 鼠标在实例对象`prtCanvas`对应的画布移动时触发`mousemove`回调，根据回调参数重新计算鼠标位置`mouseX/mouseY`
- - `prtCanvas`的绘制画布方法`drawCanvas`一直随着事件循环在执行，`drawCanvas`中遍历画布粒子数组并调用每一项的`update`方法并传入重新计算后的`mouseX/mouseY`
- - `particle.update`中又根据距离和设置好的引力/斥力重新计算`vx/vy`...

```javascript
this.ParticleArr.forEach((particle) => {
  particle.update(this.mouseX, this.mouseY);
  particle.draw();
});
```

Particle 的 draw 方法符合面向对象的写法是接收一个 content 上下文参数，图方便就直接读取了 😁

欢迎关注[我的掘金主页](https://juejin.cn/user/1372654389433496/posts)，一起学习更多前端知识
