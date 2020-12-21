import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import background from "../../img/background.jpg";

export class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			todo: ""
		};

		this.changeTodo = this.changeTodo.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}

	changeTodo(event) {
		this.setState({
			todo: event.target.value
		});
	}

	onKeyUp(event) {
		if (event.charCode === 13) {
			let { todo, todos } = this.state;
			this.setState({
				todo: "",
				todos: [...todos, todo]
			});
		}
	}

	addTodo() {
		let { todo, todos } = this.state;
		this.setState({
			todo: "",
			todos: [...todos, todo]
		});
	}

	removeTodo(index) {
		let { todos } = this.state;
		todos.splice(index, 1);
		this.setState({
			todos: todos
		});
	}

	render() {
		let { todo, todos } = this.state;
		return (
			<div className="container">
				<div className="background" />
				<h1>My day</h1>
				<h2 className="date">
					{new Date().toLocaleDateString("en-US")}
				</h2>
				<div className="form__group field">
					<input
						type="input"
						value={todo}
						onChange={this.changeTodo}
						onKeyPress={this.onKeyUp}
						className="form__field"
						placeholder="Press ENTER to put a element"
						name="name"
						id="name"
						required
					/>
					<label htmlFor="name" className="form__label">
						What do you have to do today?
					</label>
				</div>
				<ul>
					{todos.map((todo, index) => {
						return (
							<li key={index}>
								{todo}
								<span>
									<FontAwesomeIcon
										icon={faTimes}
										className="icon"
										onClick={this.removeTodo.bind(
											undefined,
											index
										)}
									/>
								</span>
							</li>
						);
					})}
				</ul>
				<footer className="counter">
					{todos.length} item
					{todos.length > 1 || todos.length === 0 ? "s" : null} left
				</footer>
			</div>
		);
	}
}
