/*
 * @Author: Shu Binqi
 * @Date: 2021-10-22 00:03:37
 * @LastEditors: Shu Binqi
 * @LastEditTime: 2021-10-30 23:13:27
 * @Descripttion: 
 * @version: 
 * @FilePath: \democ:\Users\bq\Desktop\note\static\js\index.js
 */

/**
* 这个模块注册一个可在页面加载完成后自动运行的匿名函数，当执行这个函数时会去文档中查找
* id为‘doc'的元素，如果这个元素不存在，就创建一个元素
*
* 生成的doc目录应当具有自己的CSS样式，整个目录区域的样式className设置为“docEntry”
* 同样我们为不同层级的目录标题定义不同的样式，<h1>标签生成标题
* className为“docLevel1”，<h2>标签生成的标题className为“docLevel2”，以此类推
* 段编号的样式为"docSectNum"
*
* css代码的随后一行表示每个段编号之后都会有一个冒号和空格符，若要隐藏段编号，
* 请使用这行代码：
* .docSectNum{display:none;}
*
* 这个模块需要onLoad（）工具函数
*/
window.onload = (function(){        //匿名函数定义了一个局部作用域
    //查找doc容器元素
    //如果不存在，则在文档开头处创建一个
    var doc = document.getElementById('doc');
    if(!doc){
        doc = document.createElement("div");
        doc.id = "doc";
        document.body.insertBefore(doc,document.body.firstChild);
    }

    //查找所有标题元素
    var headings;
    if(document.querySelectorAll){
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    }else{  //否则，查找方法稍微麻烦一些
        headings = findHeadins(document.body,[]);
    }

    //递归遍历document的body,查找标题元素
    function findHeadins(root,sects){
        for(var c = root.firstChild; c!= null; c= c.nextSibling){
            if(c.nodeType !== 1)
                continue;
            if(c.tagName.length === 2 && c.tagName.charAt(0) ==="H")
                sects.push(c);
            else
                findHeadins(c,sects);
        }
        return sects;
    }

    //初始化一个数组来保持跟踪章节号
    var sectioinNumbers = [0,0,0,0,0,0];

    //现在，循环已找到的标题元素
    for(var h = 0 ; h < headings.length ; h++ ){
        var heading = headings[h];

        //跳过在doc容器中的标题元素
        if(heading.parentNode == doc )
            continue;

        //判定标题的级别
        var  level = parseInt( heading.tagName.charAt(1));
        if( isNaN( level ) || level < 1 || level > 6 )
            continue;

        //对于该标题级别增加sectionNumbers对应的数字
        //重置所有标题比级别低的数字为零
        sectioinNumbers[level-1]++;
        for(var i = level; i<6 ; i++)
            sectioinNumbers[i] =0;

        //现在，将所有标题级别的章节号组合产生一个章节号 如；2.3.1
        var sectioinNumber = sectioinNumbers.slice(0,level).join(".");

        //位标题级别增加章节号
        //把数字放在<span>中，使得其可以用样式修饰
        var span = document.createElement("span");
        span.className = "docSectNum";
        span.innerHTML = sectioinNumber ;
        heading.insertBefore(span , heading.firstChild);

        //用命名的锚点将标题包起来，以便为它增加链接
        var anchor = document.createElement("a");
        anchor.name = "doc"+sectioinNumber;
        heading.parentNode.insertBefore(anchor , heading);
        anchor.appendChild(heading);

        //现在为该节点创建一个链接
        var link = document.createElement("a");
        link.href = "#doc"+sectioinNumber;      //链接的目标地址
        link.innerHTML = heading.innerHTML;     //链接文本与标题一致

        //将链接放在一个div中，div用基于级别的名字的样式修饰
        var entry = document.createElement('div');
        entry.className = "docEntry docLevel"+level;
        entry.appendChild(link);

        //该div添加到doc容器中
        doc.appendChild(entry);
    }
    $('a[href*=#],area[href*=#]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('name=' + this.hash.slice(1) + '');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset
                    },
                    1000);
                return false;
            }
        }
    });
    var windowWidth = $(window).width();
    if(windowWidth < 1366){
        $(".close-doc").addClass("active");
        $("#doc").addClass("active");
    }
});

var btn = document.getElementById('totop');
btn.onclick = function () {
    $('body,html').animate({ scrollTop: 0 }, 500);
    return false;
};
$(".close-doc").click(function(){
    $(this).toggleClass("active");
    $("#doc").toggleClass("active");
});
$(window).resize(function(){
    //定义变量获取屏幕视口宽度
    var windowWidth = $(window).width();
    if(windowWidth < 1700){
        $(".close-doc").addClass("active");
        $("#doc").addClass("active");
    } else {
        $(".close-doc").removeClass("active");
        $("#doc").removeClass("active");
    }
});