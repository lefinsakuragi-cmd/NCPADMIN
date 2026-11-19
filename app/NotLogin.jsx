import { useState } from "react";
import Auth from "./components/Auth";
function NotLogin() {
    const [authModal, setAuthModal] = useState(null);
    return (
        <section className="homeContent">
            <div className="homeWrapper">
                <div className="homeContentBox">
                    <img className="welcomeImage" src="/stopdong.jpeg" alt="Login Required" />
                    <h1>Stop!!</h1>
                    <p>Login dulu ya. baru boleh pake webnya</p>
                    <button onClick={() => setAuthModal("login")} className="btn-login">Masuk Sekarang</button>
                    {authModal && (
                        <Auth
                            mode={authModal}
                            onClose={() => setAuthModal(null)}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default NotLogin