function LoadNAVBAR(){
    const allElements = document.getElementsByTagName( '*'); //모든 HTML 요소를 가져오기
    for(var i=0;i<allElements.length;i++){ //모든 요소들을 순회합니다.
        var el= allElements[i]; //현재 요소
    var navpath = el.getAttribute("nav-include-path"); //현재 요소의 "nav-include-path" 속성값 가져오기
    if(navpath) {
        var xhttp = new XMLHttpRequest(); //위가 성립이 됬다면 객체 생성
        xhttp.onreadystatechange = function () { //요청의 상태가 변경될 때마다 실행됨
            if (this.readyState == 4 && this.status == 200) {
                el.innerHTML = this.responseText; //요청이 완료 되었으면 현재 요소 내용을 HTML로 설정
                el.removeAttribute("nav-include-path"); // 처리가 완료ㅕ된 요소에서 nav-include-path 속성 제거
                LoadNAVBAR(); // 함수를 재귀적으로 호출함.
            }
        }
        xhttp.open("GET", navpath, true); //비동기적으로 GET 요청을 보냅니다.
        xhttp.send();
        return; // 함수 종료
    }
    }
}

// LoadFooter는 LoadNavbar와 비슷하지만, 웹페이지의 모든 요소를 순회하며, 푸터를 동적으로 로드하는 방식으로 짜봤습니다.
function LoadFooter() {
    const elements = document.querySelectorAll('[footer-include-path]'); // HTML만이 아닌 문서의 모든 요소를 가져옵니다.

    elements.forEach(function(el) {  // 각 요소에 대해 반복 처리합니다.
        const footerPath = el.getAttribute('footer-include-path'); // 요소에서 'footer-include-path' 속성의 값을 가져옵니다.
        if (footerPath) {
            const xhttp = new XMLHttpRequest();  // XMLHttpRequest 객체를 생성합니다.
            xhttp.onload = function() {
                if (this.status == 200) {  // 요소의 내용을 응답으로 설정합니다.
                    el.innerHTML = this.responseText;
                    el.removeAttribute('footer-include-path'); // 처리가 완료된 요소는 속성을 제거합니다.
                }
            };
            xhttp.open('GET', footerPath, true);   // 비동기적으로 GET 요청을 보냅니다.
            xhttp.send();
            return;
        }
    });
}