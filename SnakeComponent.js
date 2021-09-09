import React, { Component } from "react";
import "./snake.css";

class SnakeGame extends Component {
	render() {
		return (
			<div
				style={{
					display: "table-cell",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				<iframe
					id="scaled-frame"
					title="snake"
					src="../snak/index.html"
					height={500}
					width={500}
					style={{
						margin: "0px",
						border: "none",
						padding: "0px",
					}}
				></iframe>
			</div>
		);
	}
}

export default SnakeGame;
