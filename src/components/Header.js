import React from "react";
import styled from "styled-components";
import { Header, Icon, Search } from "semantic-ui-react";

const Wrapper = styled.div`
	z-index: 2;
	background: #fff;
	grid-column-start: 3;
	grid-column-end: 5;
	grid-row: 1;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom: 1px solid rgba(200, 200, 200, 0.5);
	.prompt {
		border-radius: 5px !important;
		height: 30px;
		width: 155px;
	}

	@media (max-width: 768px) {
		display: none;
	}
`;

export default ({ channelName }) => (
	<Wrapper>
		<Header
			className="channel-name__header"
			style={{
				padding: "0",
				margin: "0",
				color: "#3f9fff"
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<Icon
					name="slack hash"
					style={{
						fontSize: "18px",
						marginRight: "3px"
					}}
				/>{" "}
				{channelName}
			</div>
		</Header>
		<div style={{ display: "flex", alignItems: "center" }}>
			<Icon
				name="user"
				className="user__semantic-icon"
				style={{
					color: "#3f9fff",
					marginRight: "20px",
					fontSize: "16px"
				}}
			/>
			<Icon
				className="phone__semantic-icon"
				name="phone"
				style={{
					color: "#3f9fff",
					marginRight: "20px",
					fontSize: "16px"
				}}
			/>

			<Icon
				className="image-sharing__semantic-icon"
				name="file image"
				style={{
					color: "#3f9fff",
					marginRight: "20px",
					fontSize: "16px"
				}}
			/>
			<Icon
				className="file-sharing__semantic-icon"
				name="file"
				style={{
					color: "#3f9fff",
					marginRight: "20px",
					fontSize: "16px"
				}}
			/>
			<Search />
		</div>
	</Wrapper>
);
