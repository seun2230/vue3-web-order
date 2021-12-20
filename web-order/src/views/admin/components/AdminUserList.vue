<template>
  <div class="container">
    <el-table
      ref="multipleTable"
      :data="foods"
      style="width: 100%">
      <el-table-column
        property="food_name"
        label="음식이름"
        show-overflow-tooltip
        width="120" />
      <el-table-column
        property="food_price"
        label="음식가격"
        width="90" />
      <el-table-column
        property="food_category"
        label="음식종류"
        width="90" />
      <el-table-column
        property="food_info"
        label="상세설명"
        show-overflow-tooltip />
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteRow(scope.$index)">
            Remove
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.prevent="modifyRow(scope.$index)">
            Modify
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>