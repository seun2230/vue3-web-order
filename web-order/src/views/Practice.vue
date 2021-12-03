<template>
  <el-row
    type="flex"
    justify="center">
    <el-col>
      <!-- 상단 타이틀 -->
      <el-row
        class="content-top-margin"
        type="flex"
        justify="center">
        <el-col :span="1">
          <i
            class="el-icon-back"
            @click="cancel"></i>  <!--뒤로가기 아이콘-->
        </el-col>

        <el-col :span="16">
          <span>일기 작성</span>
        </el-col>
      </el-row>    
      <!-- /상단 타이틀 끝-->

      <!-- 하단 입력부 -->
      <el-row
        type="flex"
        justify="center">
        <el-col :span="18">
          <el-divider /> <!--경계선-->

          <el-row>
            <el-col
              :span="24"
              class="content-area">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="demo-ruleForm">
                <el-form-item
                  label="제목"
                  prop="title">
                  <!-- 제목 입력 -->
                  <el-input v-model="ruleForm.title" />
                </el-form-item>
            
                <el-form-item
                  label="날씨"
                  prop="weather">
                  <!-- 날씨 선택 -->
                  <el-radio-group v-model="ruleForm.weather">
                    <el-radio-button label="sunny">
                      <i class="el-icon-sunny"></i>
                    </el-radio-button>
                    <el-radio-button label="cloudy">
                      <i class="el-icon-cloudy"></i>
                    </el-radio-button>
                    <el-radio-button label="heavy-rain">
                      <i class="el-icon-heavy-rain"></i>
                    </el-radio-button>
                    <el-radio-button label="light-rain">
                      <i class="el-icon-light-rain"></i>
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item
                  label="기분"
                  prop="feel">
                  <!-- 기분 선택 -->
                  <el-select
                    v-model="ruleForm.feel"
                    placeholder="기분을 선택하세요">
                    <el-option
                      label="기쁨"
                      value="기쁨" /> 
                    <el-option
                      label="우울"
                      value="우울" />
                    <el-option
                      label="화남"
                      value="화남" />
                  </el-select>
                </el-form-item>
                          
                <el-form-item
                  label="내용"
                  prop="content">
                  <!-- 내용 입력 -->
                  <el-input
                    type="textarea"
                    v-model="ruleForm.content"
                    :rows="10" />
                </el-form-item>

                <el-form-item class="submit">
                  <!--버튼 가운데 정렬-->
                  <el-button
                    type="primary"
                    @click="save('ruleForm')">
                    저장
                  </el-button>  <!-- 저장 버튼 -->
                  <el-button @click="cancel">
                    취소
                  </el-button>   <!-- 취소 버튼(목록가기) -->
                </el-form-item>
              </el-form>          
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 하단 입력부 끝 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

</style>