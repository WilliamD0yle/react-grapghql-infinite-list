import React, { useEffect } from "react";
import "./Repos.css";

const handleOnScroll = props => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) props.onLoadMore();
};

const Repos = props => {
    useEffect(() => {
        window.addEventListener("scroll", () => {
			if (!props.loading) {
				handleOnScroll(props);
			}
		});
        return window.removeEventListener("scroll", () => handleOnScroll(props));
    }, [props]);

    if (!props.data && props.loading) {
        return <p>Loading...</p>;
    }

	const repos = props.data.search.edges || [];
    return (
		<ul className="list">
			{repos.map(({ node }, i) => (
				<li key={i} className="Repo">
					<div className="column">
						<img src={node.owner.avatarUrl} alt={node.owner.login} />
					</div>
					<div className="column details">
						<h3>{`${node.name} by ${node.owner.login}`}</h3>
						<p>{node.description}</p>
						<p>Stars: {node.stargazers.totalCount}</p>
						{node.primaryLanguage ? <p>Language: {node.primaryLanguage.name}</p> : null}
					</div>
				</li>
			))}
		</ul>
    );
};

export default Repos;
