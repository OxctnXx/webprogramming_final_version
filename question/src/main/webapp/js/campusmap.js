function resizeParent() {
  const parent = document.getElementById("frame-2");
  const aspectRatio = window.innerWidth / window.innerHeight;

  // 90vw와 90vh 중에서 aspectRatio에 따라 width와 height를 조정
  if (aspectRatio > 1) {
    // 가로가 세로보다 큰 경우: width = 90vw, height = auto
    parent.style.width = "90vw";
    parent.style.height ="90vh"; // height를 비율에 맞게 설정
  } else {
   
    parent.style.height =`${(aspectRatio*90)}vw`;
    parent.style.width = "90vw"; // width를 비율에 맞게 설정
  }
}

// 창 크기 변경 시 조정
window.addEventListener("resize", resizeParent);

// 페이지 로드 시 초기 크기 설정
resizeParent();

//------여기까지가 화면 크기조절
var dataArray = [//name, jpg, text
    ["팔정도", "img/m1.jpg", "학교 중앙 광장. 동상이 있다."],//0
    ["본관", "img/m2.jpg", "본관이다. 5층짜리다."],
    ["명진관", "img/m3.jpg", "팔정도 근처에 있다. 가장 먼저 지어진 건물이다."],
    ["과학관", "img/m4.jpg", "주로 실습수업을 진행한다."],
    ["다향관", "img/m5.jpg", "다향관이다."],
   ["상록원", "img/m6.jpg", "식당이다. 2층도 식당이 있다."],
     ["법학관/만해관/교수회관", "img/m7.jpg", "법과대학과 불교대학이 사용하는 건물이다."],
    ["중앙도서관", "img/m8.jpg", "도서관이다. 서점에서 책을 살수도 있다."],
   ["사회과학관/경영관", "img/m9.jpg", "사회과학관은 사회과학대생이 주로 사용하고, 경영관은 경영대생이 주로 사용한다."],
   ["문화관", "img/m10.jpg", "예술대생이 주로 사용한다."],
    ["학술관", "img/m11.jpg", "학술관이다."],
   ["혜화관", "img/m12.jpg", "혜화관이다."],
    ["학림관", "img/m13.jpg", "사범대생이 주로 이용한다."],
    ["계산관", "img/m14.jpg", "계산관이다."],
   ["원흥관", "img/m15.jpg", "공대생이 주로 이용한다."],
  ["신공학관", "img/m16.jpg", "공대생이 주로 이용한다. 1층가면 나오는길이랑 식당이 있다."],
  ["정보문화관", "img/m17.jpg", "P동과 Q동으로 나뉜다."],
   ["학생회관", "img/m18.jpg", "학생회관이다. 동아리방이 많다."],
  ["정각원", "img/m19.jpg", "절이다."],

  ["대운동장", "img/m21.jpg", "정문과 가까운 운동장이다."],
  ["정문", "img/m22.jpg", "보통 차량이 많이 지나다닌다."],
  ["중문(혜화문)", "img/m23.jpg", "혜화관과 가까운 문이다."],
  ["후문", "img/m24.jpg", "후문이다."],
  ["신공학관 통로", "img/m25.jpg", "충무로역에서 가깝다. 여기로 들어가면 신공학관이 바로 나온다. 들어가서 엘리베이터 타고 9층으로 나오면 중앙도서관과 가깝다."],
  ["만해광장", "img/m20.jpg", "만해광장이다."],
  ["체육관", "img/m26.jpg", "체육관이다."],
  ["동대입구역", "img/subway.jpg", "동대입구역 6번출구."]
  
       
];

var pathdataArray = [//name, jpg, text
    ["혜화관엘베", "", "혜화관에서 엘리베이터 타고 4층가면 오르막길 안오르고 팔정도까지 갈 수 있다."]
    //["path 1", "icon1.jpg", "This is the description for path 1."],
    //["path 2", "icon2.jpg", "This is the description for path 2."],
    //["path 3", "icon3.jpg", "This is the description for path 3."]
];

// 툴팁 요소 선택
var tooltip = document.getElementById("tooltip");


var descname = document.getElementById("descname");
var desctext = document.getElementById("desctext");
var descimg = document.getElementById("descimg");



