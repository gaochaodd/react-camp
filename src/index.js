'use strict';

import React from 'react';
import ReactDOM from 'react-dom'
import style from './index.css'

const TodoBox = React.createClass({
    getInitialState: function () {
        return {
            data: [
                {"id": 1, "task": "学习react", "isComplete": "false"},
                {"id": 2, "task": "学习node", "isComplete": "false"},
                {"id": 3, "task": "睡觉", "isComplete": "true"},
                {"id": 4, "task": "完成开源项目", "isComplete": "false"},
                {"id": 5, "task": "项目开发", "isComplete": "true"},
            ]
        };
    },

    // 根据id删除一项任务
    handleTaskDelete: function (taskId) {
        let data = this.state.data;
        data = data.filter(function (task) {
            return task.id !== taskId;
        });
        this.setState({data});
    },

    // 切换一项任务的完成状态
    handleToggleComplete: function (taksId) {
        let data = this.state.data;
        for (let i in data) {
            if (data[i].id === taksId) {
                data[i].isComplete = data[i].isComplete === "true" ? "false" : "true";
                break;
            }
        }
        this.setState({data});
    },

    // 给新增的任务一个随机的id
    generateId: function () {
        let data = this.state.data;
        return data[data.length-1].id + 1
    },

    // 新增一项任务
    handleSubmit: function (task) {
        let data = this.state.data;
        let id = this.generateId();
        let complete = "false";
        data = data.concat([{"id": id, "task": task, "isComplete": complete}]);
        this.setState({data});
    },

    render: function () {
        let statistics = {
            // 统计任务总数及完成的数量
            todoCount: this.state.data.length || 0,
            todoCompleteCount: this.state.data.filter(function (item) {
                return item.isComplete === "true";
            }).length
        };

        return (
            <div className={style.todoBox}>
                <h2 className={style.todoHeader}>任务列表</h2>
                <TodoList data={this.state.data}
                          deleteTask={this.handleTaskDelete}
                          toggleComplete={this.handleToggleComplete}
                          todoCount={statistics.todoCount}
                          todoCompleteCount={statistics.todoCompleteCount}/>
                <TodoForm submitTask={this.handleSubmit}/>
            </div>
        )
    }
});

let TodoList = React.createClass({
    render: function () {
        let taskList = this.props.data.map(function (listItem) {
            return (
                <TodoItem
                    taskId={listItem.id}
                    key={listItem.id}
                    task={listItem.task}
                    isComplete={listItem.isComplete}
                    deleteTask={this.props.deleteTask}
                    toggleComplete={this.props.toggleComplete}/>
            )
        }, this);

        return (
            <ul className={style.todoList}>
                {taskList}
                <TodoFooter todoCount={this.props.todoCount} todoCompleteCount={this.props.todoCompleteCount}/>
            </ul>
        );
    }
});

let TodoItem = React.createClass({
    toggleComplete: function () {
        this.props.toggleComplete(this.props.taskId);
    },

    deleteTask: function () {
        this.props.deleteTask(this.props.taskId);
    },

    // 鼠标移入显示删除按钮
    handleMouseOver: function () {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
    },

    handleMouseOut: function () {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
    },

    render: function () {
        let task = this.props.task;
        let itemChecked;
        if (this.props.isComplete === "true") {
            task = <s>{task}</s>;
            itemChecked = true;
        } else {
            itemChecked = false;
        }

        return (
            <li className={style.todoItem}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}>
                <input id={this.props.taskId} type="checkbox" checked={itemChecked} onChange={this.toggleComplete}/>
                <label htmlFor={this.props.taskId}>{task}</label>
                    <button type="button" className={style.deleteBtn} onClick={this.deleteTask} ref="deleteBtn">删除
                    </button>
            </li>
        );
    }
});

let TodoFooter = React.createClass({
    render: function () {
        return (
            <li className={style.todoItem}>{this.props.todoCompleteCount}已完成 / {this.props.todoCount}总数</li>
        )
    }
});

let TodoForm = React.createClass({
    submitTask: function (e) {
        e.preventDefault();
        let task = ReactDOM.findDOMNode(this.refs.task).value.trim();
        if (!task) {
            return;
        }
        this.props.submitTask(task);
        ReactDOM.findDOMNode(this.refs.task).value = "";
    },

    render: function () {
        return (
            <div>
                <form onSubmit={this.submitTask}>
                    <div className={style.todoFooter}>
                            <input type="text" id="task" ref="task" className={style.todoInput}
                                   placeholder="你想做点什么"></input>
                        <div className={style.submitBar}>
                            <input type="submit" value="记录任务" className={style.submitBtn}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});

ReactDOM.render(
    <TodoBox />,
    document.getElementById('root')
);