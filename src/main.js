window.onload = function () {
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, {
        passive: false  // 关闭被动监听
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};
const simplifyUrl = url =>{
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')
}
const xObject= JSON.parse(localStorage.getItem('userSite'))
const hashMap = xObject||[
    {logo:'D',url:'http://sivers.org'},
    {logo:'N',url:'http://nav.al'},
    {logo:'F',url:'http://fs.blog'},
    {logo:'T', url:'http://tim.blog'},
    {logo: 'S',url: 'http://seths.blog'}
]
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const render = ()=>{
   $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`
    <li>
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
</li>
    `).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url,'_self')
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            render();
        })

    })
}
render();



$('.addButton')
    .on('click', () => {
    console.log('hi');
    let url = window.prompt('请输入你要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'http://' + url
    }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    })
    render();
})
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('userSite',string)
}
$(document).on('keypress',(e)=>{
    const {key} = e;
    for(let i=0;i<hashMap.length;i++){
        if(key.toUpperCase() === hashMap[i].logo){
            window.open(hashMap[i].url,'_self')
        }
    }
})
$(document).on('keypress','input',(e)=>{
    e.stopPropagation()
})