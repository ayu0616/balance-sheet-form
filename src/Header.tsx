import { CSSProperties } from "react";

const Header = () => {
	const headerCss: CSSProperties = {
		zIndex: 1,
	};
	return (
		<header id="title-header" className="p-3 mb-3" style={headerCss}>
			<h1 className="m-0">
				<a href="/account_book" className="text-decoration-none text-reset">
					お小遣い帳入力フォーム
				</a>
			</h1>
		</header>
	);
};

export default Header;
