

(function(_){


   
  // 将HTML转换为节点
  function html2node(str){
    var container = document.createElement('div');
    container.innerHTML = str;
    return container.children[0];
  }

  var template = 
  '<div class="m-slider" >\
    <div class="slide"></div>\
    <div class="slide"></div>\
    <div class="slide"></div>\
  </div>'

//幻灯片的构造函数
  function Slider( opt ){
    _.extend(this, opt);//对象吸收属性
    
    // 容器节点 以及 样式设置
    this.container = this.container || document.body;
    this.container.style.overflow = 'hidden';//不然会出现滚动条


    // 组件节点
    this.slider = this._layout.cloneNode(true);//切换的节点变成自己的属性
    this.slides = [].slice.call(this.slider.querySelectorAll('.slide'));
   
    //转换为真的数组继承数组的方法

    this.pageNum = this.images.length;//图片的长度

    // 内部数据结构 UI数据驱动开发
    this.slideIndex = 1;//切换索引为一
    this.pageIndex = this.pageIndex || 0;//页面索引
    console.log("this.pageIndex: " + this.pageIndex);

    this.offsetAll = this.pageIndex;//页面索引赋给offsetAll
    // this.pageNum 必须传入
    // 初始化动作
    this.container.appendChild(this.slider);
    console.log(this);
  }

  _.extend( Slider.prototype, _.emitter );

  _.extend( Slider.prototype, {

    _layout: html2node(template),//节点的生成

    // 直接跳转到指定页
    nav: function( pageIndex ){

      this.pageIndex = pageIndex ;//把索引赋给人家
      this.slideIndex = typeof this.slideIndex === 'number'? this.slideIndex : (pageIndex+1) % 3;
      console.log(this.slideIndex);

      this.offsetAll = pageIndex;//还不太懂这个是啥反正我才是父子之间的距离

      // this.slider.style.transitionDuration = '0s';

      this._calcSlide();//pageIndex 1 slideIndex 1

    },
    // 下一页
    next: function(){
      this._step(1);
    },
    // 上一页
    prev: function(){
      this._step(-1);
    },
    // 单步移动
    _step: function(offset){

      this.offsetAll += offset;//1
      this.pageIndex += offset;//1
      this.slideIndex +=offset;//1
      // this.slider.style.transitionDuration = '10s';
      this._calcSlide();

    },

    // 计算Slide
    // 每个slide的left = (offsetAll + offset(1, -1)) * 100%;
    // 外层容器 (.m-slider) 的偏移 = offsetAll * 宽度

    _calcSlide: function(){

      // console.log("this.slideIndex: " + this.slideIndex);
      var slideIndex = this.slideIndex = this._normIndex(this.slideIndex, 3);
      // console.log("slideIndex: "+slideIndex);

      var pageIndex = this.pageIndex= this._normIndex(this.pageIndex, this.pageNum);
      // console.log("pageIndex: " +pageIndex);

      var offsetAll = this.offsetAll;//这个是索引来的
      // console.log("offsetAll: " + offsetAll);

      var pageNum = this.pageNum;//这是页数


      var prevSlideIndex = this._normIndex( slideIndex - 1, 3 );
      // console.log("prevSlideIndex: " + prevSlideIndex);

      var nextSlideIndex = this._normIndex( slideIndex + 1, 3);
      // console.log("nextSlideIndex: " + nextSlideIndex);

      var slides = this.slides;
      // console.log("slides: " + slides);

      // 三个slide的偏移
      slides[slideIndex].style.left = (offsetAll) * 100 + '%';
      slides[prevSlideIndex].style.left = (offsetAll-1) * 100 + '%';
      slides[nextSlideIndex].style.left = (offsetAll+1) * 100 + '%';
    
      // 容器偏移
      this.slider.style.transform = 'translateX(' + (-offsetAll * 100) + '%) translateZ(0)';
      // console.log("this.slider: " + this.slider.transform);
      
   

      // 当前slide 添加 'z-active'的className
      slides.forEach(function(node){ _.delClass(node, 'z-active') });

      _.addClass(slides[slideIndex], 'z-active');

      this._onNav(this.pageIndex, this.slideIndex);//这是怎么回事呀
    },

    // 标准化下标
    _normIndex: function(index, len){
      return (len + index) % len;
    },
    // 跳转时完成的逻辑， 这里是设置图片的url
    _onNav: function(pageIndex, slideIndex){

      var slides = this.slides;//把三个常主节点赋值

      for(var i =-1; i<= 1; i++){
        var index = (slideIndex + i+3)%3; 
        var img = slides[index].querySelector('img');
        if(!img){
          img = document.createElement('img');
          slides[index].appendChild(img);
        }
        img.src = './img/banner' + ( this._normIndex(pageIndex + i, this.pageNum)+1 ) + '.jpg';

      }

      this.emit('nav', {
        pageIndex: pageIndex,
        slideIndex: slideIndex
      }) 

    },
  
  })

  //暴露接口
  window.Slider = Slider;
  //为浏览器的全局对象window声明一个Slider的变量
  //再把Slider的构造函数赋值给Window.Slider
  //目的是你可以随时调用这个函数以及使用new实例化后继承的方法
  //所以你自己写的代码你要知道怎么回事。



})(util);








