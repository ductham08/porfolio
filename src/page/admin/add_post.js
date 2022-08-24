import "../../publics/css/admin/edit_user.css"
import header_admin from "./header_admin"

const add_post_page = {
        async render() {
            const data_category_post = await (await fetch("http://localhost:3001/category_Posts")).json()
            return /*html*/ `
        <div class="ctn_edit_user">
            <div>
                ${header_admin.render()}
            </div>
            <hr>
           <div class="container ctn_article col-md-10 col-12">
                <p>Add new post !   </p>
                <form id="edit_post_form">
                    <p>Title:</p>
                    <input type="text" placeholder="Title" id="title">
                    <p>Category post:</p>
                    <select id="category_post_id">
                        ${data_category_post.map((item) => {
                            return /*html*/ `
                                <option value="${item.id}">${item.name}</option>
                            `
                        }).join("")}
                    </select>
                    <p>Createat:</p>
                    <input type="date" placeholder="Createat" id="createat">
                    <p>Content:</p>
                    <textarea id="content"  rows="10" placeholder="Content"></textarea>
                    <button>Save</button>
                </form>    
           </div>
        </div>
        `
    },
    after_Render() {
        const form = document.getElementById("edit_post_form")
        const title = document.getElementById("title")
        const category = document.getElementById("category_post_id")
        const createat = document.getElementById("createat")
        const content = document.getElementById("content")


        form.addEventListener("submit", async(e) => {
            e.preventDefault()
            const new_data_user = {
                title: title.value,
                category_PostId: category.value,
                createat: createat.value,
                content: content.value,
            }
            console.log(new_data_user)
            const data = await fetch(`http://localhost:3001/posts`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new_data_user)
            })

        })
    }
}

export default add_post_page