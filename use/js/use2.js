$(function(){
    var indexNum=0;
    var load = false;
$(window).scroll(function(){
    if (load) return;
    var scrollH=$(window).scrollTop();
    var screenH=$(window).height();
    var allBodyH=$(document).height();
    var footH=$("footer").height();
    console.log(scrollH+screenH,allBodyH-footH-100);
    if(scrollH+screenH>=allBodyH-footH-100){
        load = true;
        $.ajax({
            url:"json/use2.json",
            success: function(data) {
                  var allh= $("#pic").html();
                 for(var i=0;i<data.use2_arr.length;i++) {
                     var arrText = doT.template($("#sy_asd").text());
                     $("#pic").html(allh+arrText(data.use2_arr[i]));
                 }
                 indexNum++;
                 console.log(indexNum);
                load = false;
                if(indexNum>=data.use2_arr.length){
                    $(".jia-z").html("没有更多啦");
                    load = true;
                }else{
                    $(".jia-z").html("向下拉加载更多");
                }
             }
             },"json")
    }
})
});