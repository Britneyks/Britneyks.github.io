// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用
// 读取字体
try {
    let fontdata = loadData('blogfont', 1440)
    if (fontdata) setFont(fontdata, 1)
    else localStorage.removeItem('blogfont');
} catch (error) { localStorage.removeItem('blogfont'); }

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

function setFont(n,flag){
    if(n=="main"){
        document.body.style.fontFamily="-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif"
    }
    else{
        document.body.style.fontFamily= n
        // document.documentElement.style.setProperty('--global-font', n)
    }
    if (!flag) { saveData('blogfont', n) }
}

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } 
    else 
        bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    <div class="note orange icon-padding disabled"><i class="note-icon fas fa-battery-half"></i><p>温馨提示：背景图片与字体缓存时间为24h，一天后将恢复默认状态</p></div>
    <div class="default">
    <button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#0084ff;display:inline-block;width:30%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button>
    <button onclick="localStorage.removeItem('blogfont');location.reload();" style="background:#0084ff;display:inline-block;width:30%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认字体</button>
    </div>
    <!--
    <h2 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)')"></a>
    </div>
    -->
    <h2 id="字体切换"><a href="#字体切换" class="headerlink" title="字体切换"></a>字体切换</h2>
    <div class="swfs">
    <span>
    <button class="fontbox" href="javascript:;" rel="noopener external nofollow" style="font-family: cursive !important; background:#8cdfe0;display:inline-block;width:20%;padding: 15px 0;border-radius:6px;color:black;" onclick="setFont('cursive')">手写字体</button>
    <button class="fontbox" href="javascript:;" rel="noopener external nofollow" style="font-family: 鸿雷拙书简体 !important; background:#8cdfe0;display:inline-block;width:20%;padding: 15px 0;border-radius:6px;color:black;" onclick="setFont('鸿雷拙书简体')">鸿雷拙书简体</button>
    <button class="fontbox" href="javascript:;" rel="noopener external nofollow" style="font-family: AliDL !important; background:#8cdfe0;display:inline-block;width:20%;padding: 15px 0;border-radius:6px;color:black;" onclick="setFont('AliDL')">阿里刀隶体</button>
    <button class="fontbox" href="javascript:;" rel="noopener external nofollow" style="font-family: BTZ !important; background:#8cdfe0;display:inline-block;width:20%;padding: 15px 0;border-radius:6px;color:black;" onclick="setFont('BTZ')">字魂扁桃字</button>
    <button class="fontbox" href="javascript:;" rel="noopener external nofollow" style="font-family: 汉字之美神勇兔生肖 !important; background:#8cdfe0;display:inline-block;width:20%;padding: 15px 0;border-radius:6px;color:black;" onclick="setFont('汉字之美神勇兔生肖')">汉字之美神勇兔生肖</button>
    <button class="fontbox" href="javascript:;" rel="noopener external nofollow" style="font-family: 钟齐志莽行书 !important; background:#8cdfe0;display:inline-block;width:20%;padding: 15px 0;border-radius:6px;color:black;" onclick="setFont('钟齐志莽行书')">钟齐志莽行书</button>
    <button class="fontbox" href="javascript:;" rel="noopener external nofollow" style="font-family: 今年也要加油鸭 !important; background:#8cdfe0;display:inline-block;width:20%;padding: 15px 0;border-radius:6px;color:black;" onclick="setFont('今年也要加油鸭')">今年也要加油鸭</button>
    <button class="fontbox" href="javascript:;" rel="noopener external nofollow" style="font-family: 小可奶酪体 !important; background:#8cdfe0;display:inline-block;width:20%;padding: 15px 0;border-radius:6px;color:black;" onclick="setFont('小可奶酪体')">小可奶酪体</button>
    </span>
    </div>
    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p16.qhimg.com/bdm/2560_1600_0/t01441e0d716a8e5c99.jpg)" class="imgbox" onclick="changeBg('url(http://p16.qhimg.com/bdm/2560_1600_0/t01441e0d716a8e5c99.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p17.qhimg.com/bdm/2560_1600_0/t0139a1afef05aeb5c4.jpg)" class="imgbox" onclick="changeBg('url(http://p17.qhimg.com/bdm/2560_1600_0/t0139a1afef05aeb5c4.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p2.qhimg.com/bdm/2560_1600_0/t016f39944d0e747d72.jpg)" class="imgbox" onclick="changeBg('url(http://p2.qhimg.com/bdm/2560_1600_0/t016f39944d0e747d72.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p2.qhimg.com/bdm/2560_1600_0/t015113222d80942ece.jpg)" class="imgbox" onclick="changeBg('url(http://p2.qhimg.com/bdm/2560_1600_0/t015113222d80942ece.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p4.qhimg.com/bdm/2560_1600_0/t012cde4a5058c156b7.jpg)" class="imgbox" onclick="changeBg('url(http://p4.qhimg.com/bdm/2560_1600_0/t012cde4a5058c156b7.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p1.qhimg.com/bdm/2560_1600_0/t01cfe92ce4c961b26d.jpg)" class="imgbox" onclick="changeBg('url(http://p1.qhimg.com/bdm/2560_1600_0/t01cfe92ce4c961b26d.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p7.qhimg.com/bdm/2560_1600_0/t013adffe343bcb5c22.jpg)" class="imgbox" onclick="changeBg('url(http://p7.qhimg.com/bdm/2560_1600_0/t013adffe343bcb5c22.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p6.qhimg.com/bdm/2560_1600_0/t01772c72a4f8f07f00.jpg)" class="imgbox" onclick="changeBg('url(http://p6.qhimg.com/bdm/2560_1600_0/t01772c72a4f8f07f00.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p7.qhimg.com/bdm/2560_1600_0/t0126965e612a7835ac.jpg)" class="imgbox" onclick="changeBg('url(http://p7.qhimg.com/bdm/2560_1600_0/t0126965e612a7835ac.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p2.qhimg.com/bdm/2560_1600_0/t01c794718372e4f003.jpg)" class="imgbox" onclick="changeBg('url(http://p2.qhimg.com/bdm/2560_1600_0/t01c794718372e4f003.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p18.qhimg.com/bdm/2560_1600_0/t01c253c16e180814f5.jpg)" class="imgbox" onclick="changeBg('url(http://p18.qhimg.com/bdm/2560_1600_0/t01c253c16e180814f5.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(http://p1.qhimg.com/bdm/2560_1600_0/t01054da51d6beb507c.jpg)" class="imgbox" onclick="changeBg('url(http://p1.qhimg.com/bdm/2560_1600_0/t01054da51d6beb507c.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2023/06/24/64965890b1537.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2023/06/24/64965890b1537.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2021/01/21/8b4bf7c986880.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2021/01/21/8b4bf7c986880.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2023/06/24/649658940db68.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2023/06/24/649658940db68.jpg)')"></a>
    </div>
    
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)" onclick="changeBg('linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)" onclick="changeBg('linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)" onclick="changeBg('linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #a8edea 0%, #fed6e3 100%)" onclick="changeBg('linear-gradient(to top, #a8edea 0%, #fed6e3 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)" onclick="changeBg('linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%)" onclick="changeBg('linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)" onclick="changeBg('linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)" onclick="changeBg('linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)" onclick="changeBg('linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)" onclick="changeBg('linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(60deg, #abecd6 0%, #fbed96 100%)" onclick="changeBg('linear-gradient(60deg, #abecd6 0%, #fbed96 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #b3ffab 0%, #12fff7 100%)" onclick="changeBg('linear-gradient(to top, #b3ffab 0%, #12fff7 100%)"></a>
    </div>
    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #49a6e9" onclick="changeBg('#49a6e9')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #17efe9" onclick="changeBg('#17efe9')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ffffce" onclick="changeBg('#ffffce')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7ceff" onclick="changeBg('#f7ceff')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #9f17ef" onclick="changeBg('#9f17ef')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #8affbe" onclick="changeBg('#8affbe')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c8c0fb" onclick="changeBg('#c8c0fb')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #a3d3ff" onclick="changeBg('#a3d3ff')"></a> 
    </div>
`;
}

// 适应窗口大小
function winResize() {
    let box = document.querySelector('#changeBgBox')
    if (!box || box.classList.contains('min') || box.classList.contains('max')) return // 2023-02-10更新
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}