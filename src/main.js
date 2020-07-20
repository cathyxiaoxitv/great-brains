const $siteList = $('.siteList')//需要放前面，hashMap.forEach里无法访问到后面的变量
const $lastLi = $siteList.find('li.last')//这样子写是不是更加具体？
const x = localStorage.getItem('x')//把储存了hashMap的localStorage读取出来，是字符串，需要转成对象
const xObject = JSON.parse(x)
const hashMap = xObject ||[{ //第一次的时候是空的，需要我们初始化hashMap
    logo:'D',url:'http://sivers.org'},
    {logo:'N',url:'http://nav.al'},
    {logo:'F',url:'http://fs.blog'},
    {logo:'T', url:'http://tim.blog'},
    {logo: 'S',url: 'http://seths.blog'}
]
const simplifyUrl= (url)=>{
    return url.replace('https://','')
        .replace('http://','')
        .replace('www','')
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()//找到除最后一项添加网址之外的所有，remove掉
    hashMap.forEach((node,index)=>{//遍历此hashMap，生成网站
        const $li = $(`<li>    
                <div class="siteWrapper">
                    <span class="tips">用键盘上的字母打开我</span>
                    <div class="close">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                     </div>
                    <div class="site">
                        <div class ="logo">
                            ${node.logo}
                        </div>
                       
                    </div>
                    <div class="description">${simplifyUrl(node.url)}</div>
                </div> 
</li>`).insertBefore($lastLi)
        //.on()的功能是在选定的元素上绑定一个或多个事件处理函数。
        $li.on('click',()=>{
            window.open(node.url)
        })//感知到click事件，执行函数【跳转url】
        $li.on('click','.close',(e)=>{
            // console.log('clicked') 测试看看
            e.stopPropagation()//点击后代元素.close，执行"阻止click事件向上冒泡"
            // console.log(hashMap);//显示当前hashMap，如果能知道当前点击的site是数组里的第几个就好删除了
            hashMap.splice(index,1)
            render()
        })
    })
}
render();//一开始就render
$('.addButton')
    //indexOf返回string对象里出现制定值的索引
    .on('click', () => {//首先把用户新输入的push进数组，再render一次
        let url = window.prompt('请问你要添加的网址是？')
        if (url.indexOf('http') !== 0) {//不是以'http'开头的话
            url = 'http://' + url
        }
        hashMap.push({
            logo:simplifyUrl(url)[0].toUpperCase(),//储存简化的url
            url:url})
        render()
    });
window.onbeforeunload = ()=>{
    // console.log('页面要关闭了哟') preserve log方便查看
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)//把key的x和value的string存到localStorage里
}
$(document).on('keypress',(e)=>{
   //const key = e.key;//变量名和属性名一样的时候可以简写如下
   const {key} = e
    for(let i = 0;i<hashMap.length;i++){
        if(key.toUpperCase() === hashMap[i].logo){
            window.open(hashMap[i].url)
        }
    }

})
