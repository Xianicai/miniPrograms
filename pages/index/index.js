//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    todo: "",
    todolist: [],
    // 未完成个数
    unfinished: 0,
    // 所有
    alltodo: [],
    // 当前列表是点击哪个按钮 1：所有，2：待办，3：已完成
    clickType: 0,


  },
  //input输入事件
  todoInput: function (e) {
    var todo = this.data.todo
    this.setData({ todo: e.detail.value });
  },
  // add 点击事件处理
  addtodo: function () {
    if (this.data.todo.trim().length == 0)
      return;
    // 添加数据
    var todolist = this.data.todolist;
    var alltodo = this.data.alltodo;
    var unfinished = this.data.unfinished;
    const newTodo = {
      name: this.data.todo,
      completed: false
    };
    unfinished++;
    //如果在点击已完成按钮，添加的新计划不在已完成列表显示
    if (!(this.data.clickType == 3)) {
      todolist.push(newTodo);
    }
    alltodo.push(newTodo);
    this.setData({
      todolist,
      todo: "",
      unfinished,
      alltodo
    });

  },
  // 所有按钮的点击事件
  allToDo: function () {
    this.data.clickFinished = false;
    var todolist = this.data.todolist;
    var alltodo = this.data.alltodo;
    var clickType = this.data.clickType;
    this.setData({
      todolist: alltodo,
      clickType: 1,
    });
  },
  // 待办按钮的点击事件
  unfinishedToDo: function () {
    this.data.clickFinished = false;
    var unfinishedtodo = [];
    var todolist = this.data.todolist
    var alltodo = this.data.alltodo;
    var clickType = this.data.clickType;
    for (var i = 0; i < alltodo.length; i++) {
      if (!alltodo[i].completed) {
        unfinishedtodo.push(alltodo[i]);
      }
    }
    this.setData({
      todolist: unfinishedtodo,
      clickType: 2,
    });
  },
  // 已完成按钮的点击事件
  finishedToDo: function () {
    var finishedtodo = [];
    var todolist = this.data.todolist
    var alltodo = this.data.alltodo;
    var clickType = this.data.clickType;
    this.data.clickFinished = true;
    for (var i = 0; i < alltodo.length; i++) {
      if (alltodo[i].completed) {
        finishedtodo.push(alltodo[i]);
      }
    }
    this.setData({
      todolist: finishedtodo,
      clickType: 3,
    });
  },
  // 左面图标的点击事件
  iconLeft: function (e) {
    var todolist = this.data.todolist;
    var alltodo = this.data.alltodo;
    var id = e.currentTarget.id;
    todolist[id].completed = !todolist[id].completed;
    alltodo[id].completed = !alltodo[id].completed;
    var unfinished = this.data.unfinished;
    // 选中事件对X个待完成现实的影响
    if (todolist[id].completed) {
      unfinished--;
    } else {
      unfinished++;
    }
    this.setData({
      todolist,
      unfinished,
    });
    // 如果是在待办列表当中和已完成列表，点击左面图标，当前数据从当前列表移除
    // if (this.data.clickType > 1) {
    //   todolist.splice(id, 1);
    // }
  },
  // 右面图标的点击事件
  iconRight: function (e) {
    // 这个方法也可以；
    // var index = parseInt(e.currentTarget.dataset.index);
    // console.log("index" + index);
    var id = e.currentTarget.id;
    var todolist = this.data.todolist;
    var alltodo = this.data.alltodo;
    var unfinished = this.data.unfinished;
    // 删除【所有】列表中的数据
    for (var i = 0; i < alltodo.length; i++) {
      if (alltodo[i].name == todolist[id].name) {
        //如果删除的是未完成计划，待办事件减1
        console.log(alltodo[i]);
        if (!alltodo[i].completed) {
          unfinished--;
        }
        alltodo.splice(i, 1);
      }
    }
    // 删除【当前】列表中的数据
    todolist.splice(id, 1);
    this.setData({
      todolist,
      unfinished,
      alltodo,
    });
  },



  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
