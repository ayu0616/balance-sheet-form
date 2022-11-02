import { CSSProperties } from "react";

const Header = () => {
    const headerCss: CSSProperties = {
        zIndex: 1024,
    };
    return (
        <header id="title-header" className="p-3 mb-3" style={headerCss}>
            <div className="w-100 mx-auto" style={{ maxWidth: 1300 }}>
                <h1 className="my-0">
                    <span
                        className="text-decoration-none text-reset"
                        onClick={() => {
                            // キャッシュを削除し更新する
                            window.navigator.serviceWorker.getRegistrations().then((registrations) => {
                                for (let registration of registrations) {
                                    registration.unregister();
                                }
                            });
                            window.location.reload();
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        お小遣い帳入力フォーム
                    </a>
                </h1>
            </div>
        </header>
    );
};

export default Header;
