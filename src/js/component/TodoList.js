import React, { useState, useEffect, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import background from "../../img/background.jpg";

export const ToDoList = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([{ label: "", done: false }]);

	const handleChange = event => {
		setTask(event.target.value);
	};

	useEffect(() => {
		getList();
	}, []);

	const getList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardo")
			.then(res => res.json())
			.then(response => {
				console.log("resp", response);
				setList(response);
			});
	};

	const updateList = newList => {
		console.log("list", newList);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardo", {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(newList)
		})
			.then(res => res.json())
			.then(response => {
				getList();
				// console.log(response);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleSubmit = event => {
		event.preventDefault();

		if (task.length !== 0) {
			updateList(list.concat({ label: task, done: false }));
			setTask("");
		} else {
			alert("Insert your task");
		}
		// console.log(list);
	};

	const removeTodo = deleteIndex => {
		// const newTodos = [...list];
		// newTodos.splice(index, 1);

		updateList(list.filter((item, index) => index !== deleteIndex));
	};
	// updateList();

	return (
		<div className="container">
			<div className="background" />
			<h1>My Day</h1>
			<h2 className="date">{new Date().toLocaleDateString("en-US")}</h2>
			<form onSubmit={handleSubmit} className="form__group field">
				<input
					type="input"
					value={task}
					onChange={handleChange}
					className="form__field"
					placeholder="Press ENTER to put a element"
					name="name"
					id="name"
					required
				/>
				<label htmlFor="name" className="form__label">
					Today, I have to...
				</label>
			</form>
			<ul className="px-0">
				{list.map((item, index) => {
					return (
						<li key={index}>
							I have to&nbsp;
							{item.label}
							<span>
								<FontAwesomeIcon
									icon={faTimes}
									className="icon"
									onClick={removeTodo}
								/>
							</span>
						</li>
					);
				})}
			</ul>
			<footer className="counter">
				{list.length} item
				{list.length > 1 || list.length === 0 ? "s" : null} left
			</footer>
		</div>
	);
};

export default ToDoList;
