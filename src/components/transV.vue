<template>
  <div class="transform-box">
    <el-transfer
      v-model="chooseRole"
      filterable
      :props="{
        key: 'value',
        label: 'label',
      }"
      :render-content="renderFunc"
      :titles="['待选角色列表', '已选角色列表']"
      :button-texts="['取消选择', '确定选择']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      target-order="push"
      @change="roleChange"
      :data="roleData"
      @right-check-change="choose"
    >
   <template #default={options}>
     <span>{{options.label}}333333333333</span>
     <span>
        <a> 上</a>
         <a  > 下</a>
     </span>
   </template>
    </el-transfer>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          label: `备选项 ${i}`,
          // disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      roleData: generateData(),
      chooseRole: [],
      renderFunc(h, option) {
        return (
          <span>
            <span>{option.label}</span>
            <i class="el-icon-edit"></i>
              <a> 上</a>
              <a > 下</a>
          </span>
        );
      },
      sort: "",
      item: "",
      index: "",
    };
  },
  methods: {
    //角色选择改变-监听穿梭框
   
    //右侧选中
    choose(value) {
      console.log(555, value);
      this.item = value;
    },
    //置顶事件
    handleTop(item, index) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let self = this;
      item = self.item;
      if (item.length == 1) {
        self.chooseRole.find((val, indexs, arr) => {
          if (val == item) {
            index = indexs;
          }
        });
        if (index == 0) {
          self.$message("没有上移的空间了");
          return;
        }
        //改变的数组
        let changeItem = JSON.parse(JSON.stringify(self.chooseRole[index]));
        self.chooseRole.splice(index, 1);
        self.chooseRole.splice(0, 0, changeItem);
      } else {
        self.$message.error("只能选择一条数据进行上下移动");
        return;
      }
    },
    //置顶事件
    handleBottom(item, index) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let self = this;
      item = self.item;
      if (item.length == 1) {
        self.chooseRole.find((val, indexs, arr) => {
          if (val == item) {
            index = indexs;
          }
        });
        if (index == self.chooseRole.length - 1) {
          self.$message("没有下移的空间了");
          return;
        }
        //改变的数组
        let changeItem = JSON.parse(JSON.stringify(self.chooseRole[index]));
        self.chooseRole.splice(index, 1);
        self.chooseRole.splice(self.chooseRole.length, 0, changeItem);
      } else {
        self.$message.error("只能选择一条数据进行上下移动");
        return;
      }
    },
    //上移事件
    handleUp(item, index) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let self = this;
      item = self.item;
      if (item.length == 1) {
        self.chooseRole.find((val, indexs, arr) => {
          if (val == item) {
            index = indexs;
          }
        });
        if (index == 0) {
          self.$message("没有上移的空间了");
          return;
        }
        //改变的数组
        let changeItem = JSON.parse(JSON.stringify(self.chooseRole[index - 1]));
        console.log(33, changeItem);
        self.chooseRole.splice(index - 1, 1);
        self.chooseRole.splice(index, 0, changeItem);
      } else {
        self.$message.error("只能选择一条数据进行上下移动");
        return;
      }
    },
    //下移事件
    handleDown(item, index) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let self = this;
      item = self.item;
      if (item.length == 1) {
        //选中值的下标
        self.chooseRole.find((val, indexs, arr) => {
          if (val == item) {
            index = indexs;
          }
        });
        if (index == self.chooseRole.length - 1) {
          // 这里是length-1,因为下标值从0开始
          self.$message("没有下移的空间了");
          return;
        }
        let changeItem = JSON.parse(JSON.stringify(self.chooseRole[index]));
        self.chooseRole.splice(index, 1);
        self.chooseRole.splice(index + 1, 0, changeItem);
      } else {
        self.$message.error("只能选择一条数据进行上下移动");
        return;
      }
    },
  },

};
</script>

<style>
.el-transfer-panel__item .el-checkbox__input {
  position: absolute;
  top: 8px;
  left: 30px;
}
.el-checkbox:last-of-type {
  margin-right: 30px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px 6px;
}
</style>
