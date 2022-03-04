import { CSSProperties } from "react";

const Header = () => {
	const headerCss: CSSProperties = {
		zIndex: 1024,
	};
	return (
		<header id="title-header" className="p-3 mb-3" style={headerCss}>
			<h1 className="m-0">
				<button
					className="border-0 p-0 bg-transparent text-decoration-none text-reset"
					onClick={() => {
						// キャッシュを削除し更新する
						window.navigator.serviceWorker.getRegistrations().then((registrations) => {
							for (let registration of registrations) {
								registration.unregister();
							}
						});
						window.location.reload();
					}}
				>
					お小遣い帳入力フォーム
				</button>
			</h1>
		</header>
	);
};

export default Header;
