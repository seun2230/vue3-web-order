# AWS-S3

## 개요 

### ✏️S3의 개념   
- AWS S3는 Amazon Simple Storage Service의 약자로 파일 서버의 서비스를 제공함.

### ✔️ S3의 특징
- 업로드된 파일을 HTTPS의 형태로 데이터 저장 및 추출함.

- 네트워크 트래픽 문제를 해결할 수 있음
- 저장할 수 있는 파일의 수가 제한이 없음
- 버전관리로 초보자도 쉽게 관리 가능함.
- 업로드된 파일에 ACL를 붙여서 접근 제한이 가능함.
- 5TB를 초과하지 않는 이미지, 문서, 바이너리 등 저장 가능함 **(단, 용량에 따라 비용을 지불)**

### 📝 S3 사용되는 용어
| 용어 | 설명 |
| :---: | --- |
| 객체 | 하나의 파일 |
| 버킷 | 객체를 담는 그릇으로 버킷의 고유한 이름으로 지정해야한다. |
| 글래시어 | - 비용 최적화가 가능하고 데이터를 저장하는 아마존의 스토리지 서비스 <br /> - (단 프리티어에 속하지 않으므로 비용이 발생함) |
| 정적 웹 호스팅 | - 자바스크립트, 이미지, 오디오 등 정적 콘텐츠가 포함된 웹사이트를 호스팅할 수 있음. <br /> - S3도 정적 웹 호스팅에 이용할 수 있음. |

<br /> 

## 📷 S3 업로드 성공 여부
<img src="https://user-images.githubusercontent.com/87456904/176202176-d0364a3a-5c12-484e-a175-3f23f1fd9a22.png" width="700" height="400" />

<br /> 

## 📂 MySQL 슬라이드 테이블 이미지 경로
- **v1 프로젝트에서 팀원분이 데이터 정규화와 무결성을 신경쓰시면서 테이블을 설계**하셨다.
- 서버 내려감과 동시에  RDBMS가 날아가면서 v2 프로젝트에서 **MySQL 테이블을 다시 설계**함
- **스태틱 서버로 로컬에 저장된 이미지 파일의 URL을 DB에 넣었음**.

<img src="https://user-images.githubusercontent.com/87456904/176202652-7dda4ff6-1d8d-4689-8da4-21f6ae120411.png" width="700"
height="200" />
