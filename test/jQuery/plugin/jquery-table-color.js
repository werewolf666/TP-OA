/**
 author:gatsby
 date:2019-03-08 15:30
 example:
     <table>
     <tr>
     <td><input type="checkbox" class="ctl" onclick="kongzhi()" /></td>
     <td>序号</td><td>名称</td><td>价格</td><td>数量</td>
     </tr>
     <tr>
     <td><input type="checkbox" class="gd"/></td>
     <td>1</td><td>iphone</td><td>5000</td><td>20</td>
     </tr>
     <tr>
     <td><input type="checkbox" class="gd"/></td>
     <td>2</td><td>sumsung</td><td>4000</td><td>30</td>
     </tr>
     <tr>
     <td><input type="checkbox" class="gd"/></td>
     <td>3</td><td>huawei</td><td>3000</td><td>40</td>
     </tr>
     <tr>
     <td><input type="checkbox" class="gd"/></td>
     <td>4</td><td>nokia</td><td>2000</td><td>50</td>
     </tr>
     <tr>
     <td><input type="checkbox" class="gd"/></td>
     <td>5</td><td>htc</td><td>1000</td><td>60</td>
     </tr>
     </table>
 ------------------
 jquery code:
     $(function () {
               $('table').setTableColor('gray','lightblue');
            });
 */

//页面加载完成给表格设置颜色
//为jQuery添加setTableColor()方法
// jquery 可以调用init,fn,fn.extend成员
//$.fn.setTableColor=function(){}; //方法1 直接复制给fn
//$.fn.extend(setTableColor(){});//方法2 通过extend继承
$.fn.setTableColor=function(c1,c2){
    //this 代表jQuery对象
    this.find('tr:first').css('background-color',c1);
    this.find('tr:gt(0):odd').css('background-color',c2);
};