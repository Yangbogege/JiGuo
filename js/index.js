/**
 * @Author : 贾得姣
 * @Date : 2019/5/13
 * @Version : 1.0
 * @Last Modified by : name
 * @Last Modified time : 2019/5/13
 **/
/*--------热门试用-------------*/
$.ajax({
    url: "./json/hotBox.json",
    dataType: 'json',
    success: function (data) {
        //dot.js 模板引擎
        var sy_ = doT.template($('#hot').text());
        $('#list').html(sy_(data));
    }
});
/*------------报告精选--------------*/
$.ajax({
    url: "./json/reportBox.json",
    dataType: 'json',
    success: function (data) {
        //dot.js 模板引擎
        var sy_ = doT.template($('#report').text());
        $('#r_list').html(sy_(data));
    }
});
/*-------------导购精选----------------*/
$.ajax({
    url: "./json/guideBox.json",
    dataType: 'json',
    success: function (data) {
        //dot.js 模板引擎
        var sy_ = doT.template($('#guide').text());
        $('#g_list').html(sy_(data));
    }
});
/*---------------发现酷玩---------------*/
$.ajax({
    url: "./json/playBox.json",
    dataType: 'json',
    success: function (data) {
        //dot.js 模板引擎
        var sy_ = doT.template($('#play').text());
        $('#p_list').html(sy_(data));
    }
});

/*-----------------------轮播动画--------------------*/

var timer = null;
var num = 0;

function run() {
    $('#list').animate({
        'marginLeft': -1080
    }, 2000, function () {
        $('#list li').slice(0, 4).appendTo('#list');
        $('#list').css('margin-left', '0px');
    });

}

timer = setInterval(run, 4000);

$('#left,#right').on('mouseenter', function () {
    clearInterval(timer);
    var pao = true;
    $('#right').on('click', function (e) {
        e = e || event;
        e.preventDefault();
        if(!pao){
            return
        }else if (pao) {
            pao = false;
            $('#list').animate({
                'marginLeft': -1080 + 'px'
            }, 2000, function () {
                $('#list li').slice(0, 4).appendTo('#list');
                $('#list').css('margin-left', '0px');
                pao = true;
            });
        }
    });
    $('#left').on('click', function (e) {
        e = e || event;
        e.preventDefault();
        if(!pao){
            return
        }else if (pao) {
            pao = false;
            $('#list li').slice(-4).prependTo('#list');
            $('#list').css('margin-left', -1080);
            $('#list').animate({
                'marginLeft': '0px'
            }, 2000, function () {
                pao = true;
            });
        }
    });
});
$('#left,#right').on('mouseleave', function () {
    timer = setInterval(run, 2000);
});


/*--------------返回顶部----------------*/
var back = document.getElementById('to_top');
document.onscroll = function () {
    var top = document.documentElement.scrollTop;
    if (top >= 200) {
        back.style.display = 'block';
    } else {
        back.style.display = 'none';
    }
};
back.onclick = function () {
    var timer = null;
    timer = setInterval(function () {
        //越往上越慢
        var y = document.documentElement.scrollTop / 5;
        document.documentElement.scrollTop -= y;
        if (document.documentElement.scrollTop == 0) {
            clearInterval(timer);
        }
    }, 100)
};
/*---------------酷玩--------------------*/
$(function () {
    /**
     * @首页酷玩&&&酷玩页面json
     */
    var indexNum = 0, allLen;//当前加载json页数，json长度
    $(".playMore span").click(function () {
        var self = $(this);
        var param = '';//加载html变量
        self.addClass("loading").html("正在加载中");
        $.post("json/json.js", function (data) {
            allLen = data.length;//获取json长度
            var data1 = data[indexNum];
            var dlen = data1.length;
            for (var j = 0; j < dlen; j++) {
                var thisd = data1[j];
                var img = thisd["img"];
                var text = thisd["text"];
                var price = thisd["price"];
                param += '<li><a href="use/detail.html"><img src="' + img + '" alt="" width="220" height="130"><p>' + text + '<span></span></p> <div> <span>' + price + '</span> <div> <span>3</span> <span>3</span> </div> </div> </a> </li>';
            }
            self.parent().prev().append(param);
            indexNum++;
            if (indexNum >= allLen) {
                self.parent().html('<span class="no-more">没有更多啦~</span>');
                indexNum = 0
            } else {
                self.removeClass("loading").html("点击加载更多");
            }
        }, "json");
    });

});