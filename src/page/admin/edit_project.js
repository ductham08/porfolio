import "../../publics/css/admin/edit_user.css"
import { uploadFile } from "../../../upload_img"
import "../../publics/css/admin/edit_projects.css"
import header_admin from "./header_admin"
import { re_load } from "../../ultil/re_load"


const edit_project_page = {
        async render(id) {
            const data_project = await (await fetch(`http://localhost:3001/projects/${id}?_expand=category_Project`)).json()
            const data_category_pro = await (await fetch("http://localhost:3001/category_Projects")).json()
            console.log(data_project)

            return /*html*/ `
        <div class="ctn_edit_project">
            <div>
                ${header_admin.render()}
            </div>
            <div class="container ctn_article col-md-10 col-12">
                <p>Edit project: ${data_project.name}</p>
                <div class="col-md-3 col-10">
                    <img width="100%"  id="thum_review" src="${data_project.thumbnail}" alt="">
                </div>
                <form id="edit_post_form">
                    <p>Name project:</p>
                    <input type="text" value="${data_project.name}" placeholder="Name project" id="title">
                    <p>Category post:</p>
                    <select id="id_project">
                        ${data_category_pro.map((item) => {
                            return /*html*/ `
                                <option class="check_option" value="${item.id}">${item.name}</option>
                            `
                            
                        }).join("")}
                    </select>
                    <p>Createat:</p>
                    <input type="date" value="${data_project.createat}" placeholder="Createat" id="createat">
                    <p>Thumbnail:</p>
                    <input type="file" src="${data_project.image}" placeholder="" class="img_file" id="thumbnail">
                    <p>Content:</p>
                    <textarea id="content"  rows="10" placeholder="Description">${data_project.content}</textarea>
                    <button>Save</button>
                </form>    
           </div>
        </div>
        `


    },
    after_Render(id) {



        const form = document.getElementById("edit_post_form")
        const title = document.getElementById("title")
        const category = document.getElementById("id_project")
        const createat = document.getElementById("createat")
        const thumbnail = document.getElementById("thumbnail")
        const content = document.getElementById("content")
        const thum_review = document.getElementById("thum_review").getAttribute('src')

        

        form.addEventListener("submit", async(e) => {
            e.preventDefault()

            

            async function url() {
                if (thumbnail.files[0]) {
                    const response = await uploadFile(thumbnail.files[0]);
                    return response.data.url
                } else {
                    return thum_review
                }
            }

            const new_data_project = {
                name: title.value,
                category_ProjectId: category.value,
                createat: createat.value,
                content: content.value,
                thumbnail: await url()
            }
            console.log(new_data_project)
            const data = await fetch(`http://localhost:3001/projects/${id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new_data_project)
            })
            if (data) {
                alert("Successful change!")
            }

        })
    }
}

export default edit_project_page