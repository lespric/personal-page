# 任务五——移动端的个人页面

## 一、效果呈现

![task5-1](https://github.com/lespric/personal-page/blob/master/gif/001.gif)  
![task5-2](https://github.com/lespric/personal-page/blob/master/gif/002.gif)

## 二、任务进展

* 占位图的方式改为给图片区增加背景颜色，即用颜色代替占位图；  
![01](https://github.com/lespric/personal-page/blob/master/des/01.png)
* 绘制按钮形状，完成返回按钮的绘制，对于收藏的五角星形状，暂未尝试绘制出空心五角星，且属于icon图标，不太需要用CSS绘制；  
![02](https://github.com/lespric/personal-page/blob/master/des/02.png)  
* 修正电脑端即网页的适配布局，修改为两边留白，居中显示内容的布局，学会使用calc的四则运算方式；  
![03](https://github.com/lespric/personal-page/blob/master/des/03.png)
* 修正footer的“电话联系”按钮在宽度改变时没有做到两端对齐，从只有margin-left值，改为flex布局的space-between方式+margin-right值；

## 三、开发思路

### 1. 分析布局

* 把每个元素用同样宽度和高度的矩形代替，对于有对齐关系再增加一个大矩形包含块，如此分布定位进行分析；
* 整体布局分为三大部分，header、main、footer；
* header分为返回按钮控件、页面标题，为了方便页面标题的居中，返回按钮控件变为浮动模型来定位，而页面标题用flex布局来定位；
* main分为图片区和文字区，两个区都是占满一行，所以都作为块状元素，即默认布局进行分布；
  * 图片区(top_half)：分为头像区和个人信息区，且个人信息区内又分为姓名年龄区和地址区，姓名年龄区和地址区里面根据都有两个不同的元素，再各自细分为两个小部分，由此盒子套盒子，来方便每个最小元素与同层级元素的对齐（居中对齐、左对齐、顶部对齐等），基本采用flex布局的对齐方式；
  * 文字区（bottom_half）：根据分隔线，分为六个部分，采用flex布局的垂直分布，每个部分根据内容都再细分为两个小部分——左侧元素和右侧元素，左侧元素中的小标题（最后四行）的样式一样，右侧元素中的内容（最后四行）的样式也一样，由此通过使用属性选择器和子元素选择器的组合，来分别共同应用同一套样式，再对特殊样式用属性选择器进行覆盖，也实现不同行的同一侧元素的左对齐；
* footer分为“留言”按钮和“电话联系”按钮，采用flex布局的两端对齐方式分布；
* 因发现有留言板，额外增加aside部分，即留言板弹窗部分，通过JS控制点击事件来完成弹出留言板的效果；

* **多个同层级元素对齐**（flex布局）
  * **水平居中对齐**：对齐轴为垂直方向，父元素声明，排列方式为**flex-direction:column**(垂直分布)，**justify-content:center**（横向位置为居中），而左对齐和右对齐分别为**flex-start、flex-end**；
  * **垂直居中对齐**：对齐轴为水平方向，父元素声明，排列方式为**flex-direction:row**(水平分布)，**align-items:center**（纵向位置为居中），顶部对齐和底部对齐也是分别为**flex-start、flex-end**；
  * **不规则对齐**：先定义大部分的对齐方式，对于特殊部分，在其本身元素声明，**align-self**: auto | flex-start | flex-end | center | baseline | stretch;,来定好大致位置，再通过margin值定好具体位置(类似于绝对定位）；  
  ![04](https://github.com/lespric/personal-page/blob/master/des/04.png)

* **注意布局的坑**
  * 对于**static默认布局、浮动模型(float:left)、层模型(position)**:
    * 盒模型变为**content-box**，子元素的宽度设为100%时，其实际占据的宽度值为父元素的宽度值加上padding值，由此导致页面内容被撑宽而出现页面右边有空白，即如父元素为100px，子元素设为width:100%,padding:20px，则子元素占据的宽度为140px，比父元素多40px，而撑大页面；
    * 所以若子元素有设置**padding**值时，其宽度设为**width:auto**，content的宽度才会自动减去padding值；
    * 如导致有撑宽页面的情况，即出现水平滚动轴，则可以通过**overflow-X:hidden**，强行隐藏水平溢出的内容，对于需要相对于右边定位的元素，可以设为margin-right值为父元素的padding值加本身元素的margin值（对于屏幕边框），即**margin-right:calc(padding-right + margin-right（border))**;

  * 对于**flex布局**：
    * 盒模型变为**border-box**，子元素设为100%，其实际占据的宽度值就是父元素的宽度，子元素的content宽度会自动减去padding值，子元素宽度就与页面宽度一致，所以如父元素声明为display:flex，子元素没有声明为浮动或层模型，子元素的宽度可以设为**width:100%**;
    * 而高度值无论哪种布局设为100%都会自动减去padding值，但子元素设为auto会变为0，基本都需要设置一个固定值，或者不设定值由其子元素的高度撑开；

### 2. 分析控件

* **轮播图**
参考：[纯CSS实现轮播图效果](https://www.cnblogs.com/gongyue/p/7904856.html)

  * step1：选择轮播的图片的尺寸应一致，且**增加最后一张图片为第一张图片**，由此实现动画开始阶段和结束阶段为同一个画面；
  * step2：给包含块定义样式，根据需要轮播多少张图片，定义包含块的宽度为图片的宽度的n倍，并增加溢出隐藏**overflow-x:hidden**；
  * step3：给图片定义样式，各自宽度为包含块的**n分之一**，如需提前配置占位图，也设置背景颜色；
  * step4：创建一个关键帧动画，动画效果方式为**transform: translateX(-n分之一)**，即横向移动一个图片的宽度；
  * step5：给包含块设置这个关键帧动画，并定义动画属性（时间、缓动效果、**循环播放infinite**），即可循环播放；
  * step6：如需增加点击归位效果，则需另再创建一个关键帧动画，动画效果为**margin-right值**来从右边移动到左边归位，同样作用于包含块；

* **伪元素装饰**
参考：[浅谈css的伪元素::after和::before](https://blog.csdn.net/w405722907/article/details/79446038)

  * 对于小标题前的竖线，通过增加伪元素的方式定义，而不用在html增加标签；
  * 使用伪元素时，一定要声明**content:"";**，才会显示样式出来；
  * 伪元素都是以内联元素属性，也可以另外声明，作为同层级元素插入在前面或后面，而非变为其子元素；
  * 多用于创建装饰性元素如形状，创建用于布局的元素，实现特殊布局的特殊需要，做显示图标的实现手段，配合attr显示属性值；

* **按钮形状绘制**
参考：[CSS绘制各种各样的形体和图形](https://blog.csdn.net/qq_36699230/article/details/82899494)

  * 目前绘制出返回按钮的左三角形状；
  * 定义好位置和尺寸后，给上边和左边定义边线；
  * 再通过旋转的方式，旋转-45°即可完成，即**transform: rotate(-45deg)**;

* **选择器应用**
参考：[css样式详解及覆盖顺序](https://blog.csdn.net/qq_30682027/article/details/83543760)

  * 应用以下这些选择器，可以不用给html增加class属性，尽可能减少class标签的命名，又可以在css给同类样式的元素一次性声明；
  * 子元素选择器，可根据html的标签位置，来选择，所以一般最下层级的标签无需增加class属性值；
  * :first-child，必须是**子元素:first-child**，且子元素前面没有一个同名的子元素标签，即**必须是第一个**才生效，:last-child也一样；
  * :nth-of-child(n)，n为该子元素在其子元素列表中，按**同名标签**的顺序排在的第几位，从1开始数；
  
  * 属性选择器，对于具有同样样式的标签的class属性值，应带有同样的前缀或后缀，方便属性选择器一次性选择；
  * 属性选择器的权值为10+1，比类选择器多1，所以属性选择器的优先级高于类选择器，后面需覆盖则应用属性选择器或更高权值的选择器；

  * 完整的层叠优先级是:浏览器缺省 < 外部样式表(css文件) < 外部样式表类选择器 < 外部样式表类派生选择器 < 外部样式表ID选择器 < 外部样式表ID派生选择器 < 内部样式表(style标签内的样式) < 内部样式表类选择器 < 内部样式表类派生选择器 < 内部样式表ID选择器 < 内部样式表ID派生选择器 < 内联样式(style=”) < !important(不常用)；

* **按钮弹窗**
参考：[前端html+css+js弹窗的实现](https://blog.csdn.net/qq_40735186/article/details/78406616)

  * step1：在html增加弹窗的部分aside；  
  ![05](https://github.com/lespric/personal-page/blob/master/des/05.png)
  * step2：在CSS定义弹窗的样式和弹窗出现的动画效果；
  ![06](https://github.com/lespric/personal-page/blob/master/des/06.png)  
  ![07](https://github.com/lespric/personal-page/blob/master/des/07.png)
  * step3：在JS定义一个点击出现函数，给html的按钮标签属性添加点击出现事件onclick="函数名()"，再定义几个点击消失函数，通过获取其他区域的属性，在JS赋予其他区域点击消失事件；
  ![08](https://github.com/lespric/personal-page/blob/master/des/08.png)

* **引用文字**
参考：[CSS3之@font-face](https://www.jianshu.com/p/ef72165dfbce)

  * [线上转换字体地址](https://www.fontke.com/tool/fontface/),可以把ttf或otf转为其他格式文件，方便引用时适配；
  * 一般用图标字体，中文字体不常用，因为中文字体包比较大，加载要花时间，最好变为图片；
  * 应用@fontface时，声明family的名字可以随便写，但最好还是符合字体名字，然后声明完后，在后面应用要写声明时的family名字；
    * .eot ，Embedded Open Type，主要用于早期版本的IE，是其专有格式，带有版权保护和压缩;
    * .ttf ，TrueType，在操作系统里更为常见，在web上使用的话，是为了兼容早期仅支持TTF和OTF的浏览器。由于体积比较大，还需要服务器额外压缩;
    * .otf，OTF扩展名的O表示OpenType - PostScript字体，采用的是PostScript曲线，支持OpenType高级特性;
    * .woff ，Web Open Font Format，可以看作是ttf的再封装，加入了压缩和字体来源信息，通常比ttf小40%。也是当前web字体的主流格式;
    * .woff2 ，Web Open Font Format 2.0，相比woff最大的优化应该是加强了字体的压缩比。目前 支持的浏览器 只有正在互飙版本号的Chrome和Firefox;
    * .svg，基于SVG字体渲染的一种格式，支持这种字体的浏览器有【Chrome4+,Safari3.1+,Opera10.0+,iOS Mobile Safari3.2+】;  
    ![09](https://github.com/lespric/personal-page/blob/master/des/09.png)
  
## 四、深度思考

* **vertical-align与line-height的区别**
参考：[vertical-align与line-height](https://www.jianshu.com/p/3e566dc89f3b)

  * line-height为文本的行高，即相当于上行距+字体高度+下行距，所以文本会出现上下间隔，还会把父元素撑开即父元素的高度等于line-height值；
    * 如line-height值大于文本高度，则会把文本居中，适合高度确定的单行文本实现垂直居中对齐；
  * vertical-align为对齐方式，只对内联元素生效，默认为baseline基线对齐，即与文本的底边对齐，由此多出下行距，可以通过声明其他对齐方式变化；
    * 对于高度确定的多行文本，声明vertical-align:middle，来实现垂直居中对齐；
    * 如图片与文本并列一行时，可以把文本的下行距声明为0(padding-bottom:0)，或者声明图片为块状元素，或者声明其他对齐方式，来实现无留白；

* **title与h1、b与strong、i与em、img的alt与title、src与href有什么区别**
参考：[title与h1、b与strong、i与em、img的alt与title、src与href有什么区别](https://blog.csdn.net/vivian_1122/article/details/80235052)

  * tittle用于搜索网站时出现在搜索引擎的简介，h1用于给用户看的文章标题；
  * b和i，搜索引擎识别不了，strong和em可以识别，基本在CSS中代替，且b应尽量少用而改用strong ,i应尽量少用而改用em，样式都一样；
  * alt是在没加载出图片时显示文字，tittle是悬停时显示的文字提示；
  * src是引入，把资源加载到文件，在 img、script、iframe 等元素上使用；href是引用，不加载资源到文件，在 link和a 等元素上使用；

* **IconFont**
参考：[iconfont官方文件](https://www.iconfont.cn/plus/help/detail?helptype=code)

  * iconfont是国内功能很强大且图标内容很丰富的矢量图标库，通过在线搜索并下载使用；
  * 引用方法：
    * unicode引用：拷贝项目下面生成的font-face并声明名字，在HTML文件增加标签且内容为图标编号，在CSS定义family为引用的名字；
    * font-class引用：拷贝项目下面生成的fontclass代码作为CSS文件的外联，挑选相应图标并获取类名，应用到标签上；
    * symbol引用：拷贝项目下面生成的symbol代码作为JS的外联，在CSS声明包含块的样式和尺寸，并挑选相应图标并获取类名，再在子元素标签添加**xlink:href="#icon-xxx"**；

* **dl、ol、ul**
参考：[HTML 列表(ul ol dl)](https://www.jianshu.com/p/e87181ac147f)

* dl:结合dt（定义列表中的项目）和dd（描述列表中的项目）,定义一个项目的列表，无项目符号，只是缩进；
* ul:无项目序号，符号为圆点等样式，通过ist-style-type:disc/circle/square;，来改变样式，适用于大多数同层级排序；
* ol:有项目序号，符号为数字、字母等类型，通过声明不同的type值改变样式，start是编号开始的数字，多用于有顺序、优先级的排序；

## 五、明天任务

分析和思考任务六（中秋要咸一点）
