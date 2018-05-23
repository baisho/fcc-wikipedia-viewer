var result = document.getElementsByClassName("result")[0];

var style = document.getElementsByClassName("mainTitle__text")[0].style;

var pageContainer = document.getElementsByClassName("page-container")[0].style;

document
    .getElementsByClassName("searchbox__typebox")[0]
    .addEventListener("keypress", function (event) {
        var key = event.which || event.keyCode;
        if (key === 13) {
            loadDoc();
        }
    });

function clearBox(elementClass) {
    document.getElementsByClassName(elementClass)[0].innerHTML = "";
}

function getSearchword() {
    var x = document.getElementsByClassName("searchbox__typebox")[0].value;
    clearBox("result");
    return x;
}

function loadDoc() {
    var sWord = getSearchword();
    if (sWord == "") {
        result.insertAdjacentHTML(
            "beforeend",
            '<p class="result__errorMessage flexbox--center">It seems like you haven&#39;t typed any keywords.</p>'
        );
        style.margin = "2rem 0rem";
        return;
    } else {
        var gettingJson = new XMLHttpRequest();
        gettingJson.open(
            "GET",
            "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
            getSearchword() +
            "&utf8=&format=json&origin=*"
        );
        gettingJson.onload = function () {
            var myJson = JSON.parse(gettingJson.responseText);
            if (myJson.query.searchinfo.totalhits == 0) {
                result.insertAdjacentHTML(
                    "beforeend",
                    '<p class="result__errorMessage flexbox--center">Sorry, we couldn&#39;t find any results for your search.<br>Please try other keywords.</p>'
                );
                style.margin = "2rem 0rem";
            } else {
                inject(myJson);
            }
        };
        gettingJson.send();
    }
}

function inject(data) {
    var htmlString = "";

    for (i = 0; i < data.query.search.length; i++) {
        var title = data.query.search[i].title;

        var snippet = data.query.search[i].snippet;

        htmlString +=
            '<div class="result__itemOuter"><a href="https://en.wikipedia.org/wiki/' +
            title +
            '" target="_blank" class="link link__result"><div class="result__item"><h3 class="result__title">' +
            title +
            '</h3><p class="result__text">' +
            snippet +
            "...</p></div></a></div>";
    }
    result.insertAdjacentHTML("beforeend", htmlString);
    resizer();
}

function resizer() {
    var sh = document.documentElement.scrollHeight;
    var h = window.innerHeight;
    if (sh > h) {
        style.margin = ".75rem 0rem";
    }
}
