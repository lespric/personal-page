function openwindow(){
    var written = document.getElementById("written");
    //获取弹窗的板块
    var finish=document.getElementsByClassName("finish")[0];
    //获取弹窗中的完成按钮
    var close=document.getElementsByClassName("close")[0];
    //获取弹窗中的关闭按钮
    written.style.display = "block";
    //窗体弹出

    finish.onclick=function(){
        written.style.display = "none";
    } //点击完成后，窗体消失

    close.onclick=function(){
        written.style.display = "none";
    } //点击关闭后，窗体消失

    window.onclick = function(event) {
        if (event.target == written) written.style.display = "none";
    } //点击其他区域，窗体消失
}
