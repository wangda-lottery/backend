/**
 * 公共函数组件，安装到Vue全局对象。
 */
exports.install = function (Vue, options) {
  Vue.prototype.copyData = function (data){
    let self = this;
    this.$copyText(data).then(function (e) {
      self.$message.success(`复制成功: ${data}`);
    }, function (e) {
      self.$message.error(`复制失败：${data}`);
    });
  };
};
