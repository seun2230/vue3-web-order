# 2022-WEB-ORDER-v2

## ⚙️개발 환경 설치 / 시작
<br/>

      // 해당 폴더 접속
      cd backend
      // npm 패키지 설치
      npm install 
      // 개발 모드 프로그램 실행
      npm start 
<br/>

## 🔦AWS EC2

### 특징
1. 사용자에게 유연한 웹서비스를 제공함.

2. 컴퓨터 작업이 많이 필요하기에 가상서버가 적합함.
3. 유연한 스토리지, RDS 통합 가능함
4. 인스턴스 일시 중지로 과금 최소화

<br/>

### AWS EC2 구축 방법 
 1. 인스턴스 생성 (HVM 우분투 이용)
 2. Puttygen을 통해 key.pem 파일을 key.ppk파일로 변경한다. 
 
 3. [putty 시작] session과 ssh > auth를 설정한다.
    
 4. 터미널 실행 후 인스턴스 접속,
  `우분투 로그인 기본 계정은 ubuntu로 접속`한다.
  
    ```bash
    $ ssh -i [key path] ubuntu@[public DNS]
    ```

 5. node, git, http 설치

    ```bash
    // 패키지 인덱스 정보 업데이트
    $ sudo apt-get update
    
    // 패키지 설치
    $ sudo apt-get install nodejs 
    $ sudo apt-get install npm
    $ sudo apt-get install git

    // 패키지 관리
    $ git [패키지] --verison

    $ cd ~/.ssh

    // ssh-keygen을 통해 공개키 생성
    $ ssh-keygen -t rsa -C [git 계정 메일] 

    // 공개키로 소유자, 외부인도 읽음.
    $ cat id_rsa.pub 
    
    // ssh 키 출력되면 복사해서 git 원격 저장소 등록
    
    $ git clone [url]
    // public repo -> $ git clone git@[git 저장소]
    // private repo -> $ git clone https://아이디:비밀번호@[git 저장소]

    ```

  
  5. 탄력적 IP 설정
  - 생성한 인스턴스와 IP 연결 버튼 클릭한다.

<br/>

### ✏️탄력적IP(Elastic IP) 주소 
- 가상서버를 시작하거나 정지할 때마다 공인IPv4주소가 변경되는 점을 인지함.

- 고정공인주소를 할당하는 `탄력적IP(Elastic IP)주소`를 사용한다.

<br>

### ⭐탄력적IP 요금 발생 주의
- 인스턴스를 모두 종료해도 `고정적인IP를 사용`하고 있기 때문에 요금이 발생된다.

- `IPv4주소는 부족`하기 때문에 AWS 서버는 연결되지 않은 IP 주소 비용을 청구한다.

- `사용하지 않는 탄력적IP`는 비용이 발생되므로 릴리스 `제거를 해야 추가 비용이 발생하지 않는다.`

