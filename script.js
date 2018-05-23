
document.getElementById("searchbox__btn").addEventListener("click", getSearchword());


function getSearchword() {
    var x = document.getElementsByClassName("searchbox__typebox")[0].value;
    console.log(x);
}


/*var y = document.getElementById('searchbox__btn');
if (y) {
    y.onclick = getSearchword();
}*/