// 모든 아이콘에 대해 마우스 호버 이벤트 추가
for (let i = 0; i < dataArray.length; i++) {
    (function(index) {
        // 아이콘 요소
        var icon = document.getElementById("icon" + index);
       
        // 마우스 오버 시 툴팁 띄우기
        icon.addEventListener("mouseenter", function(event) {
            
            
            // 배열에서 정보 가져오기
            var name = dataArray[index][0];
            var img = dataArray[index][1];
            var description = dataArray[index][2];

            // 툴팁 내용 업데이트
            tooltip.innerHTML = `
               <strong>${name}</strong><br><br>
                <img src="${img}" alt="${name}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 5px;"><br><br>
               ${description}
        `;


          descname.textContent=name;
          desctext.textContent=description;
          descimg.src = img;
    
              
          tooltip.style.display = "block";

        
          tooltip.style.left = event.pageX + "px"; // 마우스 X 좌표
          tooltip.style.top = event.pageY - tooltip.offsetHeight - 10 + "px"; // 마우스 Y 좌표에서 툴팁 높이만큼 위로
           
        });

        // 마우스 아웃 시 툴팁 숨기기
        icon.addEventListener("mouseleave", function() {
            tooltip.style.display = "none"; // 툴팁 숨기기
        });
    })(i);

    
}

for (let i = 0; i < pathdataArray.length; i++) {
    (function(index) {
        // 아이콘 요소
        var icon = document.getElementById("path" + index);
       
        // 마우스 오버 시 툴팁 띄우기
        icon.addEventListener("mouseenter", function(event) {
            
            
            // 배열에서 정보 가져오기
            var name = pathdataArray[index][0];
            var img = pathdataArray[index][1];
            var description = pathdataArray[index][2];

            // 툴팁 내용 업데이트
            if(pathdataArray[index][1]!="")
            {
              tooltip.innerHTML = `
                <strong>${name}</strong><br>
                 <img src="${img}" alt="${name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"><br>
                 ${description}
             `;
            }
            else
            {
              tooltip.innerHTML = `
                <strong>${name}</strong><br><br>
                 
                 ${description}
             `;
            }

           


          descname.textContent=name;
          desctext.textContent=description;
          descimg.src = img;
          

          tooltip.style.display = "block";

        
          tooltip.style.left = event.pageX + "px"; // 마우스 X 좌표
          tooltip.style.top = event.pageY - tooltip.offsetHeight - 10 + "px"; // 마우스 Y 좌표에서 툴팁 높이만큼 위로
           
        });

        // 마우스 아웃 시 툴팁 숨기기
        icon.addEventListener("mouseleave", function() {
            tooltip.style.display = "none"; // 툴팁 숨기기
        });
    })(i);

    
}



//--------여기까지가 마커 정보 보여주는 코드



const mapContainer = document.getElementById("map-container");
const mapImage = document.getElementById("map-image");


let scale = 1; // 초기 줌 레벨
let currentX = 0; // 이미지의 현재 X 위치
let currentY = 0; // 이미지의 현재 Y 위치
let isDragging = false;
let startX, startY;

// 드래그 제한
function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}
mapImage.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
// 줌/드래그 동작 시 위치 업데이트
function updateImagePosition() {
  const rect = mapImage.getBoundingClientRect();
  const containerRect = mapContainer.getBoundingClientRect();

  // 드래그 제한 계산
  const minX = containerRect.width - rect.width * scale;
  const minY = containerRect.height - rect.height * scale;
 

  // 위치 및 크기 적용
  mapImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
  for (let i = 0; i < dataArray.length; i++) {
    (function(index) {
        // 아이콘 요소
        var icon = document.getElementById("icon" + index);
        icon.style.transform = `scale(${1/scale})`;
    })(i);
  }
    for (i = 0; i < pathdataArray.length; i++) {
      (function(index) {
          // 아이콘 요소
          
          var pat = document.getElementById("path" + index);
          pat.style.transform = `scale(${1/scale})`;
      })(i);
  }
}

// 드래그 이벤트
mapContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  mapContainer.style.cursor = "grabbing";
});

mapContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  updateImagePosition();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  mapContainer.style.cursor = "grab";
});

// 줌 이벤트
mapContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
    
  const zoomSpeed = 0.001;
  scale += e.deltaY * -zoomSpeed;
  scale = Math.min(Math.max(0.6, scale), 4); // 줌 제한: 최소 1배, 최대 3배
    
  updateImagePosition();

  
});


//------여기까지가 지도 기능 코드