# WEB-ORDER 

## 🔦 Description   
- 모바일 웹 주문 결제 시스템 페이지입니다.  
- `비대면 주문 방식의 수요 증가`와 `키오스크 설치의 비용 감소`를 위해 프로젝트 기획하였습니다.
- 기존의 WEB_ORDER_SYSTEM_V1 `결제 기능의 아쉬움과 리뷰의 UI/UX 개선`을 위해 개인적으로 진행합니다.
- 추가적으로 코드 리팩토링 및 기능 업데이트 필요성      

<br />   

## 🔧 Tools
<img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-round&logo=vue.js&logoColor=white"/> <img src="https://img.shields.io/badge/express-000000?style=flat-round&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-round&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Mysql-4479A1?style=flat-round&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-round&logo=amazonec2&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon S3-FF9900?style=flat-round&logo=amazons3&logoColor=white"/>  

<br />

## 📑프로젝트 PPT    

<br />

## ⏰ 프로젝트 개발 기간 
버전 | 기간| Git
-----|:----|:----
v1.0   | 2021년 10월 18일- 2021년 12월 27일 (총 2달) | [vue3-web-order](https://github.com/seun2230/web-order)
`v1.1` | 2022년 06월 3일 - 2022년 08월 1일(예정) | [vue3-web-order(refactor)](https://github.com/seun2230/vue3-web-order) 

<br />

<br />

## 📁 프로젝트 폴더 구조
- frontend와 backend를 독립적인 디렉터리로 구성하였습니다.

<img src="https://user-images.githubusercontent.com/87456904/175061014-84edcce7-039c-433b-af71-e6b30c6f362c.png" width="400" height="400" />

<br />

## 📙프로젝트 구조도 
<img src="https://user-images.githubusercontent.com/87456904/175069036-72926cc7-8351-4ae0-8c6f-a04d7e940f65.jpg" width="700" height="400" />

<br />

## 🗃️ MySQL-ERD 
- 기존 1.1 버전에서는 쿠폰 테이블을 추가했습니다.
- 추후 공지 테이블 추가 계획입니다.

<img src="https://user-images.githubusercontent.com/87456904/180354884-e4fa877c-a06c-4800-80a4-a4331ce9d0ac.png" width="700" height="400" />

<br />

## 💧 프로젝트 v1.1 기능 업데이트   
<br />

### 🍴메뉴 기능
| 페이지 |  설명 |
|:------:|:------|
| 메뉴 리스트 | - 메뉴 UI 개선 <br /> - 메뉴 리스트 별 메뉴 카테고리 세분화 <br /> - 상품의 리뷰 평점 반영 <br /> - 메뉴 상세 페이지로 메뉴 정보, 개별 상품 리뷰 분리. <br /> - 메뉴 상세 페이지의 장바구니 기능 연결, 장바구니 UI 개선 
| 메뉴 상세 페이지 | - 상품의 상세 정보와 상품에 해당하는 리뷰 페이지로 분리

<br />

### 📜리뷰 기능
| 페이지 | 기능 | 
|:------:|:------|
| 전체 리뷰 게시물 | - 리뷰 데이터 Vuex 관리 및 코드 리팩토링 <br /> - 리뷰 UI 개선 <br /> - 평점 차트 및 계산, 개별 상품 별점 반영 <br />  - 댓글, 좋아요 등 소셜 기능 구현
| 리뷰 상세 게시물 | - 댓글 Vuex 관리, 댓글 등록, 수정, 삭제 추가 <br /> - 댓글 페이징(보완 필요함)과 더보기 버튼 추가
| 리뷰 작성 페이지 | 리뷰 작성 UI 개선
| 상품 상세 리뷰 | 추후 추가 계획

<br />

### 🧑‍💻 관리자 페이지 
| 페이지 | 기능 | 
|:------:|:------|
| 쿠폰 관리 | - 쿠폰 업로드 폼과 쿠폰 리스트 관리

<br />

## 📝 일정 관리
| week | 설명 | 여부
|:------:|:------|:------:|
| 6월 1주 | 리뷰 UI 개선 | ✅
| 6월 2주 | - <span style="color:#00AAFF">BoardDetail 코드 리팩토링</span><br />- 리뷰 vuex store 관리 | ✅
| 6월 3주 | - 댓글 등록, 수정, 삭제 추가<br/>- 댓글 vuex store 관리 | ✅
| 6월 4주 | - 댓글 페이징 처리<span style="color:red">(보완 필요함)</span>, 리뷰 작성 <br /> - AWS S3 연동 <br /> |  ✅
| 6월 5주 | - 리뷰 차트 progress bar <br /> - 차트, 개별 게시물, 리뷰 작성, 개별 상품 별점 반영 및 평점 계산 <br /> - 주문 내역 이미지 추가 <br /> - 리뷰 전체 페이지 좋아요 버튼 추가<span style="color:red">(보완 필요함)</span><br /> | ✅
<br /> 

## 테스트
## 배포
## 참고
## 의견 