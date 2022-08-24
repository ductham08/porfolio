import { uploadFile } from "../../../upload_img"
import "../../publics/css/admin/edit_user.css"
import header_admin from "./header_admin"

const add_project_page = {
        async render() {
            const data_category_pro = await (await fetch("http://localhost:3001/category_Projects")).json()
            console.log(data_category_pro)
            return /*html*/ `
        <div class="ctn_edit_user">
            <div>
                ${header_admin.render()}
            </div>
            <hr>
            <div class="container ctn_article col-md-10 col-12">
                <p>Add new project !</p>
                <form id="edit_post_form">
                    <p>Name project:</p>
                    <input type="text" placeholder="Name project" id="title">
                    <p>Category project:</p>
                    <select id="id_project">
                        ${data_category_pro.map((item) => {
                            return /*html*/ `
                                <option value="${item.id}">${item.name}</option>
                            `
                        }).join("")}
                    </select>
                    <p>Createat:</p>
                    <input type="file" class="img_file" placeholder="Thumbnail" id="thumbnail">
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
        const name = document.getElementById("title")
        const category = document.getElementById("id_project")
        const createat = document.getElementById("createat")
        const content = document.getElementById("content")
        const thumbnail = document.getElementById("thumbnail")


        form.addEventListener("submit", async(e) => {
            e.preventDefault()

            async function url() {
                if (thumbnail.files[0]) {
                    const response = await uploadFile(thumbnail.files[0]);
                    return response.data.url
                } else {
                    return ''
                }
            }
            const new_data_project = {
                name: name.value,
                category_ProjectId: category.value,
                createat: createat.value,
                content: content.value,
                thumbnail: await url()
            }
            console.log(new_data_project)
            const data = await fetch(`http://localhost:3001/projects`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new_data_project)
            })

            if(data){
                console.log("Them thanh cong!")
           }

        })
    }
}

export default add_project_page