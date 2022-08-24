import { signin, signup } from "../api/auth"
import header from "../layout/header"
import footer from "../layout/footer.js"
import "../publics/css/sigup_page.css"
import axios from "axios"
import home_admin from "./admin/home"

const sign_in_page = {
    render() {
        return /*html*/ `
        <div class="ctn_sign_up">
            <div class="header">
                ${header.render()}
            </div>
            <div class="container ctn_article">
                <h4>Signin</h4>
                <form class="col-md-6 col-10" id="form_signup">
                    <p id="err"></p>
                    <input type="text" placeholder="Email" id="mail">
                    <input type="password" placeholder="Password" id="pass">
                    <button class="btn">Signin</button>
                    <a href="/signup">Signup?</a>
                </form>
            </div>
            <div class="footer">
                ${footer.render()}
            </div>
        </div>
        `
    },
    after_Render() {
        const form = document.querySelector("#form_signup")
        const mail = document.querySelector("#mail")
        const pass = document.querySelector("#pass")
        form.addEventListener("submit", async(e) => {
            e.preventDefault()
            try {
                const user = {
                    email: mail.value,
                    password: pass.value
                }

                const response = await signin(user)
                if (response) {
                    document.getElementById("err").innerHTML = "Đăng nhập thành công!"
                        // Lưu vào stogate
                    localStorage.setItem('user', JSON.stringify(response.user));
                    const data_user = JSON.parse(localStorage.getItem("user"));

                    // Chuyem huong trang
                    window.location.href = "/admin"

                }

                // localStorage.removeItem('user')



            } catch (error) {
                if (error) {
                    document.getElementById("err").innerHTML = error.response.data + " !"
                }
            }
        })
    }
}

export default sign_in_page