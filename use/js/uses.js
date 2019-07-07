$(function(){
        $.ajax({
            url:"json/package.json",
            success:function(data){
                for(var i=0;i<data.sy_list.length;i++) {
                    var arrText = doT.template($("#sy_asd").text());
                    $("#pic").html(arrText(data.sy_list));
                }
                var last_sy=data.sy_list[data.sy_list.length-1];
                console.log(last_sy)
                if(document.readyState === "complete"){
                    $(".jia-z").html('<span class="no-more">没有更多啦~</span>');
                }else{
                    $(".jia-z").html("向下拉加载更多");
                }
            }
        },"json")
    });
