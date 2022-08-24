import { signup } from "../api/auth"
import header from "../layout/header"
import footer from "../layout/footer.js"
import "../publics/css/sigup_page.css"
import { uploadFile } from "../../upload_img"

const sing_up_page = {
    render() {
        return /*html*/ `
        <div class="ctn_sign_up">
            <div class="header">
                ${header.render()}
            </div>
            <div class="container ctn_article">
                <h4>Signup</h4>
                <form class="col-md-6 col-10" id="form_signup">
                    <p id="err"></p>
                    <input type="text" placeholder="Name" id="name">
                    <input type="text" placeholder="Email" id="mail">
                    <input type="password" placeholder="Password" id="pass">
                    <input type="text" placeholder="Position" id="position">
                    <p>Avatar:</p>
                    <input type="file" id="avatar">
                    <textarea placeholder="Description" name="" id="desc" rows="7"></textarea>
                    <button class="btn">Signup</button>
                    <a href="/signin">Signin?</a>
                </form>
            </div>
            <div class="footer">
                ${footer.render()}
            </div>
        `
    },
    after_Render() {
        document.getElementById("err").innerHTML = ""
        const form = document.querySelector("#form_signup")
        const mail = document.querySelector("#mail")
        const pass = document.querySelector("#pass")
        const name = document.querySelector("#name")
        const position = document.querySelector("#position")
        const avatar = document.querySelector("#avatar")
        const desc = document.querySelector("#desc")
        form.addEventListener("submit", async(e) => {
            e.preventDefault()
            try {

                async function url() {
                    if (avatar.files[0]) {
                        const response = await uploadFile(avatar.files[0]);
                        return response.data.url
                    } else {
                        return ''
                    }
                }

                const user = {
                    email: mail.value,
                    password: pass.value,
                    name: name.value,
                    position: position.value,
                    desc: desc.value,
                    image: await url(),
                    userId: 0
                }
                const response = await signup(user)
                if (response) {
                    document.getElementById("err").innerHTML = "Successful account registration!"
                }
            } catch (error) {
                document.getElementById("err").innerHTML = error.response.data + " !"
            }
        })
    }
}

export default sing_up_page