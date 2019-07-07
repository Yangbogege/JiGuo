/**
 * @Author : 贾得姣
 * @Date : 2019/5/15
 * @Version : 1.0
 * @Last Modified by : name
 * @Last Modified time : 2019/5/15
 **/

/**
 * @体验报告json
 */
var indexNum = 0, allLen;//当前加载json页数，json长度
$("#report-btn").on("click",function(){
    var self = $(this);
    var param = '';//加载html变量
    self.addClass("loading").html("正在加载中");
    $.post("js/json.js",function(data){
        allLen = data.length;//获取json长度
        var data1 = data[indexNum];
        var dlen = data1.length;
        for(var j=0;j<dlen;j++){
            var thisd = data1[j];
            var img = thisd["img"];
            var text = thisd["text"];
            var uName=thisd["uName"];
            var sTime=thisd["sTime"];
            param+='<li><a href="../guid/detail.html"><img src="'+img+'" alt="" width="700" height="412"><div><p>'+text+'</p><div> <div><span></span><span>'+uName+'</span><span>'+sTime+'</span></div><div><span>3</span><span>3</span></div></div></div></a></li>'
        }
        self.parent().prev().append(param);
        indexNum++;

        if(indexNum>=allLen){
            self.parent().html('<span class="no-more">没有更多啦~</span>');
            indexNum = 0
        }else{
            self.removeClass("loading").html("点击加载更多");
        }
    },"json");
});