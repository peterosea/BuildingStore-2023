// Topmenu Close 버튼
var closeTopMenu, topMenu;
closeTopMenu = document.getElementById('close_topmenu');
topMenu = document.getElementById('top_menu');
if (topMenu){
  closeTopMenu.addEventListener('click', function() {
    console.log('confirmed');
    topMenu.style.height = '0px';
    topMenu.style.transition = 'height 0.5s';
    topMenu.addEventListener('transitionend', function() {
      topMenu.style.visibility = 'hidden';
    });
  });
}

// 네비게이션 배경
var submenu = document.querySelector(".menu_container");
var has_submenu = document.querySelectorAll("li.has_submenu");
var backboard = document.createElement("div");
backboard.setAttribute("class", "backboard");
submenu.appendChild(backboard);

for (i = 0; i < has_submenu.length; i++) {
  has_submenu[i].addEventListener("mouseenter", function(e) {
    backboard.classList.add("active");
  });
  has_submenu[i].addEventListener("mouseleave", function(e) {
    backboard.classList.remove("active");
  });
}

// 모바일메뉴
var mobileMenu = document.querySelector(".mobilemenu");
mobileMenu.addEventListener("click", function(e) {
  this.classList.toggle("active");
  if (window.screen.width > 768) {
    if(this.classList.contains('active')) {
      document.querySelector("body").style.overflow = 'hidden';
    } else {
      document.querySelector("body").style.overflow = 'auto';
    }
  }
});
window.addEventListener('resize', function(){
  mobileMenu.classList.remove("active");
}, false);


/////// 스크롤 올릴때 메뉴가 나타나도록
// 변수 설정
var header = document.querySelector('.primary_header');
var lastScrollY = 0;

// 스크롤 이벤트 핸들러
window.addEventListener('scroll', function() {
  // 현재 스크롤 위치 구하기
  var currentScrollY = window.scrollY;

  // 스크롤 방향 구하기
  var scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

  // 메뉴 상태 업데이트
  // if (window.screen.width <= 768) {
    if (scrollDirection === 'down') {
      if (currentScrollY > 100) {
        header.classList.add('hidden');
      }
    } else if (scrollDirection === 'up') {
      header.classList.remove('hidden');
      header.classList.add('fixed');
      if (currentScrollY <= 100) {
        header.classList.remove('fixed');
        header.classList.remove('hidden');
      }
    }
  // }

  // 스크롤 위치 업데이트
  lastScrollY = currentScrollY;
});

// 검색창 노출
var btn_search = document.querySelector('.open_search');
var search_popup = document.querySelector('.search_popup');
var search_close = document.querySelector('.search_close');

if(btn_search){
  btn_search.addEventListener('click', function(e){
    e.preventDefault;
    if(search_popup.classList.contains('active')) {
      search_popup.classList.remove('active');
    } else {
      search_popup.classList.add('active');
    }
  });
}

search_close.addEventListener('click', function(e){
  e.preventDefault;
  if(search_popup.classList.contains('active')) {
    search_popup.classList.remove('active');
  }
});


///////////// Custom Design SelectBox

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "selectbox": */
x = document.getElementsByClassName("selectbox");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;

  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);

  // 화살표 추가
  arrow_wrapper = document.createElement("DIV");
  arrow_wrapper.setAttribute("class", "arrow_wrapper");
  arrow = document.createElement("DIV");
  arrow.setAttribute("class", "arrow");
  
  arrow_wrapper.appendChild(arrow);
  x[i].appendChild(arrow_wrapper);

  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


////////// Custom Design Number Input

var increment = document.querySelector(".input-number-increment");
var decrement = document.querySelector(".input-number-decrement");
var inputNumber = document.getElementById("inputNumber");
var val;

if(increment) {
  increment.addEventListener("click", function(e) {
    val = parseInt(inputNumber.value, 10);
    val = val + 1;
    inputNumber.value = val;
  });
}
if(decrement) {
  decrement.addEventListener("click", function(e) {
    val = parseInt(inputNumber.value, 10);
    val = val - 1;
    inputNumber.value = val;
  })
}


