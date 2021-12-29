<template>
<div class="shopinfo-container">
    <div class="title-container">
      <div class="shop-title">
        BIT COOK
      </div>
      <div class="shop-loc">
        서울 서초구 서초대로74길 33
      </div>
    </div>
  <div class="body-container">
    <div class="shop-body">
      <div class="shop-subtitle">
        당신은 별 마디씩 이름을 어머니 무엇인지 있습니다.
      </div>
      <div class="shop-desc">
        이름과, 그러나 까닭이요, 무엇인지 위에도 다 했던 부끄러운 마디씩 듯합니다. 써 나의 너무나 별 밤을 무엇인지 없이 하나에 버리었습니다. 무엇인지 시와 계집애들의 청춘이 패, 하나에 말 마디씩 까닭입니다.
      </div>
      <div class="shop-img">
        <img src="@/assets/cook.jpg" />
      </div>
      <div class="shop-subtitle">
        파란 같이 위에 별 없이 <br />그러나 노루, 못 묻힌 있습니다.
      </div>
      <div class="shop-desc">
        별 언덕 내린 이름자 이런 멀리 있습니다. 이름과, 위에 하나에 패, 하나의 경, 하나에 그러나 내일 봅니다. 때 우는 아침이 다하지 하나에 거외다. 하늘에는 이름과, 릴케 보고, 것은 차 하나에 밤을 있습니다. 그러나 오는 시인의 하나에 나의 밤을 멀리 마디씩 이름을 있습니다.
      </div>
      <div class="shop-img">
        <img src="@/assets/table.jpg" />
      </div>
      <div class="shop-subtitle">
        아침이 내 별들을<br />오는 버리었습니다.
      </div>
      <div class="shop-desc">
        별이 다하지 묻힌 슬퍼하는 겨울이 듯합니다. 그리고 비둘기, 가을로 위에도 내일 이름과, 계십니다. 시와 하나의 지나고 쓸쓸함과 너무나 써 봅니다. 걱정도 가을 계절이 멀듯이, 별 아름다운 이런 아침이 사랑과 봅니다.
      </div>
      <div class="shop-img">
        <img src="@/assets/vegetable.jpg" />
      </div>
      <div class="shop-desc">
        피어나듯이 멀듯이, 없이 다 때 어머니, 있습니다. 이네들은 무덤 아직 다하지 아무 어머님, 있습니다. 별 않은 시와 이네들은 하나에 어머님, 듯합니다. 사랑과 봄이 아이들의 우는 별들을 거외다.
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
img {
  width: 100%;
  object-fit: cover;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.body-container {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.shop-desc {
  padding: 15px 0px;
  line-height: 140%;
}

.shop-subtitle {
  font-size: 1.3rem;
  font-weight: bold;
  padding: 20px 0px;
  line-height: 130%;
}

.shop-img {
  padding: 15px 0px 30px 0px;
  border-bottom: 1px solid lightgray;
}

.shop-title {
  padding: 15px 0px 3px 15px;
  font-size: 2.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: white;
}

.shop-loc {
  padding: 0px 0px 20px 15px;
  border-bottom: 1px solid lightgray;
  font-size: 0.8rem;
  color: white;
}

.title-container {
  background-color: black;
  margin: 0px;
  padding: 0px;
}

</style>
